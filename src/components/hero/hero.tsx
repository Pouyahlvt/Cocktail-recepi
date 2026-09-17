"use client";

import Image from "next/image";
import martini from "../../../public/hero-martini.png";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

const Hero = () => {
  useGSAP(() => {
    gsap.to(".hero-text", {
      y: 0,
      duration: 1.2,
      ease: "power3.out",
      stagger: 0.15,
    });

    gsap.to(".martini-image", {
      x: 0,
      duration: 1.2,
      ease: "power3.out",
    });
  });

  return (
    <div className="hero flex h-screen w-full bg-onyx font-megrim text-bright-snow">
      <div className="mt-50 w-[60%] pl-10 z-10 max-sm:w-full max-sm:pl-5">
        <div className="w-full overflow-hidden ">
          <p className="hero-text translate-y-full text-8xl font-bold max-sm:text-7xl">
            Cocktails
          </p>
        </div>

        <div className="w-full overflow-hidden">
          <p className="hero-text translate-y-full text-8xl font-bold max-sm:text-7xl">
            Recpie
          </p>
        </div>

        <div className="w-full overflow-hidden mt-5">
          <p className="hero-text translate-y-full text-bright-snow/50 font-bold">
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
