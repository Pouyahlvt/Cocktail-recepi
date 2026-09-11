"use client";

import { Dispatch, SetStateAction, useState } from "react";
import { Eye, EyeOff } from "lucide-react";
import gsap from "gsap";

interface Props {
  about: string;
  placeholder: string;
  state: string;
  setState: Dispatch<SetStateAction<string>>;
}

const Input_logIn = ({ about, placeholder, state, setState }: Props) => {
  const [active, setActive] = useState(false);
  const [showPassword, setShowPassword] = useState(false);

  const isPassword = about.toLowerCase() === "password";

  const togglePassword = () => {
    const icon = document.querySelector(".password-icon");

    if (!icon) return;

    gsap
      .timeline()
      .to(icon, {
        scale: 0,
        rotate: 90,
        duration: 0.15,
        ease: "power2.in",
      })
      .call(() => {
        setShowPassword((prev) => !prev);
      })
      .to(icon, {
        scale: 1,
        rotate: 0,
        duration: 0.2,
        ease: "back.out(2)",
      });
  };

  return (
    <div className="w-full flex justify-center mt-5">
      <div
        className={`${
          active ? "w-[72%] -translate-y-2" : "w-[70%]"
        } transition-all duration-300 ease-out`}>
        {/* LABEL */}
        <p
          className={`text-2xl font-black transition-all duration-300 ease-out ${
            !active ? "opacity-0 -translate-x-10" : ""
          }`}>
          {about} <span>:</span>
        </p>

        {/* INPUT + EYE */}
        <div className="relative flex items-center">
          <input
            onFocus={() => setActive(true)}
            onBlur={() => setActive(false)}
            type={isPassword ? (showPassword ? "text" : "password") : "text"}
            value={state}
            placeholder={placeholder}
            onChange={(e) => setState(e.target.value)}
            className={`w-full py-1 text-2xl outline-0 px-4 font-bold ${
              isPassword ? "pr-14x" : ""
            }`}
          />

          {/* PASSWORD EYE */}
          {isPassword && (
            <button
              type="button"
              onMouseDown={(e) => e.preventDefault()}
              onClick={togglePassword}
              className="password-icon absolute right-3 cursor-pointer flex items-center justify-center"
              aria-label={showPassword ? "Hide password" : "Show password"}>
              {showPassword ? <EyeOff size={27} /> : <Eye size={27} />}
            </button>
          )}
        </div>

        {/* UNDERLINE */}
        <div
          className={`w-full mt-1 transition-all duration-300 ease-out rounded-full ${
            active ? "bg-bright-snow h-1" : "bg-bright-snow/70 h-0.5"
          }`}
        />
      </div>
    </div>
  );
};

export default Input_logIn;
