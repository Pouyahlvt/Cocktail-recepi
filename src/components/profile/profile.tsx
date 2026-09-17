"use client";

import Navbar from "@/src/components/navbar/navbar";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";
import Image from "next/image";
import { cocktails_data } from "@/src/data/cocktailsData";
import { CocktailsType } from "@/src/types/cocktails.ts/cocktails_data";
import CocktailsPage from "@/src/components/sections/all-recpie/cocktailsRecpieSec";
import { Mouse } from "lucide-react";

type ProfileData = {
  name?: string;
  email?: string;
  createdAt?: string;
  favoriteCocktailIds?: number[];
};

interface Props {
  profileData: ProfileData;
}

const Profile = ({ profileData }: Props) => {
  const favoriteCocktails = (profileData.favoriteCocktailIds ?? [])
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
        <section className="name-el w-[60%] h-screen pl-25 pt-40 max-md:w-full max-md:z-10 max-md:px-4">
          <h2 className="text-8xl font-black tracking-tighter max-md:text-6xl max-md:mb-5">
            {profileData.name}
          </h2>
          <div className="flex max-md:backdrop-blur-sm rounded-2xl max-md:bg-bright-snow/5 max-md:p-4">
            <div className="mt-15 max-md:mt-5">
              <h2 className="details-el text-4xl font-bold opacity-50 max-md:text-2xl">
                Favourites
              </h2>
              <p className="details-el text-5xl font-black mt-5">
                {profileData.favoriteCocktailIds?.length}
              </p>
            </div>
            <div className="mt-15 ml-10 max-md:mt-5">
              <h2 className="details-el text-4xl font-bold opacity-50 max-md:text-2xl">
                Created
              </h2>
              <p className="details-el text-3xl font-black mt-5">
                {profileData.createdAt?.slice(0, 10)}
              </p>
            </div>
          </div>
          <div className="flex mt-5 ">
            <p className="text-bright-snow/60 text-2xl -mb-5 max-md:text-bright-snow">
              {profileData.email}
            </p>
          </div>
          <div
            className="details-el w-1/3 ml-auto mt-30 h-30 
            max-md:hidden
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
        <div className="flex shrink-0 w-[40%] h-[60%]  mt-10 overflow-hidden max-md:w-full max-md:absolute max-md:opacity-10">
          <Image
            src={"/hero-martini.png"}
            alt="Martinti"
            loading="eager"
            width={200}
            height={500}
            className="martini-el w-fit h-full object-cover mx-auto"
          />
        </div>
      </section>
      <section className="Favourite-sec w-full min-h-screen bg-onyx text-bright-snow font-megrim pt-30 py-15">
        <div>
          <h1 className="text-6xl text-center mb-2 max-sm:text-4xl">
            Favourite Cocktails
          </h1>
          <p className="text-center text-lg opacity-50 max-sm:text-sm">
            Discover cocktails you like or will be like
          </p>
        </div>
        <div>
          {favoriteCocktails.length === 0 ? (
            <p className="text-5xl text-center mt-20">
              You dont have favourites cocktails .
            </p>
          ) : (
            <CocktailsPage cocktails={favoriteCocktails} just_cards={true} />
          )}
        </div>
      </section>
    </div>
  );
};

export default Profile;
