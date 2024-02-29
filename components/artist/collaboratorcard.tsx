import React from 'react';
import Link from 'next/link';
import Image from 'next/image';


interface PersonCardProps {
  id: string;
  name: string;
  imageUrl?: string; 
  onClick?: (id: string) => void;
}

const CollaboratorCard: React.FC<PersonCardProps> = ({ id, name, imageUrl, onClick}) => {

    const imageSrc = imageUrl || '/avatar.png';

    const handleClick = (event: React.MouseEvent<HTMLDivElement>) => {
        if (onClick) {
          event.preventDefault(); // Prevent default if custom onClick is provided
          onClick(id);
        }
      };
    
  return (
    <div onClick={handleClick} className="relative flex items-center bg-white shadow-md rounded-full overflow-hidden border border-black hover:shadow-lg transition-shadow duration-300 cursor-pointer mb-2">


        <Link href={`/artists/${id}`} className="flex items-center no-underline text-black">
            <div className="flex-shrink-0 w-14 h-14 relative mr-2">
            <Image 
                src={imageSrc} 
                alt="Person"
                layout="fill" 
                objectFit="cover" 
                className="rounded-full shadow-sm p-2" />
            </div>
            <div className="text-md font-semibold mr-8">
            {name}
            </div>
        </Link>
        </div>
        );
    };

export default CollaboratorCard;
