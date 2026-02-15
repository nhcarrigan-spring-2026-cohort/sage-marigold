import { Link } from "react-router-dom";

const Hero = () => {
  return (
    <>
      <div className="mb-8">
        <h1 className="text-4xl font-bold text-emerald-700">
          Your stuff can change someone's life
        </h1>
        <p className="max-w-2xl w-full mx-auto bg-emerald-50 p-4 rounded-lg mt-6 text-gray-600">
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
    </>
  );
};

export default Hero;
