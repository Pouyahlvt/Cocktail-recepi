"use client";

import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import { usePathname } from "next/navigation";
import { useRef } from "react";
import { MartiniIcon, WineIcon } from "lucide-react";

const PageTransition = () => {
  const containerRef = useRef<HTMLDivElement>(null);
  const topPanelRef = useRef<HTMLDivElement>(null);
  const bottomPanelRef = useRef<HTMLDivElement>(null);

  const pathname = usePathname();

  useGSAP(
    () => {
      const tl = gsap.timeline();

      // Start with the curtains covering the page
      gsap.set(topPanelRef.current, {
        xPercent: 0,
      });

      gsap.set(bottomPanelRef.current, {
        xPercent: 0,
      });

      // Open the curtains
      tl.to(topPanelRef.current, {
        xPercent: -100,
        duration: 0.8,
        ease: "power4.inOut",
      });

      tl.to(
        bottomPanelRef.current,
        {
          xPercent: 100,
          duration: 0.8,
          ease: "power4.inOut",
        },
        "<",
      );

      tl.set(containerRef.current, {
        pointerEvents: "none",
      });
    },
    {
      scope: containerRef,
      dependencies: [pathname],
    },
  );

  return (
    <div
      ref={containerRef}
      className="pointer-events-none fixed inset-0 z-9998">
      {/* Top curtain */}
      <div
        ref={topPanelRef}
        className="absolute left-0 top-0 h-screen w-1/2 bg-linear-to-r from-onyx to-lnk-black 
        flex justify-end items-center">
        <MartiniIcon size={300} color="#fafafa" strokeWidth={0.5} />
      </div>

      {/* Bottom curtain */}
      <div
        ref={bottomPanelRef}
        className="absolute top-0 right-0 h-screen w-1/2 bg-linear-to-l from-onyx to-lnk-black border-t-2 
        flex justify-start items-center">
        <WineIcon size={300} color="#fafafa" strokeWidth={0.5} />
      </div>
    </div>
  );
};

export default PageTransition;
