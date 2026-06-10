import { memo } from "react";
import { motion } from "framer-motion";
import { cx } from "./AppUI";
import acerto from "../assets/mascote/mascote-acerto.png";
import boasVindas from "../assets/mascote/mascote-boas-vindas.png";
import comemoracao from "../assets/mascote/mascote-comemoracao.png";
import conquista from "../assets/mascote/mascote-conquista.png";
import feedback from "../assets/mascote/mascote-feedback.png";
import motivacao from "../assets/mascote/mascote-motivacao.png";

const poses = {
  acerto,
  boasVindas,
  comemoracao,
  conquista,
  feedback,
  motivacao,
};

const sizes = {
  sm: "size-9",
  md: "size-16",
  lg: "size-28",
  xl: "size-40",
  hero: "size-52",
};

const imageSizes = {
  sm: "w-14",
  md: "w-24",
  lg: "w-40",
  xl: "w-56",
  hero: "w-72",
};

const Mascot = memo(({ size = "md", pose = "feedback", className = "", imageClassName = "", framed = true, animated = true }) => (
  <motion.div
    animate={animated ? { opacity: 1, scale: 1, y: 0 } : undefined}
    className={cx(
      "relative grid shrink-0 place-items-center overflow-visible",
      sizes[size] || sizes.md,
      framed ? "rounded-[var(--aprova-radius)] bg-blue-50 ring-1 ring-blue-100" : "",
      className
    )}
    initial={animated ? { opacity: 0, scale: 0.94, y: 8 } : undefined}
    transition={{ duration: 0.28, ease: "easeOut" }}
  >
    <img
      alt="Mascote Aprova+"
      className={cx("max-w-none object-contain drop-shadow-[0_14px_28px_rgba(37,99,235,0.18)]", imageSizes[size] || imageSizes.md, imageClassName)}
      draggable="false"
      src={poses[pose] || feedback}
    />
  </motion.div>
));

Mascot.displayName = "Mascot";

export default Mascot;
