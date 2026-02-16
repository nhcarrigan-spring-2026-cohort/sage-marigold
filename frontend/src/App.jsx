
import Navbar from "./components/Navbar";
import { Routes, Route } from "react-router-dom";
import Home from "./pages/Home";
import About from "./pages/About";
import Login from "./pages/Login";
import Footer from "./components/Footer";
import Explore from "./pages/Explore";
import Donate from "./pages/Donate";
import SignUp from "./pages/SignUp";
import "react-loading-skeleton/dist/skeleton.css";
import { SkeletonTheme } from "react-loading-skeleton";

function App() {
  return (
    <div className="flex flex-col min-h-screen justify-between bg-[#f5f5f5]">
      <Navbar />
      <SkeletonTheme baseColor="#EDF3F6" highlightColor="#E2E8F0">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/explore" element={<Explore />} />
          <Route path="/donate" element={<Donate />} />
          <Route path="/about" element={<About />} />
          <Route path="/login" element={<Login />} />
          <Route path="signUp" element={<SignUp/>} />
        </Routes>
      </SkeletonTheme>

      <Footer />


  
    </div>
  );
}

export default App;
