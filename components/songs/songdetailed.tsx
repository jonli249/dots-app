import React from 'react';
import { Button } from "@chakra-ui/react";
import Image from 'next/image';
import Navbar from '../main/navbar';
import Link from 'next/link';
import PersonCard from '../artist/personcard';
import { Toaster, toast } from 'sonner';
import axios from 'axios';
import { WarningTwoIcon } from '@chakra-ui/icons';



interface SongDetailViewProps {
  songData: {
    title?: string;
    'first-release-date'?: string;
    'artist-credit'?: {
      name: string;
      'artist':
      {
        id: string;
      } 

    }[];
    'writers'?: {
      name: string;
      id: string; 
    }[];
    'producers-credit'?: {
      name: string;
      id: string; 
    }[];
    'composers'?: {
      name: string;
      id: string; 
    }[];
    'lyricists'?: {
      name: string;
      id: string; 
    }[];
    _id: string;
  };
}

const SongDetailView: React.FC<SongDetailViewProps> = ({ songData }) => {
  const {
    title,
    'first-release-date': releaseDate,
    'artist-credit': artists,
    'writers': writers,
    'producers-credit': producers,
    'composers': composers,
    'lyricists': lyricists,
    '_id': id2,
  } = songData;
  

  const allwriters = [
    ...(writers || []),
    ...(composers || []),
    ...(lyricists || []),
  ];

  const handleButtonClick = async () => {
    try {
      
        const response =  await axios.post(`https://us-east-1.aws.data.mongodb-api.com/app/dotstester-bpjzg/endpoint/badsongdata=${id2}`);
        if (response.status === 200) {
          toast.success('Thanks for the feedback!');
        } else {
          toast.error('Failed to mark bad data');
        }
        
    } catch (error) {
      console.error('Error updating document timestamp:', error);
    }
  };

  


  return (
    <div>
    <Navbar />
    <div className="max-w-4xl mx-auto p-8 bg-white">
      <div className="flex items-start space-x-6">
        <Image 
          alt="Album cover"
          className="w-32 h-32 rounded-l"
          height={400}
          width={400}
          src="/album.png"
          style={{
            aspectRatio: "128/128",
            objectFit: "cover",
          }}
        />
        <div className="flex flex-col space-y-2 flex-grow"> 
            <div className="flex items-center justify-between"> 
              <div>
                <h1 className="text-4xl font-bold">{title}</h1>
                <p className="text-xl">
        
                  {artists ?
                    artists.map((artist, index) => (
                      <span key={index}>
                        {index > 0 && ', '}
                        <Link href={`/artists/${artist.artist.id}`}>
                          {artist.name}
                        </Link>
                      </span>
                    ))
                    : <span>No artists found</span>}
                </p>
                <p className="text-gray-600">Released: {releaseDate}</p>
              </div>
              <div className="ml-auto flex items-center space-x-2">
                <Toaster />
                <Button className="bg-gray-200 hover:bg-gray-300" leftIcon={<WarningTwoIcon/>} onClick={handleButtonClick}>
                Bad Data
                </Button>
              </div>
            </div>
          </div>
        </div>
      

      <div className="mt-8">
        <h2 className="text-l font-semibold mb-4 text-gray-500">MAIN ARTIST</h2>
        <div className="grid grid-cols-2 gap-4 mb-8">
          { artists?
            artists.map((artist, index) => (
              <PersonCard
              key={artist.artist.id}
              id={artist.artist.id}
              name={artist.name}
              imageUrl='/avatar.png' // Replace with your image path or pass dynamically
            />
            )) : <span>Nada</span>}
        </div>

        <h2 className="text-l font-semibold mb-4 text-gray-500">SONGWRITERS</h2>
        <div className="grid grid-cols-2 gap-4 mb-8">
          {allwriters && allwriters.length > 0 ? (
            allwriters.map((songwriter, index) => (
              <PersonCard
              key={songwriter.id}
              id={songwriter.id}
              name={songwriter.name}
              imageUrl='/avatar.png' // Replace with your image path or pass dynamically
            />
            ))
          ) : (
            <p>No songwriters found</p>
          )}
        </div>

        <h2 className="text-l font-semibold mb-4 text-gray-500">PRODUCERS</h2>
        <div className="grid grid-cols-2 gap-4 mb-8">
          {producers && producers.length > 0 ? (
            producers.map((producer, index) => (
              <PersonCard
              key={producer.id}
              id={producer.id}
              name={producer.name}
              imageUrl='/avatar.png' // Replace with your image path or pass dynamically
            />
            ))
          ) : (
            <p>No producers found</p>
          )}
        </div>
      </div>
    </div>
    </div>
  );
};

export default SongDetailView;
