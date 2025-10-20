import { useState } from "react";
import useAuthService from "@/services/auth";
import type { LoginValues } from "@/types/auth";

const useAuth = () => {
  const { login, logout, register } = useAuthService();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleLogin = async (values: LoginValues) => {
    setLoading(true);
    setError(null);
    try {
      const res = await login(values);
      return res.data;
    } catch (err: any) {
      setError(err.message || "Login failed");
      throw err;
    } finally {
      setLoading(false);
    }
  };

  const handleRegister = async (values: LoginValues) => {
    setLoading(true);
    setError(null);
    try {
      const res = await register(values);
      return res.data;
    } catch (err: any) {
      setError(err.message || "Registration failed");
      throw err;
    } finally {
      setLoading(false);
    }
  };

  const handleLogout = async () => {
    setLoading(true);
    try {
      await logout();
    } finally {
      setLoading(false);
    }
  };

  return { handleLogin, handleRegister, handleLogout, loading, error };
};

export default useAuth;
