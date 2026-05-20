import React , {useEffect  , useState} from 'react'
import {useNavigate} from 'react-router-dom'
import EmployeeService from '../services/EmployeeService' ;
const EmployeeList = () => {

  const [loading , setLoading] = useState(true);
  const [employees , setEmployees] = useState([]);
  const [query, setQuery] = useState("");
  const [searchTerm, setSearchTerm] = useState("");

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

  const handleSearch = () => {
    setSearchTerm(query.trim());
  };

  const clearSearch = () => {
    setQuery("");
    setSearchTerm("");
  };

  const navigate = useNavigate();
  const currentUserEmail = localStorage.getItem("userEmail") || "";

  const filteredEmployees = employees.filter((employee) => {
    if (currentUserEmail && employee.email !== currentUserEmail) return false;
    if (!searchTerm) return true;
    const lowerQuery = searchTerm.toLowerCase();
    return (
      employee.name.toLowerCase().includes(lowerQuery) ||
      String(employee.id).includes(lowerQuery)
    );
  });

  return (
    <div className="flex flex-col items-center justify-center w-full min-h-screen pt-0 px-4">
      <div className="w-full max-w-4xl flex flex-col sm:flex-row items-center justify-between mb-6 gap-3">
        <div className="flex flex-1 flex-col sm:flex-row items-center gap-2 w-full">
          <input
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            onKeyDown={(e) => e.key === "Enter" && handleSearch()}
            className="flex-1 min-w-0 border border-slate-300 rounded px-3 py-2 text-slate-900 text-sm sm:text-base"
            placeholder="Search by name or ID"
          />
          <button
            onClick={handleSearch}
            className="bg-slate-800 text-white px-4 py-2 rounded shadow-lg hover:bg-slate-700 text-sm sm:text-base"
          >
            Search
          </button>
          <button
            onClick={clearSearch}
            className="bg-slate-500 text-white px-4 py-2 rounded shadow-lg hover:bg-slate-400 text-sm sm:text-base"
          >
            Clear
          </button>
        </div>
        <button
          onClick={() => navigate("/addEmployee")}
          className="bg-slate-800 text-white px-6 py-2 rounded shadow-lg hover:bg-slate-700 text-sm sm:text-base"
        >
          Add Employee
        </button>
      </div>

    <div  className= " w-full max-w-4xl shadow-xl rounded-lg overflow-hidden overflow-x-auto">
      <table className="w-full text-left border-collapse min-w-max">
        <thead className="bg-slate-600">
          <tr>
            <th className="px-4 sm:px-6 py-3 uppercase tracking-wide text-xs sm:text-sm">Name</th>
            <th className="px-4 sm:px-8 py-3 uppercase tracking-wide text-xs sm:text-sm">Phone</th>
            <th className="px-4 sm:px-8 py-3 uppercase tracking-wide text-xs sm:text-sm">Email</th>
            <th className="px-4 sm:px-8 py-3 uppercase tracking-wide text-xs sm:text-sm">Action</th>
          </tr>
        </thead>
        <tbody>
          {!loading && filteredEmployees.length > 0 ? (
            filteredEmployees.map((employee) => (
              <tr key={employee.id} className="hover:bg-white hover:text-black">
                <td className="text-left px-4 sm:px-6 py-4 whitespace-nowrap text-xs sm:text-sm">{employee.name}</td>
                <td className="text-left px-4 sm:px-6 py-4 whitespace-nowrap text-xs sm:text-sm">{employee.phone}</td>
                <td className="text-left px-4 sm:px-6 py-4 whitespace-nowrap text-xs sm:text-sm">{employee.email}</td>
                <td className="px-4 sm:px-8 py-3 uppercase tracking-wide text-xs sm:text-sm">
                  <a
                    onClick={(e) => editEmployee(e, employee.id)}
                    className='hover:text-blue-500 hover:cursor-pointer px-2 sm:px-4'
                  >
                    Edit
                  </a>
                  <a
                    onClick={(e) => deleteEmployee(e, employee.id)}
                    className='hover:text-red-500 hover:cursor-pointer px-2 sm:px-4'
                  >
                    Delete
                  </a>
                </td>
              </tr>
            ))
          ) : (
            <tr>
              <td colSpan="4" className="px-4 py-6 text-center text-sm text-slate-600">
                {loading ? "Loading employees..." : "No records found for your account."}
              </td>
            </tr>
          )}
        </tbody>
        
      </table>
    </div>
    </div>

  );
  };


export default EmployeeList;