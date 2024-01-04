"use client"
import { useState } from 'react';
import supabase from '../Supabase';

const Page = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleLogin = async () => {
    try {
      const { user, error } = await supabase.auth.signInWithPassword({
        email,
        password,
      });

      if (error) {
        console.error('Error logging in:', error.message);
      } else {
        const newSession = await supabase.auth.getSession();
        console.log('session details',newSession);
        localStorage.setItem('access_token', newSession.data.session.access_token);
        window.location.replace('/Main')
        
      }
    } catch (error) {
      console.error('Unexpected error during login:', error.message);
    }
  };

  return (
    
    <div className="min-h-screen flex items-center justify-center bg-gray-100">
    <div className="max-w-md bg-white p-8 rounded-md shadow-md">
      <h2 className="text-2xl font-bold mb-6">Login</h2>

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

      <button
        onClick={handleLogin}
        className="w-full bg-blue-500 text-white py-2 px-4 rounded-md hover:bg-blue-600 focus:outline-none focus:ring focus:border-blue-300"
      >
        Login
      </button>
    </div>
  </div>
  );
};

export default Page;
