import React, { useState } from "react";
import 'bootstrap/dist/css/bootstrap.css';


function OnlyConflictsLayout(props) {
    
    // Acts like the parameters of the function
    const { taList, coursesList, conflictsOne, conflictsTwo, conflictsThree } = props

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
    const handleTaFilter = (event) => {
        setTaValue(event.target.value);
    }

    // Removes duplicates from the courseList, so that each option does not get presented twice
    // Each schedule will have this, so that it can keep updating as changes are made. 

    function removeDuplicates(coursesList) {
        let arr = [];
        console.log(coursesList);
        for (let i in coursesList) {
            if (!arr.includes(coursesList[i]["course_number"])) {
                arr.push(coursesList[i]["course_number"]);
            }
        }
        return arr.sort();
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

            <div style={{marginLeft: "4%", overflow: "scroll"}}>
                <p id="demo1"></p>
                <div class="row" style={{flexWrap:"nowrap"}}>
                    <div class="col">
                        <font color="red"><h1>Conflict Report 1</h1></font>
                        <table class="table table-striped table-bordered table-responsive table-sm" style={{width: "600px"}}>
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
                                {(filterConflict(conflictsOne, CourseValue, TaValue)).map(conflict =>
                                    <tr>
                                        <td>{course_combo(conflict[0])}</td>
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
                        <table class="table table-striped table-bordered table-responsive table-sm" style={{width: "600px"}}>
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
                                {filterConflict(conflictsTwo, CourseValue, TaValue).map(conflict => 
                                    <tr> 
                                        <td>{course_combo(conflict[0])}</td>
                                        {/* Each index represent the CRN, UID, First Name, Last Name, and Conflict */}
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
                        <table class="table table-striped table-bordered table-responsive table-sm" style={{width: "600px"}}>
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
                                {filterConflict(conflictsThree, CourseValue, TaValue).map(conflict => 
                                    <tr> 
                                        <td>{course_combo(conflict[0])}</td>
                                         {/* Each index represent the CRN, UID, First Name, Last Name, and Conflict */}
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
export { OnlyConflictsLayout };
