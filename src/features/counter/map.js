import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  polygon: [],
  savedPolyOnMap: [],
  savedPolyOnMapIndex: [],
  polygonTitle: {},
  savedPolygons: [],
  titlePolygon: "",
  titlePolygonRight: "",
  titlePolygonLeft: "",
  titlePolygonLoading: false,
  titleSubmitLoading: false,

  middlePoygon: [51.388973, 35.689198],
  buttonCompare: "",
  urlCompare: [],
  infoButton: false,
};

export const counterSlice = createSlice({
  name: "map",
  initialState,
  reducers: {
    getPolygonFromUser: (state, action) => {
      state.polygon = action.payload;
    },
    getPolygonTitleFromUser: (state, action) => {
      state.polygonTitle = action.payload;
    },

    delPolygonFromUser: (state, action) => {
      state.polygon = [];
    },

    getPolygonTitle: (state, action) => {
      state.titlePolygon = action.payload;
    },
    getPolygonTitleRight: (state, action) => {
      state.titlePolygonRight = action.payload;
    },
    getPolygonTitleLeft: (state, action) => {
      state.titlePolygonLeft = action.payload;
    },

    getPolygonLoading: (state, action) => {
      state.titlePolygonLoading = action.payload;
    },
    getSubmitLoading: (state, action) => {
      state.titleSubmitLoading = action.payload;
    },
    getTotalMiddlePolygon: (state, action) => {
      state.middlePoygon = action.payload;
    },
    getButtonCompare: (state, action) => {
      state.buttonCompare = action.payload;
    },
    getUrlCompare: (state, action) => {
      state.urlCompare = action.payload;
    },
    getInfoButton: (state, action) => {
      state.infoButton = action.payload;
    },
    updatePolygonList: (state, action) => {
      state.savedPolygons = [...state.savedPolygons, action.payload];
    },
    setPolyOnMap: (state, action) => {
      state.savedPolyOnMap = [action.payload];
    },
  },
});

export const {
  setPolyOnMap,
  getPolygonTitleFromUser,
  getPolygonFromUser,
  delPolygonFromUser,
  getPolygonTitle,
  getPolygonLoading,
  getSubmitLoading,
  getTotalMiddlePolygon,
  getButtonCompare,
  getUrlCompare,
  getInfoButton,
  getPolygonTitleLeft,
  getPolygonTitleRight,
  updatePolygonList,
} = counterSlice.actions;

export default counterSlice.reducer;
