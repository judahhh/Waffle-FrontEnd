import React from "react";
import { useEffect } from "react";
import { useLocation, useNavigate } from "react-router-dom";

import Box from "@mui/material/Box";
import Toolbar from "@mui/material/Toolbar";

import Header from "../../components/header/Header";
import SideBarAtHome from "../../components/sidebar/SidebarAtHome";

const Index = () => {
  const user_email = localStorage.getItem("email");
  console.log(user_email);

  useEffect(() => {
    let isLogined = localStorage.getItem("isLogined");
    console.log(isLogined);
    // if (!isLogined) navigate("/login");
  }, []);

  return (
    <Box sx={{ display: "flex" }}>
      <Header />
      <SideBarAtHome />
      <Box
        component="main"
        sx={{ flexGrow: 1, bgcolor: "background.default", p: 3 }}
      >
        <Toolbar />
      </Box>
    </Box>
  );
};

export default Index;
