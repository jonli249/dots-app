import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Autosuggest from 'react-autosuggest';
import styles from '../styles/Dashboard.module.css';
import Link from 'next/link';
import Navbar from '../components/main/navbar';

interface SearchResult {
  _id: string;
  id: string;
  title?: string;
  name?: string;
  // Add more fields as needed
}

const SearchPage: React.FC = () => {
  const [id, setId] = useState<string>('');
  const [searchResultArtist, setSearchResultArtist] = useState<SearchResult[] | null>(null);
  const [searchResultSong, setSearchResultSong] = useState<SearchResult[] | null>(null);
  const [suggestions, setSuggestions] = useState<SearchResult[]>([]);

  useEffect(() => {
    if (searchResultArtist && searchResultSong) {
      // Combine the results from both endpoints
      const combinedResults = [...searchResultArtist, ...searchResultSong];
      setSuggestions(combinedResults);
    }
  }, [searchResultArtist, searchResultSong]);

  const handleSearch = async (value: string) => {
    try {
      // Fetch results from both endpoints
      const responseArtist = await axios.get(`https://us-east-1.aws.data.mongodb-api.com/app/dotstester-bpjzg/endpoint/findcollaboratornames?collabname=${value}`);
      const responseSong = await axios.get(`https://us-east-1.aws.data.mongodb-api.com/app/dotstester-bpjzg/endpoint/artistsearch?collabname=${value}`);
      
      if (responseArtist.data) {
        setSearchResultArtist(responseArtist.data);
      } else {
        setSearchResultArtist(null);
        console.error('Artist document not found');
      }

      if (responseSong.data) {
        setSearchResultSong(responseSong.data);
      } else {
        setSearchResultSong(null);
        console.error('Song document not found');
      }
    } catch (error) {
      console.error('Search error:', error);
      setSearchResultArtist(null);
      setSearchResultSong(null);
    }
  };

  const onSuggestionsFetchRequested = ({ value }: { value: string }) => {
    handleSearch(value);
  };

  const onSuggestionsClearRequested = () => {
    setSuggestions([]);
  };

  const getSuggestionValue = (suggestion: SearchResult) => {
    return suggestion.name || suggestion.title || '';
  };

  const renderSuggestion = (suggestion: SearchResult) => (
    <Link href={`/${suggestion.title ? 'songs' : 'artists'}/${suggestion.id}`}>
      <div className="border border-gray-200 p-2 m-2 hover:border-blue-500 rounded-md">
        <h3 className="text-base font-semibold">
          {suggestion.name || suggestion.title}
        </h3>
      </div>
    </Link>
  );

  const inputProps = {
    placeholder: 'Search for collaborators or songs',
    value: id,
    onChange: (event: React.FormEvent<any>, { newValue }: Autosuggest.ChangeEvent) => {
      setId(newValue);
    },
  };

  return (
    <div className={styles.dashboardContainer}>
      <Navbar />
      <div className={styles.searchContainer}>
        <Autosuggest
          suggestions={suggestions}
          onSuggestionsFetchRequested={onSuggestionsFetchRequested}
          onSuggestionsClearRequested={onSuggestionsClearRequested}
          getSuggestionValue={getSuggestionValue}
          renderSuggestion={renderSuggestion}
          inputProps={inputProps}
          theme={{
            container: "m-2 relative",
            suggestionsContainer: "absolute mt-2 left-0 right-0 bg-white border border-gray-300 rounded-lg shadow-md",
            suggestion: "px-4 cursor-pointer hover:bg-gray-100",
            input: "p-1 pl-8 bg-gray-300 w-128 rounded-lg focus:outline-none",
            suggestionHighlighted: "bg-gray-100",
          }}
        />
      </div>
    </div>
  );
};

export default SearchPage;
