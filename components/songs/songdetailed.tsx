// components/SongDetailView.tsx

import React from 'react';
import { Button } from "@/components/ui/button";


interface SongDetailViewProps {
  songData: {
    title?: string;
    'first-release-date'?: string;
    'artist-credit'?: {
      name: string;
    }[];
    'writers'?: {
      name: string;
    }[];
    'producers-credit'?: {
      name: string;
    }[];
    'composers'?: {
      name: string;
    }[];
    'lyricists'?: {
      name: string;
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

  return (
    <div className="max-w-4xl mx-auto p-8 bg-white">
      <div className="flex items-start space-x-6">
      <img
          alt="Album cover"
          className="w-32 h-32"
          height="128"
          src="/placeholder.svg"
          style={{
            aspectRatio: "128/128",
            objectFit: "cover",
          }}
          width="128"
        />
        <div className="flex flex-col space-y-2">
          <h1 className="text-4xl font-bold">{title}</h1>
          <p className="text-xl">
          {
              artists ? 
                artists.map((artist, index) => (
                  <span key={index}>
                    {index > 0 && ', '}
                    {artist.name}
                  </span>
                )) 
              : <span>No artists found</span>
          }
          </p>
          <p className="text-gray-600">Released: {releaseDate}</p>
          
          </div>

          <div className="mt-6 flex space-x-4">
            <button className="inline-flex items-center justify-center rounded-md text-sm font-medium ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 hover:bg-primary/90 h-10 px-4 py-2 bg-black text-white"> Add to Favorites</button>
            <button className="inline-flex items-center justify-center rounded-md text-sm font-medium ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 border border-input bg-background hover:bg-accent hover:text-accent-foreground h-10 px-4 py-2">Bad Data</button>
            <button className="inline-flex items-center justify-center rounded-md text-sm font-medium ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 bg-secondary text-secondary-foreground hover:bg-secondary/80 h-10 px-4 py-2">
              Claim
            </button>        
          </div>
        </div>
      <div className="mt-8">
        <h2 className="text-2xl font-semibold mb-4">MAIN ARTIST</h2>
        <div className="grid grid-cols-2 gap-4 mb-8">
          { artists?
            artists.map((artist, index) => (
            <Button
              key={index}
            >
              {artist.name}
            </Button>
          )): <span>Nada</span>}
        </div>
          <h2 className="text-2xl font-semibold">SONGWRITERS</h2>
          <div className="mt-2 grid grid-cols-2 gap-4">
            {writers && writers.length > 0 ? (
              writers.map((songwriter, index) => (
                <button className="inline-flex items-center justify-center rounded-md text-sm font-medium ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 border border-input bg-background hover:bg-accent hover:text-accent-foreground h-10 px-4 py-2"
                  key={index}
                >
                  {songwriter.name}
                </button>
              ))
            ) : (
              <p>No songwriters found</p>
            )}
          </div>

          <h2 className="text-2xl font-semibold">COMPOSERS</h2>
          <div className="grid grid-cols-2 gap-4">
          {composers && composers.length > 0 ? (
            composers.map((composer, index) => (
              <button className="inline-flex items-center justify-center rounded-md text-sm font-medium ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 border border-input bg-background hover:bg-accent hover:text-accent-foreground h-10 px-4 py-2"
                key={index}
   
              >
                {composer.name}
              </button>
            ))
          ) : (
            <p>No composers found</p>
          )}
          </div>
          <h2 className="text-2xl font-semibold">LYRICISTS</h2>
          <div className="mt-2 grid grid-cols-2 gap-4">
          {lyricists && lyricists.length > 0 ? (
            lyricists.map((lyricist, index) => (
              <button className="inline-flex items-center justify-center rounded-md text-sm font-medium ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 border border-input bg-background hover:bg-accent hover:text-accent-foreground h-10 px-4 py-2"
                key={index}
              >
                {lyricist.name}
              </button>
            ))
          ) : (
            <p>No lyricists found</p>
          )}
        </div>
          <h2 className="text-2xl font-semibold">PRODUCERS</h2>
          <div className="mt-2 grid grid-cols-2 gap-4">
          {producers && producers.length > 0 ? (
            producers.map((producer, index) => (
              <button className="inline-flex items-center justify-center rounded-md text-sm font-medium ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 border border-input bg-background hover:bg-accent hover:text-accent-foreground h-10 px-4 py-2"
                key={index}
      
              >
                {producer.name}
              </button>
            ))
          ) : (
            <p>No producers found</p>
          )}
        </div>
        </div>
    </div>
  );
};

export default SongDetailView;