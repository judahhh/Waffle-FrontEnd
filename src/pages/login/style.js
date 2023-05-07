import styled from "styled-components";
import Button from "@mui/material/Button";
import Link from "@mui/material/Link";

export const MyButton = styled(Button)`
  background-color: #e1a141;
  box-shadow: 0 3px 5px 2px rgba(255, 105, 135, 0.3);
  color: white;
  font-weight: bold;
  font-size: 18px;
  :hover {
    background-color: wheat;
    color: #e1a141;
  }
  //height: 48px;
  //padding: 0 20px;
`;
export const MyTypography = styled.h1`
  font-weight: bold;
  font-size: 25px;
  margin-top: 80px;
  font-family: "Inter";
  color: black;
`;
export const MyLink = styled(Link)`
  color: grey;
  text-align: center;

  :hover {
    cursor: pointer;
  }
`;
