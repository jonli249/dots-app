import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Badge } from '@chakra-ui/react';
import { Button } from '@chakra-ui/react';
import { Image } from '@chakra-ui/react';
import { Toaster, toast } from 'sonner';
import { WarningTwoIcon } from '@chakra-ui/icons';
import {
  Popover,
  PopoverTrigger,
  PopoverContent,
  PopoverHeader,
  PopoverBody,
  PopoverFooter,
  PopoverArrow,
  PopoverCloseButton,
  PopoverAnchor,
  Input, 
  useDisclosure, 
} from '@chakra-ui/react';



interface ArtistSummaryProps {
  artistId: string;
}


interface ArtistInfo {
  name: string;
  strArtistThumb?: string;
  tags: { count: number; name: string }[];
  area?: {
    'iso-3166-1-codes': string[];
  };
}


const ArtistSummary: React.FC<ArtistSummaryProps> = ({ artistId }) => {
  const [artistInfo, setArtistInfo] = useState<ArtistInfo | null>(null);
  const [feedback, setFeedback] = useState<string>('');
  const { isOpen, onOpen, onClose } = useDisclosure();



  useEffect(() => {
    const fetchArtistSummary = async () => {
      try {
        const response = await axios.get(
          `https://us-east-1.aws.data.mongodb-api.com/app/dotstester-bpjzg/endpoint/artistdata?artistId=${artistId}`
        );

        if (response.data && response.data.name) {
          const { name, strArtistThumb, tags, area} = response.data;
          tags.sort((a: { count: number; name: string }, b: { count: number; name: string }) => b.count - a.count);
          setArtistInfo({ name, strArtistThumb, tags, area});
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

  const handleBadDataButtonClick = () => {
    onOpen();
  };

  const handleButtonClick = async () => {
    try {
      
        const response =  await axios.post(`https://us-east-1.aws.data.mongodb-api.com/app/dotstester-bpjzg/endpoint/baddatacollab?id=${artistId}&note=${feedback}`);
        if (response.status === 200) {
          toast.success('Thanks for the feedback!');
          setFeedback('');
          onClose();
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
              <Popover isOpen={isOpen} onClose={onClose}>
              <PopoverTrigger>
                <Button className="bg-gray-200 hover:bg-gray-300 align-middle" leftIcon={<WarningTwoIcon />} onClick={handleBadDataButtonClick}>
                  Bad Data
                </Button>
              </PopoverTrigger>
              <PopoverContent>
                <PopoverArrow />
                <PopoverCloseButton />
                <PopoverHeader>Submit Feedback</PopoverHeader>
                <PopoverBody>
                  <Input
                    placeholder="Describe the issue"
                    value={feedback}
                    onChange={(e) => setFeedback(e.target.value)}
                  />
                </PopoverBody>
                <PopoverFooter display="flex" justifyContent="flex-end">
                  <Button size="sm" onClick={handleButtonClick}>
                    Submit
                  </Button>
                </PopoverFooter>
              </PopoverContent>
            </Popover>
       
        
      </div>
    </div>
  );
};

export default ArtistSummary;
