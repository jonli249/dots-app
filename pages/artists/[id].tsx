// pages/artists/[id].tsx
import { useRouter } from 'next/router';
import React, { useEffect, useState } from 'react';
import axios from 'axios';

interface Artist {
  id: string;
  name: string;
  songs: string[]; // Assuming 'songs' is an array of song names or IDs
  // Add more fields as needed
}

const ArtistPage: React.FC = () => {
  const router = useRouter();
  const { id } = router.query;
  const [artistData, setArtist] = useState<string | null>(null);

  useEffect(() => {
    if (id) {
      // Fetch artist data based on 'id' using an API call
      const fetchArtist = async () => {
        try {
          const response = await axios.get(`https://us-east-1.aws.data.mongodb-api.com/app/dotstester-bpjzg/endpoint/artistsongs?artistId=${id}`);
          console.log("Data", response.data);
          if (response.data) {
            setArtist(JSON.stringify(response.data, null, 2)); 
          } else {
            setArtist(null);
            console.error('Artist not found');
          }
        } catch (error) {
          console.error('Error fetching artist:', error);
          setArtist(null);
        }
      };

      fetchArtist();
    }
  }, [id]);

  if (!artistData) {
    return <div>Loading...</div>;
  }

  return (
    <div>
      <h1 className='font-bold'>Artist {id}</h1>
      <h2 className='font-bold'>Songs:</h2>
      <div>
        <pre>{artistData}</pre>
        </div>
      {/* Render other artist details here */}
    </div>
  );
};

export default ArtistPage;
