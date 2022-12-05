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
} from "../components/Card";
import styled from "styled-components";
import { Link } from "react-router-dom";
import { useNavigate, withRouter } from "react-router";
import "../menu.css";
import { getInfoFromCookie, logout } from "../components/Auth";
import { FaHashtag } from "react-icons/fa"
import { searchPost } from "../components/searchPost";
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
      const result = await searchPost(searchWord);
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
        style={{ paddingTop: 0, paddingBottom: 0, overflow: "visible" }}
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
              <div className="title">로고</div>
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
              <TitleWrapper>
                {admin ? 
                <CardBody>관리자님 환영합니다!</CardBody> 
                : 
                <CardBody>{info.name} 님 환영합니다!</CardBody>
                }

                <CardBody className="select"
                  style={{ cursor: "pointer" }}
                  onClick={() => {
                    logout();
                    navigate("/");
                  }}
                >
                  <input type="radio" id="logout" name="navButton" />
                    <label for="logout">로그아웃</label>
                </CardBody>
                
              </TitleWrapper>
            ) : (
              <TitleWrapper>
                <CardBody className="select"
                  style={{ cursor: "pointer" }}
                  onClick={() => {
                    logout();
                    navigate("/login");
                  }}
                >
                  <input type="radio" id="login" name="navButton" />
                    <label for="login">로그인 / 회원가입</label>
                </CardBody>
              </TitleWrapper>
            )}
          </TitleWrapper>
        </CardHeader>
        
          <TitleWrapper
              style={{
                width: "600px",
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

            <TitleWrapper
              style={{
                width: "500px",
              }}
            >
              <CardBody className="select"
                style={{ cursor: "pointer" }}
                onClick={() => {
                
                    <div>{navigate("/stockinfo")}</div>
                
                }}
              >
                <input type="radio" id="stockinfo" name="navButton" />
                    <label for="stockinfo">투자정보</label>
              </CardBody>

              <CardBody className="select"
                style={{ cursor: "pointer" }}
                onClick={() => {
                    <div>{navigate("/news")}</div>
                }}
              >
                <input type="radio" id="news" name="navButton" />
                    <label for="news">뉴스</label>
              </CardBody>
              <CardBody className="select"
                style={{ cursor: "pointer" }}
                onClick={() => {
                  info ? (
                    <div>{navigate("/dis")}</div>
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
                <input type="radio" id="dis" name="navButton" />
                    <label for="dis">종목토론</label>
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
            

          </TitleWrapper>
        
      </CardWrapper>
    </Body>
  );
};

export default Nav;