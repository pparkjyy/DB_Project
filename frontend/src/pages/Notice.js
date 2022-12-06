import React, { useState, useEffect } from "react";
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
} from "../components/Card";
import styled from "styled-components";
import axios from "axios";

const Body = styled.div`
  display: flex;
  align-items: "center";
  justify-content: "center";
  width: 100%;
`;

const Notice = ({ history }) => {
  return (
    <Body style={{}}>
      <CardWrapper>
        <h1>공지사항</h1>
        
      </CardWrapper>
    </Body>
  );
};

export default Notice;
