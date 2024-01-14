// pages/dashboard.tsx

import React, { useState } from 'react';
import axios from 'axios'; // Import axios for making API requests
import styles from '../styles/Dashboard.module.css';
import useAuth from '../utils/useAuth'; // Import the useAuth hook
import Navbar from '../components/main/navbar'; // Import the Navbar component

const DashboardPage: React.FC = () => {
  const [id, setId] = useState<string>('');
  const [searchResult, setSearchResult] = useState<any>(null);
  const { logout, isAuthenticated, session } = useAuth(); // Use the useAuth Hook


  const handleSearch = async () => {
    try {
      // Make an HTTP GET request to your API route with the provided ID
      const searchparam = `https://us-east-1.aws.data.mongodb-api.com/app/dotstester-bpjzg/endpoint/artistsongs?artistId=${id}`;
      const response = await axios.get(searchparam);
      if (response.data) {
        // Handle the search result data here
        setSearchResult(response.data);
      } else {
        setSearchResult(null);
      }
    } catch (error) {
      
      setSearchResult(null);
    }
  };


  return (
    <div>
    <Navbar />
    <div className={styles.dashboardContainer}>
      <h1>Dashboard</h1>
      
      <p> Hello, {session?.id}</p>
      <div className={styles.searchContainer}>
        <input
          className={styles.searchInput} 
          type="text"
          placeholder="Enter ID"
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
          <h2>Search Result</h2>
          <pre>{JSON.stringify(searchResult, null, 2)}</pre>
        </div>
      )}
    </div>
    </div>
  );
      };

  

export default DashboardPage;
