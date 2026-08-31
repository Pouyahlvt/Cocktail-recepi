"use client";

import { useState } from "react";

const Home = () => {
  const [count, setCount] = useState(0);

  return (
    <div className="flex flex-col items-center justify-center min-h-screen py-2 bg-black">
      <h1 className="text-3xl font-bold text-white">
        Welcome to the Home Page
      </h1>
      <p className="text-xl text-white">{count}</p>
      <button
        className="bg-amber-50 border-gray-700 text-2xl text-black hover:bg-gray-700 hover:text-white px-4 py-2 rounded mt-4"
        onClick={() => setCount(count + 1)}>
        Increment
      </button>
    </div>
  );
};

export default Home;
