import { useRouter } from 'next/router';
import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Tabs, TabList, Tab, TabPanels, TabPanel, Tooltip } from '@chakra-ui/react';
import SongList from '../../components/songs/songlist';
import Collaborators from '../../components/artist/mostcollabs';
import Navbar from '../../components/main/navbar';
import ArtistSummary from '../../components/artist/artistsummary';

interface Song {
  title: string;
  artist: string[];
  _id: string;
  coverImage: string;
  'artist-credit'?: { name: string }[];
  'first-release-date': string;
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
    return <div className="flex items-center justify-center h-screen mt-4">Loading...</div>;
  }

  return (
    <div>
      <Navbar />
      <div className="flex flex-col mt-12 mx-auto px-48 md:px-64 lg:px-68 xl:px-72 2xl:px-80">
        <div className='px-4 md:px-4 lg:px-8 xl:px-12 2xl:px-16'>
        <ArtistSummary artistId={id} />
        <Tabs defaultIndex={0} variant="unstyled" className="mt-8">
          <TabList>
            <Tab _selected={{ fontWeight: 'bold', color: 'black' }} >SONGS</Tab>
            <Tab _selected={{ fontWeight: 'bold', color: 'black' }}> COLLABORATORS</Tab>
            <Tooltip label="Coming Soon!" aria-label='A tooltip'>
              <Tab isDisabled>SMART TOOLS</Tab>         
            </Tooltip>
           
          </TabList>
          <TabPanels>
            <TabPanel>
              <SongList
                songs={songsToDisplay}
                currentPage={currentPage}
                setCurrentPage={setCurrentPage}
                startIndex={startIndex}
                endIndex={endIndex}
                totalSongs={songs.length}
                songsPerPage={songsPerPage}
              />
            </TabPanel>
            <TabPanel>
              <Collaborators artistId={id} />
            </TabPanel>
  
          </TabPanels>
        </Tabs>
        </div>
      </div>
    </div>
  );
};

export default ArtistPage;
