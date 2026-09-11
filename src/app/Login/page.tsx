"use client";

import { useState } from "react";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";

import Login from "@/src/components/log-in/login";
import SignUp from "@/src/components/log-in/signup";

const AuthPage = () => {
  const [mode, setMode] = useState<"login" | "signup">("login");
  const [changing, setChanging] = useState(false);

  /*
   * ENTER ANIMATION
   *
   * Runs every time a new component is rendered.
   */
  useGSAP(() => {
    if (mode === "login") {
      const tl = gsap.timeline();

      tl.from(
        ".login-image-section",
        {
          x: 100,
          opacity: 0,
          scale: 0.9,
          duration: 0.8,
          ease: "power3.out",
        },
        "<0.1",
      )
        .from(
          ".login-h1",
          {
            y: -30,
            opacity: 0,
            scale: 0.9,
            duration: 0.5,
            ease: "back.out(1.5)",
          },
          "<0.1",
        )
        .from(
          ".login-el",
          {
            y: 25,
            opacity: 0,
            duration: 0.5,
            stagger: 0.08,
            ease: "power3.out",
          },
          "<0.1",
        )
        .from(
          ".switch-button",
          {
            y: 20,
            opacity: 0,
            duration: 0.4,
            ease: "power3.out",
          },
          "<0.1",
        );
    }

    if (mode === "signup") {
      const tl = gsap.timeline();

      tl.from(".signup-image-section", {
        x: -100,
        opacity: 0,
        scale: 0.9,
        duration: 0.8,
        ease: "power3.out",
      })
        .from(
          ".signup-form",
          {
            x: 100,
            opacity: 0,
            duration: 0.7,
            ease: "power3.out",
          },
          "<0.1",
        )
        .from(
          ".signup-h1",
          {
            y: -30,
            opacity: 0,
            scale: 0.9,
            duration: 0.5,
            ease: "back.out(1.5)",
          },
          "<0.1",
        )
        .from(
          ".signup-el",
          {
            y: 25,
            opacity: 0,
            duration: 0.5,
            stagger: 0.08,
            ease: "power3.out",
          },
          "<0.1",
        )
        .from(
          ".switch-button",
          {
            y: 20,
            opacity: 0,
            duration: 0.4,
            ease: "power3.out",
          },
          "<0.1",
        );
    }
  }, [mode]);

  /*
   * SWITCH MODE
   *
   * 1. Current component goes OUT
   * 2. mode changes
   * 3. New component gets rendered
   * 4. useGSAP runs ENTER animation
   */
  const switchMode = (newMode: "login" | "signup") => {
    if (changing || newMode === mode) return;

    setChanging(true);

    const selectors =
      mode === "login"
        ? {
            form: ".login-form",
            image: ".login-image-section",
            heading: ".login-h1",
            elements: ".login-el",
            button: ".switch-button",
          }
        : {
            form: ".signup-form",
            image: ".signup-image-section",
            heading: ".signup-h1",
            elements: ".signup-el",
            button: ".switch-button",
          };

    const tl = gsap.timeline({
      onComplete: () => {
        setMode(newMode);
        setChanging(false);
      },
    });

    /*
     * FORM OUT
     */
    tl.to(selectors.elements, {
      y: -25,
      opacity: 0,
      duration: 0.3,
      stagger: 0.05,
      ease: "power2.in",
    })

      /*
       * HEADING OUT
       */
      .to(
        selectors.heading,
        {
          y: -25,
          opacity: 0,
          scale: 0.92,
          duration: 0.3,
          ease: "power2.in",
        },
        "<",
      )

      /*
       * IMAGE OUT
       */
      .to(
        selectors.image,
        {
          x: mode === "login" ? 100 : -100,
          opacity: 0,
          scale: 0.9,
          duration: 0.5,
          ease: "power2.in",
        },
        "<",
      )

      /*
       * SWITCH BUTTON OUT
       */
      .to(
        selectors.button,
        {
          y: 20,
          opacity: 0,
          duration: 0.25,
          ease: "power2.in",
        },
        "<",
      )

      /*
       * FORM OUT
       */
      .to(
        selectors.form,
        {
          x: mode === "login" ? -100 : 100,
          opacity: 0,
          duration: 0.45,
          ease: "power2.in",
        },
        "<0.05",
      );
  };

  return (
    <div className="w-full min-h-screen overflow-hidden">
      {mode === "login" ? (
        <Login switchToSignUp={() => switchMode("signup")} />
      ) : (
        <SignUp switchToLogin={() => switchMode("login")} />
      )}
    </div>
  );
};

export default AuthPage;
