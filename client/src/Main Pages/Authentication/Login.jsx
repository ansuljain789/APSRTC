import { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { FaIdCard, FaLock } from "react-icons/fa";

const Login = () => {
  const [aadharCardNumber, setAadharCardNumber] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();
    setError("");
    setLoading(true);

    try {
      const response = await axios.post(
        "http://localhost:3000/api/",
        { aadharCardNumber, password },
        { headers: { "Content-Type": "application/json" } }
      );

      localStorage.setItem("token", response.data.token);
      localStorage.setItem("role", response.data.role);

      if (response.data.role === "admin") {
        navigate("/admin");
      } else {
        navigate("/driver");
      }
    } catch (error) {
      if (error.response) {
        setError(error.response.data.message || "Invalid Aadhaar number or password.");
      } else {
        setError("Server is unreachable. Please try again later.");
      }
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-tr from-indigo-100 via-pink-100 to-blue-100 px-4">
      <form
        onSubmit={handleLogin}
        className="bg-white shadow-2xl p-8 rounded-3xl w-full max-w-md animate-slideIn"
      >
        <h2 className="text-3xl font-extrabold text-center text-indigo-600 mb-6 tracking-wide">
          User Login
        </h2>

        {error && (
          <p className="text-red-500 mb-3 text-center text-sm">{error}</p>
        )}

        {/* Aadhar Field */}
        <div className="relative mb-5">
          <FaIdCard className="absolute top-3 left-3 text-gray-400 text-sm" />
          <input
            type="text"
            value={aadharCardNumber}
            onChange={(e) => setAadharCardNumber(e.target.value)}
            required
            placeholder="Aadhaar Card Number"
            className="w-full pl-10 pr-3 py-3 rounded-md border focus:outline-none focus:ring-2 focus:ring-indigo-400 placeholder-gray-400 text-sm"
          />
        </div>

        {/* Password Field */}
        <div className="relative mb-6">
          <FaLock className="absolute top-3 left-3 text-gray-400 text-sm" />
          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
            placeholder="Password"
            className="w-full pl-10 pr-3 py-3 rounded-md border focus:outline-none focus:ring-2 focus:ring-indigo-400 placeholder-gray-400 text-sm"
          />
        </div>

        {/* Button */}
        <button
          type="submit"
          disabled={loading}
          className={`w-full bg-indigo-500 hover:bg-indigo-600 transition text-white py-2 rounded-md font-semibold text-sm ${
            loading ? "opacity-60 cursor-not-allowed" : ""
          }`}
        >
          {loading ? "Logging in..." : "Login"}
        </button>

        <div className="text-center mt-4">
          <a
            href="/ForgotPassword"
            className="text-indigo-500 hover:underline text-sm"
          >
            Forgot Password?
          </a>
        </div>
      </form>

      {/* Animation */}
      <style jsx="true">{`
        @keyframes slideIn {
          0% {
            opacity: 0;
            transform: translateY(40px);
          }
          100% {
            opacity: 1;
            transform: translateY(0);
          }
        }

        .animate-slideIn {
          animation: slideIn 0.6s ease-out;
        }
      `}</style>
    </div>
  );
};

export default Login;
