import React, { useState, useEffect } from "react";
import styled from "styled-components";
import axios from "axios";
import { getInfoFromCookie, getTokenFromCookie } from "../components/Auth";
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
    var [companyprint, setcompanyprint] = useState([]);
    var [stockprint, setstockprint] = useState([]);
    var [userstock, setuserstock] = useState([]);
    var [calresult, setcalresult] = useState([]);
    useEffect(() => {
      axios
        .get("http://localhost:4000/allstockdata")
        .then(({ data }) => setcompanyprint(data));
    }, []);
    useEffect(() => {
      axios
        .get("http://localhost:4000/allstockprice")
        .then(({ data }) => setstockprint(data));
    }, []);
    useEffect(() => {
      axios
        .get("http://localhost:4000/getstockdata", {
          headers: { token: token },
        })
        .then(({ data }) => setuserstock(data));
    }, []);
    function returncompany(code){
        for(let i = 0; i < code.length; i++){
            if(companyprint[i].code == code)
                return companyprint[i].company_name;
        }
    }
    function returnstock(code){
        for(let i = 0; i < code.length; i++){
            if(stockprint[i].code == code)
                return stockprint[i].n_price;
        }
    }
    function printUstock(list){
      let array = [];
      for(let i = 0; i< list.length; i++){
        let num = ((list[i].stock_price - returnstock(list[i].code))/list[i].stock_price * 100).toFixed(2)
        array.push(
          <Tr>
            <Td>{returncompany(list[i].code)}</Td>
            <Td>{returnstock(list[i].code)}</Td>
            <Td>{list[i].stock_price}</Td>
            <Td>{num}</Td>
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
          </TitleTr>
          {printUstock(userstock)}
        </table> 
    );
}

export default Print;
/*
export function Printoption(list){
    let array = [];
    for(let i = 0; i < list.length; i++){
        array.push(
            <div>{list[i]}</div>
        )
    }
    return array
}

export function printUstock(list){
    let array = [];
    for(let i = 0; i< list.length; i++){
      array.push(
        <Tr>
          <Td>{returncompany(list[i].code)}</Td>
          <Td>{returnstock(list[i].code)}</Td>
        </Tr>
      )
    }
    return array
  }
  export default Print;
  */