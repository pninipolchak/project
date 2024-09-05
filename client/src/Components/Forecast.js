import * as React from 'react';
import Stack from '@mui/material/Stack';
import Paper from '@mui/material/Paper';
import { styled } from '@mui/material/styles';
import _ from 'lodash'

const DemoPaper = styled(Paper)(({ theme }) => ({
    width: 120,
    height: 120,
    padding: theme.spacing(2),
    ...theme.typography.body2,
    textAlign: 'center',
}));



export default function Forecast({ data }) {

    const getForecast = () => {
        let lastData = data.slice(-3);
        lastData=lastData.map(item=> parseFloat(item.average))
        let sum=_.sum(lastData)
        return sum;
    }

    return (
        <Stack direction="row" spacing={2}>
            <DemoPaper square={false}>Forecast:{getForecast()}</DemoPaper>
        </Stack>
    );
}
