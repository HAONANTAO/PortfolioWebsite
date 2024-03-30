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
    <section className="text-white ">
      <div className="items-center gap-8 px-4 py-8 md:grid md:grid-cols-2 xl:gap-16 sm:py-16">
        <Image
          src="/images/image2.png"
          alt="about me"
          width={500}
          height={500}
        />
        <div className="flex flex-col h-full mt-4 text-left md:mt-0">
          <h2 className="mb-4 text-4xl font-bold text-white">About Me</h2>
          <p className="text-base lg:text-lg">
            Highly skilled software developer with a solid foundation in
            frontend and backend development. Proficient in building web
            application using HTML5, CSS3, JavaScript, Typescript, React,
            Node.js. Demonstrated expertise in working within an agile
            development environment and delivering projects on time. Permanent
            resident with full work right in Australia
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
          </div>
          <div className="mt-8">
            {TAB_DATA.find((t) => t.id === tab).content}
          </div>
        </div>
      </div>
    </section>
  );
};

export default AboutSection;
