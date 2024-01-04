"use client"
import React from 'react'
import Link from 'next/link'
import supabase from '../Supabase';


const Page = () => {

  const handleLogout = async () => {
    try {
      const { error } = await supabase.auth.signOut();
      if (error) {
        console.error('Error logging out:', error.message);
      } else {
        console.log('User logged out successfully');
        localStorage.removeItem('sessionToken');
        window.location.replace('/')
        // Add additional logic if needed, such as redirecting to the login page
      }
    } catch (error) {
      console.error('Unexpected error during logout:', error.message);
    }
  };



  return (
    <div>
         <div className="bg-gray-100">
    {/* Navbar */}
    <nav className="bg-blue-800 text-white p-4">
      <div className="container mx-auto flex justify-between items-center">
        {/* Logo */}
        <div>
          <h1 className="text-xl font-bold">CarPricer</h1>
        </div>

        {/* Navigation Links */}
        <div className="flex items-center space-x-4">
          <Link className='hover:bg-black py-2 px-4 rounded-full text-white' href="/Main" >Home</Link>
          <Link className='hover:bg-black py-2 px-4 rounded-full text-white' href="/AddCar" >Add Car</Link>
          <Link className='hover:bg-black py-2 px-4 rounded-full text-white' href="/ReadData" >Read</Link>
          <Link className='hover:bg-black py-2 px-4 rounded-full text-white' href="/pricing" >Pricing</Link>
          <button onClick={handleLogout} className='hover:bg-black py-2 px-4 rounded-full text-white' >Logout</button>
        </div>
      </div>
    </nav>

    {/* Hero Section */}
    <div id="home" className="bg-blue-800 text-white text-center py-20">
      <h1 className="text-4xl font-bold mb-4">CarPricer - Car Pricing System</h1>
      <p className="text-lg mb-8">
        Find the best deals on your dream car.
      </p>
      <button className="bg-white text-blue-800 py-2 px-4 rounded-full">
        View Cars
      </button>
    </div>

    {/* Contact Section */}
    <div id="contact" className="bg-gray-800 text-white text-center py-20">
      <h2 className="text-3xl font-bold mb-4">Contact Us</h2>
      <p className="text-lg mb-8">
        Have questions or want to learn more about our pricing plans? Contact us today!
      </p>
      <button className="bg-white text-gray-800 py-2 px-4 rounded-full">
        Get in Touch
      </button>
    </div>
  </div>

    </div>
  )
}
export default Page;