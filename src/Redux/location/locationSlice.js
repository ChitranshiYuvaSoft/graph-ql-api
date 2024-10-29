import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import locationServices from "./locationService";
import client from "../apollo-client";

const locationSlice = createSlice({
  name: "location",
  initialState: {
    countries: [],
    allStates: [],
    cities: [],
    isLoading: false,
    isSuccess: false,
    isError: false,
  },
  reducers: {},
  extraReducers: (builder) => {
    // Countries Data
    builder
      .addCase(countryData.pending, (state, action) => {
        state.isLoading = true;
        state.isError = false;
        state.isSuccess = false;
      })
      .addCase(countryData.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isError = false;
        state.isSuccess = true;
        state.countries = action.payload;
      })
      .addCase(countryData.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.isSuccess = false;
      });

    //   States Data
    builder
      .addCase(statesData.pending, (state, action) => {
        state.isLoading = true;
        state.isError = false;
        state.isSuccess = false;
      })
      .addCase(statesData.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isError = false;
        state.isSuccess = true;
        state.allStates = action.payload;
      })
      .addCase(statesData.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.isSuccess = false;
      });

    //   Cities Data
    builder
      .addCase(citiesData.pending, (state, action) => {
        state.isLoading = true;
        state.isError = false;
        state.isSuccess = false;
      })
      .addCase(citiesData.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isError = false;
        state.isSuccess = true;
        state.cities = action.payload;
      })
      .addCase(citiesData.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.isSuccess = false;
      });
  },
});

export const countryData = createAsyncThunk("COUNTRIES/DATA", async () => {
  try {
    const response = await client.query({
      query: locationServices.COUNTRIES_DATA,
    });
    return response.data.countries;
  } catch (error) {
    console.log(error, "country data");
  }
});

export const statesData = createAsyncThunk("STATES/DATA", async (countryId) => {
  try {
    const response = await client.query({
      query: locationServices.STATES_DATA,
      variables: countryId,
    });
    return response.data.states;
  } catch (error) {
    console.log(error, "states data");
  }
});

export const citiesData = createAsyncThunk("CITIES/DATA", async (statesId) => {
  try {
    const response = await client.query({
      query: locationServices.CITIES_DATA,
      variables: statesId,
    });
    return response.data.cities;
  } catch (error) {
    console.log(error, "states data");
  }
});

export default locationSlice.reducer;
