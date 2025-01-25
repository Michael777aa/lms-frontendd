// import { PayloadAction, createSlice } from "@reduxjs/toolkit";

// const initialState = {
//   token: "",
//   user: "'",
// };

// const authSlice = createSlice({
//   name: "auth",
//   initialState,
//   reducers: {
//     useRegistration: (state, action: PayloadAction<{ token: string }>) => {
//       state.token = action.payload.token;
//     },
//     userLoggedIn: (
//       state,
//       action: PayloadAction<{ accessToken: string; user: string }>
//     ) => {
//       state.token = action.payload.accessToken;
//       state.user = action.payload.user;
//     },
//     userLoggedOut: (state) => {
//       state.token = "";
//       state.user = "";
//     },
//   },
// });

// export const { useRegistration, userLoggedIn, userLoggedOut } =
//   authSlice.actions;

// export default authSlice.reducer;

import { PayloadAction, createSlice } from "@reduxjs/toolkit";

type User = {
  name?: string;
  email?: string;
  avatar?: string;
};

const initialState = {
  token: "",
  user: null as User | null, // ✅ Ensure `user` is null when not logged in
};

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    userRegistered: (state, action: PayloadAction<{ token: string }>) => {
      // ✅ Renamed from `useRegistration`
      state.token = action.payload.token;
    },
    userLoggedIn: (
      state,
      action: PayloadAction<{ accessToken: string; user: User }>
    ) => {
      state.token = action.payload.accessToken;
      state.user = action.payload.user; // ✅ User should be an object, not a string
    },
    userLoggedOut: (state) => {
      state.token = "";
      state.user = null; // ✅ Ensure user is set to `null` on logout
    },
  },
});

export const { userRegistered, userLoggedIn, userLoggedOut } =
  authSlice.actions;

export default authSlice.reducer;
