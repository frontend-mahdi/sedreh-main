import React from "react";
import { useDispatch } from "react-redux";
import { GrLocation } from "react-icons/gr";
import {
  getPolygonFromUser,
  getTotalMiddlePolygon,
  setCurrentPoly,
  setPolyOnMap,
} from "./../redux/map";
import useSavedPolygons from "./../customHooks/useSavedPolygons";
import { deletePolyHandler, savePolygonHandler } from "../redux/menu";
import { FaTrashAlt } from "react-icons/fa";

export default function TabNum2() {
  // custom hook
  const [savedPolygons] = useSavedPolygons();

  const dispatch = useDispatch();

  const setShape = (item) => {
    dispatch(getPolygonFromUser(item.shape));
    // dispatch(savePolygonHandler([item]));
    dispatch(setCurrentPoly(true));

    console.log("item.shape", item);
    dispatch(setPolyOnMap(item.shape));
    dispatch(getTotalMiddlePolygon(item.center));
  };
  const _deletePolyHandler = (id) => {
    dispatch(deletePolyHandler(id));
  };
  return (
    <div className="w-full h-full">
      <div className="w-full h-full">
        <div className="py-2">
          <p
            className="w-full text-center pb-3 pt-2"
            style={{ borderBottom: "4px solid #95DD91" }}
          >
            {" "}
            محدوده های ذخیره شده
          </p>
        </div>
        <div
          className="w-full h-full overflow-auto py-2"
          dir="rtl"
          style={{ height: "calc(100% - 43.95px)" }}
        >
          {savedPolygons.length > 0 ? (
            savedPolygons?.map((item, index) => (
              <div
                key={index}
                dir="rtl"
                className="bg-primary-background w-64 rounded-lg mt-4 mx-auto"
              >
                <div className="bg-primary-background-title mb-1 mt-1 rounded-t-lg ">
                  <div className="flex items-center mr-4  justify-between">
                    <p>{item.title}</p>

                    <div className="flex flex-row gap-2 pl-3">
                      <button
                        title="نمایش روی نقشه"
                        onClick={() => setShape(item)}
                      >
                        <GrLocation color="#fff " />
                      </button>
                      <button
                        title="حذف"
                        onClick={() => _deletePolyHandler(index)}
                      >
                        <FaTrashAlt />
                      </button>
                    </div>
                  </div>
                </div>
                <div className="flex flex-col justify-center mr-4">
                  <p>
                    {item.center[0]}-{item.center[1]}
                  </p>
                </div>
              </div>
            ))
          ) : (
            <p className="text-center py-4">محدودی ذخیره شده ای وجود ندارد</p>
          )}
        </div>
      </div>
    </div>
  );
}
