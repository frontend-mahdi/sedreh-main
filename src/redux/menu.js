import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  fetchedImages: [],
  fetchedImagesEmpty: false,
  saveImages: JSON.parse(window.localStorage.getItem("savedPictures")) || [],
  savedPolygons: JSON.parse(window.localStorage.getItem("savedPolygons")) || [],
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
    // deleteImageHandler: (state, action) => {
    //   state.saveImages = state.saveImages.filter(
    //     (val, index) => index != action.payload
    //   );
    // },
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
    deletePolyHandler: (state, action) => {
      const arr = state.savedPolygons;
      state.savedPolygons = arr.filter((val, index) => index != action.payload);
    },
  },
});

export const {
  deletePolyHandler,
  deleteImageHandler,
  fetchImagesEmptyHandler,
  getImagesHandler,
  saveImageHandler,
  savePolygonHandler,
  stagedSavedImageHandler,
} = counterSlice.actions;

export default counterSlice.reducer;
