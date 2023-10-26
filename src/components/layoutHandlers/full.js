<div>
<div class="row">
<div class="col"> {/* Schedule 1 Begins */}
    <h1>Schedule 1</h1>
    <table class="table table-striped table-bordered table-sm">
        <thead>
            <tr>
                <th>Course</th>
                <th>CRN</th>
                {/* <th>Hrs Rem.</th> */}
                <th>TA 1</th>
                <th>TA 1 hours</th>
                <th>TA 2</th>
                <th>TA 2 hours</th>
                <th>TA 3</th>
                <th>TA 3 hours</th>
            </tr>
        </thead>
        <tbody>
        {Object.keys(history[0][0]).map((course, index) => (
            <tr  key={index}>
                <td>{course_name(course)}</td>
                <td>{course}</td>
                {/* <td>{remaining_hours_men[course]}</td> */}
                <td>{history[0][0][course][0][0]}</td>
                <td>{history[0][0][course][0][1]}</td>
                <td>{history[0][0][course][1][0]}</td>
                <td>{history[0][0][course][1][1]}</td>
                {checkKeys(history[0][0][course])[0]} {/* Displays the third TA if they exist */}
                {checkKeys(history[0][0][course])[1]}
            </tr>
        ))}
        </tbody>
    </table>
</div> {/* Schedule 1 Ends */}
<div class="col"> {/* Conflict Report 1 Begins */}
    <font color="red"><h1>Conflict Report 1</h1></font>
    <table class="table table-striped table-bordered table-sm">
        <thead>
            <tr>
                <th>Course</th>
                <th>CRN</th>
                <th>UID</th>
                <th>Last</th>
                <th>First</th>
                <th>Conflict</th>
            </tr>
        </thead>
        <tbody>
            {/* Goes through the first list (history[0]) and takes each conflict report for the list and displays its contents*/}
            {history[0][1].map(conflict => 
                <tr> 
                    <td>{course_name(conflict[0])}</td>
                    <td>{conflict[0]}</td> {/* Each index represent the CRN, UID, First Name, Last Name, and Conflict */}
                    <td>{conflict[1]}</td>
                    <td>{conflict[2]}</td>
                    <td>{conflict[3]}</td>
                    <td>{conflict[4]}</td>
                </tr>
                )}
        </tbody>
    </table>
    <div>
        <button value={0} class="btn btn-outline-dark" style={{alignContent:"left"}} onClick={handleDownload}>Download CSV</button>
    </div>
</div>  {/* Conflict Report 1 Begins */}
</div> {/* Schedule 1 + Conflict Report 1 Row Ends */}

{/* Schedule 2 + Conflict Report 2 */}
<div class="row">
<div class="col"> {/* Schedule 2 Begins */}
    <h1>Schedule 2</h1>
    <table class="table table-striped table-bordered table-sm">
        <thead>
            <tr>
                <th>Course</th>
                <th>CRN</th>
                {/* <th>Hrs Rem.</th> */}
                <th>TA 1</th>
                <th>TA 1 hours</th>
                <th>TA 2</th>
                <th>TA 2 hours</th>
                <th>TA 3</th>
                <th>TA 3 hours</th>
            </tr>
        </thead>
        <tbody>
        {Object.keys(history[1][0]).map((course, index) => (
            <tr  key={index} >
                <td>{course_name(course)}</td>
                <td>{course}</td>
                {/* <td>{remaining_hours_men[course]}</td> */}
                <td>{history[1][0][course][0][0]}</td>
                <td>{history[1][0][course][0][1]}</td>
                <td>{history[1][0][course][1][0]}</td>
                <td>{history[1][0][course][1][1]}</td>
                {checkKeys(history[1][0][course])[0]}
                {checkKeys(history[1][0][course])[1]}
            </tr>
        ))}
        </tbody>
    </table>
</div> {/* Schedule 2 Ends */}

<div class = "col">
    <font color="red"><h1>Conflict Report 2</h1></font>
    <table class="table table-striped table-bordered table-sm">
        <thead>
            <tr>
                <th>Course</th>
                <th>CRN</th>
                <th>UID</th>
                <th>Last</th>
                <th>First</th>
                <th>Conflict</th>
            </tr>
        </thead>
        <tbody>
            {history[1][1].map(conflict => 
                <tr> 
                    <td>{course_name(conflict[0])}</td>
                    <td>{conflict[0]}</td>
                    <td>{conflict[1]}</td>
                    <td>{conflict[2]}</td>
                    <td>{conflict[3]}</td>
                    <td>{conflict[4]}</td>
                </tr>
                )}
        </tbody>
    </table>
    <div>
        <button value={1} class="btn btn-outline-dark" style={{alignContent:"left"}} onClick={handleDownload}>Download CSV</button>
    </div>	
</div> {/* Conflict Report 2 Ends */}
</div> {/* Schedule 2 + Conflict Report 2 Row Ends */}

{/* Schedule 3 + Conflict Report 3 */}
<div class = "row">
<div class="col">
    <h1>Schedule 3</h1> {/* Schedule 3 Begins */}
    <table class="table table-striped table-bordered table-sm">
        <thead>
            <tr>
                <th>Course</th>
                <th>CRN</th>
                {/* <th>Hrs Rem.</th> */}
                <th>TA 1</th>
                <th>TA 1 hours</th>
                <th>TA 2</th>
                <th>TA 2 hours</th>
                <th>TA 3</th>
                <th>TA 3 hours</th>
            </tr>
        </thead>
        <tbody>
        {Object.keys(history[2][0]).map((course, index) => (
            <tr  key={index} >
                <td>{course_name(course)}</td>
                <td>{course}</td>
                {/* <td>{remaining_hours_men[course]}</td> */}
                <td>{history[2][0][course][0][0]}</td>
                <td>{history[2][0][course][0][1]}</td>
                <td>{history[2][0][course][1][0]}</td>
                <td>{history[2][0][course][1][1]}</td>
                {checkKeys(history[2][0][course])[0]}
                {checkKeys(history[2][0][course])[1]}
            </tr>
        ))}
        </tbody>
    </table>
</div> {/* Schedule 3 Ends*/}

<div class="col"> {/* Conflict Report 3 Begins */}
    <font color="red"><h1>Conflict Report 3</h1></font>
    <table class="table table-striped table-bordered table-sm">
        <thead>
            <tr>
                <th>Course</th>
                <th>CRN</th>
                <th>UID</th>
                <th>Last</th>
                <th>First</th>
                <th>Conflict</th>
            </tr>
        </thead>
        <tbody>
            {history[2][1].map(conflict => 
                <tr> 
                    <td>{course_name(conflict[0])}</td>
                    <td>{conflict[0]}</td>
                    <td>{conflict[1]}</td>
                    <td>{conflict[2]}</td>
                    <td>{conflict[3]}</td>
                    <td>{conflict[4]}</td>
                </tr>
                )}
        </tbody>
    </table>	
    <div>
        <button value={2} class="btn btn-outline-dark" style={{alignContent:"left"}} onClick={handleDownload}>Download CSV</button>
    </div>	
</div> {/* Conflict Report 3 Row Ends */}
</div> {/* Schedule 3 + Conflict Report 3 Row Ends */}


</div> // Container Ends
