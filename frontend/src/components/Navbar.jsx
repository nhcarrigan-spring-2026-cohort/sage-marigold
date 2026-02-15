import { memo, useState } from "react";
import { NavLink,Link } from "react-router-dom";

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [search, setSearch] = useState("");

    const getLinkClass = ({ isActive }) => {
       return `hover:text-gray-600 ${
      isActive 
        ? "text-emerald-700 font-semibold border-b-2 border-emerald-700" 
        : "text-black"
    }`;
    }

  return (
    <nav className="flex justify-between sticky top-0 z-50  items-center py-4 px-8 bg-[#f5f5f5] shadow-md">
      <h1 className="text-2xl font-bold">
        <img src="/project_logo.png" alt="Sage Marigold Logo" className="h-12 w-12 inline mr-2" />
        <Link className="hidden md:inline text-emerald-700 text-xl font-cursive! hover:text-gray-600" to="/">
          HELPING HANDS
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
          <NavLink to="/" end className={getLinkClass}>
            Home
          </NavLink>
        </li>
        <li className="hover:border-b-2 hover:border-emerald-700">
          <NavLink to="/donate" className={getLinkClass}>
            Donate
          </NavLink>
        </li>
        <li className="hover:border-b-2 hover:border-emerald-700">
          <NavLink to="/explore" className={getLinkClass}>
            Explore
          </NavLink>
        </li>
        <li className="hover:border-b-2 hover:border-emerald-700">
          <NavLink to="/about" className={getLinkClass}>
            About
          </NavLink>
        </li>
        <li className="hover:border-b-2 hover:border-emerald-700">
          <NavLink to="/login" className={getLinkClass}>
            Login
          </NavLink>
        </li>
      </ul>
      {isOpen && (
        <ul className="absolute top-16 left-0 w-full bg-gray-100 flex flex-col items-center text-xl gap-4 p-4 md:hidden z-10 shadow-lg">
          <li>
            <NavLink
              to="/"
              onClick={() => setIsOpen(false)}
              className={getLinkClass}
            >
              Home
            </NavLink>
          </li>
          <li>
            <NavLink
              to="/about"
              onClick={() => setIsOpen(false)}
              className={getLinkClass}
            >
              About
            </NavLink>
          </li>
          <li>
            <NavLink
              to="/donate"
              onClick={() => setIsOpen(false)}
              className={getLinkClass}
            >
              Donate
            </NavLink>
          </li>
          <li>
            <NavLink
              to="/explore"
              onClick={() => setIsOpen(false)}
              className={getLinkClass}
            >
              Explore
            </NavLink>
          </li>
          <li>
            <NavLink
              to="/login"
              onClick={() => setIsOpen(false)}
              className={getLinkClass}
            >
              Login
            </NavLink>
          </li>
        </ul>
      )}
    </nav>
  );
};

export default memo(Navbar);

  