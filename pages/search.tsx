// pages/search.tsx

import React, { useState } from 'react';
import axios from 'axios';
import styles from '../styles/Dashboard.module.css';
import Link from 'next/link';

interface SearchResult {
  id: string;
  title: string;
  // Add more fields as needed
}

const SearchSongPage: React.FC = () => {
  const [title, setTitle] = useState<string>('');
  const [searchResult, setSearchResult] = useState<SearchResult[] | null>(null);

  const handleSearch = async () => {
    try {
      // Make an HTTP GET request to your API route with the provided title
      const searchparam = `https://us-east-1.aws.data.mongodb-api.com/app/dotstester-bpjzg/endpoint/artistsearch?collabname=${title}`;
      const response = await axios.get(searchparam);
      if (response.data) {
        // Handle the search result data here
        setSearchResult(response.data);
      } else {
        setSearchResult(null);
        console.error('No matching songs found');
      }
    } catch (error) {
      console.error('Search error:', error);
      setSearchResult(null);
    }
  };

  return (
    <div className={styles.dashboardContainer}>
      <h1>Search for Songs</h1>
      <div className={styles.searchContainer}>
        <input
          className={styles.searchInput}
          type="text"
          placeholder="Title"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
        />
        <button className={styles.searchButton} onClick={handleSearch}>
          Search
        </button>
      </div>
      {searchResult && (
        <div>
          <ul>
            {searchResult.map((result) => (
              <li key={result.id}>
                {/* Make each result clickable and link to the song page */}
                <Link href={`/songs/${result.id}`}>
                  {result.title}
                </Link>
              </li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
};

export default SearchSongPage;
