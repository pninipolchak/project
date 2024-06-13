import { createSlice } from "@reduxjs/toolkit";
import { useDispatch } from "react-redux";
import { clearStateandStorge } from "../order/orderSlice";

const initialState = {
  currentUser: null,
};

  
const userSlice = createSlice({

  name: "user",
  initialState,
  
  reducers: {
     userIn: (state, action) => {
      state.currentUser = action.payload;
      localStorage.setItem("currentUser", JSON.stringify(state.currentUser));
    },
    
    userOut: (state, action) => {
      // disp(() => clearStateandStorge());
      state.currentUser = null;
      // localStorage.removeItem("currentUser");
    },
  },
});

export const { userIn,userOut } = userSlice.actions;
export default userSlice.reducer;
