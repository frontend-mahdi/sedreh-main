import React from "react";
import { useDispatch } from "react-redux";
import Popup from "reactjs-popup";

import { saveImageHandler, stagedSavedImageHandler } from "./../../redux/menu";

export default function RightPopup({ id, source, data, title, handler }) {
  const [firstName, setFirstName] = React.useState("");
  const [lastName, setLastName] = React.useState("");
  const dispatch = useDispatch();
  const saveItemHandler = (name) => {
    const bareData = data;
    const obj = {
      ...bareData,
      saved: true,
      title: name,
    };
    dispatch(saveImageHandler([obj]));
    saveAndShowHandler(name);
  };
  const saveAndShowHandler = (title) => {
    dispatch(stagedSavedImageHandler(title));
  };
  const submitHandler = (e) => {
    e.preventDefault();
    saveItemHandler(firstName);

    setFirstName("");
    setLastName("");

    handler();
  };
  return (
    <div>
      <Popup
        trigger={
          <div>
            <button
              id={id}
              className="w-32 h-10 rounded-lg flex justify-center items-center mt-2 bg-primary3 text-black1"
            >
              <img src={source} alt="" />
              {title}
            </button>
          </div>
        }
        modal
        nested
      >
        {(close) => (
          <div className="modal">
            <button className="close text-white1 mt-2 ml-4" onClick={close}>
              &times;
            </button>
            <form>
              <div dir="rtl" className="px-8">
                <div>
                  <label className="text-ED text-right">
                    نام تصویر مورد نظر را بنویسید :
                  </label>

                  <input
                    type="text"
                    className="px-2 py-1 w-full h-8 mt-2 bg-ED-background mb-4 text-ED"
                    placeholder="نام تصویر ..."
                    onChange={(event) => setFirstName(event.target.value)}
                    value={firstName}
                    required
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
                  disabled={firstName.length == 0}
                  type="button"
                  className="bg-primary3 px-10 disabled:text-Seventy mx-auto  disabled:bg-ED h-10 rounded-lg flex justify-center items-center mt-2 mb-4 text-black1"
                  onClick={(event) => {
                    submitHandler(event);
                    close();
                  }}
                >
                  ثبت تصویر
                </button>
              </div>
            </form>
          </div>
        )}
      </Popup>
    </div>
  );
}
