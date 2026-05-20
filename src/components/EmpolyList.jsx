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
    <div className="flex flex-col items-center justify-start w-full min-h-screen py-8 px-4 sm:px-6 lg:px-8 bg-slate-100">
      <div className="w-full max-w-4xl mb-6">
        <div className="rounded-3xl bg-white shadow-2xl border border-slate-200 p-6 sm:p-8">
          <div className="flex flex-col sm:flex-row sm:items-end sm:justify-between gap-4">
            <div>
              <p className="text-sm font-semibold uppercase tracking-[0.3em] text-slate-500">Employee Dashboard</p>
              <h1 className="mt-2 text-3xl sm:text-4xl font-extrabold text-slate-900">Your Saved Employees</h1>
              <p className="mt-2 text-sm sm:text-base text-slate-600 max-w-2xl">
                Only your own records are visible here. Use search to find a specific employee by name or ID.
              </p>
            </div>
            <button
              onClick={() => navigate("/addEmployee")}
              className="inline-flex items-center justify-center rounded-full bg-slate-900 px-6 py-3 text-sm sm:text-base font-semibold text-white shadow-lg shadow-slate-300/50 transition hover:bg-slate-700"
            >
              Add Employee
            </button>
          </div>

          <div className="mt-6 grid gap-3 sm:grid-cols-[1fr_auto_auto] items-end">
            <div className="sm:col-span-1">
              <label className="block text-sm font-semibold text-slate-700 mb-2">Search by name or ID</label>
              <input
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                onKeyDown={(e) => e.key === "Enter" && handleSearch()}
                className="w-full rounded-2xl border border-slate-300 bg-slate-50 px-4 py-3 text-sm font-semibold text-slate-900 outline-none transition focus:border-slate-500 focus:ring-2 focus:ring-slate-200"
                placeholder="Type name or ID..."
              />
            </div>
            <button
              onClick={handleSearch}
              className="rounded-2xl bg-slate-900 px-5 py-3 text-sm font-semibold text-white transition hover:bg-slate-700"
            >
              Search
            </button>
            <button
              onClick={clearSearch}
              className="rounded-2xl border border-slate-300 bg-white px-5 py-3 text-sm font-semibold text-slate-700 transition hover:bg-slate-50"
            >
              Clear
            </button>
          </div>
        </div>
      </div>

      <div className="w-full max-w-4xl shadow-2xl rounded-3xl overflow-hidden border border-slate-200 bg-white">
        <table className="w-full text-left border-collapse min-w-max">
          <thead className="bg-slate-900 text-white">
            <tr>
              <th className="px-5 py-4 text-sm font-semibold uppercase tracking-wide">Name</th>
              <th className="px-5 py-4 text-sm font-semibold uppercase tracking-wide">Phone</th>
              <th className="px-5 py-4 text-sm font-semibold uppercase tracking-wide">Email</th>
              <th className="px-5 py-4 text-sm font-semibold uppercase tracking-wide">Action</th>
            </tr>
          </thead>
          <tbody>
            {!loading && filteredEmployees.length > 0 ? (
              filteredEmployees.map((employee) => (
                <tr key={employee.id} className="border-b border-slate-200 last:border-b-0 hover:bg-slate-50">
                  <td className="px-5 py-4 text-sm font-semibold text-slate-900">{employee.name}</td>
                  <td className="px-5 py-4 text-sm font-semibold text-slate-900">{employee.phone}</td>
                  <td className="px-5 py-4 text-sm font-semibold text-slate-900">{employee.email}</td>
                  <td className="px-5 py-4 text-sm font-medium text-slate-700 space-x-2">
                    <button
                      onClick={(e) => editEmployee(e, employee.id)}
                      className="rounded-full px-3 py-1 text-slate-900 transition hover:bg-slate-100"
                    >
                      Edit
                    </button>
                    <button
                      onClick={(e) => deleteEmployee(e, employee.id)}
                      className="rounded-full px-3 py-1 text-red-600 transition hover:bg-red-50"
                    >
                      Delete
                    </button>
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan="4" className="px-5 py-8 text-center text-sm text-slate-500">
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