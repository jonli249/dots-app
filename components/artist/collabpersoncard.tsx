import React from 'react';
import Link from 'next/link';
import Image from 'next/image';

interface PersonCardProps {
  id: string;
  name: string;
  imageUrl?: string; 
  count?: number;
}

const CollabCard: React.FC<PersonCardProps> = ({ id, name, imageUrl, count}) => {

    const imageSrc = imageUrl || '/avatar.png';
    
  return (
    
    <div className="relative flex items-center bg-white shadow-md rounded-full overflow-hidden border border-black hover:shadow-lg transition-shadow duration-300 cursor-pointer mb-2">

        <div className="absolute right-2 top-2 bg-red-500 text-white text-xs rounded-full h-6 w-6 flex items-center justify-center">
            {count}
        </div>

        <Link href={`/artists/${id}`} className="flex items-center no-underline text-black">
            <div className="flex-shrink-0 w-14 h-14 relative mr-2">
            <Image 
                src={imageSrc} 
                alt="Person"
                layout="fill" 
                objectFit="cover" 
                className="rounded-full shadow-sm p-2" />
            </div>
            <div className="text-sm font-semibold mr-8">
            {name}
            </div>
        </Link>
        </div>
        );
    };

export default CollabCard;


