import React from "react";
import styled from "styled-components";
import { useNavigate } from "react-router-dom";

import { Toolbar, CssBaseline, AppBar } from "@mui/material";

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
  /*color,font-size */
  color: black;
  cursor: pointer;
  :hover {
    background-color: rgba(245, 182, 108, 0.1);
  }
  ::after {
    background-color: rgba(245, 182, 108, 0.1);
  }
`;
export const MyTitle = styled.h1`
  margin: 0;
  /* padding: 8px; */
  text-align: center;
  cursor: pointer;
`;
const drawerWidth = 240;
const Header = () => {
  const navigate = useNavigate();
  const moveChat = () => {
    navigate("/chat");
  };
  return (
    <div>
      {" "}
      <CssBaseline />
      <AppBar
        position="fixed"
        sx={{ width: `calc(100% - ${drawerWidth}px)`, ml: `${drawerWidth}px` }}
      >
        <MyToolbar>
          <HeaderBtn id="일정">일정</HeaderBtn>
          <HeaderBtn id="프로필">프로필</HeaderBtn>
          <HeaderBtn id="채팅" onClick={moveChat}>
            채팅
          </HeaderBtn>
        </MyToolbar>
      </AppBar>
    </div>
  );
};

export default Header;
