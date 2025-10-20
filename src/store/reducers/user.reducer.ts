import { createSlice, type PayloadAction } from "@reduxjs/toolkit";
import { ReduxSlices } from "@/types/enums";
import { type User } from "@/types/user";

export const initialUserState: User = {
  _id: "",
  firstName: "",
  lastName: "",
  fullName: "",
  email: "",
  phoneNumber: "",
  profilePicture: "",
  status: "",
  createdAt: "",
  lastLogin: "",
};

export const userSlice = createSlice({
  name: ReduxSlices.User,
  initialState: initialUserState,
  reducers: {
    setUser: (_, action: PayloadAction<User>) => {
      return action.payload;
    },
    clearUser: () => initialUserState,
  },
});

export const { setUser, clearUser } = userSlice.actions;
export default userSlice.reducer;
