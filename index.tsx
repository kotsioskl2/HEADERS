import React, { useState, useEffect } from "react";
import { fetchListings } from "./supabaseUtils"; // Import the Supabase fetch function
import Link from "next/link";

interface Listing {
  id: string;
  name: string;
  price: number;
  engine: string;
  engineSize: number;
  mileage: number;
  transmission: string;
  color: string;
  year: number;
  description: string;
  image: string;
}

const Home = () => {
  const [listings, setListings] = useState<Listing[]>([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [filterEngine, setFilterEngine] = useState("All");
  const [filterYear, setFilterYear] = useState("All");
  const [filterPrice, setFilterPrice] = useState<[number, number]>([0, 50000]); // Price range
  const [filterMileage, setFilterMileage] = useState<[number, number]>([0, 1000000]); // Mileage range
  const [filterTransmission, setFilterTransmission] = useState("All");
  const [filterColor, setFilterColor] = useState("All");
  const [filterEngineSize, setFilterEngineSize] = useState<[number, number]>([1.0, 8.0]); // Engine size range

  // Fetch listings from Supabase
  useEffect(() => {
    const getListings = async () => {
      try {
        const data = await fetchListings(); // Call the fetchListings function
        if (data) {
          setListings(data);
        }
      } catch (error) {
        console.error("Error fetching listings:", error.message);
      }
    };
    getListings();
  }, []);

  const filteredListings = listings.filter((listing) => {
    return (
      (searchTerm === "" ||
        listing.name.toLowerCase().includes(searchTerm.toLowerCase())) &&
      (filterEngine === "All" || listing.engine === filterEngine) &&
      (filterYear === "All" || listing.year === parseInt(filterYear)) &&
      listing.price >= filterPrice[0] &&
      listing.price <= filterPrice[1] &&
      listing.mileage >= filterMileage[0] &&
      listing.mileage <= filterMileage[1] &&
      listing.engineSize >= filterEngineSize[0] &&
      listing.engineSize <= filterEngineSize[1] &&
      (filterTransmission === "All" ||
        listing.transmission === filterTransmission) &&
      (filterColor === "All" || listing.color === filterColor)
    );
  });

  return (
    <div>
      {/* Navigation Bar */}
      <nav className="nav-bar">
        <div className="nav-logo">Headers Emulation</div>
        <div className="nav-links">
          <Link href="/" className="nav-button">
            Home
          </Link>
          <Link href="/admin" className="nav-button">
            Admin Dashboard
          </Link>
        </div>
      </nav>

      <header>
        <h1>Welcome to Headers Emulation 🚗</h1>
        <p>Find or post your perfect vehicle!</p>
      </header>

      {/* Filters Section */}
      <div className="filters">
        <input
          type="text"
          placeholder="Search listings..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
        />
        <select
          value={filterEngine}
          onChange={(e) => setFilterEngine(e.target.value)}
        >
          <option value="All">All Engines</option>
          <option value="V6">V6</option>
          <option value="V8">V8</option>
          <option value="Electric">Electric</option>
          <option value="Hybrid">Hybrid</option>
        </select>
        <select
          value={filterYear}
          onChange={(e) => setFilterYear(e.target.value)}
        >
          <option value="All">All Years</option>
          <option value="2020">2020</option>
          <option value="2021">2021</option>
          <option value="2022">2022</option>
        </select>
        <div className="range-filter">
          <label>Price Range (€)</label>
          <input
            type="number"
            value={filterPrice[0]}
            onChange={(e) =>
              setFilterPrice([Number(e.target.value), filterPrice[1]])
            }
          />
          <input
            type="number"
            value={filterPrice[1]}
            onChange={(e) =>
              setFilterPrice([filterPrice[0], Number(e.target.value)])
            }
          />
          <p>
            €{filterPrice[0]} - €{filterPrice[1]}
          </p>
        </div>
        <div className="range-filter">
          <label>Mileage Range (km)</label>
          <input
            type="number"
            value={filterMileage[0]}
            onChange={(e) =>
              setFilterMileage([Number(e.target.value), filterMileage[1]])
            }
          />
          <input
            type="number"
            value={filterMileage[1]}
            onChange={(e) =>
              setFilterMileage([filterMileage[0], Number(e.target.value)])
            }
          />
          <p>
            {filterMileage[0]} km - {filterMileage[1]} km
          </p>
        </div>
        <div className="range-filter">
          <label>Engine Size (Liters)</label>
          <input
            type="number"
            step="0.1"
            value={filterEngineSize[0]}
            onChange={(e) =>
              setFilterEngineSize([Number(e.target.value), filterEngineSize[1]])
            }
          />
          <input
            type="number"
            step="0.1"
            value={filterEngineSize[1]}
            onChange={(e) =>
              setFilterEngineSize([filterEngineSize[0], Number(e.target.value)])
            }
          />
          <p>
            {filterEngineSize[0]}L - {filterEngineSize[1]}L
          </p>
        </div>
        <select
          value={filterTransmission}
          onChange={(e) => setFilterTransmission(e.target.value)}
        >
          <option value="All">All Transmissions</option>
          <option value="Automatic">Automatic</option>
          <option value="Manual">Manual</option>
          <option value="Semi-Automatic">Semi-Automatic</option>
        </select>
        <select
          value={filterColor}
          onChange={(e) => setFilterColor(e.target.value)}
        >
          <option value="All">All Colors</option>
          <option value="Red">Red</option>
          <option value="Blue">Blue</option>
          <option value="Black">Black</option>
        </select>
      </div>

      {/* Link to Post Listing Page */}
      <Link href="/PostListing">
        <button className="add-listing-button">+ Post a Listing</button>
      </Link>

      <div className="grid">
        {filteredListings.map((listing) => (
          <div key={listing.id} className="card">
            <div className="content">
              <h3>{listing.name}</h3>
              <p>Price: €{listing.price}</p>
              <p>Engine: {listing.engine}</p>
              <p>Engine Size: {listing.engineSize}L</p>
              <p>Mileage: {listing.mileage} km</p>
              <p>Transmission: {listing.transmission}</p>
              <p>Color: {listing.color}</p>
              <p>Year: {listing.year}</p>
              <p>Description: {listing.description}</p>
              <img src={listing.image} alt={listing.name} />
              <Link href={`/listing/${listing.id}`}>
                <a>View Details</a>
              </Link>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Home;
