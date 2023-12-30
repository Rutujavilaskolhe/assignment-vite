import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";

export const getUsers = createAsyncThunk("users/getUsers", async () => {
  try {
    const response = await fetch("https://jsonplaceholder.typicode.com/users");
    const json = await response.json();

    return json;
  } catch (error) {
    console.error("Error fetching users:", error);
    throw error;
  }
});

const userSlice = createSlice({
  name: "users",

  initialState: {
    status: null,
    user: [],
    singleUser: {},
  },
  reducers: {
    deleteUser: (state, action) => {
      state.user = state.user.filter((el) => el.id !== action.payload);

      alert(`User number ${action.payload} Deleted`);
    },
    getSingleUser: (state, action) => {
      state.singleUser = state.user.find((el) => el.id === action.payload);
    },

    updateLike: (state, action) => {
      state.user = state.user.map((el) => {
        if (el.id === action.payload) {
          return { ...el, liked: !el.liked };
        } else {
          return el;
        }
      });
    },
    updateUser: (state, action) => {
      const updatedUser = state.user.find(
        (user) => user.id === action.payload.id
      );
      if (updatedUser) {
        Object.assign(updatedUser, action.payload);
      }
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(getUsers.fulfilled, (state, action) => {
        let liked = { liked: false };
        state.user = action.payload;
        let updatedUser = state.user?.map((el) => ({ ...el, ...liked }));
        state.user = updatedUser;
        state.status = null;
      })

      .addCase(getUsers.pending, (state) => {
        state.status = "Fetching users. Please wait a moment...";
      })
      .addCase(getUsers.rejected, (state) => {
        state.status = "Failed to fetch data...";
      });
  },
});
export const { deleteUser, updateLike, getSingleUser, updateUser } =
  userSlice.actions;
export default userSlice.reducer;
