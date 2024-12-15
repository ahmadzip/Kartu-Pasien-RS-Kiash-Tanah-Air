"use client";
import React, { useState, useEffect } from "react";

const ChangelogPopup: React.FC = () => {
  const [isVisible, setIsVisible] = useState(false);
  const lastUpdate = "16/12/24"; // Current update date in dd/mm/yy format

  useEffect(() => {
    const dontShowAgain = localStorage.getItem("dontShowChangelog");
    const lastUpdateDate = localStorage.getItem("lastUpdateDate");

    if (!dontShowAgain || lastUpdateDate !== lastUpdate) {
      setIsVisible(true);
      localStorage.setItem("lastUpdateDate", lastUpdate);
      localStorage.removeItem("dontShowChangelog");
    }
  }, []); // Removed lastUpdate from dependency array

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
      <div className="p-6 rounded-lg shadow-lg max-w-md w-full bg-white dark:bg-[#222E3C] text-gray-800 dark:text-gray-200">
        <h2 className="text-xl font-bold mb-4 text-gray-900 dark:text-white">
          Changelog
        </h2>
        <ul className="mb-4 list-disc list-inside">
          <li>
            <strong>[15/12/24]</strong> Add Dark Mode
          </li>
          <li>
            <strong>[15/12/24]</strong> Fix Responsive
          </li>
          <li>
            <strong>[15/12/24]</strong> Fix Posisi Nama Pada Kartu Pasien
          </li>
          <li>
            <strong>[15/12/24]</strong> Add Tips
          </li>
          <li>
            <strong>[16/12/24]</strong> Add Button Copy Image and Name
          </li>
          <li>
            <strong>[16/12/24]</strong> Add Date Copy
          </li>
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
