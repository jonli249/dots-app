// components/SongItem.tsx
import React from 'react';
import Link from 'next/link';
import Image from 'next/image';


interface SongItemProps {
  title: string;
  artistCredit?: { name: string }[];
  coverImage: string;
  _id: string;
}

const SongItem: React.FC<SongItemProps> = ({ title, artistCredit, coverImage, _id }) => {
  const photoSource = coverImage || '/album.png';

  return (
    <Link href={`/songs/${_id}`}>
      <div className="flex items-center w-44 sm:w-52 border border-gray-300 rounded-md p-1 sm:p-2 m-2 overflow-hidden">
        {/* Left side with square image */}
        <div className="flex-shrink-0">
          <div className="w-12 h-12 sm:w-14 sm:h-14 overflow-hidden rounded-md">
            <Image
              src={photoSource}
              alt="/album.png"
              width={36}
              height={36}
              layout="responsive"
              className="object-cover"
            />
          </div>
        </div>
        {/* Right side with title and artists */}
        <div className="ml-2 flex-grow">
          <div className="flex flex-col justify-center overflow-hidden">
            <h2 className="text-xxs sm:text-xs md:text-sm lg:text-sm font-semibold whitespace-nowrap overflow-hidden">
              {title}
            </h2>
            <p className="text-xxs sm:text-xs md:text-xs lg:text-sm text-gray-500 truncate">
              {artistCredit && artistCredit.length > 0
                ? artistCredit.map((artist, index) => (
                    <span key={artist.name}>
                      {index > 0 && ', '}

                       {artist.name}

                    </span>
                  ))
                : 'Unknown Artist'}
            </p>
          </div>
        </div>
      </div>
    </Link>
  );
};

export default SongItem;
