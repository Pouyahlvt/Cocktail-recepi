"use client";

import { Heart } from "lucide-react";
import { useEffect, useRef, useState } from "react";
import { useRouter } from "next/navigation";
import type { User } from "@supabase/supabase-js";
import gsap from "gsap";

import { createClient } from "@/src/lib/supabase/client";
import {
  addFavorite,
  removeFavorite,
} from "@/src/lib/favourites&views/favourites";

interface FavoriteButtonProps {
  cocktailId: number;
  favorites: number;
  showFavs?: boolean;
}

const formatFavorites = (number: number) => {
  if (number >= 1_000_000) {
    return `${(number / 1_000_000).toFixed(1)}m`;
  }

  if (number >= 1000) {
    return `${(number / 1000).toFixed(number >= 10000 ? 0 : 1)}k`;
  }

  return number.toString();
};

const FavoriteButton = ({
  cocktailId,
  favorites,
  showFavs = true,
}: FavoriteButtonProps) => {
  const router = useRouter();
  const supabase = createClient();

  const [user, setUser] = useState<User | null>(null);
  const [isFavorite, setIsFavorite] = useState(false);
  const [isLoading, setIsLoading] = useState(true);

  const heartRef = useRef<SVGSVGElement>(null);

  /*
   * Get current logged-in user
   * and check if this cocktail is already a favorite.
   */
  useEffect(() => {
    const loadFavoriteState = async () => {
      setIsLoading(true);

      const {
        data: { user },
      } = await supabase.auth.getUser();

      setUser(user);

      if (!user) {
        setIsFavorite(false);
        setIsLoading(false);
        return;
      }

      const { data, error } = await supabase
        .from("favorites")
        .select("cocktail_id")
        .eq("user_id", user.id)
        .eq("cocktail_id", cocktailId)
        .maybeSingle();

      if (error) {
        console.error("Favorite check error:", error);
        setIsFavorite(false);
      } else {
        setIsFavorite(!!data);
      }

      setIsLoading(false);
    };

    loadFavoriteState();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [cocktailId]);

  /*
   * Animate the heart when it becomes favorite.
   */
  const animateAdd = () => {
    if (!heartRef.current) return;

    gsap.fromTo(
      heartRef.current,
      {
        scale: 0.7,
        rotation: -10,
      },
      {
        fill: "#fafafa",
        scale: 1,
        rotation: 0,
        duration: 0.35,
        ease: "back.out(3)",
      },
    );

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
  };

  /*
   * Animate the heart when removing favorite.
   */
  const animateRemove = () => {
    if (!heartRef.current) return;

    gsap.to(heartRef.current, {
      fill: "none",
      scale: 0.8,
      duration: 0.12,
      ease: "power2.out",
      onComplete: () => {
        if (!heartRef.current) return;

        gsap.to(heartRef.current, {
          scale: 1,
          duration: 0.2,
          ease: "back.out(2)",
        });
      },
    });
  };

  /*
   * Add / remove favorite.
   */
  const handleFavorite = async (event: React.MouseEvent<HTMLButtonElement>) => {
    event.stopPropagation();

    // Not logged in → go to login
    if (!user) {
      router.push("/Login");
      return;
    }

    // Prevent multiple clicks while request is running
    if (isLoading) return;

    setIsLoading(true);

    if (isFavorite) {
      // Remove favorite
      animateRemove();
      const success = await removeFavorite(user.id, cocktailId);

      if (success) {
        setIsFavorite(false);
      } else animateAdd();
    } else {
      // Add favorite
      animateAdd();
      const success = await addFavorite(user.id, cocktailId);

      if (success) {
        setIsFavorite(true);
      } else {
        animateRemove();
      }
    }

    setIsLoading(false);
  };

  const displayedFavorites = favorites + (isFavorite ? 1 : 0);

  return (
    <button
      type="button"
      onClick={handleFavorite}
      disabled={isLoading}
      className="group/heart flex shrink-0 flex-col items-center gap-1"
      aria-label={isFavorite ? "Remove from favorites" : "Add to favorites"}>
      <Heart
        ref={heartRef}
        className={`
          h-5 w-5
          transition-colors duration-200
          text-bright-snow
          ${isFavorite ? "fill-bright-snow " : " "}
        `}
        strokeWidth={1.5}
      />

      <span
        className={`text-[9px] text-bright-snow/50 ${showFavs ? "" : "hidden"}`}>
        {formatFavorites(displayedFavorites)}
      </span>
    </button>
  );
};

export default FavoriteButton;
