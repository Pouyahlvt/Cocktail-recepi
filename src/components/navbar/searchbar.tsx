"use client";

import { SearchIcon, MoveLeft } from "lucide-react";
import { useState } from "react";

const Search_bar = () => {
  const [active, setActive] = useState(false);
  const facke_Results = [
    "Martini",
    "GodFather",
    "sex in the beatch",
    "lemon dragon",
    "angry dragon",
  ];

  return (
    <div
      className={`${active ? " w-full px-5 bg-onyx h-screen fixed  z-50  " : "w-[35%] ml-auto mr-5 hover:w-[38%]"} 
      transition-all duration-300 ease-in-out`}>
      <div className="flex">
        {active && (
          <button
            className="h-15 w-15 mr-5 bg-bright-snow/70 rounded-full hover:bg-bright-snow/90 hover:w-20
        transition-all duration-300 ease-in-out cursor-pointer"
            onClick={() => setActive(false)}>
            <MoveLeft size={30} className="mx-auto" />
          </button>
        )}
        <div
          className={`w-full h-15 bg-bright-snow/70 backdrop-blur-lg rounded-full flex items-center 
    hover:bg-bright-snow/90  transition-all duration-300 ease-in-out `}>
          <input
            onFocus={() => setActive(true)}
            type="text"
            placeholder="Search items "
            className="w-full mx-7 outline-0 text-xl font-semibold font-megrim"
          />
          <button className="cursor-pointer mx-5">
            {" "}
            {<SearchIcon size={40} />}
          </button>
        </div>
      </div>
      {active && (
        <div className="w-full pr-20 mt-5 h-20 ">
          <h2 className="text-xl text-bright-snow/90 font-megrim">
            Search Results :{" "}
          </h2>
          {facke_Results.map((cocktails, index) => (
            <div
              key={`search-${index}`}
              className="w-full text-3xl ml-10 text-bright-snow my-2 py-2 font-megrim border-b-2 cursor-pointer ">
              {cocktails}
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default Search_bar;
