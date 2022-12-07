import React, { useState, useEffect } from "react";
import Chart from '../components/chart';
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
  ChartWrapper,
} from "../components/Card";
import styled, { ThemeConsumer } from "styled-components";
import axios from "axios";

const Body = styled.div`
  display: flex;
  align-items: "center";
  justify-content: "center";
  width: 100%;
  height:100vh;
`;

const Stockinfo = ({history}) => {
  return (
    <Body style={{}}>
      <CardWrapper>
        <h1>예시 삼전</h1>
        <ChartWrapper>
          <Chart />
        </ChartWrapper>
        

      </CardWrapper>
      
    </Body>
  );
};

export default Stockinfo;