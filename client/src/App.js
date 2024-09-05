import './App.css';
import { useState, useEffect } from 'react';
import { Routes, Route } from 'react-router-dom';
import { getData, getDataByType } from './services/DataApi';
import Graph from './Components/Graph';
import DataTable from "./Components/TableAverageRate"
import Forecast from './Components/Forecast';
import  Matrix from './Components/Matrix';
import NavBar from "./Components/Navbar";
import NotFound from './Components/NotFound';


function App() {

  const [data, setData] = useState([]);
  const [maxData, setMaxData] = useState('');
  const [minData, setMinData] = useState('');

  useEffect(() => {
    getData().then((result) => {
      setData([...data, ...result.list]);
    }).catch((error) => {
      throw error;
    });
  }, []);

  useEffect(() => {
    getDataByType('min').then((result) => {
      setMinData(result.date);
    }).catch((error) => {
      throw error;
    });
  }, []);

  useEffect(() => {
    getDataByType('max').then((result) => {
      setMaxData(result.date);
    }).catch((error) => {
      throw error;
    });
  }, []);


  return (<>
      <NavBar />
      <Routes>
        <Route path="/" element={<Forecast data={data}/>} />
        <Route path="/graph" element={<Graph dataList={data}/>} />
        <Route path="/table" element={<DataTable rows={data} min={minData} max={maxData}/>} />
        <Route path="/matrix" element={<Matrix data={data}/>} />
        <Route path="*" element={<NotFound />} />
      </Routes>
    </>)
}

export default App;
