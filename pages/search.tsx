import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Input, InputGroup, InputLeftElement, Box, Text, VStack, Link, Modal, ModalOverlay, ModalContent, ModalHeader, ModalCloseButton, ModalBody, Flex, Divider, Button } from '@chakra-ui/react';
import { debounce } from 'lodash';
import Navbar from '../components/main/navbar';
import { SearchIcon } from '@chakra-ui/icons';
import PersonCard from '../components/artist/personcard';
import SongItem from '../components/songs/songItem';



interface Artist {
  id: string;
  name: string;
  imageUrl?: string;
}

interface Song {
  id: string;
  title: string;
  artists: { name: string }[];
  coverImage: string;
}

interface Section {
  title: string;
  data: Artist[] | Song[]; 
  link: string;
}

const SearchPage = () => {
  const [inputValue, setInputValue] = useState('');
  const [sections, setSections] = useState<Section[]>([
    { title: 'Songs', data: [], link: 'songs'},
    { title: 'Collaborators', data: [], link: 'artists' },
  ]);
  const [modalOpen, setModalOpen] = useState(false);

  const fetchArtists = async (searchTerm: string): Promise<Artist[]> => {
    const response = await axios.get(`https://us-east-1.aws.data.mongodb-api.com/app/dotstester-bpjzg/endpoint/findcollaboratornames?collabname=${searchTerm}`);
    return response.data || [];
  };
  
  const fetchSongs = async (searchTerm: string): Promise<Song[]> => {
    const response = await axios.get(`https://us-east-1.aws.data.mongodb-api.com/app/dotstester-bpjzg/endpoint/artistsearch?collabname=${searchTerm}`);
    return response.data || [];
  };

  // Debounced function to handle input changes and data fetching
  const debouncedSearch = debounce(async (searchTerm: string) => {
    if (!searchTerm.trim()) {
      setSections([
        { title: 'Songs', data: [], link: 'songs' },
        { title: 'Collaborators', data: [], link: 'artists' },
      ]);
      return;
    }

    const artists = await fetchArtists(searchTerm);
    const songs = await fetchSongs(searchTerm);

    setSections([
      { title: 'Songs', data: songs, link: 'songs'},
      { title: 'Collaborators', link: 'artists', data: artists },
    ]);
    setModalOpen(true);
  }, 150);

  useEffect(() => {
    const fetchData = async () => {
      if (inputValue) {
        debouncedSearch(inputValue);
      }
    };

    fetchData();

    return () => {
      debouncedSearch.cancel();
    };
      }, [inputValue, debouncedSearch]);

  return (
    <div>
      <Navbar />
      <Box className="flex justify-center">
        <Button leftIcon={<SearchIcon />} variant="outline" onClick={() => setModalOpen(true)}>Search for a collaborator or song</Button>
        <Modal isOpen={modalOpen} onClose={() => setModalOpen(false)} size="xl">
          <ModalOverlay />
          <ModalContent>
            <ModalHeader className="w-full">
            <InputGroup >
            <InputLeftElement pointerEvents='none'>
              <SearchIcon color='gray.300' />
            </InputLeftElement>
            <Input
                size="sm"
                placeholder= "Search for collaborators or songs"
                onChange={(e) => setInputValue(e.target.value)}
                value={inputValue}
                className="w-full"
              />
            </InputGroup>
              
            </ModalHeader>
            <ModalBody maxHeight="40vh" overflowY="auto">
              <Flex>
                {sections.map((section) => (
                  <Box key={section.title} flex="1">
                    <Text fontSize="sm" fontWeight="bold">{section.title}</Text>
                    <Divider my={2} />
                    <VStack spacing={2} className="justify-items-start">
                    {section.data.map((item, index) => (
                        <React.Fragment key={index}>
                          {section.title === 'Collaborators' ? (
                            <PersonCard
                              id={(item as Artist).id}
                              name={(item as Artist).name}
                              imageUrl={(item as Artist).imageUrl}
                            />
                          ) : (
                            <SongItem
                              title={(item as Song).title}
                              artists={(item as Song).artists}
                              coverImage={(item as Song).coverImage}
                              _id={(item as Song).id}
                            />
                          )}
                        </React.Fragment>
                      ))}
                    </VStack>
                  </Box>
                ))}
              </Flex>
            </ModalBody>
          </ModalContent>
        </Modal>
      </Box>
    </div>
  );
};

export default SearchPage;
