import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  fetchedImages: [],
  saveImages: [],
  savePolygons: [],
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

    savePolygonHandler: (state, action) => {
      state.savePolygons.push(action.payload);
    },

    deleteImageHandler: (state, action) => {
      const arr = state.saveImages;
      state.saveImages = arr.filter((val) => val.id != action.payload);
    },
  },
});

export const { getImagesHandler, saveImageHandler, savePolygonHandler } =
  counterSlice.actions;

export default counterSlice.reducer;
