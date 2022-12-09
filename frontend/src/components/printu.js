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


export const Printu = ({ history }) => {
    const token = getTokenFromCookie();
    const navigate = useNavigate();

    var [favoritestock, setfavoritestock] = useState([]);
    useEffect(() => {
      axios
        .get("http://localhost:4000/favoritestock", {
          headers: { token: token },
        })
        .then(({ data }) => setfavoritestock(data));
    }, []);

    function printfstock(list){
      let array = [];
      for(let i = 0; i< list.length; i++){
        array.push(
          <Tr onClick={()=>{
            updateRecentStock(list[i].code);
            navigate("/stockinfo", { state: { code: list[i].code } });
          }}>
            <Td>{list[i].stock_name}</Td>
            <Td>{list[i].n_price}</Td>
            <Td>{list[i].전일대비비율}</Td>
            <Td>{list[i].price_count}</Td>
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
            <Td>등락률</Td>
            <Td>거래량</Td>
          </TitleTr>
          {printfstock(favoritestock)}
        </table> 
    );
}

export default Printu;