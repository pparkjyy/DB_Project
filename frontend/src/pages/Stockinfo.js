import React, { useState, useEffect } from "react";
import Chart from '../components/chart';
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
  ChartWrapper,
} from "../components/Card";
import styled, { ThemeConsumer } from "styled-components";
import axios from "axios";

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

const Body = styled.div`
  display: flex;
  align-items: "center";
  justify-content: "center";
  width: 100%;
  height:150vh;
`;

const Stockinfo = ({history}) => {

  return (
    <Body style={{}}>
      <CardWrapper>
        <div style={{display: "flex"}}>
        <CardHeader style={{padding: "52px 0px 0px 100px", fontSize: "32px", fontWeight: "800"}}>삼성전자</CardHeader>
        <CardHeader style={{padding: "72px 0px 0px 12px"}}>005930</CardHeader>
        </div>
        <div style={{width: "80%", margin: '20px 100px'}}>
        <div style={{borderStyle: "solid", borderWidth: "2px", display: 'flex', padding: "4px"}}>
          <div ><div style={{fontSize:"48px"}}>57,300</div><div style={{fontSize:"24px"}}>전일대비 -2,200 -3.70%</div></div>
          <div style={{padding: '0px  20px'}}><div style={{padding :"12px"}}>전일 59,500</div><div style={{padding :"12px"}}>시가 58,900</div></div>
          <div style={{padding: '0px  20px'}}><div style={{padding :"12px"}}>고가 59,200</div><div style={{padding :"12px"}}>저가 57,200</div></div>
          <div style={{padding: '0px  20px'}}><div style={{padding :"12px"}}>거래량 20,608,580</div><div style={{padding :"12px"}}>거래대금 1,195,132 백만</div></div>
        </div>
        </div>
        <ChartWrapper style={{width: "88%", height: "30%", padding: "20px"}}>
          <Chart />
        </ChartWrapper>
       
        <div>
        <CardHeader style={{padding: "52px 0px 0px 100px", fontSize: "24px", fontWeight: "600"}}>기업소개</CardHeader>
        <CardWrapper style={{margin: "8px 100px", padding: "20px", borderStyle: "solid", borderWidth: "2px", borderRadius: '12px', borderColor: 'green', width: '80%', fontSize:"18px"}}>
        한국 및 DX부문 해외 9개 지역총괄과 DS부문 해외 5개 지역총괄, SDC, Harman 등 233개의 종속기업으로 구성된 글로벌 전자기업임.
        </CardWrapper>
        </div>

        <div>
        <CardHeader style={{padding: "52px 0px 0px 100px", fontSize: "24px", fontWeight: "600"}}>주요주주현황</CardHeader>
        <CardWrapper style={{margin: "8px 100px", padding: "20px", borderStyle: "solid", borderWidth: "2px", borderRadius: '12px', borderColor: 'green', width: '80%', fontSize:"18px"}}>
        <table style={{ width: '100%', borderCollapse: 'collapse', margin: 'auto' }}>
          <TitleTr>
            <Td>주요주주</Td>
            <Td>소유주식수(주)</Td>
            <Td>지분율</Td>
          </TitleTr>
          <Tr>
            <Td>삼성생명보험 외 15인</Td>
            <Td>1,241,176,035</Td>
            <Td>20.79</Td>
          </Tr>
          <Tr>
            <Td>국민연금공단</Td>
            <Td>458,637,667</Td>
            <Td>7.68</Td>
          </Tr>
          <Tr>
            <Td>BlackRock Fund Advisors 외 15인</Td>
            <Td>300,391,061</Td>
            <Td>5.03</Td>
          </Tr>
        </table>
        </CardWrapper>
        </div>
        
        <div>
        <CardHeader style={{padding: "52px 0px 0px 100px", fontSize: "24px", fontWeight: "600"}}>종목토론실</CardHeader>
        <CardWrapper style={{margin: "8px 100px", padding: "20px", borderStyle: "solid", borderWidth: "2px", borderRadius: '12px', borderColor: 'green', width: '80%', fontSize:"18px"}}>
        이 종목 지금 사는게 좋을까요 ? [1]
        </CardWrapper>
        </div>

      </CardWrapper>
      
    </Body>
  );
};

export default Stockinfo;