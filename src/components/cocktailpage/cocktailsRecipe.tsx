"use client";

import { useLayoutEffect, useRef } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { Martini } from "lucide-react";

gsap.registerPlugin(ScrollTrigger);

type RecipeStepsProps = {
  name: string;
  recipe: string[];
};

const RecipeSteps = ({ name, recipe }: RecipeStepsProps) => {
  const sectionRef = useRef<HTMLElement>(null);
  const timelineRef = useRef<HTMLDivElement>(null);
  const stepsRef = useRef<HTMLDivElement>(null);

  useLayoutEffect(() => {
    const ctx = gsap.context(() => {
      const steps = gsap.utils.toArray<HTMLElement>(".recipe-step");

      if (!steps.length) return;

      // ---------------------------------------------
      // INITIAL STATE
      // ---------------------------------------------

      gsap.set(steps, {
        y: 100,
        opacity: 0,
      });

      gsap.set(steps[0], {
        y: 0,
        opacity: 1,
      });

      // All numbers start inactive
      gsap.set(".recipe-number", {
        opacity: 0.25,
        scale: 1,
      });

      // First number active
      gsap.set(".recipe-number-0", {
        opacity: 1,
        scale: 1.15,
      });

      // ---------------------------------------------
      // MASTER TIMELINE
      // ---------------------------------------------

      const tl = gsap.timeline({
        defaults: {
          ease: "none",
        },

        scrollTrigger: {
          trigger: sectionRef.current,

          // Pin the recipe section
          pin: true,

          // How long the pinned animation lasts
          end: `+=${Math.max(recipe.length * 700, 1800)}`,

          scrub: 0.5,

          anticipatePin: 1,

          invalidateOnRefresh: true,
        },
      });

      // ---------------------------------------------
      // STEP TRANSITIONS
      // ---------------------------------------------

      for (let i = 0; i < steps.length - 1; i++) {
        const currentStep = steps[i];
        const nextStep = steps[i + 1];

        const currentNumber = `.recipe-number-${i}`;
        const nextNumber = `.recipe-number-${i + 1}`;

        tl.to(
          currentStep,
          {
            y: -100,
            opacity: 0,
            duration: 1,
          },
          "+=0.15",
        );

        tl.to(
          nextStep,
          {
            y: 0,
            opacity: 1,
            duration: 1,
          },
          "<",
        );

        // Current number becomes inactive
        tl.to(
          currentNumber,
          {
            opacity: 0.25,
            scale: 1,
            duration: 0.35,
          },
          "<",
        );

        // Next number becomes active
        tl.to(
          nextNumber,
          {
            opacity: 1,
            scale: 1.15,
            duration: 0.35,
          },
          "<0.65",
        );
      }

      // ---------------------------------------------
      // FINISH
      // ---------------------------------------------

      // Keep final step visible for a moment
      tl.to(
        {},
        {
          duration: 0.7,
        },
      );
    }, sectionRef);

    return () => ctx.revert();
  }, [recipe]);

  return (
    <section
      ref={sectionRef}
      className="relative min-h-screen bg-onyx text-bright-snow ">
      <div
        ref={timelineRef}
        className="relative mx-auto flex min-h-screen max-w-6xl flex-col justify-center px-6 py-20 sm:px-10 lg:px-12">
        {/* ========================================= */}
        {/* HEADER */}
        {/* ========================================= */}

        <div className="mb-12 pl-20 sm:pl-24">
          <p className="mb-3 text-xs uppercase tracking-[0.3em] text-bright-snow/35">
            Step by step
          </p>

          <h2 className="text-4xl font-medium tracking-tight sm:text-5xl">
            How to make {name}
          </h2>
        </div>

        {/* ========================================= */}
        {/* RECIPE TIMELINE */}
        {/* ========================================= */}

        <div ref={stepsRef} className="relative min-h-105">
          {/* ========================================= */}
          {/* LEFT STATIC LINE */}
          {/* ========================================= */}

          <div className="absolute left-5 top-0 h-full sm:left-8">
            {/* Main line */}
            <div className="absolute left-1/2 top-0 h-full w-px -translate-x-1/2 bg-bright-snow/30" />

            {/* Numbers */}
            <div className="relative flex h-full flex-col justify-between">
              {recipe.map((_, index) => (
                <div
                  key={index}
                  className={`recipe-number recipe-number-${index} relative flex h-10 w-10 items-center justify-center rounded-full 
                  border border-bright-snow text-bright-snow bg-onyx text-xs font-medium transition-colors z-10 ${
                    index === 0 ? "shadow-[0_0_25px_rgba(17,0,54,0.8)]" : ""
                  }`}>
                  {String(index + 1).padStart(2, "0")}

                  {/* Glow */}
                  <span className="absolute -inset-1.25 -z-10 rounded-full bg-dark-amethyst/30 blur-md" />
                </div>
              ))}
            </div>
          </div>

          {/* ========================================= */}
          {/* STEPS */}
          {/* ========================================= */}

          <div className="relative ml-20 min-h-105 sm:ml-24 ">
            {recipe.map((step, index) => (
              <article
                key={`${step}-${index}`}
                className="recipe-step absolute left-0 top-0 flex min-h-95 w-full items-center ">
                <div className="w-full  ">
                  <p className="mb-5 text-xs uppercase tracking-[0.3em] text-bright-snow/50">
                    Step {String(index + 1).padStart(2, "0")}
                  </p>

                  <p className=" text-lg leading-8 text-bright-snow sm:text-5xl sm:leading-9 text-center">
                    {step}
                  </p>
                </div>
              </article>
            ))}
          </div>
        </div>
      </div>

      {/* ============================================= */}
      {/* AFTER TIMELINE */}
      {/* ============================================= */}

      <div className="mt-20 pb-30 w-full  justify-center flex ">
        <div className="group cursor-wait">
          <div className="flex  justify-center ">
            <span className="uppercase font-black text-6xl">
              Your {name} is Ready
            </span>
          </div>
          <div className="flex justify-center ">
            <span className="text-5xl font-bold mt-10 uppercase">Cheers</span>
            <div className="flex mt-8 ml-20 w-30">
              <Martini
                size={60}
                className="  transition-all duration-300 ease-in group-hover:rotate-20"
              />
              <Martini
                size={60}
                className=" ml-3 transition-all duration-300 ease-in group-hover:-rotate-20 group-hover:ml-0"
              />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default RecipeSteps;
