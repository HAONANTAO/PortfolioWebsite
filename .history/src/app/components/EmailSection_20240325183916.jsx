"use client";
import React, { useState } from "react";
import GithubIcon from "../../../public/images/icons/github-icon.svg";
import LinkedinIcon from "../../../public/images/icons/linkedin-icon.svg";
import Link from "next/link";
import Image from "next/image";

const EmailSection = () => {
  const [emailSubmitted, setEmailSubmitted] = useState(false);
  const handleSubmit = async (e) => {
    e.preventDefault();
    const data = {
      email: e.target.email.value,
      subject: e.target.subject.value,
      message: e.target.message.value,
    };
    const JSONdata = JSON.stringify(data);
    const endpoint = "/api/send";

    const options = {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSONdata,
    };
    //请求发送
    const response = await fetch(endpoint, options);
    const resData = await response.json();
    if (response.status === "200") {
      console.log("message sent!");
      setEmailSubmitted(true);
    }
  };

  return (
    <section className="relative grid gap-4 py-24 my-12 md:grid-cols-2 md:my-12">
      <div className="bg-[radial-gradient(ellipse_at_center,_var(--tw-gradient-stops))] from-purple-900 to-transparent rounded-full h-80 w-80 z-0 blur-lg absolute top-3/4 -left-4 transform -translate-x-1/2 -translate-y-1/2"></div>
      <div>
        <h5 className="text-xl font-bold text-white">Let's Connect</h5>
        <p className="text-[#ADB7BE] mb-4 max-w-md">
          I am currently looking for a job I am currently looking for a job I am
          currently looking for a job
        </p>
        <div className="flex flex-row gap-2 socials">
          <Link href="https://github.com/HAONANTAO">
            <Image src={GithubIcon} alt="Github Icon"></Image>
          </Link>
          <Link href="www.linkedin.com/in/haonan-tao-aaron">
            <Image src={LinkedinIcon} alt="Linkedin Icon"></Image>
          </Link>
        </div>
      </div>

      <div>
        <form className="flex flex-col" onSubmit={handleSubmit}>
          <div className="mb-6">
            <label
              type="email"
              className="block mb-2 text-sm font-medium text-white"
              htmlFor="email">
              Your Email
            </label>
            <input
              name="email"
              type="email"
              id="email"
              required
              className="bg-[#18191E] border border-[#33353F] placeholder-[#9CA2A9] text-gray-100 text-sm rounded-lg block w-full p-2.5"
              placeholder="xxxx@Gmail.com"
            />
          </div>
          <div className="mb-6">
            <label
              type="text"
              className="block mb-2 text-sm font-medium text-white"
              htmlFor="subject">
              Subject
            </label>
            <input
              name="subject"
              type="text"
              id="subject"
              required
              className="bg-[#18191E] border border-[#33353F] placeholder-[#9CA2A9] text-gray-100 text-sm rounded-lg block w-full p-2.5"
              placeholder="Just Saying Hi!"
            />
          </div>
          <div className="mb-6">
            <label
              htmlFor="message"
              className="block mb-2 text-sm font-medium text-white">
              Message
            </label>
            <textarea
              name="message"
              id="message"
              className="bg-[#18191E] border border-[#33353F] placeholder-[#9CA2A9] text-sm w-full p-2.5"
              placeholder="Let's talk about ......"></textarea>
          </div>

          <button
            type="submit"
            className="bg-purple-500 hover:bg-purple-700 text-white font-medium py-2.5 px-5 rounded-lg w-full">
            Send Message
          </button>
        </form>
      </div>
    </section>
  );
};

export default EmailSection;
