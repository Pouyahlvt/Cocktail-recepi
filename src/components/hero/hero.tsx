"use client";

import Image from "next/image";
import martini from "../../../public/hero-martini.png";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

const Hero = () => {
  useGSAP(() => {
    // Initial entrance animation
    const intro = gsap.timeline();

    intro
      .to(".first-text", {
        y: 0,
        duration: 0.7,
        ease: "power3.out",
      })
      .to(
        ".sec-text",
        {
          y: 0,
          duration: 0.7,
          ease: "power3.out",
        },
        "<=",
      )
      .to(
        ".discover-text",
        {
          y: 0,
          duration: 0.7,
          ease: "power3.out",
        },
        "<=",
      )
      .to(
        ".martini-image",
        {
          x: 0,
          duration: 1,
          ease: "power2.out",
        },
        "<=",
      );

    // Scroll animation
    const scrollTl = gsap.timeline({
      scrollTrigger: {
        trigger: ".hero",
        start: "bottom 90%",
        end: "bottom 10%",
        scrub: true,
      },
    });

    scrollTl
      .to(
        ".first-text",
        {
          y: "120%",
          ease: "none",
        },
        0,
      )
      .to(
        ".sec-text",
        {
          y: "120%",
          ease: "none",
        },
        0.05,
      )
      .to(
        ".discover-text",
        {
          y: "120%",
          ease: "none",
        },
        0.05,
      )
      .to(
        ".martini-image",
        {
          x: "200%",
          y: "20%",
          rotate: 15,
          ease: "none",
        },
        0,
      );
  });

  return (
    <div className="hero flex h-screen w-full bg-onyx font-megrim text-bright-snow">
      <div className="mt-50 w-[60%] pl-10 z-10 max-sm:w-full max-sm:pl-5">
        <div className="w-full overflow-hidden ">
          <p className="first-text translate-y-full text-8xl font-bold max-sm:text-7xl">
            Cocktails
          </p>
        </div>

        <div className="w-full overflow-hidden">
          <p className="sec-text translate-y-full text-8xl font-bold max-sm:text-7xl">
            Recpie
          </p>
        </div>

        <div className="w-full overflow-hidden mt-5">
          <p className="discover-text translate-y-full text-bright-snow/50 font-bold">
            Dscover cocktails recpie i love {"?"}
          </p>
        </div>
      </div>

      <div className="mt-30 w-[40%] overflow-hidden select-none max-sm:absolute max-sm:w-full max-sm:opacity-10">
        <Image
          src={martini}
          alt="martini"
          width={300}
          height={200}
          className="martini-image translate-x-[200%] max-sm:mx-auto  "
        />
      </div>
    </div>
  );
};

export default Hero;
