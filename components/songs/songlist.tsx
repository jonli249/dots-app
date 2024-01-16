import React from 'react';
import SongItem from '../../components/songs/songItem';
import { Button } from '@/components/ui/button';


interface Song {
  title: string;
  artist?: string[];
  _id: string;
  coverImage: string;
}

interface SongListProps {
  songs: Song[];
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
    return (
      <div>
        <div className="grid grid-cols-4 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
          {songs.map((song, index) => (
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
