/* client only */
"use client"
import { useState } from 'react';
import supabase from '../Supabase';
// import { useRouter } from "next/router"; // Correct import

const page = () => {
  // const router=useRouter();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleSignup = async () => {
    try {
      const { user, error } = await supabase.auth.signUp({
        email,
        password,
      });

      if (error) {
        console.error('Error signing up:', error.message);
      } else {
    
        console.log('User signed up successfully:', user);
        // Handle successful signup, e.g., redirect to another page
        window.location.replace('/Login');
        alert("verify your email");
      }
    } catch (error) {
      console.error('Unexpected error during signup:', error.message);
    }
  };
  
  return (
    (
      <div className="min-h-screen flex items-center justify-center bg-gray-100">
        <div className="max-w-md w-full bg-white p-8 rounded-md shadow-md">
          <h2 className="text-2xl font-bold mb-6 text-center">Login</h2>
  
          {/* Email Input */}
          <div className="mb-4">
            <label className="block text-gray-600 text-sm mb-2" htmlFor="email">
              Email:
            </label>
            <input
              type="email"
              id="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full p-2 border rounded-md focus:outline-none focus:ring focus:border-blue-300"
            />
          </div>
  
          {/* Password Input */}
          <div className="mb-6">
            <label className="block text-gray-600 text-sm mb-2" htmlFor="password">
              Password:
            </label>
            <input
              type="password"
              id="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full p-2 border rounded-md focus:outline-none focus:ring focus:border-blue-300"
            />
          </div>
  
          {/* Login Button */}
          <button
            onClick={handleSignup}
            className="w-full bg-blue-500 text-white py-2 px-4 rounded-md hover:bg-blue-600 focus:outline-none focus:ring focus:border-blue-300"
          >
            Login
          </button>
        </div>
      </div>
  ));
};

export default page;
