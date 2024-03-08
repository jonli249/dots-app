import React from "react";

interface LineProps {
  classlist: string;
}

const Line: React.FC<LineProps> = ({ classlist }) => {
  return <div className={`${classlist}`}></div>;
};

export default Line;
