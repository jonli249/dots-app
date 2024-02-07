import React from 'react';
import { Button } from "@/components/ui/button";
import Image from 'next/image';
import Navbar from '../main/navbar';
import Link from 'next/link';


interface SongDetailViewProps {
  songData: {
    title?: string;
    'first-release-date'?: string;
    'artist-credit'?: {
      name: string;
      id: string; 

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
  } = songData;

  const allwriters = [
    ...(writers || []),
    ...(composers || []),
    ...(lyricists || []),
  ];

  return (
    <div>

    <Navbar />
    <div className="max-w-4xl mx-auto p-8 bg-white">
      <div className="flex items-start space-x-6">
        <Image 
          alt="Album cover"
          className="w-32 h-32"
          height="128"
          src="/album.svg"
          style={{
            aspectRatio: "128/128",
            objectFit: "cover",
          }}
          width="24"
        />
        <div className="flex flex-col space-y-2 flex-grow"> {/* Added flex-grow */}
            <div className="flex items-center justify-between"> {/* Added flex container */}
              <div>
                <h1 className="text-4xl font-bold">{title}</h1>
                <p className="text-xl">
                  {artists ?
                    artists.map((artist, index) => (
                      <span key={index}>
                        {index > 0 && ', '}
                        <Link href={`/artists/${artist.id}`}>
                          {artist.name}
                        </Link>
                      </span>
                    ))
                    : <span>No artists found</span>}
                </p>
                <p className="text-gray-600">Released: {releaseDate}</p>
              </div>
              <div className="ml-auto flex items-center space-x-2">
                <Button className="bg-gray-200 hover:bg-gray-300">Bad Data</Button>
              </div>
            </div>
          </div>
        </div>
      

      <div className="mt-8">
        <h2 className="text-l font-semibold mb-4 text-gray-500">MAIN ARTIST</h2>
        <div className="grid grid-cols-2 gap-4 mb-8">
          { artists?
            artists.map((artist, index) => (
              <Button variant="outline" key={index}>
                <Link href={`/artists/${artist.id}`}> {/* Use Link for artist */}
                    {artist.name}
                  </Link>
              </Button>
            )) : <span>Nada</span>}
        </div>

        <h2 className="text-l font-semibold mb-4 text-gray-500">SONGWRITERS</h2>
        <div className="grid grid-cols-2 gap-4 mb-8">
          {allwriters && allwriters.length > 0 ? (
            allwriters.map((songwriter, index) => (
              <Button variant="outline" key={index}>
                <Link href={`/artists/${songwriter.id}`}> {/* Use Link for songwriter */}
                    {songwriter.name}
                  </Link>
              </Button>
            ))
          ) : (
            <p>No songwriters found</p>
          )}
        </div>

        <h2 className="text-l font-semibold mb-4 text-gray-500">PRODUCERS</h2>
        <div className="grid grid-cols-2 gap-4 mb-8">
          {producers && producers.length > 0 ? (
            producers.map((producer, index) => (
              <Button variant="outline" key={index}>
                <Link href={`/artists/${producer.id}`}> 
                    {producer.name}
                  </Link>
              </Button>
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
