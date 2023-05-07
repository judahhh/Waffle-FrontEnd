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

const Wrapper = styled.div`
  text-align: center;
`;
const Button = styled.button`
  width: 200px;
  height: 50px;
  border: none;
  border-radius: 10px;
  background-color: #f5b66c;
  font-size: 20px;
  font-weight: bold;
  margin: auto;
  :hover {
    cursor: pointer;
  }
`;

const ModalGroup = (props) => {
  const navigate = useNavigate();
  const [open, setOpen] = useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);
  const [group_name, setGroup_name] = useState("");
  const email = localStorage.getItem("email");

  const createGroupRoom = async (e) => {
    e.preventDefault();
    let body = {
      group_name: group_name,
      email: email,
    };
    await api
      .post("/creategroup", body)
      .then((response) => {
        console.log(response);
        let group_id = response.data;
        navigate(`/group/${group_id}`);
        handleClose();
        window.location.reload();
      })
      .catch((err) => console.log(err));
  };

  return (
    <div>
      <Wrapper>
        <Button onClick={handleOpen}>
          + &nbsp;Group Create
          {/* <AddIcon /> */}
        </Button>
      </Wrapper>

      <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={style} onSubmit={createGroupRoom}>
          <Typography id="modal-modal-title" variant="h6" component="h2">
            그룹 생성
          </Typography>
          <form>
            그룹 이름 :{" "}
            <input
              type="text"
              label="그룹 이름"
              value={group_name}
              onChange={(e) => setGroup_name(e.target.value)}
            />
            <p>
              <input type="submit" value="생성" />
            </p>
          </form>
        </Box>
      </Modal>
    </div>
  );
};
export default ModalGroup;
