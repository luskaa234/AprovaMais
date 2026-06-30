import { useState } from "react";
import { motion } from "motion/react";
import { cn } from "../../lib/utils";

export function AnimatedTabs({
  tabs: propTabs,
  containerClassName,
  activeTabClassName,
  tabClassName,
  contentClassName,
}) {
  const [active, setActive] = useState(propTabs[0]);
  const [tabs, setTabs] = useState(propTabs);
  const [hovering, setHovering] = useState(false);

  const moveSelectedTabToTop = (idx) => {
    const newTabs = [...propTabs];
    const selectedTab = newTabs.splice(idx, 1);
    newTabs.unshift(selectedTab[0]);
    setTabs(newTabs);
    setActive(newTabs[0]);
  };

  return (
    <>
      <div
        className={cn(
          "flex flex-row items-center justify-start [perspective:1000px] relative overflow-auto sm:overflow-visible no-visible-scrollbar max-w-full w-full",
          containerClassName
        )}
      >
        {propTabs.map((tab, idx) => (
          <button
            className={cn("relative px-4 py-2 rounded-full", tabClassName)}
            key={tab.title}
            onClick={() => moveSelectedTabToTop(idx)}
            onMouseEnter={() => setHovering(true)}
            onMouseLeave={() => setHovering(false)}
            style={{ transformStyle: "preserve-3d" }}
            type="button"
          >
            {active.value === tab.value && (
              <motion.div
                className={cn("absolute inset-0 bg-gray-200 dark:bg-zinc-800 rounded-full", activeTabClassName)}
                layoutId="clickedbutton"
                transition={{ type: "spring", bounce: 0.3, duration: 0.6 }}
              />
            )}

            <span className="relative block text-black dark:text-white">{tab.title}</span>
          </button>
        ))}
      </div>

      <div className="relative w-full h-full">
        {tabs.map((tab, idx) => (
          <motion.div
            animate={{ y: tab.value === tabs[0].value ? [0, 40, 0] : 0 }}
            className={cn("w-full h-full absolute top-0 left-0 mt-32", contentClassName)}
            key={tab.value}
            layoutId={tab.value}
            style={{
              scale: 1 - idx * 0.1,
              top: hovering ? idx * -50 : 0,
              zIndex: -idx,
              opacity: idx < 3 ? 1 - idx * 0.1 : 0,
            }}
          >
            {tab.content}
          </motion.div>
        ))}
      </div>
    </>
  );
}
