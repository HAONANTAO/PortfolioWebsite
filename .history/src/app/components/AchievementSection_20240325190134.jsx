import React from "react";
import achievementsList from "../Data/AchievementData";
const AchievementSection = () => {
  return (
    <div>
      {achievementsList.map((ach, index) => {
        return (
          <div key={index}>
            <h2>{ach.value}</h2>
          </div>
        );
      })}
    </div>
  );
};

export default AchievementSection;
