import { useState, useEffect } from "react";
import StableMarriage from "./StableMarriage";



function CreateEligList(props){

    const [all_eligible_classes, setAllEligibleClasses] = useState([]);

    const { setRunAlg, all_classes_attend, all_TAs, classList, setClassList }  = props;
 
    const year = "2023"; // need to make this user input at some point

    const semester = "Spring";

    const QUALIFIED_COURSES = {
        1900: [1900, 3115, 3825, 4030, 4040, 4081, 4118, 4151, 4270, 4272, 4302, 4310, 4410, 4420, 4430, 4601, 4720, 4745, 4882, 6010, 6030, 6040, 6118, 6270, 6272, 6302, 6410, 7012, 7081, 7085, 7087, 7115, 7116, 7118, 7120, 7125, 7130, 7150, 7212, 7282, 7290, 7295, 7311, 7313, 7327, 7514, 7612, 7712, 7713, 7720, 7740, 7745, 7760, 7770, 7780, 7991, 7992, 7998, 7999, 8012, 8081, 8085, 8087, 8120, 8125, 8130, 8150, 8212, 8282, 8290, 8295, 8311, 8313, 8327, 8514, 8612, 8712, 8713, 8720, 8740, 8745, 8760, 8770, 8780, 8991, 8992, 8998, 8999],
        3115: [3115, 7115, 8115, 7116, 8116],
        3825: [3825, 7120, 8120, 7311, 8311, 7313, 8313],
        4030: [4030, 6030, 7295, 8295, 7712, 8712, 7713, 8713, 7992, 8992],
        4040: [4040, 6040, 7085, 8085, 7087, 8087],
        4081: [4081, 7012, 8012, 7081, 8081],
        4118: [4118, 6118, 7118, 8118],
        4151: [4151, 7150, 8150],
        4270: [4270, 6270, 7212, 8212, 7720, 8720],
        4272: [4272, 6272, 7212, 8212],
        4302: [4302, 6302, 7311, 8311],
        4310: [4310, 7311, 8311],
        4410: [4410, 6410, 7120, 8120, 7327, 8327, 7998, 8998],
        4420: [4420, 7120, 8120, 7327, 8327, 7998, 8998],
        4430: [4430, 7125, 8125],
        4601: [4601, 7290, 8290, 7612, 8612, 7992, 8992],
        4720: [4720, 7282, 8282, 7720, 8720, 7760, 8760, 7770, 8770],
        4745: [4745, 7740, 8740, 7745, 8745],
        4882: [4882, 7012, 8012, 7081, 8081, 7087, 8087],
        6030: [7712, 7295, 7713, 7992, 8295, 8712, 8713, 8992 ],
        6118: [7118, 8118],
        6430: [8125, 8125],
        7012: [7012, 8012],
        7081: [7081, 8081],
        7085: [7085, 8085],
        7087: [7087, 8087],
        7115: [7115, 8115],
        7116: [7116, 8116],
        7118: [7118, 8118],
        7120: [7120, 8120],
        7125: [7125, 8125],
        7130: [7130, 8130],
        7150: [7150, 8150],
        7212: [7212, 8212],
        7282: [7282, 8282],
        7290: [7290, 8290],
        7295: [7295, 8295],
        7311: [7311, 8311],
        7313: [7313, 8313],
        7327: [7327, 8327],
        7514: [7514, 8514],
        7612: [7612, 8612],
        7712: [7712, 8712],
        7713: [7713, 8713],
        7720: [7720, 8720],
        7740: [7740, 8740],
        7745: [7745, 8745],
        7760: [7760, 8760],
        7770: [7770, 8770],
        7780: [7780, 8780],
        7991: [7991, 8991],
        7992: [7992, 8992],
        7998: [7998, 8998],
        7999: [7999, 8999],
      };

    //change times in all classes list to military time to match times in all
    //TAs schedules
    function convertStandardTimes(timeString){
        var timeArr = timeString.split(/:|\s/);
        var hours = parseInt(timeArr[0]);
        var minutes = parseInt(timeArr[1]);
        var amPm = timeArr[2].toLowerCase();

            // Convert hours to military time
        if (hours < 12 && amPm === "pm") {
            hours += 12;
        } else if (hours === 12 && amPm === "am") {
            hours -= 12;
        }

        // Convert military time to string
        var militaryHours = hours.toString();
        var militaryMinutes = minutes.toString();
        if (hours < 10) {
            militaryHours = "0" + militaryHours;
        }
        if (minutes < 10) {
            militaryMinutes = "0" + militaryMinutes;
        }
        var militaryTimeString = militaryHours + "" + militaryMinutes;

        return militaryTimeString;
        
    }
    
    // Pushes the TA's eligibilty status to the class list (including a reason if they are not eligible)
    function pushClassList(class_list, curTAID, curCRN, curCrse, taHours, enrollment, is_able, reasons) {
        let rowData = {
            CRN: curCRN,
            course_number: curCrse,
            taHours: taHours,
            totalEnrolled: enrollment,
            TAID: curTAID,
            reason: reasons,
            able: is_able,
        };

        // check if this CRN already has a row
        let existingRow = class_list.find((r) => {
            return (
                r.CRN == "" + rowData.CRN
            );
        });

        // if CRN already has row, add TA to list
        if (existingRow) {

            if (!existingRow.teacher_assistants.some((ta) => ta.TAID == rowData.TAID)){

                if (is_able) {
                    existingRow.teacher_assistants.push({
                        TAID: rowData.TAID,
                        able: true,
                        
                        able_map: rowData.TAID
                    });
                }
                else {
                    existingRow.teacher_assistants.push({
                        TAID: rowData.TAID,
                        able: false,
                        
                        reason: rowData.reason
                    });
                }
            }

            return
        }

        // Create new row for CRN if no row already exists for it
        let newRow

        if (is_able) {
            newRow = {
                CRN: rowData.CRN,
                course_number: rowData.course_number,
                taHours: taHours,
                totalEnrolled: enrollment,
                teacher_assistants: [
                    {
                        TAID: rowData.TAID,
                        able: true,

                        able_map: rowData.TAID,
                    },
                ],
            };
        }
        else {
            newRow = {
                CRN: rowData.CRN,
                course_number: rowData.course_number,
                taHours: taHours,
                totalEnrolled: enrollment,
                teacher_assistants: [
                    {
                        TAID: rowData.TAID,
                        able: false,
                        reason: rowData.reason
                    },
                ],
            };
        }
        
        class_list.push(newRow);
    };


    function handleEligibilityList(){
      const class_list = [];

    
    for (let i = 0; i < all_classes_attend.length; i++){
        const curCRN = all_classes_attend[i].CRN; // current class being checked CRN
        const curCrse = all_classes_attend[i].crse; //current class being checked Course Number
        const taHours = all_classes_attend[i].totalTAHours; // number of hours this class is good for
        const enrollment = all_classes_attend[i].totalEnrolled; // total number of students enrolled in class

        const inClassNeeded = all_classes_attend[i].required_attendance; // checks if current class requries TA to be in attendance
        const curClassDays = all_classes_attend[i].days //checks what days the class takes place

        var curStartTime = 0;
        var curEndTime = 0;

        const curTime = all_classes_attend[i].time; // checks the time of current class that is being checked

        if (curTime.includes("am") || curTime.includes("pm")) { // convert time of class that is being offered for comparison
            var timeArr = curTime.split("-");
            curStartTime = parseInt(convertStandardTimes(timeArr[0]))
            curEndTime = parseInt(convertStandardTimes(timeArr[1]))
        }

        const qualifiedCourses = QUALIFIED_COURSES[curCrse]; // identify all courses that make TA eligible to teach current course that is being evaluated
        //console.log("This is the current course:", curCrse);

        for (let j = 0; j < all_TAs.length; j++){
            const curTAID = all_TAs[j].uuid;
            const curTACourses = all_TAs[j].courses; // list of every class that the current TA being evaluated has taken
            
            // Determines if the TA was already scheduled to TA
            let isTakingCourse = false;
            let hastakenCourse = false;
            let hastakenQualifiedCourse = false;
            let gradeEligible = false;
            let courseEligible = false;
            let timeEligible = true;
            
            // So, we loop over all of the courses that the TA has been to (no matter if they have taken it or are taking it)
            for (let k = 0; k < curTACourses.length; k++){
                let takenCourse = curTACourses[k];
                let takenCourseNumber = takenCourse.courseNumber;
                let takenCourseCRN = takenCourse.CRN;
                let takenCourseTaHours = null;
                let takenCourseEnrollment = null;

                for (const classIndex in all_classes_attend) {
                    // Retrieves the course hours and enrollment number for the course that is being evaluated that a TA has taken. 
                    if (all_classes_attend[classIndex].CRN == takenCourseCRN) {
                        takenCourseTaHours = all_classes_attend[classIndex].totalTAHours;
                        takenCourseEnrollment = all_classes_attend[classIndex].totalEnrolled;
                    }
                }

                // if TA is currently taking the course, they aren't eligible
                if (takenCourse.semester === semester && takenCourse.year === year){
                    // If the course that is being check that is currently being taken is the current course being checked for an eligible TA or if it is a qualifying course
                    if (takenCourseNumber == curCrse || qualifiedCourses && QUALIFIED_COURSES[curCrse].includes(Number(takenCourseNumber)) && curCrse != 1900) {
                        isTakingCourse = true;
                        pushClassList(class_list, curTAID, curCRN, curCrse, taHours, enrollment, false, 'Currently taking course');
                    }
                    // If the course is one of the ones in the list that needs a TA, then the reason is pushed into that course. 
                    else if (all_classes_attend.map(classIndex => {return classIndex.CRN}).includes(takenCourseCRN)) {
                        pushClassList(class_list, curTAID, takenCourseCRN, takenCourseNumber, takenCourseTaHours, takenCourseEnrollment, false, 'Currently taking course');
                    }
                    
                }
                // TA has taken this course in a previous semester, not current one 
                else if (takenCourseNumber === curCrse){
                    hastakenCourse = true;
                    if (takenCourse.grade === 'A-' || takenCourse.grade === 'A' || takenCourse.grade === 'A+') {
                        gradeEligible = true;
                        courseEligible = true;
                    }
                    else {
                        pushClassList(class_list, curTAID, curCRN, curCrse, taHours, enrollment, false, `Low grade (${takenCourse.grade}) in course (COMP ${takenCourseNumber})`);
                    }
                }
                // If the TA has taken a qualifying course in a previous semester
                else if (qualifiedCourses && QUALIFIED_COURSES[curCrse].includes(Number(takenCourseNumber))) {
                    hastakenQualifiedCourse = true
                    if (takenCourse.grade === 'A-' || takenCourse.grade === 'A' || takenCourse.grade === 'A+') {
                        gradeEligible = true;
                        courseEligible = true;
                    }
                    else { 
                        pushClassList(class_list, curTAID, curCRN, curCrse, taHours, enrollment, false, `Low grade (${takenCourse.grade}) in qualifying course (COMP ${takenCourseNumber})`);
                    }
                }
            }
            // If the TA has not taken any course or the course associated
            if (hastakenQualifiedCourse == false && hastakenCourse == false && isTakingCourse == false) {
                if (typeof qualifiedCourses == "undefined") {
                    pushClassList(class_list, curTAID, curCRN, curCrse, taHours, enrollment, false, `COMP ${curCrse} not taken`);
                }
                else if (qualifiedCourses.length == 2) {
                    pushClassList(class_list, curTAID, curCRN, curCrse, taHours, enrollment, false, `COMP ${qualifiedCourses[0]} or ${qualifiedCourses[1]} not taken`);
                }
                else {
                    pushClassList(class_list, curTAID, curCRN, curCrse, taHours, enrollment, false, `COMP ${qualifiedCourses.slice(0, -1).join(', ')}, or ${qualifiedCourses[qualifiedCourses.length - 1]} not taken`);
                }    
            }
            else if (courseEligible === true){ // if TA has taken the class or taken an eligible class
                for (let x = 0; x < curTACourses.length; x++){ // iterate through each class the TA has taken
                    const takingCourse = curTACourses[x];

                    const daysOfTakingCourse = curTACourses[x].days

                    if (takingCourse.semester === semester && takingCourse.year === year){ // if class that is being checked is happening this semester

                        if (inClassNeeded == "Y\r"){ //if current class requires TA to be present
                            if (daysOfTakingCourse.includes(curClassDays) || curClassDays.includes(daysOfTakingCourse)){ // if current TA class and class happen on same days
                                //console.log(daysOfTakingCourse, curClassDays);

                                if (takingCourse.startTime != ''){
                                
                                    const class_TA_taking_start_time = parseInt(takingCourse.startTime); //start time of class that TA is taking current semester

                                    const class_TA_taking_end_time = parseInt(takingCourse.stopTime); //stop time of class that TA is taking current semester
                                    // check if current class and class that the TA is taking is overlapping in time at all
                                    if ((curStartTime - class_TA_taking_start_time >= 0 && curStartTime - class_TA_taking_end_time <= 0) || (curEndTime - class_TA_taking_start_time >= 0 && curEndTime - class_TA_taking_end_time <= 0)){
                                        timeEligible = false;
                                    }
                                    else if ((class_TA_taking_start_time - curStartTime >= 0 && class_TA_taking_start_time - curEndTime <= 0) || (class_TA_taking_end_time - curStartTime >= 0 && class_TA_taking_end_time - curEndTime <= 0)){
                                        timeEligible = false;
                                    }
                                }
                            }
                        } 
                    }
                }
                if (timeEligible) {
                    pushClassList(class_list, curTAID, curCRN, curCrse, taHours, enrollment, true, "Eligible");
                }
                else {
                    pushClassList(class_list, curTAID, curCRN, curCrse, taHours, enrollment, false, "Doesn't have the time required to TA for this course");
                }
            }    
        }

        let anyOptions = class_list.find((t) => {
            return(
                t.CRN == curCRN
            )
        });
        if (!anyOptions) { // if no row has been made, this means no TA is eligible, therefore, create row with this information
            const emptyData = {
                CRN: curCRN,
                course_number: curCrse,
                taHours: taHours,
                totalEnrolled: enrollment,
                teacher_assistants: [
                    {
                    able_TA: "No eligible Teacher Assistants",
                    },
                ],
            };
            class_list.push(emptyData);
        }

    }

    console.log(class_list);
    setClassList(class_list);

}

useEffect(() => {
    handleEligibilityList();
    setRunAlg(true)
  }, []);


  return null;

}

export default CreateEligList;