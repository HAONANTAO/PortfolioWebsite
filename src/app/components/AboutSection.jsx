"use client";
import React, { startTransition, useState, useTransition } from "react";
import Image from "next/image";
import TabButton from "./TabButton";
import TAB_DATA from "../Data/TabData.js";

const AboutSection = () => {
  const [tab, setTab] = useState("Skills");
  // 用于管理组件中的过渡效果
  const [isPending, startTransition] = useTransition();

  const handleTabChange = (id) => {
    startTransition(() => {
      setTab(id);
    });
  };
  return (
    <section className="text-white">
      <div className="md:grid md:grid-cols-2 gap-8 items-center py-8 px-4 xl:gap-16 sm:py-16">
        <Image
          src="/images/image2.png"
          alt="about me"
          width={500}
          height={500}
        />
        <div className="mt-4 md:mt-0 text-left flex flex-col h-full">
          <h2 className="text-4xl font-bold text-white mb-4">About Me</h2>
          <p className="text-base lg:text-lg">
            Ad do culpa minim et et fugiat ullamco voluptate Lorem cillumcillum
            officia ex sunt. Quis quis proident commodo qui proid nostrud.cillum
            officia ex sunt. Quis quis proident commodo qui proid nostrud.
            Aliqua aliqcillum officia ex sunt. Quis quis proident commodo qui
            proid nostrud. Aliqua aliq Aliqua aliq officia ex sunt. Quis quis
            proident commodo qui proid nostrud. Aliqua aliqua consectetur velit
            esse voluptate cillum nisi.
          </p>
          <div className="flex flex-row mt-8">
            <TabButton
              selectTab={() => handleTabChange("Skills")}
              active={tab === "Skills"}>
              Skills
            </TabButton>
            <TabButton
              selectTab={() => handleTabChange("Educations")}
              active={tab === "Educations"}>
              Educations
            </TabButton>
            <TabButton
              selectTab={() => handleTabChange("Certifications")}
              active={tab === "Certifications"}>
              Certifications
            </TabButton>
          </div>{" "}
          <div className="mt-8">
            {TAB_DATA.find((t) => t.id === tab).content}
          </div>
        </div>
      </div>
    </section>
  );
};

export default AboutSection;
