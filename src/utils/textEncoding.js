const MOJIBAKE_REPLACEMENTS = [
  ["Ã¡", "á"],
  ["Ã ", "à"],
  ["Ã¢", "â"],
  ["Ã£", "ã"],
  ["Ã©", "é"],
  ["Ãª", "ê"],
  ["Ã­", "í"],
  ["Ã³", "ó"],
  ["Ã´", "ô"],
  ["Ãµ", "õ"],
  ["Ãº", "ú"],
  ["Ã¼", "ü"],
  ["Ã§", "ç"],
  ["Ã�", "Á"],
  ["Ã€", "À"],
  ["Ã‚", "Â"],
  ["Ãƒ", "Ã"],
  ["Ã‰", "É"],
  ["ÃŠ", "Ê"],
  ["Ã", "Í"],
  ["Ã“", "Ó"],
  ["Ã”", "Ô"],
  ["Ã•", "Õ"],
  ["Ãš", "Ú"],
  ["Ã‡", "Ç"],
  ["Âº", "º"],
  ["Âª", "ª"],
  ["Â§", "§"],
  ["â€“", "–"],
  ["â€”", "—"],
  ["â€˜", "‘"],
  ["â€™", "’"],
  ["â€œ", "“"],
  ["â€", "”"],
  ["â€¦", "…"],
  ["ï¿½", ""],
];

const PDF_GLYPH_REPLACEMENTS = [
  [/\u22a0CA/g, "ECA"],
  [/\ufffdCA/g, "ECA"],
  [/\bE\s+CA\b/g, "ECA"],
  [/\bRod'erta\b/g, "Roberta"],
  [/\brod'erta\b/g, "roberta"],
  [/\bPud'lic/g, "Public"],
  [/\bpud'lic/g, "public"],
  [/\bOd'rig/g, "Obrig"],
  [/\bod'rig/g, "obrig"],
];

const SUSPICIOUS_GLYPHS = ["ă", "ď", "ƀ", "͕", "͘", "Ǒ", "Ψ"];

function fixMojibake(value) {
  let text = value;
  for (const [broken, fixed] of MOJIBAKE_REPLACEMENTS) {
    text = text.split(broken).join(fixed);
  }
  return text;
}

function fixKnownPdfGlyphs(value) {
  let text = value;
  for (const [pattern, replacement] of PDF_GLYPH_REPLACEMENTS) {
    text = text.replace(pattern, replacement);
  }
  return text;
}

export function normalizeContentText(value = "") {
  if (value === null || value === undefined) return "";
  return fixKnownPdfGlyphs(fixMojibake(String(value)))
    .split("")
    .filter((char) => {
      const code = char.charCodeAt(0);
      return code === 9 || code === 10 || code === 13 || code >= 32;
    })
    .join("")
    .normalize("NFC");
}

export function normalizeContentObject(value) {
  if (typeof value === "string") return normalizeContentText(value);
  if (Array.isArray(value)) return value.map(normalizeContentObject);
  if (value && typeof value === "object") {
    return Object.fromEntries(Object.entries(value).map(([key, item]) => [key, normalizeContentObject(item)]));
  }
  return value;
}

export function hasEncodingSuspicion(value = "") {
  const text = String(value);
  return /Ã|Â|â€|\ufffd|\u22a0|\b(?:[Rr]od'erta|[Pp]ud'lic|[Oo]d'rig)/.test(text) || SUSPICIOUS_GLYPHS.some((glyph) => text.includes(glyph));
}
