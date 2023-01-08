import React from "react";
import { useState, useEffect } from "react";

import img0 from "./../assets/img/info/p0.png";
import img1 from "./../assets/img/info/p1.png";
import img2 from "./../assets/img/info/p2.png";
import img3 from "./../assets/img/info/p3.png";
import img4 from "./../assets/img/info/p4.png";
import img5 from "./../assets/img/info/p5.png";
import img6 from "./../assets/img/info/p6.png";
// images should take
import { getInfoButton } from "../redux/map";
import { useDispatch } from "react-redux";
import { FaTimes } from "react-icons/fa";

const Info = () => {
  const [activeIndex, setActiveIndex] = useState(0);
  const dispatch = useDispatch();
  const images = [img0, img1, img2, img3, img4, img5, img6];

  const exitHandler = () => {
    dispatch(getInfoButton(false));
  };
  const slides = {
    0: (
      <div
        dir="rtl"
        className="m_slide relative w-1/4 text-justify bg-black1-rgba px-6 py-4 rounded-xl "
      >
        <span
          className="absolute left-4 cursor-pointer top-4"
          onClick={exitHandler}
        >
          <FaTimes color="#fff" />
        </span>
        <div className="text-white pb-4">
          <h5 className="text-primary3 text-lg font-semibold">
            سلام خوش آمدید
          </h5>
          <p className="py-2 text-sm text-gray-400 font-light">
            این راهنما به شما کمک میکند با امکانات سامانه آشنا شوید.لطفا برای
            شروع کلیک کنید.
          </p>
        </div>
        <div className="flex flex-row justify-center gap-1">
          <button
            className="text-xs rounded-full bg-primary text-white font-light px-8 py-2"
            onClick={() => setActiveIndex(activeIndex + 1)}
          >
            شروع
          </button>
        </div>
      </div>
    ),
    1: (
      <div
        dir="rtl"
        className="m_slide relative w-1/4 text-justify bg-black1-rgba px-6 py-4 rounded-xl "
      >
        <span
          className="absolute left-4 cursor-pointer top-4"
          onClick={exitHandler}
        >
          <FaTimes color="#fff" />
        </span>
        <div className="text-white pb-4">
          <h5 className="text-primary3 text-lg font-semibold">سربرگ</h5>
          <p className="py-2 text-sm text-gray-400 font-light">
            در این قسمت شما میتوانید با کلیک بر روی لوگوی سامانه به سایت اصلی
            منتقل شوید. در سرچ باکس شهر یا استان مدنظر خود را جستجو کنید.با
            استفاده از دکمه راهنمای سامانه به همین راهنما دسترسی داشته باشید و
            از طریق دکمه ازتباط با ما پیام خود را برای سدره بفرستید.
          </p>
        </div>

        <div className="flex flex-row gap-1 justify-center">
          <button
            className="text-xs rounded-full bg-primary text-white font-light px-4 py-2"
            onClick={() => setActiveIndex(activeIndex + 1)}
          >
            بعدی
          </button>
          <button
            className="text-xs rounded-full bg-gray-600 text-white font-light px-4 py-2"
            onClick={() => setActiveIndex(activeIndex - 1)}
          >
            قبلی
          </button>
        </div>
      </div>
    ),
    2: (
      <div
        dir="rtl"
        className="m_slide relative w-1/4 text-justify bg-black1-rgba px-6 py-4 rounded-xl "
      >
        <span
          className="absolute left-4 cursor-pointer top-4"
          onClick={exitHandler}
        >
          <FaTimes color="#fff" />
        </span>
        <div className="text-white pb-4">
          <h5 className="text-primary3 text-lg font-semibold">نوار ابزار</h5>
          <p className="py-2 text-sm text-gray-400 font-light">
            این قسمت، نوار ابزار شما می باشد که می توانید با آن نقشه را مدیریت
            کنید. به ترتیب از بالا ابزارهای موجود به این صورت است: حالت تمام
            صفحه، بزرگ نمایی، کوچک نمایی، جهت شمال و جنوب، رسم مستطیل، مارکر،
            حذف پلیگان یا مارکر.{" "}
          </p>
        </div>

        <div className="flex flex-row gap-1 justify-center">
          <button
            className="text-xs rounded-full bg-primary text-white font-light px-4 py-2"
            onClick={() => setActiveIndex(activeIndex + 1)}
          >
            بعدی
          </button>
          <button
            className="text-xs rounded-full bg-gray-600 text-white font-light px-4 py-2"
            onClick={() => setActiveIndex(activeIndex - 1)}
          >
            قبلی
          </button>
        </div>
      </div>
    ),
    3: (
      <div
        dir="rtl"
        className="m_slide relative w-1/4 text-justify bg-black1-rgba px-6 py-4 rounded-xl "
      >
        <span
          className="absolute left-4 cursor-pointer top-4"
          onClick={exitHandler}
        >
          <FaTimes color="#fff" />
        </span>
        <div className="text-white pb-4">
          <h5 className="text-primary3 text-lg font-semibold">مشاهده تصویر</h5>
          <p className="py-2 text-sm text-gray-400 font-light">
            در این قسمت پس از رسم پلیگان و وارد کردن اطلاعات پلیگان مدنظر خود با
            وارد کردن تاریخ های مبدا و مقصد لیست تصاویر موجود برای شما به نمایش
            در می آید. هر تصویر را میتوانید ذخیره کنید که در قسمت تصاویر ذخیره
            شده به نمایش در می آید.
          </p>
        </div>
        <div className="flex flex-row gap-1 justify-center">
          <button
            className="text-xs rounded-full bg-primary text-white font-light px-4 py-2"
            onClick={() => setActiveIndex(activeIndex + 1)}
          >
            بعدی
          </button>
          <button
            className="text-xs rounded-full bg-gray-600 text-white font-light px-4 py-2"
            onClick={() => setActiveIndex(activeIndex - 1)}
          >
            قبلی
          </button>
        </div>
      </div>
    ),
    4: (
      <div
        dir="rtl"
        className="m_slide relative w-1/4 text-justify bg-black1-rgba px-6 py-4 rounded-xl "
      >
        <span
          className="absolute left-4 cursor-pointer top-4"
          onClick={exitHandler}
        >
          <FaTimes color="#fff" />
        </span>
        <div className="text-white pb-4">
          <h5 className="text-primary3 text-lg font-semibold">
            محدوه های ذخیره شده
          </h5>

          <p className="py-2 text-sm text-gray-400 font-light">
            در این قسمت میتوانید محدوده های ذخیره شده خود را مشاهده کنید. و در
            صورت نیاز آنها را حذف یا برای دریافت تصاویر هر یک را انتخاب کنید.
          </p>
        </div>

        <div className="flex flex-row gap-1 justify-center">
          <button
            className="text-xs rounded-full bg-primary text-white font-light px-4 py-2"
            onClick={() => setActiveIndex(activeIndex + 1)}
          >
            بعدی
          </button>
          <button
            className="text-xs rounded-full bg-gray-600 text-white font-light px-4 py-2"
            onClick={() => setActiveIndex(activeIndex - 1)}
          >
            قبلی
          </button>
        </div>
      </div>
    ),
    5: (
      <div
        dir="rtl"
        className="m_slide relative w-1/4 text-justify bg-black1-rgba px-6 py-4 rounded-xl "
      >
        <span
          className="absolute left-4 cursor-pointer top-4"
          onClick={exitHandler}
        >
          <FaTimes color="#fff" />
        </span>
        <div className="text-white pb-4">
          <h5 className="text-primary3 text-lg font-semibold">مقایسه تصاویر</h5>

          <p className="py-2 text-sm text-gray-400 font-light">
            پس از ذخیره چند تصویر برای یک محدوده در تب مشاهده تصاویر در این قسمت
            میتوانید با انتخاب هریک از تصاویر در محدوده ای مشخص به مقایسه آن با
            تصویر دیگر در همین محدوده بپردازید.
          </p>
        </div>

        <div className="flex flex-row gap-1 justify-center">
          <button
            className="text-xs rounded-full bg-primary text-white font-light px-4 py-2"
            onClick={() => setActiveIndex(activeIndex + 1)}
          >
            بعدی
          </button>
          <button
            className="text-xs rounded-full bg-gray-600 text-white font-light px-4 py-2"
            onClick={() => setActiveIndex(activeIndex - 1)}
          >
            قبلی
          </button>
        </div>
      </div>
    ),
    6: (
      <div
        dir="rtl"
        className="m_slide relative w-1/4 text-justify bg-black1-rgba px-6 py-4 rounded-xl "
      >
        <span
          className="absolute left-4 cursor-pointer top-4"
          onClick={exitHandler}
        >
          <FaTimes color="#fff" />
        </span>
        <div className="text-white pb-4">
          <h5 className="text-primary3 text-lg font-semibold">دانلود تصویر</h5>
          <p className="py-2 text-sm text-gray-400 font-light">
            در این قسمت میتوانید هر یک از تصاویر ذخیره شده خود را دانلود کنید.
            تصاویر دانلودی با فرمت zip بوده و نام آن شامل عنوان تصویر و تاریخ آن
            می باشد.
          </p>
        </div>
        <div className="flex flex-row gap-1 justify-center">
          <button
            className="text-xs rounded-full bg-primary text-white font-light px-4 py-2"
            onClick={exitHandler}
          >
            ورود به سامانه
          </button>
          <button
            className="text-xs rounded-full bg-gray-600 text-white font-light px-4 py-2"
            onClick={() => setActiveIndex(activeIndex - 1)}
          >
            قبلی
          </button>
        </div>
      </div>
    ),
  };

  return (
    <>
      <div
        style={{
          position: "relative",
          height: "100vh",
        }}
      >
        <img
          src={images[activeIndex]}
          layout="fill"
          className="min-w-full min-h-full"
        />

        <div className="absolute top-1/4 w-full h-8">
          <div>
            <div className="mx-auto flex flex-row justify-center">
              {slides[`${activeIndex}`]}
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Info;
