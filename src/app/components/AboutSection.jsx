/*
 * @Date: 2025-01-18 16:18:52
 * @LastEditors: 陶浩南 taoaaron5@gmail.com
 * @LastEditTime: 2025-05-19 22:11:43
 * @FilePath: /PortfolioWebsite/src/app/components/AboutSection.jsx
 */
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
      <div className="gap-8 items-center px-4 py-8 md:grid md:grid-cols-2 xl:gap-16 sm:py-16">
        <Image
          src="/images/image2.png"
          alt="about me"
          width={500}
          height={500}
        />
        <div className="flex flex-col mt-4 h-full text-left md:mt-0">
          <h2 className="mb-4 text-4xl font-bold text-white">About Me</h2>
          <p className="text-base lg:text-lg">
            Full Stack Developer with experience in React, TypeScript, Node.js,
            MongoDB, and React Native.
            <br />
            1+ year of hands-on development building responsive and scalable web
            & mobile applications.
            <br />
            Completed 5+ full-stack projects, including live-deployed products
            with modern UI/UX design.
            <br />
            Fast learner with a proactive mindset, Agile experience, and
            certifications including AWS Cloud Practitioner and PMP®
            <br />
            Australian Permanent Resident with full work rights.
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
