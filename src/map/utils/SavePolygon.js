import React from "react";
import Popup from "reactjs-popup";
import { useDispatch } from "react-redux";

import { getPolygonFromUser, getPolygonTitleFromUser } from "./../../redux/map";
import { savedNewPolygonHandler, savePolygonHandler } from "./../../redux/menu";
import calcCenterHandler from "./../../handlers/calcCenter";

export default function SavePolygon(props) {
  const [firstName, setFirstName] = React.useState("");
  const [lastName, setLastName] = React.useState("");
  const dispatch = useDispatch();

  const handleSubmit = (event) => {
    event.preventDefault();

    if (firstName.length > 0) {
      dispatch(
        getPolygonTitleFromUser({
          title: firstName,
          desc: lastName ?? "",
        })
      );
      console.log("polygon added", props.data);

      window.localStorage.setItem("currentPolygon", [
        JSON.stringify(props.data.geometry.coordinates[0]),
      ]);
      const newPoly = {
        title: firstName,
        desc: lastName ?? "",
        center: calcCenterHandler(props.data.geometry.coordinates[0]),
        shape: props.data,
      };
      dispatch(getPolygonFromUser(props.data));
      dispatch(savePolygonHandler([newPoly]));
    }

    setFirstName("");
    setLastName("");
  };
  return (
    <div className="popup bg-black1-rgba flex justify-center rounded-xl">
      <div className="text-ED w-28 flex justify-center items-center">
        <div>
          <Popup open={true} modal nested>
            {(close) => (
              <div className="modal">
                <button
                  className="close text-white1 mt-2 ml-4"
                  onClick={() => {
                    close();
                    props.delete();
                  }}
                >
                  &times;
                </button>
                <form>
                  <div dir="rtl" className="px-8">
                    <div>
                      <label className="text-ED text-right">
                        نام محدوده مورد نظر را بنویسید :
                      </label>

                      <input
                        type="text"
                        className="px-2 py-1 w-full h-8 mt-2 bg-ED-background mb-4 text-ED"
                        placeholder="نام محدوده ..."
                        onChange={(event) => setFirstName(event.target.value)}
                        value={firstName}
                        required
                        autoFocus
                      />
                    </div>
                    <div>
                      <label className="text-ED text-right">
                        توضیحات مورد نظر را بنویسید :
                      </label>
                      <input
                        type="text"
                        className="px-2 py-1 w-full h-28 mt-2 bg-ED-background mb-4 text-ED"
                        placeholder="توضیحات"
                        value={lastName}
                        onChange={(event) => setLastName(event.target.value)}
                      />
                    </div>
                    <button
                      type="submit"
                      disabled={firstName.length == 0}
                      className="bg-primary3 px-10 disabled:text-Seventy mx-auto  disabled:bg-ED h-10 rounded-lg flex justify-center items-center mt-2 mb-4 text-black1"
                      onClick={(e) => {
                        close();
                        handleSubmit(e);
                      }}
                    >
                      ثبت محدوده
                    </button>
                  </div>
                </form>
              </div>
            )}
          </Popup>
        </div>
      </div>
    </div>
  );
}
