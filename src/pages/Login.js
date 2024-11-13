import React, { useState } from "react";
import { useNavigate } from "react-router-dom"; // Import useNavigate
import { login } from "../services/api";
import { motion } from "framer-motion";
import { FaUserAlt, FaLock } from "react-icons/fa";
import carImage from "../assets/car-background.jpg";
import Particles from "react-tsparticles";

const Login = ({ setAuthToken, switchToSignup }) => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const navigate = useNavigate(); // Initialize navigate

  const handleSubmit = async (e) => {
    e.preventDefault();

    // Basic validation
    if (!username || !password) {
      setError("Please enter both username and password.");
      return;
    }

    try {
      const data = await login(username, password);
      setAuthToken(data.token); // Set token in parent component (App)
      navigate("/app"); // Redirect to /app (or any other route) on successful login
    } catch (error) {
      setError("Failed to login. Check your credentials.");
    }
  };

  return (
    <div className="min-h-screen relative flex items-center justify-center bg-gray-900 overflow-hidden">
      {/* Particle Background */}
      <Particles
        options={{
          particles: {
            number: { value: 80 },
            color: { value: "#ffffff" },
            opacity: { value: 0.2 },
            size: { value: 3 },
            move: { enable: true, speed: 0.6 },
          },
          interactivity: { events: { onHover: { enable: true, mode: "repulse" } } },
        }}
        className="absolute inset-0"
      />

      {/* Background Image Overlay */}
      <div
        className="absolute inset-0 bg-cover bg-center opacity-30"
        style={{ backgroundImage: `url(${carImage})` }}
      />

      {/* Login Form */}
      <motion.div
        initial={{ opacity: 0, y: 50 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 1, ease: "easeOut" }}
        className="relative z-10 w-full max-w-lg p-10 rounded-xl bg-gray-800/70 backdrop-blur-lg shadow-2xl border border-gray-700"
      >
        <h2 className="text-4xl font-bold text-center text-transparent bg-clip-text bg-gradient-to-r from-green-400 to-blue-500 mb-6">
          Exotic Car Rental
        </h2>

        {error && (
          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="text-red-500 text-center mb-4"
          >
            {error}
          </motion.p>
        )}

        <form onSubmit={handleSubmit} className="space-y-8">
          <div className="relative">
            <label htmlFor="username" className="block text-sm font-medium text-gray-200">
              Username
            </label>
            <div className="relative mt-2">
              <FaUserAlt className="absolute top-3 left-3 text-gray-500" />
              <motion.input
                type="text"
                id="username"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                className="w-full p-3 pl-10 text-gray-900 bg-gray-200 rounded-md focus:outline-none focus:ring-2 focus:ring-green-500 transition-all duration-300 shadow-lg"
                placeholder="Enter your username"
                whileFocus={{ scale: 1.02 }}
              />
            </div>
          </div>

          <div className="relative">
            <label htmlFor="password" className="block text-sm font-medium text-gray-200">
              Password
            </label>
            <div className="relative mt-2">
              <FaLock className="absolute top-3 left-3 text-gray-500" />
              <motion.input
                type="password"
                id="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="w-full p-3 pl-10 text-gray-900 bg-gray-200 rounded-md focus:outline-none focus:ring-2 focus:ring-green-500 transition-all duration-300 shadow-lg"
                placeholder="Enter your password"
                whileFocus={{ scale: 1.02 }}
              />
            </div>
          </div>

          <motion.button
            type="submit"
            whileHover={{ scale: 1.05, backgroundColor: "#22c55e" }}
            whileTap={{ scale: 0.95 }}
            className="w-full py-3 mt-6 bg-gradient-to-r from-green-500 to-blue-500 text-white font-semibold rounded-md shadow-lg transform transition-transform duration-300 ease-out"
          >
            Login
          </motion.button>
        </form>

        <p className="text-center text-sm mt-6 text-gray-400">
          Don’t have an account?{" "}
          <motion.button
            onClick={switchToSignup}
            whileHover={{ color: "#3b82f6" }}
            className="text-blue-400 hover:underline transition duration-300"
          >
            Sign Up
          </motion.button>
        </p>
      </motion.div>
    </div>
  );
};

export default Login;
