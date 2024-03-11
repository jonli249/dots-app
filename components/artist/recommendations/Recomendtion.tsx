import React, { useState } from "react";
import Image from "next/image";
import MultipleTagInputs from "./MultipleTagInputs";
import { Searchicon } from "../../icons/Icons";
import { taylorbtn } from "../../icons/Helper";
import FilterDropdown from "./FilterDropdown";
import CustomSelectedTag from "./CustomSelectedTag";
import RecommendCard from "./RecommendCard";

const Recomendtion = () => {
  const [tags, setTags] = useState([{ id: "Frequency", text: "Frequency" }]);

  // to delete selected tag
  const handleDelete = (i: any) => {
    setTags(tags.filter((tag: any, index: any) => index !== i));
  };

  return (
    <div className="max-w-[827px] w-full mx-auto mt-[19px]">
      <div className="w-full flex flex-col md:flex-row items-start md:items-center md:justify-between gap-4">
        {/* search */}
        <div className="w-full h-[47px] flex items-start sm:items-center">
          <div className="h-full pl-[13px] pr-[15px] flex items-center justify-center bg-[#EAEAEA] rounded-tl-md rounded-bl-md">
            <Searchicon />
          </div>
          <MultipleTagInputs
            tags={tags}
            setTags={setTags}
            handleDelete={handleDelete}
          />
        </div>

        {/* custom tags and dropdown */}
        <div className="flex items-center justify-center gap-2">
          {/* rendering custom tags */}
          {tags.length !== 0 && (
            <div className="flex gap-2 flex-shrink-0">
              {tags.map((tag, index) => (
                <CustomSelectedTag
                  key={index}
                  tag={tag}
                  onRemove={() => handleDelete(index)}
                />
              ))}
            </div>
          )}
          <div>
            <FilterDropdown />
          </div>
        </div>
      </div>

      <div className="w-full my-[29px] flex gap-4 justify-center items-center flex-wrap">
        {taylorbtn.map((item, index) => (
          <RecommendCard key={index} item={item} />
        ))}
      </div>
    </div>
  );
};

export default Recomendtion;
