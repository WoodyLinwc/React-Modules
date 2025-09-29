import React, { useState } from "react";
import ChildTab from "../components/ChildTab";

const data = [
  { id: 1, title: "Tab 1" },
  { id: 2, title: "Tab 2" },
  { id: 3, title: "Tab 3" },
];

const Tab = () => {
  const [isActive, setIsActive] = useState(true);
  return (
    <ChildTab
      isActive={isActive}
      setIsActive={setIsActive}
      data={data}
    ></ChildTab>
  );
};

export default Tab;
