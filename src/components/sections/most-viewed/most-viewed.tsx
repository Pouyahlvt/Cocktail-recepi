"use client";

import CocktailGalleryMV from "./galleryMV";
import { useRef } from "react";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";
import ScrollTrigger from "gsap/ScrollTrigger";
import { CocktailsType } from "@/src/types/cocktails.ts/cocktails_data";
gsap.registerPlugin(ScrollTrigger);

interface Props {
  cocktails: CocktailsType[];
}

const Most_viewed = ({ cocktails }: Props) => {
  const headOneRef = useRef<HTMLHeadingElement>(null);
  const headTwoRef = useRef<HTMLHeadingElement>(null);
  const galleryRef = useRef<HTMLDivElement>(null);

  useGSAP(() => {
    if (!headOneRef.current || !headTwoRef.current || !galleryRef.current)
      return;

    gsap.fromTo(
      headOneRef.current,
      { opacity: 0, x: -50 },
      {
        opacity: 1,
        x: 0,
        duration: 1,
        ease: "power3.out",
        scrollTrigger: {
          trigger: headOneRef.current,
          start: "top center",
        },
      },
    );

    gsap.fromTo(
      headTwoRef.current,
      { opacity: 0, x: -50 },
      {
        opacity: 1,
        x: 0,
        duration: 1,
        ease: "power3.out",
        scrollTrigger: {
          trigger: headTwoRef.current,
          start: "top center",
        },
      },
    );

    gsap.fromTo(
      galleryRef.current,
      { opacity: 0, y: 70 },
      {
        opacity: 1,
        y: 0,
        duration: 1.2,
        ease: "power3.out",
        scrollTrigger: {
          trigger: galleryRef.current,
          start: "top center",
        },
      },
    );
  }, []);

  return (
    <div className="w-full min-h-screen bg-onyx font-megrim pt-20">
      <div className="sm:flex mb-30 mx-10 justify-between pt-10 max-sm:mb-10">
        <h1
          ref={headOneRef}
          className="text-6xl text-bright-snow max-sm:text-3xl ">
          This Week <br /> Most Viewd
        </h1>
        <h2
          ref={headTwoRef}
          className=" text-xl text-bright-snow/50 my-auto max-sm:text-sm">
          Discover of cocktails have
          <br />
          more viewed in this week
        </h2>
      </div>
      <div ref={galleryRef} className="w-full pb-20 ">
        <CocktailGalleryMV cocktails={cocktails} />
      </div>
    </div>
  );
};

export default Most_viewed;
