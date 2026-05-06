import React , {useEffect  , useState} from 'react'
import {useNavigate} from 'react-router-dom'
import EmployeeService from '../services/EmployeeService' ;
const EmpolyList = () => {

  const [loading , setLoading] = useState(true);
  const [employees , setEmployees] = useState([]);

  useEffect(() =>{
    const fetchData =  async()=>{
      setLoading(true);
      try{
        const response = await EmployeeService.getEmployee();
        setEmployees(response.data);
      }catch(error){
        console.log(error);
      }
      setLoading(false);
    };
    fetchData();
 } , []);


    const deleteEmployee = (e, id) => {
    e.preventDefault();
    EmployeeService.deleteEmployeeById(id).then(() => {
      setEmployees((prev) =>
        prev.filter((employee) => employee.id !== id)
      );
    });
  };


   const editEmployee = (e, id) => {
    e.preventDefault();
    navigate(`/editEmployee/${id}`);
  };

    const navigate = useNavigate();
  return (
    <div className="flex flex-col items-center justify-center w-full min-h-screen pt-0">
    <div className =" w-full flex justify-center mb-6">
      <button 
      onClick={()=> navigate("/addEmployee")}
      className = "bg-slate-800 text-white px-6 py-2 rounded shadow-lg hover:bg-slate-700">Add Employee </button>
    </div>

    <div  className= " w-11/12 md: w-3/4 shadow-xl  rounded-lg overflow-hidden ">
      <table className="w-full text-left boader-collapse">
        <thead className="bg-slate-600">
        <th className="px-6 py-3 uppercase tracking-wide"> Name</th>
        <th className="px-8 py-3 uppercase tracking-wide"> Phone</th>
        <th className="px-8 py-3 uppercase tracking-wide"> Email</th>
        <th className="px-8 py-3 uppercase tracking-wide"> Action</th>
        </thead>
        <tbody>
          {!loading && 
          employees.map((employee) => (
          <tr className="hover:bg-white hover:text-black">
          <td className="text-left px-6 py-4 whitespace-nowrap"> {employee.name}</td>
          <td  className="text-left px-6 py-4 whitespace-nowrap"> {employee.phone}</td>
          <td  className="text-left px-6 py-4 whitespace-nowrap"> {employee.email}</td>
            
          <td className="px-8 py-3 uppercase tracking-wide"> 
            <a
              onClick={(e) => editEmployee(e, employee.id)} 
            className = ' hover: text-blue-500 hover:cursor-pointer px-4'  
            >Edit</a>
            <a 
             onClick={(e) => deleteEmployee(e, employee.id)}
            className = ' hover: text-red-500 hover:cursor-pointer px-4'
            >Delete</a>
            </td>
            </tr>
       ))}
          
        </tbody>
        
      </table>
    </div>
    </div>

  );
  };


export default EmpolyList;