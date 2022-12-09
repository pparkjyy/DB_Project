import React, { useState, useEffect } from "react";
import styled from "styled-components";
import axios from "axios";
import { getInfoFromCookie, getTokenFromCookie } from "../components/Auth";
import { useNavigate } from "react-router";

const Tr = styled.tr`
  &:hover { background-color: #8FBC8F; cursor: pointer; }
`;
const TitleTr = styled.tr`
  border-bottom: 1px solid grey;
  background-color: #F0FFF0;
`;
const Td = styled.td`
  padding: 4px 20px;
  font-weight: 700;
`;
const Td2 = styled.td`
  padding: 4px 20px;
  font-weight: 500;
`;

export const Print = ({ list }) => {
    const token = getTokenFromCookie();
    const navigate = useNavigate();

    var [userstock, setuserstock] = useState([]);
    useEffect(() => {
      axios
        .get("http://localhost:4000/calculatestock", {
          headers: { token: token },
        })
        .then(({ data }) => setuserstock(data));
    }, []);

    function addComma (data){
      if(data)
      return data.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',');
    }

    function printUstock(list){
      let array = [];
      for(let i = 0; i< list.length; i++){
        array.push(
          <Tr onClick={()=>{
            navigate("/stockinfo", { state: { code: list[i].code } });
          }}>
            <Td2>{list[i].종목명}</Td2>
            <Td2>{addComma(list[i].현재가격)}</Td2>
            <Td2>{addComma(list[i].구매가격)}</Td2>
            <Td2>{(list[i].평가손익).toFixed(2)}%</Td2>
            <Td2>{addComma(list[i].전일대비)}</Td2>
            <Td2>{(list[i].전일대비비율).toFixed(2)}%</Td2>
          </Tr>
        )
      }
      return array
    }
    return(
      <div style={{width: "82%", margin: '20px 100px'}}>
        <div style={{borderStyle: "solid", borderWidth: "2px", borderRadius: '12px', borderColor: 'green', boxShadow: '0 0 20px rgba(0, 0, 0, 0.05), 0 0px 40px rgba(0, 0, 0, 0.08)', display: 'flex', padding: "4px"}}>  
          <table style={{ width: '95%', borderCollapse: 'collapse', margin: 'auto', textAlign: "center" }}>
            <TitleTr>
              <Td>종목명</Td>
              <Td>현재가격</Td>
              <Td>구매가격</Td>
              <Td>평가손익</Td>
              <Td>전일대비</Td>
              <Td>전일대비비율</Td>
            </TitleTr>
            {printUstock(userstock)}
            </table>
      </div></div> 
    );
}

export default Print;