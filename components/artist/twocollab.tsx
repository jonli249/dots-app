import React, { useEffect, useState } from 'react';
import axios from 'axios';
import CollaboratorCard from './collaboratorcard';
import Image from 'next/image';
import { Button } from "@chakra-ui/react";
import SearchIcon from '../icons/AppIcons';
import FlowLine from '../icons/flowline';
import SongListCollab from '../songs/songlistcollab';

interface ArtistSummaryProps {
  artistId: string;
}

interface ArtistInfo {
  id: string;
  name: string;
  strArtistThumb?: string;
}

interface Artist {
  id: string;
  name: string;
  strArtistThumb?: string;
}

const TwoCollab: React.FC<ArtistSummaryProps> = ({ artistId }) => {
    const [originalCollaboratorInfo, setOriginalCollaboratorInfo] = useState<ArtistInfo | null>(null);
    const [selectedCollaboratorInfo, setSelectedCollaboratorInfo] = useState<ArtistInfo | null>(null);
    const [secondCollaboratorInfo, setSecondCollaboratorInfo] = useState<ArtistInfo | null>(null); // New state for second collaborator
    const [searchTerm, setSearchTerm] = useState('');
    const [searchResults, setSearchResults] = useState<Artist[]>([]);
    const [bothCollaboratorsSelected, setBothCollaboratorsSelected] = useState(false);

  useEffect(() => {
    const fetchOriginalCollaboratorInfo = async () => {
      try {
        const response = await axios.get(
          `https://us-east-1.aws.data.mongodb-api.com/app/dotstester-bpjzg/endpoint/artistdata?artistId=${artistId}`
        );

        if (response.data && response.data.name) {
          const { id, name, strArtistThumb } = response.data;
          setOriginalCollaboratorInfo({ id, name, strArtistThumb });
        } else {
          setOriginalCollaboratorInfo(null);
          console.error('No artist information found');
        }
      } catch (error) {
        console.error('Error fetching artist information:', error);
        setOriginalCollaboratorInfo(null);
      }
    };

    fetchOriginalCollaboratorInfo();
  }, [artistId]);

  const handleSearch = async (searchTerm: string) => {
    setSearchTerm(searchTerm);
    try {
      const response = await axios.get(
        `https://us-east-1.aws.data.mongodb-api.com/app/dotstester-bpjzg/endpoint/findcollaboratornames?collabname=${searchTerm}`
      );
      setSearchResults(response.data || []);
    } catch (error) {
      console.error('Error fetching search results:', error);
      setSearchResults([]);
    }
  };

  const handleSelectCollaborator = async (selectedArtist: Artist) => {
    const { id, name, strArtistThumb } = selectedArtist;
    setSelectedCollaboratorInfo({ id, name, strArtistThumb });
    setSearchResults([]);
    setSearchTerm('');
  };

  const handleResetSelectedCollaborator = () => {
    setSelectedCollaboratorInfo(null);
    setSearchTerm('');
    setSearchResults([]);
  };

  return (
    <>
    <div className="p-4 relative flex items-center justify-center">
      <div className="relative flex items-center space-x-2 sm:space-x-16 mt-4 mb-3">
        {originalCollaboratorInfo && (
          <CollaboratorCard
            id={originalCollaboratorInfo.id}
            name={originalCollaboratorInfo.name}
            imageUrl={originalCollaboratorInfo.strArtistThumb || ''}
          />
        )}
        {selectedCollaboratorInfo && (
          <div className="flex items-center">
            <CollaboratorCard
              id={selectedCollaboratorInfo.id}
              name={selectedCollaboratorInfo.name}
              imageUrl={selectedCollaboratorInfo.strArtistThumb || ''}
            />
            <Button className="text-lg ml-2" onClick={handleResetSelectedCollaborator}>X</Button>
          </div>
        )}
        {!selectedCollaboratorInfo && (
          <div className="relative">
            <div className="border border-gray-300 border-black bg-white rounded-full h-12 px-3 py-2 flex items-center space-x-3">
              <SearchIcon color="#878b94" />
              <input
                type="text"
                value={searchTerm}
                onChange={(e) => handleSearch(e.target.value)}
                placeholder="Search collaborators..."
                className="text-[#a4a4a4] text-sm sm:text-base font-bold outline-none"
              />
            </div>
            {searchResults.length > 0 && (
              <div className="absolute z-10 mt-1 w-full bg-white border border-gray-300 rounded-md shadow-lg">
                {searchResults.map((result) => (
                  <div
                    key={result.id}
                    className="p-2 hover:bg-gray-100 cursor-pointer flex items-center"
                    onClick={() => handleSelectCollaborator(result)}
                  >
                    {result.strArtistThumb ? (
                      <div className="relative w-8 h-8 mr-2">
                        <Image
                          src={result.strArtistThumb}
                          alt="Person"
                          layout="fill"
                          objectFit="cover"
                          className="rounded-full"
                        />
                      </div>
                    ) : (
                      <Image
                        src="/avatar.png"
                        alt="Default"
                        width={32}
                        height={32}
                        className="rounded-full mr-2"
                      />
                    )}
                    <span>{result.name}</span>
                  </div>
                ))}
              </div>
            )}
          </div>
        )}
      </div>
    </div>
    <FlowLine />
    <div className = "mt-2">
        {originalCollaboratorInfo && selectedCollaboratorInfo && (
            <SongListCollab 
            artistId={originalCollaboratorInfo.id} 
            artistId2={selectedCollaboratorInfo.id}
            songsPerPage = {12}
            />
        )}
    </div>
    

    </>
  );
};

export default TwoCollab;