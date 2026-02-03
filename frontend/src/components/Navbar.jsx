import { memo, useState } from "react";
import { Link } from "react-router-dom";

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  return (
    <nav className="relative flex justify-between items-center py-4 px-8 bg-gray-100 shadow-md">
      <h1 className="text-2xl font-bold">
        <Link className="text-emerald-700 font-cursive! hover:text-gray-600" to="/">
          Sage Marigold
        </Link>
      </h1>
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="md:hidden flex flex-col gap-1 cursor-pointer"
      >
        <span className={`w-6 h-0.5 transition-all duration-200 bg-black ${isOpen ? "rotate-45 translate-y-1" : ""}`}></span>
        <span className={`w-6 h-0.5 transition-all duration-200 bg-black ${isOpen ? "opacity-0" : ""}`}></span>
        <span className={`w-6 h-0.5 transition-all duration-200 bg-black ${isOpen ? "-rotate-45 -translate-y-1" : ""}`}></span>
      </button>
      <ul className="hidden md:flex gap-6 items-center">
        <li className="hover:border-b-2 hover:border-emerald-700">
          <Link to="/" className="text-black hover:text-gray-600">
            Home
          </Link>
        </li>
        <li className="hover:border-b-2 hover:border-emerald-700">
          <Link to="/About" className="text-black hover:text-gray-600">
            About
          </Link>
        </li>
        <li className="hover:border-b-2 hover:border-emerald-700">
          <Link to="/Donate" className="text-black hover:text-gray-600">
            Donate
          </Link>
        </li>
        <li className="hover:border-b-2 hover:border-emerald-700">
          <Link to="/Explore" className="text-black hover:text-gray-600">
            Explore
          </Link>
        </li>
        <li className="hover:border-b-2 hover:border-emerald-700">
          <Link to="/Login" className="text-black hover:text-gray-600">
            Login
          </Link>
        </li>
      </ul>
      {isOpen && (
        <ul className="absolute top-16 left-0 w-full bg-gray-100 flex flex-col items-center text-xl gap-4 p-4 md:hidden z-10 shadow-lg">
          <li>
            <Link
              to="/"
              onClick={() => setIsOpen(false)}
              className="text-black hover:border-b-2 hover:border-emerald-700"
            >
              Home
            </Link>
          </li>
          <li>
            <Link
              to="/About"
              onClick={() => setIsOpen(false)}
              className="text-black hover:border-b-2 hover:border-emerald-700"
            >
              About
            </Link>
          </li>
          <li>
            <Link
              to="/Donate"
              onClick={() => setIsOpen(false)}
              className="text-black hover:border-b-2 hover:border-emerald-700"
            >
              Donate
            </Link>
          </li>
          <li>
            <Link
              to="/Explore"
              onClick={() => setIsOpen(false)}
              className="text-black hover:border-b-2 hover:border-emerald-700"
            >
              Explore
            </Link>
          </li>
          <li>
            <Link
              to="/Login"
              onClick={() => setIsOpen(false)}
              className="text-black hover:border-b-2 hover:border-emerald-700 "
            >
              Login
            </Link>
          </li>
        </ul>
      )}
    </nav>
  );
};

export default memo(Navbar);
