import React, { useState, useEffect } from "react";
import { useLocation, useNavigate } from "react-router";
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

const modifystock = async (code, stock_name, stock_count, company_name, company_info) => {
  if (stock_name === "") {
    Swal.fire("종목추가에 실패했습니다.", "종목명을 입력해주세요.", "error");
    return false;
  } else if (stock_count === "") {
    Swal.fire("종목추가에 실패했습니다.", "상장주식수를 입력해주세요.", "error");
    return false;
  } else if (company_name === "") {
    Swal.fire("종목추가에 실패했습니다.", "기업명을 입력해주세요.", "error");
    return false;
  }else if (company_info === "") {
    Swal.fire("종목추가에 실패했습니다.", "기업 개요를 입력해주세요.", "error");
    return false;
  }
  const res = await axios.post("http://localhost:4000/modifystock", {
    code: code,
    stock_name: stock_name,
    stock_count: stock_count,
    company_name: company_name,
    company_info: company_info,
  });
  const { result, msg } = res.data;
  if (result === true) {
    Swal.fire("종목수정에 성공하였습니다.", msg, "success");
  } else {
    Swal.fire("종목수정에 실패했습니다.", msg, "error");
  }
  return result;
};

const ModifyStock = ({ history }) => {
  const navigateState = useLocation().state;
  const stockcode = navigateState && navigateState.code;
  const [stock_name, setStockName] = useState("");
  const [stock_count, setStockCount] = useState("");
  const [company_name, setCompanyName] = useState("");
  const [company_info, setCompany_Info] = useState("");

  var [companyInfo, setCompanyInfo] = useState([]);
  var [stockInfo, setStockInfo] = useState([]);
  let navigate = useNavigate();

  useEffect((e) => {
    axios
      .get("http://localhost:4000/getStockInfo", {
        params: { stockcode: stockcode },
      })
      .then(({ data }) => {
        setStockInfo(data[0]);
        setStockName(data[0].stock_name);
      });
  }, []);
  useEffect((e) => {
    axios
      .get("http://localhost:4000/getCompanyInfo", {
        params: { stockcode: stockcode },
      })
      .then(({ data }) => {
        setCompanyInfo(data[0]);
        setStockCount(data[0].stock_count);
        setCompanyName(data[0].company_name);
        setCompany_Info(data[0].company_info);
      });
  }, []);
  

  return (
    <Body style={{}}>
      <CardWrapper>
      <Title>종목수정</Title>

        <SubTitle style={{display: "flex"}}>
          <div style={{paddingRight: "124px"}}>종목코드</div>
          <div style={{paddingTop: "4px"}}>{stockcode}</div>
        </SubTitle>
      
        <SubTitle>
          종목명
          <div style={{ marginTop: "-28px" }}>
            <InputText
              placeholder="종목 이름을 입력해주세요."
              style={{ height: "25px", width: "47%" }}
              onChange={(e) => setStockName(e.target.value)}
              defaultValue = {stockInfo.stock_name}
            />
          </div>
        </SubTitle>

        <SubTitle>
          상장주식수
          <div style={{ marginTop: "-28px" }}>
            <InputText
              placeholder="숫자만 입력해주세요."
              type="number"
              style={{ height: "25px", width: "47%" }}
              onChange={(e) => setStockCount(e.target.value)}
              defaultValue = {companyInfo.stock_count}
            />
          </div>
        </SubTitle>

        <SubTitle>
          기업이름
          <div style={{ marginTop: "-28px" }}>
            <InputText
              placeholder="기업 이름을 입력해주세요."
              style={{ height: "25px", width: "47%" }}
              onChange={(e) => setCompanyName(e.target.value)}
              defaultValue = {companyInfo.company_name}
            />
          </div>
        </SubTitle>

        
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
                onChange={(e) => setCompany_Info(e.target.value)}
                defaultValue = {companyInfo.company_info}
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
              onClick={async (e)=>{
                navigate(-1)
              }}
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
              onClick={async (e) => {
                if (await modifystock(stockcode, stock_name, stock_count, company_name, company_info)) {
                  navigate(-1);
                }
              }}
            >
              등록
            </button>
          </div>
        </div>        
      </CardWrapper>
    </Body>
  );
}

export default ModifyStock;