"use client";
import { useState, useEffect } from "react";
import { Toaster, toast } from "react-hot-toast";
import { FaSun, FaMoon } from "react-icons/fa";

const DarkModeToggle = () => {
  const [darkMode, setDarkMode] = useState(false);

  useEffect(() => {
    const savedMode = localStorage.getItem("darkMode");
    if (savedMode) {
      setDarkMode(savedMode === "true");
    }
  }, []);

  useEffect(() => {
    localStorage.setItem("darkMode", darkMode.toString());
    if (darkMode) {
      document.documentElement.classList.add("dark");
    } else {
      document.documentElement.classList.remove("dark");
    }
  }, [darkMode]);

  const toggleDarkMode = () => {
    setDarkMode(!darkMode);
    toast(`Dark mode ${!darkMode ? "enabled" : "disabled"}`);
  };

  return (
    <>
      <Toaster
        toastOptions={{
          style: {
            background: darkMode ? "#222E3C" : "#fff",
            color: darkMode ? "#fff" : "#000",
            boxShadow: darkMode
              ? "0 0 10px rgba(0,0,0,0.2)"
              : "0 0 10px rgba(0,0,0,0.1)",
          },
        }}
      />
      <div className="flex justify-end">
        <button
          onClick={toggleDarkMode}
          className="flex justify-center items-center text-lg p-4 text-gray-500 dark:text-gray-400"
        >
          {darkMode ? (
            <FaSun className="ml-2 text-yellow-500 text-2xl" />
          ) : (
            <FaMoon className="ml-2 text-gray-500 text-2xl" />
          )}
        </button>
      </div>
    </>
  );
};

export default DarkModeToggle;
