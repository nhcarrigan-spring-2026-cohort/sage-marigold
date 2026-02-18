import { Link } from "react-router-dom";

import heroBanner from "../assets/hero_banner.png";
import { memo, useState } from "react";

const Hero = () => {
  const [activeButton, setActiveButton] = useState("donate");
  return (
    <div
      className="relative rounded-3xl overflow-hidden bg-cover bg-center bg-no-repeat py-28 px-6 text-center"
      style={{ backgroundImage: `url(${heroBanner})` }}
    >
      <div className="absolute inset-0 bg-gradient-to-r from-black/70 via-black/60 to-black/70"></div>
      <div className="relative z-10 mb-10">
      <h1 className="text-3xl sm:text-4xl md:text-5xl font-bold text-white leading-tight drop-shadow-lg">
        Your stuff can change someone's life
      </h1>
        <p className="max-w-2xl mx-auto mt-6 text-lg text-gray-200 leading-relaxed">
          Every item you no longer need is something someone else is searching
          for. We bridge the gap between donors and receivers to keep resources
          moving through our community.
        </p>
      </div>
      <div className="inline-flex sm:flex-row items-center justify-center gap-5 bg-white/5 backdrop-blur-md border border-white/5 p-2 rounded-2xl shadow-xl">        
        <Link
          to="/donate"
          onClick={() => setActiveButton("donate")}
          className={`px-8 py-3 rounded-xl font-semibold transition-all duration-300 shadow-md
            ${activeButton === "donate"
              ? "bg-emerald-500 text-white"
              : "bg-transparent text-white hover:bg-white/10"
            }`}>
          I want to donate
        </Link>
        <Link
          to="/explore"
          onClick={() => setActiveButton("receive")}
          className={`px-8 py-3 rounded-xl font-semibold transition-all duration-300
            ${activeButton === "receive"
              ? "bg-emerald-500 text-white"
              : "bg-transparent text-white hover:bg-white/10"
            }`}>
          I want to receive
        </Link>
      </div>
    </div>
  );
};

export default Hero;
