import React, { useState, useEffect, useMemo } from "react";
import Link from "next/link";
import Image from "next/image";
import axios from "axios"; // Assuming you might switch to axios for consistency
import { Select } from "@chakra-ui/react"; // For sort order selection
import Fuse from "fuse.js"; // For searching collaborators
import { FaArrowLeft, FaArrowRight } from "react-icons/fa"; // For pagination controls
import CollabCard from "./collabpersoncard";
import TopCollabs from "./topcollabs";
import CollaboratorSelect from "./CollaboratorSelect";
import dynamic from "../../node_modules/next/dynamic";

interface Collaborator {
  _id: string;
  name: string;
  count: number;
  imageUrl: string;
}

interface CollaboratorsProps {
  artistId?: string;
}

interface ArtistData {
  strArtistThumb?: string;
}


const Collaborators: React.FC<CollaboratorsProps> = ({ artistId }) => {
  const [collaborators, setCollaborators] = useState<Collaborator[]>([]);
  const [artistData, setArtistData] = useState<ArtistData | null>(null);
  const [currentPage, setCurrentPage] = useState<number>(1);
  const [sortOrder, setSortOrder] = useState<"asc" | "desc">("asc");
  const [searchQuery, setSearchQuery] = useState<string>("");
  const collaboratorsPerPage = 12; 

  useEffect(() => {
    const fetchData = async () => {
      if (artistId) {
        try {
          const artistPromise = axios.get(`https://us-east-1.aws.data.mongodb-api.com/app/dotstester-bpjzg/endpoint/artistdata?artistId=${artistId}`);
          const collaboratorsPromise = axios.get(`https://us-east-1.aws.data.mongodb-api.com/app/dotstester-bpjzg/endpoint/mostcollabs?artistId=${artistId}`);
          
          const [artistResponse, collaboratorsResponse] = await Promise.all([artistPromise, collaboratorsPromise]);

          if (artistResponse.data) {
            setArtistData(artistResponse.data);
          }

          if (collaboratorsResponse.data && Array.isArray(collaboratorsResponse.data)) {
            setCollaborators(collaboratorsResponse.data);
          } else {
            console.warn("Expected data to be an array, but received:", collaboratorsResponse.data);
            setCollaborators([]);
          }
        } catch (error) {
          console.error("Error fetching data:", error);
          setArtistData(null);
          setCollaborators([]);
        }
      }
    };

    fetchData();
  }, [artistId]);


  const fuse = useMemo(
    () =>
      new Fuse(collaborators, {
        keys: ["name"],
        threshold: 0.3,
      }),
    [collaborators]
  );

  const dynamicDatamap = useMemo(() => {
    return collaborators.slice(0, 3).map((collab, index) => ({
      imgSrc: collab.imageUrl,
      personName: collab.name,
      value: collab.count,
      valueBg: "bg-blue-500" 
    }));
  }, [collaborators]);

  const filteredCollaborators = useMemo(() => {
    if (searchQuery) {
      return fuse.search(searchQuery).map((result) => result.item);
    }
    return collaborators;
  }, [searchQuery, fuse, collaborators]);

  const displayedCollaborators = useMemo(() => {
    const offsetCollaborators = filteredCollaborators.slice(3);

    const startIndex = (currentPage - 1) * collaboratorsPerPage;
    const endIndex = startIndex + collaboratorsPerPage;
    return offsetCollaborators.slice(startIndex, endIndex);
    }, [filteredCollaborators, currentPage, collaboratorsPerPage]);

  return (
    <div className="flex flex-col max-w-[800px] mx-auto xl:px-0 font-inter mt-6">
      <div className="">
      <div className=" mb-8 px-3 bg-[url(/Hero-Bg-round.png)] bg-no-repeat bg-center bg-cover max-w-[826px] w-full mx-auto py-5 md:py-2 rounded-2xl">
        <div className="max-w-[800px] w-full mx-auto flex max-md:flex-col gap-7 sm:gap-5 items-center justify-between">
          {/*
          <div className="p-6 border-black border flex justify-center items-center w-[235px] h-[235px] rounded-[100%]">
            <div className="p-6 border-black border w-full h-full rounded-[100%] flex justify-center items-center">
            <div className="p-6 border-black border flex justify-center items-center w-[235px] h-[235px] rounded-[100%]">
                
                {artistData && (
                  <Image
                    src={artistData.strArtistThumb || "/avatar.png"} // Fallback to a default image if strArtistThumb is not available
                    width={235}
                    height={235}
                    alt="Artist Thumbnail"
                    className="rounded-full"
                  />
                )}
              </div>
            </div> 
          </div>
          */}

          <div>
            <p className="text-[#fff] font-Telegraf-ultrabold max-sm:text-center text-[20px] not-italic font-extrabold leading-[normal]">
              Top Collaborators
            </p>

            <div className="grid sm:grid-cols-4 grid-cols-2 gap-7 sm:gap-5 justify-center pt-[23px]">
              {dynamicDatamap.map((item, index) => (
                <div
                  key={index}
                  className="relative  border-[1.035px_solid_#9E9E9E] bg-[#fff] w-[96px] h-[120px] rounded-[15.104px] shadow-[2.07px_4.141px_10.352px_0px_rgba(0,0,0,0.10)]"
                >
                  <div
                    className={`${item.valueBg} w-[38px] h-[38px] rounded-[100%] absolute right-[-11px] top-[-11px] flex justify-center items-center`}
                  >
                    <p className="text-[#FFF] text-center font-Telegraf-ultrabold text-[12.767px] not-italic font-extrabold leading-[normal]">
                      {item.value}
                    </p>
                  </div>

                  <div className="px-[23px] pt-[19px] pb-[18px]">
                    <Image
                      src={item.imgSrc || "/avatar.png"}
                      width={49}
                      height={49}
                      alt="man-img-src"
                    />

                    <p className="text-center text-[#000] font-Telegraf-ultrabold text-[11px] font-extrabold">
                      {item.personName}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
      </div>
      <div className="flex justify-between mb-4">
        <input
          type="text"
          placeholder="Search by collaborator name..."
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          className="px-2 py-2 border border-gray-300 rounded-md w-full mr-4"
        />
        {/* <Select
          placeholder="Sort"
          value={sortOrder}
          onChange={(e) => setSortOrder(e.target.value as "asc" | "desc")}
        >
          <option value="asc">Ascending</option>
          <option value="desc">Descending</option>
        </Select> */}
        <CollaboratorSelect />
      </div>
      <div className="grid gap-4 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-4 bg-opacity-90">
        {displayedCollaborators.map((collaborator, index) => (
          <CollabCard
            key={index}
            id={collaborator._id}
            name={collaborator.name}
            imageUrl={collaborator.imageUrl}
            count={collaborator.count}
          />
        ))}
      </div>
      <div className="flex justify-center mt-10">
        <FaArrowLeft
          onClick={() => setCurrentPage(Math.max(1, currentPage - 1))}
          className={`cursor-pointer ${
            currentPage === 1 ? "text-gray-300" : "text-black"
          }`}
        />
        <FaArrowRight
          onClick={() =>
            setCurrentPage(
              Math.min(
                Math.ceil(filteredCollaborators.length / collaboratorsPerPage),
                currentPage + 1
              )
            )
          }
          className={`cursor-pointer ${
            currentPage * collaboratorsPerPage >= filteredCollaborators.length
              ? "text-gray-300"
              : "text-black"
          }`}
        />
      </div>
    </div>
  );
};

export default Collaborators;
