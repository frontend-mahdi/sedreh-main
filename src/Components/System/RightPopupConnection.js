import React from "react";
import Popup from "reactjs-popup";
import "reactjs-popup/dist/index.css";

export default function RightPopupConnection(props) {
  const [firstName, setFirstName] = React.useState("");
  const [email, setEmail] = React.useState("");
  const [phone, setPhone] = React.useState("");
  const [text, setText] = React.useState("");

  return (
    <div>
      <Popup trigger={<div>{props.btn}</div>} modal nested>
        {(close) => (
          <div className="modal ">
            <button className="close text-white" onClick={close}>
              &times;
            </button>
            <form>
              <div
                dir="rtl"
                className="flex flex-col justify-center items-center"
              >
                <h1 className="text-gray mb-2 text-2xl">
                  به راحتی با سدره ارتباط برقرار کنید
                </h1>

                <p dir="rtl" className="text-gray mb-2 w-3/4">
                  برای ارتباط با سدره و همکاری با این شرکت کافیست<br></br> فیلد
                  های زیر را تکمیل کنید :{" "}
                </p>
                <input
                  type="text"
                  className="w-3/4 h-8 bg-gray-background mb-2 text-gray placeholder-white"
                  placeholder="نام خود را وارد نمائید ..."
                  onChange={(event) => setFirstName(event.target.value)}
                  value={firstName}
                  required
                />
                <input
                  type="text"
                  className="w-3/4 h-8 bg-gray-background mb-2 text-gray placeholder-white"
                  placeholder="ایمیل خود را وارد نمائید ..."
                  onChange={(event) => setEmail(event.target.value)}
                  value={email}
                  required
                />
                <div className="w-3/4 h-8  mb-2 text-gray flex gap-2">
                  <input
                    type="text"
                    className="h-8 w-3/4 bg-gray-background mb-2 text-gray placeholder-white"
                    placeholder="شماره موبایل خود را وارد نمائید ..."
                    onChange={(event) => setPhone(event.target.value)}
                    value={phone}
                    required
                  />
                  <div className="w-1/4 h-8  mb-2 text-gray">
                    <select id="cars" className=" h-8 bg-gray-background">
                      <option value="volvo" className="text-gray  bg-black">
                        Volvo
                      </option>
                      <option value="saab" className="text-gray  bg-black">
                        Saab
                      </option>
                      <option value="vw" className="text-gray  bg-black">
                        VW
                      </option>
                      <option
                        value="audi"
                        selected
                        className="text-gray w-3/4 bg-black"
                      >
                        Audi
                      </option>
                    </select>
                  </div>
                </div>
                <input
                  type="text"
                  className="w-3/4 h-28 bg-gray-background mb-2 text-gray flex justify-around items-baseline placeholder-white"
                  placeholder="متن خود را وارد نمائید ..."
                  value={text}
                  onChange={(event) => setText(event.target.value)}
                />
                <button
                  type="button"
                  className="bg-primarythree w-32 h-10 rounded-lg flex justify-center items-center mt-2 mb-2 text-black"
                  onClick={(event) => {
                    close();
                    event.preventDefault();

                    console.log("firstName 👉️", firstName);
                    console.log("email 👉️", email);
                    console.log("phone 👉️", phone);
                    console.log("text 👉️", text);

                    setFirstName("");
                    setEmail("");
                  }}
                >
                  ارسال پیام{" "}
                </button>
              </div>
            </form>
          </div>
        )}
      </Popup>
    </div>
  );
}
