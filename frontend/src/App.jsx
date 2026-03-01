import Navbar from "./components/Navbar";
import { Routes, Route, Navigate } from "react-router-dom";
import Home from "./pages/Home";
import About from "./pages/About";
import Signup from "./pages/SignUp";
import Footer from "./components/Footer";
import Explore from "./pages/Explore";
import Donate from "./pages/Donate";
import "react-loading-skeleton/dist/skeleton.css";
import { SkeletonTheme } from "react-loading-skeleton";

const isLoggedIn = () => !!localStorage.getItem("token");


const ProtectedRoute = ({ element }) => {
  return isLoggedIn() ? element : <Navigate to="/signup" replace />;
};


const GuestOnlyRoute = ({ element }) => {
  return isLoggedIn() ? <Navigate to="/explore" replace /> : element;
};

function App() {
  return (
    <div className="flex flex-col min-h-screen justify-between bg-[#f5f5f5]">
      <Navbar />
      <SkeletonTheme baseColor="#EDF3F6" highlightColor="#E2E8F0">
        <Routes>
          <Route path="/" element={<GuestOnlyRoute element={<Home />} />} />

          <Route path="/explore" element={<Explore />} />
          <Route path="/donate" element={<ProtectedRoute element={<Donate />} />} />

          <Route path="/about" element={<About />} />
          <Route path="/signup" element={<Signup />} />
        </Routes>
      </SkeletonTheme>
      <Footer />
    </div>
  );
}

export default App;