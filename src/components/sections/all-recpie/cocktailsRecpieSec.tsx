"use client";

import { useEffect, useRef, useState } from "react";
import gsap from "gsap";
import ScrollTrigger from "gsap/ScrollTrigger";

import CocktailCard from "../../cocktailsCard/card";
import Filtering from "../../ui/filtering";
import { cocktails_data } from "@/src/data/cocktailsData";

gsap.registerPlugin(ScrollTrigger);

const COCKTAILS_PER_PAGE = 20;

type CocktailsPageProps = {
  cocktails?: typeof cocktails_data;
  just_cards?: boolean;
};

export default function CocktailsPage({
  cocktails = cocktails_data,
  just_cards = false,
}: CocktailsPageProps) {
  const [currentPage, setCurrentPage] = useState(1);

  // Filtering states
  const [alcohol, setAlcohol] = useState("");
  const [difficulty, setDifficulty] = useState("");
  const [strongly, setStrongly] = useState("");
  const [sort, setSort] = useState("");

  const gridRef = useRef<HTMLDivElement>(null);

  /*
   * -----------------------------------------
   * FILTER + SORT
   * -----------------------------------------
   *
   * We create a NEW array instead of changing
   * the original cocktails array.
   */
  const filteredCocktails = cocktails
    .filter((cocktail) => {
      // Alcohol filter
      if (alcohol !== "" && cocktail.alcohol !== alcohol) {
        return false;
      }

      // Difficulty filter
      if (difficulty !== "" && cocktail.difficulty !== difficulty) {
        return false;
      }

      // Strong grade filter
      if (strongly !== "") {
        if (strongly === "Light") {
          if (cocktail.strongGrade > 40) {
            return false;
          }
        }

        if (strongly === "Standard") {
          if (cocktail.strongGrade <= 40 || cocktail.strongGrade > 70) {
            return false;
          }
        }

        if (strongly === "Very Strong") {
          if (cocktail.strongGrade <= 70) {
            return false;
          }
        }
      }

      return true;
    })
    /*
     * -----------------------------------------
     * SORT
     * -----------------------------------------
     *
     * [...array] makes sure sort() does not
     * mutate the original cocktails array.
     */
    .slice()
    .sort((a, b) => {
      if (sort === "A to Z") {
        return a.name.localeCompare(b.name);
      }

      if (sort === "popular") {
        return b.favourites - a.favourites;
      }

      if (sort === "views") {
        return b.views - a.views;
      }

      return 0;
    });

  /*
   * -----------------------------------------
   * PAGINATION
   * -----------------------------------------
   */

  const totalPages = Math.ceil(filteredCocktails.length / COCKTAILS_PER_PAGE);

  const startIndex = (currentPage - 1) * COCKTAILS_PER_PAGE;

  const currentCocktails = filteredCocktails.slice(
    startIndex,
    startIndex + COCKTAILS_PER_PAGE,
  );

  /*
   * -----------------------------------------
   * RESET PAGE WHEN FILTERS CHANGE
   * -----------------------------------------
   *
   * Example:
   *
   * User is on page 4
   * ↓
   * selects Vodka
   * ↓
   * filtered result only has 2 pages
   * ↓
   * automatically goes back to page 1
   */
  useEffect(() => {
    // eslint-disable-next-line react-hooks/set-state-in-effect
    setCurrentPage(1);
  }, [alcohol, difficulty, strongly, sort]);

  /*
   * -----------------------------------------
   * GSAP CARD ANIMATION
   * -----------------------------------------
   */

  useEffect(() => {
    if (!gridRef.current) return;

    const cards = gridRef.current.children;

    if (!cards.length) return;

    // Kill old ScrollTriggers connected to this grid
    ScrollTrigger.getAll().forEach((trigger) => {
      if (trigger.trigger === gridRef.current) {
        trigger.kill();
      }
    });

    gsap.fromTo(
      cards,
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
          once: true,
        },
      },
    );

    return () => {
      ScrollTrigger.getAll().forEach((trigger) => {
        // eslint-disable-next-line react-hooks/exhaustive-deps
        if (trigger.trigger === gridRef.current) {
          trigger.kill();
        }
      });
    };
  }, [currentPage, alcohol, difficulty, strongly, sort]);

  /*
   * -----------------------------------------
   * HEADER GSAP ANIMATION
   * -----------------------------------------
   */

  useEffect(() => {
    const textSection = document.querySelector(".text-section");

    if (!textSection || just_cards) return;

    gsap.fromTo(
      textSection,
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
          trigger: textSection,
          start: "top 90%",
          once: true,
        },
      },
    );
  }, [just_cards]);

  /*
   * -----------------------------------------
   * CHANGE PAGE
   * -----------------------------------------
   */

  const changePage = (page: number) => {
    if (page < 1 || page > totalPages || page === currentPage) {
      return;
    }

    setCurrentPage(page);

    gridRef.current?.scrollIntoView({
      block: "start",
      behavior: "smooth",
    });
  };

  return (
    <main className="min-h-screen bg-onyx px-10 py-20 font-megrim">
      {/* Header */}
      <section
        className={`text-section mx-auto mb-26 max-w-7xl text-center ${
          just_cards ? "hidden" : ""
        }`}>
        <h1 className="font-megrim text-7xl text-bright-snow max-sm:text-3xl">
          COCKTAILS RECIPES
        </h1>

        <p className="mt-4 text-base font-semibold text-bright-snow/60 max-sm:text-sm">
          Discover All recpie
        </p>
      </section>

      {/* Cocktail Grid */}
      <section className="mx-auto max-w-7xl">
        {/* Filtering */}
        <div className={`${just_cards ? "hidden" : ""}`}>
          <Filtering
            setAlcohol_filter={setAlcohol}
            setDifficulty_filter={setDifficulty}
            setStrongly_filter={setStrongly}
            setSort_filter={setSort}
          />
        </div>

        {/* Results */}
        <div
          ref={gridRef}
          className={`grid gap-x-6 gap-y-10 max-sm:gap-x-2 ${
            just_cards
              ? "grid-cols-3 max-md:grid-cols-2 max-sm:grid-cols-1"
              : "grid-cols-4 max-sm:grid-cols-2"
          }`}>
          {currentCocktails.map((cocktail, index) => (
            <div
              key={`${cocktail.name}-${index}`}
              className="h-95 w-full md:h-105 max-sm:h-80">
              <CocktailCard
                id={cocktail.id}
                name={cocktail.name}
                image={cocktail.image}
                type={cocktail.type}
                alcohol={cocktail.alcohol}
                difficulty={cocktail.difficulty}
                favorites={cocktail.favourites}
              />
            </div>
          ))}
        </div>

        {/* No Results */}
        {currentCocktails.length === 0 && (
          <div className="flex min-h-100 items-center justify-center">
            <p className="text-2xl font-bold text-bright-snow/60">
              No cocktails found.
            </p>
          </div>
        )}
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

/*
 * =========================================
 * PAGINATION
 * =========================================
 */

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
    <div
      className={`mt-20 flex items-center justify-center gap-3 max-sm:gap-1 ${
        pages.length === 1 ? "hidden" : ""
      }`}>
      {/* Previous */}
      <button
        onClick={() => onPageChange(currentPage - 1)}
        disabled={currentPage === 1}
        className="flex h-12 w-12 cursor-pointer items-center justify-center rounded-full bg-bright-snow/5 
        text-2xl text-bright-snow shadow-bright-snow/50 transition duration-300 hover:bg-bright-snow/50 
        hover:shadow-2xl disabled:pointer-events-none disabled:opacity-30 active:scale-90">
        ◀
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
            className={`flex h-10 w-8 cursor-pointer items-center justify-center rounded-full font-black transition ${
              active
                ? "text-3xl text-bright-snow -translate-y-3"
                : "text-bright-snow/60  hover:text-2xl hover:text-bright-snow hover:-translate-y-2"
            }`}>
            {pageNumber}
          </button>
        );
      })}

      {/* Next */}
      <button
        onClick={() => onPageChange(currentPage + 1)}
        disabled={currentPage === totalPages}
        className="flex h-12 w-12 cursor-pointer items-center justify-center rounded-full bg-bright-snow/5 text-2xl text-bright-snow shadow-bright-snow/50 transition duration-300 hover:bg-bright-snow/50 hover:shadow-2xl disabled:pointer-events-none disabled:opacity-30 active:scale-90">
        ▶
      </button>
    </div>
  );
}
