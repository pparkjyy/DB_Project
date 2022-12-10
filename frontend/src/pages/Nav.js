import React, { useState, useEffect, useRef } from "react";
import {
  CardWrapper,
  CardHeader,
  CardHeading,
  CardFieldset,
  CardInput,
  CardTitle,
  CardSelect,
  CardSelectOption,
  CardLink,
  CardButton,
  CardButton2
} from "../components/Card";
import styled from "styled-components";
import { Link } from "react-router-dom";
import { useNavigate, withRouter } from "react-router";
import "../menu.css";
import { getInfoFromCookie, logout } from "../components/Auth";
import { FaHashtag } from "react-icons/fa"
import { searchStock } from "../components/searchStock";
import Swal from "sweetalert2";

const Body = styled.div`
  //position: fixed;
  width: 100%;
`;

export const CardBody = styled.div`
  padding-right: 20px;
  padding-left: 20px;
`;

const StyledLink = styled(Link)`
  text-decoration: none;
`;

const TitleWrapper = styled.div`
  display: flex;
  //flex-direction: horizontal;
  align-items: center;
  justify-content: center;
`;
const Sel = styled.div`
  display: flex;
  flex-direction: horizontal;
  align-items: center;
  background-color: #e5195f;
  padding-left: 32px;
  padding-right: 32px;
  padding-top: 8px;
  padding-bottom: 8px;
`;
const UnSel = styled.div`
  display: flex;
  flex-direction: horizontal;
  align-items: center;
  background-color: white;
  padding-left: 32px;
  padding-right: 32px;
  padding-top: 8px;
  padding-bottom: 8px;
`;

//홈페이지 로고, 통계, 마이페이지, 로그인
const Nav = ({ history }) => {
  const info = getInfoFromCookie();
  const navigate = useNavigate();
  const [page, setPage] = useState(window.location.pathname);
  const [searchWord, setSearchWord] = useState("");
  const onKeyPress = async (e) => {
    if (e.key === "Enter") {
      const result = await searchStock(searchWord);
      console.log(result);
      navigate("/search", { state: { search: searchWord, result: result } })
    }
  };

  
  

  let admin = false;
  if (info)
    if (info.token)
      admin = (info.token.type == 'admin')
  return (
    <Body>
      <CardWrapper
        style={{ paddingBottom: 15, overflow: "visible" }}
      >
        <CardHeader style={{ paddingTop: 12, paddingBottom: 12 }}>
          <TitleWrapper>
            <CardHeading
              style={{
                color: "#037a3b",
                paddingLeft: "20px",
                paddingTop: "4px",
                paddingRight: "20px",
                fontSize: "36px",
                cursor: "pointer",
              }}
              onClick={() => {
                navigate("/");
              }}
            >
              <div className="title">stockmarket</div>
              <div className="select" style={{marginTop: '-35px', height: '31px', width: '115px'}}><input type="radio" id="logo" name="navButton" />
                    <label for="logo">&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;</label></div>
            </CardHeading>
            <CardFieldset
              style={{
                paddingLeft: "20px",
                width: "400px",
              }}
            >
              <CardInput
                placeholder="검색어를 입력하세요"
                type="text"
                onChange={(e) => setSearchWord(e.target.value)}
                onKeyPress={onKeyPress}
              />
            </CardFieldset>
            {info ? (
              <TitleWrapper
                style={{
                  marginLeft: "130px",
                }}
              >
                {admin ? 
                <CardBody>관리자님 환영합니다!</CardBody> 
                : 
                <CardBody>{info.name} 님 환영합니다!</CardBody>
                }

                <CardBody>
                  <CardButton2
                    style={{ width: "90px" }}
                    type="button"
                    onClick={() => {
                      logout();
                      navigate("/");
                    }}
                  >
                    로그아웃
                  </CardButton2>
                </CardBody>                
              </TitleWrapper>
            ) : (
              <TitleWrapper
                style={{
                  marginLeft: "300px",
                }}
              >
                <CardBody>
                  <CardButton2
                    style={{ width: "120px" }}
                    type="button"
                    onClick={() => {
                      logout();
                      navigate("/login");
                    }}
                  >
                    로그인/회원가입
                  </CardButton2>
                </CardBody>
              </TitleWrapper>
            )}
          </TitleWrapper>
        </CardHeader>
        
        {admin ?
          <TitleWrapper
              style={{
                width: "700px",
                marginLeft: "-62px"
              }}
          >
            <CardBody className="select"
                style={{ cursor: "pointer" }}
                onClick={() => {
                    <div>{navigate("/")}</div>
                }}
              >
                <input type="radio" id="myshop" name="navButton" />
                    <label for="myshop">홈</label>
              </CardBody>

              
              <CardBody className="select"
                style={{ cursor: "pointer" }}
                onClick={() => {
                    <div>{navigate("/notice")}</div>
                }}
              >
                <input type="radio" id="notice" name="navButton" />
                    <label for="notice">공지사항</label>
              </CardBody>
              <CardBody className="select"
                style={{ cursor: "pointer" }}
                onClick={() => {
                  info ? (
                    <div>{navigate("/addstock")}</div>
                  ) : (
                    <div>
                      {Swal.fire(
                        "관리자 로그인이 필요합니다.",
                        "관리자 로그인 창으로 이동합니다."
                      )}
                      {navigate("/adminlogin")}
                    </div>
                  );
                }}
              >
                <input type="radio" id="pay" name="navButton" />
                    <label for="pay">종목추가</label>
              </CardBody>      
          </TitleWrapper>
          :
          <TitleWrapper
              style={{
                width: "700px",
                marginLeft: "-82px"
              }}
          >
            <CardBody className="select"
                style={{ cursor: "pointer" }}
                onClick={() => {
                    <div>{navigate("/")}</div>
                }}
              >
                <input type="radio" id="myshop" name="navButton" />
                    <label for="myshop">홈</label>
              </CardBody>

              <CardBody className="select"
                style={{ cursor: "pointer" }}
                onClick={() => {
                    <div>{navigate("/notice")}</div>
                }}
              >
                <input type="radio" id="notice" name="navButton" />
                    <label for="notice">공지사항</label>
              </CardBody>
              <CardBody className="select"
                style={{ cursor: "pointer" }}
                onClick={() => {
                  info ? (
                    <div>{navigate("mypage")}</div>
                  ) : (
                    <div>
                      {Swal.fire(
                        "로그인이 필요합니다.",
                        "로그인 창으로 이동합니다."
                      )}
                      {navigate("/login")}
                    </div>
                  );
                }}
              >
                <input type="radio" id="pay" name="navButton" />
                    <label for="pay">MY</label>
              </CardBody>      
          </TitleWrapper>
        }
      </CardWrapper>
    </Body>
  );
};

export default Nav;