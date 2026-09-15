"use client";
import { Share2Icon } from "lucide-react";

type Props = {
  title: string; // e.g. "Negroni"
  description?: string; // e.g. "Classic Italian cocktail with gin, vermouth & Campari"
};

export default function ShareButton({ title, description }: Props) {
  const url = typeof window !== "undefined" ? window.location.href : "";

  const handleShare = async () => {
    // 📱 Try native share first (mobile)
    if (navigator.share) {
      try {
        await navigator.share({ title, text: description, url });
        return;
      } catch {
        // user cancelled — fall through to dropdown
      }
    }
  };

  return (
    <button
      onClick={handleShare}
      className="w-12 h-12 flex justify-center items-center cursor-pointer hover:w-20  rounded-full 
              border border-bright-snow/50 text-bright-snow bg-lnk-black/60 transition-normal duration-200">
      <Share2Icon size={22} />
    </button>
  );
}
