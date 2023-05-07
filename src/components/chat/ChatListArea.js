import { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";

import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import Divider from "@mui/material/Divider";
import ListItemText from "@mui/material/ListItemText";

import ModalDmCreate from "./ModalDmCreate";
import styled from "styled-components";
import InDM from "./InDM";
import { api } from "../../api/Interceptors";

const MyListItem = styled(ListItem)`
  &:hover {
    cursor: pointer;
  }
  &.selected {
    background-color: rgba(245, 182, 108, 0.2);
  }
`;
const ChatListArea = (props) => {
  const navigate = useNavigate();
  const { dm_id } = useParams();
  const [chatList, setChatList] = useState([]);
  // let chatList = [
  //   { id: 1, name: "채팅방1", lastChat: "오 진짜?" },
  //   { id: 2, name: "채팅방2", lastChat: "뭐 있어?" },
  //   { id: 3, name: "채팅방3", lastChat: "망해써~" },
  //   { id: 4, name: "채팅방4", lastChat: "노노" },
  //   { id: 5, name: "채팅방5", lastChat: "당연" },
  //   { id: 6, name: "채팅방6", lastChat: "엥" },
  //   { id: 7, name: "채팅방7", lastChat: "괜찮당께" },
  //   { id: 8, name: "채팅방8", lastChat: "으갸갸갹" },
  // ];

  useEffect(() => {
    // 페이지가 렌더링 될 때 채팅 목록 불러오는 함수 호출

    getChatList();
  }, []);
  const getChatList = async () => {
    api
      .get("/chat/chatlist")
      .then((response) => {
        // localStorage.setItem("chatList", response.dms);
        //response안 어디에 보내주는지 백엔드에 물어보고 수정할 것
        setChatList(response.data.dms);
        console.log(response);
      })
      .catch((err) => console.log(err));
  };

  const moveDMRoom = (dmID, dmName) => {
    navigate(`/chat/${dmID}`, {
      state: { chatList: chatList, dmID: dmID, dmName: dmName },
    });
  };
  // if (!chatList) {
  //   return <div></div>;
  // }
  return (
    <>
      <List sx={{ width: "100%", maxWidth: 300, bgcolor: "background.paper" }}>
        <ModalDmCreate />

        {/* <Divider
          sx={{
            borderColor: "DarkGrey",
          }}
        /> */}

        {/* 채팅 리스트들 나열 시작 */}
        <List>
          {chatList.map((v, i) => (
            <List key={v.id}>
              <MyListItem
                alignItems="flex-start"
                // 클릭하면 dm id 넘겨주기
                onClick={() => moveDMRoom(v.id, v.name)}
                className={dm_id == v.id ? "selected" : ""}
              >
                <ListItemText primary={v.name} secondary={v.lastChat} />
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
      {/* 이렇게 안 하고 dmDetail페이지를 만들어서 페이지 이동? */}
      {/* <InDM /> */}
    </>
  );
};

export default ChatListArea;
