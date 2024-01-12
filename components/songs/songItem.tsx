// components/SongItem.tsx
import React from 'react';
import Link from 'next/link';


interface SongItemProps {
  title: string;
  artists?: { name: string }[];
  coverImage: string;
  _id : string;
}

const SongItem: React.FC<SongItemProps> = ({ title, artists = [], coverImage, _id }) => {
  return (
    <Link href={`/songs/${_id}`}>
    <div className="flex flex-col items-center w-42 h-14 border border-gray-300 rounded-md p-2 m-2">
      {/* Set width longer than height, reduce size, and add margin */}
      <img
        src={coverImage}
        alt={`${title} cover`}
        className="w-14 h-14 object-cover rounded-md border border-gray-300"
        style={{ minWidth: '1rem', minHeight: '1rem' }}
      />
      <div className="flex flex-col justify-center text-center">
        <h2 className="text-xs sm:text-sm md:text-base lg:text-lg font-semibold">
          {title}
        </h2>
        <p className="text-xxs sm:text-xs md:text-sm lg:text-base text-gray-500">
          {artists.length > 0 ? artists.map((artist) => artist.name).join(', ') : 'Unknown Artist'}
        </p>
      </div>
    </div>
    </Link>
  );
};

export default SongItem;
