import React, { useState, useEffect } from "react";
import { CardWrapper, CardHeading } from "../components/Card";
import styled from "styled-components";
import { useLocation } from "react-router";
import axios from "axios";

const Body = styled.div`
  display: flex;
  align-items: "center";
  justify-content: "center";
  width: 100%;
`;

const Search = ({ history }) => {
  return (
    <Body style={{}}>
      <CardWrapper>
        <h1>검색결과</h1>
        
      </CardWrapper>
    </Body>
  );
};

export default Search;