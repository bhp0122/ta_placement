import React, { useState } from "react";
import 'bootstrap/dist/css/bootstrap.css';

function ColbyCol(props) {

    // Acts like the parameters of the function
    const { taList, coursesList, reportOne, reportTwo, reportThree } = props

    // Variables that keep track of the value whenever changed. Default state is at "None", or is automatically given "None"
    const [CourseValue, setCourseValue] = useState("None");
    const [TaValue, setTaValue] = useState("None");

    // Converts CRN to a course number
    function course_name(course){
        const current_course = coursesList.find(c => c.CRN === course);
        const course_name = current_course.course_number;
        return course_name;
    }

    // Checks for a third TA.
    function checkKeys(schedule) {
        if (schedule.length >= 3) 
            return [schedule[2][0], schedule[2][1]]
        else
            return ["", ""]
    } 

    /* 
    Variable is used in the dropdown. 
    Acts as a trigger to change the value whenever an option is picked
    from the Course dropdown menu
    */
    const handleCourseFilter = (event) => {
        setCourseValue(event.target.value);
    }

    /* 
    Variable is used in the dropdown. 
    Acts as a trigger to change the value whenever an option is picked
    from the Course dropdown menu
    */
    const handleTaFilter= (event) => {
        setTaValue(event.target.value);
    }

    // Removes duplicates from the courseList, so that each option does not get presented twice
    function removeDuplicates(coursesList) {
        let arr = []
        for (let i in coursesList) {
            if (!arr.includes(coursesList[i]["course_number"])) {
                arr.push(coursesList[i]["course_number"]);
            }
        }
        return arr.sort();
    }
    
    // Filters the schedule according to the value filterCourseValue is and what value filterTaValue is. 
    // Each schedule will have this, so that it can keep updating as changes are made. 
    function filterSchedule(schedule, filterCourseValue, filterTaValue) {
        let filteredSchedule = {};
        if (filterCourseValue != "None" && filterTaValue == "None") {
            Object.keys(schedule).filter(courseKey => {
                if (course_name(courseKey) == filterCourseValue) {
                    return true;
                } else {
                    return false;
                }
            }).map(courseKey => {
                filteredSchedule[courseKey] = schedule[courseKey];    
            })
        }
        else if (filterCourseValue == "None" && filterTaValue != "None") {
            Object.keys(schedule).filter(courseKey => {
                if ((schedule[courseKey][0][0] == filterTaValue) || (schedule[courseKey][1][0] == filterTaValue)) {
                    return true;
                } else {
                    return false;
                }
            }).map(courseKey => {
                filteredSchedule[courseKey] = schedule[courseKey];
            })    
        }
        else if (filterCourseValue != "None" && filterTaValue != "None") {
            Object.keys(schedule).filter(courseKey => {
                if ((course_name(courseKey) == filterCourseValue) && ((schedule[courseKey][0][0] == filterTaValue) || (schedule[courseKey][1][0] == filterTaValue))) {
                    return true;
                } else {
                    return false;
                }
            }).map(courseKey => {
                filteredSchedule[courseKey] = schedule[courseKey];
            })    
        }
        else {
            return schedule;
        }
        return filteredSchedule;    
    }
    
    // Filters conflict report according to what filterCourseValue is and what filterTaValue is. 
    // Each conflict report will have this, so that it can keep updating as changes are made. 
    function filterConflict(report, filterCourseValue, filterTaValue) {
        if (filterCourseValue == "None" && filterTaValue != "None") {
            let filteredConflicts = report.filter(conflict => {
                if (conflict[1] == filterTaValue) {
                    return true;
                }
                return false;
            }).map(conflict => {
                return conflict;
            })
            
            return filteredConflicts;
        }
        else if (filterCourseValue != "None" && filterTaValue == "None") {
            let filteredConflicts = report.filter(conflict =>
                {
                    if (course_name(conflict[0]) == filterCourseValue) {
                        return true;
                    }
                    return false;
                }).map(conflict => {
                    return conflict;
                })
    
                return filteredConflicts;
        } 
        else if (filterCourseValue != "None" && filterTaValue != "None") {
            let filteredConflicts = report.filter(conflict =>
                {
                    if (course_name(conflict[0]) == filterCourseValue && conflict[1] == filterTaValue) {
                        return true;
                    }
                    return false;
                }).map(conflict => {
                    return conflict;
                })
    
                return filteredConflicts;
        }
        else {
            return report;
        }  
    }

    return (
        <div>
            {/* Dropdown Menu for the user to filter by Courses and TAs */}
            <div class="w3-sidebar w3-border w3-bar-block" style={{width: "10%", height: "auto", position: "relative", float: "left", left: 10, bottom:"38%", padding: "5px"}}>
                    {/* OnChange defines the function/variable/method that gets triggered whenever an option is picked by the user. */}
                    <select id="chooseCourse" onChange={handleCourseFilter}>
                        <option value="None">Course</option>
						{removeDuplicates(coursesList).map(course =>
							<option value={course}>{course}</option>	
						)} 
					</select>

                    <select id="chooseTA" onChange={handleTaFilter}>
                        <option value="None">TA</option>
                        {taList.map(ta =>
                            <option value={ta["uuid"]}>{ta["uuid"]}</option>
                        )}
                    </select>
            </div>

            <div style={{marginLeft: "150px", overflow: "scroll"}}>
                <div class="row" style={{flexWrap:"nowrap",float: "left"}}>
                    <div class="col">
                        <h1>Schedule 1</h1>
                        <table class="table table-striped table-bordered table-sm">
                            <thead>
                                    <tr>
                                        <th>Course</th>
                                        <th>CRN</th>
                                        <th>Section</th>
                                        <th>TA 1</th>
                                        <th>TA 1 hours</th>
                                        <th>TA 2</th>
                                        <th>TA 2 hours</th>
                                        <th>TA 3</th>
                                        <th>TA 3 hours</th>
                                    </tr>
                            </thead>
                            <tbody>
                                {Object.keys(filterSchedule(reportOne[0], CourseValue, TaValue)).map((course, index) => (
                                    <tr  key={index}>
                                        <td>COMP {course_name(course)}</td>
                                        <td>{course}</td>
                                        <td></td>
                                        <td>{reportOne[0][course][0][0]}</td>
                                        <td>{reportOne[0][course][0][1]}</td>
                                        <td>{reportOne[0][course][1][0]}</td>
                                        <td>{reportOne[0][course][1][1]}</td>
                                        <td>{checkKeys(reportOne[0][course])[0]}</td>
                                        <td>{checkKeys(reportOne[0][course])[1]}</td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>

                    <div class="col">
                        <h1>Schedule 2</h1>
                        <table class="table table-striped table-bordered table-responsive table-sm">
                            <thead>
                                    <tr>
                                        <th>Course</th>
                                        <th>CRN</th>
                                        <th>Section</th>
                                        <th>TA 1</th>
                                        <th>TA 1 hours</th>
                                        <th>TA 2</th>
                                        <th>TA 2 hours</th>
                                        <th>TA 3</th>
                                        <th>TA 3 hours</th>
                                    </tr>
                            </thead>
                            <tbody>
                                {Object.keys(filterSchedule(reportTwo[0], CourseValue, TaValue)).map((course, index) => (
                                    <tr  key={index}>
                                        <td>COMP {course_name(course)}</td>
                                        <td>{course}</td>
                                        <td></td>
                                        <td>{reportTwo[0][course][0][0]}</td>
                                        <td>{reportTwo[0][course][0][1]}</td>
                                        <td>{reportTwo[0][course][1][0]}</td>
                                        <td>{reportTwo[0][course][1][1]}</td>
                                        <td>{checkKeys(reportTwo[0][course])[0]}</td>
                                        <td>{checkKeys(reportTwo[0][course])[1]}</td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                    <div class="col">
                        <h1>Schedule 3</h1>
                        <table class="table table-striped table-bordered table-responsive table-sm">
                            <thead>
                                    <tr>
                                        <th>Course</th>
                                        <th>CRN</th>
                                        <th>Section</th>
                                        <th>TA 1</th>
                                        <th>TA 1 hours</th>
                                        <th>TA 2</th>
                                        <th>TA 2 hours</th>
                                        <th>TA 3</th>
                                        <th>TA 3 hours</th>
                                    </tr>
                            </thead>
                            <tbody>
                                {Object.keys(filterSchedule(reportThree[0], CourseValue, TaValue)).map((course, index) => (
                                    <tr  key={index}>
                                        <td>COMP {course_name(course)}</td>
                                        <td>{course}</td>
                                        <td></td>
                                        <td>{reportThree[0][course][0][0]}</td>
                                        <td>{reportThree[0][course][0][1]}</td>
                                        <td>{reportThree[0][course][1][0]}</td>
                                        <td>{reportThree[0][course][1][1]}</td>
                                        <td>{checkKeys(reportThree[0][course])[0]}</td>
                                        <td>{checkKeys(reportThree[0][course])[0]}</td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                </div>

                <div class="row" style={{flexWrap:"nowrap"}}>
                    <div class="col">
                        <font color="red"><h1>Conflict Report 1</h1></font>
                        <table class="table table-striped table-bordered table-responsive table-sm">
                            <thead>
                                <tr>
                                    <th>Course</th>
                                    <th>CRN</th>
                                    <th>Section</th>
                                    <th>UID</th>
                                    <th>Last</th>
                                    <th>First</th>
                                    <th>Conflict</th>
                                </tr>
                            </thead>
                            <tbody>
                                {filterConflict(reportOne[1], CourseValue, TaValue).map(conflict => 
                                    <tr> 
                                        <td>COMP {course_name(conflict[0])}</td>
                                        <td>{conflict[0]}</td>
                                        <td></td>
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
                                    <th>Section</th>
                                    <th>UID</th>
                                    <th>Last</th>
                                    <th>First</th>
                                    <th>Conflict</th>
                                </tr>
                            </thead>
                            <tbody>
                                {filterConflict(reportTwo[1], CourseValue, TaValue).map(conflict => 
                                    <tr> 
                                        <td>COMP {course_name(conflict[0])}</td>
                                        <td>{conflict[0]}</td>
                                        <td></td>
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
                        <table class="table table-striped table-bordered table-sm">
                            <thead>
                                <th>Course</th>
                                <th>CRN</th>
                                <th>Section</th>
                                <th>UID</th>
                                <th>Last</th>
                                <th>First</th>
                                <th>Conflict</th>
                            </thead>

                            <tbody>
                                {filterConflict(reportThree[1], CourseValue, TaValue).map(conflict => 
                                    <tr> 
                                        <td>COMP {course_name(conflict[0])}</td>
                                        <td>{conflict[0]}</td>
                                        <td></td>
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
        </div>
    );
}



export default ColbyCol;