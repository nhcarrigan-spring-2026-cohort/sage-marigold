import Hero from "../components/Hero.jsx";
import { MdPeopleAlt } from "react-icons/md";
import { FaBoxOpen, FaClock } from "react-icons/fa";
import { IoCheckmarkDoneCircle } from "react-icons/io5";
import { FaRecycle } from "react-icons/fa";
import { IoShieldCheckmarkOutline } from "react-icons/io5";

const Step = ({ number, text, color = "bg-emerald-500" }) => (
  <div className="flex items-start gap-4">
    <div className={`w-8 h-8 flex items-center justify-center rounded-full ${color} text-white text-sm font-semibold`}>
      {number}
    </div>
    <p className="text-gray-600">{text}</p>
  </div>
);

const Home = () => {
  return (
    <section className="mx-auto text-center pt-8 px-4">
      <Hero />
        <div className="max-w-6xl mx-auto text-center mb-12 pt-20 px-8">
          <h2 className="text-4xl font-bold text-gray-900">
            How It Works
          </h2>
          <div className="w-16 h-1 bg-emerald-500 mx-auto mt-3 rounded-full"></div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 max-w-6xl mx-auto">

          {/* DONORS CARD */}
          <div className="bg-white rounded-2xl shadow-sm p-10 text-left flex flex-col justify-between">
            <div>
              <div className="flex items-center gap-4 mb-8">
                <div className="w-12 h-12 bg-emerald-100 rounded-xl flex items-center justify-center">
                  <FaBoxOpen className="text-emerald-600 text-xl" />
                </div>
                <h3 className="text-2xl font-semibold">For Donors</h3>
              </div>

              <div className="space-y-6">
                <Step number="1" text="Snap a photo of your item and add a brief description." />
                <Step number="2" text="Choose a pickup location or safe meetup spot." />
                <Step number="3" text="Get notified when someone needs your item." />
              </div>
            </div>

            <button className="mt-10 bg-emerald-500 hover:bg-emerald-600 transition text-white font-semibold py-4 rounded-xl w-full">
              Start Donating
            </button>
          </div>

          {/* RECIPIENTS CARD */}
          <div className="bg-white rounded-2xl shadow-sm p-10 text-left flex flex-col justify-between">
            <div>
              <div className="flex items-center gap-4 mb-8">
                <div className="w-12 h-12 bg-gray-200 rounded-xl flex items-center justify-center">
                  <MdPeopleAlt className="text-gray-700 text-xl" />
                </div>
                <h3 className="text-2xl font-semibold">For Recipients</h3>
              </div>

              <div className="space-y-6">
                <Step number="1" text="Browse available items in your local community." color="bg-gray-800" />
                <Step number="2" text="Request the item you need and wait for approval." color="bg-gray-800" />
                <Step number="3" text="Coordinate the pickup directly with the donor." color="bg-gray-800" />
              </div>
            </div>

            <button className="mt-10 bg-gray-800 hover:bg-gray-900 transition text-white font-semibold py-4 rounded-xl w-full">
              Find Items
            </button>
          </div>
        </div>
        <div className="max-w-6xl mx-auto text-center pt-20 px-8 mb-30">
          <h2 className="text-4xl font-bold text-gray-900">
            Why Helping Hands?
          </h2>
          <p className="mt-6 text-lg text-gray-600 max-w-2xl mx-auto">
            We believe in a circular economy where every resource is valued and every
            neighbor is supported.
          </p>

          {/* Features */}
          <div className="mt-20 grid grid-cols-1 md:grid-cols-3 gap-12">
            <div className="flex flex-col items-center text-center">
              <div className="w-16 h-16 bg-white rounded-2xl shadow-md flex items-center justify-center mb-6">
                <FaRecycle className="text-emerald-500 text-2xl" />
              </div>
              <h3 className="text-xl font-semibold mb-4">Reducing Waste</h3>
              <p className="text-gray-600 max-w-xs">
                Keeping functional items out of landfills by giving them a second life in a new home.
              </p>
            </div>
            <div className="flex flex-col items-center text-center">
              <div className="w-16 h-16 bg-white rounded-2xl shadow-md flex items-center justify-center mb-6">
                <MdPeopleAlt className="text-emerald-500 text-2xl" />
              </div>
              <h3 className="text-xl font-semibold mb-4">Building Community</h3>
              <p className="text-gray-600 max-w-xs">
                Connecting neighbors through acts of kindness and direct peer-to-peer sharing.
              </p>
            </div>
            <div className="flex flex-col items-center text-center">
              <div className="w-16 h-16 bg-white rounded-2xl shadow-md flex items-center justify-center mb-6">
                <IoShieldCheckmarkOutline className="text-emerald-500 text-2xl" />
              </div>
              <h3 className="text-xl font-semibold mb-4">Dignified Giving</h3>
              <p className="text-gray-600 max-w-xs">
                A respectful platform where requesting help is as easy and dignified as browsing a store.
              </p>
            </div>
          </div>
        </div>
      </section>
  );
};

export default Home;
