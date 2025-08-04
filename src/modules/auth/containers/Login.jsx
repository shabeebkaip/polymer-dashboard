import { useState } from "react";
import { Eye, EyeOff } from "lucide-react";
import {
  TextField,
  IconButton,
  InputAdornment,
  CircularProgress,
} from "@mui/material";

import { useNavigate } from "react-router-dom";
import { loginApi } from "../api";
import { enqueueSnackbar } from "notistack";

const Login = () => {
  const [form, setForm] = useState({ email: "", password: "" });
  const [showPassword, setShowPassword] = useState(false);
  const [errors, setErrors] = useState({});
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
    setErrors((prev) => ({ ...prev, [name]: "" }));
  };

  const validate = () => {
    const newErrors = {};
    if (!form.email) {
      newErrors.email = "Email is required";
    } else if (
      !/^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/.test(form.email)
    ) {
      newErrors.email = "Invalid email address";
    }
    if (!form.password) newErrors.password = "Password is required";
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!validate()) return;
    setLoading(true);
    try {
      const res = await loginApi({
        email: form.email,
        password: form.password,
      });
      if (["superAdmin"].includes(res.userInfo.user_type)) {
        localStorage.setItem("token", res.token);
        localStorage.setItem("user", JSON.stringify(res.userInfo));
        enqueueSnackbar("Login Successful", {
          anchorOrigin: { vertical: "top", horizontal: "right" },
          variant: "success",
        });
        navigate("/");
      } else {
        enqueueSnackbar("You are not authorized to access this page", {
          anchorOrigin: { vertical: "top", horizontal: "right" },
          variant: "error",
        });
      }
    } catch (error) {
      const message =
        error?.response?.data?.message || "Invalid Email or Password";
      enqueueSnackbar(message, {
        anchorOrigin: { vertical: "top", horizontal: "right" },
        variant: "error",
      });
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-[url('/assets/authbg.png')] bg-cover bg-center flex items-center justify-center px-4 py-4 relative">
      {/* Background overlay with green tints */}
      <div className="absolute inset-0 bg-gradient-to-br from-green-900/20 via-transparent to-emerald-900/20"></div>
      {/* Decorative blurred circles */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute -top-40 -right-40 w-80 h-80 bg-gradient-to-br from-green-400/10 to-emerald-400/10 rounded-full blur-3xl"></div>
        <div className="absolute -bottom-40 -left-40 w-80 h-80 bg-gradient-to-br from-emerald-400/10 to-green-400/10 rounded-full blur-3xl"></div>
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-96 h-96 bg-gradient-to-br from-green-400/5 to-emerald-400/5 rounded-full blur-3xl"></div>
      </div>
      <div className="relative w-full max-w-md p-6 rounded-3xl shadow-2xl bg-white/90 backdrop-blur-xl border border-white/30 hover:shadow-3xl transition-all duration-300">
        <div className="absolute inset-0 rounded-3xl bg-gradient-to-br from-white/50 to-green-50/20 pointer-events-none"></div>
        <div className="relative z-10 flex flex-col items-center justify-center gap-4 w-full">
          {/* Logo Section */}
          <div className="text-center">
            <img
              src="/typography.svg"
              alt="Logo"
              className="h-10 w-auto cursor-pointer hover:opacity-80 transition-opacity mx-auto"
              onClick={() => navigate("/")}
            />
          </div>
          {/* Header Section */}
          <div className="text-center space-y-1 max-w-md">
            <h1 className="text-2xl font-bold bg-gradient-to-r from-green-600 to-emerald-600 bg-clip-text text-transparent">
              Welcome Back
            </h1>
            <p className="text-gray-600 text-sm">Sign in to your account</p>
          </div>
          {/* Login Form */}
          <form onSubmit={handleSubmit} className="w-full max-w-sm space-y-4">
            <div className="space-y-1">
              <label
                htmlFor="email"
                className="text-sm font-medium text-gray-700"
              >
                Email Address
              </label>
              <TextField
                id="email"
                name="email"
                type="email"
                value={form.email}
                onChange={handleChange}
                required
                placeholder="Enter your email"
                variant="outlined"
                fullWidth
                error={!!errors.email}
                helperText={errors.email}
                InputLabelProps={{ shrink: true }}
                className="w-full px-4 py-2.5 border border-gray-300 rounded-xl focus:ring-2 focus:ring-green-500 focus:border-transparent transition-all duration-200"
              />
            </div>
            <div className="space-y-1">
              <label
                htmlFor="password"
                className="text-sm font-medium text-gray-700"
              >
                Password
              </label>
              <div className="relative">
                <TextField
                  id="password"
                  name="password"
                  autoComplete="off"
                  type={showPassword ? "text" : "password"}
                  value={form.password}
                  onChange={handleChange}
                  required
                  placeholder="Enter your password"
                  variant="outlined"
                  fullWidth
                  error={!!errors.password}
                  helperText={errors.password}
                  InputLabelProps={{ shrink: true }}
                  InputProps={{
                    endAdornment: (
                      <InputAdornment position="end">
                        <IconButton
                          onClick={() => setShowPassword((v) => !v)}
                          edge="end"
                        >
                          {showPassword ? (
                            <EyeOff size={20} className="text-gray-400" />
                          ) : (
                            <Eye size={20} className="text-gray-400" />
                          )}
                        </IconButton>
                      </InputAdornment>
                    ),
                  }}
                  className="w-full px-4 py-2.5 pr-12 border border-gray-300 rounded-xl focus:ring-2 focus:ring-green-500 focus:border-transparent transition-all duration-200"
                />
              </div>
            </div>
            <button
              type="submit"
              disabled={loading || !form.email || !form.password}
              className="w-full px-6 py-2.5 bg-gradient-to-r from-green-600 to-emerald-600 text-white font-medium rounded-xl hover:from-green-700 hover:to-emerald-700 focus:outline-none focus:ring-4 focus:ring-green-300 disabled:opacity-50 disabled:cursor-not-allowed transform hover:scale-[1.02] transition-all duration-200 shadow-lg hover:shadow-xl"
            >
              {loading ? (
                <div className="flex items-center justify-center gap-2">
                  <CircularProgress style={{ color: "#fff" }} size={20} />
                  Signing in...
                </div>
              ) : (
                "Sign In"
              )}
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Login;
