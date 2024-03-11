import React from "react";
import Link from "next/link";
import Image from "next/image";

interface PersonCardProps {
  id: string;
  name: string;
  strArtistThumb?: string;
  onClick?: () => void;
}
const PersonCard: React.FC<PersonCardProps> = ({
  id,
  name,
  strArtistThumb,
  onClick,
}) => {
  const imageSrc = strArtistThumb || "/avatar.png";

  const cardStyle =
    "flex-shrink-0 shadow-md rounded-full overflow-hidden hover:shadow-lg transition-shadow duration-300 border cursor-pointer mb-2";
  const imageContainerStyle = "flex-shrink-0 w-14 h-14 relative mr-4";
  const imageStyle = "rounded-full shadow-sm";

  return (
    <div className="relative w-[208px] h-[53px]">
      <Image
        className="absolute right-0 z-10 top-[-7px]"
        src="/verified.png"
        width={30}
        height={30}
        alt="verified"
      />
      <div
        onClick={onClick}
        className={`${cardStyle} relative w-[208px] h-[53px]`}
      >
        <Link
          href={`/artists/${id}`}
          className="flex items-center no-underline gap-4 text-black px-3 py-2 "
        >
          <div className={` flex items-center `}>
            <div className="relative w-9 h-9 p-2">
              <Image
                src={imageSrc}
                alt="Person"
                layout="fill"
                objectFit="cover"
                className={imageStyle}
              />
            </div>
          </div>
          <div className="text-md font-semibold truncate">{name}</div>
        </Link>
      </div>
    </div>
  );
};

export default PersonCard;
