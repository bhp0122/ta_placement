import React from "react";
import { useState, useEffect } from "react";
import { shuffleArray, removeItemOnce, randomOneOrMinusOne, XOR, shuffleSegment} from "./utils/PythonFunctions";
import { getMeanTAHours, createCourseHierarchy, createCourseHierarchyForTA, createTAHierarchy, sortTAsByHours } from "./utils/PreprocessingFunctions"
import 'bootstrap/dist/css/bootstrap.css';
import { saveAs } from 'file-saver';
import './AllClassesCSV.css';

// Handles the displays for each of the layout options
import ColbyCol from "./layoutHandlers/ColbyCol";
import SidebySide from "./layoutHandlers/SidebySide";
import OnlySchedLayout from "./layoutHandlers/OnlySchedLayout";
import { OnlyConflictsLayout } from "./layoutHandlers/OnlyConflictsLayout";
// Routing in order to switch user from one page to another (one layout to another). 
import { BrowserRouter as Router, Routes, Route, Link } from "react-router-dom";


function StableMarriage(props) {

const ITERATIONS = 10000 // 20000
const AUDIBLE_COUNT = 300

// Contains a list of all matches made by algorithm //
let total_matches = []

// Schedule // 
let schedule = {}

var history = []

console.log(props)
const {courses, tas, predeterminations} = props
const setProgress = props.setProgress

// Courses // 
var preferred_rankings_men = {}

// Course Hours //
let remaining_hours_men = {}

// TAs //
var preferred_rankings_women = {}

// TA hours //
let remaining_hours_women = {}

// Keeps track of tentative Matches //
let tentative_engagements = []

// Courses waiting for TA assignment //
let free_men = []



//  Runs Algorithm  //
function stable_matching(){
	while(free_men.length > 0){
		free_men.forEach(man => begin_matching(man))
	}
}

function createCourseTas(c, t){
	createCourseHierarchy(c)
	sortTAsByHours(t)
	// console.log(c)
	let courses = c.map(item => item.CRN);
	let tas = t.map(item => item.uuid)
	let preferred_rankings_men = {}
	let preferred_rankings_women = {}
	let remaining_hours_men = {}
	let remaining_hours_women = {}
	
	courses.forEach(course => {
		const num_elig_tas = c.find(item => item.CRN === course).teacher_assistants.length
		// preferred_rankings_men[course] = createTAHierarchy(c, course, tas, t)
		preferred_rankings_men[course] = shuffleSegment(shuffleSegment(createTAHierarchy(c, course, tas, t), 0, num_elig_tas-1), num_elig_tas)
		// console.log(course + " Hours: " + c.find(item => item.CRN === course).taHours + ", " + preferred_rankings_men[course].map(item => t.find(i => i.uuid === item).taHours))
		remaining_hours_men[course] = Number(c.find(item => item.CRN === course).taHours)
	})
	tas.forEach(ta => {
		preferred_rankings_women[ta] = createCourseHierarchyForTA(ta, c, courses)
		remaining_hours_women[ta] = Number(t.find(item => item.uuid === ta).taHours)
	}) 

	return [preferred_rankings_men, preferred_rankings_women, remaining_hours_men, remaining_hours_women]
}


// Resets Available Courses (yet to be matched tentatively or otherwise) //
function init_free_men(){
	for (const course in preferred_rankings_men) {
		if (remaining_hours_men[course] > 0)
			free_men.push(course)
	}
} 

// Stable Matching Algorithm // 
function begin_matching(man){

	preferred_rankings_men[man].every(woman =>{
		// Boolean for whether ta is taken or not //
		var taken_match = []
		tentative_engagements.forEach(couple => {
			if (couple.includes(woman))
				taken_match.push(couple)
		})
		
		if (taken_match.length === 0){
			tentative_engagements.push([man, woman])
			free_men = removeItemOnce(free_men, man)
			return false;
		} else if (taken_match.length > 0){
			const current_course = preferred_rankings_women[woman].indexOf(taken_match[0][0])
			const potential_course = preferred_rankings_women[woman].indexOf(man)

			if (current_course >= potential_course){
				free_men = removeItemOnce(free_men, man)
				free_men.push(taken_match[0][0])
				taken_match[0][0] = man
				return false;
			}
		}
		return true;
	})
}

//  Removes assigned hours from remaining hours  //
function allot_hours(matches, predet){
	const mean = getMeanTAHours(remaining_hours_women)
	// console.log("Mean: " + mean + " -----------")

	matches.forEach(course_ta => {
		var course, ta, course_hours, ta_hours
		if (!predet){
			var course = course_ta[0]
			var ta = course_ta[1]
			var course_hours = Number(remaining_hours_men[course])
			var ta_hours = Number(remaining_hours_women[ta])
		}else{
			var course = course_ta[0][0]
			var ta = course_ta[0][1]
			var course_hours = Number(remaining_hours_men[course])
			var ta_hours = Math.min(course_ta[1], Number(remaining_hours_women[ta]))
		}
		// console.log(course + " -" + course_hours + "- " + ta + "_" + ta_hours)
		if ((Number(ta_hours) < Number(course_hours)) && !predet){
			// console.log("\t" + course + ":: "+ ta+ "_" + ta_hours + ": " + course_hours + " ||| Mean-10: " + (mean-10))
			if (ta_hours < (mean-10)){
				// console.log("\t"+ ta_hours + " : Mean:" + mean)
				ta_hours = 0
			}

		}
		var hours_alloted = Math.min(course_hours, ta_hours)
		// console.log("\t HA: " + hours_alloted)
		remaining_hours_men[course] -= hours_alloted
		remaining_hours_women[ta] -= hours_alloted
		if (hours_alloted != 0)
			total_matches.push([[course, ta], hours_alloted])
	})
	
}

//  Removes TAs and Courses if they are out of hours  //
function remove_tas(){
	free_men.forEach(course => {
		var temp_array = [...preferred_rankings_men[course]]
		preferred_rankings_men[course].forEach(ta => {		
			if (remaining_hours_women[ta] === 0)
				temp_array = removeItemOnce(temp_array, ta)
		})
		preferred_rankings_men[course] = temp_array
	})

	preferred_rankings_men[free_men[0]].forEach(ta => {
		var temp_array = [...preferred_rankings_women[ta]]
		preferred_rankings_women[ta].forEach(course => {
			if (!free_men.includes(course))
				temp_array = removeItemOnce(temp_array, course)
		})
		preferred_rankings_women[ta] = temp_array
	})
}

//  Adds dummie Tas or Courses to account for the restrictionn of the algorthim of tas and courses having to be the same length  //
function add_dummies(){
	if (free_men.length < preferred_rankings_men[free_men[0]].length){
		const difference = preferred_rankings_men[free_men[0]].length - free_men.length
		for (let i of Array(difference).keys()) {
			const dummy = 'dummy' + i
			preferred_rankings_men[dummy] = [...preferred_rankings_men[free_men[i]]].reverse()
			remaining_hours_men[dummy] = 0
			free_men.push(dummy)
			// for(let i = 0; i < preferred_rankings_men[free_men[0]].length; i++)
			// 	preferred_rankings_women[preferred_rankings_men[free_men[0]][i]].push(dummy)
			preferred_rankings_men[free_men[0]].forEach(ta => preferred_rankings_women[ta].push(dummy))
		}
	}else if ((free_men.length > preferred_rankings_men[free_men[0]].length) && (preferred_rankings_men[free_men[0]].length > 0)){
		const difference = free_men.length - preferred_rankings_men[free_men[0]].length
		for (let i of Array(difference).keys()) {
			const dummy = 'dummy' + i
			preferred_rankings_women[dummy] = [...preferred_rankings_women[preferred_rankings_men[free_men[0]][i]]].reverse()
			remaining_hours_women[dummy] = 0
			// for (let i=0; i < free_men.length; i++){
			// 	preferred_rankings_men[free_men[0]].push(dummy)
			// }
			free_men.forEach(course => preferred_rankings_men[course].push(dummy))
		}
	}
}

//  Checks to see if all TAs or All Courses are out of hours  //
function check_done(){
	var ta_check = true
	var course_check = true
	for (const ta in preferred_rankings_women){
		if (remaining_hours_women[ta] > 0)
			ta_check = false
	}

	for (const course in preferred_rankings_men){
		if (remaining_hours_men[course] > 0)
			course_check = false
	}

	return (ta_check || course_check)
}

//  Prints Schedule  //
function make_schedule(){
	var sched = {}
	total_matches.forEach(m => {
		// m is [[course, ta], hours_alloted]
		if (!(m[0][0] in sched))
			sched[m[0][0]] = []
		if (!m[0][0].includes('dummy') && !m[0][1].includes('dummy'))
			sched[m[0][0]].push([m[0][1], m[1]])
	})
	for (var course in sched){
		// schedule[course].forEach(x => setTentSchedule(a += '[' + x + ']'))
		//   FILLS Dictionary for Table   // 
		while(sched[course].length < 2){
			sched[course].push(['', ''])
		}
	}
	return sched;
}

//  Runs entire algorithm  //
function run_all() {
	let comp = 100
	let compl = []
	let count = 0
	let current_matches = []
	let remaining_hours = {}
	for(var i = 0; i < ITERATIONS; i++){
		[preferred_rankings_men, preferred_rankings_women, remaining_hours_men, remaining_hours_women] = createCourseTas(courses, tas)

		free_men = []
		total_matches = []
		init_free_men()
		tentative_engagements = [...new Set([...predeterminations, ...current_matches])]
		allot_hours(tentative_engagements, true)
		tentative_engagements = []
		add_dummies()


		while ((!check_done()) && (free_men.length > 0)){
			stable_matching()
			allot_hours(tentative_engagements, false)
			tentative_engagements = []
			init_free_men()
			if ((free_men.length > 0) && (preferred_rankings_men[free_men[0]].length > 0)){
				remove_tas()
				add_dummies()
			}
		}
		
		// Why is make_schedule called twice?
		const [complications, working_matches] = validate_schedule(make_schedule(), courses)
		if (complications.length < comp){
			schedule = make_schedule()
			compl = complications
			comp = compl.length
			current_matches = working_matches
			count = 0
			remaining_hours = {...remaining_hours_men}
		} else if (count >= AUDIBLE_COUNT){
			history.push([schedule, compl, comp, remaining_hours])
			comp = 100
			current_matches = []
			remaining_hours = {}
			count = 0
		}
		console.log(compl.length);
		count+=1;
	}
	history.sort((a,b) => a[2] - b[2])
	schedule = history[0][0]
	console.log(history)
	console.log(schedule)

}

function validate_schedule(schedule, courses){
	var complications = []
	var working_matches = []
	for (let course in schedule){

		const l = schedule[course].length;
		if (l >= 3)
			complications.push([course, "", "", "", "This course has " + l + " TAs"])
		for (var i = 0; i < l; i++){
			if (schedule[course][i][0] === '')
				continue;
			const current_course = courses.find(c => c.CRN === course)

			let course_ta = current_course.teacher_assistants.find(item => item.TAID === schedule[course][i][0]);
			if (!course_ta.able) {	
				let curTA_uuid = schedule[course][i][0];
				let curTA = tas.find(t => t.uuid === curTA_uuid);
				let reasons = course_ta.reason;
				// Changed complications from having only one index to having multiple indices for easibility in retrieving information
				complications.push([course, curTA_uuid, curTA.firstName, curTA.lastName, reasons])
			}
			else {
				working_matches.push([[course, schedule[course][i][0]],schedule[course][i][1]])
			}
		}
	}
	return [complications, working_matches];
}

// Adding course name 
function course_name(course){
	const current_course = courses.find(c => c.CRN === course);
    const course_name = 'COMP ' + current_course.course_number;
	return course_name;
}

[preferred_rankings_men, preferred_rankings_women, remaining_hours_men, remaining_hours_women] = createCourseTas(courses, tas)
run_all()

function convertToCSV(schedule, remaining_hours_men) {
    const rows = [];
	let headers = "Course,Remaining Hours,TA 1,TA 1 Hours,TA 2,TA 2 Hours,TA 3, TA 3 Hours,,Eligible TAs";

	
	console.log(schedule);
	console.log(courses[0].teacher_assistants)
    Object.keys(schedule).forEach((course) => {
		if ( schedule[course].length >= 3 ){
			rows.push([        
				course,        
				remaining_hours_men[course],
				schedule[course][0][0],
				schedule[course][0][1],
				schedule[course][1][0],
				schedule[course][1][1],
				schedule[course][2][0],
				schedule[course][2][1],	
				'|',			
			].concat(courses.find(c => c.CRN === course).teacher_assistants.map(t => t.able_map).sort())
			);
		}else{
			rows.push([        
				course,        
				remaining_hours_men[course],
				schedule[course][0][0],
				schedule[course][0][1],
				schedule[course][1][0],
				schedule[course][1][1],
				'',
				'',
				'|',
			].concat(courses.find(c => c.CRN === course).teacher_assistants.map(t => t.able_map).sort())
			);
		}
    });
	

	//const csv = headers + '\n' + Object.entries(obj).map(([key, value]) => Object.values(value).join(',')).join('\n');
	const csv = headers + '\n' + rows.map((row) => row.join(',')).join('\n');
	return csv;
  }

function downloadCSV(csvData, fileName) {
	const blob = new Blob([csvData], { type: 'text/csv;charset=utf-8;' });
	saveAs(blob, fileName);
  }
  
function handleDownload(event) {
	const csv = convertToCSV(history[event.target.value][0], history[event.target.value][3]);
	downloadCSV(csv, 'schedule' + event.target.value + '.csv');
}


return (
	<div>
		{/* Specifies the destination corressponding to each layout, so that the user can access the layout */}
		<Router>
			{/* Presented on the side within a sidebar for easy access, and to keep the necessary tools */}
			<div class="w3-sidebar w3-bar-block w3-border" style={{width: "10%", height: "auto", position: "relative", float: "left", left: 10}}>
					{/* Links the user can click to the layout */}
					<Link to="/" class="w3-bar-item w3-button w3-border-bottom">Column View</Link>
					<Link to="/side_view" class="w3-bar-item w3-button w3-border-bottom">Side View</Link>
					<Link to="/schedules" class="w3-bar-item w3-button w3-border-bottom">Schedules</Link>
					<Link to="/conflicts" class="w3-bar-item w3-button w3-border-bottom ">Conflicts</Link>

					<br></br>

					<button value={0} class="w3-bar-item w3-button w3-border-bottom" style={{alignContent:"left"}} onClick={handleDownload}>Download Report 1</button>
					<button value={1} class="w3-bar-item w3-button w3-border-bottom" style={{alignContent:"left"}} onClick={handleDownload}>Download Report 2</button>
					<button value={2} class="w3-bar-item w3-button w3-border-bottom" style={{alignContent:"left"}} onClick={handleDownload}>Download Report 3</button>		
			</div>

			<div class="container" style={{left: 0}}>
				{/* Reference layoutHandlers folder that contains each of the layouts and their functions. */}
				<Routes>
					{console.log(tas)}
					<Route path="/" element={ <ColbyCol taList={tas} coursesList={courses} reportOne={history[0]} reportTwo={history[1]} reportThree={history[2]}/> }></Route>
					<Route path="/side_view" element={ <SidebySide taList={tas} coursesList={courses} reportOne={history[0]} reportTwo={history[1]} reportThree={history[2]}/> }></Route>
					<Route path="/schedules" element={ <OnlySchedLayout taList={tas} coursesList={courses} scheduleOne={history[0][0]} scheduleTwo={history[1][0]} scheduleThree={history[2][0]} /> }></Route>
					<Route path="/conflicts" element={ <OnlyConflictsLayout taList={tas} coursesList={courses} conflictsOne={history[0][1]} conflictsTwo={history[1][1]} conflictsThree={history[2][1]} /> }></Route>
				</Routes>
			</div>
		</Router>
	</div>
);
}

export default StableMarriage;