import React, { useState } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import { Autoplay } from "swiper/modules";
import { swiperData } from "../icons/Helper";

export default function Heroswiper() {
  const [activeSlide, setActiveSlide] = useState(1);

  const onTransitionStart = (swiper: any) => {
    setActiveSlide(swiper.realIndex);
  };

  return (
    <Swiper
      onSlideChange={onTransitionStart}
      loop={true}
      grabCursor={true}
      spaceBetween={10}
      centeredSlides={true}
      slidesPerView={3}
      autoplay={{
        delay: 3000,
        disableOnInteraction: false,
      }}
      breakpoints={{
        320: {
          spaceBetween: 10,
        },
        640: {
          spaceBetween: 100,
        },
        768: {
          spaceBetween: 10,
        },
        1024: {
          spaceBetween: 10,
        },
      }}
      navigation={true}
      modules={[Autoplay]}
      className="mySwiper"
    >
      {swiperData.map((item, index) => (
        <SwiperSlide key={index}>
          <button
            type="submit"
            className={`px-2 sm:px-4 py-1 lg:py-3 rounded-[10px] w-[85px] sm:w-[165px] lg:w-[255px] h-[48px] sm:h-[52px] lg:h-[74px] bg-[rgba(255,255,255,0.30)] shadow-[2px_ 4px_10px_0px_rgba(0,0,0,0.10)] text-black text-[14px] sm:text-[20px] lg:text-[35px] font-semibold font-inter ${
              activeSlide === index && "border border-[#CDCDCD]"
            }`}
          >
            {item.name}
          </button>
        </SwiperSlide>
      ))}
    </Swiper>
  );
}
