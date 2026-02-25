import { useNavigate } from "react-router-dom";
import heroBanner from "../assets/hero_banner.webp";
import { memo } from "react";

const Hero = () => {
 
  const navigate = useNavigate();

  
  const handleClick = (destination) => {
    const token = localStorage.getItem("token");

    if (token) {
      navigate(destination);
    } else {
      navigate("/signup");
    }
  };

  return (
    <div
      className="relative overflow-hidden bg-cover bg-center bg-no-repeat py-28 px-6 text-center"
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
        
        <button
          onClick={() => handleClick("/donate")}
          className="px-8 py-3 rounded-xl font-semibold transition-all duration-300 shadow-md bg-emerald-500 text-white hover:bg-emerald-600"
        >
          I want to donate
        </button>
        <button
          onClick={() => handleClick("/explore")}
          className="px-8 py-3 rounded-xl font-semibold transition-all duration-300 bg-transparent text-white hover:bg-white/10"
        >
          I want to receive
        </button>
      </div>
    </div>
  );
};

export default memo(Hero);