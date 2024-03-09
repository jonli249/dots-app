import React, { useState, useEffect, useMemo } from "react";
import axios from "axios";
import { Select } from "@chakra-ui/react";
import Fuse from "fuse.js";
import { FaArrowLeft, FaArrowRight } from "react-icons/fa";
import SongItem from "../../components/songs/songItem";
import SongCard from "./songcard";

interface Song {
  title: string;
  "artist-credit"?: { name: string; artist: { name: string } }[];
  _id: string;
  coverImage: string;
  "first-release-date": string;
  geniusData?: {
    header_image_thumbnail_url: string;
  };
}

interface SongListWithPaginationProps {
  artistId: string;
  artistId2: string;
  songsPerPage: number;
}

const SongListCollab: React.FC<SongListWithPaginationProps> = ({
  artistId,
  artistId2,
  songsPerPage,
}) => {
  const [songs, setSongs] = useState<Song[]>([]);
  const [currentPage, setCurrentPage] = useState<number>(1);
  const [sortOrder, setSortOrder] = useState<"asc" | "desc">("asc");
  const [searchQuery, setSearchQuery] = useState<string>("");

  useEffect(() => {
    const fetchSongs = async () => {
      try {
        const response = await axios.get(
          `https://us-east-1.aws.data.mongodb-api.com/app/dotstester-bpjzg/endpoint/findtwocollabs?artistId=${artistId}&artistId2=${artistId2}`
        );
        if (response.data && Array.isArray(response.data)) {
          setSongs(response.data);
        } else {
          setSongs([]);
          console.error("No songs found for the artist");
        }
      } catch (error) {
        console.error("Error fetching songs:", error);
        setSongs([]);
      }
    };

    if (artistId && artistId2) {
      fetchSongs();
    }
  }, [artistId, artistId2]);
  const fuse = useMemo(
    () =>
      new Fuse(songs, {
        keys: ["title"],
        threshold: 0.3,
      }),
    [songs]
  );

  const filteredSongs = useMemo(() => {
    if (searchQuery && fuse) {
      const results = fuse.search(searchQuery);
      return results.map((result) => result.item);
    }
    return songs;
  }, [searchQuery, fuse, songs]);

  // Apply sorting to filtered (and possibly searched) songs
  const sortedAndFilteredSongs = useMemo(() => {
    return [...filteredSongs].sort((a, b) => {
      const dateA = new Date(a["first-release-date"]).getTime();
      const dateB = new Date(b["first-release-date"]).getTime();
      return sortOrder === "asc" ? dateA - dateB : dateB - dateA;
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
    setSortOrder(e.target.value as "asc" | "desc");
  };

  return (
    <div className="">
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
            <option value="asc">Date - Newest</option>
            <option value="desc">Date - Oldest</option>
            <option> Popularity</option>
          </Select>
        </div>
      </div>
      {/* <div className="grid grid-cols-1 sm:grid-cols-1 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-4 gap-5">
        {displayedSongs.map((song, index) => (
          <SongItem
            key={index}
            title={song.title}
            artistCredit={song["artist-credit"]}
            _id={song._id}
            geniusData={song.geniusData}
          />
        ))}
      </div> */}
      <SongCard />

      <div className="flex justify-center mt-10">
        <div className="flex space-x-4">
          <FaArrowLeft
            onClick={() => setCurrentPage(Math.max(1, currentPage - 1))}
            className={`cursor-pointer ${
              currentPage === 1 ? "text-gray-300" : "text-black"
            }`}
          />
          <FaArrowRight
            onClick={() =>
              setCurrentPage(
                Math.min(
                  Math.ceil(filteredSongs.length / songsPerPage),
                  currentPage + 1
                )
              )
            }
            className={`cursor-pointer ${
              currentPage * songsPerPage >= filteredSongs.length
                ? "text-gray-300"
                : "text-black"
            }`}
          />
        </div>
      </div>
    </div>
  );
};

export default SongListCollab;
