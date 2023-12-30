import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";

export const getAvtars = createAsyncThunk("avtar/getAvtars", async () => {
  try {
    const response = await fetch(
      "https://reqres.in/api/users?page=1&limit=10&per_page=10"
    );
    const json = await response.json();
    console.log(json);
    return json?.data;
  } catch (error) {
    console.error("Error fetching avtar:", error);
    throw error;
  }
});

const avtarSlice = createSlice({
  name: "avtar",

  initialState: {
    status: null,
    avtar: [],
  },
  extraReducers: (builder) => {
    builder
      .addCase(getAvtars.fulfilled, (state, action) => {
        state.avtar = action.payload;
        state.status = null;
      })
      .addCase(getAvtars.pending, (state) => {
        state.status = "Fetching imges. Please wait a moment...";
      })
      .addCase(getAvtars.rejected, (state) => {
        state.status = "Failed to fetch data...";
      });
  },
});
export default avtarSlice.reducer;
