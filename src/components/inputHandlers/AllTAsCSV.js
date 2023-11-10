import React, { useState } from "react";
import CreateEligList from "../CreateEligList";
import '../AllClassesCSV.css';

function AllTAsCSV(props) {

    const [showHelp, setShowHelp] = useState(false);
    const [showBubble, setShowBubble] = useState(false);

    const { setAllTas, tas, fileUploaded4, setFileUploaded4 } = props;

    // console.log(tas)

    //console.log(all_classes_attend);

    function handleAllTAsUpload(event) {
        const file = event.target.files[0];
        const reader = new FileReader();
        reader.onload = handleAllTAsFileRead;
        reader.readAsText(file);
      }
    
      // This function processes the contents of the CSV file
      function handleAllTAsFileRead(event) {
        const content = event.target.result;
        const rows = content.split("\n"); // Split the CSV into rows
        const headers = rows[0].split(","); // Get the column headers from the first row

        //input validation
        const requiredHeaders = [
            "uuid",
            "Last_Name",
            "First_Name",
            "Course_Number",
            "Grade",
            "Title",
            "Days",
            "Start_Time",
            "Stop_Time",
          ];
          
          // Check if the CSV file contains all of the required headers
          const missingHeaders = requiredHeaders.filter((header) => !headers.includes(header));
          if (missingHeaders.length > 0) {
            // Display an error message if the CSV file is missing required columns
            alert(`The uploaded CSV file is missing the following required columns: ${missingHeaders.join(", ")}`);
            return;
          }


        const uuidIndex = headers.indexOf("uuid");
        const lastNameIndex = headers.indexOf("Last_Name");
        const firstNameIndex = headers.indexOf("First_Name");
        const courseNumberIndex = headers.indexOf("Course_Number");
        const gradeIndex = headers.indexOf("Grade");
        const titleIndex = headers.indexOf("Title");
        const daysIndex = headers.indexOf("Days");
        const startTimeIndex = headers.indexOf("Start_Time");
        const stopTimeIndex = headers.indexOf("Stop_Time");
        const semester = headers.indexOf("Semester");
        const year = headers.indexOf("Year");
        const crnIndex = headers.indexOf("CRN\r");
        const extractedTAs = [];
    
        // Loop through each row and extract the desired columns
        for (let i = 1; i < rows.length; i++) {
          const row = rows[i].split(",");
          const rowData = {
            uuid: row[uuidIndex],
            lastName: row[lastNameIndex],
            firstName: row[firstNameIndex],
            courseNumber: row[courseNumberIndex],
            grade: row[gradeIndex],
            title: row[titleIndex],
            days: row[daysIndex],
            startTime: row[startTimeIndex],
            stopTime: row[stopTimeIndex],
            semester: row[semester],
            year: row[year],
            CRN: row[crnIndex],
          };
          let existingRow = extractedTAs.find((r) => {
            return (
              r.uuid === rowData.uuid &&
              r.lastName === rowData.lastName &&
              r.firstName === rowData.firstName
            );
          });
    
         
          if (existingRow) {
            // If a row already exists with the same first three columns, add the 4th-9th columns to it
            existingRow.courses.push({
              courseNumber: rowData.courseNumber,
              grade: rowData.grade,
              title: rowData.title,
              days: rowData.days,
              startTime: rowData.startTime,
              stopTime: rowData.stopTime,
              semester: rowData.semester,
              year: rowData.year,
              CRN: rowData.CRN.replace(/[\r]/gm, ''),
            });
          } else {
            const taInTAList = tas.some(item => item['uuid'] === rowData.uuid)
            // If a row doesn't exist yet with the same first three columns, create a new row
            if (taInTAList){
              const newRow = {
              
                uuid: rowData.uuid,
                lastName: rowData.lastName,
                firstName: rowData.firstName,
                taHours: tas.find(item => item['uuid'] === rowData.uuid).totalTAHours,
                courses: [
                  {
                    courseNumber: rowData.courseNumber,
                    grade: rowData.grade,
                    title: rowData.title,
                    days: rowData.days,
                    startTime: rowData.startTime,
                    stopTime: rowData.stopTime,
                    semester: rowData.semester,
                    year: rowData.year,
                    CRN: rowData.CRN.replace(/[\r]/gm, ''),
                  },
                ],
              };
              extractedTAs.push(newRow);
            }
          }
        }
    
        // Set the extracted data in state
        setAllTas(extractedTAs);

        setFileUploaded4(true);

      }

      function handleHelpIconClick() {
        setShowBubble(true);
      }
    
      function handleBubbleClick() {
        setShowBubble(false); // close the bubble
      }

      
      return (
        <div class="max-w-sm rounded overflow-hidden shadow-lg input-card">
          <input
          class="block w-full min-w-0 flex-auto rounded border border-solid border-neutral-300 bg-clip-padding py-[0.32rem] px-3 text-base font-normal text-neutral-700 transition duration-300 ease-in-out file:-mx-3 file:-my-[0.32rem] file:overflow-hidden file:rounded-none file:border-0 file:border-solid file:border-inherit file:bg-neutral-100 file:px-3 file:py-[0.32rem]  file:transition file:duration-150 file:ease-in-out file:[margin-inline-end:0.75rem] file:[border-inline-end-width:1px] hover:file:bg-neutral-200  focus:text-neutral-700 focus:outline-none"
          type="file"
          id="formFile"
          accept=".csv" onChange={handleAllTAsUpload}
          disabled={fileUploaded4}  />

          <button className="help-icon" onClick={handleHelpIconClick} style={{ float: "right" }}>
            <img src="Help-icon.png" alt="Help Icon" width="25" height="25" />
          </button>
          
          {showBubble && ( // render the bubble if showBubble is true
            <div className="bubble" onClick={handleBubbleClick} style={{ float: "right" }}>
              <div className="bubble-container">
                <div className="bubble-text">
                  <h2>File Should Look Like This</h2>
                  <p>Click anywhere on image to return</p>
                </div>
                <div className="bubble-image-container">
                  <img src="TA-Schedule-bubble-image.png" alt="Bubble Image" />
                </div>
              </div>
            </div>
          )}

          {!fileUploaded4 &&
          <div class="px-6 py-4">
              <div class="font-bold text-xl mb-2">Student/TA Schedules and Enrollment</div>
              <p class="text-gray-700 text-base">
              Upload List of TAs enrollment history with their grades which contains the following columns:
              </p>
          </div>
          }
          {fileUploaded4 &&
          <div style={{color:'gray'}} class="px-6 py-4">
              <div class="font-bold text-xl mb-2">Student/TA Schedules and Enrollment</div>
              <p class="text-gray-700 text-base">
              Upload List of TAs enrollment history with their grades which contains the following columns:
              </p>
          </div>
          }
      </div>

  );
}

export default AllTAsCSV;
