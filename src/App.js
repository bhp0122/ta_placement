import React, { useState } from "react";
import FileInputs from "./components/FileInputs";
import LoadingBar from "./components/LoadingBar";
import Predeterminations from "./components/Predeterminations";
import StableMarriage from "./components/StableMarriage";

function App() {
  const [all_TAs, setAllTas] = useState([]);
  const [classList, setClassList] = useState([]);
  const [predet, setpredet] = useState(false);
  const [run_alg, setRunAlg] = useState(false);
  const [predeterminations, setPredeterminations] = useState([])
  const [progress, setProgress] = useState(0)


  return (
      <div>
        {!run_alg && <FileInputs all_TAs={all_TAs} setAllTas={setAllTas} classList={classList} setClassList={setClassList} setRunAlg={setpredet}/>}
        <div style={{ width:'100%'}}>
          <div style={{width:'12.5%', float:'left'}}><br></br></div>
          <div style={{ width:'75%', float:'left', marginTop:'30px'}}>
            {predet && <Predeterminations courses={classList} tas={all_TAs} setpredet={setpredet} setRunAlg={setRunAlg} setPredeterminations={setPredeterminations} />}
          </div> 
          
          <div>
            {run_alg && <StableMarriage setProgress={setProgress} courses={classList} tas={all_TAs} predeterminations={predeterminations}  />}
          </div>
          <div style={{width:'12.5%', float:'left'}}><br></br></div>
        </div>
      </div>
  );
}


export default App;






