import {
  Globe2,
  BadgeDollarSign,
  MapPin,
  CalendarCheck,
  Users2,
  Luggage,
} from "lucide-react";
import whyImage from "../assets/why-image-1.svg";
// eslint-disable-next-line no-unused-vars
import { motion } from "motion/react";
const featuresLeft = [
  {
    icon: <Globe2 className="text-accent" size={28} />,
    title: "Diverse Destinations",
    desc: "Richly varied landscapes, luxury accommodation Travel.",
  },
  {
    icon: <BadgeDollarSign className="text-accent" size={28} />,
    title: "Value for Money",
    desc: "Richly varied landscapes, luxury accommodation Travel.",
  },
  {
    icon: <MapPin className="text-accent" size={28} />,
    title: "Beautiful Places",
    desc: "Richly varied landscapes, luxury accommodation Travel.",
  },
];

const featuresRight = [
  {
    icon: <CalendarCheck className="text-accent" size={28} />,
    title: "Fast Booking",
    desc: "Richly varied landscapes, luxury accommodation Travel.",
  },
  {
    icon: <Users2 className="text-accent" size={28} />,
    title: "Support Team",
    desc: "Richly varied landscapes, luxury accommodation Travel.",
  },
  {
    icon: <Luggage className="text-accent" size={28} />,
    title: "Passionate Travel",
    desc: "Richly varied landscapes, luxury accommodation Travel.",
  },
];

const WhyChooseUs = () => {
  return (
    <div className="mx-auto w-11/12 max-w-[1440px] py-10 text-center md:py-15">
      <h2 className="mb-12 text-3xl font-bold md:text-4xl">
        Why{" "}
        <span className="relative text-accent underline decoration-wavy decoration-2">
          Choose
        </span>{" "}
        GoDesh
      </h2>

      <div className="grid grid-cols-1 items-center gap-10 md:grid-cols-3">
        {/* Left Features */}
        <div className="space-y-8 text-left">
          {featuresLeft.map((feature, idx) => (
            <div key={idx} className="flex items-start gap-4">
              {feature.icon}
              <div>
                <h4 className="text-lg font-semibold">{feature.title}</h4>
                <p className="text-sm text-gray-600">{feature.desc}</p>
              </div>
            </div>
          ))}
        </div>

        {/* Center Image */}
        <motion.div
          className="flex justify-center"
          animate={{
            y: [0, -15, 0],
          }}
          transition={{
            duration: 3,
            repeat: Infinity,
            ease: "easeInOut",
          }}
        >
          <img
            src={whyImage}
            alt="Trekkers"
            className="max-w-sm md:max-w-full"
          />
        </motion.div>

        {/* Right Features */}
        <div className="space-y-8 text-left">
          {featuresRight.map((feature, idx) => (
            <div key={idx} className="flex items-start gap-4">
              {feature.icon}
              <div>
                <h4 className="text-lg font-semibold">{feature.title}</h4>
                <p className="text-sm text-gray-600">{feature.desc}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default WhyChooseUs;
