// components/SongDetailView.tsx

import React from 'react';

interface SongDetailViewProps {
  songData: {
    title: string;
    'first-release-date': string;
    'artist-credit': {
      name: string;
    }[];
    'songwriters': {
      name: string;
    }[];
    'producer-credit': {
      name: string;
    }[];
    'composers': {
      name: string;
    }[];
    'lyricists': {
      name: string;
    }[];
  };
}

const SongDetailView: React.FC<SongDetailViewProps> = ({ songData }) => {
  const {
    title,
    'first-release-date': releaseDate,
    'artist-credit': artists,
    'songwriters': songwriters,
    'producer-credit': producers,
    'composers': composers,
    'lyricists': lyricists,
  } = songData;

  return (
    <div className="max-w-4xl mx-auto p-8 bg-white">
      <div className="flex flex-col lg:flex-row lg:items-start lg:space-x-8">
        <div className="flex-shrink-0">
          {/* Blank box */}
          <div
            className="w-48 h-48 bg-black"
            style={{
              aspectRatio: "200/200",
            }}
          />
        </div>
        <div className="mt-2 lg:mt-0 lg:flex-1">
          <h1 className="text-4xl font-bold">{title}</h1>
          <p className="text-xl mt-1">
            {artists.map((artist, index) => (
              <span key={index}>
                {index > 0 && ', '}
                {artist.name}
              </span>
            ))}
          </p>
          <p className="text-gray-600">Released {releaseDate}</p>
          {/* ... Rest of the component remains unchanged */}
          {/* ... */}
        </div>
      </div>
      <div className="mt-3">
        <h2 className="text-2xl font-semibold">MAIN ARTISTS</h2>
        <div className="mt-2">
          {artists.map((artist, index) => (
            <button
              key={index}
              className="border border-gray-600 p-2 rounded-md"
            >
              {artist.name}
            </button>
          ))}
        </div>
      </div>
      <div className="mt-3">
        <h2 className="text-2xl font-semibold">SONGWRITERS</h2>
        <div className="mt-2">
          {songwriters && songwriters.length > 0 ? (
            songwriters.map((songwriter, index) => (
              <button
                key={index}
                className="border border-gray-600 p-2 rounded-md"
              >
                {songwriter.name}
              </button>
            ))
          ) : (
            <p>No songwriters found</p>
          )}
        </div>
      </div>
      <div className="mt-3">
        <h2 className="text-2xl font-semibold">COMPOSERS</h2>
        <div className="mt-2">
          {composers && composers.length > 0 ? (
            composers.map((composer, index) => (
              <button
                key={index}
                className="border border-gray-600 p-2 rounded-md"
              >
                {composer.name}
              </button>
            ))
          ) : (
            <p>No composers found</p>
          )}
        </div>
      </div>
      <div className="mt-3">
        <h2 className="text-2xl font-semibold">LYRICISTS</h2>
        <div className="mt-2">
          {lyricists && lyricists.length > 0 ? (
            lyricists.map((lyricist, index) => (
              <button
                key={index}
                className="border border-gray-600 p-2 rounded-md"
              >
                {lyricist.name}
              </button>
            ))
          ) : (
            <p>No lyricists found</p>
          )}
        </div>
      </div>
      <div className="mt-3">
        <h2 className="text-2xl font-semibold">PRODUCERS</h2>
        <div className="mt-2">
          {producers && producers.length > 0 ? (
            producers.map((producer, index) => (
              <button
                key={index}
                className="border border-gray-600 p-2 rounded-md"
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