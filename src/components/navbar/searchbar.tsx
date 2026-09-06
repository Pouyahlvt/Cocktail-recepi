"use client";

import { SearchIcon, MoveLeft } from "lucide-react";
import { useState } from "react";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";

const Search_bar = () => {
  const [active, setActive] = useState(false);
  const [show, setShow] = useState(false);
  const [searchKey, setSearchKey] = useState("");
  const facke_Results = [
    "Martini",
    "GodFather",
    "sex in the beatch",
    "lemon dragon",
    "angry dragon",
  ];

  const search_handeller = () => {
    if (active) {
      if (searchKey.length > 0) {
        setShow(true);
      } else {
        console.error("Search something mother fucker !");
      }
    } else {
      setActive(true);
    }
  };

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
      className={`${active ? " w-full h-[125vh] -mt-5 pt-5  px-5 bg-onyx fixed  z-50  " : "w-[35%] ml-auto mr-5 hover:w-[38%]"} 
      transition-all duration-300 ease-in-out`}>
      <div className="flex">
        {active && (
          <button
            className="h-15 w-16 mr-5 bg-bright-snow/70 rounded-full hover:bg-bright-snow/90 hover:w-20
        transition-all duration-300 ease-in-out cursor-pointer"
            onClick={() => {
              setActive(false);
              setSearchKey("");
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
            onChange={(e) => setSearchKey(e.target.value)}
            value={searchKey}
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
        <div className="w-full pr-20 mt-5 h-20 ">
          <h2 className="text-xl text-bright-snow/90 font-megrim">
            Search Results :{" "}
          </h2>
          {facke_Results.map((cocktails, index) => (
            <div
              key={`search-${index}`}
              className={`search-result w-full text-3xl ml-10 text-bright-snow my-2 py-2 font-megrim border-b-2 cursor-pointer 
               opacity-0 -translate-y-10`}>
              {cocktails}
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default Search_bar;
