"use client";

import CocktailGallery from "../CocktailsGallery";

const Most_viewed = () => {
  return (
    <div className="w-full min-h-screen bg-onyx font-megrim pt-20">
      <div className="flex mb-30 mx-10 justify-between">
        <h1 className="text-6xl text-bright-snow ">
          This Week <br /> Most Viewd
        </h1>
        <h2 className=" text-xl text-bright-snow/50 my-auto ">
          Discover of cocktails have
          <br />
          more viewed in this week
        </h2>
      </div>
      <div className="w-full ">
        <CocktailGallery />
      </div>
    </div>
  );
};

export default Most_viewed;
