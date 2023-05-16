import React from "react";
import { useLocation, useParams } from "react-router-dom";
import { Box, Toolbar } from "@mui/material";

import Header from "../../components/header/Header";
import SidebarAtGroup from "../../components/sidebar/SidebarAtGroup";
import Calendar from "../../components/plan/Calendar";
import BoardList from "../../components/board/BoardList";
import { useTypeStore, useHeaderMenuStore } from "../../store/Store";

const Group = () => {
  const { group_id } = useParams();
  const location = useLocation();
  const group_name = location.state.group_name;

  const groups = location.state.groups;
  const { headerMenu } = useHeaderMenuStore();
  const { setTypeGroup } = useTypeStore();
  setTypeGroup(group_id);

  return (
    <div>
      <Box sx={{ display: "flex" }}>
        <Header />
        <SidebarAtGroup
          group_id={group_id}
          group_name={group_name}
          groups={groups}
          // groupNames={groupNames}
        />
        <Box
          component="main"
          sx={{ flexGrow: 1, bgcolor: "background.default", p: 3 }}
        >
          <Toolbar />
          {headerMenu === "plan" ? (
            <Calendar
              type="group"
              type_id={group_id}
              groups={groups}
              group_name={group_name}
            />
          ) : (
            <BoardList />
          )}
        </Box>
      </Box>
    </div>
  );
};

export default Group;
