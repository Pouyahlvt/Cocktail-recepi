"use client";

import { useState } from "react";
import { Settings2Icon } from "lucide-react";
import { X } from "lucide-react";

// what should we filter ,
//

const Filtering = () => {
  const [active, setActive] = useState(false);
  return (
    <div
      className={`w-full h-fit mb-15 px-10 flex justify-center items-center text-bright-snow font-megrim`}>
      <section
        className={`  bg-dark-amethyst shadow-2xl border border-bright-snow/50     
        transition-all duration-300 ease-in-out rounded-[40px] overflow-hidden relative
        ${active ? "w-[95%] h-[60vh] " : "w-[10%] h-20  hover:w-[12%] "}`}>
        <button
          onClick={() => setActive(false)}
          className={`absolute w-12 h-12 right-5 top-5 rounded-full flex justify-center items-center hover:shadow-2xl 
            shadow-bright-snow/30  active:scale-95 transition-all duration-200 ease-in-out
            ${active ? "" : "hidden"} `}>
          <X size={30} />
        </button>

        <div className="flex justify-center items-center mt-5">
          <Settings2Icon
            color="#fafafa"
            size={40}
            className={`${active ? "" : "w-full z-10 -mt-5 cursor-pointer "}`}
            onClick={() => (active ? setActive(active) : setActive(true))}
          />
          <p
            className={`ml-4 text-3xl font-semibold transition-all duration-300 ease-out absolute  ${active ? "translate-x-15" : "opacity-0 "}`}>
            Filter
          </p>
        </div>

        {active && <section className="w-full h-full mt-5 "></section>}
      </section>
    </div>
  );
};

export default Filtering;
