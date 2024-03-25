import React from "react";
import achievementsList from "../Data/AchievementData";
const AchievementSection = () => {
  return (
    <div>
      {achievementsList.map((ach, index) => {
        return (
          <div key={index} className="flex flex-col items">
            <h2>{ach.value}</h2>
            <p>{ach.metric}</p>
          </div>
        );
      })}
    </div>
  );
};

export default AchievementSection;
