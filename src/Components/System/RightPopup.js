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
            <button className="close text-white" onClick={close}>
              &times;
            </button>
            <form>
              <div
                dir="rtl"
                className="flex flex-col justify-center items-center"
              >
                <p className="text-gray mb-2">
                  نام تصویر مورد نظر را بنویسید :
                </p>

                <input
                  type="text"
                  className="w-3/4 h-8 bg-gray-background mb-2 text-gray"
                  placeholder="نام تصویر ..."
                  onChange={(event) => setFirstName(event.target.value)}
                  value={firstName}
                  required
                />
                <p className="text-gray mb-2">توضیحات مورد نظر را بنویسید :</p>
                <input
                  type="text"
                  className="w-3/4 h-28 bg-gray-background mb-2 text-gray flex justify-around items-baseline"
                  placeholder="توضیحات"
                  value={lastName}
                  onChange={(event) => setLastName(event.target.value)}
                />
                <button
                  type="button"
                  className="bg-primarythree w-32 h-10 rounded-lg flex justify-center items-center mt-2 mb-2 text-black"
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
