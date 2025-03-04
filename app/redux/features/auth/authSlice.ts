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

// ✅ Define User Type
type User = {
  name?: string;
  email?: string;
  avatar?: string;
};

// ✅ Define Auth State Type
type AuthState = {
  token: string;
  user: User | null;
};

// ✅ Initial State with Proper Type
const initialState: AuthState = {
  token: "",
  user: null, // Ensure `user` is null when not logged in
};

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    // ✅ Renamed `useRegistration` to `userRegistered` for consistency
    userRegistration: (state, action: PayloadAction<{ token: string }>) => {
      state.token = action.payload.token;
    },
    userLoggedIn: (
      state,
      action: PayloadAction<{ accessToken: string; user: User }>
    ) => {
      state.token = action.payload.accessToken;
      state.user = action.payload.user; // ✅ Ensure user is an object
    },
    userLoggedOut: (state) => {
      state.token = "";
      state.user = null; // ✅ Ensure user is set to `null` on logout
    },
  },
});

// ✅ Export actions with correct names
export const { userRegistration, userLoggedIn, userLoggedOut } =
  authSlice.actions;

export default authSlice.reducer;
