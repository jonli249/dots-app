// pages/artists/[id].tsx
import { useRouter } from 'next/router';
import React, { useEffect, useState } from 'react';
import axios from 'axios';
import 'tailwindcss/tailwind.css'; // Import Tailwind CSS styles
import {Button} from "@/components/ui/button";

interface Song {
    title: string;
    id: string
    // Add other properties as needed
  }

const ArtistPage: React.FC = () => {
  const router = useRouter();
  const { id } = router.query;
  const [songs, setSongs] = useState<Song[]>([]);
  const [currentPage, setCurrentPage] = useState<number>(1);
  const songsPerPage = 10; // Number of songs to display per page

  useEffect(() => {
    if (id) {
      // Fetch songs based on 'id' using an API call
      const fetchSongs = async () => {
        try {
          const response = await axios.get(
            `https://us-east-1.aws.data.mongodb-api.com/app/dotstester-bpjzg/endpoint/artistsongs?artistId=${id}`
          );
          console.log("Data", response.data);
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
    return <div className="flex items-center justify-center h-screen mt-4">Loading...</div>;
  }

  return (
    <div className="flex flex-col items-center mt-30">
      <h1 className='font-bold'>Artist {id}</h1>
      <h2 className='font-bold mt-10'>Songs:</h2>
      {songsToDisplay.map((song, index) => (
            <li key={index}>{song.title}</li>
        ))}
      {/* Pagination controls */}
      <div className="space-x-4">
        <Button
          onClick={() => setCurrentPage(currentPage - 1)}
          disabled={currentPage === 1}
        >
          Previous Page
        </Button>
        <Button
          onClick={() => setCurrentPage(currentPage + 1)}
          disabled={endIndex >= songs.length}
        >
          Next Page
        </Button>
      </div>
    </div>
  );
};

export default ArtistPage;
