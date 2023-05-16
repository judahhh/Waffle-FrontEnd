import React from "react";
import { useLocation, useParams } from "react-router-dom";

import { Box, Toolbar } from "@mui/material";

import Header from "../../components/header/Header";
import SidebarAtRoom from "../../components/sidebar/SidebarAtRoom";
import Calendar from "../../components/plan/Calendar";
import { useTypeStore, useHeaderMenuStore } from "../../store/Store";

const Room = () => {
  const { room_id } = useParams();
  const location = useLocation();
  // const room_name = location.state.room_name;
  const room_name = "룸";
  // const rooms = location.state.rooms;
  const rooms = [{ room_name: "룸1", room_id: 1 }];
  // const group_id = location.state.group_id;
  const group_id = 13;
  // const groups = location.state.groups;
  const groups = [
    { group_name: "그룹1", group_id: 13 },
    { group_name: "그룹2", group_id: 15 },
  ];
  const { setTypeRoom } = useTypeStore();
  setTypeRoom(room_id);

  return (
    <div>
      <Header />
      <SidebarAtRoom
        room_name={room_name}
        rooms={rooms}
        group_id={group_id}
        groups={groups}
      />
      <Box
        component="main"
        sx={{ flexGrow: 1, bgcolor: "background.default", p: 3 }}
      >
        <Toolbar />
        <Calendar type="room" type_id={room_id} />
      </Box>
    </div>
  );
};

export default Room;
