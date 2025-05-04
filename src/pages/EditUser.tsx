import React, { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import api from "../services/api";
import { validateUser } from "../utils/validateUser";

const EditUser: React.FC = () => {
  const navigate = useNavigate();
  const { id } = useParams<{ id: string }>();
  const [user, setUser] = useState({
    email: "",
    firstname: "",
    lastname: "",
    birthDate: "",
    password: "",
    confirmPassword: "",
  });
  const [loading, setLoading] = useState(true);
  const [apiErrors, setApiErrors] = useState<string | null>(null);
  const [errors, setErrors] = useState<{ [key: string]: string }>({});

  useEffect(() => {
    const fetchUser = async () => {
      try {
        const res = await api.get(`/users/${id}`);
        setUser(res.data);
        setLoading(false);
      } catch (err) {
        console.error("Error fetching user data:", err);
      } finally {
        setLoading(false);
      }
    };

    fetchUser();
  }, [id]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setUser((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setApiErrors(null);
    const validationErrors = validateUser(user, true);
    if (Object.keys(validationErrors).length > 0) {
      setErrors(validationErrors);
      return;
    }
    try {
      setLoading(true);
      await api.put(`/users/${id}`, {
        firstname: user.firstname,
        lastname: user.lastname,
        email: user.email,
        birthDate: user.birthDate,
      });
      navigate("/dashboard");
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
    } catch (err: any) {
      if (err.response?.data?.message) {
        setApiErrors(err.response.data.message);
      } else {
        setApiErrors("An unexpected error occurred. Please try again.");
      }
    } finally {
      setLoading(false);
    }
  };

  const handleCancel = () => {
    navigate("/dashboard"); // Navigate back to dashboard
  };

  if (loading) {
    return <p>Loading...</p>;
  }

  return (
    <div className="min-h-screen w-full bg-gradient-to-r from-[#ba8d37] to-[#018b98] flex items-center justify-center px-4 py-8">
      <div className="bg-white p-8 rounded-2xl shadow-lg w-full max-w-md">
        <h2 className="text-2xl font-bold text-[#018b98] mb-6 text-center">
          Edit User
        </h2>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label
              htmlFor="email"
              className="block text-sm font-medium mb-1 text-gray-700"
            >
              Email
            </label>
            <input
              type="email"
              id="email"
              name="email"
              value={user.email}
              onChange={handleChange}
              className=" bg-white text-black w-full border border-gray-300 rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-[#018b98]"
              required
            />
            {errors.email && (
              <p className="text-red-500 text-sm">{errors.email}</p>
            )}
          </div>

          <div>
            <label
              htmlFor="firstname"
              className="block text-sm font-medium mb-1 text-gray-700"
            >
              Firstname
            </label>
            <input
              type="text"
              id="firstname"
              name="firstname"
              value={user.firstname}
              onChange={handleChange}
              className=" bg-white text-black w-full border border-gray-300 rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-[#018b98]"
              required
            />
            {errors.firstname && (
              <p className="text-red-500 text-sm">{errors.firstname}</p>
            )}
          </div>

          <div>
            <label
              htmlFor="lastname"
              className="block text-sm font-medium mb-1 text-gray-700"
            >
              Lastname
            </label>
            <input
              type="text"
              id="lastname"
              name="lastname"
              value={user.lastname}
              onChange={handleChange}
              className=" bg-white text-black w-full border border-gray-300 rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-[#018b98]"
              required
            />
            {errors.lastname && (
              <p className="text-red-500 text-sm">{errors.lastname}</p>
            )}
          </div>

          <div>
            <label
              htmlFor="birthDate"
              className="block text-sm font-medium mb-1 text-gray-700"
            >
              Date of birth
            </label>
            <input
              type="date"
              id="birthDate"
              name="birthDate"
              value={user.birthDate}
              onChange={handleChange}
              className=" bg-white text-black w-full border border-gray-300 rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-[#018b98]"
              required
            />
            {errors.birthDate && (
              <p className="text-red-500 text-sm">{errors.birthDate}</p>
            )}
          </div>

          {apiErrors && (
            <div className="mb-4 text-sm text-red-600 bg-red-100 border border-red-300 rounded p-2">
              {apiErrors}
            </div>
          )}
          <div className="flex justify-between space-x-4">
            <button
              type="button"
              onClick={handleCancel}
              className="w-full px-4 py-2 bg-gray-300 text-black rounded hover:bg-gray-400 focus:outline-none"
            >
              Cancel
            </button>
            <button
              type="submit"
              disabled={loading}
              className="w-full px-4 py-2 bg-[#ba8d37] text-white rounded hover:bg-[#a7762f] focus:outline-none"
            >
              {loading ? "Updating..." : "Update User"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default EditUser;
