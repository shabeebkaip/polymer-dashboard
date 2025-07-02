// import { useState, useEffect } from "react";
// import { MdOutlineVisibility, MdOutlineVisibilityOff } from "react-icons/md";
// import {
//   TextField,
//   IconButton,
//   InputAdornment,
//   CircularProgress,
//   Button,
//   Typography,
//   Paper,
// } from "@mui/material";
// import { useNavigate, useLocation } from "react-router-dom";
// import { resetPasswordApi } from "../api";
// import { enqueueSnackbar } from "notistack";

// const ResetPassword = () => {
//   const [showPassword, setShowPassword] = useState(false);
//   const [showConfirmPassword, setShowConfirmPassword] = useState(false);
//   const [password, setPassword] = useState("");
//   const [confirmPassword, setConfirmPassword] = useState("");
//   const [errors, setErrors] = useState({});
//   const [loading, setLoading] = useState(false);
//   const navigate = useNavigate();
//   const location = useLocation();
//   const email = location.state?.email;
//   const verified = location.state?.verified;

//   useEffect(() => {
//     if (!email || !verified) {
//       navigate("/forgot-password");
//     }
//   }, [email, verified, navigate]);

//   const handleSubmit = async (e) => {
//     e.preventDefault();
//     if (validate()) {
//       try {
//         setLoading(true);
//         const response = await resetPasswordApi({ 
//           email, 
//           password 
//         });
        
//         if (response.status) {
//           enqueueSnackbar(response.message, {
//             anchorOrigin: { vertical: "top", horizontal: "right" },
//             variant: "success",
//           });
          
//           // Navigate to login page
//           navigate("/login");
//         }
//       } catch (error) {
//         const message = error?.response?.data?.message || "Failed to reset password";
//         enqueueSnackbar(message, {
//           anchorOrigin: { vertical: "top", horizontal: "right" },
//           variant: "error",
//         });
//       } finally {
//         setLoading(false);
//       }
//     }
//   };

//   const validate = () => {
//     const newErrors = {};
    
//     if (!password) {
//       newErrors.password = "Password is required";
//     } else if (password.length < 6) {
//       newErrors.password = "Password must be at least 6 characters";
//     }
    
//     if (!confirmPassword) {
//       newErrors.confirmPassword = "Confirm password is required";
//     } else if (password !== confirmPassword) {
//       newErrors.confirmPassword = "Passwords do not match";
//     }
    
//     setErrors(newErrors);
//     return Object.keys(newErrors).length === 0;
//   };

//   return (
//     <div className="flex w-full h-screen">
//       <div className="flex-1">
//         <div
//           style={{
//             backgroundSize: "cover",
//             backgroundPosition: "center",
//             backgroundRepeat: "no-repeat",
//             height: "100%",
//             position: "relative",
//           }}
//         >
//           <div className="absolute inset-0 flex items-center justify-center">
//             <Paper className="max-w-auto w-[441px] p-8 bg-white rounded-lg shadow-lg">
//               <div className="flex justify-center mb-6">
//                 <img src={"/polymer.svg"} alt="Logo" className="w-20" />
//               </div>
              
//               <Typography variant="h4" className="mb-2 font-medium text-center">
//                 Reset Password
//               </Typography>
              
//               <Typography variant="body2" className="mb-6 text-center text-gray-600">
//                 Enter your new password for <strong>{email}</strong>
//               </Typography>

//               <form onSubmit={handleSubmit}>
//                 <div className="mb-5">
//                   <TextField
//                     autoComplete="new-password"
//                     label="New Password"
//                     type={showPassword ? "text" : "password"}
//                     value={password}
//                     onChange={(e) => setPassword(e.target.value)}
//                     variant="outlined"
//                     fullWidth
//                     error={!!errors.password}
//                     helperText={errors.password}
//                     onFocus={() => setErrors({ ...errors, password: "" })}
//                     InputLabelProps={{
//                       shrink: true,
//                     }}
//                     InputProps={{
//                       endAdornment: (
//                         <InputAdornment position="end">
//                           <IconButton
//                             onClick={() => setShowPassword(!showPassword)}
//                             edge="end"
//                           >
//                             {showPassword ? (
//                               <MdOutlineVisibilityOff size={20} />
//                             ) : (
//                               <MdOutlineVisibility size={20} />
//                             )}
//                           </IconButton>
//                         </InputAdornment>
//                       ),
//                     }}
//                   />
//                 </div>

//                 <div className="mb-6">
//                   <TextField
//                     autoComplete="new-password"
//                     label="Confirm New Password"
//                     type={showConfirmPassword ? "text" : "password"}
//                     value={confirmPassword}
//                     onChange={(e) => setConfirmPassword(e.target.value)}
//                     variant="outlined"
//                     fullWidth
//                     error={!!errors.confirmPassword}
//                     helperText={errors.confirmPassword}
//                     onFocus={() => setErrors({ ...errors, confirmPassword: "" })}
//                     InputLabelProps={{
//                       shrink: true,
//                     }}
//                     InputProps={{
//                       endAdornment: (
//                         <InputAdornment position="end">
//                           <IconButton
//                             onClick={() => setShowConfirmPassword(!showConfirmPassword)}
//                             edge="end"
//                           >
//                             {showConfirmPassword ? (
//                               <MdOutlineVisibilityOff size={20} />
//                             ) : (
//                               <MdOutlineVisibility size={20} />
//                             )}
//                           </IconButton>
//                         </InputAdornment>
//                       ),
//                     }}
//                   />
//                 </div>

//                 <Button
//                   type="submit"
//                   variant="contained"
//                   fullWidth
//                   disabled={loading}
//                   className="mb-4 py-3 bg-[#2952FF] hover:bg-[#1e3dd9]"
//                   style={{
//                     backgroundColor: loading ? "#ccc" : "#2952FF",
//                     color: "white",
//                     padding: "12px",
//                   }}
//                 >
//                   {loading ? (
//                     <CircularProgress size={24} style={{ color: "white" }} />
//                   ) : (
//                     "Reset Password"
//                   )}
//                 </Button>

//                 <div className="text-center">
//                   <Button
//                     onClick={() => navigate("/login")}
//                     variant="text"
//                     className="text-[#2952FF]"
//                   >
//                     Back to Login
//                   </Button>
//                 </div>
//               </form>
//             </Paper>
//           </div>
//         </div>
//       </div>
      
//       <div className="flex-1">
//         <div
//           style={{
//             backgroundImage: `url("/login-img.jpg")`,
//             backgroundSize: "cover",
//             backgroundRepeat: "no-repeat",
//             height: "100%",
//             position: "relative",
//           }}
//         />
//       </div>
//     </div>
//   );
// };

// export default ResetPassword;