import React, { useEffect, useState } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import { CardWrapper } from "../components/Card";
import "../App.css";
import styled from "styled-components";
import axios from "axios";
import { getInfoFromCookie } from "../components/Auth";
import Swal from "sweetalert2";
export const Body = styled.div`
  display: flex;
  width: 100%;
`;

export const CardButton = styled.button`
  float: right;
  display: block;
  width: 140px;
  height: 60px;
  margin-right: 60px;
  padding: 12px 0;
  font-family: inherit;
  font-size: 20px;
  font-weight: 700;
  color: white;
  background-color: #037a3b;
  border: 0;
  border-radius: 5px;
  box-shadow: 0 10px 10px rgba(0, 0, 0, 0.08);
  cursor: pointer;
  transition: all 0.25s cubic-bezier(0.02, 0.01, 0.47, 1);
  outline: 0;
  &:hover {
    box-shadow: 0 15px 15px rgba(0, 0, 0, 0.16);
    transform: translate(0, -5px);
  }
`;

const DeleteNot = async (postnum) => {
  const res = await axios.post("http://localhost:4000/deleteaboard", {
    postnum: postnum,
  });
  if (res.data === true) {
    Swal.fire(
      "게시글을 삭제하였습니다.",
      "게시글 페이지로 이동합니다.",
      "success"
    );
    return true;
  } else {
    Swal.fire(
      "게시글 삭제에 실패하였습니다.",
      "error"
    );
    return false;
  }
};



const ViewNotice = ({ history }) => {
  let navigate = useNavigate();
  const navigateState = useLocation().state;
  const postnum = navigateState && navigateState.postnum;
  const [noticeData, setNoticeData] = useState([]);
  

  useEffect(() => {
    axios
      .get("http://localhost:4000/getaboardpostnum", {
        params: { postnum: postnum },
      })
      .then(({ data }) => setNoticeData(data));
  }, []);
  const info = getInfoFromCookie();

  let admin = false;
  if (info) if (info.token) admin = info.token.type == "admin";

  return (
    <Body>
      <CardWrapper>
        {noticeData[0] ? (
          <div className="View">
            <div className="top_title">
              <div id="title_txt">{noticeData[0].title}</div>
              <div className="date_div">
                {noticeData[0].date.split("T")[0]}
              </div>
            </div>

            <div>
              <div className="content">{noticeData[0].text}</div>
            </div>
          </div>
        ) : null}
        {admin ? (
          <CardButton
            onClick={() =>
              navigate("/modifyNotice", {
                state: { postnum: postnum },
              })
            }
          >
            수정하기
          </CardButton>
        ) : null}
        {admin ? (
          <CardButton onClick={async (e) => {
            if (await DeleteNot(postnum)) {{navigate(-1)}}}}>삭제하기</CardButton>
        ) : null}

        <CardButton onClick={() => navigate(-1)}>목록</CardButton>
      </CardWrapper>
    </Body>
  );
};

export default ViewNotice;
