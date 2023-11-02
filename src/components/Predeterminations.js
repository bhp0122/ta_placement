import { useState } from 'react'
import 'bootstrap/dist/css/bootstrap.css';


function Predeterminations(props){

	const {courses, tas, setpredet, setRunAlg, setPredeterminations} = props

	const course_array = courses.map(item => item.CRN).sort((a, b) => a-b);
	const ta_array = tas.map(item => item.uuid)
	const [count, setCount] = useState(1)
	const predeterminations = []

	function course_name(course){
		const current_course = courses.find(c => c.CRN === course);
		const course_name = 'COMP ' + current_course.course_number;
		return course_name;
	}
	
	function handleTA(event) {
		const id = Number(event.target.id.replace(/\D/g, ''))
		const parent = event.target.parentElement
		// if change newest selection row; dont add more if changing previous dropdowns
		if(count == (id+1) && (parent.querySelector('#ta' + id).value != 0 && parent.querySelector('#course' + id).value != 0 ))
			parent.querySelector('#hours'+id).style.visibility='visible'
	}

	function allotHours(event) {
		const id = Number(event.target.id.replace(/\D/g, ''))
		// if change newest selection row; dont add more if changing previous dropdowns
		if(count == (id+1)){
			setCount(count + 1)
		}
	}

	function enter(event) {
		setpredet(false)
		window.alert("The Algoirthm Could Take a Couple Minutes")
		const parent = event.target.parentElement.parentElement
		for (var i = 0; i < count-1; i++){
			predeterminations.push([[parent.querySelector('#course'+i).value, parent.querySelector('#ta'+i).value], Number(parent.querySelector('#hours'+i).value)])
		}
		setPredeterminations(predeterminations)
		console.log(predeterminations)
		setRunAlg(true)
	}



	function prereq_select(id){


		return	<div id={'predeter'+id} style={{display:'flex', justifyContent: 'space-evenly', margin:'5px'}}>
			<select id={'course'+id} className='form-select' style={{width:'20%', float:'left'}} onChange={handleTA}>
				<option value={0}>--- Course by CRN ---</option>
				{course_array.map(course => <option value={course}>{course_name(course)} {course}</option>)}
			</select>
			
			<select id={'ta'+id} className='form-select' onChange={handleTA} style={{width:'20%', float:'left'}}>
				<option value={0}>--- TA by UUID ---</option>
				{ta_array.map(ta => <option value={ta}>{tas.find(t => t.uuid === ta).firstName + " " + tas.find(t => t.uuid === ta).lastName }: {tas.find(t => t.uuid === ta).taHours} </option>)}
			</select>

			<select id={'hours'+id} onChange={allotHours} className='form-select' style={{width:'20%', float:'left', visibility:'hidden'}}>
				<option key='Default' value={0}>--- Allot Hours ---</option>
				<option key={5} value={5}>5 hours</option>
				<option key={10} value={10}>10 hours</option>
				<option key={15} value={15}>15 hours</option>
				<option key={20} value={20}>20 hours</option>
			</select>
		</div>

	} 


	return (

		<div className='border' tyle={{width:'80%' , justifyContent:'center'}}>
			<h1 style={{textAlign:'center' }}> Pre Determinations </h1>

			{[...Array(count)].map((value, index) => (
				prereq_select(index)
			))}

			<div className='border' style={{ display:'flex', justifyContent: 'space-evenly', margin:'2vh'}}>
				<button onClick={enter} type='button' className='btn btn-primary'>Make Assignments</button>
			</div>
		</div>

	)
}


export default Predeterminations;