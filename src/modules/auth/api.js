import { globalPostService } from "../../utils/globalApiServices";

export const loginApi = async (data) => {
  try {
    const response = await globalPostService("/auth/admin/login", data);
    return response.data;
  } catch (err) {
    console.log(err);
    throw err; 
  }
};

export const signUpApi = async (data) => {
  try {
    const response = await globalPostService("/users", data);
    return response.data;
  } catch (err) {
    console.log(err);
  }
};

// // Forgot Password APIs
// export const forgotPasswordApi = async (data) => {
//   try {
//     const response = await globalPostService("/auth/user/forgot-password", data);
//     return response.data;
//   } catch (err) {
//     console.log(err);
//     throw err;
//   }
// };

// export const verifyOtpApi = async (data) => {
//   try {
//     const response = await globalPostService("/auth/user/verify-otp", data);
//     return response.data;
//   } catch (err) {
//     console.log(err);
//     throw err;
//   }
// };

// export const resetPasswordApi = async (data) => {
//   try {
//     const response = await globalPostService("/auth/user/reset-password", data);
//     return response.data;
//   } catch (err) {
//     console.log(err);
//     throw err;
//   }
// };