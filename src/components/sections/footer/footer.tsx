"use client";

const Footer = () => {
  return (
    <div className="w-full min-h-screen bg-onyx font-megrim text-bright-snow overflow-x-hidden relative">
      <section className="w-full px-15 py-5">
        <h2 className="text-[10rem] font-black italic">C-Recpies</h2>
      </section>
      <section className="w-full flex items-center justify-center text-4xl mt-20 mb-20 ">
        <button className="group font-bold italic cursor-pointer border-b-2 pb-2 mx-auto">
          CONTACT ME{" "}
          <span className="-ml-10 opacity-0  group-hover:ml-2 group-hover:opacity-100 transition-all duration-300 ease-out ">
            →
          </span>
        </button>
        <button className="group font-bold italic cursor-pointer border-b-2 pb-2  mx-auto">
          KNOW NEW{" "}
          <span className="-ml-10 opacity-0  group-hover:ml-2 group-hover:opacity-100 transition-all duration-300 ease-out ">
            →
          </span>
        </button>
      </section>

      <div className="w-full h-10  absolute bottom-0 flex px-10 justify-between">
        <p className="text-sm">© POUYA HALAVAT, 2026</p>
        <p className="text-xl font-">
          always be DRUNK <span className="ml-2">{"*_*"}</span>
        </p>
      </div>
    </div>
  );
};

export default Footer;
