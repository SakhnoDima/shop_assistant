"use client";
import { useState } from "react";
import axios from "axios";

const Brand = () => {
  const [data, setData] = useState(null);
  const handleClick = async () => {
    const { data } = await axios.get("/api/lang_chain");
    setData(data.message);
    console.log(data.message);
  };
  return (
    <div>
      <button onClick={handleClick}>Summit</button>
      <div>{data}</div>
    </div>
  );
};

export default Brand;
