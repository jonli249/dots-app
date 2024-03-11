// components/SongItem.tsx
import React from "react";
import Link from "next/link";
import Image from "next/image";

interface SongItemProps {
  title: string;
  artistCredit?: { name: string; artist: { name: string } }[];
  coverImage?: string;
  _id: string;
  geniusData?: {
    header_image_thumbnail_url?: string;
  };
  onClick?: () => void;
}

const SongItem: React.FC<SongItemProps> = ({
  title,
  artistCredit,
  _id,
  geniusData,
  onClick,
}) => {
  const photoSource = geniusData?.header_image_thumbnail_url || "/album.png";
  return (
    <Link
      onClick={onClick}
      href={`/songs/${_id}`}
      className="max-w-[203px] w-full "
    >
      <div className=" cursor-pointer h-[70px] max-sm:mx-auto rounded-[15px] border border-[#696969] bg-white shadow-[2.089px_4.178px_10.446px_0px_rgba(0,0,0,0.10)] py-[14px] pl-3 flex items-center gap-2 hover:border-[#DDD3A0] hover:shadow-[#DDD3A0] hover:border-[3px] hover:shadow-xl duration-150">
        <Image
          src={photoSource}
          alt="Album Cover"
          width={41}
          height={41}
          layout="responsive"
          className="object-cover rounded-[5px] border !h-[41px] !w-[41px] border-black"
        />
        <div className="flex flex-col  items-start pr-1">
          <p className="text-black font-telegraf line-clamp-1 font-extrabold leading-normal text-[13px]">
            {title}
          </p>
          <p className="text-black text-[9px] line-clamp-1 font-telegraf font-normal leading-normal">
            {artistCredit && artistCredit.length > 0
              ? artistCredit.map((artist, index) => (
                  <span key={artist.name}>
                    {index > 0 && ", "}
                    {artist.name ||
                      (artist.artist && artist.artist.name) ||
                      "Unknown Artist"}
                  </span>
                ))
              : "Unknown Artist"}
          </p>
        </div>
      </div>
    </Link>
  );
};

export default SongItem;
