import React, { useState, useEffect } from "react";
import styled from "styled-components";
import axios from "axios";
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


const Print = ({ history }) => {
    var [companyprint, setcompanyprint] = useState([]);
    var [stockprint, setstockprint] = useState([]);
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
    
    function returncompany(code){
        for(let i = 0; i < code.length(); i++){
            if(companyprint[i].code == code)
                return companyprint[i].company_name;
        }
    }
    function returnstock(code){
        for(let i = 0; i < code.length(); i++){
            if(stockprint[i].code == code)
                return stockprint[i].n_price;
        }
    }

}

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
          <Td>{Print.returncompany(list[i].code)}</Td>
          <Td>{Print.returnstock(list[i].code)}</Td>
        </Tr>
      )
    }
    return array
  }