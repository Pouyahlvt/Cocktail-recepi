"use client";

import Navbar from "@/src/components/navbar/navbar";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";
import Image from "next/image";
import { cocktails_data } from "@/src/data/cocktailsData";
import { CocktailsType } from "@/src/types/cocktails.ts/cocktails_data";
import CocktailsPage from "@/src/components/sections/all-recpie/cocktailsRecpieSec";
import { Mouse } from "lucide-react";

const fake_data = {
  username: "Pouya halavat",
  favNum: 5,
  created: "9/12/2026",
  favourites: [1, 2, 3, 4, 5],
};

const Profile = () => {
  const favoriteCocktails = fake_data.favourites
    .map((id) => cocktails_data.find((cocktail) => cocktail.id === id))
    .filter((cocktail): cocktail is CocktailsType => cocktail !== undefined);

  console.log(favoriteCocktails);

  useGSAP(() => {
    const tl = gsap.timeline();

    // Username comes from bottom
    tl.from(".name-el", {
      y: 100,
      opacity: 0,
      duration: 0.7,
      ease: "power3.out",
    })
      .from(
        ".details-el",
        {
          y: 50,
          opacity: 0,
          duration: 0.5,
          stagger: 0.1,
          ease: "power3.out",
        },
        "-=0.1",
      )

      // Martini comes from outside the right side
      .from(
        ".martini-el",
        {
          x: "100vw",
          opacity: 0,
          duration: 1.4,
          ease: "power4.out",
        },
        0,
      );
  }, []);

  return (
    <div className=" w-full min-h-screen ">
      <Navbar />
      <section
        className="user-sec w-full h-screen flex text-bright-snow font-megrim items-center 
      bg-linear-to-b from-lnk-black to-onyx">
        <section className="name-el w-[60%] h-screen pl-25 pt-40">
          <h2 className="text-8xl font-black tracking-tighter">
            {fake_data.username}
          </h2>
          <div className="flex">
            <div className="mt-15">
              <h2 className="details-el text-4xl font-bold opacity-50">
                Favourites
              </h2>
              <p className="details-el text-5xl font-black mt-5">
                {fake_data.favNum}
              </p>
            </div>
            <div className="mt-15 ml-10 ">
              <h2 className="details-el text-4xl font-bold opacity-50">
                Created
              </h2>
              <p className="details-el text-3xl font-black mt-5">
                {fake_data.created}
              </p>
            </div>
          </div>
          <div
            className="details-el w-1/3 ml-auto mt-30 h-30 
            animate-[fade-out_linear_both]
            [animation-timeline:scroll(root)]
            [animation-range:0_200px]
            motion-reduce:animate-none">
            <style>
              {`
            @keyframes fade-out {
            to { opacity: 0; }
            }
            `}
            </style>
            <p className="text-center mb-2 tracking-tight ">Favourites</p>
            <Mouse className="mx-auto animate-pulse" />
          </div>
        </section>
        <div className="flex shrink-0 w-[40%] h-[60%]  mt-10 overflow-hidden">
          <Image
            src={"/hero-martini.png"}
            alt="Martinti"
            width={200}
            height={500}
            className="martini-el w-fit h-full object-cover mx-auto"
          />
        </div>
      </section>
      <section className="Favourite-sec w-full min-h-screen bg-onyx text-bright-snow font-megrim pt-30 py-15">
        <div>
          <h1 className="text-6xl text-center mb-2">Favourite Cocktails</h1>
          <p className="text-center text-lg opacity-50">
            Discover cocktails you like or will be like
          </p>
        </div>
        <div>
          <CocktailsPage cocktails={favoriteCocktails} just_cards={true} />
        </div>
      </section>
    </div>
  );
};

export default Profile;
