import React from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/navigation";
import { Navigation } from "swiper/modules";
import Image from "next/image";
import { taylorswift } from "../../icons/Helper";
import { SwiperIcon } from "../../icons/Icons";

export default function DegreesSwiper() {
  return (
    <Swiper
      centeredSlides={true}
      spaceBetween={20}
      breakpoints={{
        768: {
          direction: "vertical",
        },
      }}
      direction={"horizontal"}
      navigation={{
        nextEl: ".swiper-button-next",
        prevEl: ".swiper-button-prev",
      }}
      modules={[Navigation]}
      className="mySwiper direc max-w-[290px] md:max-w-[715px] lg:max-w-[800px] px-3 w-full z-0 mx-auto max-md:h-[240px] md:!h-[50px] mt-[26px]"
    >
      {taylorswift.map((items: any, index: any) => (
        <SwiperSlide key={index}>
          <div className="flex max-md:flex-col justify-start lg:justify-center items-center">
            <div className="max-w-[192px] w-full h-[49px] border bg-white shadow-[2.445px_4.89px_12.225px_0px_rgba(0,0,0,0.10)] border-black rounded-[75px] font-extrabold flex gap-[17px] items-center px-3 py-[15px]">
              <Image
                src={items.img}
                width={33}
                height={33}
                alt="harry-image"
                className="!w-[33px] !h-[33px]"
              />
              <p className="text-black text-center font-telegraf text-[16px] font-extrabold leading-normal">
                {items.name}
              </p>
            </div>
            <div className="w-[42px] max-md:w-[2px] max-md:h-[42px] h-[2px] bg-black"></div>
            <div className="max-w-[192px] w-full h-[49px] border bg-white shadow-[2.445px_4.89px_12.225px_0px_rgba(0,0,0,0.10)] border-black rounded-[75px] font-extrabold flex gap-[17px] items-center px-3 py-[15px]">
              <Image
                src={items.img2}
                width={33}
                height={33}
                alt="harry-image"
                className="!w-[33px] !h-[33px]"
              />
              <p className="text-black text-center font-telegraf text-[16px] font-extrabold leading-normal">
                {items.name2}
              </p>
            </div>
            <div className="w-[42px] max-md:w-[2px] max-md:h-[42px] h-[2px] bg-black"></div>

            <div className="max-w-[192px] w-full h-[49px] border bg-white shadow-[2.445px_4.89px_12.225px_0px_rgba(0,0,0,0.10)] border-black rounded-[75px] font-extrabold flex gap-[17px] items-center px-3 py-[15px]">
              <Image
                src={items.img3}
                width={33}
                height={33}
                alt="harry-image"
                className="!w-[33px] !h-[33px]"
              />
              <p className="text-black text-center font-telegraf text-[16px] font-extrabold leading-normal">
                {items.name3}
              </p>
            </div>
          </div>
        </SwiperSlide>
      ))}

      {/* navigation */}
      <div>
        <div className="swiper-button-prev md:!right-0 !top-[49%] md:!top-[5px] md:rotate-180 rotate-[90deg] !left-[0%] md:!left-auto">
          <SwiperIcon />
        </div>
        <div className="swiper-button-next md:!left-auto max-md:rotate-[270deg] !right-[2%] md:!right-0 !top-[48%] md:!top-[42px]">
          <SwiperIcon />
        </div>
      </div>
    </Swiper>
  );
}
