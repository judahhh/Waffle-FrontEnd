import React, { useEffect, useState } from "react";
import styled from "styled-components";

import {
  TextField,
  List,
  ListItem,
  Divider,
  ListItemText,
} from "@mui/material";

import { api } from "../../api/Interceptors";
import { useNavigate, useParams } from "react-router-dom";
import { useGroupsStore, useRoomsStore, useTypeStore } from "../../store/Store";
import BoardDetail from "./BoardDetail";

const MyListItem = styled(ListItem)`
  &:hover {
    cursor: pointer;
  }
  &.selected {
    background-color: rgba(245, 182, 108, 0.2);
  }
`;

const BoardList = () => {
  //   const boardList = {
  //     notices: [{ id: "1", title: "공지글1", content: "공지합니다", date: "" }],
  //     notes: [{ id: "2", title: "게시판글1", content: "게시내용", date: "" }],
  //   };
  const [boardList, setBoardList] = useState();
  const { type, type_id } = useTypeStore();
  const { storeGroups, setStoreGroups, setGroupId, group_id, group_name } =
    useGroupsStore();
  const { storeRooms, setStoreRooms, setRoomId, room_id, room_name } =
    useRoomsStore();

  const { board_id } = useParams();
  const navigate = useNavigate();
  if (type === "group") type_id = group_id;
  else type_id = room_id;
  useEffect(() => {
    api
      .get(`/note/${type}/${type_id}/notelist`)
      .then((response) => {
        console.log(response);
        setBoardList(response.data);
      })
      .catch((err) => console.log(err));
  }, [type_id]);
  return (
    <>
      <List
        sx={{
          width: "100%",
          maxWidth: 300,
          bgcolor: "background.paper",
        }}
      >
        {/* <Divider
          sx={{
            borderColor: "DarkGrey",
          }}
        /> */}
        <TextField
          // id="standard-search"
          label="채팅방을 검색하세요"
          type="search"
          variant="standard"
          size="small"
          onChange={(e) => {}}
        />
        {/* 게시판 공지글 나열 시작 */}
        <List>
          {boardList.notices.map((v, i) => (
            <List key={v.id}>
              <MyListItem
                alignItems="flex-start"
                // 클릭하면 id 넘겨주기
                onClick={() => navigate(`/${type}/${type_id}/board/${v.id}`)}
                // className={dm_id == v.id ? "selected" : ""}
              >
                <ListItemText
                  primaryTypographyProps={{ fontWeight: "bold" }}
                  secondaryTypographyProps={{ fontWeight: "bold" }}
                  primary={v.title}
                  secondary={v.content.slice(0, 10)}
                />
              </MyListItem>
              <Divider
                sx={{
                  borderColor: "grey",
                }}
              />
            </List>
          ))}
        </List>
        {/* 게시판 일반 글 나열  */}
        <List>
          {boardList.notes.map((v, i) => (
            <List key={v.id}>
              <MyListItem
                alignItems="flex-start"
                // 클릭하면 id 넘겨주기
                onClick={() => navigate(`/${type}/${type_id}/board/${v.id}`)}
                // className={dm_id == v.id ? "selected" : ""}
              >
                <ListItemText
                  primary={v.title}
                  secondary={v.content.slice(0, 10)}
                />
              </MyListItem>
              <Divider
                sx={{
                  borderColor: "grey",
                }}
              />
            </List>
          ))}
        </List>
      </List>
      {/* <BoardDetail></BoardDetail> */}
    </>
  );
};

export default BoardList;
