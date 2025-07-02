// import { useState, useEffect } from "react";
// import {
//   TextField,
//   CircularProgress,
//   Button,
//   Typography,
//   Paper,
// } from "@mui/material";
// import { useNavigate, useLocation } from "react-router-dom";
// import { verifyOtpApi, forgotPasswordApi } from "../api";
// import { enqueueSnackbar } from "notistack";

// const VerifyOTP = () => {
//   const [otp, setOtp] = useState("");
//   const [errors, setErrors] = useState({});
//   const [loading, setLoading] = useState(false);
//   const [resendLoading, setResendLoading] = useState(false);
//   const [timer, setTimer] = useState(300); // 5 minutes
//   const navigate = useNavigate();
//   const location = useLocation();
//   const email = location.state?.email;

//   useEffect(() => {
//     if (!email) {
//       navigate("/forgot-password");
//       return;
//     }

//     const interval = setInterval(() => {
//       setTimer((prev) => {
//         if (prev <= 1) {
//           clearInterval(interval);
//           return 0;
//         }
//         return prev - 1;
//       });
//     }, 1000);

//     return () => clearInterval(interval);
//   }, [email, navigate]);

//   const formatTime = (seconds) => {
//     const mins = Math.floor(seconds / 60);
//     const secs = seconds % 60;
//     return `${mins}:${secs.toString().padStart(2, "0")}`;
//   };

//   const handleSubmit = async (e) => {
//     e.preventDefault();
//     if (validate()) {
//       try {
//         setLoading(true);
//         const response = await verifyOtpApi({ email, otp });
        
//         if (response.status) {
//           enqueueSnackbar(response.message, {
//             anchorOrigin: { vertical: "top", horizontal: "right" },
//             variant: "success",
//           });
          
//           // Navigate to reset password page
//           navigate("/reset-password", { state: { email, verified: true } });
//         }
//       } catch (error) {
//         const message = error?.response?.data?.message || "Invalid OTP";
//         enqueueSnackbar(message, {
//           anchorOrigin: { vertical: "top", horizontal: "right" },
//           variant: "error",
//         });
//       } finally {
//         setLoading(false);
//       }
//     }
//   };

//   const handleResendOTP = async () => {
//     try {
//       setResendLoading(true);
//       const response = await forgotPasswordApi({ email });
      
//       if (response.status) {
//         enqueueSnackbar("OTP resent successfully", {
//           anchorOrigin: { vertical: "top", horizontal: "right" },
//           variant: "success",
//         });
//         setTimer(300); // Reset timer
//       }
//     } catch (error) {
//       const message = error?.response?.data?.message || "Failed to resend OTP";
//       enqueueSnackbar(message, {
//         anchorOrigin: { vertical: "top", horizontal: "right" },
//         variant: "error",
//       });
//     } finally {
//       setResendLoading(false);
//     }
//   };

//   const validate = () => {
//     const newErrors = {};
//     if (!otp) {
//       newErrors.otp = "OTP is required";
//     } else if (otp.length !== 4) {
//       newErrors.otp = "OTP must be 4 digits";
//     } else if (!/^\d{4}$/.test(otp)) {
//       newErrors.otp = "OTP must contain only numbers";
//     }
//     setErrors(newErrors);
//     return Object.keys(newErrors).length === 0;
//   };

//   const handleOtpChange = (e) => {
//     const value = e.target.value.replace(/\D/g, "").slice(0, 4);
//     setOtp(value);
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
//                 Verify OTP
//               </Typography>
              
//               <Typography variant="body2" className="mb-6 text-center text-gray-600">
//                 We've sent a 4-digit OTP to <strong>{email}</strong>
//               </Typography>

//               <form onSubmit={handleSubmit}>
//                 <div className="mb-6">
//                   <TextField
//                     label="Enter 4-digit OTP"
//                     type="text"
//                     value={otp}
//                     onChange={handleOtpChange}
//                     variant="outlined"
//                     fullWidth
//                     error={!!errors.otp}
//                     helperText={errors.otp}
//                     onFocus={() => setErrors({ ...errors, otp: "" })}
//                     InputLabelProps={{
//                       shrink: true,
//                     }}
//                     inputProps={{
//                       maxLength: 4,
//                       style: { textAlign: "center", fontSize: "18px", letterSpacing: "8px" }
//                     }}
//                   />
//                 </div>

//                 {timer > 0 && (
//                   <Typography variant="body2" className="mb-4 text-center text-gray-600">
//                     OTP expires in: <strong className="text-red-600">{formatTime(timer)}</strong>
//                   </Typography>
//                 )}

//                 <Button
//                   type="submit"
//                   variant="contained"
//                   fullWidth
//                   disabled={loading || timer === 0}
//                   className="mb-4 py-3 bg-[#2952FF] hover:bg-[#1e3dd9]"
//                   style={{
//                     backgroundColor: loading || timer === 0 ? "#ccc" : "#2952FF",
//                     color: "white",
//                     padding: "12px",
//                   }}
//                 >
//                   {loading ? (
//                     <CircularProgress size={24} style={{ color: "white" }} />
//                   ) : (
//                     "Verify OTP"
//                   )}
//                 </Button>

//                 <div className="mb-4 text-center">
//                   <Button
//                     onClick={handleResendOTP}
//                     variant="text"
//                     disabled={timer > 0 || resendLoading}
//                     className="text-[#2952FF]"
//                   >
//                     {resendLoading ? (
//                       <CircularProgress size={16} />
//                     ) : timer > 0 ? (
//                       `Resend OTP in ${formatTime(timer)}`
//                     ) : (
//                       "Resend OTP"
//                     )}
//                   </Button>
//                 </div>

//                 <div className="text-center">
//                   <Button
//                     onClick={() => navigate("/forgot-password")}
//                     variant="text"
//                     className="text-[#2952FF]"
//                   >
//                     Back to Email
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

// export default VerifyOTP;