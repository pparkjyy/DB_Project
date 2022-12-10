import React, { useState, useEffect } from "react";
import { useNavigate,useLocation } from "react-router-dom";
import { getTokenFromCookie } from "../components/Auth";
import { CardWrapper } from "../components/Card";
import styled from "styled-components";
import axios from "axios";
import Swal from "sweetalert2";


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

export const Body = styled.div`
  display: flex;
  align-items: "center";
  justify-content: "center";
  width: 100%;
`;

const UploadDis = async (id, code, title, text) => {
  const res = await axios.post("http://localhost:4000/uploaddis", {
    id: id,
    code: code,  
    title: title,
    text: text,
    
  });
  if (res.data === true) {
    Swal.fire(
      "게시판 글 등록에 성공하였습니다.",
      "success"
    );
    return true;
  } else {
    Swal.fire(
      "게시판 글 등록에 실패하였습니다.",
      "제목및 내용을 입력해주세요. ",
      "error"
    );
    return false;
  }
};

const WriteDis = ({ history }) => {
  let navigate = useNavigate();
  const navigateState = useLocation().state;
  const code = navigateState && navigateState.code;
  var [title, setTitle] = useState([]);
  var [text, settext] = useState([]);
  const token = getTokenFromCookie();

  const [userid, setuserid] = useState([]);
  useEffect(() => {
    axios
      .get("http://localhost:4000/getuserdata", {
        headers: { token: token },
      })
      .then(({ data }) => setuserid(data[0]));
  }, []);

  return (
    <Body>
      <CardWrapper>
        <Title>게시판 글 등록</Title>

        <SubTitle>
          제목
          <div style={{ marginTop: "-28px" }}>
            <InputText
              placeholder="게시글 제목을 입력해주세요."
              style={{ height: "25px", width: "52%" }}
              onChange={(e) => setTitle(e.target.value)}
            />
          </div>
        </SubTitle>

        <SubTitle>
          내용
          <div style={{ marginTop: "-28px" }}>
            <textarea
              placeholder="게시글 내용을 입력해주세요."
              style={{
                height: "100px",
                width: "52%",
                marginLeft: "200px",
                paddingLeft: "10px",
                paddingTop: "10px",
              }}
              onChange={(e) => settext(e.target.value)}
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
              width: "100px",
              backgroundColor: "white",
              border: "1px solid green",
              borderRadius: "5px",
              boxShadow: 0,
            }}
            onClick={() => {
              navigate(-1);
            }}
          >
            취소
          </button>
          <button
            type="submit"
            style={{
              margin: "16px",
              height: "50px",
              width: "100px",
              backgroundColor: "green",
              color: "#fff",
              border: 0,
              borderRadius: "5px",
              boxShadow: 0,
            }}
            onClick={async (e) => {
              if (await UploadDis(userid.id, code, title, text)) {
                {navigate("/discuss/"+code,{state:{code : code}})}
              }
            }}
          >
            등록
          </button>
        </div>
      </CardWrapper>
    </Body>
  );
};

export default WriteDis;