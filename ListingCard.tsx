import React, { useState } from "react";

export default function AddListing() {
    const [form, setForm] = useState({
        title: "",
        price: "",
        engineSize: "",
        fuelType: "",
        image: null,
    });

    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
        const { name, value } = e.target;
        setForm({ ...form, [name]: value });
    };

    const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const file = e.target.files?.[0];
        setForm({ ...form, image: file });
    };

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        console.log(form); // Handle the form submission here
    };

    return (
        <div className="container mx-auto p-6">
            <h1 className="text-2xl font-bold text-center text-primary mb-6">Add a New Listing</h1>
            <form className="bg-white p-6 rounded-lg shadow-md max-w-lg mx-auto" onSubmit={handleSubmit}>
                <div className="mb-4">
                    <label className="block text-sm font-bold mb-2 text-secondary-color">Title</label>
                    <input
                        type="text"
                        name="title"
                        value={form.title}
                        onChange={handleChange}
                        className="w-full p-2 border border-gray-300 rounded"
                        placeholder="Enter vehicle title"
                    />
                </div>
                <div className="mb-4">
                    <label className="block text-sm font-bold mb-2 text-secondary-color">Price</label>
                    <input
                        type="text"
                        name="price"
                        value={form.price}
                        onChange={handleChange}
                        className="w-full p-2 border border-gray-300 rounded"
                        placeholder="Enter price"
                    />
                </div>
                <div className="mb-4">
                    <label className="block text-sm font-bold mb-2 text-secondary-color">Engine Size</label>
                    <input
                        type="text"
                        name="engineSize"
                        value={form.engineSize}
                        onChange={handleChange}
                        className="w-full p-2 border border-gray-300 rounded"
                        placeholder="Enter engine size"
                    />
                </div>
                <div className="mb-4">
                    <label className="block text-sm font-bold mb-2 text-secondary-color">Fuel Type</label>
                    <select
                        name="fuelType"
                        value={form.fuelType}
                        onChange={handleChange}
                        className="w-full p-2 border border-gray-300 rounded"
                    >
                        <option value="">Select Fuel Type</option>
                        <option value="Petrol">Petrol</option>
                        <option value="Diesel">Diesel</option>
                        <option value="Electric">Electric</option>
                    </select>
                </div>
                <div className="mb-4">
                    <label className="block text-sm font-bold mb-2 text-secondary-color">Upload Image</label>
                    <input
                        type="file"
                        name="image"
                        onChange={handleFileChange}
                        className="w-full p-2 border border-gray-300 rounded"
                    />
                </div>
                <button
                    type="submit"
                    className="w-full bg-secondary-color text-white p-2 rounded hover:bg-green-600"
                >
                    Add Listing
                </button>
            </form>
        </div>
    );
}
