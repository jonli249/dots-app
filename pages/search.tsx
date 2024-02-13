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
      
    </div>
  );
};

export default SearchPage;
