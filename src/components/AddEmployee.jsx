import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import EmployeeService from '../services/EmployeeService'

const addEmployee = () => {
  const [employee , setEmployee] = useState({
    id:"",
    name:"",
    phone:"",
    email:"",
  });

  const handleChange = (e) =>{
    const value = e.target.value;
    setEmployee({...employee , [e.target.name]: value})
  }

  const saveEmployee = (e) =>{
    e.preventDefault();
    EmployeeService.saveEmployee(employee)
    .then((response) => {
      console.log( "saved" ,response);
      navigate("/")
    })
    .catch((error) =>{
      console.log(error);
    })
  }

  const reset = (e) =>{
    e.preventDefault();
    setEmployee({
      id:"",
      name:"",
      phone:"",
      email:"",
    });
  }
  const navigate =useNavigate();
  return (
    <div className='max-w-xl mx-4 sm:mx-40 bg-slate-800 my-20 rounded shadow py-4 px-4 sm:px-8'>
        <div className='text-2xl sm:text-4xl tracking-wider font-bold text-center py-4 px-4 sm:px-8'>
        <p> AddEmployee</p>
        </div>

        
     <div className='mx-4 sm:mx-10 my-2'>
        <input 
        type='text'
        name ='name'
        value ={employee.name}
        onChange={(e) => handleChange(e)}
         className=" w-full py-2 my-2 text-slate-800 text-sm sm:text-base" placeholder='Name'></input>
        <input 
        type='number'
        name ='phone'
        value = {employee.phone}
        onChange={(e) => handleChange(e)}
        className=" w-full py-2 my-2 text-slate-800 text-sm sm:text-base" placeholder='phone'></input>
        <input 
         type ='email'
         name='email'
         value = {employee.email}
         onChange={(e) => handleChange(e)}
        className=" w-full py-2 my-2 text-slate-800 text-sm sm:text-base" placeholder='Email'></input>

        </div>

         <div className='flex flex-col sm:flex-row my-4 space-y-2 sm:space-y-0 space-x-0 sm:space-x-4 px-4 sm:px-20 justify-center'>
        <button 
        onClick={saveEmployee}
        className='bg-green-400 hover:bg-green-700 py-2 px-6 rounded text-sm sm:text-base'>Save</button>
        <button 
        onClick={reset}
        className='bg-blue-400 hover:bg-blue-700 py-2 px-6 rounded text-sm sm:text-base'>Clear</button>
        <button 
        onClick={ ()=> navigate("/")}
        className='bg-red-400 hover:bg-red-700 py-2 px-6 rounded text-sm sm:text-base'>Cancel</button>
        </div>
    </div>
  )
}

export default addEmployee