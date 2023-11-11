import React, { useState } from "react";
import InClassNeccCSV from "./InClassNeccCSV";
import '../AllClassesCSV.css';

function AllClassesCSV(props) {

  const [showHelp, setShowHelp] = useState(false);
  const [showBubble, setShowBubble] = useState(false);
  const [fullScreenBubble, setFullScreenBubble] = useState(false);

  const { all_classes, setAllClasses, fileUploaded, setFileUploaded } = props;

  function handleAllClassesCSVUpload(event) {
    const file = event.target.files[0];
    const reader = new FileReader();
    reader.onload = handleAllClassesFileRead;
    reader.readAsText(file);
  }

  function handleAllClassesFileRead(event) {
    const content = event.target.result;
    const rows = content.split("\n");
    const headers = rows[1].split(",");
  

    const requiredHeaders = [
      "TA",
      "Total Enrolled",
      "CRN",
      "Crse",
      "Title",
      "Days",
      "Time",
      "Instructor",
    ];

    const missingHeaders = requiredHeaders.filter(
      (header) => !headers.includes(header)
    );

    if (missingHeaders.length > 0) {
      alert(
        `The uploaded CSV file is missing the following required columns: ${missingHeaders.join(
          ", "
        )}`
      );
      return;
    }

    const totalTAHours = headers.indexOf("TA");
    const totalEnrolledIndex = headers.indexOf("Total Enrolled");
    const CRN = headers.indexOf("CRN");
    const crseIndex = headers.indexOf("Crse");
    const titleIndex = headers.indexOf("Title");
    const daysIndex = headers.indexOf("Days");
    const timeIndex = headers.indexOf("Time");
    const instructorIndex = headers.indexOf("Instructor");
    const extractedClasses = [];

    for (let i = 2; i < rows.length; i++) {
      const row = rows[i].split(",");

      if (row[totalTAHours] !== "" && row[totalTAHours] !== "0" && row[CRN] != "") {
        const rowData = {
          totalTAHours: row[totalTAHours],
          totalEnrolled: row[totalEnrolledIndex],
          CRN: row[CRN],
          crse: row[crseIndex],
          title: row[titleIndex],
          days: row[daysIndex],
          time: row[timeIndex],
          instructor: row[instructorIndex],
          required_attendance: "No Data",
        };
        extractedClasses.push(rowData);
      }
    }
    setAllClasses(extractedClasses)
    assignedHours(extractedClasses)
    console.log(extractedClasses)
    setFileUploaded(true)
    }

    function assignedHours(extractedClasses) {
      // Goes through all the courses and assinged the amount of TA hours the course can receive based on enrollment. 
      extractedClasses.map(comp => {
        // Due to the complexity of assigning a TA to a 1900 Lab, the TA hours assigned are not changed unless it is change in the csv file. 
        if (comp["crse"] != '1900') {
          if (comp["totalEnrolled"] < 10) {
            comp["totalTAHours"] = '5';
          }
          else if (comp["totalEnrolled"] < 26) { // i.e If a course gets 10-25 number of people enrolled, then max hours a course can have a TA assigned is 10 hours. 
            comp["totalTAHours"] = '10';
          }
          else if (comp["totalEnrolled"] < 40) {
            comp["totalTAHours"] = '15';
          }
          else if (comp["totalEnrolled"] < 60) {
            comp["totalTAHours"] = '20';
          }
          else {
            comp["totalTAHours"] = '25';
          }
        }
      })
    }

    function handleHelpIconClick() {
        setShowBubble(true);
    }

    function handleBubbleClick() {
        setShowBubble(false); // close the bubble
    }

    return (
            
        <div style={{}} class="max-w-sm rounded overflow-hidden shadow-lg input-card">
                <input
                class="block w-full min-w-0 flex-auto rounded border border-solid border-neutral-300 bg-clip-padding py-[0.32rem] px-3 text-base font-normal text-neutral-700 transition duration-300 ease-in-out file:-mx-3 file:-my-[0.32rem] file:overflow-hidden file:rounded-none file:border-0 file:border-solid file:border-inherit file:bg-neutral-100 file:px-3 file:py-[0.32rem]  file:transition file:duration-150 file:ease-in-out file:[margin-inline-end:0.75rem] file:[border-inline-end-width:1px] hover:file:bg-neutral-200  focus:text-neutral-700 focus:outline-none"
                type="file"
                id="formFile"
                accept=".csv" onChange={handleAllClassesCSVUpload}
                disabled={fileUploaded}  />

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
                        <img src="All-Classes-Bubble-Image.png" alt="Bubble Image" />
                        </div>
                    </div>
                    </div>
                )}

                {!fileUploaded &&
                <div class="px-6 py-4">
                    <div class="font-bold text-xl mb-2">All Courses Offered</div>
                    <p class="text-gray-700 text-base">
                    Upload all courses offered file which contains the following columns:
                    </p>
                </div>
                }
                {fileUploaded &&
                <div style={{color:'gray'}} class="px-6 py-4">
                    <div class="font-bold text-xl mb-2">All Courses Offered</div>
                    <p class="text-gray-700 text-base">
                    Upload all courses offered file which contains the following columns:
                    </p>
                </div>
                }

        </div>
      )

}

export default AllClassesCSV;
