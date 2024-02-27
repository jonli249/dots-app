import React, { useState, useEffect, useMemo } from 'react';
import axios from 'axios';
import { Select } from '@chakra-ui/react';
import Fuse from 'fuse.js';
import { FaArrowLeft, FaArrowRight } from 'react-icons/fa';
import SongItem from '../../components/songs/songItem';

interface Song {
  title: string;
  'artist-credit'?: { name: string, artist: { name: string} }[];
  _id: string;
  coverImage: string;
  'first-release-date': string;
  geniusData?: {
    header_image_thumbnail_url: string,
    stats?: { 
      hot: boolean, 
      pageviews: number 
    }
  };
  'writers'?: {
    name: string;
    id: string; 
  }[];
  'producers-credit'?: {
    name: string;
    id: string; 
  }[];
}

interface SongListWithPaginationProps {
  artistId: string;
  songsPerPage: number;
}

const normalizeTitle = (title: string): string => {
  return title.toLowerCase().replace(/\s*\[.*?\]\s*|\s*\(.*?\)\s*/g, '').trim();
};

const SongList: React.FC<SongListWithPaginationProps> = ({ artistId, songsPerPage }) => {
  const [songs, setSongs] = useState<Song[]>([]);
  const [currentPage, setCurrentPage] = useState<number>(1);
  const [sortOrder, setSortOrder] = useState<'relevance' | 'asc' | 'desc'>('relevance');
  const [searchQuery, setSearchQuery] = useState<string>('');
  

  useEffect(() => {
    const fetchSongs = async () => {
      try {
        const response = await axios.get(`https://us-east-1.aws.data.mongodb-api.com/app/dotstester-bpjzg/endpoint/artistsongs?artistId=${artistId}`);
        if (response.data && Array.isArray(response.data)) {
          setSongs(response.data);
        } else {
          setSongs([]);
          console.error('No songs found for the artist');
        }
      } catch (error) {
        console.error('Error fetching songs:', error);
        setSongs([]);
      }
    };

    if (artistId) {
      fetchSongs();
    }
  }, [artistId]);

  const groupSongsByTitle = (songs: Song[]): Song[] => {
    const grouped = songs.reduce((acc, song) => {
      const normalizedTitle = normalizeTitle(song.title);
      if (!acc[normalizedTitle]) {
        acc[normalizedTitle] = [];
      }
      acc[normalizedTitle].push(song);
      return acc;
    }, {} as Record<string, Song[]>);

    return Object.values(grouped).map(group => {
      if (group.length === 1) return group[0];
      // Sort by the amount of information (writers, producers-credit), and return the one with the most
      return group.sort((a, b) => {
        const aInfo = (a['writers']?.length || 0) + (a['producers-credit']?.length || 0);
        const bInfo = (b['writers']?.length || 0) + (b['producers-credit']?.length || 0);
        return bInfo - aInfo;
      })[0];
    });
    };

  const preprocessedSongs = useMemo(() => groupSongsByTitle(songs), [songs]);


  const fuse = useMemo(() => new Fuse(preprocessedSongs, {
    keys: ['title'],
    threshold: 0.3,
  }), [preprocessedSongs]);

  const filteredSongs = useMemo(() => {
    if (searchQuery && fuse) {
      const results = fuse.search(searchQuery);
      return results.map(result => result.item);
    }
    return preprocessedSongs;
  }, [searchQuery, fuse, preprocessedSongs]);

  // Apply sorting to filtered (and possibly searched) songs
  const sortedAndFilteredSongs = useMemo(() => {
    return [...filteredSongs].sort((a, b) => {
      if (sortOrder === 'relevance') {
        
        const pageviewsA = a.geniusData?.stats?.pageviews || 0;
        const pageviewsB = b.geniusData?.stats?.pageviews || 0;   
        return pageviewsB - pageviewsA; 
      }

      const dateA = new Date(a['first-release-date']).getTime();
      const dateB = new Date(b['first-release-date']).getTime();
      return sortOrder === 'asc' ? dateA - dateB : dateB - dateA;
    });
  }, [filteredSongs, sortOrder]);

  // Apply pagination to the sorted and filtered list
  const displayedSongs = useMemo(() => {
    const startIndex = (currentPage - 1) * songsPerPage;
    const endIndex = startIndex + songsPerPage;
    return sortedAndFilteredSongs.slice(startIndex, endIndex);
  }, [sortedAndFilteredSongs, currentPage, songsPerPage]);

  const handleSearch = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchQuery(e.target.value);
  };

  const handleSortChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setSortOrder(e.target.value as 'relevance' | 'asc' | 'desc');
  };

  return (
    <div className="flex flex-col max-w-[800px] mx-auto xl:px-0 font-inter mt-6">
      <div className="flex justify-between mb-4">
        <div className="flex-1 mr-4">
          <input
            type="text"
            placeholder="Search by song title..."
            value={searchQuery}
            onChange={handleSearch}
            className="px-2 py-2 border border-gray-300 rounded-md w-full"
          />
        </div>
        <div>
          <Select value={sortOrder} onChange={handleSortChange}>
            <option value="relevance">Relevance</option>
            <option value="desc">Date - Newest</option>
            <option value="asc">Date - Oldest</option>
            
          </Select>
        </div>
      </div>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-4 gap-5">
        {displayedSongs.map((song, index) => (
          <SongItem
            key={index}
            title={song.title}
            artistCredit={song['artist-credit']}
            _id={song._id}
            geniusData={song.geniusData}
          />
        ))}
      </div>
      <div className="flex justify-center mt-10">
        <div className="flex space-x-4">
          <FaArrowLeft
            onClick={() => setCurrentPage(Math.max(1, currentPage - 1))}
            className={`cursor-pointer ${currentPage === 1 ? 'text-gray-300' : 'text-black'}`}
          />
          <FaArrowRight
            onClick={() => setCurrentPage(Math.min(Math.ceil(filteredSongs.length / songsPerPage), currentPage + 1))}
            className={`cursor-pointer ${currentPage * songsPerPage >= filteredSongs.length ? 'text-gray-300' : 'text-black'}`}
          />
        </div>
      </div>
    </div>
  );
};

export default SongList;
