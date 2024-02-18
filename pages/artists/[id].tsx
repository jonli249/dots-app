import { useRouter } from 'next/router';
import React from 'react';
import { Tabs, TabList, Tab, TabPanels, TabPanel, Tooltip } from '@chakra-ui/react';
import SongList from '../../components/songs/songlist';
import Collaborators from '../../components/artist/mostcollabs';
import Navbar from '../../components/main/navbar';
import ArtistSummary from '../../components/artist/artistsummary';

const ArtistPage: React.FC = () => {
  const router = useRouter();
  const { id } = Array.isArray(router.query) ? router.query[0] : router.query;

  if (!id) {
    return <div className="flex items-center justify-center h-screen">Loading...</div>;
  }

  return (
    <div>
      <Navbar />
      <div className="flex flex-col mt-12 mx-auto px-48 md:px-64 lg:px-68 xl:px-68 2xl:px-80">
        <div className='px-2 md:px-4 lg:px-8 xl:px-8 2xl:px-16'>
          <ArtistSummary artistId={id} />
          <Tabs defaultIndex={0} variant="unstyled" className="mt-8">
            <TabList>
              <Tab _selected={{ fontWeight: 'bold', color: 'black' }}>SONGS</Tab>
              <Tab _selected={{ fontWeight: 'bold', color: 'black' }}>COLLABORATORS</Tab>
              <Tooltip label="Coming Soon!" aria-label='A tooltip'>
                <Tab isDisabled>SMART TOOLS</Tab>
              </Tooltip>
            </TabList>
            <TabPanels>
              <TabPanel>
                <SongList
                  artistId={id}
                  songsPerPage={12}
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