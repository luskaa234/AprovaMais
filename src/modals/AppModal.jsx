import { memo } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { X } from "lucide-react";
import { Button, cx } from "../components";

export const Modal = memo(({ open, title, children, footer, onClose, size = "md" }) => {
  const sizes = { sm: "max-w-sm", md: "max-w-lg", lg: "max-w-3xl", xl: "max-w-5xl" };
  return (
    <AnimatePresence>
      {open ? (
        <motion.div className="fixed inset-0 z-50 grid place-items-center bg-black/70 p-4" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}>
          <motion.div className={cx("w-full rounded-lg border border-gray-800 bg-gray-950 p-5", sizes[size])} initial={{ scale: 0.97 }} animate={{ scale: 1 }} exit={{ scale: 0.97 }}>
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
