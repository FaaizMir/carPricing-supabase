/* client only */
"use client";
import React from 'react'
import Link from "next/link";
import supabase from '../Supabase';
import { useEffect } from 'react';
 const Page = () => {

    useEffect(() => {
        const checkAuth = async () => {
          const session = supabase.auth.getSession();
    
          const handleSessionExpired = async () => {
            console.log('User logged out due to expired session.');
            await supabase.auth.signOut();
          };
    
          // Check if a user is authenticated
          if (session) {
            console.log('User session:', session);
        
            const expiresAt = new Date(session.expires_at).getTime();
            const now = new Date().getTime();
        
            // Check if the JWT has expired
            if (expiresAt < now) {
              handleSessionExpired();
            } else {
                const timeout = expiresAt - now;
                console.log(`Token will expire in ${timeout} milliseconds.`);
              setTimeout(async () => {
                await supabase.auth.signOut();
                console.log('User logged out automatically after token expiration.');
                // router.push('/Login');
              }, timeout);
            }
          }
         
          return () => {
            authListener.unsubscribe();
          };
        };
        checkAuth();
       
      }, []);
      async function googleSignIn() {
        try {
          const { user, error } = await supabase.auth.signInWithOAuth({
            provider: 'google'
          });
      
          if (error) {
            console.error('Error signing in with Google:', error.message);
          } else {
            console.log('User signed in with Google:', user);
            window.location.replace('/Main')
          }
        } catch (error) {
          console.error('Unexpected error during Google sign-in:', error.message);
        }
      }
      
     
  return (
     <>
    
    
    <div className="min-h-screen flex items-center justify-center bg-gray-100">
      <div className="max-w-md text-center">
        <h1 className="text-4xl font-bold mb-4">Welcome to CarPricer</h1>
        <p className="text-gray-600 mb-8">Your one-stop solution for car pricing information.</p>

        <div className="flex space-x-4">
          <Link href="/Login" className="bg-blue-500 text-white py-2 px-4 rounded-md hover:bg-blue-600">
            Login
          </Link>
          <Link href="/Signup" className="bg-green-500 text-white py-2 px-4 rounded-md hover:bg-green-600">
            Sign Up
          </Link>
        </div>

        <div className="relative mt-6">
          <div className="absolute inset-0 flex items-center">
            <div className="w-full border-t border-gray-300"></div>
          </div>
          <div className="relative flex justify-center text-sm">
            <span className="px-2 bg-white text-gray-500">Or</span>
          </div>
        </div>

        <button
          onClick={googleSignIn}
          className="bg-red-500 text-white py-2 px-4 rounded-md hover:bg-red-600 focus:outline-none focus:ring focus:border-red-300 mt-4"
        >
          Login with Google
        </button>
      </div>
    </div></>
  )
}
export default Page