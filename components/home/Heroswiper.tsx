import React from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import { Autoplay, Pagination, Navigation } from "swiper/modules";
import { swiperData } from "../icons/Helper";

export default function Heroswiper() {
  return (
    <Swiper
      loop={true}
      spaceBetween={10}
      centeredSlides={true}
      slidesPerView={3}
      autoplay={{
        delay: 13000,
        disableOnInteraction: false,
      }}
      breakpoints={{
        320: {
          slidesPerView: 3,
          spaceBetween: 10,
        },
        640: {
          slidesPerView: 4,
          spaceBetween: 100,
        },
        768: {
          slidesPerView: 4,
          spaceBetween: 10,
        },
        1024: {
          slidesPerView: 3,
          spaceBetween: 150,
        },
      }}
      navigation={true}
      modules={[Autoplay, Pagination, Navigation]}
      className="mySwiper flex gap-4"
    >
      {swiperData.map((item, index) => (
        <SwiperSlide key={index}>
          {" "}
          <div>
            {" "}
            <button
              type="submit"
              className=" px-4 slideanihero py-1 lg:py-3 rounded-[10px] w-[100px] sm:w-[165px] lg:w-[255px] h-[48px] sm:h-[52px] lg:h-[74px] border border-[#CDCDCD] bg-[rgba(255,255,255,0.30);] shadow-[2px_ 4px_10px_0px_rgba(0,0,0,0.10);] text-black text-[14px] sm:text-[20px] lg:text-[35px] font-semibold font-inter"
            >
              {item.name}
            </button>{" "}
          </div>
        </SwiperSlide>
      ))}
    </Swiper>
  );
}
