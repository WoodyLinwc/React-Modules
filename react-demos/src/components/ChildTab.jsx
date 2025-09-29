import React from "react";

const ChildTab = ({ isActive, setIsActive, data }) => {
  return data.map((tab, index) => {
    return (
      <button
        key={tab.id}
        onClick={() => setIsActive(index)}
        style={{
          color: isActive === index ? "blue" : "black",
          border: "none",
          padding: "10px",
        }}
      >
        {tab.title}
      </button>
    );
  });
};

export default ChildTab;
