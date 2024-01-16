// components/artist/ArtistSummary.tsx
import React, { useEffect, useState } from 'react';
import axios from 'axios';
import Image from 'next/image';

interface ArtistSummaryProps {
  artistId: string;
}

interface ArtistInfo {
  name: string;
  photoUrl: string;
  // Add other artist information fields here
}

const ArtistSummary: React.FC<ArtistSummaryProps> = ({ artistId }) => {
  const [artistInfo, setArtistInfo] = useState<ArtistInfo | null>(null);

  useEffect(() => {
    const fetchArtistSummary = async () => {
      try {
        const response = await axios.get(
          `https://us-east-1.aws.data.mongodb-api.com/app/dotstester-bpjzg/endpoint/artistdata?artistId=${artistId}`
        );

        if (response.data && response.data.name) {
            // Access the "name" field from the response
            const { name, photoUrl } = response.data;
            setArtistInfo({ name, photoUrl });
          } else {
            setArtistInfo(null);
            console.error('No artist information found');
          }
        } catch (error) {
          console.error('Error fetching artist information:', error);
          setArtistInfo(null);
        }
      };

    fetchArtistSummary();
  }, [artistId]);

  if (!artistInfo) {
    return <div>Loading artist information...</div>;
  }

  const photoSource = artistInfo.photoUrl || '/album.svg';


  return (
    <div className="flex items-center rounded border-slate-600 m-10">
      <div className="mr-4">
        <Image
          src={photoSource}
          alt="/album.svg"
          className="w-24 h-24 rounded-full"
          width={24}
          height={24}
        />
      </div>
      <div>
        <h1 className="font-bold mt-4">{artistInfo.name}</h1>
        {/* Display other artist information fields here */}
      </div>
    </div>
  );
};

export default ArtistSummary;
