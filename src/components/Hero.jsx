import Navbar from "./Navbar";
import banner from "../assets/banner1.svg";
// eslint-disable-next-line no-unused-vars
import { motion } from "motion/react";
import { Link } from "react-router";
const Hero = () => {
  return (
    <div className="bg-gradient-to-b from-green-50 to-green-100">
      <section className="py-10 sm:py-16 lg:py-24">
        <div className="mx-auto w-11/12 max-w-[1440px]">
          <div className="grid grid-cols-1 items-center gap-12 lg:grid-cols-2">
            <div className="order-2 lg:order-1">
              <h1 className="text-3xl font-bold text-primary sm:text-5xl lg:text-6xl">
                Never Stop
              </h1>
              <div className="relative inline-flex">
                <span className="absolute inset-x-0 bottom-0 border-b-[30px] border-[#4ADE80]"></span>
                <motion.h1
                  animate={{
                    x: [0, -10, 0],
                  }}
                  transition={{
                    duration: 3,
                    repeat: Infinity,
                    ease: "easeInOut",
                  }}
                  className="relative mt-5 -ml-1 text-5xl font-bold text-gray-800 sm:text-7xl lg:text-9xl"
                >
                  Exploring
                </motion.h1>
              </div>

              <p className="mt-8 text-base sm:text-xl">
                Book tours, connect with expert guides, and explore hidden gems
                across Bangladesh. Travel smart, travel local.
              </p>

              <div className="mt-10 sm:flex sm:items-center sm:space-x-8">
                <Link
                  to="/all-packages"
                  className="inline-flex items-center justify-center bg-accent px-10 py-4 text-base font-semibold text-white transition-all duration-200 hover:bg-accent-hover"
                >
                  Start exploring
                </Link>
              </div>
            </div>

            <motion.div
              className="order-1 lg:order-2"
              animate={{
                y: [0, -20, 0],
              }}
              transition={{
                duration: 3,
                repeat: Infinity,
                ease: "easeInOut",
              }}
            >
              <img className="w-full" src={banner} alt="" />
            </motion.div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Hero;
