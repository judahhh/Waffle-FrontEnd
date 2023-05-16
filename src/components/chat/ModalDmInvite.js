import React from "react";
import { useState } from "react";
import styled from "styled-components";
import { useNavigate } from "react-router-dom";

import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import Modal from "@mui/material/Modal";

import { api } from "../../api/Interceptors";

const style = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: 400,
  height: 300,
  bgcolor: "background.paper",
  boxShadow: 24,
  borderRadius: 3,
  p: 4,
};

const ButtonInDM = styled.button`
  width: 30px;
  height: 30px;
  color: #f2c8a1;
  border: solid 1px #f2c8a1;
  border-radius: 50%;
  background-color: white;
  font-size: 24px;

  margin: auto;
  :hover {
    cursor: pointer;
  }
  margin: 5px;
`;

const ModalDmInvite = (props) => {
  const navigate = useNavigate();
  const { dm_id } = props;
  const [open, setOpen] = useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);
  const [inviteEmail, setInviteEmail] = useState("");
  //   const email = useSelector((state) => state.user.email);

  const InviteFriendToDM = () => {
    // let chat_id=dm_id
    api
      .post(`/chat/${dm_id}/invite`, { email: inviteEmail })
      .then((response) => {
        console.log(response);
        handleClose();
        //navigate("/chat");
      })
      .catch((err) => console.log(err));
  };

  return (
    <div>
      <ButtonInDM onClick={handleOpen}>+</ButtonInDM>

      <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={style} onSubmit={InviteFriendToDM}>
          <Typography id="modal-modal-title" variant="h6" component="h2">
            채팅방에 사용자 초대
          </Typography>
          <form>
            초대 이메일
            <input
              type="text"
              label="초대자 이메일"
              value={inviteEmail}
              onChange={(e) => setInviteEmail(e.target.value)}
            />
            <p>
              <input type="submit" value="초대하기" />
            </p>
          </form>
        </Box>
      </Modal>
    </div>
  );
};
export default ModalDmInvite;
