import { useState } from "react";
import { MdOutlineVisibility, MdOutlineVisibilityOff } from "react-icons/md";
import {
  TextField,
  IconButton,
  InputAdornment,
  CircularProgress,
} from "@mui/material";
import loginBanner from "../../../assets/1728384308140.jpg";
import logo from "../../../assets/btc_networks_logo.jpg";

import { useNavigate } from "react-router-dom";
import { loginApi } from "../api";
import { createLogApi } from "../../Logs/api";
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
            if (res.status) {
              localStorage.setItem("token", res.token);
              localStorage.setItem("user", JSON.stringify(res.user));
              enqueueSnackbar("Logged In Successfully", {
                anchorOrigin: { vertical: "top", horizontal: "right" },
                variant: "success",
              });
              createLogApi({
                user_name: res.user.username,
                activity: "Logged in",
              }).then((response) => {
                console.log(response);
                navigate("/");
              });
            } else {
              enqueueSnackbar(res.message, {
                anchorOrigin: { vertical: "top", horizontal: "right" },
                variant: "error",
              });
              setLoading(false);
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
                <img src={logo} alt="Logo" />
              </div>
              <h1 className="mb-8 text-3xl font-medium">
                Manage your employees!
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
                  className="w-full px-4 py-2 text-white bg-[#00aeaa] rounded-md hover:shadow-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
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
                <p className="mt-2">
                  Dont have an Account ?{" "}
                  <a href="/signup" className="text-blue-700">
                    Register
                  </a>{" "}
                </p>
              </form>
            </div>
          </div>
        </div>
      </div>
      <div className="flex-1">
        <div
          style={{
            backgroundImage: `url(${loginBanner})`,
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
