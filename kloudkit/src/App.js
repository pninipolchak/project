import './App.css';
import Graph from './Graph';
// import { getData } from './DataApi';
import DataTable from "./Table"

function App() {

  return (<>
  <Graph/>
  <DataTable/>
  </>)
  // let data=getData()
  // return (<div>
  //   <h1>{data}</h1>
  // </div>)
}

export default App;
