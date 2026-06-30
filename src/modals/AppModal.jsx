import { memo, useEffect, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { X } from "lucide-react";
import { Button, cx } from "../components";

function useMobileSheet() {
  const [isMobile, setIsMobile] = useState(() => typeof window !== "undefined" && window.matchMedia("(max-width: 767px)").matches);
  useEffect(() => {
    const media = window.matchMedia("(max-width: 767px)");
    const update = () => setIsMobile(media.matches);
    update();
    media.addEventListener("change", update);
    return () => media.removeEventListener("change", update);
  }, []);
  return isMobile;
}

export const Modal = memo(({ open, title, children, footer, onClose, size = "md" }) => {
  const sizes = { sm: "max-w-sm", md: "max-w-lg", lg: "max-w-3xl", xl: "max-w-5xl" };
  const isMobile = useMobileSheet();
  return (
    <AnimatePresence>
      {open ? (
        <motion.div className="native-modal-overlay fixed inset-0 z-[90] grid place-items-center bg-black/70 p-4" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}>
          <motion.div
            animate={isMobile ? { y: 0 } : { scale: 1 }}
            className={cx("native-bottom-sheet w-full rounded-lg border border-gray-800 bg-gray-950 p-5", sizes[size])}
            drag={isMobile ? "y" : false}
            dragConstraints={{ top: 0, bottom: 0 }}
            exit={isMobile ? { y: "100%" } : { scale: 0.97 }}
            initial={isMobile ? { y: "100%" } : { scale: 0.97 }}
            onDragEnd={(_, info) => {
              if (isMobile && info.offset.y > 90) onClose?.();
            }}
            transition={isMobile ? { type: "spring", damping: 28, stiffness: 320 } : undefined}
          >
            <span className="native-bottom-sheet-handle" aria-hidden="true" />
            <div className="mb-4 flex items-center justify-between gap-3">
              <h2 className="text-lg font-black text-white">{title}</h2>
              <button aria-label="Fechar modal" onClick={onClose} className="rounded-lg p-2 text-gray-400 hover:bg-gray-800"><X size={18} /></button>
            </div>
            {children}
            {footer ? <footer className="mt-5 flex justify-end gap-2">{footer}</footer> : null}
          </motion.div>
        </motion.div>
      ) : null}
    </AnimatePresence>
  );
});
Modal.displayName = "Modal";

export const ConfirmModal = memo(({ open, title, description, onCancel, onConfirm }) => (
  <Modal open={open} title={title} onClose={onCancel} footer={<><Button variant="ghost" onClick={onCancel}>Cancelar</Button><Button variant="danger" onClick={onConfirm}>Confirmar</Button></>}>
    <p className="text-sm text-gray-300">{description}</p>
  </Modal>
));
ConfirmModal.displayName = "ConfirmModal";
