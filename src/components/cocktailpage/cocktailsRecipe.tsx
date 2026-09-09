"use client";

import { useLayoutEffect, useRef } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { Sparkles, Martini } from "lucide-react";

gsap.registerPlugin(ScrollTrigger);

type RecipeStepsProps = {
  name: string;
  recpie: string[];
};

const RecipeSteps = ({ name, recpie }: RecipeStepsProps) => {
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
          end: `+=${Math.max(recpie.length * 700, 1800)}`,

          scrub: 1,

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
  }, [recpie]);

  return (
    <section
      ref={sectionRef}
      className="relative min-h-screen bg-onyx text-bright-snow">
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
            <div className="absolute left-1/2 top-0 h-full w-px -translate-x-1/2 bg-bright-stext-bright-snow/10" />

            {/* Active line */}
            <div className="absolute left-1/2 top-0 h-[65%] w-px -translate-x-1/2 bg-dark-amethyst" />

            {/* Numbers */}
            <div className="relative flex h-full flex-col justify-between">
              {recpie.map((_, index) => (
                <div
                  key={index}
                  className={`recipe-number recipe-number-${index} relative flex h-10 w-10 items-center justify-center rounded-full border border-bright-stext-bright-snow/10 bg-onyx text-xs font-medium transition-colors ${
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

          <div className="relative ml-20 min-h-105 sm:ml-24">
            {recpie.map((step, index) => (
              <article
                key={`${step}-${index}`}
                className="recipe-step absolute left-0 top-0 flex min-h-95 w-full items-center">
                <div className="max-w-3xl">
                  <p className="mb-5 text-xs uppercase tracking-[0.3em] text-bright-snow/30">
                    Step {String(index + 1).padStart(2, "0")}
                  </p>

                  <h3 className="mb-6 text-3xl font-medium tracking-tight sm:text-4xl lg:text-5xl">
                    {index === 0
                      ? "Let's begin."
                      : index === recpie.length - 1
                        ? "Finish your cocktail."
                        : "Next step."}
                  </h3>

                  <p className="max-w-2xl text-lg leading-8 text-bright-snow/55 sm:text-xl sm:leading-9">
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

      <div className="mx-auto max-w-4xl px-6 pb-32 pt-20 sm:px-10">
        <div className="rounded-4xl border border-bright-stext-bright-snow/10 bg-dark-amethyst/30 p-10 text-center sm:p-16">
          <div className="mx-auto mb-6 flex h-14 w-14 items-center justify-center rounded-full bg-dark-amethyst">
            <Sparkles size={22} />
          </div>

          <p className="mb-3 text-xs uppercase tracking-[0.3em] text-bright-snow/30">
            Recipe complete
          </p>

          <h3 className="text-3xl font-medium sm:text-4xl">
            Your {name} is ready.
          </h3>

          <p className="mx-auto mt-4 max-w-md leading-7 text-bright-snow/40">
            Followed every step? Now it&apos;s time to enjoy your cocktail.
          </p>

          <div className="mt-7 flex items-center justify-center gap-2 text-sm text-bright-snow/35">
            <Martini size={16} />
            <span>{recpie.length} steps completed</span>
          </div>
        </div>
      </div>
    </section>
  );
};

export default RecipeSteps;
