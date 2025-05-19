/*
 * @Date: 2025-05-17 20:27:00
 * @LastEditors: 陶浩南 taoaaron5@gmail.com
 * @LastEditTime: 2025-05-19 21:17:26
 * @FilePath: /PortfolioWebsite/src/app/components/HeroSection.jsx
 */
"use client";
import React from "react";
import Image from "next/image";
import { TypeAnimation } from "react-type-animation";
import { motion } from "framer-motion";

const HeroSection = () => {
  return (
    <section className="lg:py-16">
      {/* 不同尺寸不同字体大小 */}
      <div className="grid grid-cols-1 sm:grid-cols-12">
        <motion.div
          initial={{ opacity: 0, scale: 0.5 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.5 }}
          className="col-span-7 place-self-center text-center sm:text-left">
          {/* 大屏幕下占据12列分7/5 */}
          <h1 className="mb-4 text-4xl font-extrabold text-white sm:text-45xl lg:text-8xl lg:leading-normal">
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-primary-400 to-secondary-600">
              Hello, I'm
            </span>
            <br />
            <TypeAnimation
              sequence={[
                "Aaron TAO",
                1000,
                "Web Developer",
                1000,
                "Frontend Developer",
                1000,
                "Fullstack Developer",
                1000,
                "Software Engineer",
                1000,
              ]}
              wrapper="span"
              speed={50}
              repeat={Infinity}
            />
          </h1>
          <p className="text-[#ADB7DBE]  text-base mb-6 sm:text-lg lg:text-xl">
            I am currently looking for a job as
            <br />
            Web Developer&nbsp;Software Developer&nbsp;FrontEnd Developer
          </p>
          <div>
            <button className="px-6 py-3 mr-4 w-full text-white bg-gradient-to-br from-blue-500 rounded-full via-primary-500 to-secondary-500 sm:w-fit hover:bg-slate-200">
              <a href="/PDFs/Resume2025.pdf"> Download Resume</a>
            </button>
          </div>
        </motion.div>
        <motion.div
          initial={{ opacity: 0, scale: 0.5 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.5 }}
          className="col-span-5 place-self-center mt-4 lg:mt-0">
          {/* public可以直接从/导入 */}
          <div className="rounded-full bg-[#181818] w-[250px] h-[250px] relative lg:w-[400px] lg:h-[400px]">
            <Image
              src="/images/image1.jpg"
              alt="hero image"
              className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2"
              width={300}
              height={300}></Image>
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default HeroSection;
