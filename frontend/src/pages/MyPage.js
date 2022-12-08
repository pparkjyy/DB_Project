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
import { useNavigate } from "react-router";
import { Print } from "../components/print";
import { Printu } from "../components/printu";

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

const MyPage = ({ history }) => {
  const info = getInfoFromCookie();
  const token = getTokenFromCookie();
  const navigate = useNavigate();
  var [usermoney, setusermoney] = useState([]);
  var [useracc, setuseracc] = useState([]);
  var [usermoneyp, setusermoneyp] = useState([]);
  useEffect(() => {
    axios
      .get("http://localhost:4000/usermoneydata", {
        headers: { token: token },
      })
      .then(({ data }) => setusermoney(data));
  }, []);
  useEffect(() => {
    axios
      .get("http://localhost:4000/usermoneypercent", {
        headers: { token: token },
      })
      .then(({ data }) => setusermoneyp(data));
  }, []);
  useEffect(() => {
    axios
      .get("http://localhost:4000/getbankacc", {
        headers: { token: token },
      })
      .then(({ data }) => setuseracc(data));
  }, []);
  
  function printusermoney(data,list){
    let array=[];
    for(let i =0; i<data.length; i++){
      
      if(list[i].총평가손익 > 0)
        array.push(
          <CardHeader style={{padding: "62px 0px 0px 12px",marginLeft:"40%",color:'red',fontSize: "20px", fontWeight: "800"}}>{data[i].총평가금액}( {list[i].총평가손익} %)</CardHeader>
        )
      else if(list[i].총평가손익 < 0)
        array.push(
          <CardHeader style={{padding: "62px 0px 0px 12px",marginLeft:"40%",color:'blue',fontSize: "20px", fontWeight: "800"}}>{data[i].총평가금액}( {list[i].총평가손익} %)</CardHeader>
        )
      else
        array.push(
          <CardHeader style={{padding: "62px 0px 0px 12px",marginLeft:"40%",fontSize: "20px", fontWeight: "800"}}>{data[i].총평가금액}( {list[i].총평가손익} %)</CardHeader>
        )
        
    }
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
  function printmdata(data){
    
    <div style={{borderStyle: "solid", borderWidth: "3px", display: 'flex', padding: "4px"}}>              
    <div style={{marginTop: "40px",marginLeft:"40px"}}>총매입금액 :</div><div style={{marginLeft: "10px",marginTop :"42px"}}>{usermoney[0].총매입금액}</div>
    <div style={{marginLeft: "80px",marginTop:"40px"}}>당일실현손익 : </div><div style={{marginLeft: "10px",marginTop :"42px"}}>{usermoney[0].당일실현손익}</div>
    <div style={{marginLeft: "80px",marginTop:"40px",marginBottom:"40px"}}>총평가금액 : </div><div style={{marginLeft: "10px",marginTop :"42px"}}>{usermoney[0].총평가금액}</div>
    </div>
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
              justifyContent: "center",
              alignItems: "center",
            }}>
              <h3 style={{
                flex:"1",
                textAlign:"center",
              }}>계좌</h3>
            <select style={{flex:'4'}}>
              {selectOption(useracc)}
            </select>
            </div>
            <CardWrapper>
              <div style={{display: "flex"}}>
              <CardHeader style={{padding: "52px 0px 0px 100px", fontSize: "25px", fontWeight: "800"}}>자산현황</CardHeader>
              {printusermoney(usermoney,usermoneyp)}
              </div>
                    
              <div style={{width: "80%", margin: '20px 100px'}}>
              <div style={{borderStyle: "solid", borderWidth: "3px", display: 'flex', padding: "4px"}}>  
                <div style={{marginTop: "40px",marginLeft:"40px"}}>총매입금액 :</div><div style={{marginLeft: "10px",marginTop :"42px"}}>{usermoney[0].총매입금액}</div>
                <div style={{marginLeft: "80px",marginTop:"40px"}}>당일실현손익 : </div><div style={{marginLeft: "10px",marginTop :"42px"}}>{usermoney[0].당일실현손익}</div>
                <div style={{marginLeft: "80px",marginTop:"40px",marginBottom:"40px"}}>총평가금액 : </div><div style={{marginLeft: "10px",marginTop :"42px"}}>{usermoney[0].총평가금액}</div>
                </div>
              </div>
            </CardWrapper>
            
            <CardWrapper>
            <h2 style={{
                padding: "2%",
              }}>보유주식</h2>
              <Print></Print>  
            </CardWrapper>
            <CardWrapper>
            <h2 style={{
                padding: "2%",
              }}>관심종목</h2>
              <Printu/>
            </CardWrapper>
            
           
          </div>
      </div>
      <div style={{
        flex:'1',
        borderLeft : "1px solid #000",
        marginRight: "30px",
      }}>

        <div
        style={{
          border:"2px solid #11A729",
          marginLeft: '20px',
          display: 'flex',
          marginTop: '20px',
        }}>
            <div 
              style={{
                marginLeft: "15px",
              }}
            >
              <h3>주식왕박주식</h3>
              <p>abc@gmail.com</p>
              <p>132121221</p>
              <p>01012321131</p>
            </div>
          <button
            style={{
              marginLeft : "40%",
              marginTop : "50%",
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
          border:"2px solid #11A729",
          marginLeft: '20px',
          height: "150px",
        }}>
            <div 
              style={{
                marginLeft: "15px",
              }}
            >
              <p>대충 틀만잡은거</p>
              <p>ㅂㄷㅈㄱㅂㅈㄷㄱ</p>
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
          border:"2px solid #11A729",
          marginLeft: '20px',
          height: "150px",
        }}>
            <div 
              style={{
                marginLeft: "15px",
              }}
            >
              <p>틀틀틀니</p>
              <p>ㅁㄴㅇㄻㄴㅇㄹ</p>
            </div>
        </div>

      </div>
        
      </CardWrapper>
    </Body>
  );
};

export default MyPage;
