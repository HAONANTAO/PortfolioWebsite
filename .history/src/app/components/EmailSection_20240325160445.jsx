import React from "react";
import GithubIcon from "../../../public/images/icons/github-icon.svg";
import LinkedinIcon from "../../../public/images/icons/linkedin-icon.svg";
import Link from "next/link";
import Image from "next/image";

const EmailSection = () => {
  return (
    <section className="grid gap-4 py-24 my-12 md:grid-cols-2 md:my-12">
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
        <form className="flex flex-col gap-4">
          <label
            type="email"
            className="block mb-2 text-sm font-medium text-white"
            htmlFor="email">
            Your Email
          </label>
          <input
            type="email"
            id="email"
            required
            className="bg-[#18191E] border border-[#33353F] placeholder-[#9CA2A9] text-gray-100 text-sm rounded-lg block w-full p-2.5"
            placeholder="xxxx@.com"
          />

          <label
            type="email"
            className="block mb-2 text-sm font-medium text-white"
            htmlFor="subject">
           Subject 
          </label>
          <input
            type="text"
            id="subject"
            required
            className="bg-[#18191E] border border-[#33353F] placeholder-[#9CA2A9] text-gray-100 text-sm rounded-lg block w-full p-2.5"
            placeholder="xxxx@.com"
          />
        </form>
      </div>
    </section>
  );
};

export default EmailSection;
