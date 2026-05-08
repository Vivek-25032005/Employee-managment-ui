import React, { useState  , useEffect} from 'react'
import { useNavigate , useParams } from 'react-router-dom'
import EmployeeService from '../services/EmployeeService'

const UpdateEmployee = () => {


   const{id} = useParams();
  const navigate =useNavigate();
  const [employee , setEmployee] = useState({
    id:id,
    name:"",
    phone:"",
    email:"",
  });

  const handleChange = (e) =>{
    const value = e.target.value;
    setEmployee({...employee , [e.target.name]: value})
  }

   useEffect(() => {
  const fetchData = async () => {
    try {
      const response = await EmployeeService.getEmployeeById(id);
      setEmployee(response.data);
    } catch (error) {
      console.log(error);
    }
  };
  fetchData();
}, [id]);

 const UpdateEmployeeHandler = (e) => {
  e.preventDefault();

  EmployeeService.updateEmployee(employee, id)
    .then((response) => {
      console.log("saved", response);
      navigate("/");
    })
    .catch((error) => {
      console.log(error);
    });
};
 
 
  return (
    <div className='max-w-xl mx-4 sm:mx-40 bg-slate-800 my-20 rounded shadow py-4 px-4 sm:px-8'>
        <div className='text-2xl sm:text-4xl tracking-wider font-bold text-center py-4 px-4 sm:px-8'>
        <p> Update Employee</p>
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
        onClick={UpdateEmployeeHandler}
        className='bg-green-400 hover:bg-green-700 py-2 px-6 rounded text-sm sm:text-base'>Update</button>
        
        <button 
        onClick={ ()=> navigate("/")}
        className='bg-red-400 hover:bg-red-700 py-2 px-6 rounded text-sm sm:text-base'>Cancel</button>
        </div>
    </div>
  )
}

export default UpdateEmployee