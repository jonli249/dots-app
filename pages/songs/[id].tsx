// pages/songs/[id].tsx

import { useRouter } from 'next/router';
import React, { useEffect, useState } from 'react';
import axios from 'axios';
import SongDetailView from '../../components/songs/songdetailed'; 
interface Song {
  title?: string;
  'first-release-date'?: string;
  'artist-credit'?: { name: string; 'artist': { id: string}}[]; 
  writers?: { name: string; id: string }[]; 
  'producers-credit'?: { name: string; id: string }[];
  composers?: { name: string; id: string }[]; 
  lyricists?: { name: string; id: string }[]; 
  _id?: string;
}



const SongPage: React.FC = () => {
  const router = useRouter();
  const { id } = router.query;
  const [song, setSong] = useState<Song | null>(null);

  useEffect(() => {
    if (id) {
      // Fetch song data based on 'id' using an API call
      const fetchSong = async () => {
        try {
            const param = `https://us-east-1.aws.data.mongodb-api.com/app/dotstester-bpjzg/endpoint/onesongroute?songId=${id}`;
            const response = await axios.get(param);
 
          if (response.data) {
            setSong(response.data);
          } else {
            setSong(null);
            console.error('Song not found');
          }
        } catch (error) {
          console.error('Error fetching song:', error);
          setSong(null);
        }
      };

      fetchSong();
    }
  }, [id]);

  if (!song) {
    return <div>Loading...</div>;
  }

  return (
    <div>
      {/* Use the SongDetailView component to display song details */}
      <SongDetailView songData={song} />
    </div>
  );
};

export default SongPage;
