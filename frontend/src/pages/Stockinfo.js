import React, { useState, useEffect } from "react";
import { useLocation, useNavigate } from "react-router";
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
import {
	ResponsiveContainer,
	ComposedChart,
	Line,
	Bar,
	XAxis,
	YAxis,
	CartesianGrid,
	Tooltip,
	Legend,
} from 'recharts';

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
  const navigateState = useLocation().state;
  const stockcode = navigateState && navigateState.code;

  var [stockInfo, setStockInfo] = useState([]);
  
  useEffect((e) => {
    axios
      .get("http://localhost:4000/getStockInfo", {
        params: { stockcode: stockcode },
      })
      .then(({ data }) => setStockInfo(data[0]));
  }, []);

  function addComma (data){
    if(data)
    return data.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',');
  }

  const [usageStatus, setUsageStatus] = useState([]);
  
    useEffect(() => {
      axios.get('../DATA/'+stockcode+',2021.json')
        .then((res) => {
        const dataTemp = res.data&&res.data.map((data) => {
          return {
            date: data.Date,
            '가격(원)': data.Close,
            '거래량': data.Volume,
          };
        });
        setUsageStatus(dataTemp);
      });
    }, [history]);

  console.log(stockInfo);
  return (
    <Body style={{}}>
      <CardWrapper>
        <div style={{display: "flex"}}>
        <CardHeader style={{padding: "52px 0px 0px 100px", fontSize: "32px", fontWeight: "800"}}>{stockInfo.stock_name}</CardHeader>
        <CardHeader style={{padding: "72px 0px 0px 12px"}}>{stockInfo.code}</CardHeader>
        </div>
        <div style={{width: "80%", margin: '20px 100px'}}>
          <div style={{borderStyle: "solid", borderWidth: "2px", display: 'flex', padding: "4px"}}>
            <div><div style={{fontSize:"48px"}}>{addComma(stockInfo.n_price)}</div><div style={{fontSize:"24px"}}>전일대비 {addComma(stockInfo.n_price-stockInfo.e_price)} {((stockInfo.n_price-stockInfo.e_price)/stockInfo.e_price*100).toFixed(2)}%</div></div>
            <div style={{padding: '0px  20px'}}><div style={{padding :"12px"}}>전일 {addComma(stockInfo.e_price)}</div><div style={{padding :"12px"}}>시가 {addComma(stockInfo.n_price)}</div></div>
            <div style={{padding: '0px  20px'}}><div style={{padding :"12px"}}>고가 {addComma(stockInfo.h_price)}</div><div style={{padding :"12px"}}>저가 {addComma(stockInfo.l_price)}</div></div>
            <div style={{padding: '0px  20px'}}><div style={{padding :"12px"}}>거래량 {addComma(stockInfo.price_count)}</div><div style={{padding :"12px"}}>거래대금 {addComma(stockInfo.price_count*stockInfo.n_price/1000000)} 백만</div></div>
          </div>
        </div> 
        <ChartWrapper style={{width: "88%", height: "30%", padding: "20px"}}>
          <ResponsiveContainer>
          <ComposedChart
            width={600}
            height={300}
            data={usageStatus}
            margin={{ top: 0, bottom: 0, left: 40 }}
          >
            <CartesianGrid stroke="#f5f5f5" />
            <XAxis dataKey="date" />
            <YAxis yAxisId="left" />
            <YAxis yAxisId="right" orientation="right" />
            <Tooltip />
            <Legend />
            <Bar yAxisId="right" dataKey="거래량" barSize={30} fill="#7ac4c0" />
            <Line yAxisId="left" type="monotone" dataKey="가격(원)" stroke="#ff7300" />
          </ComposedChart>
        </ResponsiveContainer>
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