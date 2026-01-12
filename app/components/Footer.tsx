"use client";
import { FaGithub } from "react-icons/fa";
import { FaLinkedin } from "react-icons/fa";
import { FaXTwitter } from "react-icons/fa6";

const links = [
  { href: "https://www.github.com/dotjos", icon: <FaGithub /> },
  {
    href: "https://www.linkedin.com/in/ibiwumi-joseph-51544b359/",
    icon: <FaLinkedin />,
  },
  { href: "https://x.com/ThevJose", icon: <FaXTwitter /> },
];

const Footer = () => {
  return (
    <footer className="bg-violet-300 w-screen py-4 text-black">
      <div className="container mx-auto flex flex-col items-center justify-between gap-4 px-4 md:flex-row">
        <p className="text-center text-sm md:text-left">
          @Nova 2024. All rights reserved
        </p>

        <div className="flex justify-center gap-4 md:justify-start">
          {links.map((link, index) => (
            <a
              key={index}
              href={link.href}
              target="_blank"
              rel="noopener noreferrer"
              className="text-black transition-colors duration-500 ease-in-out hover:text-white"
            >
              {link.icon}
            </a>
          ))}
        </div>
      </div>
    </footer>
  );
};

export default Footer;
