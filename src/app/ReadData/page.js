/* @clientOnly */
"use client";
import React, { useEffect, useState } from "react";
import Link from "next/link";
import supabase from "../Supabase";

const Page = () => {
  const [carData, setCarData] = useState([]);
  const [editingCar, setEditingCar] = useState(null);
  const [formData, setFormData] = useState({
    make: "",
    model: "",
    year: "",
    price: "",
    specs: "",
  });

  const fetchCars = async () => {
    try {
      const { data, error } = await supabase.from("cartable").select("*");
      if (error) throw error;
      setCarData(data);
    } catch (error) {
      console.error("Error fetching data:", error.message);
    }
  };

  useEffect(() => {
    fetchCars();
  }, []); // Fetch data on component mount

  const handleDelete = async (id) => {
    try {
      const { error } = await supabase.from("cartable").delete().eq("id", id);
      if (error) throw error;
      fetchCars(); // Fetch updated data after deletion
    } catch (error) {
      console.error("Error deleting data:", error.message);
    }
  };

  const handleEdit = (car) => {
    setEditingCar(car);
    setFormData(car);
  };

  const handleUpdate = async () => {
    try {
      const { error } = await supabase
        .from("cartable")
        .update(formData)
        .eq("id", editingCar.id);
      if (error) throw error;
      fetchCars(); // Fetch updated data after update
      setEditingCar(null);
      setFormData({
        make: "",
        model: "",
        year: "",
        price: "",
        specs: "",
      });
    } catch (error) {
      console.error("Error updating data:", error.message);
    }
  };

  return (
    <>
      <nav className="bg-blue-800 text-white p-4">
        <div className="container mx-auto flex justify-between items-center">
          {/* Logo */}
          <div>
            <h1 className="text-xl font-bold">CarPricer</h1>
          </div>

          {/* Navigation Links */}
          <div className="flex items-center space-x-4">
            <Link className="hover:bg-black py-2 px-4 rounded-full text-white" href="/Main">
              Home
            </Link>
            <Link className="hover:bg-black py-2 px-4 rounded-full text-white" href="/AddCar">
              Add Car
            </Link>
            <Link className="hover:bg-black py-2 px-4 rounded-full text-white" href="/ReadData">
              Read
            </Link>
            <Link className="hover:bg-black py-2 px-4 rounded-full text-white" href="/pricing">
              Pricing
            </Link>
            <Link className="hover:bg-black py-2 px-4 rounded-full text-white" href="/contact">
              Contact
            </Link>
          </div>
        </div>
      </nav>

      <div className="container mx-auto my-8">
        <table className="min-w-full bg-white border border-gray-300">
          <thead>
            <tr>
              <th className="py-2 px-4 border-b">ID</th>
              <th className="py-2 px-4 border-b">Make</th>
              <th className="py-2 px-4 border-b">Model</th>
              <th className="py-2 px-4 border-b">Year</th>
              <th className="py-2 px-4 border-b">Price</th>
              <th className="py-2 px-4 border-b">Specs</th>
              <th className="py-2 px-4 border-b">Update</th>
              <th className="py-2 px-4 border-b">Delete</th>
            </tr>
          </thead>
          <tbody>
            {carData.map((car) => (
              <tr key={car.id}>
                <td className="py-2 px-4 border-b">{car.id}</td>
                <td className="py-2 px-4 border-b">{car.make}</td>
                <td className="py-2 px-4 border-b">{car.model}</td>
                <td className="py-2 px-4 border-b">{car.year}</td>
                <td className="py-2 px-4 border-b">{car.price}</td>
                <td className="py-2 px-4 border-b">{car.specs}</td>
                <td className="py-2 px-4 border-b">
                  <button
                    className="bg-blue-500 text-white px-2 py-1 rounded-md"
                    onClick={() => handleEdit(car)}
                  >
                    Edit
                  </button>
                </td>
                <td className="py-2 px-4 border-b">
                  <button
                    className="bg-red-500 text-white px-2 py-1 rounded-md"
                    onClick={() => handleDelete(car.id)}
                  >
                    Delete
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {editingCar && (
        <div className="container mx-auto my-4">
          <h2 className="text-2xl font-bold mb-4 text-center">Edit Car Details</h2>
          <form className="space-y-4">
            <div>
              <label htmlFor="make" className="block text-sm font-medium text-gray-600">
                Make
              </label>
              <input
                type="text"
                id="make"
                name="make"
                className="mt-1 p-2 w-full border rounded-md focus:outline-none focus:ring focus:border-blue-300"
                placeholder="Enter the make of the car"
                onChange={(e) => setFormData({ ...formData, make: e.target.value })}
                value={formData.make}
              />
            </div>
            <div>
            <label htmlFor="model" className="block text-sm font-medium text-gray-600">
              Model
            </label>
            <input
              type="text"
              id="model"
              name="model"
              className="mt-1 p-2 w-full border rounded-md focus:outline-none focus:ring focus:border-blue-300"
              placeholder="Enter the model of the car"
              onChange={(e) => setFormData({ ...formData, model: e.target.value })}
              value={formData.model}
            />
             

          </div>
          <div>
            <label htmlFor="model" className="block text-sm font-medium text-gray-600">
              Year
            </label>
            <input
              type="text"
              id="model"
              name="model"
              className="mt-1 p-2 w-full border rounded-md focus:outline-none focus:ring focus:border-blue-300"
              placeholder="Enter the model of the car"
              onChange={(e) => setFormData({ ...formData, year: e.target.value })}
              value={formData.year}
            />
             

          </div>
          <div>
            <label htmlFor="model" className="block text-sm font-medium text-gray-600">
              Price
            </label>
            <input
              type="text"
              id="model"
              name="model"
              className="mt-1 p-2 w-full border rounded-md focus:outline-none focus:ring focus:border-blue-300"
              placeholder="Enter the model of the car"
              onChange={(e) => setFormData({ ...formData, price: e.target.value })}
              value={formData.price}
            />
             

          </div>
          <div>
            <label htmlFor="model" className="block text-sm font-medium text-gray-600">
              Specifications
            </label>
            <input
              type="text"
              id="model"
              name="model"
              className="mt-1 p-2 w-full border rounded-md focus:outline-none focus:ring focus:border-blue-300"
              placeholder="Enter the model of the car"
              onChange={(e) => setFormData({ ...formData, specs: e.target.value })}
              value={formData.specs}
            />
             

          </div>
            <div>
              <button
                type="button"
                className="w-full bg-blue-500 text-white py-2 px-4 rounded-md hover:bg-blue-600 focus:outline-none focus:ring focus:border-blue-300"
                onClick={handleUpdate}
              >
                Update Car
              </button>
            </div>
          </form>
        </div>
      )}
    </>
  );
};

export default Page;
