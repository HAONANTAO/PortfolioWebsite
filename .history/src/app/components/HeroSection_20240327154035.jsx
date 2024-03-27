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
          className="col-span-7 text-center place-self-center sm:text-left ">
          {/* 大屏幕下占据12列分7/5 */}
          <h1 className="mb-4 text-4xl font-extrabold text-white sm:text-45xl lg:text-8xl lg:leading-normal">
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-primary-400 to-secondary-600 ">
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
            I am currently looking for a job as Web Developer Software
            Developer/FrontEnd Developer
          </p>
          <div>
            <button className="w-full px-6 py-3 mr-4 text-white rounded-full bg-gradient-to-br from-blue-500 via-primary-500 to-secondary-500 sm:w-fit hover:bg-slate-200">
              Hire Me
            </button>
            <button className="w-full px-1 py-1 mt-3 text-white rounded-full sm:w-fit bg-gradient-to-br from-blue-500 via-primary-500 to-secondary-500 hover:bg-slate-800 ">
              <span className="block bg-[#121212] hover:bg-slate-800 rounded-full px-5 py-2">
                <a href="/PDFs/Aaron_Resume.pdf"> Download CV</a>
              </span>
            </button>
          </div>
        </motion.div>
        <motion.div
          initial={{ opacity: 0, scale: 0.5 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.5 }}
          className="col-span-5 mt-4 place-self-center lg:mt-0">
          {/* public可以直接从/导入 */}
          <div className="rounded-full bg-[#181818] w-[250px] h-[250px] relative lg:w-[400px] lg:h-[400px]">
            <Image
              src="/images/image1.jpg"
              alt="hero image"
              className="absolute transform -translate-x-1/2 -translate-y-1/2 top-1/2 left-1/2"
              width={300}
              height={300}></Image>
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default HeroSection;
