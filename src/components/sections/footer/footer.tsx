"use client";

import gsap from "gsap";
import { useGSAP } from "@gsap/react";
import ScrollTrigger from "gsap/ScrollTrigger";
import { useRef } from "react";

gsap.registerPlugin(ScrollTrigger);

import Link from "next/link";

const Footer = () => {
  const text_one = "COCKTAILS";
  const text_two = "RECIPES";
  const footerRef = useRef<HTMLDivElement>(null);

  useGSAP(() => {
    if (!footerRef.current) return;

    gsap.to(".words", {
      x: 0,
      duration: 0.7,
      ease: "power3.out",
      stagger: 0.15,
      scrollTrigger: {
        trigger: footerRef.current,
        start: "top 80%",
      },
    });
  }, []);
  return (
    <div
      ref={footerRef}
      className="w-full min-h-screen bg-onyx font-megrim text-bright-snow overflow-x-hidden relative border-t-2 
    border-bright-snow/10 max-md:min-h-[70vh]">
      <section className="w-full px-15 py-5 text-9xl max-md:text-5xl mt-10">
        <div className="flex justify-center">
          {text_one.split("").map((word, i) => (
            <div
              key={`text-one-${i}`}
              className=" mx-auto flex overflow-hidden justify-center w-1/9 h-fit ">
              <span className="words text  font-black translate-x-[400%]">
                {word}
              </span>
            </div>
          ))}
        </div>
        <div className="flex justify-center">
          {text_two.split("").map((word, i) => (
            <div
              key={`text-two-${i}`}
              className=" mx-auto flex overflow-hidden justify-center w-1/7 h-fit">
              <span className="words text  font-black translate-x-[400%]">
                {word}
              </span>
            </div>
          ))}
        </div>
      </section>
      <section
        className="w-full flex items-center justify-center text-4xl my-20  px-50 max-md:grid-cols-1 max-md:grid max-md:px-0 
      max-md:text-2xl max-md:gap-y-10 max-md:justify-center">
        <Link
          className="group font-bold italic cursor-pointer border-b-2 pb-2 mx-auto max-md:text-nowrap max-md:px-2"
          href={"https://portfolio-pouyahalavat.vercel.app/"}>
          CONTACT ME{" "}
          <span className="-ml-10 opacity-0  group-hover:ml-2 group-hover:opacity-100 transition-all duration-300 ease-out ">
            ▶
          </span>
        </Link>
        <Link
          className="group font-bold italic cursor-pointer border-b-2 pb-2  mx-auto max-md:text-nowrap max-md:px-2"
          // create this section too , user can send cocktails details for me .
          href={"/sendRecipe"}>
          YOUR COCKTAILS{" "}
          <span className="-ml-10 opacity-0 group-hover:ml-2 group-hover:opacity-100 transition-all duration-300 ease-out ">
            ▶
          </span>
        </Link>
      </section>

      <div className="w-full h-10  absolute bottom-0 flex px-10 justify-between max-md:px-2">
        <p className="text-md max-md:text-[10px]">© POUYA HALAVAT, 2026</p>
        <p className="text-xl max-md:text-md">
          always be DRUNK <span className="ml-2">{"*_*"}</span>
        </p>
      </div>
    </div>
  );
};

export default Footer;
