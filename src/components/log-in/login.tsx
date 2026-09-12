/* eslint-disable @next/next/no-img-element */
"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { createClient } from "@/src/lib/supabase/client";

import Input_logIn from "./input";
import Button_logIn from "./button_login";
import { Martini, LucideWine } from "lucide-react";

type LoginProps = {
  switchToSignUp: () => void;
};

const Login = ({ switchToSignUp }: LoginProps) => {
  const [gmail, setGmail] = useState("");
  const [password, setPassword] = useState("");
  const [cheers, setCheers] = useState(false);

  const supabase = createClient();
  const router = useRouter();

  const handle_click = async () => {
    setCheers((prev) => !prev);

    if (!gmail || !password) {
      alert("Please fill in all fields.");
      return;
    }

    const { error } = await supabase.auth.signInWithPassword({
      email: gmail,
      password,
    });

    if (error) {
      alert(error.message);
      return;
    }

    alert("Login successful!");

    router.push("/");
    router.refresh();
  };

  return (
    <div className="w-full min-h-screen bg-linear-to-b from-dark-amethyst to-onyx text-bright-snow font-megrim flex">
      {/* FORM */}
      <div className="w-1/2 min-h-screen flex items-center justify-center px-10">
        <div className="w-full max-w-xl">
          <h1 className="login-h1 text-5xl font-black flex justify-center items-center mb-12">
            Log In
            <Martini
              size={50}
              className={`ml-5 ${
                cheers ? "rotate-15" : ""
              } transition-all duration-500`}
            />
            <LucideWine
              size={50}
              className={`${
                cheers ? "-ml-2 -rotate-30" : "ml-4"
              } transition-all duration-500`}
            />
          </h1>

          <div className="login-el mt-5">
            <Input_logIn
              about="Gmail"
              placeholder="Write your Gmail"
              state={gmail}
              setState={setGmail}
            />
          </div>

          <div className="login-el mt-5">
            <Input_logIn
              about="Password"
              placeholder="Write your Password"
              state={password}
              setState={setPassword}
            />
          </div>

          <div className="login-el mt-8">
            <Button_logIn text="Log In" click_handeler={handle_click} />
          </div>
        </div>
      </div>

      {/* IMAGE */}
      <div className="login-image-section w-1/2 min-h-screen flex flex-col items-center justify-center p-10">
        <img
          src="/hero-martini.png"
          alt="Cocktail"
          className="login-img w-80 h-120 object-cover"
        />

        <button
          type="button"
          onClick={switchToSignUp}
          className="switch-button mt-8 text-lg cursor-pointer hover:scale-105 transition-transform">
          Don&apos;t have an account? Sign Up
        </button>
      </div>
    </div>
  );
};

export default Login;
