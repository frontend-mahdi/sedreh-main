import React from "react";
import { useDispatch } from "react-redux";
import { GrLocation } from "react-icons/gr";
import { getTotalMiddlePolygon, setPolyOnMap } from "./../redux/map";
import useSavedPolygons from "./../customHooks/useSavedPolygons";

export default function TabNum2() {
  // custom hook
  const [savedPolygons] = useSavedPolygons();

  const dispatch = useDispatch();

  const setShape = (item) => {
    console.log("item.shape", item);
    dispatch(setPolyOnMap(item.shape));
    dispatch(getTotalMiddlePolygon(item.center));
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
                    <button
                      onClick={() => setShape(item)}
                      className="ml-4"
                      title="نمایش روی نقشه"
                    >
                      <GrLocation color="#fff " />
                    </button>
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
