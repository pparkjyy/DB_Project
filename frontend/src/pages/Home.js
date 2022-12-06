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
const Ranking = styled.div`
  width: 40%;
  height: 500px;
  padding-top: 100px;
  padding-left: 64px;
  float: left;
`
const RankTitle = styled.div`
  align-items: center;
`
const Title = styled.div`
  padding-top: 48px;
  padding-bottom: 30px;
  padding-left: 64px;
  font-size: 35px;
  font-weight: bold;
`;
const NewsWrapper = styled.div`
  display: flex;
  flex-direction: column;
  padding-left: 65px;
  align-items: left;
  justify-content: left;
`;
const NewsTitle = styled.div`
  padding-bottom: 10px;
  font-size: 18px;
  float: left;
`;
const NewsOffice = styled.div`
  padding-bottom: 10px;
  font-size: 15px;
  color: #808080;
  float: left;
  padding-left: 50px;
  padding-top: 3px;
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
        {/* <h1>메인 페이지</h1>
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
        </table> */}

        <Title>오늘의 뉴스</Title>
        <NewsWrapper>
          <div>
            <NewsTitle>[시황] 코스피, 외인 매도에 2260대 마감</NewsTitle><NewsOffice>데일리안</NewsOffice>
          </div>
          <div>
            <NewsTitle>[시황] 코스피, 외인 매도에 2260대 마감</NewsTitle><NewsOffice>데일리안</NewsOffice>
          </div>
          <div>
            <NewsTitle>[시황] 코스피, 외인 매도에 2260대 마감</NewsTitle><NewsOffice>데일리안</NewsOffice>
          </div>
          <div>
            <NewsTitle>[시황] 코스피, 외인 매도에 2260대 마감</NewsTitle><NewsOffice>데일리안</NewsOffice>
          </div>
          <div>
            <NewsTitle>[시황] 코스피, 외인 매도에 2260대 마감</NewsTitle><NewsOffice>데일리안</NewsOffice>
          </div>
        </NewsWrapper>

        <Ranking>
          <RankTitle>상승률 상위</RankTitle>
            <div>1. 이수화학 25,200 5,800 +29.90%</div>
            <div>1. 이수화학 25,200 5,800 +29.90%</div>
            <div>1. 이수화학 25,200 5,800 +29.90%</div>
            <div>1. 이수화학 25,200 5,800 +29.90%</div>
            <div>1. 이수화학 25,200 5,800 +29.90%</div>
            <div>1. 이수화학 25,200 5,800 +29.90%</div>
            <div>1. 이수화학 25,200 5,800 +29.90%</div>
            <div>1. 이수화학 25,200 5,800 +29.90%</div>
            <div>1. 이수화학 25,200 5,800 +29.90%</div>
            <div>1. 이수화학 25,200 5,800 +29.90%</div>
        </Ranking>
        <Ranking>
          <RankTitle>하락률 상위</RankTitle>
            <div>1. 이수화학 25,200 5,800 +29.90%</div>
            <div>1. 이수화학 25,200 5,800 +29.90%</div>
            <div>1. 이수화학 25,200 5,800 +29.90%</div>
            <div>1. 이수화학 25,200 5,800 +29.90%</div>
            <div>1. 이수화학 25,200 5,800 +29.90%</div>
            <div>1. 이수화학 25,200 5,800 +29.90%</div>
            <div>1. 이수화학 25,200 5,800 +29.90%</div>
            <div>1. 이수화학 25,200 5,800 +29.90%</div>
            <div>1. 이수화학 25,200 5,800 +29.90%</div>
            <div>1. 이수화학 25,200 5,800 +29.90%</div>
        </Ranking>
        <Ranking>
          <RankTitle>거래량</RankTitle>
            <div>1. 이수화학 25,200 5,800 +29.90%</div>
            <div>1. 이수화학 25,200 5,800 +29.90%</div>
            <div>1. 이수화학 25,200 5,800 +29.90%</div>
            <div>1. 이수화학 25,200 5,800 +29.90%</div>
            <div>1. 이수화학 25,200 5,800 +29.90%</div>
            <div>1. 이수화학 25,200 5,800 +29.90%</div>
            <div>1. 이수화학 25,200 5,800 +29.90%</div>
            <div>1. 이수화학 25,200 5,800 +29.90%</div>
            <div>1. 이수화학 25,200 5,800 +29.90%</div>
            <div>1. 이수화학 25,200 5,800 +29.90%</div>
        </Ranking>
        <Ranking>
          <RankTitle>시가총액</RankTitle>
            <div>1. 이수화학 25,200 5,800 +29.90%</div>
            <div>1. 이수화학 25,200 5,800 +29.90%</div>
            <div>1. 이수화학 25,200 5,800 +29.90%</div>
            <div>1. 이수화학 25,200 5,800 +29.90%</div>
            <div>1. 이수화학 25,200 5,800 +29.90%</div>
            <div>1. 이수화학 25,200 5,800 +29.90%</div>
            <div>1. 이수화학 25,200 5,800 +29.90%</div>
            <div>1. 이수화학 25,200 5,800 +29.90%</div>
            <div>1. 이수화학 25,200 5,800 +29.90%</div>
            <div>1. 이수화학 25,200 5,800 +29.90%</div>
        </Ranking>
      </CardWrapper>
    </Body>
  );
};

export default Home;
