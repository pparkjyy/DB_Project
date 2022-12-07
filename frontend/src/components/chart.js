import React, { useState,useEffect } from 'react';
import styled from 'styled-components';
import axios from "axios";

import {
	ResponsiveContainer,
	ComposedChart,
	Line,
	Bar,
	XAxis,
	YAxis,
	CartesianGrid,
	Tooltip,
	Legend,
} from 'recharts';


const Chart = ({history}) => {
    const [usageStatus, setUsageStatus] = useState([]);
  
    useEffect(() => {
      axios.get('../DATA/000270,2021.json')
        .then((res) => {
        const dataTemp = res.data&&res.data.map((data) => {
          return {
            date: data.Date,
            '가격(원)': data.Close,
            '거래량': data.Volume,
          };
        });
        setUsageStatus(dataTemp);
      });
    }, [history]);

    
    return (
        <ResponsiveContainer>
          <ComposedChart
            width={600}
            height={400}
            data={usageStatus}
            margin={{ top: 40, right: 40, bottom: 30, left: 40 }}
          >
            <CartesianGrid stroke="#f5f5f5" />
            <XAxis dataKey="date" />
            <YAxis yAxisId="left" />
            <YAxis yAxisId="right" orientation="right" />
            <Tooltip />
            <Legend />
            <Bar yAxisId="right" dataKey="거래량" barSize={30} fill="#7ac4c0" />
            <Line yAxisId="left" type="monotone" dataKey="가격(원)" stroke="#ff7300" />
          </ComposedChart>
        </ResponsiveContainer>
      );
    };
  
export default Chart;