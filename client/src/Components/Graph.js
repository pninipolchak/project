import * as React from 'react';
import { LineChart } from '@mui/x-charts/LineChart';


export default function Graph({dataList}) {
  const data=dataList.map(item => parseFloat(item.average));
  const xData=dataList.map(item => item.date); 
  return (
      <LineChart
        xAxis={[{ data: xData, scaleType: 'point' }]}
        series={[{ data, showMark: false, area: true, connectNulls: true }]}
        height={200}
        margin={{ top: 10, bottom: 20 }}
      />
  );
}
