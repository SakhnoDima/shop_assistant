import React, { useState } from "react";

import s from "./assistant.module.scss";

const Message = ({ msg }) => {
  const inputString = msg?.message;
  console.log(msg.message);
  return (
    <div className={`${s.message} ${s[msg?.role]}`}>
      <div
        className={s.box}
        dangerouslySetInnerHTML={{ __html: inputString }}
      />
    </div>
  );
};

export default Message;
