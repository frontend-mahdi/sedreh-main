import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  fetchedImages: [],
  saveImages: JSON.parse(window.localStorage.getItem("savedPictures")) || [],
  savePolygons: [],
  stagedSavedImage: "",
};

export const counterSlice = createSlice({
  name: "menu",
  initialState,
  reducers: {
    getImagesHandler: (state, action) => {
      state.fetchedImages = action.payload;
    },
    saveImageHandler: (state, action) => {
      state.saveImages.push(action.payload);
    },
    stagedSavedImageHandler: (state, action) => {
      state.stagedSavedImage = action.payload;
    },

    savePolygonHandler: (state, action) => {
      state.savePolygons.push(action.payload);
    },

    deleteImageHandler: (state, action) => {
      const arr = state.saveImages;
      state.saveImages = arr.filter((val) => val.id != action.payload);
    },
  },
});

export const {
  getImagesHandler,
  saveImageHandler,
  savePolygonHandler,
  stagedSavedImageHandler,
} = counterSlice.actions;

export default counterSlice.reducer;
