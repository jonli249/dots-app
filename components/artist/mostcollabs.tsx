import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import CollabCard from './collabpersoncard'; 

interface Collaborator {
  _id: string;
  name: string;
  count: number;
  imageUrl: string;
}

interface CollaboratorsProps {
  artistId?: string;
}

const Collaborators: React.FC<CollaboratorsProps> = ({ artistId }) => {
  const [collaborators, setCollaborators] = useState<Collaborator[]>([]);
  const [loading, setLoading] = useState<boolean>(true);

  useEffect(() => {
    if (!artistId) {
      setLoading(false);
      return;
    }
    fetch(`https://us-east-1.aws.data.mongodb-api.com/app/dotstester-bpjzg/endpoint/mostcollabs?artistId=${artistId}`)
      .then((response) => response.json())
      .then((data) => {
        console.log("API response data:", data); // Log the response data to inspect its structure
        if (Array.isArray(data)) {
          setCollaborators(data);
        } else {
          console.warn('Expected data to be an array, but received:', data);
          setCollaborators([]);
        }
        setLoading(false);
      })
      .catch((error) => {
        console.error('Error fetching collaborators:', error);
        setLoading(false);
      });
  }, [artistId]);
  

  return (
    <div className="grid grid-cols-4 gap-4 sm:grid-cols-2 lg:grid-cols-3 bg-opacity-90">
      {collaborators
        .filter(collaborator => collaborator._id && collaborator.name )
        .map((collaborator) => (
        <CollabCard
          key={collaborator._id}
          id={collaborator._id}
          name={collaborator.name}
          imageUrl={collaborator.imageUrl}
          count={collaborator.count} // Pass count to CollabCard component
        />
      ))}
    </div>
  );
};

export default Collaborators;
