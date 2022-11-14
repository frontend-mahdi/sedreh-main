import React from "react";
import { useDispatch } from "react-redux";
import Popup from "reactjs-popup";
import "reactjs-popup/dist/index.css";
import { saveImageHandler } from "../../features/counter/menu";

export default function RightPopup(props) {
  const [firstName, setFirstName] = React.useState("");
  const [lastName, setLastName] = React.useState("");
  const dispatch = useDispatch();
  const saveItemHandler = (name) => {
    const bareData = props.data;

    const obj = {
      ...bareData,
      saved: true,
      title: name,
    };
    console.log("obj", obj);
    dispatch(saveImageHandler(obj));
  };
  return (
    <div>
      <Popup
        trigger={
          <div>
            <button
              id={props.id}
              className="w-32 h-10 rounded-lg flex justify-center items-center mt-2 bg-primarythree text-black"
            >
              <img src={props.source} alt="" />
              {props.title}
            </button>
          </div>
        }
        modal
        nested
      >
        {(close) => (
          <div className="modal">
            <button className="close text-white mt-2 ml-4" onClick={close}>
              &times;
            </button>
            <form>
              <div dir="rtl" className="px-8">
                <div>
                  <label className="text-gray text-right">
                    نام تصویر مورد نظر را بنویسید :
                  </label>

                  <input
                    type="text"
                    className="px-2 py-1 w-full h-8 mt-2 bg-gray-background mb-4 text-gray"
                    placeholder="نام تصویر ..."
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
                  disabled={firstName.length == 0}
                  type="button"
                  className="bg-primarythree px-10 disabled:text-grayer mx-auto  disabled:bg-gray h-10 rounded-lg flex justify-center items-center mt-2 mb-4 text-black"
                  onClick={(event) => {
                    close();
                    event.preventDefault();
                    saveItemHandler(firstName);

                    setFirstName("");
                    setLastName("");

                    props.onClick();
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
