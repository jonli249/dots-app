import React from "react";

interface CustomSelectedTagProps {
  tag: {
    id: string;
    text: string;
  };
  onRemove: () => void;
}

const CustomSelectedTag: React.FC<CustomSelectedTagProps> = ({
  tag,
  onRemove,
}) => {
  return (
    <div className="p-3 rounded-[6px] bg-[#EAEAEA] flex items-center justify-center gap-2 sm:gap-3">
      <span className="max-w-9 sm:max-w-[73px] w-full whitespace-nowrap overflow-hidden text-ellipsis font-inter text-sm font-normal text-black">
        {tag.text}
      </span>
      <button className="rotate-45" onClick={onRemove}>
        +
      </button>
    </div>
  );
};

export default CustomSelectedTag;
