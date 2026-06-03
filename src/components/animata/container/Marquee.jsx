import { cn } from "../../../lib/utils";

function Marquee({
  children,
  className,
  repeat = 5,
  pauseOnHover = true,
  reverse = false,
  ...props
}) {
  const renderGroup = (groupKey) => (
    <div className="announcement-marquee-group" aria-hidden={groupKey === "copy"}>
      {Array.from({ length: repeat }).map((_, index) => (
        <div className="announcement-marquee-item" key={`${groupKey}-${index}`}>
          {children}
        </div>
      ))}
    </div>
  );

  return (
    <div
      className={cn(
        "announcement-marquee",
        pauseOnHover && "is-pausable",
        reverse && "is-reverse",
        className
      )}
      {...props}
    >
      {renderGroup("main")}
      {renderGroup("copy")}
    </div>
  );
}

export default Marquee;
