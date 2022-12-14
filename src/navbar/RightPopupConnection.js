import React from "react";
import Popup from "reactjs-popup";

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
            <button className="close text-white1" onClick={close}>
              &times;
            </button>
            <form>
              <div
                dir="rtl"
                className="flex flex-col justify-center items-center"
              >
                <h1 className="text-ED mb-2 text-2xl">
                  به راحتی با سدره ارتباط برقرار کنید
                </h1>

                <p dir="rtl" className="text-ED mb-2 w-3/4">
                  برای ارتباط با سدره و همکاری با این شرکت کافیست<br></br> فیلد
                  های زیر را تکمیل کنید :{" "}
                </p>
                <input
                  type="text"
                  className="w-3/4 h-8 bg-ED-background mb-2 text-ED placeholder-white1"
                  placeholder="نام خود را وارد نمائید ..."
                  onChange={(event) => setFirstName(event.target.value)}
                  value={firstName}
                  required
                />
                <input
                  type="text"
                  className="w-3/4 h-8 bg-ED-background mb-2 text-ED placeholder-white1"
                  placeholder="ایمیل خود را وارد نمائید ..."
                  onChange={(event) => setEmail(event.target.value)}
                  value={email}
                  required
                />
                <div className="w-3/4 h-8  mb-2 text-ED flex gap-2">
                  <input
                    type="text"
                    className="h-8 w-3/4 bg-ED-background mb-2 text-ED placeholder-white1"
                    placeholder="شماره موبایل خود را وارد نمائید ..."
                    onChange={(event) => setPhone(event.target.value)}
                    value={phone}
                    required
                  />
                  <div className="w-1/4 h-8  mb-2 text-ED">
                    <select id="cars" className=" h-8 bg-ED-background">
                      <option value="volvo" className="text-ED  bg-black1">
                        Volvo
                      </option>
                      <option value="saab" className="text-ED  bg-black1">
                        Saab
                      </option>
                      <option value="vw" className="text-ED  bg-black1">
                        VW
                      </option>
                      <option
                        value="audi"
                        selected
                        className="text-ED w-3/4 bg-black1"
                      >
                        Audi
                      </option>
                    </select>
                  </div>
                </div>
                <input
                  type="text"
                  className="w-3/4 h-28 bg-ED-background mb-2 text-ED flex justify-around items-baseline placeholder-white1"
                  placeholder="متن خود را وارد نمائید ..."
                  value={text}
                  onChange={(event) => setText(event.target.value)}
                />
                <button
                  type="button"
                  className="bg-primary3 w-32 h-10 rounded-lg flex justify-center items-center mt-2 mb-2 text-black1"
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
