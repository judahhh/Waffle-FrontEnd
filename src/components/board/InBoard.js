import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import styled from "styled-components";

import { FiEdit } from "react-icons/fi";
import { VscTrash } from "react-icons/vsc";
import { MdOutlineCancel } from "react-icons/md";
import { Divider } from "@mui/material";

import { api } from "../../api/Interceptors";
import { useGroupsStore } from "../../store/Store";
import ModalOtherProfile from "../commons/ModalOtherProfile";
import { InputTextInModal } from "../commons/InputInModal";
import { BtnInModal } from "../commons/BtnInModal";
import { StyleTextArea } from "../profile/MyData";

const BoardHeader = styled.div`
  width: ${(props) => props.resize[0] - 6000}px;
  height: ${(props) => props.resize[1] - 700}px;
  height: 50px;
  top: 80px;
  left: 580px;
  // background-color: #f5b66c;
  display: flex;
`;
const StyleBox = styled.div`
  position: fixed;
  width: 500px;
  height: 550px;
  width: ${(props) => props.resize[0] - 600}px;
  height: ${(props) => props.resize[1] - 200}px;
  top: 80px;
  left: 580px;
  overflow-y: scroll;
  font-family: "Inter", sans-serif;
`;
const StyleTitle = styled.p`
  margin: 5px;
  font-size: 30px;
  font-weight: bold;
  font-family: "Inter", sans-serif;
`;
const StyleDate = styled.p`
  position: fixed;
  top: 60px;
  right: 20px;
  margin: 5px;
  font-family: "Inter", sans-serif;
`;
const StyleContent = styled.p`
  margin: 10px;
  font-family: "Inter", sans-serif;
`;
const StyleDMWrapper = styled.div`
  position: fixed;
  top: 700px;
  left: 600px;
  top: ${(props) => props.resize[1] - 100}px;
  left: ${(props) => props.resize[0] - 480}px;
  font-family: "Inter", sans-serif;
`;
const StyleForm = styled.form`
  display: flex;
  flex-direction: column;
  align-items: center;
  /* justify-content: right; */
`;
const Wrapper = styled.div`
  text-align: center;
`;
const ButtonInBoard = styled.button`
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

const InBoard = ({ board_id }) => {
  console.log(board_id);
  const navigate = useNavigate();
  const { storeGroups } = useGroupsStore();
  const [resize, setResize] = useState([]);
  const [boardDetail, setBoardDetail] = useState({});
  const [modeEdit, setModeEdit] = useState(false);
  const [noticeOrNot, setNoticeOrNot] = useState("1");
  const [newtitle, setNewtitle] = useState("");
  const [newcontent, setNewcontent] = useState("");
  let other = {};

  let today = new Date();

  let year = today.getFullYear();
  let month = ("0" + (today.getMonth() + 1)).slice(-2);
  let day = ("0" + today.getDate()).slice(-2);
  let date = year + "-" + month + "-" + day;
  console.log(date);
  const handleResize = () => {
    setResize([window.innerWidth, window.innerHeight]);
  };
  useEffect(() => {
    window.addEventListener("resize", handleResize);
    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, [resize]);
  useEffect(() => {
    api
      .get(`/note/${board_id}`)
      .then((response) => {
        console.log(response);
        setBoardDetail(response.data);
        other = { name: boardDetail.writer, id: boardDetail.id };
      })
      .catch((err) => console.log(err));
  }, [board_id]);

  const remove = () => {
    if (window.confirm("글을 삭제하시겠습니까?")) {
      api
        .delete(`/note/${board_id}/delete`)
        .then((response) => {
          console.log(response);

          response.status === 200
            ? alert("게시글 삭제 완료")
            : alert("삭제 권한이 없습니다!");

          // navigate(`/${type}/${type_id}/board`, {
          //   state: { type_name: type_name, groups: storeGroups, rooms: storeRooms },
          // });
          let type = localStorage.getItem("type");
          let type_id =
            type == "group"
              ? localStorage.getItem("group_id")
              : localStorage.getItem("room_id");
          navigate(`/${type}/${type_id}/board`, {
            state: { group: storeGroups },
          });
          //BoardPage로 이동
        })
        .catch((err) => console.log(err));
    }
  };
  const editboard = () => {
    let body = {
      title: newtitle,
      content: newcontent,
      date: date,
      notice: noticeOrNot,
    };
    api
      .post(`/note/${board_id}/update`, body)
      .then((response) => {
        console.log(response);
        setModeEdit(false);
      })
      .catch((err) => console.log(err));
  };

  return (
    <StyleDMWrapper resize={resize}>
      <StyleBox resize={resize}>
        {/* <BoardHeader resize={resize}>
          <VscTrash onClick={remove}></VscTrash>
          <FiEdit onClick={() => setModeEdit(true)}></FiEdit>
        </BoardHeader> */}
        {modeEdit === false ? (
          <>
            <ModalOtherProfile other={other}></ModalOtherProfile>
            <StyleDate>{boardDetail.date}</StyleDate>
            <StyleTitle>{boardDetail.title}</StyleTitle>

            <StyleContent>{boardDetail.content}</StyleContent>
          </>
        ) : (
          <>
            <form onSubmit={editboard}>
              <InputTextInModal
                type="text"
                placeholder={boardDetail.title}
                value={newtitle}
                onChange={(e) => setNewtitle(e.target.value)}
              />
              <StyleTextArea
                name="content"
                cols="30"
                rows="10"
                placeholder={boardDetail.content}
                value={newcontent}
                onChange={(e) => setNewcontent(e.target.value)}
              ></StyleTextArea>
              공지글인가요?
              <input
                type="checkbox"
                value={noticeOrNot}
                onClick={() => setNoticeOrNot("0")}
              />
              <BtnInModal type="submit" />
            </form>
          </>
        )}
        <Divider></Divider>
        {modeEdit ? (
          <FiEdit onClick={() => setModeEdit(true)}></FiEdit>
        ) : (
          <MdOutlineCancel onClick={() => setModeEdit(false)}></MdOutlineCancel>
        )}
        <VscTrash onClick={remove}></VscTrash>
      </StyleBox>
    </StyleDMWrapper>
  );
};

export default InBoard;
