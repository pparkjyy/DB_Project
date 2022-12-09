import React, { useState, useEffect } from "react";
import { useNavigate, useLocation } from "react-router-dom";

import { Link } from 'react-router-dom';
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
  CardButton
} from "../components/Card";
import styled from "styled-components";
import '../Dis.css'
import axios from "axios";
import { json } from "react-router";

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

const ViewDis = ({ history }) => {
  let navigate = useNavigate();

  return (
    <Body>
      <CardWrapper>
          <div className="View">
            <div className="top_title">
              <div id="title_txt">삼성전자 좋아</div>
              <div className="date_div">
                2022-12-10 03:20:43
              </div>
            </div>
            <div>
              <div className="content">삼전 오른다 ㄷㄷ삼전 오른다 ㄷㄷ삼전 오른다 ㄷㄷ삼전 오른다 ㄷㄷ삼전 오른다 ㄷㄷ삼전 오른다 ㄷㄷ삼전 오른다 ㄷㄷ삼전 오른다 ㄷㄷ삼전 오른다 ㄷㄷ삼전 오른다 ㄷㄷ삼전 오른다 ㄷㄷ삼전 오른다 ㄷㄷ삼전 오른다 ㄷㄷ삼전 오른다 ㄷㄷ삼전 오른다 ㄷㄷ삼전 오른다 ㄷㄷ삼전 오른다 ㄷㄷ삼전 오른다 ㄷㄷ삼전 오른다 ㄷㄷ삼전 오른다 ㄷㄷ삼전 오른다 ㄷㄷ삼전 오른다 ㄷㄷ삼전 오른다 ㄷㄷ삼전 오른다 ㄷㄷ삼전 오른다 ㄷㄷ삼전 오른다 ㄷㄷ삼전 오른다 ㄷㄷ삼전 오른다 ㄷㄷ</div>
            </div>
          </div>
          <div className="View">
            <div className="top_title" style={{display: "flex"}}>
              <CardButton style={{width: "50%", margin: "4px 60px"}} onClick={() => navigate(-1)}>목록</CardButton>
              <CardButton style={{width: "50%", margin: "4px 60px"}}>수정하기</CardButton>
            </div>
            <div>
              <div className="content" style={{margin: "0px 0px 40px 0px"}}>댓글 3</div>
              <div style={{display: "flex", margin: "0px 0px 40px 0px"}}>
              <CardInput placeholder="댓글을 입력해주세요"type="text"></CardInput>
              <CardButton style={{width: "10%", margin: "4px 60px"}}>작성</CardButton>
              </div>
              <div style={{margin: "28px 0px"}}>
              <div style={{margin: "8px 0px"}}>ekzm****</div>
              <div style={{margin: "8px 0px"}}>상장도 안한걸</div>
              <div style={{margin: "8px 0px"}}>2022-12-10 03:20:43</div>
              </div>
              <div style={{margin: "28px 0px"}}>
              <div style={{margin: "8px 0px"}}>ekzm****</div>
              <div style={{margin: "8px 0px"}}>상장도 안한걸</div>
              <div style={{margin: "8px 0px"}}>2022-12-10 03:20:43</div>
              </div>
              <div style={{margin: "28px 0px"}}>
              <div style={{margin: "8px 0px"}}>ekzm****</div>
              <div style={{margin: "8px 0px"}}>상장도 안한걸</div>
              <div style={{margin: "8px 0px"}}>2022-12-10 03:20:43</div>
              </div>
            </div>
          </div>
        <div style={{display: "flex"}}>
        <br></br>
        
        </div>
      </CardWrapper>
    </Body>
  );
};

export default ViewDis;