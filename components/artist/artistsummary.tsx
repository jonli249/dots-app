import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Badge } from '@chakra-ui/react';
import { Button } from '@chakra-ui/react';
import { Image, Tooltip, Skeleton, SkeletonCircle} from '@chakra-ui/react';
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
  Box,
} from '@chakra-ui/react';



interface ArtistSummaryProps {
  artistId: string;
}


interface ArtistInfo {
  name: string;
  strArtistThumb?: string;
  area?: {
    'iso-3166-1-codes': string[];
  };
  geniusData?: {alternate_names: string[]};
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
          const { name, strArtistThumb, geniusData,  area} = response.data;
          setArtistInfo({ name, strArtistThumb, geniusData, area});
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
    return (
      <div style={{ width: "100%", maxWidth: 750 }}>
      <div className='flex aic' style={{ gap: 20 }}>
          <SkeletonCircle width={100} height={100} />
          <Skeleton height={7} w={"100px"} />
      </div>
      <Skeleton h={10} mt={4} />
      <div className='flex fdc' style={{ gap: 10, width: "100%", marginTop: 10 }}>
          <div className='flex' style={{ gap: 10, flex: 1 }}>
              <Skeleton fadeDuration={4} style={{ flex: 1, height: 60 }} />
          </div>
      </div>
  </div>
      );
  }

  const photoSource = artistInfo.strArtistThumb || '/avatar.png';

  const alias = artistInfo.geniusData?.alternate_names;

  return (
    <div className="sm:flex w-full mt-6 justify-between mx-auto max-w-[750px]">
      <div className="space-x-3 flex flex-col sm:flex-row items-center justify-between sm:justify-normal sm:items-start">
        <div>
          <Image
            src={photoSource}
            alt="/avatar.png"
            className="w-24 h-24 rounded-full bg-white p-1 shadow-lg"
            htmlWidth={72}
            htmlHeight={72}
          />
        </div>
        <div>
          <h1 className="font-bold mt-4 text-xl">{artistInfo.name}</h1>
          <div className="mt-2">
            <span className='text-sm font-bold'>Other names: </span>
            {artistInfo.geniusData?.alternate_names?.map((alias, index) => (
              <span key={index}>
                {index !== 0 && ', '}
                <span className={index < 2 ? 'text-xs' : 'text-xs'}>
                  {index < 2 ? alias : (
                    <Popover trigger="hover" key={index}>
                      <PopoverTrigger>
                        <span>{index === 2 && '...'}</span>
                      </PopoverTrigger>
                      <PopoverContent>
                        <PopoverBody>
                          {artistInfo.geniusData?.alternate_names.slice(2).join(', ')}
                        </PopoverBody>
                      </PopoverContent>
                    </Popover>
                  )}
              </span>
            </span>
            ))}
          </div>
        </div>
      </div>
      <div className="mt-4 sm:mt-0 flex ml-auto flex-col space-y-2 justify-between">
              <Toaster />
              <Popover isOpen={isOpen} onClose={onClose}>
              <PopoverTrigger>
                <Button  colorScheme='black' color="black" className="transition-all duration-200 ease-in-out hover:-translate-y-[2px] text-[15px] border-[2px] justify-center items-center px-[16px] py-[7px] border-black rounded-[5px] flex space-x-1 text-black w-full" leftIcon={<WarningTwoIcon />} onClick={handleBadDataButtonClick}>
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
                  <Button colorScheme='black' color="black" className="transition-all duration-200 ease-in-out hover:-translate-y-[2px] text-[15px] px-[14px] py-[7px] justify-center items-center border-[2px] border-black rounded-full flex space-x-1 font-bold" size="sm" onClick={handleButtonClick}>
                    Submit
                  </Button>
                </PopoverFooter>
              </PopoverContent>
            </Popover>
            <div className='mt-2 flex justify-end'> 
            <Tooltip label="Coming Soon!" aria-label='A tooltip'>
                <Button isDisabled colorScheme='black' color="black" className="transition-all duration-200 ease-in-out hover:-translate-y-[2px] text-[15px] px-[14px] py-[7px] justify-center items-center border-[2px] border-black rounded-full flex space-x-1 font-bold" onClick={handleButtonClick}>Claim</Button>
              </Tooltip>
            </div>
       
        
      </div>
    </div>
  );
};

export default ArtistSummary;
