"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { createClient } from "@/src/lib/supabase/client";

import Input_logIn from "./input";
import Button_logIn from "./button_login";
import { Martini, LucideWine } from "lucide-react";
import Alert from "../ui/alert";
import Image from "next/image";

type LoginProps = {
  switchToSignUp: () => void;
};

const Login = ({ switchToSignUp }: LoginProps) => {
  const [gmail, setGmail] = useState("");
  const [password, setPassword] = useState("");
  const [cheers, setCheers] = useState(false);
  const [alerts, setAlerts] = useState<{
    text: string;
    type: "error" | "success" | "warning" | "info" | undefined;
  }>({ text: "", type: "info" });
  const [show, setShow] = useState(false);

  const supabase = createClient();
  const router = useRouter();

  const handle_click = async () => {
    setCheers((prev) => !prev);

    if (!gmail || !password) {
      setAlerts({ text: "Please fill in all fields.", type: "error" });
      setShow(true);
      return;
    }

    const { error } = await supabase.auth.signInWithPassword({
      email: gmail,
      password,
    });

    if (error) {
      setAlerts({ text: error.message, type: "error" });
      setShow(true);
      return;
    }

    setAlerts({ text: "Login successful!", type: "error" });
    setShow(true);

    router.push("/");
    router.refresh();
  };

  return (
    <div className="w-full min-h-screen bg-linear-to-b from-dark-amethyst to-onyx text-bright-snow font-megrim flex">
      {show && (
        <Alert
          text={alerts.text}
          onClose={() => setShow(false)}
          type={alerts.type}
        />
      )}
      {/* FORM */}
      <div className="w-1/2 min-h-screen flex  justify-center px-10 max-md:w-full pt-15">
        <div className="w-full flex-col flex max-w-xl pb-30">
          <h1 className="login-h1 text-5xl font-black flex justify-center items-center mb-12 max-lg:text-5xl ">
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

          <div className="login-el mt-auto">
            <Input_logIn
              about="Gmail"
              placeholder="Write your Gmail"
              state={gmail}
              setState={setGmail}
            />
          </div>

          <div className="login-el ">
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
          <button
            type="button"
            onClick={switchToSignUp}
            className="switch-button mt-2 text-lg cursor-pointer hover:scale-105 transition-transform md:hidden 
            max-md:w-full">
            Don&apos;t have an account? Sign Up
          </button>
        </div>
      </div>

      {/* IMAGE */}
      <div className="login-image-section w-1/2 min-h-screen flex flex-col items-center justify-center p-10 max-md:hidden">
        <Image
          width={500}
          height={500}
          src="/hero-martini.png"
          alt="Cocktail"
          className="login-img w-80 h-120 object-cover max-md:hidden"
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
