"use client";

import Image from "next/image";
import martini from "../../../public/hero-martini.png";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";

const Hero = () => {
  useGSAP(() => {
    const tl = gsap.timeline();

    tl.to(".first-text", {
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
        "<=0.5",
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
  }, []);

  return (
    <div className="w-full h-screen bg-onyx flex font-megrim text-bright-snow">
      <div className="w-[60%] mt-50 pl-10">
        <div className="w-full overflow-hidden ">
          <p className="first-text text-8xl font-bold translate-y-full">
            Cocktails
          </p>
        </div>
        <div className="w-full overflow-hidden ">
          <p className="sec-text text-8xl font-bold translate-y-full">Recpie</p>
        </div>
      </div>
      <div className=" w-[40%] mt-30 overflow-hidden select-none">
        <Image
          src={martini}
          alt={"martini"}
          width={300}
          height={200}
          className=" martini-image translate-x-[200%] "
        />
      </div>
    </div>
  );
};

export default Hero;
