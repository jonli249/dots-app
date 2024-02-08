import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import Image from 'next/image';

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
        <Link key={collaborator._id} href={`/artists/${collaborator._id}`} className="flex flex-col items-center bg-white border border-gray-200 rounded-lg shadow hover:bg-gray-100 dark:border-gray-700 dark:bg-gray-800 dark:hover:bg-gray-700">
            <Image
              className="object-cover w-full rounded-t-lg h-96 md:h-auto md:w-48 md:rounded-none md:rounded-s-lg"
              src={collaborator.imageUrl} // Replace with the actual collaborator image URL
              alt={collaborator.name}
            />
            <div className="flex flex-col justify-between p-4 leading-normal">
              <h5 className="mb-2 text-2xl font-bold tracking-tight text-gray-900 dark:text-white">
                {collaborator.name}
              </h5>
              <p className="mb-3 font-normal text-gray-700 dark:text-gray-400">
                Count: {collaborator.count}
              </p>
            </div>
        </Link>
      ))}
    </div>
  );
};

export default Collaborators;
