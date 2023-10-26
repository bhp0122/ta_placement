import React from "react";
import 'bootstrap/dist/css/bootstrap.css';
import Table from 'react-bootstrap/Table';

function OnlySchedLayout(props) {
    const { coursesList, scheduleOne, scheduleTwo, scheduleThree } = props;

    // console.log(coursesList)
    console.log(scheduleOne);
    // console.log(scheduleTwo);
    // console.log(scheduleThree);

    function course_name(course){
        const current_course = coursesList.find(c => c.CRN === course);
        const course_name = 'COMP ' + current_course.course_number;
        return course_name;
    }

    function checkKeys(schedule) {
        // hist will contain the schedule it is referencing and the course. 
        if (Object.keys(schedule).length == 3) 
            return [<td>{schedule[2][0]}</td>, <td>{schedule[2][1]}</td>]
        else
            return [<td></td>, <td></td>]
    }

    return (
        <div class="container">
            <div class="row">
                <div class="col" style={{width:500}}>
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
                            {Object.keys(scheduleOne).map((course, index) =>
                                <tr key={index}>
                                    <td>{course_name(course)}</td>
                                    <td>{course}</td>
                                    <td>{scheduleOne[course][0][0]}</td>
                                    <td>{scheduleOne[course][0][1]}</td>
                                    <td>{scheduleOne[course][1][0]}</td>
                                    <td>{scheduleOne[course][1][1]}</td>
                                    {/* Data missing */}
                                </tr>
                            )}   
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
                            {Object.keys(scheduleTwo).map((course, index) =>
                        
                                <tr key={index}>
                                    <td>{course_name(course)}</td>
                                    <td>{course}</td>
                                    <td>{scheduleTwo[course][0][0]}</td>
                                    <td>{scheduleTwo[course][0][1]}</td>
                                    <td>{scheduleTwo[course][1][0]}</td>
                                    <td>{scheduleTwo[course][1][1]}</td>
                                    {/* Data missing */}
                                </tr>
                            )}   
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
                            {Object.keys(scheduleThree).map((course, index) =>
                                <tr key={index}>
                                    <td>{course_name(course)}</td>
                                    <td>{course}</td>
                                    <td>{scheduleThree[course][0][0]}</td>
                                    <td>{scheduleThree[course][0][1]}</td>
                                    <td>{scheduleThree[course][1][0]}</td>
                                    <td>{scheduleThree[course][1][1]}</td>
                                    {/* Data missing */}
                                </tr>
                            )}   
                        </tbody>
                    </table>
                </div>
            </div>
        </div>
    );
}

export default OnlySchedLayout;