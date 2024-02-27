import { useState } from "react";

const Chat = () => {
  const [textMessage, setTextMessage] = useState("");

  const handleSetMessage = (e) => {
    setTextMessage(e.target.value);
  };

  return (
    <div>
      <input
        className={s.message_input}
        type="text"
        onChange={handleSetMessage}
        value={textMessage}
        placeholder="Your can ask question here"
      />
    </div>
  );
};

export default Chat;
