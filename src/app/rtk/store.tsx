import { configureStore } from "@reduxjs/toolkit";
import languageReducer from "./languageSlice"; // Assuming you have a rootReducer

export const store = configureStore({
  reducer: {
    language: languageReducer,
  },
});
