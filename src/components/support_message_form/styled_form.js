import styled from "styled-components";

export const StyledBox = styled.div`
  max-width: 440px;
`;
export const StyledForm = styled.form`
  display: flex;
  gap: 8px;
  flex-direction: column;
  width: 440px;

  label {
    display: flex;
    border-bottom: 2px solid black;
    padding: 14px;

    input {
      border: none;
      width: 400px;
      padding-left: 8px;
    }
  }
`;

export const ButtonForm = styled.button`
  cursor: pointer;
  padding: 8px;
  border: none;
  background-color: #9b9a9a;
  color: white;

  :hover {
    background-color: #4db935;
  }
  p {
    font-family: "IBM Plex Mono", monospace;
    font-weight: 500;
  }
`;
