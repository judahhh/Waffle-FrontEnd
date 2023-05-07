import React from "react";

import { Box, Card, CardContent, Typography } from "@mui/material";

const DmMiniBox = ({ isUser, message }) => {
  const color = isUser ? "#87CEFA" : "#e5e5e5";
  return (
    <Box padding={`10px`}>
      {!isUser && <Typography>00님</Typography>}
      <Card sx={{ backgroundColor: color }}>
        <CardContent>
          <Typography>{message}</Typography>
        </CardContent>
      </Card>
    </Box>
  );
};

export default DmMiniBox;
