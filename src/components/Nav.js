import { useState } from "react";
import { useLocation } from "react-router-dom";

import {
  FaFacebookF,
  FaInstagram,
  FaEnvelope,
  FaPhoneSquare,
  FaBars,
  FaTimes,
} from "react-icons/fa";
import logo from "../assets/logo.png";
import CarousalReact from "./carousal/Carousel";
const Nav = () => {
  const [isOpen, setIsOpen] = useState(false);
  const location = useLocation();

  return (
    <nav className="flex flex-col">
      <section className="flex flex-col md:flex-row">
        <section className="w-full xl:w-[50%]  bg-black text-white xl:clip-bar">
          <ul className="p-4 flex text-sm items-center justify-center">
            <li className="flex items-center mr-4">
              <FaEnvelope color="orange" className="mr-2" />
              feedback.srilanka@wfp.org
            </li>
            <li className="flex items-center mr-4 ml-2">
              <FaPhoneSquare color="orange" className="mr-2" />
              +94 112 555 520
            </li>
          </ul>
        </section>
        <section
          className="w-full md:w-1/2 text-white md:text-black"
          style={{ backgroundColor: "rgb(242, 240, 236)" }}
        >
          <ul className="p-4 flex text-sm items-center justify-center md:items-end md:justify-end">
            <li className="flex items-center mr-4">
              <FaFacebookF color="rgb(129, 129, 129)" className="mr-2" />
            </li>
            <li className="flex items-center">
              <FaInstagram color="rgb(129, 129, 129)" className="mr-2" />
            </li>
          </ul>
        </section>
      </section>
      <section className="flex flex-row items-center justify-around">
        <img src={logo} width={250} height={100} alt="WFP" />
        {!isOpen && (
          <ul
            className={`flex flex-row justify-around w-1/3 md:flex ${
              isOpen ? "flex" : "hidden"
            }`}
          >
            <li>
              <a href="#">Home</a>
            </li>
            <li>
              <a href="#">About</a>
            </li>
            <li>
              <a href="#">Services</a>
            </li>
            <li>
              <a href="#">Contact</a>
            </li>
          </ul>
        )}
        <FaBars
          onClick={() => setIsOpen(!isOpen)}
          className="md:hidden cursor-pointer"
        />
      </section>
      {isOpen && (
        <div className="fixed top-0 left-0 w-full h-full bg-black bg-opacity-50 z-50 flex justify-center items-center">
          <div className="bg-white rounded-lg w-2/4 md:w-1/4">
            <FaTimes
              className="cursor-pointer text-right m-2"
              onClick={() => setIsOpen(false)}
            />
            <ul className="flex flex-col items-center">
              <li className="p-2">
                <a href="#">Home</a>
              </li>
              <li className="p-2">
                <a href="#">About</a>
              </li>
              <li className="p-2">
                <a href="#">Services</a>
              </li>
              <li className="p-2 mb-4">
                <a href="#">Contact</a>
              </li>
            </ul>
          </div>
        </div>
      )}
      {location.pathname === "/" && <CarousalReact />}
    </nav>
  );
};
export default Nav;
