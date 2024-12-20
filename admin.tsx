import React, { useState, useEffect } from "react";
import { FaCar, FaUsers, FaTrash, FaEdit } from "react-icons/fa";
import { fetchListings, fetchUsers, deleteListing, deleteUser } from "./supabaseUtils";
import Link from "next/link";
import { useRouter } from "next/router";
import { useAuth } from "./AuthContext";

interface Listing {
  id: string;
  name: string;
  price: number;
  created_at: string;
}

interface User {
  id: string;
  email: string;
  role: string;
  created_at: string;
}

const ITEMS_PER_PAGE = 10;

const AdminDashboard = () => {
  const [listings, setListings] = useState<Listing[]>([]);
  const [users, setUsers] = useState<User[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [page, setPage] = useState(1);
  const [search, setSearch] = useState("");
  const { user, isAdmin } = useAuth();
  const router = useRouter();

  useEffect(() => {
    if (user === null) {
      // User state is still loading
      return;
    }

    if (!isAdmin) {
      router.push("/");
      return;
    }

    const fetchData = async () => {
      setLoading(true);
      try {
        const [fetchedListings, fetchedUsers] = await Promise.all([
          fetchListings(),
          fetchUsers()
        ]);
        setListings(fetchedListings);
        setUsers(fetchedUsers);
      } catch (err) {
        setError("Failed to load data. Please try again.");
        console.error("Error fetching data:", err);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [user, isAdmin, router]);

  const handleDelete = async (type: 'listing' | 'user', id: string) => {
    if (!window.confirm(`Are you sure you want to delete this ${type}?`)) {
      return;
    }

    try {
      if (type === 'listing') {
        await deleteListing(id);
        setListings(listings.filter(item => item.id !== id));
      } else {
        await deleteUser(id);
        setUsers(users.filter(item => item.id !== id));
      }
    } catch (err) {
      setError(`Failed to delete ${type}. Please try again.`);
      console.error(`Error deleting ${type}:`, err);
    }
  };

  if (loading) return <div>Loading...</div>;
  if (error) return <div>Error: {error}</div>;
  if (!isAdmin) return null;

  return (
    <div className="admin-dashboard">
      <h1>Admin Dashboard</h1>
      
      <div className="search-bar">
        <input
          type="text"
          placeholder="Search..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
        />
      </div>

      <div className="dashboard-section">
        <h2><FaCar /> Listings</h2>
        <div className="table-container">
          {/* Table implementation */}
        </div>
      </div>

      <div className="dashboard-section">
        <h2><FaUsers /> Users</h2>
        {users.length === 0 ? (
          <p>No users found.</p>
        ) : (
          <div className="user-list">
            {users.map((user) => (
              <div key={user.id} className="user-item">
                <h3 className="text-lg font-bold">{user.email}</h3>
                <p>Role: {user.role}</p>
                <div className="flex gap-2 mt-2">
                  <button className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-700">
                    <FaEdit /> Edit
                  </button>
                  <button
                    onClick={() => handleDelete('user', user.id)}
                    className="bg-red-500 text-white px-4 py-2 rounded hover:bg-red-700"
                  >
                    <FaTrash /> Delete
                  </button>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default AdminDashboard;
