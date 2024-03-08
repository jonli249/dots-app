import React, { useEffect, useState } from 'react';
import axios from 'axios';
import CollaboratorCard from './collaboratorcard';
import { useRouter } from 'next/router';


interface DegreesOfSeparationProps {
  originalCollaboratorId: string;
  selectedCollaboratorId: string;
}

interface DegreesOfSeparationData {
  degrees_of_separation: number;
  path: Array<Artist>;
}

interface Artist {
    artist_id: string;
    artist_name: string | null;
    strArtistThumb?: string;
  }

const DegreesOfSeparation: React.FC<DegreesOfSeparationProps> = ({ originalCollaboratorId, selectedCollaboratorId }) => {
  const [isLoading, setIsLoading] = useState(true);
  const [pathData, setPathData] = useState<DegreesOfSeparationData | null>(null);
  const router = useRouter();


  const fetchArtistInfo = async (artistId: string): Promise<Artist> => {
    console.log(`Fetching info for artist ID: ${artistId}`); 
    try {
      const response = await axios.get(`https://us-east-1.aws.data.mongodb-api.com/app/dotstester-bpjzg/endpoint/artistdata?artistId=${artistId}`);
      return {
        artist_id: response.data.id,
        artist_name: response.data.name,
        strArtistThumb: response.data.strArtistThumb,
      };
    } catch (error) {
      console.error(`Error fetching artist (${artistId}) information:`, error);
      return { artist_id: artistId, artist_name: 'Unknown Artist', strArtistThumb: '' }; // Provide fallback values
    }
  };
  useEffect(() => {
    const fetchDegreesOfSeparation = async () => {
        
      setIsLoading(true);
      try {
        const response = await axios.get(`https://dots-app-798a4cdac48d.herokuapp.com/path/${originalCollaboratorId}/${selectedCollaboratorId}`);
        console.log('Degrees of separation data:', response.data);
        const path = response.data.path;

        const detailedPath: Artist[] = await Promise.all(response.data.path.map((artist: any) => fetchArtistInfo(artist.artist_id)));

        setPathData({
          degrees_of_separation: response.data.degrees_of_separation,
          path: detailedPath,
        });
        console.log(path);
      } catch (error) {
        console.error('Error fetching degrees of separation:', error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchDegreesOfSeparation();
  }, [originalCollaboratorId, selectedCollaboratorId]);

  if (isLoading) {
    return (
      <div className="flex flex-col items-center">
        <h2 className='mb-4'>Finding Degrees of Separation</h2>
        <div className="pulse-loader" />
      </div>
    );
  }

  if (!pathData) {
    return <div>No data found.</div>;
  }

  return (
    <div className="text-center">
      <h2 className="mb-4">Degrees of separation: {pathData.degrees_of_separation}</h2>
      <div className="flex flex-col items-center">
      <div className="w-full max-w-[190px]">
          {pathData.path.map((artist, index) => (
            <React.Fragment key={artist.artist_id}>
              {index > 0 && <span>↓</span>}
              <CollaboratorCard
                id={artist.artist_id}
                name={artist.artist_name ?? 'unknown artist'}
                imageUrl={artist.strArtistThumb || ''}
                onClick={() => {
                  router.push(`/artists/${artist.artist_id}`);
                }}
              />
            </React.Fragment>
          ))}
        </div>
        
      </div>
    </div>
  );
};

export default DegreesOfSeparation;
