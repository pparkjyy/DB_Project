import React, { useState, useEffect } from "react";
import styled from "styled-components";
import axios from "axios";
import { getInfoFromCookie, getTokenFromCookie } from "../components/Auth";
import { useNavigate } from "react-router";
import { updateRecentStock } from "./clickStock";

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
    function printUstock(list){
      let array = [];
      for(let i = 0; i< list.length; i++){
        array.push(
          <Tr onClick={()=>{
            updateRecentStock(list[i].code);
            navigate("/stockinfo", { state: { code: list[i].code } });
          }}>
            <Td>{list[i].종목명}</Td>
            <Td>{list[i].현재가격}</Td>
            <Td>{list[i].구매가격}</Td>
            <Td>{list[i].평가손익}</Td>
            <Td>{list[i].전일대비}</Td>
            <Td>{list[i].전일대비비율}</Td>
          </Tr>
        )
      }
      return array
    }
    return(
      <table style={{ width: '80%', borderCollapse: 'collapse', margin: 'auto' }}>
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
    );
}

export default Print;