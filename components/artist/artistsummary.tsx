import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Badge } from '@chakra-ui/react';
import { Button } from '@chakra-ui/react';
import { Image } from '@chakra-ui/react';
import { Toaster, toast } from 'sonner';
import { WarningTwoIcon } from '@chakra-ui/icons';


interface ArtistSummaryProps {
  artistId: string;
}

interface ArtistInfo {
  name: string;
  strArtistThumb?: string;
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
          const { name, strArtistThumb, tags } = response.data;
          tags.sort((a: { count: number; name: string }, b: { count: number; name: string }) => b.count - a.count);
          setArtistInfo({ name, strArtistThumb, tags });
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

  const handleButtonClick = async () => {
    try {
      
        const response =  await axios.post(`https://us-east-1.aws.data.mongodb-api.com/app/dotstester-bpjzg/endpoint/baddatacollab?id=${artistId}`);
        if (response.status === 200) {
          toast.success('Thanks for the feedback!');
        } else {
          toast.error('Failed to mark bad data');
        }
        
    } catch (error) {
      console.error('Error updating document timestamp:', error);
    }
  };

  

  if (!artistInfo) {
    return <div>Loading artist information...</div>;
  }

  const photoSource = artistInfo.strArtistThumb || '/avatar.png';

  // Define the maximum number of tags to display initially
  const maxTagsToShow = 3;

  return (
    <div className=" p-4 relative flex justify-between">
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
      <div>
        <Toaster />
        <Button className="bg-gray-200 hover:bg-gray-300 align-middle	" leftIcon={<WarningTwoIcon />} onClick={handleButtonClick}>
          Bad Data
        </Button>
      </div>
    </div>
  );
};

export default ArtistSummary;
