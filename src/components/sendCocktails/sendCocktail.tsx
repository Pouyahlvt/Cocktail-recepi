"use client";

import { useEffect, useRef, useState } from "react";
import { Plus, Trash2, Send } from "lucide-react";
import { useRouter } from "next/navigation";
import gsap from "gsap";
import { createClient } from "@/src/lib/supabase/client";
import { User } from "@supabase/supabase-js";
import Navbar from "../navbar/navbar";
import Input from "../ui/Inputs";

const SendCocktail = () => {
  const router = useRouter();
  const supabase = createClient();

  const formRef = useRef<HTMLFormElement>(null);
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const [user, setUser] = useState<User | null>(null);

  const [name, setName] = useState("");
  const [ingredients, setIngredients] = useState<string[]>([""]);
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
      ingredients,
      steps,
    });
  };

  return (
    <main className="min-h-screen bg-onyx px-5 py-20 text-bright-snow sm:px-8 lg:px-12 font-megrim ">
      <Navbar />
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
          {/* User name */}
          <div>
            <Input
              about={"name"}
              placeholder={"Your name"}
              state={name}
              setState={(e) => setName()}
            />
            <label
              htmlFor="user-name"
              className="mb-3 block text-sm text-bright-snow/70">
              Your name
            </label>

            <input
              id="user-name"
              name="userName"
              type="text"
              placeholder="Enter your name"
              required
              className="h-14 w-full rounded-xl border border-bright-stext-bright-snow/10 bg-lnk-black/40 px-5 text-bright-snow 
              outline-none transition-colors placeholder:text-bright-snow/25 focus:border-dark-amethyst"
            />
          </div>

          {/* Cocktail name */}
          <div>
            <label
              htmlFor="cocktail-name"
              className="mb-3 block text-sm text-bright-snow/70">
              Cocktail name
            </label>

            <input
              id="cocktail-name"
              name="cocktailName"
              type="text"
              placeholder="Enter cocktail name"
              required
              className="h-14 w-full rounded-xl border border-bright-stext-bright-snow/10 bg-lnk-black/40 px-5 text-bright-snow outline-none transition-colors placeholder:text-bright-snow/25 focus:border-dark-amethyst"
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
                className="flex shrink-0 items-center gap-2 rounded-lg border border-bright-stext-bright-snow/10 bg-lnk-black px-3 py-2 text-sm text-bright-snow transition-transform hover:scale-105">
                <Plus size={16} />
                Add
              </button>
            </div>

            <div className="space-y-3">
              {ingredients.map((ingredient, index) => (
                <div key={index} className="flex items-center gap-3">
                  <span className="w-6 shrink-0 text-sm text-bright-snow/30">
                    {index + 1}
                  </span>

                  <input
                    type="text"
                    value={ingredient}
                    onChange={(event) =>
                      updateIngredient(index, event.target.value)
                    }
                    placeholder={`Ingredient ${index + 1}`}
                    required
                    className="h-12 min-w-0 flex-1 rounded-xl border border-bright-stext-bright-snow/10 bg-lnk-black/40 px-4 text-sm text-bright-snow outline-none transition-colors placeholder:text-bright-snow/25 focus:border-dark-amethyst"
                  />

                  <button
                    type="button"
                    onClick={() => removeIngredient(index)}
                    disabled={ingredients.length === 1}
                    className="flex h-12 w-12 shrink-0 items-center justify-center rounded-xl border border-bright-stext-bright-snow/10 text-bright-snow/40 transition-all hover:border-dark-amethyst hover:text-bright-snow disabled:cursor-not-allowed disabled:opacity-20"
                    aria-label={`Remove ingredient ${index + 1}`}>
                    <Trash2 size={17} />
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
                className="flex shrink-0 items-center gap-2 rounded-lg border border-bright-stext-bright-snow/10 bg-lnk-black px-3 py-2 text-sm text-bright-snow transition-transform hover:scale-105">
                <Plus size={16} />
              </button>
            </div>

            <div className="space-y-3">
              {steps.map((step, index) => (
                <div key={index} className="flex items-start gap-3">
                  <span className="mt-3 w-6 shrink-0 text-sm text-bright-snow/30">
                    {index + 1}
                  </span>

                  <textarea
                    value={step}
                    onChange={(event) => updateStep(index, event.target.value)}
                    placeholder={`Step ${index + 1}`}
                    required
                    rows={3}
                    className="min-h-21 min-w-0 flex-1 resize-none rounded-xl border border-bright-snow text-bright-snow/10 
                    bg-lnk-black/40 px-4 py-3 text-sm leading-6 outline-none transition-colors placeholder:text-bright-snow/25 
                    focus:border-dark-amethyst"
                  />

                  <button
                    type="button"
                    onClick={() => removeStep(index)}
                    disabled={steps.length === 1}
                    className="mt-0 flex h-12 w-12 shrink-0 items-center justify-center rounded-xl border border-bright-snow 
                    text-bright-snow/10 transition-all hover:border-dark-amethyst hover:text-bright-snow disabled:cursor-not-allowed 
                    disabled:opacity-20"
                    aria-label={`Remove step ${index + 1}`}>
                    <Trash2 size={17} />
                  </button>
                </div>
              ))}
            </div>
          </section>

          {/* Submit */}
          <div className="pt-2">
            <button
              type="submit"
              className="group flex h-14 w-full items-center justify-center gap-3 rounded-xl bg-bright-stext-bright-snow text-sm font-medium text-onyx transition-transform hover:scale-[1.01] active:scale-[0.99]">
              <span>Send cocktail</span>

              <Send
                size={17}
                className="transition-transform duration-300 group-hover:translate-x-1"
              />
            </button>
          </div>
        </form>
      </div>
    </main>
  );
};

export default SendCocktail;
