"use client";

import { SearchIcon } from "lucide-react";

const Search_bar = () => {
  return (
    <div className="w-[35%] h-15 bg-bright-snow/70 backdrop-blur-lg rounded-full ml-auto mr-5 flex items-center">
      <input
        type="text"
        placeholder="Search items "
        className="w-full mx-7 outline-0 text-xl font-semibold font-megrim"
      />
      {<SearchIcon size={40} className="mx-5" />}
    </div>
  );
};

export default Search_bar;
