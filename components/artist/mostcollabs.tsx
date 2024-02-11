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
    // Fetch the data from the HTTPS endpoint
    if (!artistId) {
        // Handle the case when artistId is not defined yet
        setLoading(false);
        return;
      }
    fetch(`https://us-east-1.aws.data.mongodb-api.com/app/dotstester-bpjzg/endpoint/mostcollabs?artistId=${artistId}`)
      .then((response) => response.json())
      .then((data: Collaborator[]) => {
        setCollaborators(data);
        setLoading(false);
      })
      .catch((error) => {
        console.error('Error fetching collaborators:', error);
        setLoading(false);
      });
  }, [artistId]);
  console.log("TYPE", typeof artistId);
  if (loading) {
    return <p>Loading collaborators...</p>;
  }

  return (
    <div className="grid grid-cols-4 gap-4 sm:grid-cols-2 lg:grid-cols-3 bg-opacity-90">
      {collaborators.map((collaborator) => (
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
