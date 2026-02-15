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
      <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
        <Link to="/donate" className="bg-emerald-700 text-white px-6 py-3 rounded-full hover:bg-emerald-800 transition-colors duration-300">
          I want to donate
        </Link>
        <Link to="/explore" className="bg-white text-emerald-700 border border-emerald-700 px-6 py-3 rounded-full  hover:bg-emerald-50 transition-colors duration-300">
          I want to receive
        </Link>
      </div>
    </>
  );
};

export default Hero;
