import React, { useState } from "react";

import s from "./assistant.module.scss";

const Message = ({ msg }) => {
  return (
    <div className={`${s.message} ${s[msg?.role]}`}>
      <p>{msg?.message}</p>
    </div>
  );
};

export default Message;
