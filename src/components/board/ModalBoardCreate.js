import React from "react";
import { useState } from "react";
import styled from "styled-components";
import { useNavigate } from "react-router-dom";

import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import { TextField } from "@mui/material";
import Modal from "@mui/material/Modal";
import { api } from "../../api/Interceptors";
import { useTypeStore } from "../../store/Store";
import { useGroupsStore } from "../../store/Store";
import { useRoomsStore } from "../../store/Store";

const style = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: 600,
  height: 500,
  bgcolor: "background.paper",
  boxShadow: 24,
  borderRadius: 3,
  p: 4,
};

const Wrapper = styled.div`
  text-align: center;
`;
export const Button = styled.button`
  width: 30px;
  height: 30px;
  color: white;
  border: none;
  border-radius: 50%;
  background-color: #f2c8a1;
  font-size: 25px;

  margin: auto;
  :hover {
    cursor: pointer;
  }
  margin: 15px;
`;
const createInput = styled.input`
  margin: 10px;
`;

const ModalBoardCreate = () => {
  const [open, setOpen] = useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);
  let { type, type_id } = useTypeStore();
  const { group_id } = useGroupsStore();
  const { room_id } = useRoomsStore();
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const [noticeOrNot, setNoticeOrNot] = useState("1");

  if (type === "group") type_id = group_id;
  else type_id = room_id;
  let today = new Date();

  let year = today.getFullYear();
  let month = ("0" + (today.getMonth() + 1)).slice(-2);
  let day = ("0" + today.getDate()).slice(-2);
  let date = year + "-" + month + "-" + day;
  console.log(date);

  const createBoard = () => {
    let body = {
      title: title,
      content: content,
      date: date,
      notice: noticeOrNot,
    };
    api
      .post(`/note/${type}/${type_id}/create`, body)
      .then((response) => {
        console.log(response);
        handleClose();
        window.location.reload();
      })
      .catch((err) => console.log(err));
  };
  return (
    <div>
      <Button onClick={handleOpen}>+</Button>
      <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={style} onSubmit={createBoard}>
          <Typography id="modal-modal-title" variant="h6" component="h2">
            게시글 생성
          </Typography>
          <form>
            <p>
              <input
                type="text"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
              />
              <textarea
                name="content"
                cols="30"
                rows="10"
                value={content}
                onChange={(e) => setContent(e.target.value)}
              ></textarea>
              공지글인가요?
              <input
                type="checkbox"
                value={noticeOrNot}
                onClick={() => setNoticeOrNot("0")}
              />
              <input type="submit" value="생성하기" />
            </p>
          </form>
        </Box>
      </Modal>
    </div>
  );
};

export default ModalBoardCreate;
