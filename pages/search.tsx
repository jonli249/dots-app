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

interface Section {
  title: string;
  data: SearchResult[];
}
const SearchPage: React.FC = () => {
  const [searchTerm, setSearchTerm] = useState<string>('');
  const [sections, setSections] = useState<Section[]>([
    { title: 'Artists', data: [] },
    { title: 'Songs', data: [] },
  ]);

  const fetchArtists = async (value: string) => {
    try {
      const response = await axios.get(`https://us-east-1.aws.data.mongodb-api.com/app/dotstester-bpjzg/endpoint/findcollaboratornames?collabname=${value}`);
      return response.data || [];
    } catch (error) {
      console.error('Error fetching artists:', error);
      return [];
    }
  };

  const fetchSongs = async (value: string) => {
    try {
      const response = await axios.get(`https://us-east-1.aws.data.mongodb-api.com/app/dotstester-bpjzg/endpoint/artistsearch?collabname=${value}`);
      return response.data || [];
    } catch (error) {
      console.error('Error fetching songs:', error);
      return [];
    }
  };

  const handleSearch = async (value: string) => {
    setSearchTerm(value);
    const artistData = await fetchArtists(value);
    const songData = await fetchSongs(value);
    setSections([
      { title: 'Artists', data: artistData },
      { title: 'Songs', data: songData },
    ]);
  };

  const onSuggestionsFetchRequested = ({ value }: { value: string }) => {
    handleSearch(value);
  };

  const onSuggestionsClearRequested = () => {
    setSections(prevSections => prevSections.map(section => ({ ...section, data: [] })));
  };

  const getSuggestionValue = (suggestion: SearchResult) => {
    return suggestion.name || suggestion.title || '';
  };

  const renderSuggestion = (suggestion: SearchResult, { sectionIndex }: any) => {
    return (
      <Link href={`/${sectionIndex === 0 ? 'artists' : 'songs'}/${suggestion.id}`}>
        <div className="suggestion-content">
          {suggestion.name || suggestion.title}
        </div>
      </Link>
    );
  };

  const renderSectionTitle = (section: Section) => {
    return <strong>{section.title}</strong>;
  };

  const getSectionSuggestions = (section: Section) => {
    return section.data;
  };

  const inputProps = {
    placeholder: 'Search for artists or songs',
    value: searchTerm,
    onChange: (_: any, { newValue }: Autosuggest.ChangeEvent) => {
      setSearchTerm(newValue);
    },
  };


  return (
    <div className={styles.dashboardContainer}>
      <Navbar />
      <div className={styles.searchContainer}>   
        <Autosuggest
          multiSection={true}
          suggestions={sections}
          onSuggestionsFetchRequested={onSuggestionsFetchRequested}
          onSuggestionsClearRequested={onSuggestionsClearRequested}
          getSuggestionValue={getSuggestionValue}
          renderSuggestion={renderSuggestion}
          renderSectionTitle={renderSectionTitle}
          getSectionSuggestions={getSectionSuggestions}
          inputProps={inputProps}
          theme = {{
            container: "m-2 relative", 
            suggestionsContainer: "absolute mt-2 left-0 right-0 bg-white border border-gray-300 rounded-lg shadow-md",
            //suggestionsList: "py-2", 
            suggestion: "px-4 cursor-pointer hover:bg-gray-100",
            input: "p- pl-8 bg-gray-300 w-128 rounded-lg focus:outline-none", 
            suggestionHighlighted: "bg-gray-100",
          }}

        />
      </div>
    </div>
  );
};

export default SearchPage;