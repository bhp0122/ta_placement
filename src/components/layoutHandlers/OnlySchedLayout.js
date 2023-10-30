import React, { useState } from "react";
import 'bootstrap/dist/css/bootstrap.css';

function OnlySchedLayout(props) {
    
    // Acts like the parameters of the function
    const { taList, coursesList, scheduleOne, scheduleTwo, scheduleThree } = props;

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

    const handleCourseFilter = (event) => {
        setCourseValue(event.target.value);
    }

    const handleTaFilter= (event) => {
        setTaValue(event.target.value);
    }

    function removeDuplicates(coursesList) {
        let arr = [];
        for (let i in coursesList) {
            if (!arr.includes(coursesList[i]["course_number"])) {
                arr.push(coursesList[i]["course_number"]);
            }
        }
        return arr.sort();
    }

    function filterArray(schedule, filterCourseValue, filterTaValue) {
        let filteredSchedule = {}
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

    return (
        <div>
            <div class="w3-sidebar w3-border w3-bar-block" style={{width: "10%", height: "auto", position: "relative", float: "left", left: 10, bottom:"30%", padding: "5px"}}>
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
                <div class="row" style={{flexWrap:"nowrap"}}>
                    <div class="col">
                        <h1>Schedule 1</h1>
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
                                {Object.keys(filterArray(scheduleOne, CourseValue, TaValue)).map((course, index) =>
                                    <tr key={index}>
                                        <td>COMP {course_name(course)}</td>
                                        <td>{course}</td>
                                        <td>{scheduleOne[course][0][0]}</td>
                                        <td>{scheduleOne[course][0][1]}</td>
                                        <td>{scheduleOne[course][1][0]}</td>
                                        <td>{scheduleOne[course][1][1]}</td>
                                        <td>{checkKeys(scheduleOne[course])[0]}</td>
                                        <td>{checkKeys(scheduleOne[course])[1]}</td>
                                    </tr>
                                )}   
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
                                    <th>TA 1</th>
                                    <th>TA 1 hours</th>
                                    <th>TA 2</th>
                                    <th>TA 2 hours</th>
                                    <th>TA 3</th>
                                    <th>TA 3 hours</th>
                                </tr>
                            </thead>
                            <tbody>
                                {Object.keys(filterArray(scheduleTwo, CourseValue, TaValue)).map((course, index) =>
                            
                                    <tr key={index}>
                                        <td>COMP {course_name(course)}</td>
                                        <td>{course}</td>
                                        <td>{scheduleTwo[course][0][0]}</td>
                                        <td>{scheduleTwo[course][0][1]}</td>
                                        <td>{scheduleTwo[course][1][0]}</td>
                                        <td>{scheduleTwo[course][1][1]}</td>
                                        <td>{checkKeys(scheduleTwo[course])[0]}</td>
                                        <td>{checkKeys(scheduleTwo[course])[1]}</td>
                                    </tr>
                                )}   
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
                                    <th>TA 1</th>
                                    <th>TA 1 hours</th>
                                    <th>TA 2</th>
                                    <th>TA 2 hours</th>
                                    <th>TA 3</th>
                                    <th>TA 3 hours</th>
                                </tr>
                            </thead>

                            <tbody>
                                {Object.keys(filterArray(scheduleThree, CourseValue, TaValue)).map((course, index) =>
                                    <tr key={index}>
                                        <td>COMP {course_name(course)}</td>
                                        <td>{course}</td>
                                        <td>{scheduleThree[course][0][0]}</td>
                                        <td>{scheduleThree[course][0][1]}</td>
                                        <td>{scheduleThree[course][1][0]}</td>
                                        <td>{scheduleThree[course][1][1]}</td>
                                        <td>{checkKeys(scheduleThree[course])[0]}</td>
                                        <td>{checkKeys(scheduleThree[course])[1]}</td>
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

export default OnlySchedLayout;