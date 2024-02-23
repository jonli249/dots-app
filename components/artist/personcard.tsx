import React from 'react';
import Link from 'next/link';
import Image from 'next/image';

interface PersonCardProps {
  id: string;
  name: string;
  strArtistThumb?: string; // Optional image URL for the person's picture
}
const PersonCard: React.FC<PersonCardProps> = ({ id, name, strArtistThumb}) => {
    const imageSrc = strArtistThumb || '/avatar.png';

    const cardStyle = "flex-shrink-0 shadow-md rounded-full overflow-hidden hover:shadow-lg transition-shadow duration-300 border cursor-pointer mb-2";
    const imageContainerStyle = "flex-shrink-0 w-14 h-14 relative mr-4"; 
    const imageStyle = "rounded-full shadow-sm"; 
  
    return (
      <div className={`${cardStyle} w-[250px] h-[60px]`}>
        <Link href={`/artists/${id}`} className="flex items-center no-underline text-black p-1">
          <div className={`${imageContainerStyle}`}>
            <div className="relative w-12 h-12 p-2">
              <Image 
                src={imageSrc} 
                alt="Person"
                layout="fill" 
                objectFit="cover" 
                className={imageStyle} />
            </div>
          </div>
          <div className="text-md font-semibold truncate">
            {name}
          </div>
        </Link>
      </div>
    );
  };
  
  export default PersonCard;