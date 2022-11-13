import React from "react";
import Popup from "reactjs-popup";
import "reactjs-popup/dist/index.css";
import { getPolygonTitleFromUser } from "../../features/counter/map";
import { useDispatch } from "react-redux";

export default function SavePolygon(props) {
  const [firstName, setFirstName] = React.useState("");
  const [lastName, setLastName] = React.useState("");
  const dispatch = useDispatch();

  return (
    <div className="popup bg-black-rgba flex justify-center rounded-xl">
      <div className="text-gray w-28 flex justify-center items-center">
        <div>
          <Popup open={true} modal nested>
            {(close) => (
              <div className="modal">
                <button
                  className="close text-white"
                  onClick={() => {
                    close();
                    props.delete();
                  }}
                >
                  &times;
                </button>
                <form>
                  <div
                    dir="rtl"
                    className="flex flex-col justify-center items-center"
                  >
                    <p className="text-gray mb-2">
                      نام محدوده مورد نظر را بنویسید :
                    </p>

                    <input
                      type="text"
                      className="w-3/4 h-8 bg-gray-background mb-2 text-gray"
                      placeholder="نام محدوده ..."
                      onChange={(event) => setFirstName(event.target.value)}
                      value={firstName}
                      required
                    />
                    <p className="text-gray mb-2">
                      توضیحات مورد نظر را بنویسید :
                    </p>
                    <input
                      type="text"
                      className="w-3/4 h-28 bg-gray-background mb-2 text-gray"
                      // className="w-80 h-28 bg-gray-background mb-2 text-gray flex justify-around items-baseline"
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

                        console.log("firstName 👉️", firstName);
                        console.log("lastName 👉️", lastName);

                        if (firstName.length > 0) {
                          dispatch(
                            getPolygonTitleFromUser({
                              title: firstName,
                              desc: lastName ?? "",
                            })
                          );
                        }

                        setFirstName("");
                        setLastName("");
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
