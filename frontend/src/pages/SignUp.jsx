import { useState, useEffect, useRef } from "react";
import { useNavigate } from "react-router-dom";
import { FaRegEye, FaRegEyeSlash } from "react-icons/fa";
import { HiArrowRight, HiCheck, HiX } from "react-icons/hi";
import { ImSpinner2 } from "react-icons/im";

const EyeIcon = ({ open }) =>
  open ? (
    <FaRegEyeSlash className="w-4 h-4" />
  ) : (
    <FaRegEye className="w-4 h-4" />
  );


const AnimatedPanel = ({ id, children }) => {
  const [visible, setVisible] = useState(false);
  const [displayId, setDisplayId] = useState(id);
  const [displayChildren, setDisplayChildren] = useState(children);
  const timerRef = useRef(null);

  useEffect(() => {
    if (id === displayId) {
      setVisible(true);
      return;
    }
    setVisible(false);
    clearTimeout(timerRef.current);
    timerRef.current = setTimeout(() => {
      setDisplayId(id);
      setDisplayChildren(children);
      setVisible(true);
    }, 220); 
    return () => clearTimeout(timerRef.current);
  }, [id]); 
  useEffect(() => {
    if (visible && id === displayId) setDisplayChildren(children);
  }, [children, visible, id, displayId]);

  return (
    <div
      style={{
        transition: "opacity 220ms ease, transform 220ms ease",
        opacity: visible ? 1 : 0,
        transform: visible ? "translateY(0)" : "translateY(10px)",
      }}
    >
      {displayChildren}
    </div>
  );
};

// Signin form
const SignInForm = ({ onSwitch }) => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({ email: "", password: "" });
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const handleChange = (e) =>
    setFormData((prev) => ({ ...prev, [e.target.id]: e.target.value }));

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    setLoading(true);
    try {
      const res = await fetch(
        `${import.meta.env.VITE_API_URL}/api/auth/login`,
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(formData),
        },
      );
      const result = await res.json();
      if (!res.ok) throw new Error(result.message || "Login failed");
      localStorage.setItem("token", result.token);
      navigate("/");
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      <div className="my-6">
        <h1 className="text-2xl font-bold text-gray-900">
          Welcome <span className="text-emerald-600">back</span>
        </h1>
        <p className="text-sm text-gray-500 mt-1">
          Sign in to continue making a difference.
        </p>
      </div>

      <form onSubmit={handleSubmit} className="space-y-4">
        {error && (
          <div className="bg-red-50 border border-red-200 rounded-lg px-3 py-2 text-xs text-red-600">
            {error}
          </div>
        )}

        <div>
          <label
            htmlFor="email"
            className="block text-xs font-medium text-gray-700 mb-1"
          >
            Email address
          </label>
          <input
            id="email"
            type="email"
            value={formData.email}
            onChange={handleChange}
            required
            placeholder="johndoe@example.com"
            className="w-full border border-gray-200 rounded-lg px-3 py-2 text-sm outline-none focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500 transition-all bg-gray-50"
          />
        </div>

        <div>
          <div className="flex items-center justify-between mb-1">
            <label
              htmlFor="password"
              className="block text-xs font-medium text-gray-700"
            >
              Password
            </label>
            <button
              type="button"
              className="text-xs text-emerald-600 hover:underline font-medium"
            >
              Forgot password?
            </button>
          </div>
          <div className="relative">
            <input
              id="password"
              type={showPassword ? "text" : "password"}
              value={formData.password}
              onChange={handleChange}
              required
              placeholder="Your password"
              className="w-full border border-gray-200 rounded-lg px-3 py-2 pr-10 text-sm outline-none focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500 transition-all bg-gray-50"
            />
            <button
              type="button"
              onClick={() => setShowPassword((v) => !v)}
              className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600"
              tabIndex={-1}
            >
              <EyeIcon open={showPassword} />
            </button>
          </div>
        </div>

        <button
          type="submit"
          disabled={loading}
          className="w-full bg-emerald-600 hover:bg-emerald-700 disabled:opacity-60 text-white font-semibold py-2.5 rounded-lg text-sm transition-colors flex items-center justify-center gap-2"
        >
          {loading ? (
            <>
              <ImSpinner2 className="animate-spin w-4 h-4" /> Signing in…
            </>
          ) : (
            <>
              Sign In <HiArrowRight className="w-4 h-4" />
            </>
          )}
        </button>
      </form>

      <p className="text-center text-xs text-gray-500 mt-6">
        New here?{" "}
        <button
          onClick={onSwitch}
          className="text-emerald-600 font-semibold hover:underline"
        >
          Create an account
        </button>
      </p>
    </>
  );
};

// Signup form
const SignUpForm = ({ onSwitch }) => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    full_name: "",
    email: "",
    password: "",
    location_address: "",
  });
  const [confirmPassword, setConfirmPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirm, setShowConfirm] = useState(false);
  const [ageConfirmed, setAgeConfirmed] = useState(false);
  const [errors, setErrors] = useState({});
  const [loading, setLoading] = useState(false);

  const passwordsMatch =
    confirmPassword.length > 0 && formData.password === confirmPassword;
  const passwordsMismatch =
    confirmPassword.length > 0 && formData.password !== confirmPassword;

  const handleChange = (e) => {
    const { id, value } = e.target;
    setFormData((prev) => ({ ...prev, [id]: value }));
    if (errors[id]) setErrors((prev) => ({ ...prev, [id]: "" }));
  };

  const handleConfirmChange = (e) => {
    setConfirmPassword(e.target.value);
    if (errors.confirmPassword)
      setErrors((prev) => ({ ...prev, confirmPassword: "" }));
  };

  const validate = () => {
    const newErrors = {};
    if (!formData.full_name.trim()) newErrors.full_name = "Name is required";
    if (!formData.email.trim()) newErrors.email = "Email is required";
    if (!formData.location_address.trim())
      newErrors.location_address = "Location is required";
    if (formData.password.length < 6) newErrors.password = "Min. 6 characters";
    if (!confirmPassword)
      newErrors.confirmPassword = "Please confirm your password";
    else if (formData.password !== confirmPassword)
      newErrors.confirmPassword = "Passwords do not match";
    if (!ageConfirmed)
      newErrors.ageConfirmed = "You must confirm you are 18 or older to sign up";
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!validate()) return;
    setLoading(true);
    try {
      const res = await fetch(
        `${import.meta.env.VITE_API_URL}/api/auth/register`,
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(formData),
        },
      );
      const result = await res.json();
      if (!res.ok) throw new Error(result.message || "Sign up failed");
      localStorage.setItem("token", result.token);
      navigate("/");
    } catch (err) {
      alert(err.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      <div className="mb-4">
        <h1 className="text-2xl font-bold text-gray-900">
          Join the <span className="text-emerald-600">community</span>
        </h1>
        <p className="text-sm text-gray-500 mt-1">
          Start giving and receiving today.
        </p>
      </div>

      <form onSubmit={handleSubmit} className="space-y-3">
        <div>
          <label
            htmlFor="full_name"
            className="block text-xs font-medium text-gray-700 mb-1"
          >
            Full name
          </label>
          <input
            id="full_name"
            type="text"
            value={formData.full_name}
            onChange={handleChange}
            placeholder="Jane Doe"
            className={`w-full border rounded-lg px-3 py-2 text-sm outline-none focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500 transition-all bg-gray-50 ${errors.full_name ? "border-red-400" : "border-gray-200"}`}
          />
          {errors.full_name && (
            <p className="text-xs text-red-500 mt-1">{errors.full_name}</p>
          )}
        </div>

        <div>
          <label
            htmlFor="email"
            className="block text-xs font-medium text-gray-700 mb-1"
          >
            Email address
          </label>
          <input
            id="email"
            type="email"
            value={formData.email}
            onChange={handleChange}
            placeholder="jane@example.com"
            className={`w-full border rounded-lg px-3 py-2 text-sm outline-none focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500 transition-all bg-gray-50 ${errors.email ? "border-red-400" : "border-gray-200"}`}
          />
          {errors.email && (
            <p className="text-xs text-red-500 mt-1">{errors.email}</p>
          )}
        </div>

        <div>
          <label
            htmlFor="location_address"
            className="block text-xs font-medium text-gray-700 mb-1"
          >
            Location
          </label>
          <input
            id="location_address"
            type="text"
            value={formData.location_address}
            onChange={handleChange}
            placeholder="City, Country"
            className={`w-full border rounded-lg px-3 py-2 text-sm outline-none focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500 transition-all bg-gray-50 ${errors.location_address ? "border-red-400" : "border-gray-200"}`}
          />
          {errors.location_address && (
            <p className="text-xs text-red-500 mt-1">
              {errors.location_address}
            </p>
          )}
        </div>

        <div className="grid grid-cols-1 gap-3">
          <div>
            <label
              htmlFor="password"
              className="block text-xs font-medium text-gray-700 mb-1"
            >
              Password
            </label>
            <div className="relative">
              <input
                id="password"
                type={showPassword ? "text" : "password"}
                value={formData.password}
                onChange={handleChange}
                placeholder="Min. 6 chars"
                className={`w-full border rounded-lg px-3 py-2 pr-9 text-sm outline-none focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500 transition-all bg-gray-50 ${errors.password ? "border-red-400" : "border-gray-200"}`}
              />
              <button
                type="button"
                onClick={() => setShowPassword((v) => !v)}
                className="absolute right-2.5 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600"
                tabIndex={-1}
              >
                <EyeIcon open={showPassword} />
              </button>
            </div>
            {errors.password && (
              <p className="text-xs text-red-500 mt-1">{errors.password}</p>
            )}
          </div>

          <div>
            <label
              htmlFor="confirm_password"
              className="block text-xs font-medium text-gray-700 mb-1"
            >
              Confirm password
            </label>
            <div className="relative">
              <input
                id="confirm_password"
                type={showConfirm ? "text" : "password"}
                value={confirmPassword}
                onChange={handleConfirmChange}
                placeholder="Repeat password"
                className={`w-full border rounded-lg px-3 py-2 pr-16 text-sm outline-none focus:ring-2 transition-all bg-gray-50 ${
                  errors.confirmPassword
                    ? "border-red-400 focus:ring-red-400"
                    : passwordsMismatch
                      ? "border-red-300 focus:ring-red-300"
                      : passwordsMatch
                        ? "border-emerald-400 focus:ring-emerald-400"
                        : "border-gray-200 focus:ring-emerald-500 focus:border-emerald-500"
                }`}
              />
              <div className="absolute right-2.5 top-1/2 -translate-y-1/2 flex items-center gap-1">
                {passwordsMatch && (
                  <HiCheck className="w-3.5 h-3.5 text-emerald-500 shrink-0" />
                )}
                {passwordsMismatch && (
                  <HiX className="w-3.5 h-3.5 text-red-500 shrink-0" />
                )}
                <button
                  type="button"
                  onClick={() => setShowConfirm((v) => !v)}
                  className="text-gray-400 hover:text-gray-600"
                  tabIndex={-1}
                >
                  <EyeIcon open={showConfirm} />
                </button>
              </div>
            </div>
            {errors.confirmPassword && (
              <p className="text-xs text-red-500 mt-1">
                {errors.confirmPassword}
              </p>
            )}
            {!errors.confirmPassword && passwordsMismatch && (
              <p className="text-xs text-red-400 mt-1">Passwords don't match</p>
            )}
            {!errors.confirmPassword && passwordsMatch && (
              <p className="text-xs text-emerald-500 mt-1">Passwords match ✓</p>
            )}
          </div>
        </div>

        {/* Age confirmation checkbox */}
        <div>
          <label className="flex items-start gap-2 cursor-pointer">
            <input
              type="checkbox"
              checked={ageConfirmed}
              onChange={(e) => {
                setAgeConfirmed(e.target.checked);
                if (e.target.checked)
                  setErrors((prev) => ({ ...prev, ageConfirmed: "" }));
              }}
              className="mt-0.5 h-4 w-4 rounded border-gray-300 text-emerald-600 focus:ring-emerald-500 shrink-0"
            />
            <span className="text-xs text-gray-600 leading-relaxed">
              I confirm that I am{" "}
              <span className="font-semibold text-gray-800">18 years or older</span>
            </span>
          </label>
          {errors.ageConfirmed && (
            <p className="text-xs text-red-500 mt-1">{errors.ageConfirmed}</p>
          )}
        </div>

        <button
          type="submit"
          disabled={loading}
          className="w-full bg-emerald-600 hover:bg-emerald-700 disabled:opacity-60 text-white font-semibold py-2.5 rounded-lg text-sm transition-colors flex items-center justify-center gap-2 mt-1"
        >
          {loading ? (
            <>
              <ImSpinner2 className="animate-spin w-4 h-4" /> Creating account…
            </>
          ) : (
            <>
              Create Account <HiArrowRight className="w-4 h-4" />
            </>
          )}
        </button>
      </form>

      <p className="text-center text-xs text-gray-500 mt-4">
        Already have an account?{" "}
        <button
          onClick={onSwitch}
          className="text-emerald-600 font-semibold hover:underline"
        >
          Sign in
        </button>
      </p>
    </>
  );
};

// Signup page
const SignUp = () => {
  const [activeTab, setActiveTab] = useState("signup");

  const stats = [
    { value: "2,847", label: "Items donated" },
    { value: "1,523", label: "People helped" },
    { value: "847", label: "Active donors" },
  ];

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100 px-4 py-12">
      <div className="w-full max-w-4xl rounded-2xl shadow-md overflow-hidden flex">
        {/* ── Left Panel ── */}
        <div
          className="hidden md:flex flex-col bg-cover bg-center justify-between p-8 text-white relative overflow-hidden max-w-[55%]"
          style={{
            minHeight: "580px",
            backgroundImage: "url('/signupbg.webp')",
          }}
        >
          <div className="absolute inset-0 bg-emerald-500/50" />

          <div className="relative z-10 flex items-center gap-2">
            <div className="w-8 h-8 bg-white/20 rounded-lg flex items-center justify-center">
              <img
                src="/project_logo.png"
                alt="logo"
                className="w-5 h-5 object-contain"
              />
            </div>
            <span className="font-semibold text-sm tracking-wide uppercase">
              Helping Hands
            </span>
          </div>

          <div className="relative z-10">
            <h2 className="text-2xl font-bold leading-snug mb-4">
              Your stuff can{" "}
              <span className="text-yellow-300">change someone's</span> life.
            </h2>
            <p className="text-sm text-emerald-100 leading-relaxed mb-6">
              One account lets you both donate items you no longer need{" "}
              <em>and</em> browse things others are giving away.
            </p>

            <div className="grid grid-cols-3 gap-2 mb-6">
              {stats.map((s) => (
                <div
                  key={s.label}
                  className="bg-white/10 rounded-xl py-2 px-1 text-center backdrop-blur-sm"
                >
                  <p className="text-lg font-bold">{s.value}</p>
                  <p className="text-[10px] text-yellow-300 leading-tight mt-0.5">
                    {s.label}
                  </p>
                </div>
              ))}
            </div>

            <div className="bg-white/10 rounded-xl p-3 backdrop-blur-sm border border-white/10">
              <p className="text-xs text-emerald-50 italic leading-relaxed">
                "We believe that small acts of kindness, multiplied by many, can
                transform communities. Join us in making that vision a reality."
              </p>
              <div className="flex items-center gap-2 mt-2">
                <div className="w-6 h-6 rounded-full bg-yellow-400 flex items-center justify-center text-xs font-bold text-yellow-900">
                  S
                </div>
                <div>
                  <p className="text-xs font-semibold">Sage Marigold</p>
                  <p className="text-[10px] text-emerald-200">Organization</p>
                </div>
              </div>
            </div>
          </div>

          <p className="relative z-10 text-[10px] text-yellow-300">
            © {new Date().getFullYear()} Helping Hands · A project by Sage
            Marigold
          </p>
        </div>

        {/* ── Right Panel ── */}
        <div className=" bg-white flex flex-1 flex-col justify-start px-8 py-8">
          {/* Tab switcher */}
          <div className="flex rounded-xl border border-gray-200 p-1 mb-6 bg-gray-50">
            <button
              onClick={() => setActiveTab("signup")}
              className={`flex-1 text-center py-1.5 rounded-lg text-sm font-medium transition-all duration-200 ${
                activeTab === "signup"
                  ? "bg-emerald-600 text-white shadow-sm"
                  : "text-gray-500 hover:text-gray-700"
              }`}
            >
              Create account
            </button>
            <button
              onClick={() => setActiveTab("signin")}
              className={`flex-1 text-center py-1.5 rounded-lg text-sm font-medium transition-all duration-200 ${
                activeTab === "signin"
                  ? "bg-emerald-600 text-white shadow-sm"
                  : "text-gray-500 hover:text-gray-700"
              }`}
            >
              Sign in
            </button>
          </div>

          <AnimatedPanel id={activeTab}>
            {activeTab === "signin" ? (
              <SignInForm onSwitch={() => setActiveTab("signup")} />
            ) : (
              <SignUpForm onSwitch={() => setActiveTab("signin")} />
            )}
          </AnimatedPanel>
        </div>
      </div>
    </div>
  );
};

export default SignUp;