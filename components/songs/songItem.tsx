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
      className="border border-gray-300 rounded shadow-md"
    >
      <div className="flex items-center sm:w-40 rounded-md p-1 overflow-hidden ">
        <div className="flex-shrink-0 w-14 h-14 sm:w-12 sm:h-12 rounded-md">
          <Image
            src={photoSource}
            alt="Album Cover"
            width={16}
            height={16}
            layout="responsive"
            className="object-cover border border-black"
          />
        </div>
        <div className="ml-2 flex-shrink">
          <h2 className="text-xs sm:text-xs font-semibold truncate">{title}</h2>
          <p className="text-xs sm:text-xxs text-gray-500 truncate">
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
