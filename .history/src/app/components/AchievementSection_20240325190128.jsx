import React from "react";
import achievementsList from "../Data/AchievementData";
const AchievementSection = () => {
  return (
    <div>
      {achievementsList.map((ach, index) => {
        return (
          <div key={index}></div>
        );
      })}
    </div>
  );
};

export default AchievementSection;
