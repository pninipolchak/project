import * as React from 'react';
import Stack from '@mui/material/Stack';
import Paper from '@mui/material/Paper';
import { styled } from '@mui/material/styles';
import _ from 'lodash'

const DemoPaper = styled(Paper)(({ theme }) => ({
    width:500,
    height: 500,
    padding:'10%',
    textAlign: 'center',
    fontSize:'70px',
    backgroundColor:' inherit'
}));



export default function Forecast({ data }) {

    const getForecast = () => {
        let lastData = data.slice(-3);
        lastData=lastData.map(item=> parseFloat(item.average))
        let sum=_.sum(lastData)
        return sum;
    }

    return (
        <Stack padding='50px' direction="row" spacing={2}>
            <DemoPaper color='rgb(82, 135, 138)' square={false}>Forecast for the next month {getForecast()}</DemoPaper>
        </Stack>
    );
}
