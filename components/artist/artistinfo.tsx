import React, { useEffect, useState } from "react";
import axios from "axios";
import Link from "next/link";
import { Badge } from "@chakra-ui/react";
import { Button } from "@chakra-ui/react";
import { Image, Tooltip, Skeleton, SkeletonCircle } from "@chakra-ui/react";
import { Toaster, toast } from "sonner";
import { WarningTwoIcon } from "@chakra-ui/icons";
import { FaInstagram } from 'react-icons/fa';
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
  Flex, Text, CloseButton, Spacer 
} from "@chakra-ui/react";
import { Box, VStack } from "@chakra-ui/react";

interface ArtistInfoProps {
  artistId: string;
}

interface ArtistInfo {
    bio_and_accolades?: {
        content: string; // Add more fields if necessary
      };
}

const ArtistInfo: React.FC<ArtistInfoProps> = ({ artistId }) => {
  const [artistInfo, setArtistInfo] = useState<ArtistInfo | null>(null);
  const [feedback, setFeedback] = useState<string>("");
  const { isOpen, onOpen, onClose } = useDisclosure();
  const [isBannerVisible, setBannerVisible] = useState(true);


  useEffect(() => {
    const fetchArtistSummary = async () => {
        try {
          const response = await axios.get(
            `https://dots-app-798a4cdac48d.herokuapp.com/artist-bio/${artistId}`
          );
    
          if (response.data && response.data.artist_name) {
            const { artist_name, bio_and_accolades } = response.data;
            // Assuming the content you want is in the first choice of bio_and_accolades
            const content = bio_and_accolades.choices[0].message.content;
            setArtistInfo({
              bio_and_accolades: { content },
            });
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

  return (
    <div className="sm:flex w-full mt-6 justify-between mx-auto">
       <div className="sm:flex w-full mt-6 justify-between mx-auto">
    
    {artistInfo?.bio_and_accolades && (
      <Box p={5} shadow="md" borderWidth="1px" borderRadius="md" mt={4}>
      <Text mb="2" fontSize="lg" fontWeight="bold">Bio:</Text>
      <VStack align="start" spacing={4}>
        <Text textAlign="justify">{artistInfo.bio_and_accolades.content}</Text>
        {/* If you have accolades as a list, you could map over them like this: */}
        {artistInfo.accolades && artistInfo.accolades.map((accolade, index) => (
          <Badge key={index} colorScheme="green">{accolade}</Badge>
        ))}
        </VStack>
    </Box>
    )}
    
    {/* More components as needed */}
  </div>
  </div>
);
    }

export default ArtistInfo;
