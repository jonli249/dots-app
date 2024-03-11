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
interface Collaborator {
  _id: string;
  name: string;
  count: number;
  imageUrl: string;
}

interface CollaboratorsProps {
  artistId?: string;
}

const Collaborators: React.FC<CollaboratorsProps> = ({ artistId }) => {
  const [collaborators, setCollaborators] = useState<Collaborator[]>([]);
  const [currentPage, setCurrentPage] = useState<number>(1);
  const [sortOrder, setSortOrder] = useState<"asc" | "desc">("asc");
  const [searchQuery, setSearchQuery] = useState<string>("");
  const collaboratorsPerPage = 12; // Adjust as needed

  useEffect(() => {
    const fetchCollaborators = async () => {
      try {
        const response = await axios.get(
          `https://us-east-1.aws.data.mongodb-api.com/app/dotstester-bpjzg/endpoint/mostcollabs?artistId=${artistId}`
        );
        if (response.data && Array.isArray(response.data)) {
          setCollaborators(response.data);
        } else {
          console.warn(
            "Expected data to be an array, but received:",
            response.data
          );
          setCollaborators([]);
        }
      } catch (error) {
        console.error("Error fetching collaborators:", error);
        setCollaborators([]);
      }
    };

    if (artistId) {
      fetchCollaborators();
    }
  }, [artistId]);

  const fuse = useMemo(
    () =>
      new Fuse(collaborators, {
        keys: ["name"],
        threshold: 0.3,
      }),
    [collaborators]
  );

  const filteredCollaborators = useMemo(() => {
    if (searchQuery) {
      return fuse.search(searchQuery).map((result) => result.item);
    }
    return collaborators;
  }, [searchQuery, fuse, collaborators]);

  const displayedCollaborators = useMemo(() => {
    const startIndex = (currentPage - 1) * collaboratorsPerPage;
    const endIndex = startIndex + collaboratorsPerPage;
    return filteredCollaborators.slice(startIndex, endIndex);
  }, [filteredCollaborators, currentPage, collaboratorsPerPage]);

  return (
    <div className="flex flex-col max-w-[800px] mx-auto xl:px-0 font-inter mt-6">
      <TopCollabs />
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
