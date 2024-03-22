"use client";
import { useState } from "react";
import axios from "axios";

const Brand = (formData) => {
  const [pendingJoke, setPendingJoke] = useState(false);
  const [joke, setJoke] = useState([]);

  const handleJoke = async () => {
    try {
      setPendingJoke(true);
      const { data } = await axios.get("/api/assist_lang_chain");
      setJoke((prevData) => [data.message, ...prevData]);
      setPendingJoke(false);
    } catch (error) {
      console.log(error.message);
    }
  };

  return (
    <div>
      <button disabled={pendingJoke} type="button" onClick={handleJoke}>
        {pendingJoke ? "Loading..." : "Submit data"}
      </button>
      <div dangerouslySetInnerHTML={{ __html: joke }}></div>
    </div>
  );
};

export default Brand;
