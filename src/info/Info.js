import React from "react";
import { useState, useEffect } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import { Pagination, Navigation } from "swiper";

import img0 from "./../assets/img/info/p0.PNG";
import img1 from "./../assets/img/info/p1.PNG";
import img2 from "./../assets/img/info/p2.PNG";
import img3 from "./../assets/img/info/p3.PNG";
import img4 from "./../assets/img/info/p4.PNG";
import img5 from "./../assets/img/info/p5.PNG";
import img6 from "./../assets/img/info/p6.PNG";
// images should take
import { getInfoButton } from "../redux/map";
import { useDispatch } from "react-redux";

const Info = () => {
  const [activeIndex, setActiveIndex] = useState(0);
  const [image, setImage] = useState(img1);
  const dispatch = useDispatch();
  const images = [img0, img1, img2, img3, img4, img5, img6];
  const contents = [
    {
      step: 1,
      content: ` با سلام به سامانه سدره خوش آمدید در این
                  قسمت راهنمای سامانه به شما کمک می کند که روش کار با سامانه را
                  یاد بگیرید.`,
    },
  ];
  const infoChanger = () => {
    dispatch(getInfoButton(false));
  };
  useEffect(() => {
    setImage(images[activeIndex]);
  }, [activeIndex]);

  return (
    <>
      <div
        style={{
          position: "relative",
          height: "100vh",
        }}
      >
        <img src={image} layout="fill" />

        <div className="absolute top-1/4 w-full h-8">
          <Swiper
            onActiveIndexChange={(e) => {
              setActiveIndex(e.activeIndex);
            }}
            pagination={{ clickable: true }}
            modules={[Pagination]}
            className="mySwiper h-96 w-96"
            cssMode={true}
            navigation={false}
            mousewheel={true}
            keyboard={true}
          >
            <SwiperSlide>
              <div className="bg-black1-rgba z-50 text-center mx-auto flex justify-center items-center rounded-xl p-8">
                <button
                  className="text-white mb-52 text-2xl"
                  onClick={infoChanger}
                >
                  &times;
                </button>
                <div
                  dir="rtl"
                  className="flex flex-col justify-center items-center text-white mb-2"
                >
                  با سلام به سامانه سدره خوش آمدید<br></br> مرحله 1 - در این
                  قسمت راهنمای سامانه به شما کمک می کند که روش کار با سامانه را
                  یاد بگیرید.
                </div>
              </div>
            </SwiperSlide>
            <SwiperSlide>
              <div className="bg-black1-rgba text-center mx-auto flex justify-center items-center rounded-xl p-8 ">
                <button
                  className="text-white mb-52 text-2xl"
                  onClick={infoChanger}
                >
                  &times;
                </button>
                <div
                  dir="rtl"
                  className="flex flex-col justify-center items-center text-white mb-2 "
                >
                  مرحله 2 <br></br>در هدر سامانه لوگو، باکس سرچ، دکمه ارتباط با
                  ما و راهنمای سدره مشاهده می شود با کلیلک روی لوگو به سایت سدره
                  خواهید رفت با استفاده از باکس سرچ می توانید محدوده مورد نظر
                  خود را روی نقشه پیدا کنید با استفاده از دکمه ارتباط با ما می
                  توانید با سدره ارتباط برقرار کنید و پیام خود را ارسال کنید
                  دکمه راهنمای سدره هم همین آموزشی است که در اختیار شما قرار
                  داده شده است.
                </div>
              </div>
            </SwiperSlide>
            <SwiperSlide>
              <div className="bg-black1-rgba text-center mx-auto flex justify-center items-center rounded-xl p-8 ">
                <button
                  className="text-white mb-52 text-2xl"
                  onClick={infoChanger}
                >
                  &times;
                </button>
                <div
                  dir="rtl"
                  className="flex flex-col justify-center items-center text-white mb-2"
                >
                  مرحله 3 <br></br> این قسمت، نوار ابزار شما می باشد که می
                  توانید با آن نقشه را مدیریت کنید. به ترتیب از بالا کارکرد هر
                  ابزار را توضیح می دهیم : رسم محدوده با استفاده از مستطیل،
                  دایره، چند ضلعی و نقطه اندازه گیری مسافت، محیط و مساحت
                  بزرگنمایی نقشه کوچکنمایی نقشه تمام صفحه کردن نقشه.
                </div>
              </div>
            </SwiperSlide>
            <SwiperSlide>
              <div className="bg-black1-rgba text-center mx-auto flex justify-center items-center rounded-xl p-8 ">
                <button
                  className="text-white mb-52 text-2xl"
                  onClick={infoChanger}
                >
                  &times;
                </button>

                <div
                  dir="rtl"
                  className="flex flex-col justify-center items-center text-white mb-2"
                >
                  مرحله 4 <br></br>زمانی که مشخصات تصویر خود را مشخص و آن را در
                  نقشه مشاهده کنید، دو ابزار دیگر به نوار ابزرا اضافه خواهند شد.
                  دانلود کردن تصویر با فرمت tiff اسکرین شات از تصویر.
                </div>
              </div>
            </SwiperSlide>
            <SwiperSlide>
              <div className="bg-black1-rgba text-center mx-auto flex justify-center items-center rounded-xl p-8 ">
                <button
                  className="text-white mb-52 text-2xl"
                  onClick={infoChanger}
                >
                  &times;
                </button>
                <div
                  dir="rtl"
                  className="flex flex-col justify-center items-center text-white mb-2"
                >
                  مرحله 5 <br></br>این قسمت، منوی مدیریت تصاویر و محدوده ها می
                  باشد. به ترتیب از بالا کارکرد هر کدام از گزینه ها را توضیح می
                  دهیم : افزودن یک تصویر جدیده با توجه به محدوده مشخص شده -
                  مشاهده تصاویر ذخیره شده محدوده های ذخیره شده مقایسه 2 تصویر از
                  یک محدوه مشخص، در تاریخ های متفاوت لیست تصاویر دانلود شده
                  مشاهده زمان و تاریخ.
                </div>
              </div>
            </SwiperSlide>
            <SwiperSlide>
              <div className="bg-black1-rgba text-center mx-auto flex justify-center items-center rounded-xl p-8 ">
                <button
                  className="text-white mb-52 text-2xl"
                  onClick={infoChanger}
                >
                  &times;
                </button>
                <div
                  dir="rtl"
                  className="flex flex-col justify-center items-center text-white mb-2"
                >
                  مرحله 6 <br></br>در قسمت تصاویر، بعد از مشخص کرده محدوده مورد
                  نظر خود، با تعیین تاریخ می توانید تصویر جدیدی را ذخیره کنید و
                  آن را مشاهده یا دانلود کنید.
                </div>
              </div>
            </SwiperSlide>
            <SwiperSlide>
              <div className="bg-black1-rgba text-center mx-auto flex justify-center items-center rounded-xl p-8 ">
                <button
                  className="text-white mb-52 text-2xl"
                  onClick={infoChanger}
                >
                  &times;
                </button>
                <div
                  dir="rtl"
                  className="flex flex-col justify-center items-center text-white mb-2"
                >
                  مرحله 7 <br></br>در قسمت تصاویر، امکان مشاهده تصاویر ذخیره شده
                  وجود دارد. با کلیک روی هر تصویر می توانید آن را در نقشه مشاهده
                  کنید. در ضمن از نوار ابزار سمت چپ هم می توانید آن را دانلود
                  کنید یا اسکرین شات بگیرید.
                </div>
              </div>
            </SwiperSlide>
          </Swiper>
        </div>
      </div>
    </>
  );
};

export default Info;
