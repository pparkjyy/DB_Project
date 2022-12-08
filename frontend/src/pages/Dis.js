import React, { useState, useEffect } from "react";
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

const Dis = ({ history }) => {
  
  const [inputData, setInputData] = useState([{
    t_id: '',
    title: '',
    ID: '',
    num: ''
  }]);
  
  const [lastIdx, setLastIdx] = useState(0)

  useEffect(async() => {
    try {
      const res = await axios.get('http://localhost:4000/dis')
      const _inputData = await res.data.map((rowData) => (
        setLastIdx(lastIdx + 1),
        {
          t_id:rowData.t_id,
          title: rowData.title,
          ID: rowData.ID,
          num: rowData.num
        })
      )
      setInputData(inputData.concat(_inputData))
      console.log(_inputData)
    }
    catch(e){ console.error(e.message)}
  },[])

  return (
    <Body style={{}}>
      <CardWrapper> 
        <h1 style ={{marginLeft: "100px"}}> 토론게시판
          <button style ={{marginLeft: "30px" }}> 나도 참여하기 </button>
            <br />
            <br />
        </h1>
          <td>
            <th className="Dis_num">글 번호</th>
            <th className="Title">제목</th>
            <th className="ID">ID</th>
            <th className="View_num">조회수</th>
          </td>
          <td>
            {lastIdx !== 0 ?
                inputData.map(rowData => (
                  rowData.t_id !== '' &&
                  <tr>
                    <td className="listIdx">
                      <Link to={`/dis/${rowData.idx}`}>{rowData.t_id}</Link>
                    </td> 
                    <td className='listTitle'>
                      <Link to={`/dis/${rowData.idx}`}>{rowData.title}</Link>
                    </td>
                    <td className="listID">
                      {rowData.ID}
                    </td>
                    <td className="listNum">
                      {rowData.num}
                    </td>
                    <br /><br /><br />
                  </tr>
                )) :
                <tr>
                  <td>작성된 글이 없습니다.</td>
                </tr>
              }
          </td>

      </CardWrapper>
    </Body>
  );
};

export default Dis;