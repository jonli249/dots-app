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
    // Determine the URL path based on the section
    let href;
    if (sectionIndex === 0) { // Assuming 0 is for artists
        // Adjust this line to use the correct attribute for artist paths
        href = `/artists/${encodeURIComponent(suggestion.name || '')}`; 
    } else {
        href = `/songs/${suggestion.id}`;
    }

    return (
        <Link href={href} className={styles.suggestionItem}>
            {suggestion.name || suggestion.title}
        </Link>
    );
};

  const renderSectionTitle = (section: Section) => {
    return <div className={styles.sectionTitle}>{section.title}</div>;
  };

  const getSectionSuggestions = (section: Section) => {
    return section.data;
  };

  const inputProps = {
    placeholder: 'Search for artists or songs',
    className: styles.inputStyle,
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
            container: styles.container ,
            suggestionsContainer: styles.suggestionContainer,
            suggestion: styles.suggestionItem,
            input: styles.inputStyle,
            suggestionHighlighted: styles.suggestionHighlighted,
          }}

        />
      </div>
    </div>
  );
};

export default SearchPage;