import React, { useState, useEffect } from "react";
import {
  CardWrapper,
  CardHeader,
  CardHeading,
  CardBody,
  CardFieldset,
  CardInput,
  CardTitle,
  CardSelect,
  CardSelectOption,
  CardLink,
} from "../components/Card";
import styled from "styled-components";
import axios from "axios";

const Body = styled.div`
  display: flex;
  align-items: "center";
  justify-content: "center";
  width: 100%;
`;
const Tr = styled.tr`
  border-top: 1px solid black;
  border-bottom: 1px solid black;
  &:nth-child(odd){background-color: #e6f1ff;}
  &:nth-child(even) { background-color: #f0f7ff; }
  &:hover { background-color: #ffc5c2; cursor: pointer; }
`;
const TitleTr = styled.tr`
  border-top: 1px solid black;
  border-bottom: 1px solid black;
`;
const Td = styled.td`
  padding: 4px 20px;
  font-weight: 700;
`;

const Home = ({ history }) => {
  var [risingRate, setRisingRate] = useState([]);
  useEffect(() => {
    axios
      .get("http://localhost:4000/risingRate")
      .then(({ data }) => setRisingRate(data));
  }, []);

  var [Data, setData] = useState([]);
  useEffect(() => {
    axios
      .get("http://localhost:4000/test")
      .then(({ data }) => setData(data));
  }, []);

  function printData(Data){
    let array = [];
    for(let i = 0; i< Data.length; i++){
      array.push(
        <Tr>
          <Td>{Data[i].ID}</Td>
          <Td>{Data[i].PW}</Td>
          <Td>{Data[i].name}</Td>
          <Td>{Data[i].age}</Td>
          <Td>{Data[i].phone}</Td>
          <Td>{Data[i].email}</Td>
          <Td>{Data[i].money}</Td>
        </Tr>
      )
    }
    return array
  }
  return (
    <Body style={{}}>
      <CardWrapper>
        <h1>메인 페이지</h1>
        <div>에서 DB 연결 테스트</div>
        <div>코드는 backend/src/api/test.js 랑</div>
        <div>backend/src/server.js 에서 확인 가능</div>
        <h2>아래는 데이터 테스트임.</h2>
        <table style={{ width: '80%', borderCollapse: 'collapse', margin: 'auto' }}>
          <TitleTr>
            <Td>ID</Td>
            <Td>PW</Td>
            <Td>name</Td>
            <Td>age</Td>
            <Td>phone</Td>
            <Td>email</Td>
            <Td>money</Td>
          </TitleTr>
          {printData(Data)}
        </table>
      </CardWrapper>
    </Body>
  );
};

export default Home;
