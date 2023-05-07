import React from "react";
import styled from "styled-components";
import Toolbar from "@mui/material/Toolbar";

export const MyToolbar = styled(Toolbar)`
  background-color: white;
`;
export const HeaderBtn = styled.button`
  margin: 0;
  padding: 20px;
  font-size: 20px;
  font-weight: bold;
  border: none;
  background-color: white;
  cursor: pointer;
  :hover {
    background-color: rgba(245, 182, 108, 0.1);
  }
`;
export const MyTitle = styled.h1`
  margin: 0;
  padding: 8px;
  text-align: center;
  cursor: pointer;
`;
