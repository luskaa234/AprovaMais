import "./src/index.css";
import { createRoot } from "react-dom/client";
import ApostilaChapterReader from "./src/pages/Biblioteca/ApostilaChapterReader";

createRoot(document.getElementById("root")).render(
  <ApostilaChapterReader onExit={() => {}} onPrevChapter={() => {}} onNextChapter={() => {}} />
);
