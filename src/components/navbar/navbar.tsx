"use client";

import { LogIn, Martini, UserIcon, LogOutIcon } from "lucide-react";
import { useEffect, useRef, useState } from "react";
import gsap from "gsap";
import Search_bar from "./searchbar";
import { createClient } from "@/src/lib/supabase/client";
import { useRouter } from "next/navigation";
import type { User } from "@supabase/supabase-js";
import { handleLogout } from "@/src/lib/auth";

const supabase = createClient();

const Navbar = () => {
  const navbarRef = useRef<HTMLDivElement>(null);
  const lastScrollY = useRef(0);
  const [user, setUser] = useState<User | null>(null);
  const router = useRouter();

  const handle_login = () => {
    router.push("/Login");
  };

  const handle_user = () => {
    router.push(`/profile/user`);
  };

  useEffect(() => {
    // Get current logged-in user
    const getUser = async () => {
      const {
        data: { user },
      } = await supabase.auth.getUser();

      setUser(user);
    };

    getUser();

    // Listen for login/logout changes
    const {
      data: { subscription },
    } = supabase.auth.onAuthStateChange((_event, session) => {
      setUser(session?.user ?? null);
    });

    return () => {
      subscription.unsubscribe();
    };

    //research more about here ⭐⭐⭐
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [supabase]);

  // scrolling control on navbar
  useEffect(() => {
    const navbar = navbarRef.current;
    if (!navbar) return;

    // Navbar is visible when the page first loads
    gsap.set(navbar, { y: 0 });

    const handleScroll = () => {
      const currentScrollY = window.scrollY;

      // Ignore very small movements
      if (Math.abs(currentScrollY - lastScrollY.current) < 10) {
        return;
      }

      // Scrolling down
      if (currentScrollY > lastScrollY.current && currentScrollY > 50) {
        gsap.to(navbar, {
          y: -120,
          duration: 0.7,
          ease: "power3.out",
        });
      }

      // Scrolling up
      else if (currentScrollY < lastScrollY.current) {
        gsap.to(navbar, {
          y: 0,
          duration: 0.7,
          ease: "power3.out",
        });
      }

      lastScrollY.current = currentScrollY;
    };

    window.addEventListener("scroll", handleScroll, { passive: true });

    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  return (
    <div ref={navbarRef} className="w-full mx-auto flex fixed top-5 h-fit z-30">
      <div className="flex rounded-full backdrop-blur-lg px-5">
        <Martini className="ml-5 my-auto" color="white" size={40} />

        <h1 className="ml-5 text-4xl font-megrim font-bold text-bright-snow my-auto ">
          C - Recpie
        </h1>
      </div>

      <Search_bar />

      {user ? (
        <div
          className="w-15 h-15
          bg-bright-snow/35
          backdrop-blur-lg
          rounded-full
          mr-5 justify-center
          flex items-center
          hover:w-32
          transition-all duration-300 ease-in-out
          group
          overflow-hidden
        ">
          <button
            onClick={handle_user}
            className="
          w-13 h-13
          backdrop-blur-lg
          rounded-full
          bg-none
          mr-2 
          flex items-center
          cursor-pointer
          transition-all duration-300 ease-in-out
          hover:bg-lnk-black hover:text-bright-snow
        ">
            <UserIcon size={30} className="mx-auto" />
          </button>
          <button
            onClick={handleLogout}
            className="
          w-13 h-13
          backdrop-blur-lg
          rounded-full
          -mr-15
          flex items-center
          cursor-pointer
          transition-all duration-300 ease-in-out
           scale-0 opacity-0
          group-hover:scale-100 group-hover:opacity-100 
          group-hover:mr-0 
          hover:bg-lnk-black hover:text-bright-snow
        ">
            <LogOutIcon size={30} className="mx-auto" />
          </button>
        </div>
      ) : (
        <button
          onClick={handle_login}
          className="
          w-15 h-15
          bg-bright-snow/70
          backdrop-blur-lg
          rounded-full
          mr-5
          flex items-center
          cursor-pointer
          hover:w-25
          transition-all duration-300 ease-in-out
          hover:bg-bright-snow/90
        ">
          <LogIn size={30} className="mx-auto" />
        </button>
      )}
    </div>
  );
};

export default Navbar;
