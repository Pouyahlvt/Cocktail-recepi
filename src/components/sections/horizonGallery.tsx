"use client";

import { ReactNode, useRef, useState } from "react";
import { ChevronLeft, ChevronRight } from "lucide-react";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";

type GalleryProps = {
  children: ReactNode[];
};

const Gallery = ({ children }: GalleryProps) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const cardsRef = useRef<(HTMLDivElement | null)[]>([]);

  const [activeIndex, setActiveIndex] = useState(0);

  const startX = useRef(0);
  const isDragging = useRef(false);

  const totalCards = children.length;

  /*
   * Get the shortest position between two cards.
   *
   * Example:
   *
   *          -2  -1   0   1   2
   *                   ↑
   *                active
   */
  const getPosition = (index: number, active: number) => {
    let position = index - active;

    if (position > totalCards / 2) {
      position -= totalCards;
    }

    if (position < -totalCards / 2) {
      position += totalCards;
    }

    return position;
  };

  const animateGallery = (newIndex: number) => {
    if (!totalCards) return;

    const nextIndex = ((newIndex % totalCards) + totalCards) % totalCards;

    setActiveIndex(nextIndex);

    cardsRef.current.forEach((card, index) => {
      if (!card) return;

      const position = getPosition(index, nextIndex);
      const distance = Math.abs(position);

      /*
       * CENTER
       */
      if (position === 0) {
        gsap.to(card, {
          xPercent: 0,
          scale: 1,
          rotateY: 0,
          rotateZ: 0,
          opacity: 1,
          zIndex: 50,
          duration: 0.7,
          ease: "power3.out",
          overwrite: true,
        });

        return;
      }

      /*
       * FIRST LEFT
       */
      if (position === -1) {
        gsap.to(card, {
          xPercent: -76,
          scale: 0.82,
          rotateY: 12,
          rotateZ: -1,
          opacity: 1,
          zIndex: 40,
          duration: 0.7,
          ease: "power3.out",
          overwrite: true,
        });

        return;
      }

      /*
       * FIRST RIGHT
       */
      if (position === 1) {
        gsap.to(card, {
          xPercent: 76,
          scale: 0.82,
          rotateY: -12,
          rotateZ: 1,
          opacity: 1,
          zIndex: 40,
          duration: 0.7,
          ease: "power3.out",
          overwrite: true,
        });

        return;
      }

      /*
       * SECOND LEFT
       */
      if (position === -2) {
        gsap.to(card, {
          xPercent: -145,
          scale: 0.68,
          rotateY: 18,
          rotateZ: -2,
          opacity: 0.9,
          zIndex: 30,
          duration: 0.7,
          ease: "power3.out",
          overwrite: true,
        });

        return;
      }

      /*
       * SECOND RIGHT
       */
      if (position === 2) {
        gsap.to(card, {
          xPercent: 145,
          scale: 0.68,
          rotateY: -18,
          rotateZ: 2,
          opacity: 0.9,
          zIndex: 30,
          duration: 0.7,
          ease: "power3.out",
          overwrite: true,
        });

        return;
      }

      /*
       * FAR LEFT
       */
      if (position < 0) {
        gsap.to(card, {
          xPercent: -205,
          scale: 0.55,
          rotateY: 25,
          opacity: 0,
          zIndex: 10,
          duration: 0.7,
          ease: "power3.out",
          overwrite: true,
        });

        return;
      }

      /*
       * FAR RIGHT
       */
      gsap.to(card, {
        xPercent: 205,
        scale: 0.55,
        rotateY: -25,
        opacity: 0,
        zIndex: 10,
        duration: 0.7,
        ease: "power3.out",
        overwrite: true,
      });
    });
  };

  useGSAP(
    () => {
      animateGallery(activeIndex);
    },
    {
      scope: containerRef,
    },
  );

  /*
   * BUTTONS
   */

  const next = () => {
    animateGallery(activeIndex + 1);
  };

  const previous = () => {
    animateGallery(activeIndex - 1);
  };

  /*
   * TOUCH / MOUSE
   */

  const handlePointerDown = (event: React.PointerEvent<HTMLDivElement>) => {
    startX.current = event.clientX;
    isDragging.current = true;

    event.currentTarget.setPointerCapture(event.pointerId);
  };

  const handlePointerUp = (event: React.PointerEvent<HTMLDivElement>) => {
    if (!isDragging.current) return;

    const difference = event.clientX - startX.current;

    isDragging.current = false;

    /*
     * Small movement = ignore
     */
    if (Math.abs(difference) < 40) return;

    /*
     * Swipe LEFT
     */
    if (difference < 0) {
      next();
    } else {

    /*
     * Swipe RIGHT
     */
      previous();
    }
  };

  const handlePointerCancel = () => {
    isDragging.current = false;
  };

  return (
    <div
      ref={containerRef}
      className="
        relative
        flex
        h-[520px]
        w-full
        items-center
        justify-center
        overflow-hidden
        select-none
      "
      style={{
        perspective: "1400px",
        touchAction: "pan-y",
      }}
      onPointerDown={handlePointerDown}
      onPointerUp={handlePointerUp}
      onPointerCancel={handlePointerCancel}>
      {/* CARDS */}

      <div
        className="
          relative
          flex
          h-full
          w-full
          items-center
          justify-center
        "
        style={{
          transformStyle: "preserve-3d",
        }}>
        {children.map((card, index) => (
          <div
            key={index}
            ref={(element) => {
              cardsRef.current[index] = element;
            }}
            className="
              absolute
              h-[420px]
              w-[280px]
              md:h-[460px]
              md:w-[300px]
              lg:h-[480px]
              lg:w-[320px]
            "
            style={{
              transformStyle: "preserve-3d",
              willChange: "transform, opacity",
            }}>
            {card}
          </div>
        ))}
      </div>

      {/* LEFT BUTTON */}

      <button
        type="button"
        aria-label="Previous card"
        onPointerDown={(event) => {
          event.stopPropagation();
        }}
        onClick={previous}
        className="
          absolute
          left-3
          top-1/2
          z-[100]
          flex
          h-11
          w-11
          -translate-y-1/2
          items-center
          justify-center
          rounded-full
          border
          border-[#fafafa]/20
          bg-[#131313]/70
          text-[#fafafa]
          backdrop-blur-md
          transition
          duration-200
          hover:scale-110
          active:scale-90
          md:left-6
        ">
        <ChevronLeft size={22} />
      </button>

      {/* RIGHT BUTTON */}

      <button
        type="button"
        aria-label="Next card"
        onPointerDown={(event) => {
          event.stopPropagation();
        }}
        onClick={next}
        className="
          absolute
          right-3
          top-1/2
          z-[100]
          flex
          h-11
          w-11
          -translate-y-1/2
          items-center
          justify-center
          rounded-full
          border
          border-[#fafafa]/20
          bg-[#131313]/70
          text-[#fafafa]
          backdrop-blur-md
          transition
          duration-200
          hover:scale-110
          active:scale-90
          md:right-6
        ">
        <ChevronRight size={22} />
      </button>
    </div>
  );
};

export default Gallery;
