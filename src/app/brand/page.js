"use client";
import { useState } from "react";
import axios from "axios";

const Brand = (formData) => {
  const [pending, setPending] = useState(false);
  const [pendingJoke, setPendingJoke] = useState(false);
  const [message, setMessage] = useState("");
  const [joke, setJoke] = useState([]);
  const [data, setData] = useState("");

  const handleJoke = async () => {
    try {
      setPendingJoke(true);
      const { data } = await axios.get("/api/lang_chain");
      setJoke((prevData) => [data.message, ...prevData]);
      setPendingJoke(false);
    } catch (error) {
      console.log(error.message);
    }
  };

  const handleClick = async () => {
    try {
      setPending(true);
      setMessage("");
      const { data } = await axios.post("/api/lang_chain", { message });
      setData(data.message);
      setPending(false);
    } catch (error) {}
  };

  return (
    <>
      <div>
        <input
          value={message}
          type="text"
          onChange={(e) => setMessage(e.target.value)}
        />
        <button type="submit" disabled={pending} onClick={handleClick}>
          {pending ? "Submitting..." : "Submit"}
        </button>

        <div dangerouslySetInnerHTML={{ __html: data }}></div>
      </div>
      <div>
        <button type="button" onClick={handleJoke}>
          {pendingJoke ? "Loading..." : "Tell me joke"}
        </button>
        <ul>
          {joke.map((el, ind) => (
            <li key={ind}>{el}</li>
          ))}
        </ul>
      </div>
    </>
  );
};

export default Brand;
