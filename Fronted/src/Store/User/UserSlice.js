import { createSlice } from "@reduxjs/toolkit";

import {
  registerThunk,
  otpVerifyThunk,
  loginThunk,
  forgotPasswordThunk,
  resetPasswordThunk,
  changePasswordThunk,
  logoutThunk,
} from "./UserApi";

// Get user data from localStorage
const getStoredUser = () => {
  try {
    return JSON.parse(localStorage.getItem("user")) || null;
  } catch (error) {
    return null;
  }
};

const initialState = {
  user: getStoredUser(),
  isAuthorized: !!getStoredUser(),
  loading: false,
  error: null,
  success: false,
  message: "",
};

const UserSlice = createSlice({
  name: "user",

  initialState,

  reducers: {
    resetUser: (state) => {
      state.loading = false;
      state.error = null;
      state.success = false;
      state.message = "";
    },

    logoutUser: (state) => {
      state.user = null;
      state.isAuthorized = false;
      state.loading = false;
      state.error = null;
      state.success = false;
      state.message = "";

      localStorage.removeItem("user");
    },
  },

  extraReducers: (builder) => {
    // REGISTER
    builder
      .addCase(registerThunk.pending, (state) => {
        state.loading = true;
        state.error = null;
        state.success = false;
      })
      .addCase(registerThunk.fulfilled, (state, action) => {
        state.loading = false;
        state.success = true;
        state.message = action.payload.message;
      })
      .addCase(registerThunk.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
        state.success = false;
      });

    // OTP VERIFY
    builder
      .addCase(otpVerifyThunk.pending, (state) => {
        state.loading = true;
        state.error = null;
        state.success = false;
      })
      .addCase(otpVerifyThunk.fulfilled, (state, action) => {
        state.loading = false;
        state.success = true;
        state.message = action.payload.message;
      })
      .addCase(otpVerifyThunk.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
        state.success = false;
      });

    // LOGIN
    builder
      .addCase(loginThunk.pending, (state) => {
        state.loading = true;
        state.error = null;
        state.success = false;
      })
      .addCase(loginThunk.fulfilled, (state, action) => {
        state.loading = false;
        state.success = true;
        state.user = action.payload.user;
        state.isAuthorized = true;
        state.message = action.payload.message;

        // Save user data
        localStorage.setItem("user", JSON.stringify(action.payload.user));
      })
      .addCase(loginThunk.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
        state.success = false;
      });

    // FORGOT PASSWORD
    builder
      .addCase(forgotPasswordThunk.pending, (state) => {
        state.loading = true;
        state.error = null;
        state.success = false;
      })
      .addCase(forgotPasswordThunk.fulfilled, (state, action) => {
        state.loading = false;
        state.success = true;
        state.message = action.payload.message;
      })
      .addCase(forgotPasswordThunk.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
        state.success = false;
      });

    // RESET PASSWORD
    builder
      .addCase(resetPasswordThunk.pending, (state) => {
        state.loading = true;
        state.error = null;
        state.success = false;
      })
      .addCase(resetPasswordThunk.fulfilled, (state, action) => {
        state.loading = false;
        state.success = true;
        state.message = action.payload.message;
      })
      .addCase(resetPasswordThunk.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
        state.success = false;
      });

    // CHANGE PASSWORD
    builder
      .addCase(changePasswordThunk.pending, (state) => {
        state.loading = true;
        state.error = null;
        state.success = false;
      })
      .addCase(changePasswordThunk.fulfilled, (state, action) => {
        state.loading = false;
        state.success = true;
        state.message = action.payload.message;
      })
      .addCase(changePasswordThunk.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
        state.success = false;
      });

    // LOGOUT
    builder
      .addCase(logoutThunk.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(logoutThunk.fulfilled, (state, action) => {
        state.loading = false;
        state.user = null;
        state.isAuthorized = false;
        state.success = true;
        state.message = action.payload.message;

        localStorage.removeItem("user");
      })
      .addCase(logoutThunk.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      });
  },
});

export const { resetUser, logoutUser } = UserSlice.actions;

const userReducer = UserSlice.reducer;

export default userReducer;
