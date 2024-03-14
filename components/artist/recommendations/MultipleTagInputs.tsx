import React, { useState } from "react";
import { WithContext as ReactTags } from "react-tag-input";

const KeyCodes = {
  comma: 188,
  enter: 13,
};

interface MultipleTagInputsProps {
  tags: any;
  setTags: any;
  handleDelete: any;
}

const delimiters = [KeyCodes.comma, KeyCodes.enter];

const MultipleTagInputs: React.FC<MultipleTagInputsProps> = ({
  tags,
  setTags,
  handleDelete,
}) => {
  const handleAddition = (tag: any) => {
    if (tags.length < 2) {
      setTags([...tags, tag]);
    }
  };

  const handleTagClick = (index: any) => {
    console.log("The tag at index " + index + " was clicked");
  };

  return (
    <ReactTags
      tags={tags}
      delimiters={delimiters}
      handleDelete={handleDelete}
      handleAddition={handleAddition}
      handleTagClick={handleTagClick}
      inputFieldPosition="top"
      autocomplete
      placeholder="Search All Collaborators"
    />
  );
};

export default MultipleTagInputs;
