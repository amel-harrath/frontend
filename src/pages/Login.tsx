import React, { useEffect } from "react";
import AuthForm from "../components/AuthForm";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

const Login: React.FC = () => {

    const { isAuthenticated } = useAuth();
  const navigate = useNavigate();

  // Redirect to dashboard if user is already authenticated
  useEffect(() => {
    if (isAuthenticated) {
      navigate("/dashboard");
    }
  }, [isAuthenticated, navigate]);
  return (
    <div>
      <AuthForm />
    </div>
  );
};

export default Login;
