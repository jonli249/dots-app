import React, { useState, useEffect, useRef } from "react";
import {
  Box,
  Flex,
  Text,
  VStack,
  Divider,
  useDisclosure,
  Icon,
  Accordion,
  AccordionItem,
  AccordionButton,
  AccordionPanel,
  Skeleton,
  useOutsideClick,
} from "@chakra-ui/react";
import { SearchIcon } from "@chakra-ui/icons";
import axios from "axios";
import debounce from "lodash/debounce";
import PersonCard from "../artist/personcard";
import SongItem from "../songs/songItem";
import Image from "../../node_modules/next/image";

interface Artist {
  id: string;
  name: string;
  strArtistThumb?: string;
}

interface Song {
  _id: string;
  title: string;
  "artist-credit": { name: string; artist: { name: string } }[];
  geniusData?: {
    header_image_thumbnail_url?: string;
  };
}

interface Section {
  title: string;
  data: Artist[] | Song[];
  link: string;
  img: string;
}

const SearchComponent = () => {
  const [inputValue, setInputValue] = useState("");
  const { isOpen, onOpen, onClose } = useDisclosure();
  const [sections, setSections] = useState<Section[]>([
    { title: "Songs", data: [], link: "songs", img: "/song-img.png" },
    {
      title: "Collaborators",
      data: [],
      link: "artists",
      img: "/collaborators-img.png",
    },
  ]);


  const fetchArtists = async (searchTerm: string): Promise<Artist[]> => {
    const response = await axios.get(
      `https://us-east-1.aws.data.mongodb-api.com/app/dotstester-bpjzg/endpoint/findcollaboratornames?collabname=${searchTerm}`
    );
    return response.data || [];
  };

  const fetchSongs = async (searchTerm: string): Promise<Song[]> => {
    const response = await axios.get(
      `https://us-east-1.aws.data.mongodb-api.com/app/dotstester-bpjzg/endpoint/artistsearch?collabname=${searchTerm}`
    );
    return response.data || [];
  };

  const debouncedSearch = debounce(async (searchTerm) => {
    if (!searchTerm.trim()) {
      setSections([
        { title: "Songs", data: [], link: "songs", img: "/song-img.png" },
        {
          title: "Collaborators",
          data: [],
          link: "artists",
          img: "/collaborators-img.png",
        },
      ]);
      return;
    }

    const artists = await fetchArtists(searchTerm);
    const songs = await fetchSongs(searchTerm);

    setSections([
      { title: "Songs", data: songs, link: "songs", img: "/song-img.png" },
      {
        title: "Collaborators",
        data: artists,
        link: "artists",
        img: "/collaborators-img.png",
      },
    ]);
  }, 150);

  useEffect(() => {
    if (inputValue) {
      debouncedSearch(inputValue);
    } else {
      setSections([
        { title: "Songs", data: [], link: "songs", img: "/song-img.png" },
        {
          title: "Collaborators",
          data: [],
          link: "artists",
          img: "/collaborators-img.png",
        },
      ]);
    }
    // Cleanup function to cancel the debounced call if the component unmounts
    return () => {
      debouncedSearch.cancel();
    };
  }, [inputValue]);

  return (
    <>
      <div className="max-w-[829px] w-full mx-auto px-3 xl:px-0 relative">
        <Image
          src={"/bg-input.png"}
          alt="/bg-input.png"
          className="absolute -top-7 z-[-1]"
          width={956}
          height={120}
        />

        <div className="relative h-[48px] sm:h-[70px]">
          <Accordion className="absolute z-50 w-full rounded-[10px]">
            <AccordionItem className="border bg-white rounded-[12px]   !border-[#B3B3B3]">
              <h2>
                <AccordionButton className="bg-white rounded-[12px] md:h-[62px] z-10 px-6  relative shadow-[2.402px_4.804px_12.011px_0px_rgba(0,0,0,0.05)] hover:bg-gray-100  w-full p-3 flex items-center">
                  <Icon as={SearchIcon} color="gray.400" mx="2" my="2" />
                  <input
                    type="text"
                    onChange={(e) => setInputValue(e.target.value)}
                    value={inputValue}
                    className="w-full px-3 bg-transparent outline-none"
                    placeholder="Search  for a collaborator or song"
                  />
                  {/* <div className="flex items-center w-[110px] gap-2">
                    <Image
                      src="/commond-icon-img.png"
                      width={38}
                      height={38}
                      alt="common icon img"
                    />
                    <span className="text-[25px] font-normal leading-normal text-[#B2B2B2]">
                      +
                    </span>
                    <span className="text-[25px] font-normal leading-normal text-[#B2B2B2]">
                      K
                    </span>
                  </div>
                  */}
                </AccordionButton>
              </h2>
              {inputValue.length > 0 && (
                <AccordionPanel
                  pb={4}
                  className="border-t  bg-white !px-0 !pb-0 rounded-b-[10px] border-[#B3B3B3]"
                >
                  <div className="max-h-[229px] bg-white px-9 py-7  w-full h-full overflow-auto transition duration-300 ease-in-out ">
                    <Flex
                      direction={{ base: "column", md: "row" }}
                      gap={{ base: "4", md: "8" }}
                    >
                      {sections.map((section) => (
                        <Box key={section.title} flex="1">
                          <Text
                            className="border-none flex items-center text-[8D8D8D] gap-4"
                            fontSize="sm"
                            fontWeight="bold"
                          >
                            <Image
                              src={section.img}
                              alt="common icon img"
                              width={23}
                              height={23}
                            />
                            {section.title}
                          </Text>
                          {/* <Divider my={2} /> */}
                          <VStack spacing={2} align="stretch" className="mt-5">
                            {section.data.length > 0 ? (
                              section.data.map((item, index) => (
                                <React.Fragment key={index}>
                                  {section.title === "Collaborators" ? (
                                    <PersonCard
                                      id={(item as Artist).id}
                                      name={(item as Artist).name}
                                      strArtistThumb={
                                        (item as Artist).strArtistThumb
                                      }
                                      onClick={() => onClose()}
                                    />
                                  ) : (
                                    <SongItem
                                      title={(item as Song).title}
                                      artistCredit={
                                        (item as Song)["artist-credit"]
                                      }
                                      geniusData={(item as Song).geniusData}
                                      _id={(item as Song)._id}
                                      onClick={() => onClose()}
                                    />
                                  )}
                                </React.Fragment>
                              ))
                            ) : (
                              <>
                                <div>
                                  <Skeleton style={{ flex: 1, height: 60 }} />
                                </div>
                              </>
                            )}
                          </VStack>
                        </Box>
                      ))}
                    </Flex>
                  </div>
                  {/*
                  <div className="bg-[#424242] flex items-center gap-2 flex-wrap justify-between py-4 pl-6 pr-[18px]  rounded-[0px_0px_10px_10px]">
                    <p className="text-[15px] flex items-center text-[#D7D7D7] font-normal">
                      Pro tip: add a
                      <span className="text-[15px] mx-2 text-white font-normal w-[22px] h-[22px] rounded-[5px] bg-[#8D8D8D] flex items-center justify-center">
                        +
                      </span>{" "}
                      after a collaborator to quickly connect multiple at once
                    </p>
                    <p className="text-[15px] flex items-center text-[#D7D7D7] font-normal">
                      Type{" "}
                      <span className="text-[15px] mx-2 text-white font-normal w-[22px] h-[22px] rounded-[5px] bg-[#8D8D8D] flex items-center justify-center">
                        ?
                      </span>{" "}
                      for help
                    </p>
                  </div>
                            */}
                </AccordionPanel>
              )}
            </AccordionItem>
          </Accordion>
        </div>
      </div>
    </>
  );
};

export default SearchComponent;
