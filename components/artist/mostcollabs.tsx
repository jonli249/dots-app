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
  const [sortOrder, setSortOrder] = useState<"asc" | "desc">("desc");
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
    return collaborators.slice(0, 4).map((collab, index) => ({
      imgSrc: collab.imageUrl,
      personName: collab.name,
      value: collab.count,
      id: collab._id,
      valueBg: "bg-blue-500", 
      count: collab.count 
    }));
  }, [collaborators]);

  const filteredCollaborators = useMemo(() => {
    if (searchQuery) {
      return fuse.search(searchQuery).map((result) => result.item);
    }
    return collaborators;
  }, [searchQuery, fuse, collaborators]);

  const handleSortChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    setSortOrder(event.target.value as "asc" | "desc");
  };
  

    const displayedCollaborators = useMemo(() => {
      let sortedCollaborators = [...filteredCollaborators.slice(4)];
      
      sortedCollaborators.sort((a, b) => {
        if (sortOrder === "asc") {
          return a.count - b.count;
        } else {
          return b.count - a.count;
        }
      });
      
      const startIndex = (currentPage - 1) * collaboratorsPerPage;
      const endIndex = startIndex + collaboratorsPerPage;
      return sortedCollaborators.slice(startIndex, endIndex);
    }, [filteredCollaborators, currentPage, collaboratorsPerPage, sortOrder]);

  

  return (
    <div className="flex flex-col max-w-[800px] mx-auto xl:px-0 font-inter mt-6">
      <div className=" mb-8 px-1 bg-[url(/Hero-Bg-round.png)] bg-no-repeat bg-center bg-cover bg-center max-w-[826px] w-full mx-auto py-5 md:py-2 rounded-2xl">
        <div className="max-w-[826px] w-full items-center justify-between">
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
            <p className="text-[#fff] font-Telegraf-ultrabold max-sm:text-center text-[20px] not-italic font-extrabold leading-[normal] text-center">
              Top Collaborators
            </p>

            <div className="grid gap-4 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-4 bg-opacity-90 pt-[23px]">
              {dynamicDatamap.map((item, index) => (
                <CollabCard
                key={index}
                id={item.id}
                name={item.personName}
                imageUrl={item.imgSrc}
                count={item.count}
              />
              ))}
            </div>
          </div>
        </div>
      </div>

      <div className="flex justify-between mb-4">
        <div className="flex-1 mr-4">
          <input
            type="text"
            placeholder="Search by collaborator name..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="px-2 py-2 border border-gray-300 rounded-md w-full mr-4"
          />
        </div>
        <div>
        <Select
          onChange={handleSortChange}
          value={sortOrder}
          className="text-xs py-1 px-1 bg-white border-gray-300 rounded-md shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50 whitespace-nowrap"
        >
          <option value="desc">Descending</option>
          <option value="asc">Ascending</option>
        </Select>
        </div>
        
        
      </div>
      <div className="px-1 grid gap-4 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-4 bg-opacity-90">
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
