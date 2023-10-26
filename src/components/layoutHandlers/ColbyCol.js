import React from "react";

function ColbyCol(props) {
    const { coursesList, reportOne, reportTwo, reportThree } = props

    // console.log(coursesList);
    // console.log(reportOne);
    // console.log(reportTwo);
    // console.log(reportThree);

    function course_name(course){
        const current_course = coursesList.find(c => c.CRN === course);
        const course_name = 'COMP ' + current_course.course_number;
        return course_name;
    }

    return (
        <div>
            <div class="row">
                <div class="col" style={{width:500}}>
                    <h1>Schedule 1</h1>
                    <table class="table table-striped table-bordered table-sm">
                        <thead>
                                <tr>
                                    <th>Course</th>
                                    <th>CRN</th>
                                    <th>TA 1</th>
                                    <th>TA 1 hours</th>
                                    <th>TA 2</th>
                                    <th>TA 2 hours</th>
                                    <th>TA 3</th>
                                    <th>TA 3 hours</th>
                                </tr>
                        </thead>
                        <tbody>
                            {Object.keys(reportOne[0]).map((course, index) => (
                                <tr  key={index}>
                                    <td>{course_name(course)}</td>
                                    <td>{course}</td>
                                    <td>{reportOne[0][course][0][0]}</td>
                                    <td>{reportOne[0][course][0][1]}</td>
                                    <td>{reportOne[0][course][1][0]}</td>
                                    <td>{reportOne[0][course][1][1]}</td>
                                    {/* <td>{report_hist1["history1"][0][course][0]}</td>
                                    <td>{report_hist1["history1"][0][course][1]}</td> */}
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>

                <div class="col" style={{width:500}}>
                    <h1>Schedule 2</h1>
                    <table class="table table-striped table-bordered table-responsive table-sm">
                        <thead>
                                <tr>
                                    <th>Course</th>
                                    <th>CRN</th>
                                    <th>TA 1</th>
                                    <th>TA 1 hours</th>
                                    <th>TA 2</th>
                                    <th>TA 2 hours</th>
                                    <th>TA 3</th>
                                    <th>TA 3 hours</th>
                                </tr>
                        </thead>
                        <tbody>
                            {Object.keys(reportTwo[0]).map((course, index) => (
                                <tr  key={index}>
                                    <td>{coursesList(course)}</td>
                                    <td>{course}</td>
                                    <td>{reportTwo[0][course][0][0]}</td>
                                    <td>{reportTwo[0][course][0][1]}</td>
                                    <td>{reportTwo[0][course][1][0]}</td>
                                    <td>{reportTwo[0][course][1][1]}</td>
                                    {/* <td>{report_hist1["history1"][0][course][0]}</td>
                                    <td>{report_hist1["history1"][0][course][1]}</td> */}
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
                <div class="col" style={{width:50}}>
                    <h1>Schedule 3</h1>
                    <table class="table table-striped table-bordered table-responsive table-sm">
                        <thead>
                                <tr>
                                    <th>Course</th>
                                    <th>CRN</th>
                                    <th>TA 1</th>
                                    <th>TA 1 hours</th>
                                    <th>TA 2</th>
                                    <th>TA 2 hours</th>
                                    <th>TA 3</th>
                                    <th>TA 3 hours</th>
                                </tr>
                        </thead>
                        <tbody>
                            {Object.keys(reportThree[0]).map((course, index) => (
                                <tr  key={index}>
                                    <td>{course_name(course)}</td>
                                    <td>{course}</td>
                                    <td>{reportThree[0][course][0][0]}</td>
                                    <td>{reportThree[0][course][0][1]}</td>
                                    <td>{reportThree[0][course][1][0]}</td>
                                    <td>{reportThree[0][course][1][1]}</td>
                                    {/* <td>{report_hist1["history1"][0][course][0]}</td>
                                    <td>{report_hist1["history1"][0][course][1]}</td> */}
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            </div>

            <div class="row">
                <div class="col" style={{width:500}}>
                    <font color="red"><h1>Conflict Report 1</h1></font>
                    <table class="table table-striped table-bordered table-responsive table-sm">
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
                            {reportOne[1].map(conflict => 
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
                </div>

                <div class="col" style={{width:500}}>
                    <font color="red"><h1>Conflict Report 2</h1></font>
                    <table class="table table-striped table-bordered table-responsive table-sm">
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
                            {reportTwo[1].map(conflict => 
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
                </div>

                <div class="col" style={{width:50}}>
                    <font color="red"><h1>Conflict Report 3</h1></font>
                    <table class="table table-striped table-bordered table-sm">
                        <thead>
                            <th>Course</th>
                            <th>CRN</th>
                            <th>UID</th>
                            <th>Last</th>
                            <th>First</th>
                            <th>Conflict</th>
                        </thead>

                        <tbody>
                            {reportThree[1].map(conflict => 
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
                </div>
            </div>
        </div>
    );
}



export default ColbyCol;