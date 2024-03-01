import React, { useState, useEffect, useMemo } from 'react';
import axios from 'axios';
import { Select } from '@chakra-ui/react';
import Fuse from 'fuse.js';
import { FaArrowLeft, FaArrowRight } from 'react-icons/fa';
import CollaboratorCard from './collaboratorcard';

interface Collaborator {
  _id: string;
  name: string;
  count: number;
  imageUrl: string;
}

interface CollaboratorsProps {
  artistId1: string;
  artistId2: string;
}

const MutualCollabs: React.FC<CollaboratorsProps> = ({ artistId1, artistId2 }) => {
  const [collaborators, setCollaborators] = useState<Collaborator[]>([]);
  const [currentPage, setCurrentPage] = useState<number>(1);
  const [sortOrder, setSortOrder] = useState<'asc' | 'desc'>('asc');
  const [searchQuery, setSearchQuery] = useState<string>('');
  const collaboratorsPerPage = 12;

  useEffect(() => {
    const fetchCollaborators = async () => {
      try {
        const response = await axios.get(`https://us-east-1.aws.data.mongodb-api.com/app/dotstester-bpjzg/endpoint/mutualcollabs?artistId=${artistId1}&artistId2=${artistId2}`);
        if (response.data && Array.isArray(response.data)) {
          setCollaborators(response.data);
        } else {
          console.warn('Expected data to be an array, but received:', response.data);
          setCollaborators([]);
        }
      } catch (error) {
        console.error('Error fetching collaborators:', error);
        setCollaborators([]);
      }
    };

    if (artistId1 && artistId2) {
      fetchCollaborators();
    }
  }, [artistId1, artistId2]);

  const fuse = useMemo(() => new Fuse(collaborators, {
    keys: ['name'],
    threshold: 0.3,
  }), [collaborators]);

  const filteredCollaborators = useMemo(() => {
    if (searchQuery) {
      return fuse.search(searchQuery).map(result => result.item);
    }
    return collaborators;
  }, [searchQuery, fuse, collaborators]);

  const displayedCollaborators = useMemo(() => {
    const startIndex = (currentPage - 1) * collaboratorsPerPage;
    const endIndex = startIndex + collaboratorsPerPage;
    return filteredCollaborators.slice(startIndex, endIndex);
  }, [filteredCollaborators, currentPage, collaboratorsPerPage]);

  return (
    <div className="flex flex-col max-w-[800px] mx-auto xl:px-0 font-inter mt-2">
      <div className="flex justify-between mb-4">
        <input
          type="text"
          placeholder="Search by collaborator name..."
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          className="px-2 py-2 border border-gray-300 rounded-md w-full mr-4"
        />
        <Select placeholder="Sort" value={sortOrder} onChange={(e) => setSortOrder(e.target.value as 'asc' | 'desc')}>
          <option value="asc">Ascending</option>
          <option value="desc">Descending</option>
        </Select>
      </div>
      <div className="grid gap-4 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-4 bg-opacity-90">
        {displayedCollaborators.map((collaborator) => (
          <CollaboratorCard
            key={collaborator._id}
            id={collaborator._id}
            name={collaborator.name}
            imageUrl={collaborator.imageUrl || '/path/to/default/image'} // Adjust the default image path as necessary
          />
        ))}
      </div>
      <div className="flex justify-center mt-10">
        <FaArrowLeft
          onClick={() => setCurrentPage(Math.max(1, currentPage - 1))}
          className={`cursor-pointer ${currentPage === 1 ? 'text-gray-300' : 'text-black'}`}
        />
        <FaArrowRight
          onClick={() => setCurrentPage(Math.min(Math.ceil(filteredCollaborators.length / collaboratorsPerPage), currentPage + 1))}
          className={`cursor-pointer ${currentPage * collaboratorsPerPage >= filteredCollaborators.length ? 'text-gray-300' : 'text-black'}`}
        />
      </div>
    </div>
  );
};

export default MutualCollabs;
