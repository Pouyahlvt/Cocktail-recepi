"use client";

import { useEffect, useRef, useState } from "react";
import gsap from "gsap";
import CocktailCard from "../../cocktailsCard/card";
import ScrollTrigger from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

interface Cocktail {
  id: number;
  name: string;
  type: string;
  image: string;
  alcohol: string;
  difficulty: "Easy" | "Medium" | "Hard";
  favorites: number;
}

const COCKTAILS_PER_PAGE = 20;

// One fake cocktail
const fakeCocktail: Cocktail = {
  id: 1,
  name: "Negroni",
  type: "Classic",
  image: "/cocktails/negroni.png",
  alcohol: "Gin",
  difficulty: "Medium",
  favorites: 12400,
};

// Create 100 cocktails using the same cocktail data
const cocktails = Array.from({ length: 100 }, (_, index) => ({
  ...fakeCocktail,
  id: index + 1,
}));

export default function CocktailsPage() {
  const [currentPage, setCurrentPage] = useState(1);

  const gridRef = useRef<HTMLDivElement>(null);

  const totalPages = Math.ceil(cocktails.length / COCKTAILS_PER_PAGE);

  const startIndex = (currentPage - 1) * COCKTAILS_PER_PAGE;
  const currentCocktails = cocktails.slice(
    startIndex,
    startIndex + COCKTAILS_PER_PAGE,
  );

  useEffect(() => {
    if (!gridRef.current) return;

    gsap.fromTo(
      gridRef.current.children,
      {
        opacity: 0,
        y: 25,
      },
      {
        opacity: 1,
        y: 0,
        duration: 1.2,
        stagger: 0.15,
        ease: "power2.out",
        scrollTrigger: {
          trigger: gridRef.current,
          start: "top 80%",
        },
      },
    );

    gsap.fromTo(
      ".text-section",
      {
        opacity: 0,
        y: 25,
      },
      {
        opacity: 1,
        y: 0,
        duration: 1.2,
        ease: "power2.out",
        scrollTrigger: {
          trigger: ".text-section",
          start: "top 90%",
        },
      },
    );
  }, [currentPage]);

  const changePage = (page: number) => {
    if (page < 1 || page > totalPages || page === currentPage) return;

    setCurrentPage(page);

    gridRef.current?.scrollIntoView({
      block: "start",
      behavior: "smooth",
    });
  };

  return (
    <main className="min-h-screen bg-onyx px-10 py-20 font-megrim">
      {/* Header */}
      <section className="text-section mx-auto mb-46 max-w-7xl text-center">
        <h1 className="font-megrim text-7xl text-bright-snow ">
          Cocktails Recipes
        </h1>

        <p className="mt-4 text-base text-bright-snow/60   font-semibold ">
          Discover All recpie
        </p>
      </section>

      {/* Cocktail Grid */}
      <section className="mx-auto max-w-7xl">
        <div ref={gridRef} className="grid grid-cols-4 gap-x-6 gap-y-10">
          {currentCocktails.map((cocktail, index) => (
            <div
              key={`${cocktail.name}-${index}`}
              className="
            h-95
            w-62.5
            md:h-105
            md:w-70
            ">
              <CocktailCard
                name={cocktail.name}
                image={cocktail.image}
                type={cocktail.type}
                alcohol={cocktail.alcohol}
                difficulty={cocktail.difficulty}
                favorites={cocktail.favorites}
              />
            </div>
          ))}
        </div>
      </section>

      {/* Pagination */}
      <Pagination
        currentPage={currentPage}
        totalPages={totalPages}
        onPageChange={changePage}
      />
    </main>
  );
}

type PaginationProps = {
  currentPage: number;
  totalPages: number;
  onPageChange: (page: number) => void;
};

function Pagination({
  currentPage,
  totalPages,
  onPageChange,
}: PaginationProps) {
  const getPages = () => {
    // 5 pages or less
    if (totalPages <= 5) {
      return Array.from({ length: totalPages }, (_, i) => i + 1);
    }

    // First pages
    if (currentPage <= 3) {
      return [1, 2, 3, "...", totalPages];
    }

    // Last pages
    if (currentPage >= totalPages - 2) {
      return [1, "...", totalPages - 2, totalPages - 1, totalPages];
    }

    // Middle
    return [
      1,
      "...",
      currentPage - 1,
      currentPage,
      currentPage + 1,
      "...",
      totalPages,
    ];
  };

  const pages = getPages();

  return (
    <div className="mt-20 flex items-center justify-center gap-3">
      {/* Previous */}
      <button
        onClick={() => onPageChange(currentPage - 1)}
        disabled={currentPage === 1}
        className="flex h-12 w-12 items-center justify-center rounded-full bg-bright-snow/5 text-2xl hover:bg-bright-snow/50
        text-bright-snow transition duration-300 disabled:pointer-events-none cursor-pointer hover:shadow-2xl/50 shadow-bright-snow/50  
        disabled:opacity-30 active:scale-90">
        ◁
      </button>

      {/* Numbers */}
      {pages.map((page, index) => {
        if (page === "...") {
          return (
            <span
              key={`dots-${index}`}
              className="flex h-10 w-10 items-center justify-center text-bright-snow/40">
              ...
            </span>
          );
        }

        const pageNumber = page as number;
        const active = pageNumber === currentPage;

        return (
          <button
            key={pageNumber}
            onClick={() => onPageChange(pageNumber)}
            className={`flex h-10 w-8 items-center justify-center rounded-full transition cursor-pointer font-black ${
              active
                ? " text-bright-snow -translate-y-3 text-3xl"
                : "text-bright-snow/60 hover:bg-bright-stext-bright-snow/10 hover:text-bright-snow hover:text-2xl hover:-translate-y-2"
            }`}>
            {pageNumber}
          </button>
        );
      })}

      {/* Next */}
      <button
        onClick={() => onPageChange(currentPage + 1)}
        disabled={currentPage === totalPages}
        className="flex h-12 w-12 items-center justify-center rounded-full bg-bright-snow/5 text-2xl hover:bg-bright-snow/50
        text-bright-snow transition duration-300 disabled:pointer-events-none cursor-pointer hover:shadow-2xl/50 shadow-bright-snow/50  
        disabled:opacity-30 active:scale-90">
        ▷
      </button>
    </div>
  );
}
