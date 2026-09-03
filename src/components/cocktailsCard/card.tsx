"use client";

import { Heart } from "lucide-react";
import Image from "next/image";
import { useRef, useState } from "react";
import gsap from "gsap";

interface CocktailCardProps {
  name: string;
  image: string;
  type: string;
  alcohol: string;
  difficulty: "Easy" | "Medium" | "Hard";
  favorites: number;
}

const formatFavorites = (number: number) => {
  if (number >= 1000) {
    return `${(number / 1000).toFixed(number >= 10000 ? 0 : 1)}k`;
  }

  if (number >= 1000000) {
    return `${(number / 1000000).toFixed(number >= 10000 ? 0 : 1)}m`;
  }

  return number.toString();
};

const CocktailCard = ({
  name,
  image,
  type,
  alcohol,
  difficulty,
  favorites,
}: CocktailCardProps) => {
  const [isFavorite, setIsFavorite] = useState(false);
  const heartRef = useRef<SVGSVGElement>(null);

  return (
    <div className="group relative h-full w-full overflow-hidden rounded-3xl bg-linear-to-br from-lnk-black to-dark-amethyst">
      {/* Cocktail Image */}
      <div
        className="
          absolute inset-0
          flex items-center justify-center
          transition-transform duration-700 ease-out
          group-hover:-translate-y-8
          group-hover:scale-[0.82]
        ">
        <Image
          src={image}
          alt={name}
          fill
          loading="eager"
          draggable={false}
          className="object-contain p-5"
          sizes="280px"
        />
      </div>

      {/* Dark Gradient */}
      <div
        className="
          absolute inset-x-0 bottom-0 h-[52%]
          bg-linear-to-t from-black/80 via-black/50 to-transparent
          transition-all duration-700 ease-out
          group-hover:h-[78%]
          group-hover:from-black/95
          group-hover:via-black/75
        "
      />

      {/* Main Content */}
      <div
        className="
          absolute bottom-0 left-0 right-0
          translate-y-0 p-6
          transition-transform duration-700 ease-out
          group-hover:-translate-y-18
        ">
        <p className="mb-2 text-[9px] uppercase tracking-[0.3em] text-bright-snow/50">
          {type}
        </p>

        <div className="flex items-end justify-between gap-3">
          <h3 className="text-2xl font-medium tracking-tight text-bright-snow">
            {name}
          </h3>

          {/* Favorite */}
          <button
            type="button"
            onClick={(event) => {
              event.stopPropagation();

              const newState = !isFavorite;
              setIsFavorite(newState);

              if (heartRef.current) {
                if (newState) {
                  gsap.fromTo(
                    heartRef.current,
                    {
                      scale: 0.7,
                      rotation: -10,
                    },
                    {
                      scale: 1,
                      rotation: 0,
                      duration: 0.35,
                      ease: "back.out(3)",
                    },
                  );

                  // Small pop effect
                  gsap.fromTo(
                    heartRef.current,
                    {
                      filter: "drop-shadow(0 0 0px transparent)",
                    },
                    {
                      filter: "drop-shadow(0 0 8px rgba(250,250,250,0.5))",
                      duration: 0.25,
                      yoyo: true,
                      repeat: 1,
                    },
                  );
                } else {
                  gsap.to(heartRef.current, {
                    scale: 0.8,
                    duration: 0.12,
                    ease: "power2.out",
                    onComplete: () => {
                      gsap.to(heartRef.current, {
                        scale: 1,
                        duration: 0.2,
                        ease: "back.out(2)",
                      });
                    },
                  });
                }
              }
            }}
            className="group/heart flex shrink-0 flex-col items-center gap-1"
            aria-label={
              isFavorite
                ? `Remove ${name} from favorites`
                : `Add ${name} to favorites`
            }>
            <Heart
              ref={heartRef}
              className={`
      h-5 w-5 transition-colors duration-200
      ${
        isFavorite
          ? "fill-bright-snow text-bright-snow"
          : "text-bright-snow/80 group-hover/heart:text-bright-snow"
      }
    `}
              strokeWidth={1.5}
            />

            <span className="text-[9px] text-bright-snow/50">
              {formatFavorites(favorites + (isFavorite ? 1 : 0))}
            </span>
          </button>
        </div>
      </div>

      {/* Extra Information - Appears From Bottom */}
      <div
        className="
          absolute bottom-0 left-0 right-0
          flex items-center justify-between
          px-6 pb-5
          translate-y-full
          opacity-0
          transition-all duration-700 ease-out
          group-hover:translate-y-0
          group-hover:opacity-100
        ">
        <div>
          <p className="mb-1 text-[8px] uppercase tracking-[0.25em] text-bright-snow/35">
            Alcohol
          </p>

          <p className="text-xs uppercase tracking-[0.12em] text-bright-snow/80">
            {alcohol}
          </p>
        </div>

        <div className="text-right">
          <p className="mb-1 text-[8px] uppercase tracking-[0.25em] text-bright-snow/35">
            Difficulty
          </p>

          <p className="text-xs uppercase tracking-[0.12em] text-bright-snow/80">
            {difficulty}
          </p>
        </div>
      </div>
    </div>
  );
};

export default CocktailCard;
