import * as React from 'react';
// import Stack from '@mui/material/Stack';
import { LineChart } from '@mui/x-charts/LineChart';

const data = [3.6, 3.5, 3.9,4.1,3.82];
const xData = ['January2023','February2023','March2023',"April2023","May2023","May2023"] ;

export default function Graph() {
  return (
    
      <LineChart
        xAxis={[{ data: xData, scaleType: 'point' }]}
        series={[{ data, showMark: false, area: true, connectNulls: true }]}
        height={200}
        margin={{ top: 10, bottom: 20 }}
      />
   
  );
}
