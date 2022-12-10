import { CardWrapper, CardHeading } from "../components/Card";
import styled from "styled-components";
import { useLocation } from "react-router";
import { useNavigate } from "react-router-dom";

export const Title = styled.div`
  padding-top: 48px;
  padding-bottom: 64px;
  padding-left: 64px;
  font-size: 40px;
  font-weight: bold;
`;

const Body = styled.div`
  display: flex;
  align-items: "center";
  justify-content: "center";
  width: 100%;
`;

const Tr = styled.tr`
  &:hover { background-color: #8FBC8F; cursor: pointer; }
`;
const TitleTr = styled.tr`
  border-bottom: 1px solid grey;
  background-color: #F0FFF0;
`;
const Td = styled.td`
  padding: 4px 20px;
  font-weight: 700;
`;
const Td2 = styled.td`
  padding: 4px 20px;
  font-weight: 500;
`;
function addComma (data){
  if(data)
  return data.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',');
}

function PrintStock(data,navigate) {  
  let array = [];
  for (let i = 0; i < data.length; i++) {
    array.push(
      <Tr onClick={()=>{
        navigate("/stockinfo", { state: { code: data[i].code } });
      }}>
        <Td2>{data[i].code}</Td2>
        <Td2>{addComma(data[i].stock_name)}</Td2>
        <Td2>{addComma(data[i].price_count)}</Td2>
        <Td2>{(data[i].e_price-data[i].n_price).toFixed(2)}%</Td2>
        <Td2>{((data[i].n_price-data[i].e_price)/data[i].e_price*100).toFixed(2)}%</Td2>
        <Td2>{(data[i].Changerate).toFixed(5)}</Td2>
      </Tr>
    )
  }
  return array;
}



const Search = ({ history }) => {
  const navigateState = useLocation().state;
  const search = navigateState && navigateState.search;
  const result = navigateState && navigateState.result;
  let navigate = useNavigate();
  
  return (
    <Body style={{}}>
      <CardWrapper>
        <Title>'{search}'에 대한 검색결과 입니다.</Title>
          {result.length
            ? <table style={{ margintop: '20%', width: '95%', borderCollapse: 'collapse', margin: 'auto', textAlign: "center" }}>
            <TitleTr>
              <Td>종목명</Td>
              <Td>현재가격</Td>
              <Td>구매가격</Td>
              <Td>전일대비</Td>
              <Td>전일대비비율</Td>
              <Td>현재변동률</Td>
            </TitleTr>
            {PrintStock(result,navigate)}
            </table>
            :<CardHeading style={{width: '100%'}}>"해당 검색어에 대한 게시물이 존재하지 않습니다."</CardHeading>
          }
      </CardWrapper>
    </Body>
  );
};

export default Search;
