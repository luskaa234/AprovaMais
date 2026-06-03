"use client";;
import Link from "next/link";

import Marquee from "./marquee";
import { cn } from "@/lib/utils";

function DefaultMessage() {
  return (
    <span>
      <span
        className="whitespace-nowrap px-12 font-(family-name:--font-display) font-light text-neutral-900">
        New components and live demos
      </span>
      <span className="text-neutral-900">&middot;</span>
    </span>
  );
}

export default function AnnouncementRibbon({
  message,
  badge = "NEW",
  ctaText = "Learn more",
  ctaHref = "/docs/changelog/2026-05",
  repeat = 5,
  pauseOnHover = true,
  className,
  ...props
}) {
  const content = message ?? <DefaultMessage />;

  return (
    <div
      className={cn(
        "relative flex h-11 w-full items-center overflow-hidden",
        "bg-[#ffcc00]",
        "border-b border-black/8",
        className
      )}
      {...props}>
      {/* Badge */}
      {badge && (
        <div
          className="relative z-30 flex bg-[#ffcc00] shrink-0 items-center self-stretch border-r border-black/8 px-4">
          <span
            className="rounded-full bg-black/10 px-2.5 py-px font-mono text-[10px] font-semibold uppercase tracking-widest text-neutral-900">
            {badge}
          </span>
        </div>
      )}
      <div className="flex-1 overflow-hidden">
        <Marquee repeat={repeat} pauseOnHover={pauseOnHover} applyMask={false}>
          {content}
        </Marquee>
      </div>
      {/* CTA */}
      {ctaText && ctaHref && (
        <Link
          href={ctaHref}
          className="group/cta relative bg-[#ffcc00] z-30 flex shrink-0 items-center gap-1.5 self-stretch border-l border-black/8 px-4 font-mono text-[10px] font-semibold uppercase tracking-widest text-neutral-800/60 transition-colors hover:text-neutral-900">
          {ctaText}
          <svg
            className="h-3 w-3 transition-transform group-hover/cta:translate-x-0.5"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
            strokeWidth={2}
            aria-hidden
            role="presentation">
            <path strokeLinecap="round" strokeLinejoin="round" d="M9 5l7 7-7 7" />
          </svg>
        </Link>
      )}
    </div>
  );
}
