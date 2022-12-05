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
import { ProductWrapper, PrintProducts, Title } from "../components/Product";
import axios from "axios";

const Body = styled.div`
  display: flex;
  align-items: "center";
  justify-content: "center";
  width: 100%;
`;

const Home = ({ history }) => {
  return (
    <Body style={{}}>
      <CardWrapper>
        <Title>메인 페이지</Title>
        
      </CardWrapper>
    </Body>
  );
};

export default Home;
