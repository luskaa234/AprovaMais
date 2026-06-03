import { cn } from "@/lib/utils";

export default function FlipCard({
  image,
  title,
  description,
  subtitle,
  rotate = "y",
  className,
  ...props
}) {
  const rotationClass = {
    x: ["group-hover/card:rotate-x-180", "rotate-x-180"],
    y: ["group-hover/card:rotate-y-180", "rotate-y-180"]
  };

  return (
    <div
      className={cn("group/card h-72 w-56 perspective-[1000px]", className)}
      {...props}>
      <div
        className={cn(
          "relative h-full rounded-2xl transition-transform duration-500 transform-3d",
          rotationClass[rotate][0]
        )}>
        {/* Front */}
        <div className="absolute inset-0 backface-hidden">
          <img
            src={image}
            alt="image"
            className="h-full w-full rounded-2xl object-cover shadow-2xl shadow-black/40" />
          <div className="absolute bottom-4 left-4 text-xl font-bold text-white">{title}</div>
        </div>
        {/* Back */}
        <div
          className={cn(
            "absolute inset-0 rounded-2xl bg-black/80 p-4 text-slate-200 backface-hidden",
            rotationClass[rotate][1]
          )}>
          <div className="flex min-h-full flex-col gap-2">
            <h1 className="text-base font-bold text-white">{subtitle}</h1>
            <p
              className="mt-1 border-t border-t-gray-200 py-4 text-base font-medium leading-normal text-gray-100">
              {description}
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
