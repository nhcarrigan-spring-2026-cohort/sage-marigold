import Hero from "../components/Hero.jsx";
import { MdPeopleAlt } from "react-icons/md";
import { FaBoxOpen, FaClock } from "react-icons/fa";
import { IoCheckmarkDoneCircle } from "react-icons/io5";

const Home = () => {
  return (
    <section className="mx-auto text-center pt-20 px-4">
      <Hero />
      <div className="mt-20 mb-12">
        <h2 className="text-4xl text-center mb-4 font-bold text-emerald-700">
          How to Donate
        </h2>
        <p className="text-gray-600 text-md">
          To donate, simply click the "Donate" button on any project page and
          follow the instructions.
        </p>
      </div>
      <div className="grid grid-cols-1 auto-rows-fr sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-8 items-center justify-center max-w-6xl">
        <div className="flex flex-col gap-1.5 h-full rounded-xl bg-emerald-50 border-2 border-emerald-200 p-4 justify-center items-center">
          <div className="w-12 rounded-lg bg-green-200 h-12 flex items-center justify-center ">
            <FaBoxOpen className="text-emerald-700" />
          </div>
          <h4 className="font-semibold">List your item</h4>
          <p className="text-gray-600 ">
            Take a photo and add a description. Takes less than 2 minutes.
          </p>
        </div>
        <div className="flex flex-col gap-1.5 rounded-xl bg-emerald-50 border-2 border-emerald-200 p-4 justify-center h-full items-center">
          <div className="w-12 rounded-lg bg-green-200 h-12 flex items-center justify-center ">
            <MdPeopleAlt className="text-emerald-700" />
          </div>
          <h4 className="font-semibold">Get Requests</h4>
          <p className="text-gray-600 ">
            People in need will request your item and tell you why they need it.
          </p>
        </div>
        <div className="flex flex-col gap-1.5 rounded-xl h-full bg-emerald-50 border-2 border-emerald-200 p-4 justify-center items-center">
          <div className="w-12 rounded-lg bg-green-200 h-12 flex items-center justify-center ">
            <FaClock className="text-emerald-700" />
          </div>
          <h4 className="font-semibold">Schedule Pickup</h4>
          <p className="text-gray-600 ">
            Choose who gets it and set a convenient time for them to pick it
            up.{" "}
          </p>
        </div>
        <div className="flex flex-col gap-1.5 h-full rounded-xl bg-emerald-50 border-2 border-emerald-200 p-4 justify-center items-center">
          <div className="w-12 rounded-lg bg-green-200 h-12 flex items-center justify-center">
            <IoCheckmarkDoneCircle className="text-emerald-700" />
          </div>
          <h4 className="font-semibold">Complete Donation</h4>
          <p className="text-gray-600 ">Share a verification code to confirm the handoff. Done!</p>
        </div>
      </div>
    </section>
  );
};

export default Home;
