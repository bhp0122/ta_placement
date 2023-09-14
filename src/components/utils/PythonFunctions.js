// Reduces Clutter of Stable Marriage Util Functions found in Python but not in JS that I neaded when switching languages // 

//  Remove item in array  //
function removeItemOnce(arr, value) {
	var index = arr.indexOf(value);
	if (index > -1) {
	  arr.splice(index, 1);
	}
	return arr;
}


 // Randomizes Array like .shuffle() in python  //
 function shuffleArray(array) {
	var arr = [...array]
    for (let i = arr.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [arr[i], arr[j]] = [arr[j], arr[i]];
    }
	return arr
}


function randomOneOrMinusOne() {
	if (Math.random() < 0.5) {
		return -1;
	} else {
		return 1;
	}
}

function XOR(a,b) {
	return ( a || b ) && !( a && b );
}
  
function shuffleSegment(arr, start, end = (arr.length-1)) {
	const segment = arr.slice(start, end + 1);
	for (let i = segment.length - 1; i > 0; i--) {
	  const j = Math.floor(Math.random() * (i + 1));
	  [segment[i], segment[j]] = [segment[j], segment[i]];
	}
	arr.splice(start, segment.length, ...segment);
	return arr;
  }

//  Creates courses and Tas based on input lengths for testing  // 
//  Not necessarily a Python function but wont be used in final  //
// function createCourseTas(numCourse, numTas){
// 	let courses = []
// 	let tas = []
// 	let preferred_rankings_men = {}
// 	let preferred_rankings_women = {}
// 	let remaining_hours_men = {}
// 	let remaining_hours_women = {}
// 	for (const i of Array(numCourse).keys())
// 		courses.push('course' + i)
// 	for (const i of Array(numTas).keys())
// 		tas.push('ta'+ i)
	
// 	courses.forEach(course => {
// 		preferred_rankings_men[course] = shuffleArray(tas)
// 		remaining_hours_men[course] = Math.min(20, Math.floor(Math.random() * (6 - 1) + 1) * 5)
// 	})
// 	tas.forEach(ta => {
// 		preferred_rankings_women[ta] = shuffleArray(courses)
// 		remaining_hours_women[ta] = Math.min(20,  Math.floor((Math.random() * (5 - 1) + 1)) * 10)
// 	}) 

// 	return [preferred_rankings_men, preferred_rankings_women, remaining_hours_men, remaining_hours_women]
// }
export {removeItemOnce, shuffleArray, randomOneOrMinusOne, XOR, shuffleSegment}