import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Autosuggest from 'react-autosuggest'; // Import react-autosuggest
import styles from '../styles/Dashboard.module.css';
import Link from 'next/link';
import Navbar from '../components/main/navbar';

interface SearchResult {
  id: string;
  name: string;
}

const SearchCollabPage: React.FC = () => {
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
      const searchparam = `https://us-east-1.aws.data.mongodb-api.com/app/dotstester-bpjzg/endpoint/findcollaboratornames?collabname=${value}`;
      const response = await axios.get(searchparam);
      if (response.data) {
        setSearchResult(response.data);
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

  const getSuggestionValue = (suggestion: SearchResult) => suggestion.name;

  const renderSuggestion = (suggestion: SearchResult) => (
    <Link href={`/artists/${suggestion.id}`}>
      <div className="border border-gray-200 p-4 m-2 hover:border-blue-500 rounded-lg">
        <h3 className="text-lg font-semibold">{suggestion.name}</h3>
        {/* Add more fields as needed */}
      </div>
    </Link>
  );


  const inputProps = {
    placeholder: 'Name',
    value: id,
    onChange: (event: React.ChangeEvent<HTMLInputElement>, { newValue }: { newValue: string }) => {
      setId(newValue);
    },
  };

  return (
    <div className={styles.dashboardContainer}>
      <Navbar />

      <h1>Search for Artist</h1>
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

export default SearchCollabPage;
