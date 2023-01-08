import React from "react";
import Popup from "reactjs-popup";

export default function RightPopupConnection(props) {
  const [firstName, setFirstName] = React.useState("");
  const [lastName, setLastName] = React.useState("");
  const [phone, setPhone] = React.useState("");
  const [text, setText] = React.useState("");

  return (
    <div>
      <Popup trigger={<div>{props.btn}</div>} modal nested>
        {(close) => (
          <div className="modal pb-8 relative">
            <button
              className="close text-white1 left-4 -top-2 text-2xl absolute"
              onClick={close}
            >
              &times;
            </button>
            <form dir="rtl" className="flex flex-col px-8 mt-6">
              <h5 className="text-primary3 text-lg font-semibold">
                ارتباط با سدره
              </h5>

              <p
                dir="rtl"
                className="pt-2 pb-3 text-sm text-gray-400 font-light"
              >
                برای ارتباط با سدره و همکاری با این شرکت کافیست فیلد های زیر را
                تکمیل کنید :{" "}
              </p>
              <input
                type="text"
                className=" bg-ED-background mb-2 text-ED text-sm px-3 py-2 rounded"
                placeholder="نام"
                onChange={(event) => setFirstName(event.target.value)}
                value={firstName}
                required
              />
              <input
                type="text"
                className=" bg-ED-background mb-2 text-ED text-sm px-3 py-2 rounded"
                placeholder="نام خانوادگی"
                onChange={(event) => setLastName(event.target.value)}
                value={lastName}
                required
              />
              <input
                type="text"
                className=" bg-ED-background mb-2 text-ED text-sm px-3 py-2 rounded"
                placeholder="شماره همراه"
                onChange={(event) => setPhone(event.target.value)}
                value={phone}
                required
              />
              <textarea
                type="text"
                rows={6}
                className=" bg-ED-background mb-2 text-ED text-sm px-3 py-2 rounded"
                placeholder="متن پیام"
                onChange={(event) => setText(event.target.value)}
                value={text}
                required
              />

              <button
                type="button"
                className="text-xs rounded-full bg-primary text-white font-light px-4 py-2 mt-2"
                onClick={(event) => {
                  close();
                  event.preventDefault();

                  console.log("firstName 👉️", firstName);
                  console.log("lastName 👉️", lastName);
                  console.log("phone 👉️", phone);
                  console.log("text 👉️", text);
                }}
              >
                ارسال پیام{" "}
              </button>
            </form>
          </div>
        )}
      </Popup>
    </div>
  );
}
