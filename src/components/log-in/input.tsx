"use client";

import { Dispatch, SetStateAction } from "react";
import { useState } from "react";

interface Props {
  about: string;
  placeholder: string;
  state: string;
  setState: Dispatch<SetStateAction<string>>;
}

const Input_logIn = ({ about, placeholder, state, setState }: Props) => {
  const [active, setActive] = useState(false);
  return (
    <div className="w-full flex justify-center mt-5">
      <div
        className={`${active ? "w-[72%] -translate-y-2" : "w-[70%] "} transition-all duration-300 ease-out `}>
        <p
          className={`text-2xl font-black transition-all duration-300 ease-out
          ${!active ? "opacity-0 -translate-x-10" : ""} `}>
          {about} <span> :</span>
        </p>
        <input
          onFocus={() => setActive(true)}
          onBlur={() => setActive(false)}
          type="text"
          value={state}
          placeholder={placeholder}
          onChange={(e) => setState(e.target.value)}
          className={`w-full py-1 text-2xl outline-0 px-4 font-bold`}
        />
        <div
          className={`w-full  mt-1 transition-all duration-300 ease-out  rounded-full 
            ${active ? "bg-bright-snow h-1" : "bg-bright-snow/70 h-0.5"}`}
        />
      </div>
    </div>
  );
};

export default Input_logIn;
