import { useNavigate } from "react-router-dom";

const Footer = () => {
  const navigate = useNavigate();

  // Checks if the user is logged in before navigating to protected routes.
  // If no token is found, guests are redirected to /signup first.
  const handleNav = (destination) => {
    const token = localStorage.getItem("token");
    if (token) {
      navigate(destination);
    } else {
      navigate("/signup");
    }
  };

  // Scrolls smoothly to the "How It Works" section on the Home page.
  // If the user is not already on the Home page, it navigates there first.
  const handleHowItWorks = () => {
    navigate("/");
    setTimeout(() => {
      const section = document.getElementById("how-it-works");
      if (section) section.scrollIntoView({ behavior: "smooth" });
    }, 100);
  };

  return (
    <footer className="bg-emerald-900 text-emerald-50">
      <div className="max-w-6xl mx-auto px-6 py-16">

        <div className="grid grid-cols-1 md:grid-cols-2 gap-20 text-center md:text-center">
          <div>
            <h3 className="text-2xl font-bold text-white mb-4">
              Helping Hands
            </h3>
            <p className="text-emerald-200 leading-relaxed">
              A community-driven platform connecting people who want to give
              with those who truly need. Reducing waste. Building dignity.
              Built with Love by the FreeCodeCamp Spring 2026 Cohort
            </p>
          </div>

          <div>
            <h4 className="font-semibold text-white mb-4">Quick Links</h4>
            <ul className="space-y-3 text-emerald-200">
              <li
                onClick={handleHowItWorks}
                className="hover:text-white transition cursor-pointer"
              >
                How It Works
              </li>
              {/* Guests are redirected to /signup before reaching /explore */}
              <li
                onClick={() => handleNav("/explore")}
                className="hover:text-white transition cursor-pointer"
              >
                Browse Items
              </li>
              {/* Guests are redirected to /signup before reaching /donate */}
              <li
                onClick={() => handleNav("/donate")}
                className="hover:text-white transition cursor-pointer"
              >
                List an Item
              </li>
            </ul>
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