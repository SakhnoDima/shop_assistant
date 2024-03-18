"use client";
import { useState } from "react";
import axios from "axios";

const Brand = () => {
  const [data, setData] = useState([]);
  const handleClick = async () => {
    const { data } = await axios.get("/api/lang_chain");
    //  setData((prevData) => [...prevData, data.message]);
    console.log(data.message);
  };
  return (
    <div>
      <button onClick={handleClick}>Жарт</button>
      <ul>
        {data.map((el, ind) => (
          <li key={ind}>{el}</li>
        ))}
      </ul>
    </div>
  );
};

export default Brand;
