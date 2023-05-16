import React from "react";
import styled from "styled-components";
import { useNavigate, useParams } from "react-router-dom";

import { Toolbar, CssBaseline, AppBar } from "@mui/material";

import {
  useGroupsStore,
  useHeaderMenuStore,
  useTypeStore,
} from "../../store/Store";

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
  const { type, type_id, type_name } = useTypeStore();
  // const type_id = useParams();
  const { setHeaderMenu, headerMenu } = useHeaderMenuStore();
  const { storeGroups } = useGroupsStore();
  const { storeRooms } = useGroupsStore();
  const moveChat = () => {
    navigate("/chat");
  };
  const movetoBoard = () => {
    setHeaderMenu("board");
    console.log(headerMenu);
    navigate(`/${type}/${type_id}/board`, {
      state: { type_name: type_name, groups: storeGroups, rooms: storeRooms },
    });
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
          {type === "home" ? (
            <>
              <HeaderBtn id="일정" onClick={() => navigate(`/`)}>
                일정
              </HeaderBtn>
              <HeaderBtn id="프로필" onClick={() => navigate("/myprofile")}>
                프로필
              </HeaderBtn>
              <HeaderBtn id="채팅" onClick={moveChat}>
                채팅
              </HeaderBtn>
            </>
          ) : (
            <>
              <HeaderBtn
                id="일정"
                onClick={() => navigate(`/${type}/${type_id}`)}
              >
                일정
              </HeaderBtn>
              <HeaderBtn id="게시판" onClick={() => movetoBoard()}>
                게시판
              </HeaderBtn>
              <HeaderBtn id="프로필" onClick={() => navigate("/myprofile")}>
                프로필
              </HeaderBtn>
              <HeaderBtn id="채팅" onClick={moveChat}>
                채팅
              </HeaderBtn>
            </>
          )}
        </MyToolbar>
      </AppBar>
    </div>
  );
};

export default Header;
