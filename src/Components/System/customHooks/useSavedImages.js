import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";

const useSavedImages = () => {
  const [saveImages, setSavedImages] = useState([]);
  const _saveImages = useSelector((state) => state.menu.saveImages);

  useEffect(() => {
    if (_saveImages.length > 0) {
      console.log("saveImages", _saveImages);
      setSavedImages(_saveImages);
      window.localStorage.setItem("savedPictures", JSON.stringify(_saveImages));
    }
  }, [_saveImages]);
  return [saveImages];
};

export default useSavedImages;
