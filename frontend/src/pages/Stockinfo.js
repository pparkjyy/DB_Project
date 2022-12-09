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
  CardButton
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
import {BsStar, BsStarFill} from "react-icons/bs"
import { getTokenFromCookie } from "../components/Auth";
import Swal from "sweetalert2";

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
  height:200vh;
`;

const setFav = async (id, code, isFavorite, fav) => {
  const res = await axios.post("http://localhost:4000/setFavorite", {
    id: id,
    code: code,
    isFavorite: isFavorite,
  });
  const { result, msg } = res.data;
  if (result === true) {
    Swal.fire(msg, " ", "success").then((result) => {
      if (result.isConfirmed) window.location.reload();
    });
  }
  console.log(res);
  if (isFavorite === true) return false;
  else return true;
};

const Stockinfo = ({history}) => {
  const navigate = useNavigate();
  const navigateState = useLocation().state;
  const token = getTokenFromCookie();
  const stockcode = navigateState && navigateState.code;
  var [stockInfo, setStockInfo] = useState([]);
  var [companyInfo, setCompanyInfo] = useState([]);
  var [shareholderInfo, setShareholderInfo] = useState([]);
  var [order, setOrder] = useState(true);
  var [sell, setSell] = useState(false);
  var [userInfo, setUserInfo] = useState([]);
  var [isFavorite, setIsFavorite] = useState();
  var [stocknum, setStocknum] = useState();

  useEffect((e) => {
    axios
      .get("http://localhost:4000/getStockInfo", {
        params: { stockcode: stockcode },
      })
      .then(({ data }) => setStockInfo(data[0]));
  }, []);

  useEffect((e) => {
    axios
      .get("http://localhost:4000/getCompanyInfo", {
        params: { stockcode: stockcode },
      })
      .then(({ data }) => setCompanyInfo(data[0]));
  }, []);

  useEffect((e) => {
    axios
      .get("http://localhost:4000/getShareholderInfo", {
        params: { stockcode: stockcode },
      })
      .then(({ data }) => setShareholderInfo(data));
  }, []);

  useEffect(() => {
    axios
      .get("http://localhost:4000/getuserdata", {
        headers: { token: token },
      })
      .then(({ data }) => setUserInfo(data[0]));
  }, []);

  useEffect(() => {
    axios
      .get("http://localhost:4000/getFavorite", {
        headers: { token: token },
        params: { stockcode: stockcode },
      })
      .then(({ data }) => setIsFavorite(data));
  }, []);

  useEffect(() => {
    axios
      .get("http://localhost:4000/getStocknum", {
        headers: { token: token },
        params: { stockcode: stockcode },
      })
      .then(({ data }) => setStocknum(data));
  }, []);


  function addComma (data){
    if(data)
    return data.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',');
  }

  function printShareholder (data){
    let array = [];
    for(let i=0; i< data.length; i++){
      array.push(
      <Tr>
        <Td>{data[i].stock_owner}</Td>
        <Td>{addComma(data[i].stock_num)}</Td>
        <Td>{data[i].stock_p}</Td>
      </Tr>
      )
    }
    return array;
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

  // console.log(stocknum)
  return (
    <Body style={{}}>
      <CardWrapper>
        <div style={{display: "flex"}}>
        {(isFavorite==true?(
        <BsStarFill style={{padding: "60px 0px 0px 100px", fontSize: "32px", fontWeight: "800", color: "green"}}
        onClick={async(e)=>{
          isFavorite = setFav(
            userInfo.id,
            stockcode,
            isFavorite
          )
        }}/>
        ):
        (
          <BsStar style={{padding: "60px 0px 0px 100px", fontSize: "32px", fontWeight: "800"}}
          onClick={async(e)=>{
            isFavorite = setFav(
              userInfo.id,
              stockcode,
              isFavorite
            )
          }}
          />
          ))}
        <CardHeader style={{padding: "52px 0px 0px 8px", fontSize: "32px", fontWeight: "800"}}>{stockInfo.stock_name}</CardHeader>
        <CardHeader style={{padding: "72px 692px 0px 12px"}}>{stockInfo.code}</CardHeader>
        <CardHeader style={{padding: "64px 0px 0px 0px", fontSize: "24px", fontWeight: "600", cursor: "pointer"}} onClick={()=>{setOrder(!order)}}>주문하기 > </CardHeader>
        </div>
        {order?(
        <ChartWrapper style={{width: "100%", height: "600px"}}>
        <div style={{width: "80%", margin: '20px 100px'}}>
          <div style={{borderStyle: "solid", borderWidth: "2px", display: 'flex', padding: "4px"}}>
            <div><div style={{fontSize:"48px"}}>{addComma(stockInfo.n_price)}</div><div style={{fontSize:"24px"}}>전일대비 {addComma(stockInfo.n_price-stockInfo.e_price)} {((stockInfo.n_price-stockInfo.e_price)/stockInfo.e_price*100).toFixed(2)}%</div></div>
            <div style={{padding: '0px  20px'}}><div style={{padding :"12px"}}>전일 {addComma(stockInfo.e_price)}</div><div style={{padding :"12px"}}>시가 {addComma(stockInfo.n_price)}</div></div>
            <div style={{padding: '0px  20px'}}><div style={{padding :"12px"}}>고가 {addComma(stockInfo.h_price)}</div><div style={{padding :"12px"}}>저가 {addComma(stockInfo.l_price)}</div></div>
            <div style={{padding: '0px  20px'}}><div style={{padding :"12px"}}>거래량 {addComma(stockInfo.price_count)}</div><div style={{padding :"12px"}}>거래대금 {addComma(stockInfo.price_count*stockInfo.n_price/1000000)} 백만</div></div>
          </div>
        </div> 
        <ChartWrapper style={{width: "88%", height: "400px", padding: "20px"}}>
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
        </ChartWrapper>
        ):
        (
          <ChartWrapper style={{width: "100%", height: "600px", display: "flex"}}>
            <ChartWrapper style={{width: "82%", height: "600px"}}>
              <div style={{width: "80%", margin: '20px 100px'}}>
                <div style={{borderStyle: "solid", borderWidth: "2px", display: 'flex', padding: "4px"}}>
                  <div><div style={{fontSize:"48px"}}>{addComma(stockInfo.n_price)}</div><div style={{fontSize:"24px"}}>전일대비 {addComma(stockInfo.n_price-stockInfo.e_price)} {((stockInfo.n_price-stockInfo.e_price)/stockInfo.e_price*100).toFixed(2)}%</div></div>
                  <div style={{padding: '0px  20px'}}><div style={{padding :"12px"}}>전일 {addComma(stockInfo.e_price)}</div><div style={{padding :"12px"}}>시가 {addComma(stockInfo.n_price)}</div></div>
                  <div style={{padding: '0px  20px'}}><div style={{padding :"12px"}}>고가 {addComma(stockInfo.h_price)}</div><div style={{padding :"12px"}}>저가 {addComma(stockInfo.l_price)}</div></div>
                  <div style={{padding: '0px  20px'}}><div style={{padding :"12px"}}>거래량 {addComma(stockInfo.price_count)}</div><div style={{padding :"12px"}}>거래대금 {addComma(stockInfo.price_count*stockInfo.n_price/1000000)} 백만</div></div>
                </div>
              </div> 
            <ChartWrapper style={{width: "88%", height: "400px", padding: "20px"}}>
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
          </ChartWrapper>
          <CardWrapper style={{margin: "8px 60px 0px 0px", padding: "20px", borderStyle: "solid", borderWidth: "2px", borderRadius: '12px', borderColor: 'green', width: '20%', fontSize:"18px"}}>
            보유수량 : {stocknum?stocknum.stock_num:0}주 
            <CardHeader style={{padding: "0px 0px 0px 0px", fontSize: "24px", fontWeight: "600", display: "flex"}}>
              <CardButton style={{width: "100px", margin: "0px 20px 0px 0px"}} onClick={()=>{setSell(!sell);}}>매도</CardButton>
              <CardButton style={{width: "100px", margin: "0px 20px 0px 0px"}} >매수</CardButton>
            </CardHeader>
          </CardWrapper>
        </ChartWrapper>
        )}
                
        <div>
        <CardHeader style={{padding: "52px 0px 0px 100px", fontSize: "24px", fontWeight: "600"}}>기업소개</CardHeader>
        <CardWrapper style={{margin: "8px 100px", padding: "20px", borderStyle: "solid", borderWidth: "2px", borderRadius: '12px', borderColor: 'green', width: '80%', fontSize:"18px"}}>
        {companyInfo.company_info}
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
          {printShareholder(shareholderInfo)}
        </table>
        </CardWrapper>
        </div>
        
        <div onClick={()=>{navigate("/discuss/"+stockInfo.code,
          {state:{code : stockInfo.code}})}}>
        <CardHeader style={{padding: "52px 0px 0px 100px", fontSize: "24px", fontWeight: "600"}}>종목토론실-- 여기는 아직 미완성</CardHeader>
        <CardWrapper style={{margin: "8px 100px", padding: "20px", borderStyle: "solid", borderWidth: "2px", borderRadius: '12px', borderColor: 'green', width: '80%', fontSize:"18px"}}>
        이 종목 지금 사는게 좋을까요 ? [1] -- 여기는 아직 미완성
        </CardWrapper>
        </div>

      </CardWrapper>
      
    </Body>
  );
};

export default Stockinfo;