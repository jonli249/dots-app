import React from "react";
import Link from "next/link";
import Image from "next/image";

interface PersonCardProps {
  id: string;
  name: string;
  imageUrl?: string;
  count?: number;
  ogid?: string;
  onClick?: (id: string) => void;
}

const PopupCard: React.FC<PersonCardProps> = ({
  id,
  name,
  imageUrl,
  count,
  ogid, 
  onClick,
}) => {
  const imageSrc = imageUrl || "/avatar.png";

  const handleClick = (e: React.MouseEvent<HTMLDivElement, MouseEvent>) => {
    if (onClick) {
      e.preventDefault();  // Prevents the link from navigating
      onClick(id);
    }
  };

  return (
    <div className="relative" onClick={handleClick}>
      <div className="absolute right-0 z-10 top-[-7px] bg-red-500 text-white text-xs rounded-full h-6 w-6 flex items-center justify-center">
        {count}
      </div>

      <div className=" flex items-center bg-white shadow-md rounded-full overflow-hidden border border-black hover:shadow-lg transition-shadow duration-300 cursor-pointer mb-2">
          <div className="flex-shrink-0 w-14 h-14 relative mr-2">
            <Image
              src={imageSrc}
              alt="Person"
              layout="fill"
              objectFit="cover"
              className="rounded-full shadow-sm p-2"
            />
          </div>
          <p className="text-sm line-clamp-1 font-Telegraf-ultrabold font-semibold ">
            {name}
          </p>
        
      </div>
    </div>
  );
};

export default PopupCard;
