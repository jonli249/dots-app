import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Badge } from '@chakra-ui/react';
import { Button } from '@chakra-ui/react';
import { Image } from '@chakra-ui/react';

interface ArtistSummaryProps {
  artistId: string;
}

interface ArtistInfo {
  name: string;
  photoUrl: string;
  tags: { count: number; name: string }[];
  // Add other artist information fields here
}

const ArtistSummary: React.FC<ArtistSummaryProps> = ({ artistId }) => {
  const [artistInfo, setArtistInfo] = useState<ArtistInfo | null>(null);

  useEffect(() => {
    const fetchArtistSummary = async () => {
      try {
        const response = await axios.get(
          `https://us-east-1.aws.data.mongodb-api.com/app/dotstester-bpjzg/endpoint/artistdata?artistId=${artistId}`
        );

        if (response.data && response.data.name) {
          const { name, photoUrl, tags } = response.data;
          tags.sort((a: { count: number; name: string }, b: { count: number; name: string }) => b.count - a.count);
          setArtistInfo({ name, photoUrl, tags });
        } else {
          setArtistInfo(null);
          console.error('No artist information found');
        }
      } catch (error) {
        console.error('Error fetching artist information:', error);
        setArtistInfo(null);
      }
    };

    fetchArtistSummary();
  }, [artistId]);

  if (!artistInfo) {
    return <div>Loading artist information...</div>;
  }

  const photoSource = artistInfo.photoUrl || '/avatar.png';

  // Define the maximum number of tags to display initially
  const maxTagsToShow = 3;

  return (
    <div className="p-4 relative">
      
      <div className="flex items-center">
        <div className="mr-4">
          <Image
            src={photoSource}
            alt="/avatar.png"
            className="w-24 h-24 rounded-full"
            htmlWidth={400}
            htmlHeight={400}
          />
        </div>
        <div>
          <h1 className="font-bold mt-4">{artistInfo.name}</h1>
          <div className="mt-2">
            {artistInfo.tags.slice(0, maxTagsToShow).map((tag, index) => (
              <Badge
                key={index}
                className="inline-block text-white px-1 py-1 rounded-full mr-1"
              >
                {tag.name}
              </Badge>
            ))}
            {artistInfo.tags.length > maxTagsToShow && (
              <span className="cursor-pointer text-black-500 hover:underline">
                {`+${artistInfo.tags.length - maxTagsToShow} more`}
              </span>
            )}
          </div>
        </div>
      </div>
      <Button className="bg-gray-500 text-white px-4 py-2 rounded-lg absolute top-4 right-4">
        Favorite
      </Button>
    </div>
  );
};

export default ArtistSummary;
