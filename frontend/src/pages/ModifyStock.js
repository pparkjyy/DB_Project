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

const code_check = async (code) => {
  const result = await CheckCode(code);
  console.log(result);
  return result;
};

const addstock = async (code, stock_name, stock_count, company_name, company_info, num, stock_owner, stock_num, stock_owner1, stock_num1, stock_owner2, stock_num2, stock_owner3, stock_num3, stock_owner4, stock_num4) => {
  if (code === "") {
    Swal.fire("종목추가에 실패했습니다.", "종목코드를 입력해주세요.", "error");
    return false;
  } else if (stock_name === "") {
    Swal.fire("종목추가에 실패했습니다.", "종목명을 입력해주세요.", "error");
    return false;
  } else if (stock_count === "") {
    Swal.fire("종목추가에 실패했습니다.", "상장주식수를 입력해주세요.", "error");
    return false;
  } else if (company_name === "") {
    Swal.fire("종목추가에 실패했습니다.", "기업명을 입력해주세요.", "error");
    return false;
  } else if (stock_owner === "") {
    Swal.fire("종목추가에 실패했습니다.", "주요주주를 입력해주세요.", "error");
    return false;
  } else if (stock_num === "") {
    Swal.fire("종목추가에 실패했습니다.", "보유주식 수를 입력해주세요.", "error");
    return false;
  } else if (company_info === "") {
    Swal.fire("종목추가에 실패했습니다.", "기업 개요를 입력해주세요.", "error");
    return false;
  } else if((stock_owner === "")||(stock_owner1 === "" && num>0)||(stock_owner2 === "" && num>1)||(stock_owner3 === "" && num>2)||(stock_owner4 === "" && num>3)){
    Swal.fire("종목추가에 실패했습니다.", "주주명을 입력해주세요.", "error");
    return false;
  }else if((stock_num === "")||(stock_num1 === "" && num>0)||(stock_num2 === "" && num>1)||(stock_num3 === "" && num>2)||(stock_num4 === "" && num>3)){
    Swal.fire("종목추가에 실패했습니다.", "보유주식수를 입력해주세요.", "error");
    return false;
  }
  else if((num==0 && Number(stock_num)>Number(stock_count))||
  (num==1 && Number(stock_num)+Number(stock_num1)>Number(stock_count))||
  (num==2 && Number(stock_num)+Number(stock_num1)+Number(stock_num2)>Number(stock_count))||
  (num==3 && Number(stock_num)+Number(stock_num1)+Number(stock_num2)+Number(stock_num3)>Number(stock_count))||
  (num==4 && Number(stock_num)+Number(stock_num1)+Number(stock_num2)+Number(stock_num3)+Number(stock_num4)>Number(stock_count))){
    Swal.fire("종목추가에 실패했습니다.", "주요주주의 주식수의 합이 상장 주식수 보다 많습니다.", "error");
    return false;
  }else if(!await code_check(code)){
    Swal.fire("종목추가에 실패했습니다.", "중복된 종목코드 입니다.", "error");
    return false;
  }
  const res = await axios.post("http://localhost:4000/addstock", {
    code: code,
    stock_name: stock_name,
    stock_count: stock_count,
    company_name: company_name,
    stock_owner: stock_owner,
    stock_num: stock_num,
    company_info: company_info,
    num : num,
    stock_owner : stock_owner, 
    stock_num : stock_num, 
    stock_owner1 : stock_owner1, 
    stock_num1 : stock_num1,
    stock_owner2 : stock_owner2,
    stock_num2 : stock_num2,
    stock_owner3 : stock_owner3,
    stock_num3 : stock_num3,
    stock_owner3 : stock_owner3,
    stock_num3 : stock_num3,
    stock_owner4 : stock_owner4,
    stock_num4 : stock_num4,
  });
  const { result, msg } = res.data;
  if (result === true) {
    Swal.fire("종목추가에 성공하였습니다.", msg, "success");
  } else {
    Swal.fire("종목추가에 실패했습니다.", msg, "error");
  }
  return result;
};

const ModifyStock = ({ history }) => {
  const navigateState = useLocation().state;
  const stockcode = navigateState && navigateState.code;
  const [code, setCode] = useState("");
  const [stock_name, setStockName] = useState("");
  const [stock_count, setStockCount] = useState("");
  const [company_name, setCompanyName] = useState("");
  const [stock_owner, setStockOwner] = useState("");
  const [stock_num, setStockNum] = useState("");
  const [stock_owner1, setStockOwner1] = useState("");
  const [stock_num1, setStockNum1] = useState("");
  const [stock_owner2, setStockOwner2] = useState("");
  const [stock_num2, setStockNum2] = useState("");
  const [stock_owner3, setStockOwner3] = useState("");
  const [stock_num3, setStockNum3] = useState("");
  const [stock_owner4, setStockOwner4] = useState("");
  const [stock_num4, setStockNum4] = useState("");
  const [company_info, setCompany_Info] = useState("");
  var [shareholderInfo, setShareholderInfo] = useState([]);
  var [companyInfo, setCompanyInfo] = useState([]);
  let navigate = useNavigate();
  const [plus, setPlus] = useState(0);

  useEffect((e) => {
    axios
      .get("http://localhost:4000/getCompanyInfo", {
        params: { stockcode: stockcode },
      })
      .then(({ data }) => setCompanyInfo(data[0]));
  }, []);
  useEffect((e) => {
    axios
      .get("http://localhost:4000/getShareholderInfo", {
        params: { stockcode: stockcode },
      })
      .then(({ data }) => setShareholderInfo(data));
  }, []);

  function printPlus(num){
    let array = [];
    for(let i=0;i<num;i++){
      array.push(
        <div style={{ marginLeft: "250px" ,marginBottom: "20px"}}>
              <InputText
                placeholder="주주명을 입력해주세요."
                style={{ height: "25px", width: "20%" }}
                onChange={(e) => {
                  if(i==0)setStockOwner1(e.target.value)
                  else if(i==1)setStockOwner2(e.target.value)
                  else if(i==2)setStockOwner3(e.target.value)
                  else if(i==3)setStockOwner4(e.target.value)
                }}
              />
              <InputText
                placeholder="보유주식수를 입력해주세요."
                style={{ height: "25px", width: "20%", marginLeft: '10px'}}
                type="number"
                onChange={(e) => {
                  if(i==0)setStockNum1(e.target.value)
                  else if(i==1)setStockNum2(e.target.value)
                  else if(i==2)setStockNum3(e.target.value)
                  else if(i==3)setStockNum4(e.target.value)
                }}
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
                onClick={()=>{setPlus(Number(plus)-1)}}
              >
                -
              </button>
            </div>
      )
    }
    return array;
  }

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
              defaultValue = {companyInfo.company_name}
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
            />
          </div>
        </SubTitle>

        <SubTitle>
          주요주주 및 주식수
          <div style={{ marginTop: "-28px" }}>
            <InputText
              placeholder="주주명을 입력해주세요."
              style={{ height: "25px", width: "20%" }}
              onChange={(e) => setStockOwner(e.target.value)}
            />
            <InputText
              placeholder="보유주식수를 입력해주세요."
              style={{ height: "25px", width: "20%", marginLeft: '10px'}}
              type="number"
              onChange={(e) => setStockNum(e.target.value)}
            />
            {plus<4?(
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
              onClick={(e)=>{setPlus(Number(plus)+1)}}
            >
              +
            </button>
            ):null}
          </div>
        </SubTitle>
        {printPlus(plus)}
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
                if (await addstock(code, stock_name, stock_count, company_name, company_info, plus, stock_owner, stock_num, stock_owner1, stock_num1, stock_owner2, stock_num2, stock_owner3, stock_num3, stock_owner4, stock_num4)) {
                  navigate("/");
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