"use client";

import { SearchIcon, MoveLeft } from "lucide-react";
import { useState, useEffect } from "react";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";
import { useSearch } from "@/src/hooks/searchHooks";
import { useRouter } from "next/navigation";

const Search_bar = () => {
  const [active, setActive] = useState(false);
  const [show, setShow] = useState(false);
  const router = useRouter();
  const { searchTerm, setSearchTerm, cocktails: filtered } = useSearch();

  const handleCardClick = (name: string) => {
    router.push(`/cocktails/${name}`);
  };

  const search_handeller = () => {
    if (active) {
      if (searchTerm.length > 0) {
        setShow(true);
      } else {
        console.error("Search something mother fucker !");
      }
    } else {
      setActive(true);
    }
  };

  useEffect(() => {
    if (active) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "unset";
    }

    // Cleanup function to reset when component unmounts
    return () => {
      document.body.style.overflow = "unset";
    };
  }, [active]);

  useGSAP(() => {
    if (!show) return;

    gsap.to(".search-result", {
      opacity: 1,
      y: 0,
      duration: 0.7,
      stagger: 0.2,
    });
  }, [show]);

  return (
    <div
      className={`${active ? " w-full h-screen -mt-5 pt-5  px-5 bg-onyx fixed  z-50  " : "w-[35%] ml-auto mr-5 hover:w-[38%]"} 
      transition-all duration-300 ease-in-out`}>
      <div className="flex">
        {active && (
          <button
            className="h-15 w-16 mr-5 bg-bright-snow/70 rounded-full hover:bg-bright-snow/90 hover:w-20
        transition-all duration-300 ease-in-out cursor-pointer"
            onClick={() => {
              setActive(false);
              setSearchTerm("");
              setShow(false);
            }}>
            <MoveLeft size={30} className="mx-auto" />
          </button>
        )}
        <div
          className={`search-input w-full h-15 bg-bright-snow/70 backdrop-blur-lg  flex items-center transition-all duration-300 ease-in-out delay-300
       ${active ? "hover:bg-bright-snow/90   rounded-full" : "rounded-l-full "} `}>
          <input
            onFocus={() => setActive(true)}
            onChange={(e) => {
              setSearchTerm(e.target.value);
              setShow(false);
            }}
            value={searchTerm}
            type="text"
            placeholder="Search items "
            className="w-full mx-7 outline-0 text-xl font-semibold font-megrim"
          />
        </div>
        <button
          className={`cursor-pointer  bg-bright-snow/70 backdrop-blur-lg   transition-all duration-300 ease-in-out delay-300 
           ${active ? "hover:bg-bright-snow/90 hover:px-5   rounded-full ml-5 px-3 " : "rounded-r-full  px-5 "}`}
          onClick={search_handeller}>
          {" "}
          {<SearchIcon size={40} />}
        </button>
      </div>
      {active && (
        <div
          className="w-full pr-20 mt-5 max-h-screen overflow-hidden overflow-y-auto pb-30"
          style={{
            scrollbarWidth: "thin",
            scrollbarColor: "#fafafa #131313",
          }}>
          <h2
            className={`text-xl text-bright-snow/90 font-megrim ${show ? "" : "opacity-0 -translate-x-5"}`}>
            Search Results :{" "}
          </h2>
          {filtered.map((cocktails) => (
            <div
              key={`search-${cocktails.id}`}
              onClick={() => handleCardClick(cocktails.name)}
              className={`search-result flex shrink text-3xl ml-10 text-bright-snow  font-megrim border-b-2 cursor-pointer 
               opacity-60 -translate-y-10 justify-between group ${searchTerm.length === 0 ? "hidden" : ""}`}>
              <span className="w-full group-hover:translate-x-5 transition-all duration-200 ease-in-out p-4 ">
                {cocktails.name}
              </span>
              <span
                className={`p-4 -translate-x-10 opacity-0  transition-all duration-300 ease-out group-hover:opacity-100 group-hover:translate-x-0`}>
                ▶
              </span>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default Search_bar;
