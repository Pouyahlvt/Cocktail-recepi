"use client";

import CocktailGallery from "./CocktailsGallery";
import gsap from "gsap";
import ScrollTrigger from "gsap/ScrollTrigger";
import { useEffect, useRef } from "react";

gsap.registerPlugin(ScrollTrigger);

const PopularCocktails = () => {
  const headingRef = useRef<HTMLDivElement>(null);
  const galleryRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!headingRef.current || !galleryRef.current) return;

    gsap.fromTo(
      headingRef.current,
      {
        opacity: 0,
        y: 50,
      },
      {
        opacity: 1,
        y: 0,
        duration: 1.2,
        scrollTrigger: {
          trigger: headingRef.current,
          start: "top 60%",
        },
      },
    );

    gsap.fromTo(
      galleryRef.current,
      {
        opacity: 0,
        y: 50,
      },
      {
        opacity: 1,
        y: 0,
        duration: 1.2,
        scrollTrigger: {
          trigger: headingRef.current,
          start: "top 20%",
        },
      },
    );

    return () => {
      ScrollTrigger.getAll().forEach((trigger) => trigger.kill());
    };
  }, []);

  return (
    <section className="relative min-h-[115vh] overflow-hidden bg-onyx text-bright-snow font-megrim">
      <div className="mx-auto flex min-h-[115vh] w-full max-w-[1600px] flex-col px-6 py-24 md:px-10 lg:px-16">
        {/* Heading */}
        <div ref={headingRef} className="text-center mb-30">
          <h2 className=" text-4xl font-medium uppercase tracking-tight md:text-6xl lg:text-7xl">
            Popular Cocktails
          </h2>

          <p className="mx-auto mt-5 max-w-md text-sm leading-6 text-bright-snow/50 md:text-base">
            Discover the drinks everyone loves.
          </p>
        </div>

        {/* Gallery */}
        <div
          ref={galleryRef}
          className="flex flex-1 items-center justify-center">
          <CocktailGallery />
        </div>
      </div>
    </section>
  );
};

export default PopularCocktails;
