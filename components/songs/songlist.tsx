import React, { useState, useMemo } from 'react';
import SongItem from '../../components/songs/songItem';
import { Select } from '@chakra-ui/react';
import Fuse from 'fuse.js';
import { FaArrowLeft, FaArrowRight } from 'react-icons/fa'; // Import arrow icons

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
      threshold: 0.3,
    });
  }, [songs]);

  const handleSearch = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchQuery(e.target.value);
  };

  const handleSortChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setSortOrder(e.target.value as 'asc' | 'desc');
  };

  const sortedSongs = useMemo(() => {
    return [...songs].sort((a, b) => {
      const dateA = new Date(a['first-release-date']);
      const dateB = new Date(b['first-release-date']);
      return sortOrder === 'asc' ? dateA.getTime() - dateB.getTime() : dateB.getTime() - dateA.getTime();
    });
  }, [songs, sortOrder]);

  const filteredSongs = useMemo(() => {
    if (!searchQuery) {
      return sortedSongs;
    }
    const result = fuse.search(searchQuery);
    return result.map((r) => r.item);
  }, [fuse, searchQuery, sortedSongs]);

  return (
    <div className="m-15">
      <div className="flex justify-between mb-4">
        <div className="flex-1 mr-4">
          <input
            type="text"
            placeholder="Search by song title..."
            value={searchQuery}
            onChange={handleSearch}
            className="px-2 py-1 border border-gray-300 rounded-md w-full"
          />
        </div>
        <div>
          <Select value={sortOrder} onChange={handleSortChange}>
            <option value="asc">Date - Newest</option>
            <option value="desc">Date - Oldest</option>
          </Select>
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
      <div className="flex justify-center mt-10">
        <div className="flex space-x-4">
          <FaArrowLeft
            onClick={() => setCurrentPage(currentPage - 1)}
            className={`cursor-pointer ${currentPage === 1 ? 'text-gray-300' : 'text-black'}`}
          />
          <FaArrowRight
            onClick={() => setCurrentPage(currentPage + 1)}
            className={`cursor-pointer ${endIndex >= totalSongs ? 'text-gray-300' : 'text-black'}`}
          />
        </div>
      </div>
    </div>
  );
};

export default SongList;
