import { ArrowRight } from "lucide-react";

function SlideArrowButton({
  text = "Começar agora",
  primaryColor = "#5aa7ff",
  href,
  className = "",
  onClick,
  ...props
}) {
  const content = (
    <>
      <span className="slide-arrow-fill" style={{ backgroundColor: primaryColor }}>
        <ArrowRight size={20} />
      </span>
      <span className="slide-arrow-text">{text}</span>
    </>
  );

  if (href) {
    return (
      <a className={`slide-arrow-button ${className}`} href={href} onClick={onClick} {...props}>
        {content}
      </a>
    );
  }

  return (
    <button className={`slide-arrow-button ${className}`} type="button" onClick={onClick} {...props}>
      {content}
    </button>
  );
}

export default SlideArrowButton;
