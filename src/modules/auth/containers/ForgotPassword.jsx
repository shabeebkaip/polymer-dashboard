// import { useState } from "react";
// import {
//   TextField,
//   CircularProgress,
//   Button,
//   Typography,
//   Box,
//   Paper,
// } from "@mui/material";
// import { useNavigate } from "react-router-dom";
// import { forgotPasswordApi } from "../api";
// import { enqueueSnackbar } from "notistack";

// const ForgotPassword = () => {
//   const [email, setEmail] = useState("");
//   const [errors, setErrors] = useState({});
//   const [loading, setLoading] = useState(false);
//   const navigate = useNavigate();

//   const handleSubmit = async (e) => {
//     e.preventDefault();
//     if (validate()) {
//       try {
//         setLoading(true);
//         const response = await forgotPasswordApi({ email });
        
//         if (response.status) {
//           enqueueSnackbar(response.message, {
//             anchorOrigin: { vertical: "top", horizontal: "right" },
//             variant: "success",
//           });
          
//           // Navigate to OTP verification page with email
//           navigate("/verify-otp", { state: { email } });
//         }
//       } catch (error) {
//         const message = error?.response?.data?.message || "Failed to send OTP";
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
//     if (!email) {
//       newErrors.email = "Email is required";
//     } else {
//       const emailPattern = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
//       if (!emailPattern.test(email)) {
//         newErrors.email = "Invalid email address";
//       }
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
//                 Forgot Password?
//               </Typography>
              
//               <Typography variant="body2" className="mb-6 text-center text-gray-600">
//                 Enter your email address and we'll send you an OTP to reset your password.
//               </Typography>

//               <form onSubmit={handleSubmit}>
//                 <div className="mb-6">
//                   <TextField
//                     label="Enter Email"
//                     type="email"
//                     value={email}
//                     onChange={(e) => setEmail(e.target.value)}
//                     variant="outlined"
//                     fullWidth
//                     error={!!errors.email}
//                     helperText={errors.email}
//                     onFocus={() => setErrors({ ...errors, email: "" })}
//                     InputLabelProps={{
//                       shrink: true,
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
//                     "Send OTP"
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

// export default ForgotPassword;