import React from "react";
import { StyledBox, StyledForm } from "./styled_form";

const Support_message_form = () => {
  return (
    <StyledBox>
      <StyledForm>
        <label>
          <p>Email</p>
          <input />
        </label>
        <label>
          <p>Message</p>
          <input />
        </label>
      </StyledForm>
    </StyledBox>
  );
};

export default Support_message_form;
