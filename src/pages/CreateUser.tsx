import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import api from "../services/api";
import { validateUser } from "../utils/validateUser";

const CreateUser: React.FC = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    firstname: "",
    lastname: "",
    email: "",
    birthDate: "",
    password: "",
    confirmPassword: "",
  });
  const [errors, setErrors] = useState<{ [key: string]: string }>({});
  const [apiErrors, setApiErrors] = useState("");
  const [loading, setLoading] = useState(false);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const validationErrors = validateUser(formData, false);
    if (Object.keys(validationErrors).length > 0) {
      setErrors(validationErrors);
      return;
    }
    setLoading(true);
    try {
      await api.post("/users", {
        firstname: formData.firstname,
        lastname: formData.lastname,
        email: formData.email,
        birthDate: formData.birthDate,
        password: formData.password,
      });
      navigate("/dashboard");
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
    } catch (err: any) {
      if (err.response?.data?.message) {
        setApiErrors(err.response.data.message);
      } else if (err.response?.data?.error[0]?.message) {
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

  return (
    <div className="h-screen w-screen bg-gradient-to-r from-[#ba8d37] to-[#018b98] flex justify-center items-center">
      <div className="w-full max-w-lg bg-white rounded-2xl shadow-lg p-8">
        <h2 className="text-2xl font-bold text-[#018b98] mb-6 text-center">
          Add User
        </h2>
        <form onSubmit={handleSubmit}>
          <div className="mb-4">
            <label
              htmlFor="firstname"
              className="block text-sm font-medium text-gray-700"
            >
              Firstname
            </label>
            <input
              type="text"
              id="firstname"
              name="firstname"
              value={formData.firstname}
              onChange={handleChange}
              required
              className="bg-white text-black mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:ring-[#ba8d37] focus:border-[#ba8d37] sm:text-sm"
            />
            {errors.firstname && (
              <p className="text-red-500 text-sm">{errors.firstname}</p>
            )}
          </div>

          <div className="mb-4">
            <label
              htmlFor="lastname"
              className="block text-sm font-medium text-gray-700"
            >
              Lastname
            </label>
            <input
              type="text"
              id="lastname"
              name="lastname"
              value={formData.lastname}
              onChange={handleChange}
              required
              className="bg-white text-black mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:ring-[#ba8d37] focus:border-[#ba8d37] sm:text-sm"
            />
            {errors.lastname && (
              <p className="text-red-500 text-sm">{errors.lastname}</p>
            )}
          </div>

          <div className="mb-4">
            <label
              htmlFor="email"
              className="block text-sm font-medium text-gray-700"
            >
              Email
            </label>
            <input
              type="email"
              id="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              required
              className="bg-white text-black mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:ring-[#ba8d37] focus:border-[#ba8d37] sm:text-sm"
            />
            {errors.email && (
              <p className="text-red-500 text-sm">{errors.email}</p>
            )}
          </div>

          <div className="mb-4">
            <label
              htmlFor="birthDate"
              className="block text-sm font-medium text-gray-700"
            >
              Date of birth
            </label>
            <input
              type="date"
              id="birthDate"
              name="birthDate"
              value={formData.birthDate}
              onChange={handleChange}
              required
              className="bg-white text-black mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:ring-[#ba8d37] focus:border-[#ba8d37] sm:text-sm"
            />
            {errors.birthDate && (
              <p className="text-red-500 text-sm">{errors.birthDate}</p>
            )}
          </div>

          <div className="mb-4">
            <label
              htmlFor="password"
              className="block text-sm font-medium text-gray-700"
            >
              Password
            </label>
            <input
              type="password"
              id="password"
              name="password"
              value={formData.password}
              onChange={handleChange}
              required
              className="bg-white text-black mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:ring-[#ba8d37] focus:border-[#ba8d37] sm:text-sm"
            />
            {errors.password && (
              <p className="text-red-500 text-sm">{errors.password}</p>
            )}
          </div>

          <div className="mb-4">
            <label
              htmlFor="confirmPassword"
              className="block text-sm font-medium text-gray-700"
            >
              Confirm Password
            </label>
            <input
              type="password"
              id="confirmPassword"
              name="confirmPassword"
              value={formData.confirmPassword}
              onChange={handleChange}
              required
              className="bg-white text-black mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:ring-[#ba8d37] focus:border-[#ba8d37] sm:text-sm"
            />
            {errors.confirmPassword && (
              <p className="text-red-500 text-sm">{errors.confirmPassword}</p>
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
              {loading ? "Creating..." : "Create User"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default CreateUser;
