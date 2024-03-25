import styled from "styled-components";

export const StyledBox = styled.div`
  margin-top: 20px;
  max-width: 440px;
`;
export const StyledForm = styled.form`
  display: flex;
  gap: 8px;
  flex-direction: column;
  width: 440px;

  label {
    display: flex;
  }

  input {
    border: none;
    border-bottom: 1px solid black;
    width: 400px;
  }
`;
