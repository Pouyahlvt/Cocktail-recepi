"use client";

import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import { useRef, useState } from "react";

interface AlertProps {
  message: string;
}

const Alert = ({ message }: AlertProps) => {
  const alertRef = useRef<HTMLDivElement>(null);
  const [visible, setVisible] = useState(true);

  const closeAlert = () => {
    if (!alertRef.current) return;

    gsap.to(alertRef.current, {
      y: -20,
      opacity: 0,
      duration: 0.35,
      ease: "power2.in",
      onComplete: () => setVisible(false),
    });
  };

  useGSAP(() => {
    if (!visible) return;

    gsap.fromTo(
      alertRef.current,
      {
        y: -20,
        opacity: 0,
      },
      {
        y: 0,
        opacity: 1,
        duration: 0.4,
        ease: "power2.out",
      },
    );

    const timer = setTimeout(() => {
      closeAlert();
    }, 3000);

    return () => clearTimeout(timer);
  }, [visible]);

  if (!visible) return null;

  return (
    <div
      ref={alertRef}
      onClick={closeAlert}
      className="
        fixed
        top-6
        left-1/2
        -translate-x-1/2
        z-9999
        cursor-pointer
        rounded-xl
        border
        border-[#fafafa]/10
        bg-[#011225]
        px-6
        py-4
        text-[#fafafa]
        shadow-xl
      ">
      {message}
    </div>
  );
};

export default Alert;
