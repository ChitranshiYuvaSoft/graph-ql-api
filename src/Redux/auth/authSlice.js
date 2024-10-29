import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import client from "../apollo-client";
import authServices from "./authService";

const authSlice = createSlice({
  name: "auth",
  initialState: {
    user: {},
    users: [],
    token: "",
    isLoading: false,
    isSuccess: false,
    isError: false,
    message: "",
  },
  reducers: {},
  extraReducers: (builder) => {
    builder

      // Login
      .addCase(login.pending, (state, action) => {
        state.isLoading = true;
        state.isError = false;
        state.isSuccess = false;
      })
      .addCase(login.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isError = false;
        state.isSuccess = true;
        state.user = action.payload;
        state.token = action.payload.token;
        localStorage.setItem("token", state.token);
      })
      .addCase(login.rejected, (state, action) => {
        state.isLoading = false;
        state.isSuccess = false;
        state.isError = true;
        state.message = action.payload;
      })

      // All Users
      .addCase(allUsers.pending, (state, action) => {
        state.isLoading = true;
        state.isError = false;
        state.isSuccess = false;
      })
      .addCase(allUsers.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isSuccess = true;
        state.users = action.payload;
        state.isError = false;
      })
      .addCase(allUsers.rejected, (state, action) => {
        state.isLoading = false;
        state.isSuccess = false;
        state.isError = true;
      });
  },
});

export const login = createAsyncThunk("USER/LOGIN", async (userInfo) => {
  console.log(userInfo);
  try {
    console.log(userInfo);
    const response = await client.mutate({
      mutation: authServices.LOGIN_USER,
      variables: userInfo,
    });
    return response.data.login;
  } catch (error) {
    console.log(error, "Login User");
  }
});

export const allUsers = createAsyncThunk("ALL/USERS", async (value) => {
  try {
    const response = await client.query({
      query: authServices.ALL_USERS,
      variables: value,
    });
    return response.data.users.data;
  } catch (error) {
    console.log(error, "allUsers");
  }
});



export default authSlice.reducer;
