import React, { useState } from "react";
import api from "../services/api";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

interface LoginFormData {
  email: string;
  password: string;
}

const AuthForm: React.FC = () => {
  const navigate = useNavigate();
  const { login } = useAuth();

  const [formData, setFormData] = useState<LoginFormData>({
    email: "",
    password: "",
  });

  const [errors, setErrors] = useState<Partial<LoginFormData>>({});
  const [apiErrors, setApiErrors] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);

  const validate = () => {
    const newErrors: Partial<LoginFormData> = {};
    if (!formData.email) {
      newErrors.email = "Email is required";
    } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
      newErrors.email = "Please enter a valid email";
    }

    if (!formData.password) {
      newErrors.password = "Password is required";
    } else if (formData.password.length < 8) {
      newErrors.password = "Password must be at least 8 characters";
    }
    return newErrors;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setApiErrors(null);
    const validationErrors = validate();
    if (Object.keys(validationErrors).length > 0) {
      setErrors(validationErrors);
      return;
    }

    setErrors({});
    setLoading(true);

    try {
      const res = await api.post("/login", formData);
      const token = res.data.token;
      login(token);
      navigate("/dashboard");
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
    } catch (err: any) {
      if (err.response?.data?.message) {
        setApiErrors(err.response.data.message);
      } else {
        setApiErrors("An unexpected error occurred.");
      }
    } finally {
      setLoading(false);
    }
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  return (
    <div className="h-screen w-screen bg-gradient-to-r from-[#ba8d37] to-[#018b98] flex justify-center items-center">
      <div className="bg-white p-8 rounded-lg shadow-lg max-w-sm w-full">
        <h2 className="text-2xl font-semibold text-center text-[#018b98]">
          Login
        </h2>
        <form onSubmit={handleSubmit} className="mt-4 rounded">
          <div>
            <label
              htmlFor="email"
              className="block text-sm font-medium text-gray-700"
            >
              Email
            </label>
            <input
              type="email"
              name="email"
              className="w-full p-2 border border-gray-300 rounded-md bg-white text-gray-800"
              value={formData.email}
              onChange={handleChange}
              required
            />
            {errors.email && (
              <p className="text-red-500 text-center">{errors.email}</p>
            )}
          </div>

          <div>
            <label
              htmlFor="password"
              className="block text-sm font-medium text-gray-700"
            >
              Password
            </label>
            <input
              type="password"
              name="password"
              className="w-full p-2 border border-gray-300 rounded-md bg-white text-gray-800"
              value={formData.password}
              onChange={handleChange}
              required
            />
            {errors.password && (
              <p className="text-red-500 text-sm mt-1">{errors.password}</p>
            )}
          </div>

          {apiErrors && (
            <div className="mb-4 text-sm text-red-600 bg-red-100 border border-red-300 rounded p-2">
              {apiErrors}
            </div>
          )}

          <button
            type="submit"
            className="w-full mt-6 py-2 bg-[#ba8d37] text-white rounded-lg hover:bg-[#018b98] focus:outline-none"
            disabled={loading}
          >
            {loading ? "Logging in..." : "Login"}
          </button>
        </form>
      </div>
    </div>
  );
};

export default AuthForm;
