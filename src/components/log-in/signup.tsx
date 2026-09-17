"use client";

import { useState } from "react";
import { createClient } from "@/src/lib/supabase/client";
import Input_logIn from "./input";
import Button_logIn from "./button_login";
import { Martini, LucideWine } from "lucide-react";
import Image from "next/image";
import Alert from "../ui/alert";

type SignUpProps = {
  switchToLogin: () => void;
};

const SignUp = ({ switchToLogin }: SignUpProps) => {
  const [name, setName] = useState("");
  const [gmail, setGmail] = useState("");
  const [password, setPassword] = useState("");
  const [cheers, setCheers] = useState(false);
  const [alerts, setAlerts] = useState<{
    text: string;
    type: "error" | "success" | "warning" | "info" | undefined;
  }>({ text: "", type: "info" });
  const [show, setShow] = useState(false);

  const supabase = createClient();

  const handle_click = async () => {
    setCheers((prev) => !prev);

    if (!name || !gmail || !password) {
      setAlerts({ text: "Please fill in all fields.", type: "error" });
      setShow(true);
      return;
    }

    if (password.length < 6) {
      setAlerts({
        text: "Password must be at least 6 characters.",
        type: "error",
      });
      setShow(true);
      return;
    }

    const { error } = await supabase.auth.signUp({
      email: gmail,
      password,
      options: {
        data: {
          name,
        },
      },
    });

    if (error) {
      setAlerts({ text: error.message, type: "error" });
      setShow(true);
      return;
    }

    setAlerts({
      text: "Account created! Please check your email and confirm your account.",
      type: "error",
    });
    setShow(true);

    switchToLogin();
  };

  return (
    <div className="w-full h-screen bg-linear-to-b from-dark-amethyst to-onyx text-bright-snow font-megrim flex">
      {show && (
        <Alert
          text={alerts.text}
          onClose={() => setShow(false)}
          type={alerts.type}
        />
      )}
      {/* IMAGE */}
      <div className="signup-image-section w-1/2 min-h-screen flex flex-col items-center justify-center p-10 order-1 max-md:hidden">
        <Image
          width={500}
          height={500}
          src="/hero-martini.png"
          alt="Cocktail"
          className="signup-img w-80 h-120 object-cover"
        />

        <button
          type="button"
          onClick={switchToLogin}
          className="switch-button mt-8 text-lg cursor-pointer hover:scale-105 transition-transform">
          Already have an account? Log In
        </button>
      </div>

      {/* FORM */}
      <div className="signup-form w-1/2 h-screen flex mt-15 justify-center px-10 order-2 max-md:w-full">
        <div className="w-full max-w-xl flex flex-col pb-50">
          <h1 className="signup-h1 text-5xl font-black flex justify-center items-center mb-12 max-lg:text-4xl">
            Sign Up
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

          <div className="signup-el mt-auto">
            <Input_logIn
              about="Name"
              placeholder="Write your name"
              state={name}
              setState={setName}
            />
          </div>

          <div className="signup-el ">
            <Input_logIn
              about="Gmail"
              placeholder="Write your Gmail"
              state={gmail}
              setState={setGmail}
            />
          </div>

          <div className="signup-el">
            <Input_logIn
              about="Password"
              placeholder="Write your Password"
              state={password}
              setState={setPassword}
            />
          </div>

          <div className="signup-el mt-8">
            <Button_logIn text="Sign Up" click_handeler={handle_click} />
          </div>
          <button
            type="button"
            onClick={switchToLogin}
            className="switch-button mt-2 text-lg cursor-pointer hover:scale-105 transition-transform max-md:w-full">
            Already have an account? Log In
          </button>
        </div>
      </div>
    </div>
  );
};

export default SignUp;
