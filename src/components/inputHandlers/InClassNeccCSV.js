import React, { useState } from "react";
import AllTAsCSV from "./AllTAsCSV";
import CreateEligList from "../CreateEligList";
import TAListCSV from "./TAListCSV";
import '../AllClassesCSV.css';

function InClassNeccCSV(props) {

    const [showHelp, setShowHelp] = useState(false);
    const [showBubble, setShowBubble] = useState(false);

    const { all_classes_attended } = props;
    const { setAllClassesAttend } = props;
    const { all_classes } = props;
    const { fileUploaded2 } = props;
    const { setFileUploaded2 } = props;

    //console.log(all_classes);



    function handleInClassNecCSVUpload(event) {
        const file = event.target.files[0];
        const reader = new FileReader();
        reader.onload = handleInClassNecFileRead;
        reader.readAsText(file);
    }

        // This function processes the contents of the CSV file
        function handleInClassNecFileRead(event) {
            const content = event.target.result;
            const rows = content.split("\n"); // Split the CSV into rows
            const headers = rows[0].split(","); // Get the column headers from the first row
    
            //input validation
            const requiredHeaders = [
                "CRN",
                "Attend\r",
              ];
              
              // Check if the CSV file contains all of the required headers
              const missingHeaders = requiredHeaders.filter((header) => !headers.includes(header));
              if (missingHeaders.length > 0) {
                // Display an error message if the CSV file is missing required columns
                alert(`The uploaded CSV file is missing the following required columns: ${missingHeaders.join(", ")}`);
                return;
              }
    
            const CRN = headers.indexOf("CRN");
            const attend = headers.indexOf("Attend\r");
            const extractedClasses = [];
        
            // Loop through each row and extract the desired columns
            for (let i = 2; i < rows.length; i++) {
                const row = rows[i].split(",");
                const rowData = {
                    CRN: row[CRN],
                    attend: row[attend],
                  };
                extractedClasses.push(rowData);
            }
        
            // Set the extracted data in state
            setAllClassesAttend(extractedClasses);

            mergeTwo(all_classes, extractedClasses);

            }

        function mergeTwo(all_classes, extractedClasses) {
            //console.log(extractedClasses);
            //console.log(all_classes);

            for (let x = 0; x < extractedClasses.length; x++){
                const lookCRN = extractedClasses[x].CRN;
                //console.log(lookCRN);

                const findCRN = all_classes.find((findCRN) => findCRN.CRN == lookCRN);
                //console.log("start", findCRN);

                if (findCRN){
                    findCRN.required_attendance = extractedClasses[x].attend;
                }

            }

            setAllClassesAttend(all_classes);
            setFileUploaded2(true);
        }

        function handleHelpIconClick() {
            setShowBubble(true);
          }
        
          function handleBubbleClick() {
            setShowBubble(false); // close the bubble
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
                accept=".csv" onChange={handleInClassNecCSVUpload}
                disabled={fileUploaded2}  />

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
                        <img src="In-Class-Nec-bubble-image.png" alt="Bubble Image" />
                        </div>
                    </div>
                    </div>
                )}

                {!fileUploaded2 &&
                <div class="px-6 py-4">
                    <div class="font-bold text-xl mb-2">Required Attendance</div>
                    <p class="text-gray-700 text-base">
                    Upload Required Attendance file which contains the following columns:
                    </p>
                </div>
                }
                {fileUploaded2 &&
                <div style={{color:'gray'}} class="px-6 py-4">
                    <div class="font-bold text-xl mb-2">Required Attendance</div>
                    <p class="text-gray-700 text-base">
                    Upload Required Attendance file which contains the following columns:
                    </p>
                </div>
                }
        </div>
        );
            
}

export default InClassNeccCSV;
