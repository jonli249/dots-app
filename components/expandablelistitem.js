// components/ExpandableListItem.js
import React, { useState } from 'react';

const ExpandableListItem = ({ name, details }) => {
  const [isExpanded, setIsExpanded] = useState(false);

  const toggleExpand = () => {
    setIsExpanded(!isExpanded);
  };

  return (
    <li className="list-item">
      <span className="name" onClick={toggleExpand}>
        {name}
      </span>
      {isExpanded && (
        <div className="details">
          {details}
        </div>
      )}
    </li>
  );
};

export default ExpandableListItem;
