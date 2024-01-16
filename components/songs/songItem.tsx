// components/SongItem.tsx
import React from 'react';
import Link from 'next/link';
import Image from 'next/image';


interface SongItemProps {
  title: string;
  artists?: { name: string }[];
  coverImage: string;
  _id : string;
}

const SongItem: React.FC<SongItemProps> = ({ title, artists = [], coverImage, _id }) => {
    return (
        <Link href={`/songs/${_id}`}>
      <div className="flex items-center w-72 border border-gray-300 rounded-md p-2 m-2">
        {/* Left side with square image */}
        <div className="flex-shrink-0">
          <div className="w-14 h-14 overflow-hidden rounded-md">
            <Image
              src={coverImage}
              alt={`${title} cover`}
              width={32}
              height={32}
              layout="responsive"
              className="object-cover"
            />
          </div>
        </div>
        {/* Right side with title and artists */}
        <div className="ml-2 flex-grow">
          <div className="flex flex-col justify-center overflow-hidden">
            <h2 className="text-xs sm:text-sm md:text-base font-semibold whitespace-nowrap overflow-hidden">
              {title}
            </h2>
            <p className="text-xxs sm:text-xs md:text-sm lg:text-base text-gray-500">
              {artists.length > 0
                ? artists.map((artist) => artist.name).join(', ')
                : 'Unknown Artist'}
            </p>
          </div>
        </div>
      </div>
    </Link>
  );
};

export default SongItem;
