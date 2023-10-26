import React from "react";
import 'bootstrap/dist/css/bootstrap.css';

function OnlyConflictsLayout(props) {
    const { coursesList, conflictsOne, conflictsTwo, conflictsThree } = props
    
    // console.log(coursesList);
    // console.log(conflictsOne);
    // console.log(conflictsTwo);
    // console.log(conflictsThree);

    function course_name(course){
        const current_course = coursesList.find(c => c.CRN === course);
        const course_name = 'COMP ' + current_course.course_number;
        return course_name;
    }

    return (
        <div style={{marginLeft: "150px", overflow: "scroll"}}>
            <div class="row" style={{flexWrap:"nowrap"}}>
                <div class="col">
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
                            {conflictsOne.map(conflict => 
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

                <div class="col">
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
                            {conflictsTwo.map(conflict => 
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
                
                <div class="col">
                    <font color="red"><h1>Conflict Report 3</h1></font>
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
                            {conflictsThree.map(conflict => 
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
            </div>   
        </div>
    );
}
export default OnlyConflictsLayout;
