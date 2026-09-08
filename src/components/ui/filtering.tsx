"use client";

import { useState } from "react";
import { Settings2Icon } from "lucide-react";
import { X } from "lucide-react";

// what should we filter ,
//
const alcohols = ["Vodka", "Whisky", "Beer", "Teqila", "Wine"];

const Filtering = () => {
  const [active, setActive] = useState(false);
  const [alcohol, setAlcohol] = useState("");
  const [difficultty, setDifficultty] = useState("");
  const [strongly, setstrongly] = useState("");

  const filtering_handeller = () => {
    console.log(`alcohol :  ${alcohol}`);
    console.log(`difficultty :  ${difficultty}`);
    console.log(`strongly :  ${strongly}`);
    setActive(false);
  };

  return (
    <div
      className={`w-full h-fit mb-15 px-10 flex justify-center items-center text-bright-snow font-megrim`}>
      <section
        className={`  bg-dark-amethyst shadow-2xl border border-bright-snow/50     
        transition-all duration-300 ease-in-out rounded-[40px] overflow-hidden relative
        ${active ? "w-[95%] h-[110vh] " : "w-[10%] h-20  hover:w-[12%] "}`}>
        <button
          onClick={() => setActive(false)}
          className={`absolute w-12 h-12 right-5 top-5 rounded-full flex justify-center items-center hover:shadow-2xl 
            shadow-bright-snow/30  active:scale-95 transition-all duration-200 ease-in-out cursor-pointer
            ${active ? "" : "hidden"} `}>
          <X size={30} />
        </button>

        <div className="flex justify-center items-center mt-5">
          <button
            onClick={() => (active ? setActive(active) : setActive(true))}
            className={` ${active ? "" : "w-full h-30 absolute cursor-pointer z-10 py-20"}`}>
            <Settings2Icon color="#fafafa" size={40} className="mx-auto " />
          </button>
        </div>

        {active && (
          <section className="w-full h-full mt-5 ">
            <section>
              <h2 className="text-3xl mt-10  font-bold text-center">ALCOHOL</h2>
              <div className="grid grid-cols-5 justify-center ">
                {alcohols.map((alc, i) => (
                  <button
                    key={`alc-${i}-filtering`}
                    onClick={() => setAlcohol(alc)}
                    className={`mx-auto text-2xl mt-5 font-bold border-2 cursor-pointer py-2 px-6 rounded-full
                    transition-all duration-300 ease-out hover:px-8 ${alcohol === alc ? "bg-bright-snow text-dark-amethyst" : ""}`}>
                    {alc}
                  </button>
                ))}
              </div>
            </section>
            <section>
              <h2 className="text-3xl mt-15 font-bold text-center uppercase">
                Difficultty Level
              </h2>
              <div className="grid grid-cols-3 justify-center ">
                {["Easy", "Medium", "Hard"].map((diff, i) => (
                  <button
                    key={`alc-${i}-filtering`}
                    onClick={() => setDifficultty(diff)}
                    className={`mx-auto text-2xl mt-5 font-bold border-2 cursor-pointer py-2 px-6 rounded-full
                    transition-all duration-300 ease-out hover:px-8 ${difficultty === diff ? "bg-bright-snow text-dark-amethyst" : ""}`}>
                    {diff}
                  </button>
                ))}
              </div>
            </section>
            <section>
              <h2 className="text-3xl mt-15 font-bold text-center uppercase">
                Strong Grade [ ABV ]
              </h2>
              <div className="grid grid-cols-3 justify-center ">
                {["Very Strong", "Standard", "Light"].map((grade, i) => (
                  <button
                    key={`alc-${i}-filtering`}
                    onClick={() => setstrongly(grade)}
                    className={`mx-auto text-2xl mt-5 font-bold border-2 cursor-pointer py-2 px-6 rounded-full
                    transition-all duration-300 ease-out hover:px-8 ${strongly === grade ? "bg-bright-snow text-dark-amethyst" : ""}`}>
                    {grade}
                  </button>
                ))}
              </div>
            </section>
            <div className="w-full flex">
              <button
                onClick={filtering_handeller}
                className="w-[50%] h-20 rounded-full text-3xl font-black mt-10 mx-auto border-2 cursor-pointer 
              transition-all duration-300 ease-in-out hover:bg-bright-snow hover:text-dark-amethyst hover:w-[60%]">
                SHOW RESULTS
              </button>
            </div>
          </section>
        )}
      </section>
    </div>
  );
};

export default Filtering;
