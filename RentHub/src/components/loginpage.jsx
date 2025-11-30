import React, { useState } from "react";

export default function LoginPage() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!email || !password) {
      setError("Please fill out all fields.");
      return;
    }
    setError("");
    console.log("Logging in with:", { email, password });
  };

   return (
    // 1. Enhanced Page Background: Subtle blue/purple gradient
    <div className="min-h-screen w-[100vw] flex items-center justify-center bg-gradient-to-br from-indigo-800 to-purple-900 p-6">
      
      {/* 2. Enhanced Card: Sharper glass effect, better shadow, slightly more border opacity */}
      <div className="backdrop-blur-xl bg-white/15 shadow-2xl shadow-black/40 rounded-3xl p-12 w-[50%] border border-white/40 transform transition duration-500 hover:scale-[1.01]">
        
        {/* 3. Heading: Brighter, more impactful text color */}
        <h1 className="text-4xl font-extrabold text-white text-center mb-10 drop-shadow-xl tracking-wide">
         RENT HUB
        </h1>

        {error && (
          // 4. Error Message: More attention-grabbing color
          <p className="text-yellow-300 bg-red-600/30 p-2 rounded-lg text-center mb-6 font-medium border border-red-400">
            {error}
          </p>
        )}

        <form onSubmit={handleSubmit} className="space-y-6">
          
          {/* Email Input Group */}
          <div>
            <label className="block text-start font-semibold text-white text-lg">Email</label>
            <input
              type="email"
              // 5. Input Field: Smoother transition, better focus ring color, darker placeholder
              className="w-full p-4 rounded-xl bg-white/20 border border-white/30 text-white placeholder-white/60 focus:outline-none focus:ring-4 focus:ring-purple-400/50 transition duration-300"
              placeholder="name@example.com"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
          </div>

          {/* Password Input Group */}
          <div>
            <label className="block text-start font-semibold text-white mb-2 text-lg">Password</label>
            <input
              type="password"
              // 5. Input Field: Smoother transition, better focus ring color, darker placeholder
              className="w-full p-4 rounded-xl bg-white/20 border border-white/30 text-white placeholder-white/60 focus:outline-none focus:ring-4 focus:ring-purple-400/50 transition duration-300"
              placeholder="• • • • • • • •"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
          </div>

          {/* Login Button */}
          <button
            type="submit"
            // 6. Button: Gradient, strong shadow, compelling hover effect
            className="w-full bg-gradient-to-r from-purple-500 to-indigo-600 text-white p-4 rounded-xl text-xl font-bold tracking-wider shadow-lg shadow-purple-900/50 hover:from-purple-600 hover:to-indigo-700 hover:scale-[1.02] transition duration-300 ease-in-out mt-8"
          >
            Sign In
          </button>
        </form>

        {/* 7. Footer Link: Better contrast and hover */}
        <p className="text-center text-white/90 mt-8 text-md">
          Don't have an account? 
          <a className="text-yellow-300 font-bold underline ml-1 hover:text-yellow-200 transition duration-200" href="#">
            Register Now
          </a>
        </p>
      </div>
    </div>
  );
}
