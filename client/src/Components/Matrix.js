import {useState} from 'react';
import { Button } from "@mui/material";
import CollapsibleTable from './MatrixTables'

export default Matrix=({data})=>{
    const [isShow,setIsShow]=useState(false);
    const getAverageArr=()=>{
        let averageArr=[];
        for (let i = 0; i < data.length-1; i++) {
            averageArr.push(data[i].average)
        }
        return averageArr;
    }

    const getForecastArr=()=>{
        let forecastArr=[];
        let averageArr=getAverageArr();
        for (let i = 2; i < averageArr.length-1; i++) {
            let forecast=eval(`(${averageArr[i-2]}+${averageArr[i-1]}+${averageArr[i]})/3`);
            forecastArr.push(forecast) ;  
        }
        return forecastArr;
    }

    const getDiffArr=()=>{
        let diffArr=[];
        let forecastArr=getForecastArr();
        let averageArr=getAverageArr();
        for (let i = 2; i < averageArr.length-1; i++) {
            let difference=averageArr[i]-forecastArr[i];
            diffArr.push(difference);
        }
        return diffArr
    }
    
    const getMultiArr=()=>{
        let multiArr=[];
        let averageArr=getAverageArr();
        let diffArr=getDiffArr();
        for (let i = 2; i < averageArr.length-1; i++) {
            let multi=averageArr[i]*diffArr[i-2];
            multiArr.push(multi)
        }
        return multiArr;
    }

    const getAverageForecastArr=()=>{
        let diffArr=getDiffArr();
        let averageForecastArr=[];
        for (let i = 0; i < diffArr.length-1; i++) {
            let average=(diffArr[i]+diffArr[i+1]+diffArr[i+2])/3 
            averageForecastArr.push(average);
            i+=3;
        }
        return averageForecastArr;
    }

    const dataRows={
        dateArr:data.map(item=>item.date),
        averageArr:getAverageArr(),
        forecastArr:getForecastArr(),
        diffArr:getDiffArr(),
        multiArr:getMultiArr(),
        averageForecastArr:getAverageForecastArr(),
    }
    
    return (<>
    <Button onClick={()=>(setIsShow(!isShow))}>{isShow?'hide':'show'}</Button>
    {isShow&&<CollapsibleTable data={dataRows}/>}
    </>)
}
