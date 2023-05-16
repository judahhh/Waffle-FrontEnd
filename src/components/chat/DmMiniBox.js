import React from "react";
import styled from "styled-components";

import { Box, Card, CardContent, Typography } from "@mui/material";

const MessageBox = styled(Card)`
  height: 40px;
`;

const DmMiniBox = ({ user_name, user_email, time, content }) => {
  //#f5b66c
  let isUser = localStorage.getItem("email") === user_email;
  const color = isUser ? "#f5b66c" : "white";
  return (
    <Box padding={`7px`}>
      {user_email !== localStorage.getItem("email") && (
        <p style={{ fontWeight: "bold", margin: "5px" }}>{user_name}</p>
      )}
      <MessageBox style={{ backgroundColor: color }}>
        <CardContent>
          <Typography style={{ lineHeight: "10px" }}>{content}</Typography>
        </CardContent>
      </MessageBox>
      <Typography>{time}</Typography>
    </Box>
  );
};

export default DmMiniBox;
