"use client";

import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import { useRef, useState } from "react";
import CocktailCard from "../../cocktailsCard/card";

gsap.registerPlugin(useGSAP);

interface Cocktail {
  id: number;
  name: string;
  type: string;
  image: string;
  alcohol: string;
  difficulty: "Easy" | "Medium" | "Hard";
  favorites: number;
}

const cocktails: Cocktail[] = [
  {
    id: 1,
    name: "Negroni",
    type: "Classic",
    image: "/cocktails/negroni.png",
    alcohol: "Gin",
    difficulty: "Medium",
    favorites: 12400,
  },
  {
    id: 2,
    name: "Martini",
    type: "Classic",
    image: "/cocktails/martini-cocktails.png",
    alcohol: "Vodka",
    difficulty: "Easy",
    favorites: 8700,
  },
  {
    id: 3,
    name: "Mojito",
    type: "Refreshing",
    image: "/cocktails/mojito.png",
    alcohol: "Rum",
    difficulty: "Easy",
    favorites: 15200,
  },
  {
    id: 4,
    name: "Old Fashioned",
    type: "Classic",
    image: "/cocktails/old-fashioned.png",
    alcohol: "Whiskey",
    difficulty: "Medium",
    favorites: 11300,
  },
  {
    id: 5,
    name: "Margarita",
    type: "Tequila",
    image: "/cocktails/margarita.png",
    alcohol: "Tequila",
    difficulty: "Easy",
    favorites: 21800,
  },
  {
    id: 6,
    name: "Daiquiri",
    type: "Rum",
    image: "/cocktails/daiquiri.png",
    alcohol: "Rum",
    difficulty: "Medium",
    favorites: 6400,
  },
  {
    id: 7,
    name: "Cosmopolitan",
    type: "Vodka",
    image: "/cocktails/cosmopolitan.png",
    alcohol: "Vodka",
    difficulty: "Easy",
    favorites: 9800,
  },
];

const CocktailGallery = () => {
  const galleryRef = useRef<HTMLDivElement>(null);
  const cardsRef = useRef<(HTMLDivElement | null)[]>([]);
  const progressRef = useRef<HTMLDivElement>(null);

  const [activeIndex, setActiveIndex] = useState(0);

  const dragStartX = useRef(0);
  const isDragging = useRef(false);

  const getPosition = (index: number, currentIndex: number) => {
    const total = cocktails.length;

    let position = index - currentIndex;

    if (position > total / 2) {
      position -= total;
    }

    if (position < -total / 2) {
      position += total;
    }

    return position;
  };

  const animateCards = (newIndex: number) => {
    const total = cocktails.length;

    newIndex = (newIndex + total) % total;

    // Use the NEW index for positioning immediately
    cardsRef.current.forEach((card, index) => {
      if (!card) return;

      const position = getPosition(index, newIndex);

      let x = 0;
      let scale = 1;
      let rotationY = 0;
      let rotationZ = 0;
      let opacity = 1;
      let zIndex = 10;
      let blur = 0;

      if (position === 0) {
        // CENTER
        x = 0;
        scale = 1;
        rotationY = 0;
        rotationZ = 0;
        opacity = 1;
        zIndex = 50;
        blur = 0;
      } else if (position === -1) {
        // LEFT
        x = -260;
        scale = 0.78;
        rotationY = 35;
        rotationZ = -3;
        opacity = 0.6;
        zIndex = 30;
        blur = 1;
      } else if (position === 1) {
        // RIGHT
        x = 260;
        scale = 0.78;
        rotationY = -35;
        rotationZ = 3;
        opacity = 0.6;
        zIndex = 30;
        blur = 1;
      } else if (position === -2) {
        // FAR LEFT
        x = -450;
        scale = 0.6;
        rotationY = 55;
        rotationZ = -5;
        opacity = 0.25;
        zIndex = 20;
        blur = 3;
      } else if (position === 2) {
        // FAR RIGHT
        x = 450;
        scale = 0.6;
        rotationY = -55;
        rotationZ = 5;
        opacity = 0.25;
        zIndex = 20;
        blur = 3;
      } else {
        // HIDDEN
        x = position < 0 ? -600 : 600;
        scale = 0.45;
        rotationY = position < 0 ? 65 : -65;
        opacity = 0;
        zIndex = 0;
        blur = 5;
      }

      gsap.to(card, {
        x,
        scale,
        rotationY,
        rotationZ,
        opacity,
        zIndex,
        filter: `blur(${blur}px)`,
        duration: 0.8,
        ease: "power3.out",
      });
    });

    // Update React state AFTER calculating animation
    setActiveIndex(newIndex);

    if (progressRef.current) {
      const progress = (newIndex / (total - 1)) * 100;

      gsap.to(progressRef.current, {
        width: `${Math.max(progress, 8)}%`,
        duration: 0.6,
        ease: "power3.out",
      });
    }
  };

  useGSAP(
    () => {
      animateCards(0);
    },
    {
      scope: galleryRef,
    },
  );

  const next = () => {
    animateCards(activeIndex + 1);
  };

  const previous = () => {
    animateCards(activeIndex - 1);
  };

  const handlePointerDown = (event: React.PointerEvent) => {
    const target = event.target as HTMLElement;

    // Don't start gallery dragging when clicking a button
    if (target.closest("button")) {
      return;
    }

    isDragging.current = true;
    dragStartX.current = event.clientX;

    (event.currentTarget as HTMLElement).setPointerCapture(event.pointerId);
  };

  const handlePointerMove = (event: React.PointerEvent) => {
    if (!isDragging.current) return;

    const distance = event.clientX - dragStartX.current;

    if (Math.abs(distance) > 70) {
      if (distance < 0) {
        next();
      } else {
        previous();
      }

      isDragging.current = false;
    }
  };

  const handlePointerUp = () => {
    isDragging.current = false;
  };

  return (
    <div ref={galleryRef} className="w-full select-none">
      {/* Gallery */}
      <div
        className="
        relative mx-auto flex h-120 w-full max-w-300
        items-center justify-center
        overflow-hidden
        select-none
        touch-pan-y
        perspective-distant
        "
        onPointerDown={handlePointerDown}
        onPointerMove={handlePointerMove}
        onPointerUp={handlePointerUp}
        onPointerCancel={handlePointerUp}>
        {cocktails.map((cocktail, index) => (
          <div
            key={cocktail.id}
            ref={(element) => {
              cardsRef.current[index] = element;
            }}
            className="
            absolute
            h-95
            w-62.5
            cursor-grab
            active:cursor-grabbing
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

      {/* Controls */}
      <div className="mx-auto mt-8 flex max-w-125 items-center gap-5 px-5">
        <button
          type="button"
          onClick={previous}
          className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full  
           text-bright-snow hover:scale-105 cursor-pointer active:scale-95 transition-all duration-200
           bg-[radial-gradient(circle_at_center,#110036_60%,#fafafa_100%)] "
          aria-label="Previes cocktail ">
          {"◁"}
        </button>

        {/* Progress */}
        <div className="relative h-0.5 flex-1 overflow-hidden bg-bright-snow/10 rounded-full">
          <div
            ref={progressRef}
            className="absolute left-0 top-0 h-full w-[8%] bg-bright-snow rounded-full"
          />
        </div>

        <button
          type="button"
          onClick={next}
          className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full  
           text-bright-snow hover:scale-105 cursor-pointer active:scale-95 transition-all duration-200
           bg-[radial-gradient(circle_at_center,#110036_60%,#fafafa_100%)]"
          aria-label="Next cocktail ">
          {"▷"}
        </button>
      </div>
    </div>
  );
};

export default CocktailGallery;
