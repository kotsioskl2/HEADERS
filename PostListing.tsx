import React, { useState } from "react";
import { createListing, uploadImage } from "./supabaseUtils";

const PostListing = () => {
  const [formData, setFormData] = useState({
    name: "",
    price: "",
    engine: "",
    engineSize: "",
    mileage: "",
    transmission: "",
    color: "",
    year: "",
    description: "",
    image: null,
  });

  const [uploading, setUploading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setFormData((prev) => ({ ...prev, image: file }));
    } else {
      alert("Please select a valid image file.");
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError(null);

    try {
      setUploading(true);
      let imageUrl = "";

      if (formData.image) {
        console.log("Uploading image...");
        imageUrl = await uploadImage(formData.image);
        console.log("Image uploaded:", imageUrl);
      }

      const payload = {
        ...formData,
        image: imageUrl,
      };

      console.log("Creating listing with payload:", payload);
      await createListing(payload);
      alert("Listing created successfully!");
    } catch (error) {
      console.error("Error creating listing:", error);
      setError(error instanceof Error ? error.message : "Failed to create listing");
      alert("There was an error creating the listing. Please try again.");
    } finally {
      setUploading(false);
    }
  };

  return (
    <div className="form-container">
      <h1>Post a New Listing</h1>
      <form onSubmit={handleSubmit}>
        <div>
          <label>Name:</label>
          <input
            type="text"
            name="name"
            value={formData.name}
            onChange={handleChange}
            required
          />
        </div>
        <div>
          <label>Price:</label>
          <input
            type="number"
            name="price"
            value={formData.price}
            onChange={handleChange}
            required
          />
        </div>
        <div>
          <label>Engine:</label>
          <select
            name="engine"
            value={formData.engine}
            onChange={handleChange}
            required
          >
            <option value="">Select Engine</option>
            <option value="V6">V6</option>
            <option value="V8">V8</option>
            <option value="Electric">Electric</option>
            <option value="Hybrid">Hybrid</option>
          </select>
        </div>
        <div>
          <label>Engine Size:</label>
          <input
            type="text"
            name="engineSize"
            value={formData.engineSize}
            onChange={handleChange}
            required
          />
        </div>
        <div>
          <label>Mileage:</label>
          <input
            type="number"
            name="mileage"
            value={formData.mileage}
            onChange={handleChange}
            required
          />
        </div>
        <div>
          <label>Transmission:</label>
          <select
            name="transmission"
            value={formData.transmission}
            onChange={handleChange}
            required
          >
            <option value="">Select Transmission</option>
            <option value="Automatic">Automatic</option>
            <option value="Manual">Manual</option>
            <option value="Semi-Automatic">Semi-Automatic</option>
          </select>
        </div>
        <div>
          <label>Color:</label>
          <input
            type="text"
            name="color"
            value={formData.color}
            onChange={handleChange}
            required
          />
        </div>
        <div>
          <label>Year:</label>
          <input
            type="number"
            name="year"
            value={formData.year}
            onChange={handleChange}
            required
          />
        </div>
        <div>
          <label>Description:</label>
          <textarea
            name="description"
            value={formData.description}
            onChange={handleChange}
            required
          />
        </div>
        <div>
          <label>Upload Image:</label>
          <input type="file" accept="image/*" onChange={handleImageChange} />
        </div>
        <button type="submit" className="post-listing-button" disabled={uploading}>
          {uploading ? (
            <span>
              <div className="spinner"></div> Uploading...
            </span>
          ) : (
            "Post Listing"
          )}
        </button>
        {error && <div className="error">{error}</div>}
      </form>
    </div>
  );
};

export default PostListing;