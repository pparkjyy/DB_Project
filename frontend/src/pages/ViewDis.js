import React, { useEffect, useState } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import { CardWrapper } from "../components/Card";
import "../App.css";
import styled from "styled-components";
import axios from "axios";
import { getInfoFromCookie,getTokenFromCookie } from "../components/Auth";
import { Title, SubTitle, InputText } from "./WriteNotice";
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
const Uploadcomment = async (id,t_id, text) => {
  const res = await axios.post("http://localhost:4000/uploadcomment", {
    id : id,
    t_id : t_id,
    text : text,
    
  });
  if (res.data === true) {
    Swal.fire(
      "댓글 등록에 성공하였습니다.",
      "success"
    );
    return true;
  } else {
    Swal.fire(
      "댓글 등록에 실패하였습니다.",
      "내용을 입력해주세요. ",
      "error"
    );
    return false;
  }
};

function printcomment(data) {
  let array = [];
  if(data){
    for (let i = 0; i < data.length; i++) {
      array.push(
        <div className="comment_grid comment_data" 
          style={{cursor: 'pointer', marginTop:'4px', marginLeft: "-14px"}}>
          <div className="comment_aleft"> {data[i].text} </div>
          <div className="acenter"> {data[i].ID} </div>
          <div className="comment_acenter"> {data[i].time.slice(2, 16).replace("T", " ")} </div>
          
        </div>
      )
    }
  }
  return array;
}

const Deletedis = async (t_id) => {
  const res = await axios.post("http://localhost:4000/deletecom", {
    t_id: t_id,
  });
  if (res.data === true) {
        const ress = await axios.post("http://localhost:4000/deletedis", {
        t_id: t_id,
      });
      if (ress.data === true) {
        Swal.fire(
          "게시글 삭제에 성공하였습니다.",
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
  } else {
    Swal.fire(
      "게시 글 삭제에 실패하였습니다.",
      "error"
    );
    return false;
  }
};



const ViewDis = ({ history }) => {
  let navigate = useNavigate();
  const navigateState = useLocation().state;
  const t_id = navigateState && navigateState.t_id;
  const [disData, setdisData] = useState([]);
  const [comment, setcomment] = useState([]);
  const [ncomment, setncomment] = useState([]);
  
  useEffect(() => {
    axios
      .get("http://localhost:4000/getcommentbytid", {
        params: { t_id: t_id },
      })
      .then(({ data }) => setcomment(data));
  }, []);

  useEffect(() => {
    axios
      .get("http://localhost:4000/viewdisbytid", {
        params: { t_id: t_id },
      })
      .then(({ data }) => setdisData(data));
  }, []);
  const info = getInfoFromCookie();
  const token = getTokenFromCookie();

  let admin = false;
  if (info) if (info.token) admin = info.token.type == "admin";

  const [checkuser, setcheckuser] = useState([]);
  
  useEffect(() => {
    axios
      .get("http://localhost:4000/checkuser", {
        headers: { token: token },
        params: { t_id: t_id },
      })
      .then(({ data }) => setcheckuser(data));
  }, []);
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
        {disData[0] ? (
          <div className="View">
            <div className="top_title">
              <div id="title_txt">{disData[0].title}</div>
              <div className="date_div">
                {disData[0].ID} |{" "}
                {disData[0].time.slice(0, 19).replace("T", " ")}
              </div>
            </div>
            <div>
              <div className="content">{disData[0].text}</div>
            </div>
            
            <SubTitle style={{ borderTop: "solid 1px #ababab", borderBottom: "solid 1px #ababab", marginTop: "30%" }}>
              댓글
              <div style={{ marginTop: "-28px" }}>
                <textarea
                  placeholder="댓글 내용을 입력해주세요."
                  style={{
                    height: "50px",
                    width: "65%",
                    marginLeft: "60px",
                    paddingLeft: "10px",
                  }}
                  onChange={(e) => setncomment(e.target.value)}
                />
              </div>
            </SubTitle>
            <div style={{ textAlign: "right", marginTop:"-90px" }}>
              <button
                type="submit"
                style={{
                  margin: "12px 160px 0px 0px",
                  height: "50px",
                  width: "70px",
                  backgroundColor: "green",
                  color: "white",
                  border: 0,
                  borderRadius: "5px",
                  boxShadow: 0,
                }}
                onClick={async (e) => {
                  if (await Uploadcomment(userid.id, t_id,ncomment)) {
                    window.location.replace("/viewdis/"+t_id,{state:{t_id : t_id}})
                  }
                }}
              >
              등록
              </button>
            </div>
            <div className="Comment">
              {printcomment(comment)}
            </div>
          </div>
        ) : null}
        {checkuser ? (
          <CardButton
          onClick={() =>
            navigate("/modifydis", {
              state: { t_id : t_id },
            })
          }
          >
          수정하기
          </CardButton>
        ) : null}
        {checkuser ? (
          <CardButton onClick={async (e) => {
            if (await Deletedis(t_id)) {
              {navigate("/discuss/"+disData[0].code,{state:{code : disData[0].code}})}
            }
          }}>삭제하기</CardButton>
        ) : null}

        <CardButton onClick={() => navigate(-1)}>목록</CardButton>
      </CardWrapper>
    </Body>
  );
};

export default ViewDis;
