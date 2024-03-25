import React from "react";
import achievementsList from "../Data/AchievementData";
const AchievementSection = () => {
  return <div>{achievementsList.map((a))}</div>;
};

export default AchievementSection;
