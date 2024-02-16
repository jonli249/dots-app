// components/SongItem.tsx
import React from 'react';
import Link from 'next/link';
import Image from 'next/image';


interface SongItemProps {
  title: string;
  artistCredit?: { name: string }[];
  coverImage?: string;
  _id: string;
  geniusData?: {
    header_image_thumbnail_url?: string, 
  }
}

const SongItem: React.FC<SongItemProps> = ({ title, artistCredit, _id, geniusData}) => {
  const photoSource = geniusData?.header_image_thumbnail_url || '/album.png';

  return (
    <Link href={`/songs/${_id}`}>
      <div className="flex items-center w-full sm:w-52 border border-gray-300 rounded-md p-2 m-2 overflow-hidden">
        {/* Left side with square image */}
        <div className="flex-shrink-0 w-16 h-16 sm:w-20 sm:h-20 overflow-hidden rounded-md">
          <Image
            src={photoSource}
            alt="Album Cover"
            width={16} 
            height={16} 
            layout="responsive"
            className="object-cover"
          />
        </div>
        {/* Right side with title and artists */}
        <div className="ml-2 flex-grow">
          <h2 className="text-xs sm:text-sm font-semibold truncate">
            {title}
          </h2>
          <p className="text-xs sm:text-sm text-gray-500 truncate">
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

    </Link>
  );
};

export default SongItem;
