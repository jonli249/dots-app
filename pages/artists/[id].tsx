import { useRouter } from 'next/router';
import React from 'react';
import { Tabs, TabList, Tab, TabPanels, TabPanel, Tooltip } from '@chakra-ui/react';
import SongList from '../../components/songs/songlist';
import Collaborators from '../../components/artist/mostcollabs';
import Navbar from '../../components/main/navbar';
import ArtistSummary from '../../components/artist/artistsummary';
import TwoCollab from '../../components/artist/twocollab';

const ArtistPage: React.FC = () => {
  const router = useRouter();
  const { id } = Array.isArray(router.query) ? router.query[0] : router.query;

  if (!id) {
    return <div className="flex items-center justify-center h-screen">Loading...</div>;
  }

  return (
    <div>
        <Navbar />
      <div className="flex flex-col mx-auto max-w-[800px] mt-6">
          <ArtistSummary artistId={id} />
          <Tabs defaultIndex={0} variant="unstyled" className="mt-8">
            <TabList>
              <Tab _selected={{ fontWeight: 'bold', color: 'black' }}>SONGS</Tab>
              <Tab _selected={{ fontWeight: 'bold', color: 'black' }}>COLLABORATORS</Tab>
              <Tab _selected={{ fontWeight: 'bold', color: 'black' }}>SMART TOOLS</Tab>
        
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
              <TabPanel> 
              <TwoCollab artistId={id} />
                
              </TabPanel>
            </TabPanels>
          </Tabs>
      </div>
    </div>
  );
};

export default ArtistPage;