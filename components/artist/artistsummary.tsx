import React, { useEffect, useState } from 'react';
import axios from 'axios';
import Image from 'next/image';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';

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

  const photoSource = artistInfo.photoUrl || '/album.svg';

  // Define the maximum number of tags to display initially
  const maxTagsToShow = 3;

  return (
    <div className="p-4 relative">
      <Button className="bg-gray-500 text-white px-4 py-2 rounded-lg absolute top-4 right-4">
        Favorite
      </Button>
      <div className="flex items-center">
        <div className="mr-4">
          <Image
            src={photoSource}
            alt="/album.svg"
            className="w-24 h-24 rounded-full"
            width={24}
            height={24}
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
              <span className="cursor-pointer text-blue-500 hover:underline">
                {`+${artistInfo.tags.length - maxTagsToShow} more`}
              </span>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default ArtistSummary;
