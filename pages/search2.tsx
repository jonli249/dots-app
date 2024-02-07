import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Autosuggest from 'react-autosuggest';
import styles from '../styles/Dashboard.module.css';
import Link from 'next/link';
import Navbar from '../components/main/navbar';

interface SearchResult {
  _id: string;
  title?: string;
  name?: string;
  // Add more fields as needed
}

const SearchPageTwo: React.FC = () => {
  const [id, setId] = useState<string>('');
  const [searchResult, setSearchResult] = useState<SearchResult[] | null>(null);
  const [suggestions, setSuggestions] = useState<SearchResult[]>([]);

  useEffect(() => {
    if (searchResult) {
      setSuggestions(searchResult);
    }
  }, [searchResult]);

  const handleSearch = async (value: string) => {
    try {
      const searchparamArtist = `https://us-east-1.aws.data.mongodb-api.com/app/dotstester-bpjzg/endpoint/findcollaboratornames?collabname=${value}`;
      const searchparamSong = `https://us-east-1.aws.data.mongodb-api.com/app/dotstester-bpjzg/endpoint/artistsearch?collabname=${value}`;

      const responseArtist = await axios.get(searchparamArtist);
      const responseSong = await axios.get(searchparamSong);

      const artistResults = responseArtist.data || [];
      const songResults = responseSong.data || [];

      setSearchResult([...artistResults, ...songResults]);
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
    return suggestion.name || suggestion.title || '';
  };

  const renderSuggestion = (suggestion: SearchResult) => (
    <Link href={`/${suggestion.name ? 'collaborators' : 'songs'}/${suggestion._id}`}>
      <div className="border border-gray-200 p-4 m-2 hover:border-blue-500 rounded-lg">
        <h3 className="text-lg font-semibold">{suggestion.name || suggestion.title}</h3>
        {/* Add more fields as needed */}
      </div>
    </Link>
  );

  const inputProps = {
    placeholder: 'Search for collaborator or song',
    value: id,
    onChange: (event: React.ChangeEvent<HTMLInputElement>, { newValue }: { newValue: string }) => {
      setId(newValue);
    },
  };

  return (
    <div className={styles.dashboardContainer}>
      <Navbar />
      <h1>Search for Collaborators and Songs</h1>
      <div className={styles.searchContainer}>
        <Autosuggest
          suggestions={suggestions}
          onSuggestionsFetchRequested={onSuggestionsFetchRequested}
          onSuggestionsClearRequested={onSuggestionsClearRequested}
          getSuggestionValue={getSuggestionValue}
          renderSuggestion={renderSuggestion}
          inputProps={inputProps}
          theme={{
            container: 'm-2',
            suggestionsContainer: 'absolute mt-2 left-0 right-0 bg-white border border-gray-300 rounded-lg shadow-md',
            suggestionsList: 'py-2',
            suggestion: 'px-4 py-2 cursor-pointer hover:bg-gray-100',
            input: 'p-2 pl-8 bg-gray-300 w-full rounded-lg focus:outline-none',
          }}
        />
      </div>
    </div>
  );
};

export default SearchPageTwo;
