import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Input, Box, Text, VStack, Link } from '@chakra-ui/react';
import { debounce } from 'lodash';

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
    { title: 'Artists', data: [] },
    { title: 'Songs', data: [] },
  ]);

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
        { title: 'Artists', data: [] },
        { title: 'Songs', data: [] },
      ]);
      return;
    }

    const artists = await fetchArtists(searchTerm);
    const songs = await fetchSongs(searchTerm);

    setSections([
      { title: 'Artists', data: artists },
      { title: 'Songs', data: songs },
    ]);
  }, 300);

  useEffect(() => {
    if (inputValue) {
      debouncedSearch(inputValue);
    }

    return () => {
      debouncedSearch.cancel();
    };
  }, [inputValue]);

  return (
    <div>
    <Box>
      <Input
        placeholder="Search for artists or songs"
        onChange={(e) => setInputValue(e.target.value)}
        value={inputValue}
      />
      <VStack spacing={4}>
        {sections.map((section) => (
          <Box key={section.title}>
            <Text fontSize="lg" fontWeight="bold">{section.title}</Text>
            {section.data.map((item, index) => (
              <Link key={index} href={`/${section.title.toLowerCase()}/${item.id}`} isExternal>
                {('name' in item) ? item.name : item.title}
              </Link>
            ))}
          </Box>
        ))}
      </VStack>
    </Box>
    </div>
  );
};

export default SearchPage;
