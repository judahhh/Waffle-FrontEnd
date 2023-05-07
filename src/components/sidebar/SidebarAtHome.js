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
let groupName = [];

const SideBar = (props) => {
  const [groupNames, setGroupNames] = useState([]);
  const [groups, setGroups] = useState([]);
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
      // .get(`/groups`)
      .then((response) => {
        console.log(response);
        setGroups([]);
        setGroups(response.data.groups);
        // setGroups(response.data);
        groups.forEach((v) => {
          groupName.push(v["group_name"]);
        });
        setGroupNames([]);
        setGroupNames(groupName);
      })
      //
      .catch((err) => console.log(err));
    // setGroups([
    //   { manager: 1, group_name: "창의학기제", group_id: 6 },
    //   { manager: 1, group_name: "캡스톤", group_id: 10 },
    //   { manager: 1, group_name: "동아리", group_id: 13 },
    //   { manager: 1, group_name: "회사", group_id: 15 },
    //   { manager: 1, group_name: "그룹5", group_id: 17 },
    // ]);

    // groups.forEach((v) => {
    //   groupName.push(v["group_name"]);
    // });
    // setGroupNames(groupName);
    // return groups;
  }, [groupName]);

  console.log(groupNames);
  console.log(groups);
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
  const moveGroupPage = async (text) => {
    console.log(text);
    let group_id = groups[groupNames.indexOf(text)].group_id;
    console.log(group_id);
    navigate(`/group/${group_id}`, {
      state: { group_name: text, groups: groups, groupNames: groupNames },
    });
    window.location.reload();
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
          {groupNames.map((text, index) => (
            <ListItem
              key={index}
              onClick={() => {
                moveGroupPage(text);
              }}
            >
              <ListItemButton>
                <ListItemText primary={text} />
              </ListItemButton>
            </ListItem>
          ))}
        </List>
        <ModalCreate />
        <BtnWrapper>
          {" "}
          <LogoutBtn onClick={Logout}>Logout</LogoutBtn>
        </BtnWrapper>
      </Drawer>
    </div>
  );
};

export default SideBar;
