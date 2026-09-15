"use client";

import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import { useRef, useState } from "react";

const InitialLoader = () => {
  const loaderRef = useRef<HTMLDivElement>(null);
  const barRef = useRef<HTMLDivElement>(null);

  const [progress, setProgress] = useState(0);

  useGSAP(
    () => {
      const counter = { value: 0 };

      gsap.to(counter, {
        value: 100,
        duration: 2.5,
        ease: "power2.out",

        onUpdate: () => {
          setProgress(Math.floor(counter.value));
        },

        onComplete: () => {
          gsap.to(loaderRef.current, {
            yPercent: -100,
            duration: 1,
            ease: "power4.inOut",
            delay: 0.2,
          });
        },
      });

      gsap.to(barRef.current, {
        width: "100%",
        duration: 2.5,
        ease: "power2.out",
      });
    },
    { scope: loaderRef },
  );

  return (
    <div
      ref={loaderRef}
      className="fixed inset-0 z-9999 flex items-center justify-center bg-onyx font-megrim">
      <div className="flex w-[30%] min-w-70 flex-col items-center">
        {/* Number */}
        <div className="mb-5 overflow-hidden">
          <span className="font-megrim text-[clamp(4rem,8vw,8rem)] leading-none text-bright-snow/90 font-bold">
            {progress}
          </span>
        </div>

        {/* Loading bar */}
        <div className="h-0.5 w-full overflow-hidden bg-bright-snow/10">
          <div ref={barRef} className="h-full w-0 bg-bright-snow/70" />
        </div>
      </div>
    </div>
  );
};

export default InitialLoader;
