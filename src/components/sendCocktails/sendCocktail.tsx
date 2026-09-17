"use client";

import { useEffect, useRef, useState } from "react";
import { Plus, Trash2, SendHorizonalIcon } from "lucide-react";
import { useRouter } from "next/navigation";
import gsap from "gsap";
import { createClient } from "@/src/lib/supabase/client";
import { User } from "@supabase/supabase-js";
import Input from "../ui/Inputs";

const SendCocktail = () => {
  const router = useRouter();
  const supabase = createClient();

  const formRef = useRef<HTMLFormElement>(null);
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const [user, setUser] = useState<User | null>(null);

  const [name, setName] = useState("");
  const [ingredients, setIngredients] = useState<string[]>(["", ""]);
  const [steps, setSteps] = useState<string[]>([""]);
  //user log in check
  useEffect(() => {
    const checkLogin = async () => {
      const {
        data: { user },
      } = await supabase.auth.getUser();

      setUser(user);

      if (!user) {
        router.push("/Login");
      }
    };

    checkLogin();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    if (formRef.current) {
      gsap.fromTo(
        formRef.current,
        {
          opacity: 0,
          y: 40,
        },
        {
          opacity: 1,
          y: 0,
          duration: 0.8,
          ease: "power3.out",
        },
      );
    }
  }, [router]);

  const addIngredient = () => {
    setIngredients((current) => [...current, ""]);
  };

  const removeIngredient = (index: number) => {
    if (ingredients.length === 1) return;

    setIngredients((current) =>
      current.filter((_, ingredientIndex) => ingredientIndex !== index),
    );
  };

  const updateIngredient = (index: number, value: string) => {
    setIngredients((current) =>
      current.map((ingredient, ingredientIndex) =>
        ingredientIndex === index ? value : ingredient,
      ),
    );
  };

  const addStep = () => {
    setSteps((current) => [...current, ""]);
  };

  const removeStep = (index: number) => {
    if (steps.length === 1) return;

    setSteps((current) =>
      current.filter((_, stepIndex) => stepIndex !== index),
    );
  };

  const updateStep = (index: number, value: string) => {
    setSteps((current) =>
      current.map((step, stepIndex) => (stepIndex === index ? value : step)),
    );
  };

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    // UI only for now.
    // The API/database submission will be added later.
    console.log("Cocktail form:", {
      name,
      ingredients,
      steps,
    });

    setName("");
    setSteps(["", ""]);
    setIngredients([""]);
  };

  return (
    <main className="min-h-screen bg-onyx px-5 py-20 text-bright-snow sm:px-8 lg:px-12 font-megrim ">
      <div className="mx-auto w-full    ">
        {/* Title */}
        <div className="mb-12">
          <p className="mb-3 text-sm uppercase tracking-[0.3em] text-bright-snow/50">
            Share your recipe
          </p>

          <h1 className="text-4xl font-medium tracking-tight sm:text-5xl">
            Send your cocktails
          </h1>

          <p className="mt-4 max-w-xl text-sm leading-6 text-bright-snow/50 sm:text-base">
            Have a cocktail recipe you love? Share the ingredients and steps
            with us.
          </p>
        </div>

        {/* Form */}
        <form ref={formRef} onSubmit={handleSubmit} className="space-y-10">
          {/* Cocktail name */}
          <div>
            <Input
              about={"name"}
              placeholder={"Your name"}
              state={name}
              setState={setName}
            />
          </div>

          {/* Ingredients */}
          <section>
            <div className="mb-4 flex items-center justify-between gap-4">
              <div>
                <h2 className="text-lg font-medium">Ingredients</h2>
                <p className="mt-1 text-sm text-bright-snow/40">
                  Add everything needed for the cocktail.
                </p>
              </div>

              <button
                type="button"
                onClick={addIngredient}
                className="flex w-12 h-12 shrink-0 items-center gap-2 rounded-full border overflow-hidden relative
                px-3 py-2 text-lg bg-bright-snow text-lnk-black transition-all duration-300 ease-out group
                cursor-pointer md:hover:w-47 ">
                <Plus size={30} />
                <span className="absolute ml-0 text-nowrap opacity-0 group-hover:opacity-100 group-hover:ml-10 font-bold">
                  Add Ingredient
                </span>
              </button>
            </div>

            <div className="space-y-3 grid grid-cols-2">
              {ingredients.map((ingredient, index) => (
                <div key={index} className="flex items-center gap-3">
                  <Input
                    about={`Ingredients ${index + 1}`}
                    placeholder={`Ingredient ${index + 1}`}
                    state={ingredient}
                    setState={setName}
                    onChange={(event) =>
                      updateIngredient(index, event.target.value)
                    }
                  />

                  <button
                    type="button"
                    onClick={() => removeIngredient(index)}
                    disabled={ingredients.length === 1}
                    className="flex mt-8 h-12 w-12 shrink-0 items-center justify-center rounded-full border border-bright-snow 
                    text-lnk-black transition-all bg-bright-snow/70 md:hover:w-18 cursor-pointer 
                    disabled:cursor-not-allowed disabled:opacity-20"
                    aria-label={`Remove ingredient ${index + 1}`}>
                    <Trash2 size={20} />
                  </button>
                </div>
              ))}
            </div>
          </section>

          {/* Recipe steps */}
          <section>
            <div className="mb-4 flex items-center justify-between gap-4">
              <div>
                <h2 className="text-lg font-medium">Recipe steps</h2>
                <p className="mt-1 text-sm text-bright-snow/40">
                  Explain how to make the cocktail step by step.
                </p>
              </div>

              <button
                type="button"
                onClick={addStep}
                className="flex w-12 h-12 shrink-0 items-center gap-2 rounded-full border overflow-hidden relative
                px-3 py-2 text-lg bg-bright-snow text-lnk-black transition-all duration-300 ease-out group
                cursor-pointer md:hover:w-35 ">
                <Plus size={30} />
                <span className="absolute ml-0 text-nowrap opacity-0 group-hover:opacity-100 group-hover:ml-10 font-bold">
                  Add Step
                </span>
              </button>
            </div>

            <div className="space-y-3">
              {steps.map((step, index) => (
                <div key={index} className="flex items-start gap-3">
                  <Input
                    about={`Step ${index + 1}`}
                    placeholder={`Step ${index + 1}`}
                    state={step}
                    setState={setName}
                    onChange={(event) => updateStep(index, event.target.value)}
                  />

                  {/* <textarea
                    value={step}
                    onChange={(event) => updateStep(index, event.target.value)}
                    placeholder={`Step ${index + 1}`}
                    required
                    rows={3}
                    className="min-h-21 min-w-0 flex-1 resize-none rounded-xl border border-bright-snow text-bright-snow/10 
                    bg-lnk-black/40 px-4 py-3 text-sm leading-6 outline-none transition-colors placeholder:text-bright-snow/25 
                    focus:border-dark-amethyst"
                  /> */}

                  <button
                    type="button"
                    onClick={() => removeStep(index)}
                    disabled={step.length === 1}
                    className="flex mt-8 h-12 w-12 shrink-0 items-center justify-center rounded-full border border-bright-snow 
                    text-lnk-black transition-all bg-bright-snow/70  md:hover:w-18 cursor-pointer 
                    disabled:cursor-not-allowed disabled:opacity-20"
                    aria-label={`Remove ingredient ${index + 1}`}>
                    <Trash2 size={20} />
                  </button>
                </div>
              ))}
            </div>
          </section>

          {/* Submit */}
          <div className="pt-2">
            <button
              type="submit"
              className="group flex h-20 w-[80%] mx-auto mt-20 items-center justify-center gap-3 rounded-xl 
              bg-bright-snow text-lnk-black text-sm  cursor-pointer font-medium transition-transform hover:scale-[1.01] active:scale-[0.99]">
              <span className="text-4xl max-md:text-2xl ">Send cocktail</span>

              <SendHorizonalIcon
                size={30}
                className="transition-all duration-300 group-hover:translate-x-1  group-hover:ml-5 "
              />
            </button>
          </div>
        </form>
      </div>
    </main>
  );
};

export default SendCocktail;
