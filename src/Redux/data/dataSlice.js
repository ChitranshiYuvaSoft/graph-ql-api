import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import client from "../apollo-client";
import dataServices from "./dataService";


const dataSlice = createSlice({
  name: "data",
  initialState: {
    me: [],
    UserDetails: {},
    isLoading: false,
    isError: false,
    isSuccess: false,
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(meData.pending, (state, action) => {
        state.isLoading = true;
        state.isSuccess = false;
        state.isError = false;
      })
      .addCase(meData.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isSuccess = true;
        state.me = action.payload;
        state.isError = false;
      })
      .addCase(meData.rejected, (state, action) => {
        state.isLoading = false;
        state.isSuccess = false;
        state.isError = true;
      })

      // User Details
      .addCase(userDetails.pending, (state, action) => {
        state.isLoading = true;
        state.isSuccess = false;
        state.isError = false;
      })
      .addCase(userDetails.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isSuccess = true;
        state.UserDetails = action.payload;
        state.isError = false;
      })
      .addCase(userDetails.rejected, (state, action) => {
        state.isLoading = false;
        state.isSuccess = false;
        state.isError = true;
      });
  },
});

export const meData = createAsyncThunk("ME/DATA", async () => {
  try {
    const response = await client.query({
      query: dataServices.ME_DATA,
      // variables: "670cec836f4cd73107705a39"
    });
    // console.log(response.data.me,"single user")
    return response.data.me;
  } catch (error) {
    console.log(error.message, "meData SLice");
  }
});
export const userDetails = createAsyncThunk("USER/DETAILS", async (id) => {
  try {
 
    const response = await client.query({
      query: dataServices.USER_DATA,
      variables: id,
    });
    console.log(response, "single user");
    return response.data.user;
  } catch (error) {
    console.log(error.message, "user SLice");
  }
});

export default dataSlice.reducer;
