"use client";

interface Props {
  text: string;
  click_handeler: () => void;
}

const Button_logIn = ({ text, click_handeler = () => {} }: Props) => {
  return (
    <button
      onClick={click_handeler}
      className={`w-[70%] max-md:w-[80%] bg-bright-snow text-dark-amethyst font-black mt-5 rounded-3xl 
      flex mx-auto py-4 text-3xl justify-center cursor-pointer hover:w-[75%] max-md:hover:w-[85%]
      transiiton-all duration-300 ease-out group max-lg:text-2xl max-sm:text-xl`}>
      <span className=" mr-5 group-hover:mr-10 transition-all duration-300 ease-out">
        ◀
      </span>
      {text}
      <span className=" ml-5 group-hover:ml-10 transition-all duration-300 ease-out">
        ▶
      </span>
    </button>
  );
};

export default Button_logIn;
