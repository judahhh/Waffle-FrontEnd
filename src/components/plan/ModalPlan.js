import React from "react";
import { useState } from "react";
import styled from "styled-components";

import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import { Checkbox, Modal } from "@mui/material";

import { api } from "../../api/Interceptors";
import { Button } from "../chat/ModalDmCreate";

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

const ModalPlan = (props) => {
  const [open, setOpen] = useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  const [selectStartYear, setSelectStartyear] = useState("2023");
  const [selectStartMonth, setSelectStartMonth] = useState("");
  const [selectStartDay, setSelectStartDay] = useState("");

  const [selectEndYear, setSelectEndyear] = useState("2023");
  const [selectEndMonth, setSelectEndMonth] = useState("");
  const [selectEndDay, setSelectEndDay] = useState("");
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const [state, setState] = useState("");
  const [form, setForm] = useState({
    year: 2023,
    month: "01",
    day: "01",
  });
  const now = new Date();

  let years = [];
  for (let y = now.getFullYear(); y >= 2020; y -= 1) {
    years.push(y);
  }
  let month = [];
  for (let m = 1; m <= 12; m += 1) {
    if (m < 10) {
      // 날짜가 2자리로 나타나야 했기 때문에 1자리 월에 0을 붙혀준다
      month.push("0" + m.toString());
    } else {
      month.push(m.toString());
    }
  }
  let days = [];
  let date = new Date(form.year, form.month, 0).getDate();
  for (let d = 1; d <= date; d += 1) {
    if (d < 10) {
      // 날짜가 2자리로 나타나야 했기 때문에 1자리 일에 0을 붙혀준다
      days.push("0" + d.toString());
    } else {
      days.push(d.toString());
    }
  }

  const createPlan = async (e) => {
    e.preventDefault();

    const type = props.type;
    const type_id = props.type_id;
    let body = {
      title: title,
      content: content,
      start: `${selectStartYear}-${selectStartMonth}-${selectStartDay}`,
      end: `${selectEndYear}-${selectEndMonth}-${selectEndDay}`,
      state: "미완료",
    };
    console.log(body);
    await api
      .post(`/plan/${type}/${type_id}/create`, body)
      .then((response) => {
        console.log(response);
        handleClose();
        window.location.reload();
      })
      .catch((err) => console.log(err));
  };

  return (
    <>
      <Button onClick={handleOpen}>+</Button>{" "}
      <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={style} onSubmit={createPlan}>
          <form style={{ textAlign: "center" }}>
            <div>
              <label>시작 날짜 : </label>
              <select
                onChange={(e) => {
                  setSelectStartyear(e.target.value);
                }}
                value={selectStartYear}
              >
                {years.map((item) => (
                  <option value={item} key={item}>
                    {item}
                  </option>
                ))}
              </select>
              <select
                onChange={(e) => {
                  setSelectStartMonth(e.target.value);
                }}
                value={selectStartMonth}
              >
                {month.map((item) => (
                  <option value={item} key={item}>
                    {item}
                  </option>
                ))}
              </select>
              <select
                onChange={(e) => {
                  setSelectStartDay(e.target.value);
                }}
                value={selectStartDay}
              >
                {days.map((item) => (
                  <option value={item} key={item}>
                    {item}
                  </option>
                ))}
              </select>
            </div>
            <div>
              <label>종료 날짜 : </label>
              <select
                onChange={(e) => {
                  setSelectEndyear(e.target.value);
                }}
                value={selectEndYear}
              >
                {years.map((item) => (
                  <option value={item} key={item}>
                    {item}
                  </option>
                ))}
              </select>
              <select
                onChange={(e) => {
                  setSelectEndMonth(e.target.value);
                }}
                value={selectEndMonth}
              >
                {month.map((item) => (
                  <option value={item} key={item}>
                    {item}
                  </option>
                ))}
              </select>
              <select
                onChange={(e) => {
                  setSelectEndDay(e.target.value);
                }}
                value={selectEndDay}
              >
                {days.map((item) => (
                  <option value={item} key={item}>
                    {item}
                  </option>
                ))}
              </select>
            </div>
            <div>
              <label>일정 : </label>
              <input
                type="text"
                display="block"
                value={title}
                onChange={(e) => {
                  setTitle(e.target.value);
                }}
              />
            </div>

            <div>
              <label>내용 : </label>
              <input
                type="text"
                display="block"
                value={content}
                onChange={(e) => {
                  setContent(e.target.value);
                }}
              />
            </div>
            <div>
              {/* <label>상태 : </label> */}
              <div>
                {" "}
                완료
                <input type="radio" value="완료" />
              </div>
              <div>
                {" "}
                미완료
                <input type="radio" value="미완료" />
              </div>
              <div>
                {" "}
                진행중
                <input type="radio" value="진행중" />
              </div>
            </div>

            <button type="submit">일정 생성</button>
          </form>
        </Box>
      </Modal>
    </>
  );
};

export default ModalPlan;
