"use client";
import React, { useState, useEffect } from "react";

const ChangelogPopup: React.FC = () => {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const dontShowAgain = localStorage.getItem("dontShowChangelog");
    if (!dontShowAgain) {
      setIsVisible(true);
    }
  }, []);

  const handleClose = () => {
    setIsVisible(false);
  };

  const handleDontShowAgain = () => {
    localStorage.setItem("dontShowChangelog", "true");
    setIsVisible(false);
  };

  if (!isVisible) return null;

  return (
    <div className="fixed inset-0 bg-gray-800 bg-opacity-75 flex items-center justify-center z-50">
      <div className="bg-[#222E3C] p-6 rounded-lg shadow-lg max-w-md w-full">
        <h2 className="text-xl font-bold mb-4 text-white">Changelog</h2>
        <ul className="mb-4 text-gray-300 list-disc list-inside">
          <li>Add Dark Mode</li>
          <li>Fix Responsive</li>
          <li>Fix Posisi Nama Pada Kartu Pasien</li>
          <li>Add Tips</li>
        </ul>
        <div className="flex justify-end">
          <button
            onClick={handleClose}
            className="bg-blue-500 text-white px-4 py-2 rounded mr-2"
          >
            Close
          </button>
          <button
            onClick={handleDontShowAgain}
            className="bg-red-500 text-white px-4 py-2 rounded"
          >
            Don&apos;t Show Again
          </button>
        </div>
      </div>
    </div>
  );
};

export default ChangelogPopup;
