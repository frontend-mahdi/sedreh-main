import React from "react";
import Popup from "reactjs-popup";
import "reactjs-popup/dist/index.css";
import {
  getPolygonFromUser,
  getPolygonTitleFromUser,
} from "../../features/counter/map";
import { useDispatch } from "react-redux";
import calcCenterHandler from "./utils/calcCenter";
import { savePolygonHandler } from "../../features/counter/menu";

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
      dispatch(getPolygonFromUser(props.data));
      window.localStorage.setItem("currentPolygon", JSON.stringify(props.data));
      console.log("props.data", props.data);
      const newPoly = {
        title: firstName,
        desc: lastName ?? "",
        center: calcCenterHandler(props.data.geometry.coordinates[0]),
        shape: props.data,
      };
      dispatch(savePolygonHandler(newPoly));
    }

    setFirstName("");
    setLastName("");
  };
  return (
    <div className="popup bg-black-rgba flex justify-center rounded-xl">
      <div className="text-gray w-28 flex justify-center items-center">
        <div>
          <Popup open={true} modal nested>
            {(close) => (
              <div className="modal">
                <button
                  className="close text-white mt-2 ml-4"
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
                      <label className="text-gray text-right">
                        نام محدوده مورد نظر را بنویسید :
                      </label>

                      <input
                        type="text"
                        className="px-2 py-1 w-full h-8 mt-2 bg-gray-background mb-4 text-gray"
                        placeholder="نام محدوده ..."
                        onChange={(event) => setFirstName(event.target.value)}
                        value={firstName}
                        required
                      />
                    </div>
                    <div>
                      <label className="text-gray text-right">
                        توضیحات مورد نظر را بنویسید :
                      </label>
                      <input
                        type="text"
                        className="px-2 py-1 w-full h-28 mt-2 bg-gray-background mb-4 text-gray"
                        placeholder="توضیحات"
                        value={lastName}
                        onChange={(event) => setLastName(event.target.value)}
                      />
                    </div>
                    <button
                      type="submit"
                      disabled={firstName.length == 0}
                      className="bg-primarythree px-10 disabled:text-grayer mx-auto  disabled:bg-gray h-10 rounded-lg flex justify-center items-center mt-2 mb-4 text-black"
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
