import React, { useState } from "react";
import AllClassesCSV from "./inputHandlers/AllClassesCSV";
import AllTAsCSV from "./inputHandlers/AllTAsCSV";
import InClassNeccCSV from "./inputHandlers/InClassNeccCSV";
import TAListCSV from "./inputHandlers/TAListCSV";
import CreateEligList from "./CreateEligList";
import StableMarriage from "./StableMarriage";

function FileInputs(props) {
/*  const [all_classes, setAllClasses] = useState([]);

  function handleAllClassesUpdate(updatedClasses) {
    setAllClasses(updatedClasses);
  }

  return (
    <Container>
      <AllClassesCSV />
      <InClassNeccCSV />
      <AllTAsCSV />
    </Container>
  );
}*/
  const [all_classes, setAllClasses] = useState([]);
  const [inClassNeccData, setInClassNeccData] = useState({});
  const [fileUploaded, setFileUploaded] = useState(false);
  const [fileUploaded2, setFileUploaded2] = useState(false);
  const [fileUploaded3, setFileUploaded3] = useState(false);
  const [fileUploaded4, setFileUploaded4] = useState(false);
  const [tas, setTAs] = useState([]);
  const [all_classes_attend, setAllClassesAttend] = useState([]);
  const {all_TAs, setAllTas, classList, setClassList, setRunAlg} = props;
  




  return (
        <div style={{ width:'100%', justifyContent: 'center' }}>
        <AllClassesCSV all_classes={all_classes} setAllClasses={setAllClasses} fileUploaded={fileUploaded} setFileUploaded={setFileUploaded} />
        {!fileUploaded &&
          <div class="max-w-sm rounded overflow-hidden shadow-lg input-card">
              <input
              class="block w-full min-w-0 flex-auto rounded border border-solid border-neutral-300 bg-clip-padding py-[0.32rem] px-3 text-base font-normal text-neutral-700 transition duration-300 ease-in-out file:-mx-3 file:-my-[0.32rem] file:overflow-hidden file:rounded-none file:border-0 file:border-solid file:border-inherit file:bg-neutral-100 file:px-3 file:py-[0.32rem]  file:transition file:duration-150 file:ease-in-out file:[margin-inline-end:0.75rem] file:[border-inline-end-width:1px] hover:file:bg-neutral-200  focus:text-neutral-700 focus:outline-none"
              type="file"
              id="formFile"
              accept=".csv" 
              disabled={true}  />
              <div style={{color:'gray'}} class="px-6 py-4">
                  <div class="font-bold text-xl mb-2">Required Attendance</div>
                  <p class="text-gray-700 text-base">
                  Upload Required Attendance file which contains the following columns:
                  </p>
              </div>
          </div>
        }
        {fileUploaded && <InClassNeccCSV all_classes_attend={all_classes_attend} setAllClassesAttend={setAllClassesAttend} all_classes={all_classes} fileUploaded2={fileUploaded2} setFileUploaded2={setFileUploaded2}/>} 
        {!fileUploaded2 && 
          <div class="max-w-sm rounded overflow-hidden shadow-lg input-card">
              <input
              class="block w-full min-w-0 flex-auto rounded border border-solid border-neutral-300 bg-clip-padding py-[0.32rem] px-3 text-base font-normal text-neutral-700 transition duration-300 ease-in-out file:-mx-3 file:-my-[0.32rem] file:overflow-hidden file:rounded-none file:border-0 file:border-solid file:border-inherit file:bg-neutral-100 file:px-3 file:py-[0.32rem]  file:transition file:duration-150 file:ease-in-out file:[margin-inline-end:0.75rem] file:[border-inline-end-width:1px] hover:file:bg-neutral-200  focus:text-neutral-700 focus:outline-none"
              type="file"
              id="formFile"
              accept=".csv" 
              disabled={true}  />

              <div style={{color:'gray'}} class="px-6 py-4">
                  <div class="font-bold text-xl mb-2">TA List</div>
                  <p class="text-gray-700 text-base">
                  Upload List of TAs and their Total TA Hours which contains the following columns:
                  </p>
              </div>
            </div>
          }
        {fileUploaded2 && <TAListCSV tas={tas} setTAs={setTAs} fileUploaded3={fileUploaded3} setFileUploaded3={setFileUploaded3} />}
        {!fileUploaded3 &&
          <div class="max-w-sm rounded overflow-hidden shadow-lg input-card">
            <input
            class="block w-full min-w-0 flex-auto rounded border border-solid border-neutral-300 bg-clip-padding py-[0.32rem] px-3 text-base font-normal text-neutral-700 transition duration-300 ease-in-out file:-mx-3 file:-my-[0.32rem] file:overflow-hidden file:rounded-none file:border-0 file:border-solid file:border-inherit file:bg-neutral-100 file:px-3 file:py-[0.32rem]  file:transition file:duration-150 file:ease-in-out file:[margin-inline-end:0.75rem] file:[border-inline-end-width:1px] hover:file:bg-neutral-200  focus:text-neutral-700 focus:outline-none"
            type="file"
            id="formFile"
            accept=".csv" 
            disabled={true}  />

            <div style={{color:'gray'}} class="px-6 py-4">
                <div class="font-bold text-xl mb-2">Student/TA Schedules and Enrollment</div>
                <p class="text-gray-700 text-base">
                Upload List of TAs enrollment history with their grades which contains the following columns:
                </p>
            </div>
          </div>
        }
        {fileUploaded3 && <AllTAsCSV setAllTas={setAllTas} tas={tas} fileUploaded4={fileUploaded4} setFileUploaded4={setFileUploaded4} />}
        {fileUploaded4 && <CreateEligList setRunAlg={setRunAlg} all_TAs={all_TAs} all_classes_attend={all_classes_attend} classList={classList} setClassList={setClassList} tas={tas}/>}
      </div>

  );
}


export default FileInputs;






