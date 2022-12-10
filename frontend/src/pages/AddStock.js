import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
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
  CardButton2,
} from "../components/Card";
import styled from "styled-components";
import "../menu.css";
import { CheckCode } from "../components/Auth";
import Swal from "sweetalert2";
import axios from "axios";

const Body = styled.div`
  display: flex;
  align-items: "center";
  justify-content: "center";
  width: 100%;
`;
export const Title = styled.div`
  padding-top: 48px;
  padding-bottom: 64px;
  text-align: center;
  font-size: 40px;
  font-weight: bold;
`;
export const SubTitle = styled.div`
  padding-top: 20px;
  padding-bottom: 20px;
  padding-left: 250px;
  font-size: 20px;
  font-weight: bold;
`;
export const InputText = styled.input`
  margin-left: 200px;
  type: text;
  padding-left: 10px;
`;

// const code_check = async (code) => {
//   const result = await CheckCode(code);
//   console.log(result);
//   if (result === true) {
//     Swal.fire(
//       "해당 종목은 추가 가능 합니다.",
//       "계속 진행해 주세요.",
//       "success"
//     );
//   } else {
//     Swal.fire(
//       "해당 종목은 이미 존재합니다.",
//       "다른 종목을 추가해주세요.",
//       "error"
//     );
//   }

//   return result;
// };

// const addstock = async (code, stock_name, stock_count, company_name, company_info) => {
//   if (code === "") {
//     Swal.fire("종목추가에 실패했습니다.", "종목코드를 입력해주세요.", "error");
//     return false;
//   } else if (stock_name === "") {
//     Swal.fire("종목추가에 실패했습니다.", "종목명을 입력해주세요.", "error");
//     return false;
//   } else if (stock_count === "") {
//     Swal.fire("종목추가에 실패했습니다.", "상장주식수를 입력해주세요.", "error");
//     return false;
//   } else if (company_name === "") {
//     Swal.fire("종목추가에 실패했습니다.", "기업명을 입력해주세요.", "error");
//     return false;
//   } else if (stock_owner === "") {
//     Swal.fire("종목추가에 실패했습니다.", "주요주주를 입력해주세요.", "error");
//     return false;
//   } else if (stock_num === "") {
//     Swal.fire("종목추가에 실패했습니다.", "보유주식 수를 입력해주세요.", "error");
//     return false;
//   } else if (company_info === "") {
//     Swal.fire("종목추가에 실패했습니다.", "기업 개요를 입력해주세요.", "error");
//     return false;
//   } 
//   const res = await axios.post("http://localhost:4000/addstock", {
//     code: code,
//     stock_name: stock_name,
//     stock_count: stock_count,
//     company_name: company_name,
//     stock_owner: stock_owner,
//     stock_num: stock_num,
//     company_info: company_info
//   });
//   const { result, msg } = res.data;
//   if (result === true) {
//     Swal.fire("종목추가에 성공하였습니다.", msg, "success");
//   } else {
//     Swal.fire("종목추가에 실패했습니다.", msg, "error");
//   }
//   return result;
// };

const AddStock = ({ history }) => {
  // const [code, setCode] = useState("");
  // const [stock_name, setStockName] = useState("");
  // const [stock_count, setStockCount] = useState("");
  // const [company_name, setCompanyName] = useState("");
  // const [stock_owner, setStockOwner] = useState("");
  // const [stock_num, setStockNum] = useState("");
  // const [company_info, setCompanyInfo] = useState("");
  // let navigate = useNavigate();
  var [plus, setPlus] = useState(true);

  return (
    <Body style={{}}>
      <CardWrapper>
      <Title>종목추가</Title>

        <SubTitle>
          종목코드
          <div style={{ marginTop: "-28px" }}>
            <InputText
              placeholder="종목 코드를 입력해주세요."
              style={{ height: "25px", width: "38%" }}
              // onChange={(e) => setCode(e.target.value)}
            />
            <button 
              type="button"
              style={{
                marginLeft: '5px',
                height: "30px",
                width: "90px",
                backgroundColor: "green",
                border: 0,
                borderRadius: "3px",
                boxShadow: 0,
                color: 'white',
              }}
              // onClick={async (e) => {
              //   console.log("code: ", code);
              //   if (await code_check(code)) {
              //   }
              // }}
            >
              중복확인
            </button>
          </div>
        </SubTitle>

        <SubTitle>
          종목명
          <div style={{ marginTop: "-28px" }}>
            <InputText
              placeholder="종목 이름을 입력해주세요."
              style={{ height: "25px", width: "47%" }}
              // onChange={(e) => setStockName(e.target.value)}
            />
          </div>
        </SubTitle>

        <SubTitle>
          상장주식수
          <div style={{ marginTop: "-28px" }}>
            <InputText
              placeholder="숫자만 입력해주세요."
              style={{ height: "25px", width: "47%" }}
              // onChange={(e) => setStockCount(e.target.value)}
            />
          </div>
        </SubTitle>

        <SubTitle>
          기업이름
          <div style={{ marginTop: "-28px" }}>
            <InputText
              placeholder="기업 이름을 입력해주세요."
              style={{ height: "25px", width: "47%" }}
              // onChange={(e) => setCompanyName(e.target.value)}
            />
          </div>
        </SubTitle>

        <SubTitle>
          주요주주 및 주식수
          <div style={{ marginTop: "-28px" }}>
            <InputText
              placeholder="주주명을 입력해주세요."
              style={{ height: "25px", width: "20%" }}
              // onChange={(e) => setTitle(e.target.value)}
            />
            <InputText
              placeholder="보유주식수를 입력해주세요."
              style={{ height: "25px", width: "20%", marginLeft: '10px'}}
              // onChange={(e) => setTitle(e.target.value)}
            />
            <button 
              type="button"
              style={{
                marginLeft: '10px',
                height: "30px",
                width: "38px",
                backgroundColor: "green",
                border: 0,
                borderRadius: "3px",
                boxShadow: 0,
                color: 'white',
                fontSize: '17px',
                fontWeight: 'bold'
              }}
              onClick={()=>{setPlus(!plus)}}
            >
              +
            </button>
          </div>
        </SubTitle>
        {plus ? (
          <div>
            <SubTitle>
            기업소개
            <div style={{ marginTop: "-28px" }}>
              <textarea
                placeholder="기업 개요를 입력해주세요."
                style={{
                  height: "100px",
                  width: "47%",
                  marginLeft: "200px",
                  paddingLeft: "10px",
                  paddingTop: "10px",
                }}
                // onChange={(e) => setCompanyInfo(e.target.value)}
              />
            </div>
          </SubTitle>
          
          <hr />
          <div style={{ textAlign: "center", marginLeft: "105px", marginTop: "20px" }}>
            <button
              type="reset"
              style={{
                margin: "16px",
                height: "50px",
                width: "235px",
                backgroundColor: "white",
                border: "1px solid green",
                borderRadius: "5px",
                boxShadow: 0,
              }}
              // onClick={async (e)=>{
              //   navigate(-1)
              // }}
            >
              취소
            </button>
            <button
              type="submit"
              style={{
                margin: "16px",
                height: "50px",
                width: "235px",
                backgroundColor: "green",
                color: "white",
                border: 0,
                borderRadius: "5px",
                boxShadow: 0,
              }}
              // onClick={async (e) => {
              //   if (await addstock(code, stock_name, stock_count, company_name, company_info)) {
              //     navigate("/");
              //   }
              // }}
            >
              등록
            </button>
          </div>
        </div>
        )
        : 
        (
          <div>
            <div style={{ marginLeft: "250px" }}>
              <InputText
                placeholder="주주명을 입력해주세요."
                style={{ height: "25px", width: "20%" }}
                // onChange={(e) => setTitle(e.target.value)}
              />
              <InputText
                placeholder="보유주식수를 입력해주세요."
                style={{ height: "25px", width: "20%", marginLeft: '10px'}}
                // onChange={(e) => setTitle(e.target.value)}
              />
              <button 
                type="button"
                style={{
                  marginLeft: '10px',
                  height: "30px",
                  width: "38px",
                  backgroundColor: "red",
                  border: 0,
                  borderRadius: "3px",
                  boxShadow: 0,
                  color: 'white',
                  fontSize: '17px',
                  fontWeight: 'bold'
                }}
                onClick={()=>{setPlus(!plus)}}
              >
                -
              </button>
            </div>
            <SubTitle>
            기업소개
            <div style={{ marginTop: "-28px" }}>
              <textarea
                placeholder="기업 개요를 입력해주세요."
                style={{
                  height: "100px",
                  width: "47%",
                  marginLeft: "200px",
                  paddingLeft: "10px",
                  paddingTop: "10px",
                }}
                // onChange={(e) => setCompanyInfo(e.target.value)}
              />
            </div>
            </SubTitle>
            
            <hr />
            <div style={{ textAlign: "center", marginLeft: "105px", marginTop: "20px" }}>
              <button
                type="reset"
                style={{
                  margin: "16px",
                  height: "50px",
                  width: "235px",
                  backgroundColor: "white",
                  border: "1px solid green",
                  borderRadius: "5px",
                  boxShadow: 0,
                }}
                // onClick={async (e)=>{
                //   navigate(-1)
                // }}
              >
                취소
              </button>
              <button
                type="submit"
                style={{
                  margin: "16px",
                  height: "50px",
                  width: "235px",
                  backgroundColor: "green",
                  color: "white",
                  border: 0,
                  borderRadius: "5px",
                  boxShadow: 0,
                }}
                // onClick={async (e) => {
                //   if (await addstock(code, stock_name, stock_count, company_name, company_info)) {
                //     navigate("/");
                //   }
                // }}
              >
                등록
              </button>
            </div>
          </div>
        )}
        
      </CardWrapper>
    </Body>
  );
}

export default AddStock;