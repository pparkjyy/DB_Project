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

const MyPage = ({ history }) => {
  
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
              <select style={{
                flex:'4',
              }}>
              <option>국민 234-2324-32423 홍길동</option>
              <option>--------123</option>
              <option>weqwe</option>
            </select>
            <button style={{flex:"1", marginLeft: "30px",}}>계좌연동</button>
            </div>
            
            <div
              style={{
                marginTop: '20px',
                width: "600px",
                height: "250px",
                border:"2px solid #000",
              }}
            >
              <div 
            style={{
              display: "flex",
              width: "700px",
              height: "40px",
              alignItems: "center",
            }}>
              <h4 style={{
                flex:"1",
                marginLeft: '10px'
              }}>추정자산</h4>
            <p style={{flex:"1", marginLeft: "20%",}}>10000000 ( 30 % )</p>
            </div>
            <div 
            style={{
              width: "600px",
              height: "50px",
              alignItems: "center",
              borderTop: "1px solid #000",
            }}>
            </div>
            <div 
            style={{
              display: "flex",
              width: "700px",
              height: "10px",
              alignItems: "center",
            }}>
              
            </div>
            
            </div>

            <div
              style={{
                marginTop: '30px',
                width: "600px",
                height: "250px",
                border:"2px solid #000",
              }}
            ></div>
            <div
              style={{
                marginTop: '30px',
                width: "600px",
                height: "250px",
                border:"2px solid #000",
              }}
            ></div>
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
