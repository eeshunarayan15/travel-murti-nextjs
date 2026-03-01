"use client";

import { useState } from "react";
import DOMPurify from "isomorphic-dompurify";

interface SubPackageTabsProps {
  subPackage: {
    introduction?: string;
    tourPlan?: string;
    included?: string;
    excluded?: string;
  };
}

export default function SubPackageTabs({ subPackage }: SubPackageTabsProps) {
  const [active, setActive] = useState("introduction");

  const tabs = [
    { key: "introduction", label: "INTRODUCTION" },
    { key: "tourPlan", label: "TOUR PLAN" },
    { key: "included", label: "INCLUDED" },
    { key: "excluded", label: "EXCLUDED" },
  ];

  return (
    <>
      <div className="flex gap-1 bg-blue-500 rounded mb-3 overflow-x-auto">
        {tabs.map((tab) => (
          <button
            key={tab.key}
            onClick={() => setActive(tab.key)}
            className={`flex-1 py-2 px-2 text-xs md:text-sm rounded whitespace-nowrap ${
              active === tab.key ? "bg-white text-blue-600" : "text-white"
            }`}
          >
            {tab.label}
          </button>
        ))}
      </div>

      <div
        className="prose max-w-none"
        dangerouslySetInnerHTML={{
          __html: DOMPurify.sanitize(
            subPackage[active as keyof typeof subPackage] ||
              "No content available",
          ),
        }}
      />
    </>
  );
}
