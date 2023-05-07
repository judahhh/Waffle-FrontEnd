import React, { useEffect, useRef, useState } from "react";
import { useLocation, useNavigate, useParams } from "react-router-dom";
import styled from "styled-components";
import * as StompJs from "@stomp/stompjs";

import { Grid } from "@mui/material";

import { api } from "../../api/Interceptors";
import ModalDmInvite from "./ModalDmInvite";
import DmMiniBox from "./DmMiniBox";

const DmHeaderData = styled.p`
  @media screen and (max-width: 1000px) {
    position: fixed;
    left: 700px;
  }
`;
const DMChatHeader = styled.div`
  width: ${(props) => props.resize[0] - 6000}px;
  height: ${(props) => props.resize[1] - 700}px;
  height: 50px;
  top: 80px;
  left: 580px;
  background-color: #f5b66c;
  display: flex;
`;
const StyleBox = styled.div`
  position: fixed;
  width: 500px;
  height: 550px;
  width: ${(props) => props.resize[0] - 600}px;
  height: ${(props) => props.resize[1] - 200}px;
  background-color: seashell;
  top: 80px;
  left: 580px;
  overflow-y: scroll;
`;
const StyleDMWrapper = styled.div`
  position: fixed;
  top: 700px;
  left: 600px;
  top: ${(props) => props.resize[1] - 100}px;
  left: ${(props) => props.resize[0] - 480}px;
`;
const StyleForm = styled.form`
  display: flex;
  flex-direction: column;
  align-items: center;
  /* justify-content: right; */
`;

const MyInputBlock = styled.div`
  display: flex;
  @media screen and (max-width: 1000px) {
    position: fixed;
    left: 600px;
  }
`;
const MyInput = styled.input`
  width: 400px;
  height: 50px;
  background-color: rgba(245, 182, 108, 0.2);
  border: 1px solid #dee2e6;
  border-radius: 4px;
  padding: 0 12px;
  font-size: 16px;
  &:focus {
    outline: none;
    border-color: #f5b66c;
  }
`;
const Wrapper = styled.div`
  text-align: center;
`;
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
const SpeechBubble = styled.div`
  background-color: wheat;
  color: black;
  border: none;
  height: 40px;
  border-radius: 5px;
`;
const ButtonSubmit = styled.button`
  width: 50px;
  height: 30px;
  color: white;
  border: none;
  border-radius: 10px;
  background-color: #f5b66c;
  font-size: 15px;
  font-weight: bold;

  margin: auto;
  :hover {
    cursor: pointer;
  }
  margin: 15px;
`;

const InDM = (props) => {
  const [resize, setResize] = useState([]);
  const navigate = useNavigate();

  const { dm_id } = useParams();
  const location = useLocation;
  // const dmID = location.state.dmID;
  // const dmName = location.state.dmName;
  const { dmName } = props;
  const [messageList, setMessageList] = useState([]);
  const [message, setMessage] = useState("");
  const [peopleIncluded, setPeopleIncluded] = useState();

  const handleResize = () => {
    setResize([window.innerWidth, window.innerHeight]);
  };
  useEffect(() => {
    window.addEventListener("resize", handleResize);
    // console.log(resize);
    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, [resize]);

  useEffect(() => {
    api
      .get(`/chat/${dm_id}/userlist`)
      .then((response) => {
        console.log(response.data.users);
        setPeopleIncluded(response.data.users);
      })
      .catch((err) => console.log(err));
  }, [dm_id]);

  useEffect(() => {
    api
      .get(`/chat/${dm_id}/messagelist`)
      .then((response) => {
        console.log(response);
        setMessageList(response.data.messages);
      })
      .catch((err) => console.log(err));
  }, []);

  //InviteFriendToDM 함수 채팅방 초대 모달 만들어서 거기 생성 부분에 옮기기
  // const InviteFriendToDM = () => {
  //   // let chat_id=dm_id
  //   api
  //     .post(`/chat/${dm_id}/invite`, {})
  //     .then((response) => {
  //       console.log(response);
  //     })
  //     .catch((err) => console.log(err));
  // };
  const LeaveDM = () => {
    if (window.confirm("이 채팅방을 나가시겠습니까?")) {
      api
        .post(`/chat/${dm_id}/delete`)
        .then((response) => {
          console.log(response);
          navigate("/chat");
        })
        .catch((err) => console.log(err));
    } else {
      alert("채팅방 나가기를 취소하셨습니다.");
    }
  };

  const client = useRef({});
  const connect = () => {
    console.log("나 연결한다");
    client.current = new StompJs.Client({
      brokerURL: `ws://${process.env.REACT_APP_SOCKET_IP}/chat-stomp`,
      onConnect: () => {
        console.log("연결 성공했다");
        subscribe();
      },
      connectHeaders: {
        access_token: localStorage.getItem("jwt_accessToken"),
        refresh_token: localStorage.getItem("jwt_refreshToken"),
      },
    });
    // client.current.connect({}, () => {
    //   //subscribe()
    //   console.log("소켓연결");
    //   client.current.subscribe(`/sub/chat/${dm_id}`, (response) => {
    //     console.log(response);
    //     const json_body = JSON.parse(response.body);
    //     setMessageList((_chat_list) => [..._chat_list, json_body]);
    //     console.log(json_body);
    //   });
    // });
    client.current.activate();
  };

  const subscribe = () => {
    console.log("나 구독한다");
    client.current.subscribe(
      `/sub/chat/${dm_id}`,
      (response) => {
        console.log(response);
        const json_body = JSON.parse(response.body);
        setMessageList((_chat_list) => [..._chat_list, json_body]);
        console.log(json_body);
      },
      {
        headers: {
          access_token: localStorage.getItem("jwt_accessToken"),
          refresh_token: localStorage.getItem("jwt_refreshToken"),
        },
      }
    );
  };

  const send = (message) => {
    if (!client.current.connected) return; //연결되지 않았으면 메시지를 보내지 않는다.
    // client.current.send(
    //   "/pub/chat",
    //   {},
    //   JSON.stringify({
    //     dm_id: dm_id,
    //     content: chat,
    //     sender: localStorage.getItem("email"),
    //   })
    // );
    console.log("나 메시지 보낸다");
    client.current.publish({
      destination: "/pub/chat",
      body: JSON.stringify({
        dmId: dm_id,
        content: message,
        user_email: localStorage.getItem("email"),
      }), // 형식에 맞게 수정해서 보내야 함.
      headers: {
        access_token: localStorage.getItem("jwt_accessToken"),
        refresh_token: localStorage.getItem("jwt_refreshToken"),
      },
    });

    console.log("메시지 보냈다");
    setMessage(""); //전송하고 나면 인풋값 비워주기
  };

  // const subscribe = () => {
  //   client.current.subscribe("/sub/chat/" + dm_id, (body) => {
  //     const json_body = JSON.parse(body.body);
  //     setChatList((_chat_list) => [..._chat_list, json_body]);
  //   });
  // };

  const disconnect = () => {
    client.current.deactivate();
  };

  // const handleChange = (event) => {
  //   // 채팅 입력 시 state에 값 설정
  //   setMessage(event.target.value);
  // };

  const handleSubmit = (e) => {
    if (message.length === 0) return;
    // 보내기 버튼 눌렀을 때 publish
    e.preventDefault();
    send(message);
    setMessage(message);
  };

  const moveToVideoChat = () => {
    // window.open(
    //   `${process.env.REACT_APP_SERVER_URL}/openvidu/${dm_id}`,
    //   "_blank",
    //   "noreferrer"
    // );
    navigate(`/openvidu/${dm_id}`);
  };
  // const moveToVideoChat2 = () => {
  // window.open(
  //   `${process.env.REACT_APP_SERVER_URL}/openvidu2/${dm_id}`,
  //   "_blank",
  //   "noreferrer"
  // );
  //   navigate(`/openvidu2/${dm_id}`);
  // };
  const messageListRef = useRef(null);
  useEffect(() => {
    // messageListRef.current.scrollTo(0, messageListRef.current.scrollHeight);
    // messageListRef.current.scrollTop = messageListRef.current.scrollHeight;
    console.log("메시지 보내면(메시지 리스트 바뀌면) 아래로 자동 스크롤!");
  }, [messageList]);

  useEffect(() => {
    connect();

    return () => disconnect();
  }, [dm_id]);

  if (!peopleIncluded) {
    return <div></div>;
  }

  return (
    <StyleDMWrapper resize={resize}>
      {/* <div>{messageList}</div> */}
      <StyleBox resize={resize} ref={messageListRef}>
        <DMChatHeader resize={resize}>
          {/* <ButtonInDM onClick={InviteFriendToDM}>
            +
          </ButtonInDM> */}
          <ButtonInDM onClick={LeaveDM}>-{/* <AddIcon /> */}</ButtonInDM>
          <ModalDmInvite dm_id={dm_id} />

          <h3 style={{ margin: "10px" }}>{dmName}</h3>
          {/* 여기에 peopleIncluded */}
          {peopleIncluded.map((v, i) => (
            <p key={v.id}> &nbsp; {v.name} | </p>
          ))}
          <ButtonInDM onClick={moveToVideoChat}>1</ButtonInDM>
          {/* <ButtonInDM onClick={moveToVideoChat2}>2</ButtonInDM> */}
        </DMChatHeader>

        {/* messageList 뿌려주기 */}
        {messageList.map((v, i) => {
          return (
            <Grid
              key={v.id}
              item
              display={"flex"}
              justifyContent={
                localStorage.getItem("email") === v.user_email
                  ? "flex-end"
                  : "flex-start"
              }
            >
              {/* <SpeechBubble key={v.content}> */}
              <h4 style={{ backgroundColor: "#f5b66c", borderRadius: "5px" }}>
                &nbsp;&nbsp;{v.user_name}&nbsp;&nbsp;&nbsp;
              </h4>

              {/* </SpeechBubble> */}
              <h5 style={{ color: "grey" }}>
                {v.content}&nbsp;&nbsp;&nbsp;&nbsp;
              </h5>
              {/* {v.time} */}
            </Grid>
          );
        })}
      </StyleBox>

      {/* <StyleForm> */}
      <StyleForm onSubmit={(e) => handleSubmit(e)}>
        <Wrapper>
          <MyInputBlock resize={resize}>
            <MyInput
              type={"text"}
              name={"chatInput"}
              onChange={(e) => setMessage(e.target.value)}
              value={message}
              resize={resize}
            />
            <ButtonSubmit type="submit" value="전송">
              전송
            </ButtonSubmit>
          </MyInputBlock>
        </Wrapper>
      </StyleForm>
    </StyleDMWrapper>
  );
};

export default InDM;
