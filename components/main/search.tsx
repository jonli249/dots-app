import React, { useState, useEffect } from 'react';
import {
  Box,
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalCloseButton,
  ModalBody,
  Input,
  InputGroup,
  InputLeftElement,
  Flex,
  Text,
  VStack,
  Divider,
  useDisclosure,
  Icon
} from '@chakra-ui/react';
import { SearchIcon } from '@chakra-ui/icons';
import axios from 'axios';
import debounce from 'lodash/debounce';
import PersonCard from '../artist/personcard';
import SongItem from '../songs/songItem';

interface Artist {
    id: string;
    name: string;
    imageUrl?: string;
  }
  
  interface Song {
    _id: string;
    title: string;
    artists: { name: string }[];
    coverImage: string;
  }
  
  interface Section {
    title: string;
    data: Artist[] | Song[]; 
    link: string;
  }

const SearchComponent = () => {
  const [inputValue, setInputValue] = useState('');
  const { isOpen, onOpen, onClose } = useDisclosure();
  const [sections, setSections] = useState<Section[]>([
    { title: 'Songs', data: [], link: 'songs'},
    { title: 'Collaborators', data: [], link: 'artists' },
  ]);


  const fetchArtists = async (searchTerm: string): Promise<Artist[]> => {
    const response = await axios.get(`https://us-east-1.aws.data.mongodb-api.com/app/dotstester-bpjzg/endpoint/findcollaboratornames?collabname=${searchTerm}`);
    return response.data || [];
  };
  
  const fetchSongs = async (searchTerm: string): Promise<Song[]> => {
    const response = await axios.get(`https://us-east-1.aws.data.mongodb-api.com/app/dotstester-bpjzg/endpoint/artistsearch?collabname=${searchTerm}`);
    return response.data || [];
  };

  const debouncedSearch = debounce(async (searchTerm) => {
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
      { title: 'Collaborators', data: artists, link: 'artists' },
    ]);
  }, 150);

  useEffect(() => {
    if (inputValue) {
      debouncedSearch(inputValue);
    } else {
      setSections([
        { title: 'Songs', data: [], link: 'songs' },
        { title: 'Collaborators', data: [], link: 'artists' },
      ]);
    }
    // Cleanup function to cancel the debounced call if the component unmounts
    return () => {
      debouncedSearch.cancel();
    };
  }, [inputValue]);



  return (
    <>
      <Box
        as="button"
        display="flex"
        alignItems="center"
        justifyContent="left"
        padding="3"
        width="full" 
        borderRadius='md'
        backgroundColor="transparent"
        _hover={{ bg: 'gray.100' }} 
        borderWidth='1px'
        onClick={onOpen}
        cursor="pointer"
        boxShadow='base'
      >
        <Icon as={SearchIcon} color="gray.400" mr="2" />
        <Text color="gray.400" fontWeight="normal">
          Search for a collaborator or song
        </Text>
      </Box>
      <Modal isOpen={isOpen} onClose={onClose} size="xl">
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
            <ModalBody maxHeight="50vh" overflowY="auto">
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
                              _id={(item as Song)._id}
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
    </>
  );
};

export default SearchComponent;
