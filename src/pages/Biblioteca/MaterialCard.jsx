import { memo, useEffect, useMemo, useState } from "react";
import { createPortal } from "react-dom";
import { BookMarked, Download, Eye, FileArchive, FileCheck2, FileText, Heart, Image, Map, Trash2, X } from "lucide-react";
import { Card, cx } from "../../components";
import { ApostilaChapterReader } from "./ApostilaChapterReader";

const typeConfig = {
  PDF: { icon: FileText, tone: "blue" },
  Apostila: { icon: BookMarked, tone: "green" },
  Resumo: { icon: FileCheck2, tone: "violet" },
  "Lei seca": { icon: FileText, tone: "amber" },
  Ebook: { icon: BookMarked, tone: "green" },
  "Prova oficial": { icon: FileCheck2, tone: "blue" },
  Gabarito: { icon: FileCheck2, tone: "green" },
  "Mapas mentais": { icon: Map, tone: "violet" },
  Imagem: { icon: Image, tone: "rose" },
  ZIP: { icon: FileArchive, tone: "amber" },
};

function getConfig(material) {
  return typeConfig[material.tipo] || typeConfig[material.categoria] || { icon: FileText, tone: "blue" };
}

function isPdfUrl(url = "") {
  return /\.pdf($|[?#])/i.test(String(url));
}

function canFetchPreview(url = "") {
  if (!url || typeof window === "undefined") return false;
  try {
    const target = new URL(url, window.location.origin);
    return target.origin === window.location.origin;
  } catch {
    return false;
  }
}

function normalizeLabel(value = "") {
  return String(value)
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "")
    .replace(/\s+/g, " ")
    .trim()
    .toLowerCase();
}

function isSameLabel(a, b) {
  return normalizeLabel(a) === normalizeLabel(b);
}

function getMaterialSubtitle(material) {
  if (!material.materia) return material.categoria || material.tipo || "Material";
  if (isSameLabel(material.titulo, material.materia)) return material.descricao || material.categoria || material.tipo || "Apostila";
  return material.materia;
}

function getViewerSubtitle(material) {
  const parts = [];
  if (material.materia && !isSameLabel(material.titulo, material.materia)) parts.push(material.materia);
  if (material.categoria && !parts.some((part) => isSameLabel(part, material.categoria))) parts.push(material.categoria);
  return parts.join(" - ") || material.categoria || material.tipo || "Apostila";
}

function MaterialViewer({ material, onClose }) {
  const hasChapters = Array.isArray(material.chapters) && material.chapters.length > 0;
  const canPreviewAsPdf = isPdfUrl(material.url);
  const shouldFetchPdf = canPreviewAsPdf && canFetchPreview(material.url);
  const [blobUrl, setBlobUrl] = useState("");

  useEffect(() => {
    if (!shouldFetchPdf) {
      return undefined;
    }

    let alive = true;
    let objectUrl = "";

    fetch(material.url)
      .then((response) => {
        if (!response.ok) throw new Error("preview");
        return response.blob();
      })
      .then((blob) => {
        objectUrl = URL.createObjectURL(new Blob([blob], { type: "application/pdf" }));
        if (alive) setBlobUrl(objectUrl);
      })
      .catch(() => {
        if (alive) setBlobUrl("");
      });

    return () => {
      alive = false;
      if (objectUrl) URL.revokeObjectURL(objectUrl);
    };
  }, [material.url, shouldFetchPdf]);

  const isLoadingPreview = shouldFetchPdf && !blobUrl;
  const src = blobUrl || material.url;

  return (
    <div className="library-viewer">
      <div className="library-viewer-bar">
        <div className="min-w-0">
          <p>{material.titulo}</p>
          <span>{getViewerSubtitle(material)}</span>
        </div>
        <div className="library-viewer-actions">
          {material.url ? (
            <a href={material.url} download className="library-viewer-button">
              <Download size={14} />
              Baixar
            </a>
          ) : null}
          <button onClick={onClose} className="library-viewer-button library-viewer-close" aria-label="Fechar visualizador" type="button">
            <X size={18} />
          </button>
        </div>
      </div>

      {hasChapters ? (
        <ApostilaChapterReader chapters={material.chapters} material={material} />
      ) : isLoadingPreview ? (
        <div className="library-preview-state">
          <FileText size={34} />
          <strong>Carregando apostila...</strong>
          <p>Preparando o leitor interno.</p>
        </div>
      ) : canPreviewAsPdf ? (
        <object data={src} type="application/pdf" title={material.titulo} className="library-viewer-frame">
          <div className="library-preview-state">
            <FileText size={34} />
            <strong>Pré-visualização indisponível</strong>
            <p>Este PDF não pode ser renderizado aqui. Use o botão de baixar para abrir no seu leitor de PDF.</p>
          </div>
        </object>
      ) : (
        <div className="library-preview-state">
          <FileText size={34} />
          <strong>Leitor disponível para PDF</strong>
          <p>Cadastre a apostila em formato PDF para que o botão Ver abra o conteúdo aqui dentro.</p>
        </div>
      )}
    </div>
  );
}

function MaterialCardBase({ material, favorite, canDelete = false, onDelete, onFavorite }) {
  const [viewerOpen, setViewerOpen] = useState(false);
  const config = useMemo(() => getConfig(material), [material]);
  const subtitle = useMemo(() => getMaterialSubtitle(material), [material]);
  const Icon = config.icon;
  const canOpen = Boolean(material.url || material.chapters?.length);

  useEffect(() => {
    if (!viewerOpen || typeof document === "undefined") return undefined;

    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";

    return () => {
      document.body.style.overflow = previousOverflow;
    };
  }, [viewerOpen]);

  return (
    <>
      <Card className="library-card" hover>
        <div className={cx("library-cover", `library-cover-${config.tone}`)}>
          <Icon size={34} />
        </div>

        <div className="library-card-body">
          <div className="library-card-title-row">
            <div className="min-w-0">
              <h2>{material.titulo}</h2>
              <p>{subtitle}</p>
            </div>
          </div>
        </div>

        <div className={cx("library-card-actions", canDelete && "library-card-actions-admin")}>
          <button disabled={!canOpen} onClick={() => setViewerOpen(true)} className="library-primary-action" type="button">
            <Eye size={15} />
            Ver
          </button>
          <a
            href={material.url || "#"}
            download
            aria-disabled={!material.url}
            className={cx("library-icon-action", !material.url && "is-disabled")}
            title="Baixar"
          >
            <Download size={15} />
          </a>
          <button aria-label="Favoritar material" onClick={() => onFavorite(material.id)} className={cx("library-icon-action", favorite && "is-favorite")} type="button">
            <Heart size={16} fill={favorite ? "currentColor" : "none"} />
          </button>
          {canDelete ? (
            <button aria-label="Apagar apostila" onClick={() => onDelete?.(material.id)} className="library-icon-action library-delete-action" type="button">
              <Trash2 size={16} />
            </button>
          ) : null}
        </div>
      </Card>

      {viewerOpen && typeof document !== "undefined"
        ? createPortal(<MaterialViewer material={material} onClose={() => setViewerOpen(false)} />, document.body)
        : null}
    </>
  );
}

export const MaterialCard = memo(MaterialCardBase);
MaterialCard.displayName = "MaterialCard";
