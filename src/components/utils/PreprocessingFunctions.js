import { shuffleArray, removeItemOnce, randomOneOrMinusOne, XOR, shuffleSegment} from "./PythonFunctions";


function getMeanTAHours(dic) {

	// Filter out the values that are "0"
	const nonZeroValues = Object.values(dic).filter(value => Number(value) !== 0);

	// Parse the non-zero values into numbers
	const nonZeroNumbers = nonZeroValues.map(value => Number(value));
	const mean = nonZeroNumbers.reduce((acc, val) => acc + val, 0) / nonZeroNumbers.length;

	return mean
}

function createCourseHierarchy(c){
	// orders course list by 1900 Labs first then inclass only then by total enrolled
	c.sort((a, b) => {
		if (a.course_number === '1900' && b.age === '1900') {
			return b.totalEnrolled - a.totalEnrolled // sort by name in ascending order
		} else if (a.course_number === '1900') {
			return -1; // a comes before b
		} else if ( b.age === '1900') {
			return 1; // b comes before a
		} else if (a.inClassNeeded === "Y\r" && b.age === '1900') {
			return b.totalEnrolled - a.totalEnrolled 
		} else if (a.inClassNeeded === "Y\r") {
			return -1;
		} else if (b.inClassNeeded === "Y\r") {
			return 1;
		} else {
		  return b.totalEnrolled - a.totalEnrolled; // sort by age in ascending order
		}
	  });	 
}

function sortTAsByHours(t) {
	t.sort((a, b) => {
		return b.taHours - a.taHours
	})
}

function createTAHierarchy(c, course, tas, t){
	// orders preferred list of TAs if ta in able_ta list ranked ahead of others
	// Otherwise orders based on Even or odd in order to assign 15 hours to 15 hours or 5 to 5 or 20 to 20 and finally from highest to least
	tas.sort((a, b) => {
		if (c.find(item => item.CRN === course).teacher_assistants.some(item => item.able_map === a) && c.find(item => item.CRN === course).teacher_assistants.some(item => item.able_map === b)){
			// return t.find(item => item.uuid === b).taHours - t.find(item => item.uuid === a).taHours
			const a_hours_even = t.find(item => item.uuid === a).taHours % 2 == 0
			const b_hours_even = t.find(item => item.uuid === b).taHours % 2 == 0
			const check_even = c.find(item => item.CRN === course).taHours % 2 == 0
			if (!XOR(a_hours_even, check_even) && !XOR(b_hours_even, check_even)){
				return t.find(item => item.uuid === b).taHours - t.find(item => item.uuid === a).taHours;
			} else if(!XOR(a_hours_even, check_even)){
				return -1;
			} else if (!XOR(b_hours_even, check_even)){
				return 1;
			}
			return t.find(item => item.uuid === b).taHours - t.find(item => item.uuid === a).taHours;
		} else if (c.find(item => item.CRN === course).teacher_assistants.some(item => item.able_map === a)){
			return -1;
		} else if (c.find(item => item.CRN === course).teacher_assistants.some(item => item.able_map === b)){
			return 1;
		} else {
			const a_hours_even = t.find(item => item.uuid === a).taHours % 2 == 0
			const b_hours_even = t.find(item => item.uuid === b).taHours % 2 == 0
			const check_even = c.find(item => item.CRN === course).taHours % 2 == 0
			if (!XOR(a_hours_even, check_even) && !XOR(b_hours_even, check_even)){
				return t.find(item => item.uuid === b).taHours - t.find(item => item.uuid === a).taHours;
			} else if(!XOR(a_hours_even, check_even)){
				return -1;
			} else if (!XOR(b_hours_even, check_even)){
				return 1;
			}
			return t.find(item => item.uuid === b).taHours - t.find(item => item.uuid === a).taHours;
		}
	})
	return tas;
}

function createCourseHierarchyForTA(ta, c, courses){

	courses.sort((a, b) => {
		if (c.find(item => item.CRN === a).teacher_assistants.some(item => item.able_map === ta) && c.find(item => item.CRN === b).teacher_assistants.some(item => item.able_map === ta)){
			// if both in ta list, randomize
			return randomOneOrMinusOne();
		} else if (c.find(item => item.CRN === a).teacher_assistants.some(item => item.able_map === ta)){
			return -1;
		} else if (c.find(item => item.CRN === b).teacher_assistants.some(item => item.able_map === ta)){
			return 1;
		}
	})
	return courses
}


export {createCourseHierarchy, createCourseHierarchyForTA, createTAHierarchy, sortTAsByHours, getMeanTAHours}