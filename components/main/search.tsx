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
import Image from '../../node_modules/next/image';

interface Artist {
    id: string;
    name: string;
    strArtistThumb?: string;
  }
  
  interface Song {
    _id: string;
    title: string;
    'artist-credit': { name: string, artist: {name: string} }[];
    geniusData?: {
      header_image_thumbnail_url?: string, 
    };
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
    <div className="max-w-[750px] w-full mx-auto px-3 xl:px-0 relative">
      <Image
        src={"/bg-input.png"}
        alt="/bg-input.png"
        className="absolute -top-7"
        width={956}
        height={144}
      />
      <Box
        as="button"
        display="flex"
        alignItems="center"
        justifyContent="start"
        textAlign="left" // Align text to the left
        padding="3"
        width="full" 
        borderRadius='md'
        backgroundColor="white" 
        _hover={{ bg: 'gray.100' }} 
        borderWidth='1px'
        onClick={onOpen}
        cursor="pointer"
        boxShadow='base'
        position="relative" 
        zIndex="10" 
      >
        <Icon as={SearchIcon} color="gray.400" mx="2" my="2"/>
        <Text color="gray.400" fontWeight="normal" overflow="hidden" whiteSpace="nowrap" textOverflow="ellipsis">
          Search for a collaborator or song
        </Text>
      </Box>
    </div>
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
                    <Flex direction={{ base: 'column', md: 'row' }} gap={{ base: '4', md: '8' }}>
                        {sections.map((section) => (
                            <Box key={section.title}  flex="1">
                                <Text fontSize="sm" fontWeight="bold">{section.title}</Text>
                                <Divider my={2} />
                                <VStack spacing={2} align="stretch">
                                    {section.data.map((item, index) => (
                                        <React.Fragment key={index}>
                                            {section.title === 'Collaborators' ? (
                                                <PersonCard
                                                    id={(item as Artist).id}
                                                    name={(item as Artist).name}
                                                    strArtistThumb={(item as Artist).strArtistThumb}
                                                    onClick={onClose}
                                                />
                                            ) : (
                                                <SongItem
                                                    title={(item as Song).title}
                                                    artistCredit={(item as Song)['artist-credit']}
                                                    geniusData={(item as Song).geniusData}
                                                    _id={(item as Song)._id}
                                                    onClick={onClose}
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