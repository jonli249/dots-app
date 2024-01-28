import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Autosuggest from 'react-autosuggest';
import styles from '../styles/Dashboard.module.css';
import Link from 'next/link';
import Navbar from '../components/main/navbar';
import { Button } from '@/components/ui/button';

interface SearchResult {
  _id: string;
  title?: string;
  name?: string;
  // Add more fields as needed
}

const SearchPage: React.FC = () => {
  const [id, setId] = useState<string>('');
  const [searchType, setSearchType] = useState<'artist' | 'song'>('artist');
  const [searchResult, setSearchResult] = useState<SearchResult[] | null>(null);
  const [suggestions, setSuggestions] = useState<SearchResult[]>([]);

  useEffect(() => {
    if (searchResult) {
      setSuggestions(searchResult);
    }
  }, [searchResult]);

  const handleSearch = async (value: string) => {
    try {
      let searchparam = '';
      if (searchType === 'artist') {
        searchparam = `https://us-east-1.aws.data.mongodb-api.com/app/dotstester-bpjzg/endpoint/findcollaboratornames?collabname=${value}`;
      } else if (searchType === 'song') {
        // Modify the URL for song search
        searchparam = `https://us-east-1.aws.data.mongodb-api.com/app/dotstester-bpjzg/endpoint/artistsearch?collabname=${value}`;
      }
  
      const response = await axios.get(searchparam);
      if (response.data) {
        setSearchResult(response.data);
        console.log(response.data);
      } else {
        setSearchResult(null);
        console.error('Document not found');
      }
    } catch (error) {
      console.error('Search error:', error);
      setSearchResult(null);
    }
  };

  const onSuggestionsFetchRequested = ({ value }: { value: string }) => {
    handleSearch(value);
  };

  const onSuggestionsClearRequested = () => {
    setSuggestions([]);
  };

  const getSuggestionValue = (suggestion: SearchResult) => {
    if (searchType === 'artist') {
      return suggestion.name || '';
    } else if (searchType === 'song') {
      return suggestion.title || '';
    }
    // Return a default value if needed
    return '';
  };
  
  const renderSuggestion = (suggestion: SearchResult) => (
    <Link href={`/${searchType}s/${suggestion._id}`}>
      <div className="border border-gray-200 p-4 m-2 hover:border-blue-500 rounded-lg">
        <h3 className="text-lg font-semibold">
          {searchType === 'artist' ? suggestion.name : suggestion.title}
        </h3>
        {/* Add more fields as needed */}
      </div>
    </Link>
  );
  

  const inputProps = {
    placeholder: 'Name',
    value: id,
    onChange: (event: React.FormEvent<any>, { newValue }: Autosuggest.ChangeEvent) => {
      setId(newValue);
    },
  };

  return (
    <div className={styles.dashboardContainer}>
      <Navbar />
      <div className="flex justify-center space-x-4 mt-4">
        <Button
          className={`border ${searchType === 'artist' ? 'border-blue-500' : 'border-gray-200'} px-4 py-2 rounded-md`}
          onClick={() => setSearchType('artist')}
        >
          Artist Search
        </Button>
        <Button
          className={`border ${searchType === 'song' ? 'border-blue-500' : 'border-gray-200'} px-4 py-2 rounded-md`}
          onClick={() => setSearchType('song')}
        >
          Song Search
        </Button>
      </div>
      <h1>{searchType === 'artist' ? 'Search for Artist' : 'Search for Song'}</h1>
      <div className={styles.searchContainer}>
        <Autosuggest
          suggestions={suggestions}
          onSuggestionsFetchRequested={onSuggestionsFetchRequested}
          onSuggestionsClearRequested={onSuggestionsClearRequested}
          getSuggestionValue={getSuggestionValue}
          renderSuggestion={renderSuggestion}
          inputProps={inputProps}
        />
      </div>
    </div>
  );
};

export default SearchPage;
