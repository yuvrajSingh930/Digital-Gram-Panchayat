import React from "react";
import { Link, useNavigate } from "react-router-dom";
import "./Hero.css";

const Hero_Comp = () => {
  return (
    <>
      <div className="relative px-4 pt-16 mx-auto lg:py-20 md:px-8 xl:px-20 sm:max-w-xl md:max-w-full lg:max-w-screen-xl">
        <div className="max-w-xl mx-auto lg:max-w-screen-xl">
          <div className="mb-16 lg:max-w-lg lg:mb-0">
            <div className="max-w-xl mb-6">
              <div>
                <p className="inline-block px-3 py-1 mb-4 text-xs font-semibold tracking-wider text-teal-900 uppercase rounded-full bg-teal-400">
                  new Era of technology
                </p>
              </div>
              <h2 className="max-w-lg mb-6 font-sans text-3xl font-bold tracking-tight text-gray-900 sm:text-3xl sm:leading-none ">
                Empowering Villages with Digital Services
                <br className="hidden md:block pt-4" />
                <div className="pt-2 text-3xl">
                  Streamlining Citizen Services for a Modern{" "}
                  <span className="inline-block text-custom-blue px-1">
                    Gram Panchayat
                  </span>
                </div>
              </h2>
              <p className="text-base text-gray-700 md:text-lg">
                Apply for services, track applications, and access government
                schemes—all from the comfort of your home.
              </p>
              <p className="text-base text-gray-700 md:text-lg">
                Bridging the gap between rural governance and modern technology.
                Our platform ensures that every citizen can easily access the
                services they need.
              </p>
            </div>
            <div className="flex items-center">
              <Link to="/userlogin">
                <div className="inline-flex items-center justify-center h-12 px-6 mr-6 font-medium tracking-wide text-white transition duration-200 rounded shadow-md bg-custom-blue hover:bg-purple-800 focus:shadow-outline focus:outline-none">
                  Get started
                </div>
              </Link>

              <Link to="/about">
                <div className="inline-flex items-center font-semibold transition-colors duration-200 text-custom-blue hover:text-purple-800">
                  Learn more
                </div>
              </Link>
            </div>
          </div>
        </div>
        <div className="flex justify-center max-h-full h-4/5 overflow-hidden lg:w-2/3 xl:w-1/2 lg:absolute lg:justify-start lg:bottom-0 lg:right-0 lg:items-end">
          <img
            src="https://imageio.forbes.com/specials-images/imageserve/5fca87f3ce4ca55e8985a10a/0x0.jpg?format=jpg&height=900&width=1600&fit=bounds"
            className="object-cover object-top w-full h-64 max-w-xl -mb-16 rounded shadow-2xl lg:ml-64 xl:ml-8 lg:-mb-24 xl:-mb-28 lg:h-auto lg:max-w-screen-md myCss"
            alt=""
          />
        </div>
      </div>
    </>
  );
};

export default Hero_Comp;
// _____  _  __
// / ____|| |/ /
// | (___  | ' /
//  \___ \ |  <
//  ____) || . \
// |_____/ |_|\_\

// 👨‍💻 web site Created by Amir Sohail Sheikh
