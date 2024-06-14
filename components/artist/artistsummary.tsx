import React, { useEffect, useState } from "react";
import axios from "axios";
import Link from "next/link";
import { Badge } from "@chakra-ui/react";
import { Button } from "@chakra-ui/react";
import { Image, Tooltip, Skeleton, SkeletonCircle } from "@chakra-ui/react";
import { Toaster, toast } from "sonner";
import { WarningTwoIcon } from "@chakra-ui/icons";
import { FaSpotify, FaDeezer, FaTwitter, FaFacebook, FaSoundcloud, FaApple, FaYoutube, FaInstagram ,  FaGuitar, FaDrum, FaMusic } from 'react-icons/fa';
import { GiTambourine, GiGuitarBassHead, GiDrumKit , GiPianoKeys} from 'react-icons/gi';
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
  Flex, Text, CloseButton, Spacer 
} from "@chakra-ui/react";

interface ArtistSummaryProps {
  artistId: string;
}

interface LinkInfo {
  type: string;
  url: string;
}

interface IconMap {
  [key: string]: { icon: JSX.Element, label: string };
}

interface InstrumentInfo {
  type: string;
  count: string;
}

interface ArtistInfo {
  name: string;
  strArtistThumb?: string;
  area?: {
    "iso-3166-1-codes": string[];
  };
  geniusData?: { alternate_names: string[], instagram_name: string };
  management?: {company: string};
  links?: LinkInfo[];
  instruments?: InstrumentInfo[];
}

const ArtistSummary: React.FC<ArtistSummaryProps> = ({ artistId }) => {
  const [artistInfo, setArtistInfo] = useState<ArtistInfo | null>(null);
  const [feedback, setFeedback] = useState<string>("");
  const { isOpen, onOpen, onClose } = useDisclosure();
  const [isBannerVisible, setBannerVisible] = useState(true);


  useEffect(() => {
    const fetchArtistSummary = async () => {
      try {
        const response = await axios.get(
          `https://us-east-1.aws.data.mongodb-api.com/app/dotstester-bpjzg/endpoint/artistdata?artistId=${artistId}`
        );

        if (response.data && response.data.name) {
          const { name, strArtistThumb, geniusData, area, management, links, instruments} = response.data;
          setArtistInfo({ name, strArtistThumb, geniusData, area, management, links, instruments});
        } else {
          setArtistInfo(null);
          console.error("No artist information found");
        }
      } catch (error) {
        console.error("Error fetching artist information:", error);
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
      const response = await axios.post(
        `https://us-east-1.aws.data.mongodb-api.com/app/dotstester-bpjzg/endpoint/baddatacollab?id=${artistId}&note=${feedback}`
      );
      if (response.status === 200) {
        toast.success("Thanks for the feedback!");
        setFeedback("");
        onClose();
      } else {
        toast.error("Failed to mark bad data");
      }
    } catch (error) {
      console.error("Error updating document timestamp:", error);
    }
  };

  ///FaSpotify, FaDeezer, FaTwitter, FaFacebook, FaSongkick, FaSoundcloud, FaApple, FaYoutube, FaInstagram
  const renderLinks = (links: LinkInfo[]) => {
    const iconMap: { [key: string]: JSX.Element } = {
      instagram: <FaInstagram size="24" color="#000000"/>,
      spotify: <FaSpotify size="24" color="#000000"/>,
      twitter: <FaTwitter size="24" color="#000000"/>,
      youtube: <FaYoutube size="24" color="#000000"/>,
      soundcloud: <FaSoundcloud size="24" color="#000000"/>,
      
    };
    
  
    return links.map((link, index) => {
      const IconComponent = iconMap[link.type.toLowerCase()];
      if (!IconComponent) return null;
  
      return (
        <Link key={index} href={link.url} target="_blank" rel="noopener noreferrer" aria-label={`Artist's ${link.type}`}>
          {IconComponent}
        </Link>
      );
    });
  };

  const renderInstruments = (instruments: InstrumentInfo[]) => {
    if (!instruments) return null;
    const instrumentCounts: { [key: string]: number } = {};
    instruments.forEach(({ type, count }) => {
      const normalizedType = type.replace(/guitar|electric guitar|acoustic guitar/, 'guitar') 
                                .replace(/drums \(drum set\)|percussion/, 'drums')
                                .replace(/bass guitar|bass/, 'bassguitar') 
                                .replace(/tambourine/, 'tambourine')
                                .replace(/keyboard/, 'piano');
      instrumentCounts[normalizedType] = (instrumentCounts[normalizedType] || 0) + parseInt(count, 10);
    });

    const iconMap: IconMap = {
      guitar: { icon: <FaGuitar size="20" />, label: "Guitar"},
      bassguitar: { icon: <GiGuitarBassHead size="20" />, label: "Bass Guitar"},
      piano: { icon: <GiPianoKeys size="20" />, label: "Piano/Keys"},
      drums: { icon: <GiDrumKit size="20" />, label: "Drums"},
      tambourine: { icon: <GiTambourine size="20" />, label: "Drums"},
    };

    return Object.entries(instrumentCounts)
      .sort((a, b) => b[1] - a[1])
      .map(([type, count]) => {
        if (iconMap[type]) {
          return (
            <Tooltip key={type} label={`${iconMap[type].label} x${count}`} placement="top" hasArrow>
              <Button size="md" bg="gray.200" _hover={{ bg: "gray.300" }}>
                {iconMap[type].icon}
              </Button>
            </Tooltip>
          );
        }
      });
  };
        

    

  if (!artistInfo) {
    return (
      <div style={{ width: "100%", maxWidth: 750 }}>
        <div className="flex aic" style={{ gap: 20 }}>
          <SkeletonCircle width={100} height={100} />
          <Skeleton height={7} w={"100px"} />
        </div>
        <Skeleton h={10} mt={4} />
        <div
          className="flex fdc"
          style={{ gap: 10, width: "100%", marginTop: 10 }}
        >
          <div className="flex" style={{ gap: 10, flex: 1 }}>
            <Skeleton fadeDuration={4} style={{ flex: 1, height: 60 }} />
          </div>
        </div>
      </div>
    );
  }

  const photoSource = artistInfo.strArtistThumb || "/avatar.png";

  const alias = artistInfo.geniusData?.alternate_names;

  

  return (
    <div className="sm:flex w-full mt-6 justify-between mx-auto">
      
      

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
        <div >
        <div className="sm:content-center md:content-start">
      <h1 className="font-bold mt-4 text-4xl">{artistInfo.name}</h1>
    </div>
            {artistInfo.geniusData?.alternate_names && artistInfo.geniusData.alternate_names.length > 0 && (
          <div className="mt-2">
            <span className="text-sm font-bold">Other names: </span>
            {artistInfo.geniusData.alternate_names.map((alias, index) => (
              <span key={index}>
                {index !== 0 && index < 3 && ", "}
                {index < 2 ? (
                  <span className="text-xs">{alias}</span>
                ) : (
                  index === 2 && (
                    <Popover trigger="hover">
                      <PopoverTrigger>
                        <span className="font-bold text-xs cursor-pointer">see more</span>
                      </PopoverTrigger>
                      <PopoverContent>
                        <PopoverBody className="text-xs">
                          {artistInfo.geniusData?.alternate_names.slice(2).join(", ")}
                        </PopoverBody>
                      </PopoverContent>
                    </Popover>
                  )
                )}
              </span>
            ))}
          </div>
        )}


              {artistInfo.management && (
              <>
                <span className="text-sm">
                  <span className="font-bold">Management:</span>{" "}
                  {artistInfo.management.company}
                </span>
              </>
            )}
            <Flex mt="1" ml="auto" direction="column">
          <Flex direction="row" gap="2" mt="0">
            {artistInfo.instruments && renderInstruments(artistInfo.instruments)}
          </Flex>
          <Toaster />
          </Flex>
        </div>
      </div>
      
      
      <div className="mt-1 sm:mt-0 flex ml-auto flex-col space-y-2 justify-start">
      <Popover isOpen={isOpen} onClose={onClose}>
          <PopoverTrigger>
            <Button
              colorScheme="black"
              color="black"
              className="transition-all duration-200 ease-in-out hover:-translate-y-[2px] text-[15px] border-[2px] justify-center items-center px-[16px] py-[7px] border-black rounded-[5px] flex space-x-1 text-black w-full"
              leftIcon={<WarningTwoIcon />}
              onClick={handleBadDataButtonClick}
            >
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
              <Button
                colorScheme="black"
                color="black"
                className="transition-all duration-200 ease-in-out hover:-translate-y-[2px] text-[15px] px-[14px] py-[7px] justify-center items-center border-[2px] border-black rounded-full flex space-x-1 font-bold"
                size="sm"
                onClick={handleButtonClick}
              >
                Submit
              </Button>
            </PopoverFooter>
          </PopoverContent>
        </Popover>
        <div className="mt-4 sm:mt-0 flex ml-auto flex-row space-x-2 justify-between">
          {artistInfo.links &&  renderLinks(artistInfo.links)}
        
        </div>
        
         
        <Toaster />
       
        {/*
        <div className="mt-2 flex justify-end">
          <Tooltip label="Coming Soon!" aria-label="A tooltip">
            <Button
              isDisabled
              colorScheme="black"
              color="black"
              className="transition-all duration-200 ease-in-out hover:-translate-y-[2px] text-[15px] px-[14px] py-[7px] justify-center items-center border-[2px] border-black rounded-full flex space-x-1 font-bold"
              onClick={handleButtonClick}
            >
              Claim
            </Button>
          </Tooltip>
          </div> */}
      </div>
    </div>
  );
};

export default ArtistSummary;
