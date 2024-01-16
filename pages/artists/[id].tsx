// pages/artists/[id].tsx
import { useRouter } from 'next/router';
import React, { useEffect, useState } from 'react';
import axios from 'axios';
import 'tailwindcss/tailwind.css'; // Import Tailwind CSS styles
import SongList from '../../components/songs/songlist';
import Collaborators from '../../components/artist/mostcollabs';
import Navbar from '../../components/main/navbar';
import { Skeleton } from "@/components/ui/skeleton"



interface Song {
    title: string;
    artist: string[];
    _id: string;
    coverImage: string;
    'artist-credit': string[];
    
    // Add other properties as needed
  }

const ArtistPage: React.FC = () => {
  const router = useRouter();
  const { id } = Array.isArray(router.query) ? router.query[0] : router.query;
  const [songs, setSongs] = useState<Song[]>([]);
  const [currentPage, setCurrentPage] = useState<number>(1);
  const songsPerPage = 12; // Number of songs to display per page

  useEffect(() => {
    if (id) {
      // Fetch songs based on 'id' using an API call
      const fetchSongs = async () => {
        try {
          const response = await axios.get(
            `https://us-east-1.aws.data.mongodb-api.com/app/dotstester-bpjzg/endpoint/artistsongs?artistId=${id}`
          );
          if (response.data && Array.isArray(response.data)) {
            setSongs(response.data);
            
          } else {
            setSongs([]);
            console.error('No songs found for the artist');
          }
        } catch (error) {
          console.error('Error fetching songs:', error);
          setSongs([]);
        }
      };

      fetchSongs();
    }
  }, [id]);

  // Calculate the range of songs to display for the current page
  const startIndex = (currentPage - 1) * songsPerPage;
  const endIndex = startIndex + songsPerPage;
  const songsToDisplay = songs.slice(startIndex, endIndex);

  if (songs.length === 0) {
    return <div className="flex items-center justify-center h-screen mt-4">Loading...</div>
    
  }
  return (
    <div> 

    <Navbar />
    <div className="flex flex-col items-center mt-30">
        
      <h1 className="font-bold mt-20">Artist {id}</h1>
      <h2 className="font-bold mt-10">Songs:</h2>
      <SongList
        songs={songsToDisplay}
        currentPage={currentPage}
        setCurrentPage={setCurrentPage}
        startIndex={startIndex}
        endIndex={endIndex}
        totalSongs={songs.length}
        songsPerPage={songsPerPage}
      />
      <div className = "mt-10"> 
        <Collaborators artistId={id} />

      </div>
    </div>
    </div>
  );
};

export default ArtistPage;
