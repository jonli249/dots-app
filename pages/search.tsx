import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Input, Box, Text, VStack, Link, Modal, ModalOverlay, ModalContent, ModalHeader, ModalCloseButton, ModalBody, Flex, Divider, Button } from '@chakra-ui/react';
import { debounce } from 'lodash';
import Navbar from '../components/main/navbar';
import { SearchIcon } from '@chakra-ui/icons';

interface Artist {
  id: string;
  name: string;
}

interface Song {
  id: string;
  title: string;
}

interface Section {
  title: string;
  data: Artist[] | Song[];
}

const SearchPage = () => {
  const [inputValue, setInputValue] = useState('');
  const [sections, setSections] = useState<Section[]>([
    { title: 'Songs', data: [] },
    { title: 'Collaborators', data: [] },
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
        { title: 'Songs', data: [] },
        { title: 'Collaborators', data: [] },
      ]);
      return;
    }

    const artists = await fetchArtists(searchTerm);
    const songs = await fetchSongs(searchTerm);

    setSections([
      { title: 'Songs', data: songs },
      { title: 'Collaborators', data: artists },
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
            <ModalHeader>
              <Input
                size="sm"
                placeholder= "Search for collaborators or songs"
                onChange={(e) => setInputValue(e.target.value)}
                value={inputValue}
              />
            </ModalHeader>
            <ModalBody>
              <Flex>
                {sections.map((section) => (
                  <Box key={section.title} flex="1">
                    <Text fontSize="lg" fontWeight="bold">{section.title}</Text>
                    <Divider my={2} />
                    <VStack spacing={2}>
                      {section.data.map((item, index) => (
                        <Link key={index} href={`/${section.title.toLowerCase()}/${item.id}`} isExternal>
                          {('name' in item) ? item.name : item.title}
                        </Link>
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
