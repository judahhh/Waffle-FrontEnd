import React, { useEffect, useState, useMemo, useCallback } from "react";
import styled from "styled-components";
import { useNavigate } from "react-router-dom";
import axios from "axios";

import Drawer from "@mui/material/Drawer";
import Divider from "@mui/material/Divider";
import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import ListItemButton from "@mui/material/ListItemButton";
import ListItemText from "@mui/material/ListItemText";

import { api } from "../../api/Interceptors";
import ModalCreate from "../modal/ModalGroup";
import { useGroupsStore, useTypeStore } from "../../store/Store";

export const MyTitle = styled.h1`
  /* margin */
  margin: 0px;
  padding: 8px;
  font-weight: bold;
  text-align: center;
  cursor: pointer;
`;
const BtnWrapper = styled.div`
  text-align: center;
`;

const LogoutBtn = styled.button`
  width: 200px;
  height: 50px;
  border-radius: 10px;
  border: solid 1px #f5b66c;
  background-color: white;
  font-size: 20px;
  font-weight: bold;
  margin: auto;
  :hover {
    cursor: pointer;
  }
  margin-top: 10px;
`;
const drawerWidth = 240;

const SideBarAtHome = (props) => {
  const { setStoreGroups, storeGroups, setGroupId } = useGroupsStore();
  const { setTypeGroup } = useTypeStore();
  const [groups, setGroups] = useState([{ group_id: 6, group_name: "그룹1" }]);
  const navigate = useNavigate();

  useEffect(() => {
    getGroups();
  }, []);

  const getGroups = useCallback(async () => {
    const user_email = localStorage.getItem("email");
    await api
      .get(`/${user_email}/groups`, {
        headers: {
          access_token: localStorage.getItem("jwt_accessToken"),
        },
      })
      .then((response) => {
        console.log(response);
        setGroups(response.data.groups);
        setStoreGroups(response.data.groups);
      })
      .catch((err) => console.log(err));
  }, []);

  const Logout = () => {
    api
      .post(
        "/",
        {},
        {
          headers: {
            access_token: localStorage.getItem("jwt_accessToken"),
            refresh_token: localStorage.getItem("jwt_refreshToken"),
          },
        }
      )
      .then((response) => {
        console.log(response);
        localStorage.removeItem("jwt_accessToken");
        localStorage.removeItem("jwt_refreshToken");
        localStorage.setItem("isLogined", false);
        alert("로그아웃 성공! 다음에 또 만나요❤️");
        navigate("/login");
      })
      .catch((err) => console.log(err));
  };
  const moveGroupPage = async (group_name, group_id) => {
    setGroupId(group_id, group_name);
    navigate(`/group/${group_id}`, {
      state: { group_name: group_name, groups: groups },
    });
    // window.location.reload();
  };

  return (
    <div>
      <Drawer
        sx={{
          width: drawerWidth,
          flexShrink: 0,
          "& .MuiDrawer-paper": {
            width: drawerWidth,
            boxSizing: "border-box",
          },
        }}
        variant="permanent"
        anchor="left"
      >
        <MyTitle onClick={() => navigate("/")}>waffle</MyTitle>
        <Divider />

        <List>
          {groups.map((v, index) => (
            <ListItem
              key={v.group_id}
              onClick={() => {
                moveGroupPage(v.group_name, v.group_id);
              }}
            >
              <ListItemButton>
                <ListItemText primary={v.group_name} />
              </ListItemButton>
            </ListItem>
          ))}
        </List>
        <ModalCreate />
        <BtnWrapper>
          <LogoutBtn onClick={Logout}>Logout</LogoutBtn>
        </BtnWrapper>
      </Drawer>
    </div>
  );
};

export default SideBarAtHome;
