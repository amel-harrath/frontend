import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import api from "../services/api";
import UserTable, { User } from "../components/UserTable";

const PAGE_SIZE = 10;

const Dashboard: React.FC = () => {
  const navigate = useNavigate();
  const [users, setUsers] = useState<User[]>([]);
  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(0);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState("");
  const [sortBy, setSortBy] = useState("");
  const [sortOrder, setSortOrder] = useState<"asc" | "desc">("asc");

  const fetchUsers = async () => {
    setLoading(true);
    try {
      const params = {
        page, limit:
        PAGE_SIZE,
        search: searchTerm ||undefined,
        sortBy: sortBy||'createdAt',
        sortOrder: sortOrder ||'desc'
      }
      const res = await api.get("/users", {
        params: params,
      });
      setUsers(res.data.data);
      setTotalPages(res.data.totalPages);
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchUsers();
  }, [page, searchTerm, sortBy, sortOrder]);

  const handleDelete = async (userId: string) => {
    try {
      await api.delete(`/users/${userId}`);
      fetchUsers();
    } catch (err) {
      console.error("Error deleting user:", err);
    }
  };

  return (
    <div className="bg-gradient-to-r from-[#ba8d37] to-[#018b98]  justify-start items-center px-4 py-8">
      <div className="w-full max-w-7xl h-full">
        <h1 className="text-2xl font-semibold text-white mb-6">Dashboard</h1>

        <div className="flex flex-col md:flex-row justify-between items-center gap-4 mb-6">
          <div className="flex flex-wrap gap-3 items-center w-full md:w-auto">
            <input
              type="text"
              placeholder="Search by name or email"
              className="bg-white text-black px-3 py-2 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-[#ba8d37] text-sm"
              value={searchTerm}
              onChange={(e) => {
                setPage(1);
                setSearchTerm(e.target.value);
              }}
            />

            <select
              className="text-gray-400 px-3 py-2 rounded-lg border border-gray-300 text-sm bg-white focus:outline-none focus:ring-2 focus:ring-[#ba8d37]"
              value={sortBy}
              onChange={(e) => {
                setPage(1);
                setSortBy(e.target.value);
              }}
            >
              <option value="">Sort By</option>
              <option value="email">Email</option>
              <option value="birthDate">Date of Birth</option>
              <option value="createdAt">Created</option>
              <option value="updatedAt">Last updated</option>
            </select>

            <select
              className="text-gray-400 px-3 py-2 rounded-lg border border-gray-300 text-sm bg-white focus:outline-none focus:ring-2 focus:ring-[#ba8d37]"
              value={sortOrder}
              onChange={(e) => {
                setPage(1);
                setSortOrder(e.target.value as "asc" | "desc");
              }}
            >
              <option value="asc">Asc</option>
              <option value="desc">Desc</option>
            </select>
          </div>

          <button
            className="px-4 py-2 bg-[#ba8d37] text-white rounded hover:bg-[#a7762f]"
            onClick={() => navigate("/create-user")}
          >
            Add User
          </button>
        </div>

        {loading ? (
          <p className="mt-4">Loading...</p>
        ) : (
          <>
            <div className="w-full h-screen">
              <UserTable users={users} onDelete={handleDelete} />
            </div>

            <div className="flex items-center justify-center gap-4 text-white">
              <button
                disabled={page === 1}
                onClick={() => setPage((p) => p - 1)}
                className="px-4 py-2 bg-gray-300 border border-gray-300 rounded disabled:opacity-50 hover:bg-[#018b98]"
              >
                Previous
              </button>
              <span className="text-sm font-medium text-gray-800">
                Page {page} of {totalPages}
              </span>
              <button
                disabled={page === totalPages}
                onClick={() => setPage((p) => p + 1)}
                className="px-4 py-2 bg-gray-300 border border-gray-300 rounded disabled:opacity-50 hover:bg-[#018b98]"
              >
                Next
              </button>
            </div>
          </>
        )}
      </div>
    </div>
  );
};

export default Dashboard;
