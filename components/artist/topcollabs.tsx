import Image from "next/image";
import React from "react";
import { datamap } from "../icons/Helper";

const TopCollabs = () => {
  return (
    <div className="px-3">
      <div className=" mb-8 px-3 bg-[url(/Hero-Bg-round.png)] bg-no-repeat bg-center bg-cover max-w-[826px] w-full mx-auto py-5 md:py-2 rounded-2xl">
        <div className="max-w-[713px] w-full mx-auto flex max-md:flex-col gap-7 sm:gap-5 items-center justify-between">
          <div className="p-6 border-black border flex justify-center items-center w-[235px] h-[235px] rounded-[100%]">
            <div className="p-6 border-black border w-full h-full rounded-[100%] flex justify-center items-center">
              <div className="border-black border w-full h-full flex justify-center items-center rounded-[100%]">
                <Image
                  src="/girl-img.png"
                  width={97}
                  height={97}
                  alt="girl-img.png"
                />
              </div>
            </div>
          </div>

          <div>
            <p className="text-[#fff] max-sm:text-center text-[20px] not-italic font-extrabold leading-[normal]">
              Top Collaborators
            </p>

            <div className="grid sm:grid-cols-4 grid-cols-2 gap-7 sm:gap-5 justify-center pt-[23px]">
              {datamap.map((item, index) => (
                <div
                  key={index}
                  className="relative  border-[1.035px_solid_#9E9E9E] bg-[#fff] w-[96px] h-[120px] rounded-[15.104px] shadow-[2.07px_4.141px_10.352px_0px_rgba(0,0,0,0.10)]"
                >
                  <div
                    className={`${item.valueBg} w-[38px] h-[38px] rounded-[100%] absolute right-[-11px] top-[-11px] flex justify-center items-center`}
                  >
                    <p className="text-[#FFF] text-center text-[12.767px] not-italic font-extrabold leading-[normal]">
                      {item.value}
                    </p>
                  </div>

                  <div className="px-[23px] pt-[19px] pb-[18px]">
                    <Image
                      src={item.imgSrc}
                      width={49}
                      height={49}
                      alt="man-img-src"
                    />

                    <p className="text-center text-[#000] text-[11px] font-extrabold">
                      {item.personName}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default TopCollabs;
