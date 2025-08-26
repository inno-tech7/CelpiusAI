"use client";

import { motion, useScroll, useTransform } from "framer-motion";
import React, { useRef } from "react";
import { cn } from "@/lib/utils";
import { useIsMobile } from "@/hooks/use-mobile";

interface ScrollAnimatedTextProps {
  text: string;
  className?: string;
  textClassName?: string;
  initialColorClassName?: string;
  finalColorClassName?: string;
  desktopOffset?: any;
  mobileOffset?: any;
}

const ScrollAnimatedText: React.FC<ScrollAnimatedTextProps> = ({ 
  text, 
  className, 
  textClassName,
  initialColorClassName = "text-slate-400",
  finalColorClassName = "text-black dark:text-white",
  desktopOffset = ["start end", "end start"],
  mobileOffset = ["start end", "end center"]
}) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const isMobile = useIsMobile();

  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: isMobile ? mobileOffset : desktopOffset,
  });

  const words = text.split(" ");

  return (
    <div ref={containerRef} className={cn("w-full", className)}>
      <p className={cn("flex flex-wrap justify-center", textClassName)}>
        {words.map((word, i) => {
          const start = i / words.length;
          const end = start + 1 / words.length;
          return <Word 
                    key={i} 
                    progress={scrollYProgress} 
                    range={[start, end]} 
                    word={word} 
                    initialColorClassName={initialColorClassName}
                    finalColorClassName={finalColorClassName}
                  />;
        })}
      </p>
    </div>
  );
};

interface WordProps {
  word: string;
  progress: any;
  range: [number, number];
  initialColorClassName: string;
  finalColorClassName: string;
}

const Word: React.FC<WordProps> = ({ word, progress, range, initialColorClassName, finalColorClassName }) => {
  const opacity = useTransform(progress, range, [0, 1]);
  return (
    <span className="relative mr-3 mt-3">
      <span className={cn("transition-colors duration-500", initialColorClassName)}>{word}</span>
      <motion.span className={cn("absolute top-0 left-0 transition-colors duration-500", finalColorClassName)} style={{ opacity }}>{word}</motion.span>
    </span>
  );
};

export default ScrollAnimatedText;