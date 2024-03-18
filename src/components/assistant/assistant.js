// export const config = { runtime: 'client' };
"use client";
import { useState } from "react";
import axios from "axios";
import Message from "@/components/assistant/Message";
import s from "./assistant.module.scss";
import { ROLE } from "@/constants/constants";

const Assistant = () => {
  const [messages, setMessages] = useState([]);
  const [inputValue, setInputValue] = useState("");
  const [isLoading, setLoading] = useState(false);
  const [isChatVisible, setChatVisible] = useState(true);
  const toggleChatVisibility = () => setChatVisible(!isChatVisible);

  const getAIResponse = async (userInput) => {
    setLoading(true);
    try {
      const response = await axios.post(
        "/api/generate_post_description",
        {
          text: userInput,
        },
        {
          headers: {
            "Content-Type": "application/json",
          },
        }
      );
      setLoading(false);
      return response.data;
    } catch (error) {
      setLoading(false);
      console.error("Error fetching AI response:", error);
      return "Sorry, I am unable to respond at the moment.";
    }
  };

  const handleInputChange = (event) => {
    setInputValue(event.target.value);
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    const userMessage = inputValue.trim();
    if (userMessage) {
      setMessages((currentMessages) => [
        ...currentMessages,
        { role: ROLE.user, message: userMessage },
      ]);
      setInputValue("");

      setLoading(true);

      try {
        const resMess = await axios.post(
          `/api/assist`,
          { userMessage },
          {
            headers: {
              "Content-Type": "application/json",
            },
          }
        );

        //  const aiResponse = await getAIResponse(userMessage);
        setMessages((currentMessages) => [
          ...currentMessages,
          { role: ROLE.assistant, message: resMess.data.resMess },
        ]);
      } catch (error) {
        setMessages((currentMessages) => [
          ...currentMessages,
          {
            role: ROLE.assistant,
            message: error,
          },
        ]);
      } finally {
        setLoading(false);
      }
    }
  };

  const reversedMessages = [...messages].reverse();

  return (
    <div className={s["assistant-chat"]}>
      <button className={s["toggle-chat"]} onClick={toggleChatVisibility}>
        {isChatVisible ? "▼" : "Chat 💬"}
      </button>

      {isChatVisible && (
        <>
          <div className={s["chat-messages"]}>
            {isLoading && (
              <div className={`${s.message} ${s["assistant"]}`}>Writing...</div>
            )}
            {/* винести в окремий компонент */}
            {reversedMessages.map((msg, index) => (
              <Message key={index} msg={msg} />
            ))}
          </div>
          <form className={s["chat-input"]} onSubmit={handleSubmit}>
            <input
              type="text"
              placeholder="Type your message..."
              value={inputValue}
              onChange={handleInputChange}
              disabled={isLoading}
            />
            <button
              className={s["chatAi-button"]}
              type="submit"
              disabled={isLoading}
            >
              Send
            </button>
          </form>
        </>
      )}
    </div>
  );
};

export default Assistant;
