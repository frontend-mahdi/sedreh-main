import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  fetchedImages: [],
  fetchedImagesEmpty: false,
  saveImages: [],
  savedPolygons: [],
  stagedSavedImage: "",
};

export const counterSlice = createSlice({
  name: "menu",
  initialState,
  reducers: {
    getImagesHandler: (state, action) => {
      state.fetchedImages = action.payload;
    },
    fetchImagesEmptyHandler: (state, action) => {
      state.fetchedImagesEmpty = action.payload;
    },
    saveImageHandler: (state, action) => {
      state.saveImages = [...state.saveImages, ...action.payload];
    },
    stagedSavedImageHandler: (state, action) => {
      state.stagedSavedImage = action.payload;
    },


    savePolygonHandler: (state, action) => {
      state.savedPolygons = [...state.savedPolygons, ...action.payload];
    },

    deleteImageHandler: (state, action) => {
      const arr = state.saveImages;
      state.saveImages = arr.filter((val) => val.id != action.payload);
    },
  },
});

export const {
  fetchImagesEmptyHandler,
  getImagesHandler,
  saveImageHandler,
  savePolygonHandler,
  stagedSavedImageHandler,
} = counterSlice.actions;

export default counterSlice.reducer;
