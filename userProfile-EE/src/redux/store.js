import { configureStore } from "@reduxjs/toolkit";
import userSlice from "./userSlice";
import avtarSlice from "./avtarSlice";



 const store = configureStore({
   reducer: {
     users: userSlice,
     avatars: avtarSlice,
   },
 });

export default store;