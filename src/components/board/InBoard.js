import React, { useEffect } from "react";
import styled from "styled-components";
import { api } from "../../api/Interceptors";

const BoardHeader = styled.div`
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
  useEffect(() => {
    api
      .get("")
      .then((response) => {
        console.log(response);
      })
      .catch((err) => console.log(err));
  }, []);
  return (
    <StyleDMWrapper>
      <StyleBox>
        <BoardHeader>
          <ButtonInBoard>-</ButtonInBoard>
        </BoardHeader>
      </StyleBox>
    </StyleDMWrapper>
  );
};

export default InBoard;