import Image from "next/image";
import React from "react";
interface RecommendCardProps {
  item: any;
}
const RecommendCard: React.FC<RecommendCardProps> = ({ item }) => {
  return (
    <div className="w-[175px] sm:w-[185px] cursor-pointer hover:border-[#DDD3A0] hover:shadow-[0.832px_1.665px_4.162px_0px_rgba(0,0,0,0.10)] transition duration-300 ease-in-out  h-[49px] px-3 border bg-white shadow-[2.445px_4.89px_12.225px_0px_rgba(0,0,0,0.10)] border-black rounded-[75px] flex gap-1 sm:gap-[17px] items-center ">
      <Image src="/taylor-img.png" width={33} height={33} alt="harry-image" />
      <p className="text-black whitespace-nowrap text-center font-Telegraf-ultrabold  text-[14px] sm:text-[16px] font-extrabold">
        {item.name}
      </p>
    </div>
  );
};

export default RecommendCard;
