import React, { useState } from 'react';
import SongItem from '../../components/songs/songItem';
import { Button } from '@/components/ui/button';

interface Song {
    title: string;
    artist?: string[];
    _id: string;
    coverImage: string;
    'first-release-date': string;  }
  

interface SongListWithPaginationProps {
  songs: Song[];
  currentPage: number;
  setCurrentPage: (page: number) => void;
  startIndex: number;
  endIndex: number;
  totalSongs: number;
  songsPerPage: number;
}

const SongList: React.FC<SongListWithPaginationProps> = ({
  songs,
  currentPage,
  setCurrentPage,
  startIndex,
  endIndex,
  totalSongs,
  songsPerPage,
}) => {
    const [sortOrder, setSortOrder] = useState<'asc' | 'desc'>('asc');
  
    const sortedSongs = [...songs].sort((a, b) => {
      // Parse date strings into Date objects
      const dateA = new Date(a['first-release-date']);
      const dateB = new Date(b['first-release-date']);
  
      // Sort by date in ascending or descending order based on sortOrder
      if (sortOrder === 'asc') {
        return dateA.getTime() - dateB.getTime(); // Use getTime() for subtraction
      } else {
        return dateB.getTime() - dateA.getTime(); // Use getTime() for subtraction
      }
    });
  
    const toggleSortOrder = () => {
      setSortOrder(sortOrder === 'asc' ? 'desc' : 'asc');
    };

  return (
    <div className="m-15">
      <div className="flex justify-end mb-4">
        <Button onClick={toggleSortOrder}>
          {`Sort by Date ${sortOrder === 'asc' ? '▲' : '▼'}`}
        </Button>
      </div>
      <div className="grid grid-cols-4 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
        {sortedSongs.map((song, index) => (
          <SongItem
            key={index}
            title={song.title}
            _id={song._id}
            coverImage={song.coverImage}
          />
        ))}
      </div>
      <div className="space-x-4 mt-10">
        <Button
          onClick={() => setCurrentPage(currentPage - 1)}
          disabled={currentPage === 1}
        >
          Previous Page
        </Button>
        <Button
          onClick={() => setCurrentPage(currentPage + 1)}
          disabled={endIndex >= totalSongs}
        >
          Next Page
        </Button>
      </div>
    </div>
  );
};

export default SongList;
