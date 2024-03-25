"use client";

import React, { useState } from "react";
import { ButtonForm, StyledBox, StyledForm } from "./styled_form";

import { messageSender } from "@/helpers/utils/messageSender";
import { experimental_useFormStatus as useFormStatus } from "react-dom";

const Support_message_form = () => {
  const [error, setError] = useState(null);
  const [email, setEmail] = useState("");
  const [message, setMessage] = useState("");
  const [response, setResponse] = useState("");

  const { pending } = useFormStatus();

  const handleSubmit = async (formData) => {
    const email = formData.get("email")?.toString();
    const message = formData.get("message")?.toString();

    if (!email || !message) {
      setError("Email and message is required");
    }
    try {
      const res = await messageSender({ email, message });
      setResponse(res);
      setEmail("");
      setMessage("");
    } catch (error) {
      console.log(error.message);
      setError(error.message);
    }
  };
  return (
    <StyledBox>
      <StyledForm action={handleSubmit}>
        <label>
          <input
            value={email}
            placeholder="Email"
            onChange={(e) => setEmail(e.target.value)}
            required
            name="email"
            type="email"
          />
        </label>
        <label>
          <input
            required
            placeholder="Message"
            name="message"
            type="text"
            value={message}
            onChange={(e) => setMessage(e.target.value)}
          />
        </label>
        <ButtonForm disabled={pending} type="submit">
          <p>Send message</p>
        </ButtonForm>
        {response ? <p>{response}</p> : ""}
        {error ? <p>{error}</p> : ""}
      </StyledForm>
    </StyledBox>
  );
};

export default Support_message_form;
