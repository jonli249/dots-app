import React, { useState, useMemo } from 'react';
import SongItem from '../../components/songs/songItem';
import { Button } from '@chakra-ui/react';
import Fuse from 'fuse.js';

interface Song {
  title: string;
  artist?: string[];
  _id: string;
  coverImage: string;
  'first-release-date': string;
}

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
  const [searchQuery, setSearchQuery] = useState<string>('');

  const fuse = useMemo(() => {
    return new Fuse(songs, {
      keys: ['title'],
      threshold: 0.3, // Adjust the threshold as needed for your fuzzy search
    });
  }, [songs]);

  const sortedSongs = [...songs].sort((a, b) => {
    const dateA = new Date(a['first-release-date']);
    const dateB = new Date(b['first-release-date']);
    return sortOrder === 'asc' ? dateA.getTime() - dateB.getTime() : dateB.getTime() - dateA.getTime();
  });

  const toggleSortOrder = () => {
    setSortOrder(sortOrder === 'asc' ? 'desc' : 'asc');
  };

  const handleSearch = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchQuery(e.target.value);
  };

  const filteredSongs = useMemo(() => {
    if (!searchQuery) {
      return sortedSongs;
    }
    const result = fuse.search(searchQuery);
    return result.map((r) => r.item);
  }, [fuse, searchQuery, sortedSongs]);

  return (
    <div className="m-15">
      <div className="flex justify-between items-center mb-4">
        <div>
          <input
            type="text"
            placeholder="Search by song title..."
            value={searchQuery}
            onChange={handleSearch}
            className="px-2 py-1 border border-gray-300 rounded-md"
          />
        </div>
        <div>
          <Button onClick={toggleSortOrder}>
            {`Sort by Date ${sortOrder === 'asc' ? '▲' : '▼'}`}
          </Button>
        </div>
        
      </div>
      <div className="grid grid-cols-4 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
        {filteredSongs.map((song, index) => (
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
