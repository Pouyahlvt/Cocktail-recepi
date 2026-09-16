"use client";

import { SetStateAction, useState } from "react";
import { Settings2Icon } from "lucide-react";
import { X } from "lucide-react";

// what should we filter ,
//
const alcohols = ["Vodka", "Whisky", "Teqila", "Wine"];

type Button = {
  onClick: () => void;
  state: string;
  name: string;
};

const Filter_buttons = ({ onClick, state, name }: Button) => {
  return (
    <button
      onClick={onClick}
      className={`mx-auto text-2xl mt-5 font-bold border-2 cursor-pointer py-2 px-6 rounded-full
      transition-all duration-300 ease-out hover:px-8 ${state === name ? "bg-bright-snow text-dark-amethyst" : ""}
      max-sm:px-2 max-sm:hover:px-3 max-sm:text-sm`}>
      {name}
    </button>
  );
};

interface Props {
  setAlcohol_filter: React.Dispatch<SetStateAction<string>>;

  setDifficulty_filter: React.Dispatch<SetStateAction<string>>;

  setStrongly_filter: React.Dispatch<SetStateAction<string>>;

  setSort_filter: React.Dispatch<SetStateAction<string>>;
}

const Filtering = ({
  setAlcohol_filter,
  setDifficulty_filter,
  setStrongly_filter,
  setSort_filter,
}: Props) => {
  const [active, setActive] = useState(false);
  const [alcohol, setAlcohol] = useState("");
  const [difficulty, setDifficulty] = useState("");
  const [strongly, setstrongly] = useState("");
  const [sort, setSort] = useState("");

  const filtering_handeller = () => {
    setAlcohol_filter(alcohol);
    setDifficulty_filter(difficulty);
    setStrongly_filter(strongly);
    setSort_filter(sort);
    setActive(false);
  };

  return (
    <div
      className={`w-full h-fit mb-15 px-10 flex justify-center items-center text-bright-snow font-megrim max-sm:px-0`}>
      <section
        className={`bg-dark-amethyst shadow-2xl border border-bright-snow/50     
        transition-all duration-300 ease-in-out rounded-[40px] overflow-hidden relative
        ${active ? "w-[95%] h-220 max-sm:w-full" : "w-[10%] max-sm:w-3/10 h-20  hover:w-[12%] max-sm:hover:w-35/100 "}`}>
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
              <h2 className="text-3xl mt-10  font-bold text-center max-sm:text-xl">
                ALCOHOL
              </h2>
              <div className="grid grid-cols-4 justify-center ">
                {alcohols.map((alc, i) => (
                  <Filter_buttons
                    key={`${alc}-filter-${i}`}
                    onClick={() =>
                      alcohol === alc ? setAlcohol("") : setAlcohol(alc)
                    }
                    state={alcohol}
                    name={alc}
                  />
                ))}
              </div>
            </section>
            <section>
              <h2 className="text-3xl mt-15 font-bold text-center uppercase max-sm:text-xl">
                Difficultty Level
              </h2>
              <div className="grid grid-cols-3 justify-center ">
                {["Easy", "Medium", "Hard"].map((diff, i) => (
                  <Filter_buttons
                    key={`${diff}-filtering-${i}`}
                    onClick={() =>
                      difficulty === diff
                        ? setDifficulty("")
                        : setDifficulty(diff)
                    }
                    state={difficulty}
                    name={diff}
                  />
                ))}
              </div>
            </section>
            <section>
              <h2 className="text-3xl mt-15 font-bold text-center uppercase max-sm:text-xl">
                Strong Grade [ ABV ]
              </h2>
              <div className="grid grid-cols-3 justify-center ">
                {["Very Strong", "Standard", "Light"].map((grade, i) => (
                  <Filter_buttons
                    key={`${grade}-filtering-${i}`}
                    onClick={() =>
                      strongly === grade ? setstrongly("") : setstrongly(grade)
                    }
                    state={strongly}
                    name={grade}
                  />
                ))}
              </div>
            </section>
            <section>
              <h2 className="text-3xl mt-15 font-bold text-center uppercase max-sm:text-xl">
                Sorted by
              </h2>
              <div className="grid grid-cols-3 justify-center ">
                <Filter_buttons
                  onClick={() =>
                    sort === "A to Z" ? setSort("") : setSort("A to Z")
                  }
                  state={sort}
                  name={"A to Z"}
                />
                <Filter_buttons
                  onClick={() =>
                    sort === "views" ? setSort("") : setSort("views")
                  }
                  state={sort}
                  name={"views"}
                />
                <Filter_buttons
                  onClick={() =>
                    sort === "popular" ? setSort("") : setSort("popular")
                  }
                  state={sort}
                  name={"popular"}
                />
              </div>
            </section>

            <div className="w-full flex mt-5">
              <button
                onClick={filtering_handeller}
                className="w-[50%] h-20 rounded-full text-3xl font-black mt-10 mx-auto border-2 cursor-pointer 
              transition-all duration-300 ease-in-out hover:bg-bright-snow hover:text-dark-amethyst hover:w-[60%]
              max-sm:w-7/10 max-sm:hover:w-8/10 max-sm:h-18 max-sm:text-2xl">
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
