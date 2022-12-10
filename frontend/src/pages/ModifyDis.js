import React, { useState, useEffect } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import { CardWrapper } from "../components/Card";
import { Title, SubTitle, InputText } from "./WriteNotice";
import styled from "styled-components";
import axios from "axios";
import Swal from "sweetalert2";

export const Body = styled.div`
  display: flex;
  align-items: "center";
  justify-content: "center";
  width: 100%;
`;

const modifydis = async (title, text, t_id) => {
  const res = await axios.post("http://localhost:4000/modifydis", {
    title: title,
    text: text,
    t_id: t_id,
  });
  if (res.data === true) {
    Swal.fire(
      "게시판 수정에 성공하였습니다.",
      "게시판 페이지로 이동합니다.",
      "success"
    );
    return true;
  } else {
    Swal.fire(
      "게시판 등록에 실패하였습니다.",
      "제목및 내용을 입력해주세요. ",
      "error"
    );
    return false;
  }
};

const ModifyDis = ({ history }) => {
  let navigate = useNavigate();
  const navigateState = useLocation().state;
  const t_id = navigateState && navigateState.t_id;
  var [title, setTitle] = useState([]);
  var [text, settext] = useState([]);
  var [code, setcode] = useState([]);
  const [disData, setdisData] = useState([]);

  useEffect(() => {
    axios
      .get("http://localhost:4000/getdisbytid", {
        params: { t_id : t_id },
      })
      .then(({ data }) => {
        setdisData(data);
        setTitle(data.title);
        settext(data.text);
        setcode(data.code);
      });
  }, []);

  return (
    <Body>
      <CardWrapper>
        <Title>토론게시판 수정</Title>

        <SubTitle>
          제목
          <div style={{ marginTop: "-28px" }}>
            <InputText
              placeholder="게시글 제목을 입력해주세요."
              style={{ height: "25px", width: "52%" }}
              defaultValue={disData.length ? disData[0].title : ""}
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
              defaultValue={disData.length ? disData[0].text : ""}
              onChange={(e) => settext(e.target.value)}
            />
          </div>
        </SubTitle>

        <hr />
        <div style={{ textAlign: "center" }}>
          <button
            type="reset"
            style={{
              margin: "16px",
              height: "50px",
              width: "120px",
              backgroundColor: "#c4c4c4",
              border: 0,
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
              width: "120px",
              backgroundColor: "#037a3b",
              color: "#fff",
              border: 0,
              borderRadius: "5px",
              boxShadow: 0,
            }}
            onClick={async (e) => {
              if (title === undefined) title = disData[0].title;
              if (text === undefined) text = disData[0].text;
              if (await modifydis(title, text, t_id)) {
                {navigate("/discuss/"+disData[0].code,{state:{code : disData[0].code}})}
              }
            }}
          >
            수정
          </button>
        </div>
      </CardWrapper>
    </Body>
  );
};

export default ModifyDis;
