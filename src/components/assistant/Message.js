import React, { useState } from "react";

import s from "./assistant.module.scss";
import { ROLE } from "@/constants/constants";
import { Link } from "react-router-dom";

const Message = ({ msg }) => {
  const word = "http://localhost:3000/shop/filters/";

  if (msg.role === ROLE.assistant && msg.message.includes(word)) {
    return (
      <div className={`${s.message} ${s[msg?.role]}`}>
        <a href={msg?.message}>Link</a>
      </div>
    );
  }

  return (
    <div className={`${s.message} ${s[msg?.role]}`}>
      <p>{msg?.message}</p>
    </div>
  );
};

export default Message;
