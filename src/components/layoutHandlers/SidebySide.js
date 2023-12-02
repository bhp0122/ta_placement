import React, { useState } from "react";
import 'bootstrap/dist/css/bootstrap.css';

function SidebySide(props) {
    
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

    // Combining the course's name , section , and crn
    function course_combo(course){
        const current_course = coursesList.find(c => c.CRN === course);
        const course_name = current_course.course_number;
        const course_section = current_course.Section;
        return `${course_name} ${course_section} ${course}`;
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
        let arr = [];
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
    
    // Adds the necessary rows in the schedule table with their correlated conflict if it exists and, if there is more than one confilct, adds an empty row beneath.
    function alignSchedule(scheduleReport, scheduleCourse, conflictReport) {
        let numConflicts = 0 // Keeps track of number of conflicts a course has. 
        conflictReport.map(conflict => {
            if (conflict[0] == scheduleCourse) {
                numConflicts += 1;
            }
        });
        if (numConflicts <= 1) {
            return (
                <tr>
                    <td>{course_combo(scheduleCourse)}</td>
                    <td>{scheduleReport[scheduleCourse][0][0]}</td>
                    <td>{scheduleReport[scheduleCourse][0][1]}</td>
                    <td>{scheduleReport[scheduleCourse][1][0]}</td>
                    <td>{scheduleReport[scheduleCourse][1][1]}</td>
                    <td>{checkKeys(scheduleReport[scheduleCourse])[0]}</td>
                    <td>{checkKeys(scheduleReport[scheduleCourse])[1]}</td>
                </tr>
            );
        }
        else {
            return (
                <>
                    <tr>
                        <td>{course_combo(scheduleCourse)}</ td>
                        <td>{scheduleReport[scheduleCourse][0][0]}</td>
                        <td>{scheduleReport[scheduleCourse][0][1]}</td>
                        <td>{scheduleReport[scheduleCourse][1][0]}</td>
                        <td>{scheduleReport[scheduleCourse][1][1]}</td>
                        <td>{checkKeys(scheduleReport[scheduleCourse])[0]}</td>
                        <td>{checkKeys(scheduleReport[scheduleCourse])[1]}</td>
                    </tr>

                    {/* Adds an empty row if a course has more than one conflict meaning there are two TAs assigned that both have conflicts. */}
                    <tr style={{ height:31 }}>
                        <td></td>
                        <td></td>
                        <td></td>
                        <td></td>
                        <td></td>
                        <td></td>
                        <td></td>
                    </tr>
                </>
            )
        }    
    }


    // Adds the necessary rows in the conflict table with their correlated course if there exist a conflict for that course. 
    function alignConflicts(scheduleCourse, conflictReport) {
        let numConflicts = 0;
        conflictReport.map(conflict => {
            if (conflict[0] == scheduleCourse) {
                numConflicts += 1;
            };
        })
    
        if (numConflicts == 0) {
            return (
                <tr style={{ height:31 }}>
                    <td></td>
                    <td></td>
                    <td></td>
                    <td></td>
                    <td></td>
                </tr>
            )
        } else if (numConflicts == 1) {
            for (const c in Object.keys(conflictReport)) {
                if (conflictReport[c][0] == scheduleCourse) {
                    return (
                        <tr>
                            <td>{course_combo(conflictReport[c][0])}</td>
                            <td>{conflictReport[c][1]}</td>
                            <td>{conflictReport[c][2]}</td>
                            <td>{conflictReport[c][3]}</td>
                            <td>{conflictReport[c][4]}</td>
                        </tr>
                    )
                }
            }    
        } else if (numConflicts == 2) {
            let listedConflicts = [];
            for (const c in Object.keys(conflictReport)) {
                if (conflictReport[c][0] == scheduleCourse) {
                    listedConflicts.push([course_combo(conflictReport[c][0]), conflictReport[c][1], conflictReport[c][2], conflictReport[c][3], conflictReport[c][4]])
                }
            }    

            return (
                <>
                    <tr>
                        <td>{listedConflicts[0][0]}</td>
                        <td>{listedConflicts[0][1]}</td>
                        <td>{listedConflicts[0][2]}</td>
                        <td>{listedConflicts[0][3]}</td>
                        <td>{listedConflicts[0][4]}</td>
                    </tr>
                    <tr>
                        <td>{listedConflicts[1][0]}</td>
                        <td>{listedConflicts[1][1]}</td>
                        <td>{listedConflicts[1][2]}</td>
                        <td>{listedConflicts[1][3]}</td>
                        <td>{listedConflicts[1][4]}</td>

                    </tr>
                </>
            )
        }
    }  

    
    return (
        <div>
            {/* Dropdown Menu for the user to filter by Courses and TAs */}
            <div class="w3-sidebar w3-border w3-bar-block" style={{width: "10%", height: "auto", position: "relative", float: "left", left: 10, bottom:"31%", padding: "5px"}}>
                    {/* OnChange defines the function/variable/method that gets triggered whenever an option is picked by the user. */}
                    <h6 style={{fontWeight: "bold", textAlign: "center"}}>Filters</h6>
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

            <div style={{marginLeft: "4%", overflow: "scroll",  marginRight: "5%"}}>
                <div class="row" style={{flexWrap: "nowrap"}}>
                    <div class="col">
                        <h1>Schedule 1</h1>
                        <table class="table table-striped table-bordered table-sm" style={{width: "600px"}}>
                            <thead>
                                    <tr>
                                        <th>Course</th>
                                        <th>TA 1</th>
                                        <th>TA 1 hours</th>
                                        <th>TA 2</th>
                                        <th>TA 2 hours</th>
                                        <th>TA 3</th>
                                        <th>TA 3 hours</th>
                                    </tr>
                            </thead>
                            <tbody>
                                {Object.keys(filterSchedule(reportOne[0], CourseValue, TaValue)).map(scheduleCourse =>
                                    {
                                        return alignSchedule(filterSchedule(reportOne[0], CourseValue, TaValue), scheduleCourse, filterConflict(reportOne[1], CourseValue, TaValue));
                                    }
                                )}
                            </tbody>
                        </table>
                    </div>
                    <div class="col">
                        <font color="red"><h1>Conflict Report 1</h1></font>
                        <table class="table table-striped table-bordered table-responsive table-sm" style={{width: "1000px"}}>
                            <thead>
                                <tr>
                                    <th>Course</th>
                                    <th>UID</th>
                                    <th>Last</th>
                                    <th>First</th>
                                    <th>Conflict</th>
                                </tr>
                            </thead>
                            <tbody>
                                {Object.keys(filterSchedule(reportOne[0], CourseValue, TaValue)).map(scheduleCourse =>
                                    {
                                        return alignConflicts(scheduleCourse, filterConflict(reportOne[1], CourseValue, TaValue));
                                    }
                                )}
                            </tbody>
                        </table>
                    </div>
                </div>

                <div class="row" style={{flexWrap: "nowrap"}}>
                    <div class="col">
                        <h1>Schedule 2</h1>
                        <table class="table table-striped table-bordered table-responsive table-sm" style={{width: "600px"}}>
                            <thead>
                                    <tr>
                                        <th>Course</th>
                                        <th>TA 1</th>
                                        <th>TA 1 hours</th>
                                        <th>TA 2</th>
                                        <th>TA 2 hours</th>
                                        <th>TA 3</th>
                                        <th>TA 3 hours</th>
                                    </tr>
                            </thead>
                            <tbody>
                                {Object.keys(filterSchedule(reportTwo[0], CourseValue, TaValue)).map(scheduleCourse =>
                                    {
                                        return alignSchedule(filterSchedule(reportTwo[0], CourseValue, TaValue), scheduleCourse, filterConflict(reportTwo[1], CourseValue, TaValue));
                                    }
                                )}
                            </tbody>
                        </table>
                    </div>
                    <div class="col">
                        <font color="red"><h1>Conflict Report 2</h1></font>
                        <table class="table table-striped table-bordered table-responsive table-sm" style={{width: "1000px"}}>
                            <thead>
                                <tr>
                                    <th>Course</th>
                                    <th>UID</th>
                                    <th>Last</th>
                                    <th>First</th>
                                    <th>Conflict</th>
                                </tr>
                            </thead>
                            <tbody>
                                {Object.keys(filterSchedule(reportTwo[0], CourseValue, TaValue)).map(scheduleCourse =>
                                    {
                                        return alignConflicts(scheduleCourse, filterConflict(reportTwo[1], CourseValue, TaValue));
                                    }
                                )}
                            </tbody>
                        </table> 
                    </div>
                </div>


                <div class="row" style={{flexWrap: "nowrap"}}>
                    <div class="col">
                        <h1>Schedule 3</h1>
                        <table class="table table-striped table-bordered table-responsive table-sm" style={{width: "600px"}}>
                            <thead>
                                    <tr>
                                        <th>Course</th>
                                        <th>TA 1</th>
                                        <th>TA 1 hours</th>
                                        <th>TA 2</th>
                                        <th>TA 2 hours</th>
                                        <th>TA 3</th>
                                        <th>TA 3 hours</th>
                                    </tr>
                            </thead>
                            <tbody>
                                {Object.keys(filterSchedule(reportThree[0], CourseValue, TaValue)).map(scheduleCourse =>
                                    {
                                        return alignSchedule(filterSchedule(reportThree[0], CourseValue, TaValue), scheduleCourse, filterConflict(reportThree[1], CourseValue, TaValue));
                                    }
                                )}
                            </tbody>
                        </table>
                    </div>
                    <div class="col">
                        <font color="red"><h1>Conflict Report 3</h1></font>
                        <table class="table table-striped table-bordered table-responsive table-sm" style={{width: "1000px"}}>
                            <thead>
                                <th>Course</th>
                                <th>UID</th>
                                <th>Last</th>
                                <th>First</th>
                                <th>Conflict</th>
                            </thead>
                            <tbody>
                                {Object.keys(filterSchedule(reportThree[0], CourseValue, TaValue)).map(scheduleCourse =>
                                    {
                                        return alignConflicts(scheduleCourse, filterConflict(reportThree[1], CourseValue, TaValue));
                                    }
                                )}
                            </tbody>
                        </table>  
                    </div>
                </div>
            </div>
        </div>
    );
} 

export default SidebySide;