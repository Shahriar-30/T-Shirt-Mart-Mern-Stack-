import { createSlice } from "@reduxjs/toolkit";

// Helper function to load user data from localStorage
const loadUserFromLocalStorage = () => {
  try {
    const serializedUser = localStorage.getItem("info");
    if (serializedUser === null) {
      return null;
    }
    return JSON.parse(serializedUser);
  } catch (err) {
    console.error("Could not load user data from localStorage", err);
    return null;
  }
};

// Initial state
const initialState = loadUserFromLocalStorage() || "";

const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    setUser: (state, action) => {
      const user = action.payload;
      state = user;

      // Save to localStorage
      localStorage.setItem("info", JSON.stringify(user));
      return user;
    },
    clearUser: (state) => {
      state = "";

      // Remove from localStorage
      localStorage.removeItem("info");
      return "";
    },
  },
});

// Export actions
export const { setUser, clearUser } = userSlice.actions;

// Export reducer
export default userSlice.reducer;
