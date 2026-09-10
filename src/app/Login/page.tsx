/* eslint-disable @next/next/no-img-element */
"use client";

import { useState } from "react";
import Input_logIn from "@/src/components/log-in/input";
import Button_logIn from "./button_login";

const Login = () => {
  const [name, setName] = useState("");
  const [gmail, setGmail] = useState("");
  const [password, setPassword] = useState("");

  return (
    <div
      className="w-full min-h-screen bg-linear-to-b from-dark-amethyst to-onyx 
    text-bright-snow font-megrim flex">
      <div className="w-[50%]">
        <h1 className="text-5xl text-center mt-10 font-black ">Log In</h1>
        <Input_logIn
          about="Name"
          placeholder={"Write your Name "}
          state={name}
          setState={setName}
        />
        <Input_logIn
          about="Gmail"
          placeholder={"Write your Gmail "}
          state={gmail}
          setState={setGmail}
        />
        <Input_logIn
          about="Password"
          placeholder={"Write your Password "}
          state={password}
          setState={setPassword}
        />
        <br />
        <Button_logIn
          text="Log In"
          click_handeler={function (): void {
            throw new Error("Function not implemented.");
          }}
        />
        <Button_logIn
          text="Log In"
          click_handeler={function (): void {
            throw new Error("Function not implemented.");
          }}
        />
      </div>
      <div className="w-[50%] min-h-screen group p-10 flex">
        <img
          src="/hero-martini.png"
          alt="Cocktail"
          className="mx-auto w-80 h-120 object-cover flex mt-auto"
        />
      </div>
    </div>
  );
};

export default Login;
