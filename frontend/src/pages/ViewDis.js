import React, { useEffect, useState } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import { CardWrapper } from "../components/Card";
import "../App.css";
import styled from "styled-components";
import axios from "axios";
import { getInfoFromCookie,getTokenFromCookie } from "../components/Auth";
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


const ViewDis = ({ history }) => {
  let navigate = useNavigate();
  const navigateState = useLocation().state;
  const t_id = navigateState && navigateState.t_id;
  const [disData, setdisData] = useState([]);
  

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

  return (
    <Body>
      <CardWrapper>
        {disData[0] ? (
          <div className="View">
            <div className="top_title">
              <div id="title_txt">{disData[0].title}</div>
              <div className="date_div">
                {disData[0].time.slice(0, 19).replace("T", " ")}
              </div>
            </div>
            <div>
              <div className="content">{disData[0].text}</div>
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

        <CardButton onClick={() => navigate(-1)}>목록</CardButton>
      </CardWrapper>
    </Body>
  );
};

export default ViewDis;
