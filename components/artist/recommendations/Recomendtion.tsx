import React, { useState } from "react";
import Image from "next/image";
import MultipleTagInputs from "./MultipleTagInputs";
import { Searchicon } from "../../icons/Icons";
import { taylorbtn } from "../../icons/Helper";
import FilterDropdown from "./FilterDropdown";
import CustomSelectedTag from "./CustomSelectedTag";

const Recomendtion = () => {
  const [tags, setTags] = useState([{ id: "Frequency", text: "Frequency" }]);

  // to delete selected tag
  const handleDelete = (i: any) => {
    setTags(tags.filter((tag: any, index: any) => index !== i));
  };

  return (
    <div className="max-w-[827px] w-full mx-auto max-lg:px-3 mt-[19px]">
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
          <div
            key={index}
            className=" w-[175px] sm:w-[192px] h-[49px] border bg-white shadow-[2.445px_4.89px_12.225px_0px_rgba(0,0,0,0.10)] border-black rounded-[75px] flex gap-1 sm:gap-[17px] items-center px-3 py-[15px]"
          >
            <Image
              src="/taylor-img.png"
              width={33}
              height={33}
              alt="harry-image"
            />
            <p className="text-black whitespace-nowrap text-center font-telegraf text-[14px] sm:text-[18px] font-extrabold">
              {item.name}
            </p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Recomendtion;
