// pages/search.tsx

import React, { useState } from 'react';
import axios from 'axios'; // Import axios for making API requests
import styles from '../styles/Dashboard.module.css';
import Link from 'next/link';
//import { v4 as uuidv4 } from 'uuid';

interface SearchResult {
  _id : string;
  title: string;
  // Add more fields as needed
}

const SearchCollabPage: React.FC = () => {
  const [id, setId] = useState<string>('');
  const [searchResult, setSearchResult] = useState<SearchResult[] | null>(null);

  const handleSearch = async () => {
    try {
      // Make an HTTP GET request to your API route with the provided ID
      const searchparam = `https://us-east-1.aws.data.mongodb-api.com/app/dotstester-bpjzg/endpoint/artistsearch?collabname=${id}`;
      const response = await axios.get(searchparam);
      if (response.data) {
        // Handle the search result data here
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

  return (
    <div className={styles.dashboardContainer}>
      <h1>Search for Song</h1>
      <div className={styles.searchContainer}>
        <input
          className={styles.searchInput} 
          type="text"
          placeholder="Name"
          value={id}
          onChange={(e) => setId(e.target.value)}
        />
        <button
          className={styles.searchButton} 
          onClick={handleSearch}
        >
          Search
        </button>
      </div>
      {searchResult && (
        <div>
          <ul>
            {searchResult.map((result) => {
              // Convert binary UUID to string format
                // const idAsString = uuidv4(result.id);

              return (
                <li key={result._id}>
                  {/* Make each result clickable and link to the artist page */}
                  <Link href={`/songs/${result._id}`}>
                    {result.title}
                  </Link>
                </li>
              );
            })}
          </ul>
        </div>
      )}
    </div>
  );
};

export default SearchCollabPage;
