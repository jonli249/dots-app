import Image from "next/image";
import React from "react";
interface RecommendCardProps {
  item: any;
}
const RecommendCard: React.FC<RecommendCardProps> = ({ item }) => {
  return (
    <div className="w-[175px] sm:w-[192px] h-[49px] border bg-white shadow-[2.445px_4.89px_12.225px_0px_rgba(0,0,0,0.10)] border-black rounded-[75px] flex gap-1 sm:gap-[17px] items-center px-3 py-[15px]">
      <Image src="/taylor-img.png" width={33} height={33} alt="harry-image" />
      <p className="text-black whitespace-nowrap text-center font-telegraf text-[14px] sm:text-[18px] font-extrabold">
        {item.name}
      </p>
    </div>
  );
};

export default RecommendCard;
