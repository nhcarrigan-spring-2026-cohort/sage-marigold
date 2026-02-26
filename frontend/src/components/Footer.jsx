import { FaHeart, FaGithub, FaTwitter } from "react-icons/fa";

const Footer = () => {
  return (
    <footer className="bg-emerald-900 text-emerald-50">
      <div className="max-w-6xl mx-auto px-6 py-16">

        <div className="grid grid-cols-1 md:grid-cols-3 gap-12 text-center md:text-left">

          <div>
            <h3 className="text-2xl font-bold text-white mb-4">
              Helping Hands
            </h3>
            <p className="text-emerald-200 leading-relaxed">
              A community-driven platform connecting people who want to give
              with those who truly need. Reducing waste. Building dignity.
            </p>
          </div>

          <div>
            <h4 className="font-semibold text-white mb-4">Quick Links</h4>
            <ul className="space-y-3 text-emerald-200">
              <li className="hover:text-white transition cursor-pointer">
                How It Works
              </li>
              <li className="hover:text-white transition cursor-pointer">
                Browse Items
              </li>
              <li className="hover:text-white transition cursor-pointer">
                List an Item
              </li>
            </ul>
          </div>

          <div>
            <div className="flex justify-center md:justify-start gap-5 text-xl">
              <a href="https://github.com/nhcarrigan-spring-2026-cohort/sage-marigold"><FaGithub className="hover:text-white transition cursor-pointer" /></a>
            </div>
            <p className="mt-6 text-emerald-200 text-sm">
              Built with <FaHeart className="inline text-red-400 mx-1" />
              by the Sage Marigold team  
              <br />
              freeCodeCamp Spring 2026 Cohort
            </p>
          </div>

        </div>

        <div className="border-t border-emerald-700 mt-12 pt-6 text-center text-sm text-emerald-300">
          © {new Date().getFullYear()} Helping Hands. All rights reserved.
        </div>

      </div>
    </footer>
  );
};

export default Footer;