import React from 'react';
import Link from 'next/link';
import Image from 'next/image';

interface PersonCardProps {
  id: string;
  name: string;
  imageUrl?: string; // Optional image URL for the person's picture
}

const PersonCard: React.FC<PersonCardProps> = ({ id, name, imageUrl }) => {

    const imageSrc = imageUrl || '/avatar.png';
    
  return (
    <div className="flex items-center bg-white shadow-md rounded-xl overflow-hidden hover:shadow-lg transition-shadow duration-300 cursor-pointer">
      <Link href={`/artists/${id}`} className="flex items-center no-underline text-black">
        <div className="flex-shrink-0 w-16 h-16 relative mr-4">
          <Image 
            src={imageSrc} 
            alt="Person"
            layout="fill" 
            objectFit="cover" 
            className="rounded-full shadow-sm p-2" />
        </div>
        <div className="text-md font-semibold">
          {name}
        </div>
      </Link>
    </div>
  );
};

export default PersonCard;
