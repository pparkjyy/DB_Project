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
import { getInfoFromCookie, getTokenFromCookie } from "../components/Auth";
import axios from "axios";
import { useNavigate, useRoutes } from "react-router";
import { Print } from "../components/print";
import { Printu } from "../components/printu";

const Body = styled.div`
  display: flex;
  align-items: "center";
  justify-content: "center";
  width: 100%;
`;
const CardWrapper2 = styled.div`
  overflow: hidden;
  padding: 0 0 32px;
  margin: 24px auto 0;
  width: 100%;
  font-family: Quicksand, arial, sans-serif;
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

const MyPage = ({ history }) => {
  const info = getInfoFromCookie();
  const token = getTokenFromCookie();
  const navigate = useNavigate();
  var [usermoney, setusermoney] = useState([]);
  var [useracc, setuseracc] = useState([]);
  var [usermoneyp, setusermoneyp] = useState([]);
  var [userdata, setuserdata] = useState([]);
  var [userboard, setuserboard] = useState([]);
  var [usercomment, setusercomment] = useState([]);
  useEffect(() => {
    axios
      .get("http://localhost:4000/getuserdata", {
        headers: { token: token },
      })
      .then(({ data }) => setuserdata(data[0]));
  }, []);
  useEffect(() => {
    axios
      .get("http://localhost:4000/getuserboard", {
        headers: { token: token },
      })
      .then(({ data }) => setuserboard(data));
  }, []);
  useEffect(() => {
    axios
      .get("http://localhost:4000/getusercomment", {
        headers: { token: token },
      })
      .then(({ data }) => setusercomment(data));
  }, []);
  useEffect(() => {
    axios
      .get("http://localhost:4000/usermoneydata", {
        headers: { token: token },
      })
      .then(({ data }) => setusermoney(data[0]));
  }, []);
  useEffect(() => {
    axios
      .get("http://localhost:4000/usermoneypercent", {
        headers: { token: token },
      })
      .then(({ data }) => setusermoneyp(data[0]));
  }, []);
  useEffect(() => {
    axios
      .get("http://localhost:4000/getbankacc", {
        headers: { token: token },
      })
      .then(({ data }) => setuseracc(data));
  }, []);

  function addComma (data){
    if(data)
    return data.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',');
  }

  function printboard(list){
    let array=[];
    for(let i = 0; i < list.length; i++){
      array.push(
        <p>{list[i].title}</p>
      )
    }
    return array
  }
  function printcomment(list){
    let array=[];
    for(let i = 0; i < list.length; i++){
      array.push(
        <p>{list[i].text}</p>
      )
    }
    return array
  }
  
  function printusermoney(data,list){
    let array=[];
      if(list.총평가손익 > 0)
        array.push(
          <CardHeader style={{padding: "62px 0px 0px 12px",marginLeft:"47%",color:'red',fontSize: "20px", fontWeight: "800"}}>{addComma(data.총평가금액)}( {(list.총평가손익).toFixed(2)} %)</CardHeader>
        )
      else if(list.총평가손익 < 0)
        array.push(
          <CardHeader style={{padding: "62px 0px 0px 12px",marginLeft:"47%",color:'blue',fontSize: "20px", fontWeight: "800"}}>{addComma(data.총평가금액)}( {(list.총평가손익).toFixed(2)} %)</CardHeader>
        )
      else
        array.push(
          <CardHeader style={{padding: "62px 0px 0px 12px",marginLeft:"47%",fontSize: "20px", fontWeight: "800"}}>{addComma(data.총평가금액)}( {(list.총평가손익).toFixed(2)} %)</CardHeader>
        )
    return array
  }
  
  function selectOption(data){
    let array = [];
    for(let i = 0; i< data.length; i++){
      array.push(
        <option value={data[i].A_num}>{data[i].A_num}</option>
      )
    }
    return array
  }

  return (
    <Body style={{}}>
      <CardWrapper style={{display: "flex"}}>
      <div
        style={{
          flex: "3",
        }}
      >
        <div
          style={{
            width:"100%",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            flexDirection: "column",

          }}
        >
            <div 
            style={{
              display: "flex",
              width: "500px",
              height: "40px",
              paddingTop: "35px",
              justifyContent: "center",
              alignItems: "center",
            }}>
              <h2 style={{
                flex:"1",
                textAlign:"center",
              }}>계좌</h2>
            <select style={{flex:'4', height: "30px", paddingLeft: "5px", fontSize: "16px"}}>
              {selectOption(useracc)}
            </select>
            </div>
            
            <CardWrapper2>
              <div style={{display: "flex"}}>
              <CardHeader style={{padding: "52px 0px 0px 100px", fontSize: "25px", fontWeight: "800"}}>자산현황</CardHeader>
              {printusermoney(usermoney,usermoneyp)}
              </div>

              <div style={{width: "82%", margin: '20px 100px'}}>
              <div style={{borderStyle: "solid", borderWidth: "2px", borderRadius: '12px', borderColor: 'green', boxShadow: '0 0 20px rgba(0, 0, 0, 0.05), 0 0px 40px rgba(0, 0, 0, 0.08)', display: 'flex', padding: "4px"}}>  
                <div style={{marginTop: "40px",marginLeft:"45px"}}>총매입금액 :</div><div style={{marginLeft: "10px",marginTop :"42px"}}>{addComma(usermoney.총매입금액)}</div>
                <div style={{marginLeft: "80px",marginTop:"40px"}}>당일실현손익 : </div><div style={{marginLeft: "10px",marginTop :"42px"}}>{(usermoney.당일실현손익).toFixed(2)}%</div>
                <div style={{marginLeft: "80px",marginTop:"40px",marginBottom:"40px"}}>총평가금액 : </div><div style={{marginLeft: "10px",marginTop :"42px"}}>{addComma(usermoney.총평가금액)}</div>
                </div>
              </div>
            </CardWrapper2>
            
            <CardWrapper2>
              <div style={{display: "flex"}}>
                <CardHeader style={{padding: "10px 0px 0px 100px", fontSize: "25px", fontWeight: "800"}}>보유주식</CardHeader>
              </div>
              <Print></Print>  
            </CardWrapper2>

            <CardWrapper2>
              <div style={{display: "flex"}}>
                <CardHeader style={{padding: "10px 0px 0px 100px", fontSize: "25px", fontWeight: "800"}}>관심종목</CardHeader>
              </div>  
              <Printu/>
            </CardWrapper2>
            
           
          </div>
      </div>
      <div style={{
        flex:'1',
        marginRight: "30px",
      }}>

        <div
        style={{
          border:"2px solid #000",
          marginLeft: '20px',
          display: 'flex',
          marginTop: '20px',
        }}>
            <div 
              style={{
                marginLeft: "15px",
              }}
            >
              <h3>{userdata.name}</h3>
              <p>{userdata.email}</p>
              <p>{userdata.phone}</p>
            </div>
          <button
            style={{
              marginLeft : "30%",
              marginTop : "40%",
            }}
            onClick={()=>{
              navigate("/userdata");
            }}
          >수정</button>
        </div>
        <div
        style={{
          marginLeft: '30px',
          marginTop: '20px',
          display: 'flex',
        }}>
          <h3>내가 만든 토론</h3>
        </div>
        <div
        style={{
          border:"2px solid #000",
          marginLeft: '20px',
          height: "150px",
        }}>
            <div 
              style={{
                marginLeft: "15px",
              }}
            >
            {printboard(userboard)}
            </div>
        </div>
        <div
        style={{
          marginLeft: '30px',
          marginTop: '20px',
          display: 'flex',
        }}>
          <h3>내가 남긴 댓글</h3>
        </div>
        <div
        style={{
          border:"2px solid #000",
          marginLeft: '20px',
          height: "150px",
        }}>
            <div 
              style={{
                marginLeft: "15px",
              }}
            >
              {printcomment(usercomment)}
            </div>
        </div>

      </div>
        
      </CardWrapper>
    </Body>
  );
};

export default MyPage;
