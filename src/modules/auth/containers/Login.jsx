import { useState } from "react";
import { MdOutlineVisibility, MdOutlineVisibilityOff } from "react-icons/md";
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
  const [showPassword, setShowPassword] = useState(false);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [errors, setErrors] = useState({});
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (validate()) {
      try {
        setLoading(true);
        loginApi({ email, password })
          .then((res) => {
            console.log(res.user, "res");
            if (["superAdmin", "seller"].includes(res.userInfo.user_type)) {
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
          })
          .catch((error) => {
            console.log(error, "56");
            enqueueSnackbar("Invalid Email or Password", {
              anchorOrigin: { vertical: "top", horizontal: "right" },
              variant: "error",
            });
            setLoading(false);
          });
      } catch (error) {
        console.log("Invalid Email or Password", "64");
        enqueueSnackbar(error, {
          anchorOrigin: { vertical: "top", horizontal: "right" },
          variant: "error",
        });
      }
    }
  };

  const validate = () => {
    const newErrors = {};
    if (!email) {
      newErrors.email = "Email is required";
    } else {
      const emailPattern = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
      if (!emailPattern.test(email)) {
        newErrors.email = "Invalid email address";
      }
    }
    if (!password) newErrors.password = "Password is required";
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };
  return (
    <div className="flex w-full h-screen">
      <div className="flex-1">
        {/* login part */}
        <div
          style={{
            // backgroundImage: `url(${loginbg})`,
            backgroundSize: "cover",
            backgroundPosition: "center",
            backgroundRepeat: "no-repeat",
            height: "100%",
            position: "relative",
          }}
        >
          <div className="absolute inset-0 flex items-center justify-center">
            <div className="max-w-auto w-[441px] h-[554px] p-6 bg-transparent rounded-lg">
              <div className="flex justify-center mb-6">
                <img src={"/polymer.svg"} alt="Logo" className="w-20" />
              </div>
              <h1 className="mb-8 text-3xl font-medium text-center">
                Welcome Back!!
              </h1>
              <form onSubmit={handleSubmit}>
                <div className="mb-5">
                  <TextField
                    label="Enter Email"
                    type="text"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    variant="outlined"
                    fullWidth
                    error={!!errors.email}
                    helperText={errors.email}
                    onFocus={() => setErrors({ ...errors, email: "" })}
                    InputLabelProps={{
                      shrink: true,
                    }}
                  />
                </div>
                <div className="mb-5">
                  <TextField
                    autoComplete="off"
                    label="Enter Password"
                    type={showPassword ? "text" : "password"}
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    variant="outlined"
                    fullWidth
                    error={!!errors.password}
                    helperText={errors.password}
                    onFocus={() => setErrors({ ...errors, password: "" })}
                    InputLabelProps={{
                      shrink: true,
                    }}
                    slotProps={{
                      input: {
                        endAdornment: (
                          <InputAdornment position="end">
                            <IconButton
                              onClick={() => setShowPassword(!showPassword)}
                              edge="end"
                            >
                              {showPassword ? (
                                <MdOutlineVisibilityOff size={20} />
                              ) : (
                                <MdOutlineVisibility size={20} />
                              )}
                            </IconButton>
                          </InputAdornment>
                        ),
                      },
                    }}
                  />
                </div>

                <button
                  type="submit"
                  className="w-full px-4 py-2 text-white rounded-md bg-[#2952FF] hover:shadow-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
                >
                  {loading ? (
                    <CircularProgress
                      style={{ color: "#ffffff" }}
                      size={"25px"}
                    />
                  ) : (
                    "Login"
                  )}
                </button>
              </form>
            </div>
          </div>
        </div>
      </div>
      <div className="flex-1">
        <div
          style={{
            backgroundImage: `url("/login-img.jpg")`,
            backgroundSize: "cover",
            backgroundRepeat: "no-repeat",
            height: "100%",
            position: "relative",
          }}
        />
      </div>
    </div>
  );
};

export default Login;
