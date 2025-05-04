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

  const fetchUsers = async (page: number) => {
    setLoading(true);
    try {
      const res = await api.get("/users", {
        params: { page, limit: PAGE_SIZE },
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
    fetchUsers(page);
  }, [page]);

  const handleDelete = async (userId: string) => {
    try {
      await api.delete(`/users/${userId}`);
      fetchUsers(page);
    } catch (err) {
      console.error("Error deleting user:", err);
    }
  };

  return (
    <div className="bg-gradient-to-r from-[#ba8d37] to-[#018b98]  justify-start items-center px-4 py-8">
      <div className="w-full max-w-7xl h-full">
        <h1 className="text-2xl font-semibold text-white mb-6">Dashboard</h1>
        <div className="flex justify-end mb-6">
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
