import React, { useState, useEffect } from "react";
import { useNavigate, useLocation, Link } from "react-router-dom";
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
import "../App.css";
import styled from "styled-components";
import axios from "axios";
import { getInfoFromCookie } from "../components/Auth";
import { updatedisView } from "../components/clickview";

export const Body = styled.div`
  display: flex;
  align-items: 'center';
  justify-content: 'center';
  width: 100%;
`;

export const Title = styled.div`
  padding-top: 48px;
  padding-bottom : 64px;
  text-align: center;
  font-size: 40px;
  font-weight: bold;
`;

export const CardButton = styled.button`
  display: block;
  width: 140px;
  height: 60px;
  margin-left: 60px;
  padding: 12px 0;
  font-family: inherit;
  font-size: 20px;
  font-weight: 700;
  color: white;
  background-color: #037a3b;
  border: 0;
  border-radius: 5px;
  box-shadow: 0 10px 10px rgba(0, 0, 0, 0.08);
  cursor: pointer;
  transition: all 0.25s cubic-bezier(0.02, 0.01, 0.47, 1);
  outline: 0;
  &:hover {
    box-shadow: 0 15px 15px rgba(0, 0, 0, 0.16);
    transform: translate(0, -5px);
  }
`;

function printList(data,navigate) {
  let array = [];
  if(data){
    for (let i = 0; i < data.length; i++) {
      array.push(
        <div className="list_grid list_data" 
          style={{cursor: 'pointer', marginTop:'4px'}}
          onClick={()=>{
            updatedisView(data[i].num,data[i].t_id);
            navigate("/viewdis/"+data[i].t_id,{state:{t_id : data[i].t_id}})}}>
          <div className="acenter"> {data[i].ID} </div>
          <div className="acenter"> {data[i].title} </div>
          <div className="acenter"> {data[i].num}</div>
          <div className="acenter"> {data[i].time.slice(0, 10).replace("T", " ")} </div>
          
        </div>
      )
    }
  }
  return array;
}

const info = getInfoFromCookie();

const Dis = ({ history }) => {
  let navigate = useNavigate();
  const navigateState = useLocation().state;
  const code = navigateState && navigateState.code;
  const [disData, setDisData] = useState([]);
  const [stockdata, setstockdata] = useState([]);
  useEffect(() => {
    axios
      .get("http://localhost:4000/dis", {
        params: { code: code },
      })
      .then(({ data }) => setDisData(data));
  }, []);
  useEffect(() => {
    axios
      .get("http://localhost:4000/getCompanyInfo", {
        params: { stockcode: code },
      })
      .then(({ data }) => setstockdata(data[0]));
  }, []);

  return (
    <Body>
      <CardWrapper>
        <Title>{stockdata.company_name} 토론게시판</Title>

        <div className="List">
          <div className="list_grid list_tit">
            <div className="acenter"> 번호 </div>
            <div className="acenter"> 제목 </div>
            <div className="acenter"> 조회수 </div>
            <div className="acenter"> 작성시간 </div>
          </div>
          {printList(disData,navigate)}

        </div>
        <CardButton onClick={() => navigate("/writedis",{state:{code : code}})}>
           글쓰기
        </CardButton>
        
      </CardWrapper>
    </Body>
  );
};

export default Dis;