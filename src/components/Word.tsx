"use client"
// import gsap from "gsap";
// import { useGSAP } from "@gsap/react";
// import { ScrollTrigger } from "gsap/dist/ScrollTrigger";
import { useRef } from "react";

interface ComponentProps {
  text: string;
  color?: string;
  hoverColor?: string;
  activeColor?: string;
  className?: string;
  parentClassName?: string;
  [key: string]: any;
}

const Component = ({ text, color = 'black', hoverColor, activeColor, parentClassName, className, ...rest }: ComponentProps) => {
  const containerRef = useRef<HTMLDivElement>(null);

  const renderWord = (className: string) => (
    <span className={className} style={{
      display: "inline-block",
      color: activeColor || hoverColor || color,
      textTransform: "uppercase",
      fontFamily: "Ppneuemontreal, sans-serif",
      fontSize: ".875rem",
      fontWeight: 600,
      lineHeight: 1
    }}>
      {text.split("").map((char, index) => (
        <span className="char" style={{ display: "inline-block" }} key={index}>
          {char === " " ? "\u00A0" : char}
        </span>
      ))}
    </span>
  );

  // useGSAP(() => {
  //   if (typeof window === "undefined") return
  //   if (typeof document === 'undefined') return;

  //   gsap.registerPlugin(ScrollTrigger);

  //   const scope = containerRef.current;
  //   if (!scope) return;

  //   const text1 = scope.querySelector(".word1");
  //   const text2 = scope.querySelector(".word2");

  //   if (!text1 || !text2) return;

  //   const chars1 = text1.querySelectorAll(".char");
  //   const chars2 = text2.querySelectorAll(".char");

  //   const staggerAmount = chars1.length * 0.025;

  //   const tl = gsap.timeline({ paused: true });

  //   tl.to(chars1, {
  //     yPercent: -100,
  //     opacity: 0,
  //     ease: "power1.out",
  //     stagger: { amount: staggerAmount },
  //   }, 0);

  //   tl.from(chars2, {
  //     yPercent: 100,
  //     opacity: 0,
  //     ease: "power1.out",
  //     color: activeColor || hoverColor || color,
  //     stagger: { amount: staggerAmount },
  //   }, 0);

  //   scope.onmouseenter = () => {
  //     tl.restart();
  //   };
  // }, { scope: containerRef });

  return (
    <div style={{ position: "relative", overflow: "hidden" }} ref={containerRef} className={parentClassName || ''} {...rest}>
      <div style={{ display: "block" }} className={className || ''}>
        {renderWord("word word1")}
      </div>
      <div style={{ display: "block", position: "absolute", top: 0, left: 0 }} className={className || ''}>
        {renderWord("word word2")}
      </div>
    </div>
  );
};

export default Component;
