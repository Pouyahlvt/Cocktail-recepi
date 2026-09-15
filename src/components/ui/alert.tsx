// components/Alert.tsx
import React, { useEffect, useRef, useState } from "react";
import gsap from "gsap";

interface AlertProps {
  text: string;
  type?: "success" | "error" | "warning" | "info";
  duration?: number; // in milliseconds
  onClose?: () => void;
  className?: string;
}

const Alert: React.FC<AlertProps> = ({
  text,
  type = "success",
  duration = 3000,
  onClose,
}) => {
  const [isVisible, setIsVisible] = useState(true);
  const alertRef = useRef<HTMLDivElement>(null);
  const timerRef = useRef<NodeJS.Timeout | null>(null);

  // Icon mapping based on type
  const icons = {
    success: (
      <svg
        className="w-10 aspect-square max-sm:w-7"
        fill="currentColor"
        viewBox="0 0 20 20">
        <path
          fillRule="evenodd"
          d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z"
          clipRule="evenodd"
        />
      </svg>
    ),
    error: (
      <svg
        className="w-10 aspect-square max-sm:w-7"
        fill="currentColor"
        viewBox="0 0 20 20">
        <path
          fillRule="evenodd"
          d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z"
          clipRule="evenodd"
        />
      </svg>
    ),
    warning: (
      <svg
        className="w-10 aspect-square max-sm:w-7"
        fill="currentColor"
        viewBox="0 0 20 20">
        <path
          fillRule="evenodd"
          d="M8.257 3.099c.765-1.36 2.722-1.36 3.486 0l5.58 9.92c.75 1.334-.213 2.98-1.742 2.98H4.42c-1.53 0-2.493-1.646-1.743-2.98l5.58-9.92zM11 13a1 1 0 11-2 0 1 1 0 012 0zm-1-8a1 1 0 00-1 1v3a1 1 0 002 0V6a1 1 0 00-1-1z"
          clipRule="evenodd"
        />
      </svg>
    ),
    info: (
      <svg
        className="w-10 aspect-square max-sm:w-7"
        fill="currentColor"
        viewBox="0 0 20 20">
        <path
          fillRule="evenodd"
          d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7-4a1 1 0 11-2 0 1 1 0 012 0zM9 9a1 1 0 000 2v3a1 1 0 001 1h1a1 1 0 100-2h-1V9a1 1 0 00-1-1z"
          clipRule="evenodd"
        />
      </svg>
    ),
  };

  const typeStyles = {
    success: "text-dark-spruce ml-5 max-sm:ml-2 ",
    error: "text-dark-spruce ml-5 max-sm:ml-2",
    warning: "text-dark-spruce ml-5  max-sm:ml-2",
    info: "text-dark-spruce ml-5  max-sm:ml-2",
  };

  // Close alert with animation
  const closeAlert = () => {
    if (!alertRef.current) return;

    gsap.to(alertRef.current, {
      opacity: 0,
      y: -40,
      scale: 0.7,
      duration: 0.5,
      ease: "power2.in",
      onComplete: () => {
        setIsVisible(false);
        if (onClose) onClose();
      },
    });
  };

  // Handle auto-dismiss
  useEffect(() => {
    if (!isVisible) return;

    // Initial animation - slide in from right with bounce
    gsap.to(alertRef.current, {
      opacity: 1,
      y: 0,
      scale: 1,
      duration: 0.6,
      ease: "back.out(1.7)",
    });

    // Set timer to close
    timerRef.current = setTimeout(() => {
      closeAlert();
    }, duration);

    // Cleanup
    return () => {
      if (timerRef.current) {
        clearTimeout(timerRef.current);
      }
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isVisible, duration]);

  // Handle hover pause
  //   const handleMouseEnter = () => {
  //     if (timerRef.current) {
  //       clearTimeout(timerRef.current);
  //     }
  //   };

  //   const handleMouseLeave = () => {
  //     timerRef.current = setTimeout(() => {
  //       closeAlert();
  //     }, duration);
  //   };

  if (!isVisible) return null;

  return (
    <div
      ref={alertRef}
      onClick={closeAlert}
      className="absolute flex z-50 w-fit mx-auto mt-5 inset-0 h-fit bg-muted-teal/90 rounded-full items-center cursor-pointer
      scale-80 -translate-y-full shadow-2xl/70 max-sm:w-[80%] font-megrim">
      {text.length > 2 && (
        <>
          <div className={typeStyles[type]}>{icons[type]}</div>
          <p
            className="flex ml-4 mr-10 my-6 text-2xl font-museo font-semibold text-dark-spruce select-none 
          max-sm:text-sm max-sm:my-3 max-sm:mr-3 max-sm:ml-2">
            {text}
          </p>
        </>
      )}
    </div>
  );
};

export default Alert;
