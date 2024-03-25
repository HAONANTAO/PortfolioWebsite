import React from "react";
import achievementsList from "../Data/AchievementData";
const AchievementSection = () => {
  return (
    <div className="px-4 py-8 xl:gap-16 sm:py-16 xl:px-16">
      <div className="border-[#33353F] border rounded-md py-8 px-17 flex flex-row items-center justify-between"></div>
      {achievementsList.map((ach, index) => {
        return (
          <div
            key={index}
            className="flex flex-col items-center justify-center mx-4">
            <h2 className="text-4xl font-bold text-white">{ach.value}</h2>
            <p className="text-[#ADB7BE] text-base">{ach.metric}</p>
          </div>
        );
      })}
    </div>
  );
};

export default AchievementSection;
