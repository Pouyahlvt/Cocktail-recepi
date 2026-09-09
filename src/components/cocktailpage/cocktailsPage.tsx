/* eslint-disable @next/next/no-img-element */
"use client";

import { useLayoutEffect, useRef } from "react";
import { gsap } from "gsap";
import { ScrollToPlugin } from "gsap/ScrollToPlugin";
import { ArrowDown, Eye, Heart, Martini, Sparkles, Wine } from "lucide-react";
import RecipeSteps from "./cocktailsRecipe";

gsap.registerPlugin(ScrollToPlugin);

type Cocktail = {
  id: number;
  name: string;
  type: string;
  image: string;
  alcohol: string;
  strongGrade: string;
  difficulty: string;
  favourites: number;
  views: number;
  toppings: string[];
  recpie: string[];
};

const CocktailRecipe = (cocktail: Cocktail) => {
  const pageRef = useRef<HTMLDivElement>(null);
  const recipeRef = useRef<HTMLElement>(null);

  const {
    name,
    type,
    image,
    alcohol,
    strongGrade,
    difficulty,
    favourites,
    views,
    toppings,
    recpie,
  } = cocktail;

  useLayoutEffect(() => {
    const ctx = gsap.context(() => {
      const intro = gsap.timeline();

      intro
        .from(".recipe-label", {
          y: 20,
          opacity: 0,
          duration: 0.6,
          ease: "power3.out",
        })
        .from(
          ".cocktail-name",
          {
            y: 70,
            opacity: 0,
            duration: 1,
            ease: "power4.out",
          },
          "-=0.3",
        )
        .from(
          ".cocktail-meta",
          {
            y: 25,
            opacity: 0,
            duration: 0.7,
            stagger: 0.08,
            ease: "power3.out",
          },
          "-=0.5",
        )
        .from(
          ".cocktail-image",
          {
            scale: 0.9,
            opacity: 0,
            duration: 1,
            ease: "power3.out",
          },
          "-=0.8",
        )
        .from(
          ".ingredient-card",
          {
            y: 40,
            opacity: 0,
            duration: 0.8,
            ease: "power3.out",
          },
          "-=0.5",
        );

      gsap.from(".recipe-step", {
        scrollTrigger: {
          trigger: recipeRef.current,
          start: "top 75%",
        },
        y: 40,
        opacity: 0,
        duration: 0.7,
        stagger: 0.12,
        ease: "power3.out",
      });
    }, pageRef);

    return () => ctx.revert();
  }, []);

  const jumpToRecipe = () => {
    if (!recipeRef.current) return;

    gsap.to(window, {
      duration: 1,
      scrollTo: {
        y: recipeRef.current,
        offsetY: 40,
      },
      ease: "power3.inOut",
    });
  };

  return (
    <main
      ref={pageRef}
      className="min-h-screen overflow-hidden bg-onyx text-bright-snow font-megrim">
      <section className="mx-auto max-w-7xl px-6 pb-20 pt-10 sm:px-10 lg:px-12 lg:pb-28 lg:pt-16">
        <div className="grid items-center gap-12 lg:grid-cols-[0.9fr_1.1fr] lg:gap-20">
          {/* ================= LEFT ================= */}

          <div className="order-2 lg:order-1">
            {/* Small label */}
            <div className="recipe-label mb-6 flex items-center gap-3">
              <span className="h-px w-8 bg-bright-snow/30 text-bright-snow/30" />
              <span className="text-xs uppercase tracking-[0.3em] text-bright-snow/45">
                Cocktail Recipe
              </span>
            </div>

            {/* Name */}
            <h1 className="cocktail-name max-w-xl text-6xl font-medium tracking-[-0.04em] sm:text-7xl lg:text-[6.5rem] lg:leading-[0.9]">
              {name}
            </h1>

            {/* Type */}
            <div className="cocktail-meta mt-8 flex items-center gap-3">
              <span className="rounded-full border border-bright-sntext-bright-snow/15 bg-lnk-black/60 px-4 py-2 text-sm">
                {type}
              </span>

              <span className="text-sm text-bright-snow/35">
                #{String(cocktail.id).padStart(3, "0")}
              </span>
            </div>

            {/* Stats */}
            <div className="cocktail-meta mt-8 flex gap-8 ">
              <div className="flex items-center gap-2.5">
                <Heart
                  size={19}
                  strokeWidth={1.5}
                  className="text-bright-snow/60"
                />

                <p className="text-lg font-medium">
                  {favourites.toLocaleString()}
                </p>

                <p className="text-xs text-bright-snow/35">Favourites</p>
              </div>

              <div className="h-10 w-px bg-bright-sntext-bright-snow/10" />

              <div className="flex items-center gap-2.5">
                <Eye
                  size={19}
                  strokeWidth={1.5}
                  className="text-bright-snow/60"
                />

                <p className="text-lg font-medium">{views.toLocaleString()}</p>

                <p className="text-xs text-bright-snow/35">Views</p>
              </div>
            </div>

            {/* Details */}
            <div className="cocktail-meta mt-8 grid max-w-lg grid-cols-3 border-y border-bright-sntext-bright-snow/10 py-5">
              <div>
                <p className="mb-1 text-xs text-bright-snow/35">Alcohol</p>

                <p className="flex items-center gap-2 text-sm">
                  <Wine size={15} />
                  {alcohol}
                </p>
              </div>

              <div className="border-l border-bright-sntext-bright-snow/10 pl-5">
                <p className="mb-1 text-xs text-bright-snow/35">Strength</p>

                <p className="text-sm">{strongGrade}</p>
              </div>

              <div className="border-l border-bright-sntext-bright-snow/10 pl-5">
                <p className="mb-1 text-xs text-bright-snow/35">Difficulty</p>

                <p className="text-sm">{difficulty}</p>
              </div>
            </div>

            {/* Button */}
            <button
              onClick={jumpToRecipe}
              className="cocktail-meta group mt-10 flex items-center gap-4 rounded-full bg-bright-sntext-bright-snow px-6 py-3.5 text-sm font-medium text-onyx transition-transform duration-300 hover:scale-[1.03]">
              <span>Start recipe</span>

              <span className="flex h-7 w-7 items-center justify-center rounded-full bg-onyx text-bright-snow">
                <ArrowDown
                  size={14}
                  className="transition-transform duration-300 group-hover:translate-y-1"
                />
              </span>
            </button>
          </div>

          {/* ================= RIGHT ================= */}

          <div className="order-1 lg:order-2">
            <div className="relative mx-auto max-w-155">
              {/* Image */}
              <div className="cocktail-image relative aspect-4/5 overflow-hidden rounded-4xl bg-dark-amethyst">
                <img
                  src={image}
                  alt={name}
                  className="h-full w-full object-cover"
                />

                {/* Image gradient */}
                <div className="absolute inset-0 bg-linear-to-t from-onyx/50 via-transparent to-transparent" />

                {/* Floating type */}
                <div className="absolute right-5 top-5 rounded-full border border-bright-sntext-bright-snow/15 bg-onyx/40 px-4 py-2 text-xs backdrop-blur-md">
                  {type}
                </div>
              </div>

              {/* Ingredients glass card */}
              <div className="ingredient-card absolute -bottom-7 left-5 right-5 rounded-3xl border border-bright-sntext-bright-snow/15 bg-onyx/55 p-6 shadow-2xl backdrop-blur-2xl sm:left-8 sm:right-8 sm:p-7">
                <div className="mb-5 flex items-center justify-between">
                  <div>
                    <p className="text-xs uppercase tracking-[0.2em] text-bright-snow/35">
                      Toppings
                    </p>

                    <h3 className="mt-1 text-lg font-medium">
                      Finish your cocktail
                    </h3>
                  </div>

                  <div className="flex h-10 w-10 items-center justify-center rounded-full bg-lnk-black">
                    <Sparkles size={17} />
                  </div>
                </div>

                <div className="flex flex-wrap gap-2">
                  {toppings.map((topping, index) => (
                    <span
                      key={`${topping}-${index}`}
                      className="rounded-full border border-bright-sntext-bright-snow/10 bg-dark-amethyst/80 px-4 py-2 text-sm text-bright-snow/75">
                      {topping}
                    </span>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ================================================= */}
      {/* RECIPE */}
      {/* ================================================= */}
      <section ref={recipeRef}>
        <RecipeSteps name={name} recpie={recpie} />
      </section>
    </main>
  );
};

export default CocktailRecipe;

// used this as recpie sections

// <section
//         ref={recipeRef}
//         className="mx-auto max-w-5xl px-6 pb-28 pt-24 sm:px-10 lg:px-12">
//         {/* Header */}
//         <div className="mb-14 flex flex-col justify-between gap-6 border-b border-bright-sntext-bright-snow/10 pb-8 sm:flex-row sm:items-end">
//           <div>
//             <p className="mb-3 text-xs uppercase tracking-[0.3em] text-bright-snow/35">
//               Step by step
//             </p>

//             <h2 className="text-4xl font-medium tracking-tight sm:text-5xl">
//               How to make it
//             </h2>
//           </div>

//           <div className="flex items-center gap-2 text-sm text-bright-snow/35">
//             <Martini size={16} />

//             <span>{recpie.length} steps</span>
//           </div>
//         </div>

//         {/* Recipe steps */}
//         <div className="space-y-4">
//           {recpie.map((step, index) => (
//             <article
//               key={`${step}-${index}`}
//               className="recipe-step group relative overflow-hidden rounded-3xl border border-bright-sntext-bright-snow/10 bg-dark-amethyst/35 p-6 transition-all duration-500 hover:border-bright-sntext-bright-snow/20 hover:bg-dark-amethyst/55 sm:p-8">
//               {/* Hover glow */}
//               <div className="pointer-events-none absolute -right-20 -top-20 h-40 w-40 rounded-full bg-lnk-black/40 blur-3xl opacity-0 transition-opacity duration-500 group-hover:opacity-100" />

//               <div className="relative flex gap-5 sm:gap-8">
//                 {/* Number */}
//                 <div className="flex shrink-0 flex-col items-center">
//                   <span className="flex h-12 w-12 items-center justify-center rounded-full bg-lnk-black text-sm font-medium">
//                     {String(index + 1).padStart(2, "0")}
//                   </span>

//                   {index !== recpie.length - 1 && (
//                     <span className="mt-3 h-full w-px bg-bright-sntext-bright-snow/10" />
//                   )}
//                 </div>

//                 {/* Step content */}
//                 <div className="pb-5 pt-1">
//                   <p className="mb-2 text-xs uppercase tracking-[0.2em] text-bright-snow/30">
//                     Step {index + 1}
//                   </p>

//                   <p className="max-w-2xl text-lg leading-8 text-bright-snow/80 sm:text-xl sm:leading-9">
//                     {step}
//                   </p>
//                 </div>
//               </div>
//             </article>
//           ))}
//         </div>

//         {/* Bottom */}
//         <div className="mt-16 rounded-3xl border border-bright-sntext-bright-snow/10 bg-lnk-black/30 p-8 text-center sm:p-12">
//           <Sparkles size={24} className="mx-auto mb-4 text-bright-snow/60" />

//           <h3 className="text-2xl font-medium">Your {name} is ready.</h3>

//           <p className="mx-auto mt-3 max-w-md text-sm leading-6 text-bright-snow/40">
//             Follow each step carefully and finish with your preferred topping.
//           </p>
//         </div>
//       </section>
