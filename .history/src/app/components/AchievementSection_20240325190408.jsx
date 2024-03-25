import React from "react";
import achievementsList from "../Data/AchievementData";
const AchievementSection = () => {
  return (
    <div>
      {achievementsList.map((ach, index) => {
        return (
          <div
            key={index}
            className="flex flex-col items-center justify-center mx-4">
            <h2 className="text-4xl font-bold text-white">{ach.value}</h2>
            <p className="text-[">{ach.metric}</p>
          </div>
        );
      })}
    </div>
  );
};

export default AchievementSection;
