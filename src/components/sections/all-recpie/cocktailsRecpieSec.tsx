"use client";

import { useEffect, useRef, useState } from "react";
import gsap from "gsap";
import CocktailCard from "../../cocktailsCard/card";

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
        duration: 0.5,
        stagger: 0.05,
        ease: "power2.out",
      },
    );
  }, [currentPage]);

  const changePage = (page: number) => {
    if (page < 1 || page > totalPages || page === currentPage) return;

    setCurrentPage(page);

    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  };

  return (
    <main className="min-h-screen bg-onyx px-10 py-20 font-megrim">
      {/* Header */}
      <section className="mx-auto mb-16 max-w-7xl text-center">
        <h1 className="font-megrim text-5xl text-bright-snow">
          Cocktails Recipes
        </h1>

        <p className="mt-4 text-base text-bright-snow/60  mb-30 font-semibold ">
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
        className="flex h-10 w-10 items-center justify-center rounded-full border border-bright-stext-bright-snow/10 text-bright-snow transition hover:border-bright-stext-bright-snow/30 disabled:pointer-events-none disabled:opacity-30">
        ←
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
            className={`flex h-10 w-10 items-center justify-center rounded-full transition cursor-pointer ${
              active
                ? "bg-bright-snow/50 text-onyx text-3xl"
                : "text-bright-snow/60 hover:bg-bright-stext-bright-snow/10 hover:text-bright-snow"
            }`}>
            {pageNumber}
          </button>
        );
      })}

      {/* Next */}
      <button
        onClick={() => onPageChange(currentPage + 1)}
        disabled={currentPage === totalPages}
        className="flex h-10 w-10 items-center justify-center rounded-full border border-bright-stext-bright-snow/10 text-bright-snow transition hover:border-bright-stext-bright-snow/30 disabled:pointer-events-none disabled:opacity-30">
        →
      </button>
    </div>
  );
}
