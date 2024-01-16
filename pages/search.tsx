// pages/search.tsx

import React, { useState } from 'react';
import axios from 'axios'; // Import axios for making API requests
import styles from '../styles/Dashboard.module.css';
import Link from 'next/link';
import Navbar from '../components/main/navbar';

//import ExpandableListItem from '../components/ExpandableListItem';

interface SearchResult {
  id: string;
  name: string;
  // Add more fields as needed
}


const SearchCollabPage: React.FC = () => {
  const [id, setId] = useState<string>('');
  const [searchResult, setSearchResult] = useState<SearchResult[] | null>(null);

  const handleSearch = async () => {
    try {
      // Make an HTTP GET request to your API route with the provided ID
      const searchparam = `https://us-east-1.aws.data.mongodb-api.com/app/dotstester-bpjzg/endpoint/findcollaboratornames?collabname=${id}`;
      const response = await axios.get(searchparam);
      if (response.data) {
        // Handle the search result data here
        setSearchResult(response.data);
      } else {
        setSearchResult(null);
        console.log(searchparam);
        console.error('Document not found');
      }
    } catch (error) {
      console.error('Search error:', error);
      
      setSearchResult(null);
    }
  };


  return (
    <div>
    <div className={styles.dashboardContainer}>
      <Navbar />

      <h1>Search for Artist</h1>
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
            {searchResult.map((result) => (
              <li key={result.id}>
                {/* Make each result clickable and link to the artist page */}
                <Link href={`/artists/${result.id}`}>
                    {result.name}
                </Link>
              </li>
            ))}
          </ul>
        </div>
      )}
    </div>
    </div>
  );
      };

  

export default SearchCollabPage;
