import React from "react";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

import FullCalendar from "@fullcalendar/react";
import dayGridPlugin from "@fullcalendar/daygrid";

import { api } from "../../api/Interceptors";
import ModalPlan from "./ModalPlan";
import Board from "./Board";
import { useCalenderStore } from "../../store/Store";

const Calendar = (props) => {
  const navigate = useNavigate();
  // const [planList, setPlanList] = useState([]);
  const [selectBoard, setSelectBoard] = useState(false);
  const { isBoard, setBoardState, setCalendarState } = useCalenderStore();
  let groups, group_name;
  let event;
  if (props.groups !== undefined) groups = props.groups;
  if (props.group_name !== undefined) group_name = props.group_name;
  const planList = [
    {
      plan_id: 3,
      title: "공부하기",
      start: "2023-05-13",
      end: "2023-05-14",
      extendedProps: {
        department: "",
      },
      color: "#f5b66c",
      allDay: true,
      content: "react",
      state: "미완료",
    },
    {
      plan_id: 4,
      title: "회의",
      start: "2023-05-13",
      end: "2023-05-14",
      extendedProps: {
        department: "",
      },
      color: "#f5b66c",
      allDay: true,
      content: "",
      state: "진행중",
    },
  ];

  const handleDateClick = (e) => {
    event = {
      id: e.event.id,
      title: e.event.title,
      start: e.event.start,
      end: e.event.end,
      content: e.event.extendedProps.content,
      state: e.event.extendedProps.state,
    };
    navigate("/planEditNDelete", {
      state: {
        type: props.type,
        type_id: props.type_id,
        id: event.id,
        title: event.title,
        content: event.content,
        start: event.start,
        end: event.end,
        groups: props.groups,
        group_name: props.group_name,
      },
    });
  };
  const getPlan = async () => {
    const type = props.type;
    const type_id = props.type_id;
    console.log(type, type_id);
    await api
      .get(`/plan/${type}/${type_id}/list`)
      .then((response) => {
        //여기서 캘린더에 보여줄 planList 세팅하기
        console.log(response);
        // setPlanList(response.data.plans);
      })
      .catch((err) => console.log(err));
  };
  useEffect(() => {
    getPlan();
  }, []);

  return (
    <div>
      <ModalPlan type={props.type} type_id={props.type_id} />
      <button onClick={() => setBoardState(true)}>보드로 보기</button>
      <button onClick={() => setCalendarState(true)}>캘린더로 보기</button>
      {isBoard ? (
        <Board planList={planList} />
      ) : (
        <FullCalendar
          plugins={[dayGridPlugin]}
          initialView="dayGridMonth"
          dayMaxEvents={true}
          events={planList}
          height={"600px"}
          editable={true}
          eventClick={handleDateClick}
        />
      )}
    </div>
  );
};

export default Calendar;
