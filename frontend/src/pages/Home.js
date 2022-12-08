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
const Title = styled.div`
  padding-top: 48px;
  padding-bottom: 30px;
  padding-left: 90px;
  font-size: 30px;
  font-weight: 600;
`;
const NewsWrapper = styled.div`
  display: flex;
  flex-direction: column;
  padding-left: 90px;
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
const Ranking = styled.div`
  width: 40%;
  height: 420px;
  padding-top: 80px;
  padding-left: 90px;
  float: left;
  align-items: center;
  text-align: center;
`
const RankTitle = styled.div`
  text-align: center;
  align-items: center;
  font-size: 30px;
  font-weight: 600;
`
const Number = styled.div`
  width: 5%;
  padding-bottom: 10px;
  padding-top: 4px;
  font-size: 20px;
  float: left;
`
const RankName = styled.div`
  width: 36%;
  padding-left: 10px;
  padding-bottom: 10px;
  text-align: left;
  float: left;
  font-size: 20px;
`
const Info = styled.div`
  width: 18%;
  padding-bottom: 10px;
  padding-top: 4px;
  text-align: right;
  float: left;
  font-size: 20px;
`
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

  var [fallingRate, setFallingRate] = useState([]);
  useEffect(() => {
    axios
      .get("http://localhost:4000/fallingRate")
      .then(({ data }) => setFallingRate(data));
  }, []);

  var [volume, setVolume] = useState([]);
  useEffect(() => {
    axios
      .get("http://localhost:4000/volume")
      .then(({ data }) => setVolume(data));
  }, []);

  var [marketCap, setMarketCap] = useState([]);
  useEffect(() => {
    axios
      .get("http://localhost:4000/marketCap")
      .then(({ data }) => setMarketCap(data));
  }, []);

  function printRanking(Data){
    let array = [];
    for(let i = 0; i< Data.length; i++){
      let price = Data[i].price.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',');
      let difference = Data[i].difference.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',');
      if(Data[i].difference > 0)
        array.push(
          <div><Number>{i+1}.</Number><RankName>{Data[i].name}</RankName><Info>{price}</Info><Info style={{color:'red'}}>+{difference}</Info><Info style={{color:'red'}}>+{Data[i].rate.toFixed(2)}%</Info></div>
        )
      else if(Data[i].difference < 0)
        array.push(
          <div><Number>{i+1}.</Number><RankName>{Data[i].name}</RankName><Info >{price}</Info><Info style={{color:'blue'}}>{difference}</Info><Info style={{color:'blue'}}>{Data[i].rate.toFixed(2)}%</Info></div>
        )
      else
        array.push(
          <div><Number>{i+1}.</Number><RankName>{Data[i].name}</RankName><Info>{price}</Info><Info>-</Info><Info>0.00%</Info></div>
        )
    }
    return array
  }

  return (
    <Body style={{}}>
      <CardWrapper>
{/*         
        <table style={{ width: '80%', borderCollapse: 'collapse', margin: 'auto' }}>
          <TitleTr>
            <Td>Id</Td>
            <Td>PW</Td>
            <Td>name</Td>
            <Td>age</Td>
            <Td>phone</Td>
            <Td>email</Td>
            <Td>money</Td>
          </TitleTr>
          {printData(Data)}
        </table>  */}
        
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
        </NewsWrapper><hr style={{ borderTop: '0.5px #c8c8c8', width: '87%' }}/>

        <Ranking>
          <RankTitle>상승률 상위</RankTitle>
          <hr style={{ borderTop: '0.5px #c8c8c8' }}/>
          {printRanking(risingRate)}
        </Ranking>
        <Ranking>
          <RankTitle>하락률 상위</RankTitle><hr style={{ borderTop: '0.7px #c8c8c8' }}/>
          {printRanking(fallingRate)}
        </Ranking>
        <Ranking>
          <RankTitle>거래량 상위</RankTitle><hr style={{ borderTop: '0.7px #c8c8c8' }}/>
          {printRanking(volume)}
        </Ranking>
        <Ranking>
          <RankTitle>시가총액 상위</RankTitle><hr style={{ borderTop: '0.7px #c8c8c8' }}/>
          {printRanking(marketCap)}
        </Ranking>
      </CardWrapper>
    </Body>
  );
};

export default Home;
