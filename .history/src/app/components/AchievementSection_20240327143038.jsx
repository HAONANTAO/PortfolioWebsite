"use client";
import React from "react";
import dynamic from "next/dynamic";
import achievementsList from "../Data/AchievementData";

const AnimatedNumbers = dynamic(
  () => {
    return import("react-animated-numbers");
  },
  { ssr: false },
);
const AchievementSection = () => {
  return (
    <div className="px-4 py-4 xl:gap-16 sm:py-16 xl:px-16">
      <div className="border-[#33353F] border rounded-md py-8 px-17 flex flex-row items-center justify-between">
        {achievementsList.map((ach, index) => {
          return (
            <div
              key={index}
              className="flex flex-col items-center justify-center mx-4">
              <h2 className="text-4xl font-bold text-white">
                <AnimatedNumbers includeComma
                animateToNumber={={achievementsList.value}}/>
              </h2>
              <p className="text-[#ADB7BE] text-base">{ach.metric}</p>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default AchievementSection;
