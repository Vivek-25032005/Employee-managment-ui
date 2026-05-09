import axios from 'axios'

const EMPLOYEE_S_API_BASE_URL ="https://employee-managment-api-production.up.railway.app/employees"
const AUTH_API_BASE_URL ="https://employee-managment-api-production.up.railway.app/users"

class EmployeeService{
  saveEmployee(employee){
    return axios.post( EMPLOYEE_S_API_BASE_URL , employee)
}
getEmployee(){
    return axios.get( EMPLOYEE_S_API_BASE_URL )
}

getEmployeeById(id){
    return axios.get( EMPLOYEE_S_API_BASE_URL +"/"+id )
}

deleteEmployeeById(id){
    return axios.delete( EMPLOYEE_S_API_BASE_URL +"/"+id )
}

updateEmployee(employee,id){
    return axios.put( EMPLOYEE_S_API_BASE_URL +"/"+id , employee )
}

// Authentication methods
login(credentials){
    return axios.post(AUTH_API_BASE_URL + "/login", credentials)
}

register(userData){
    return axios.post(AUTH_API_BASE_URL + "/register", userData)
}
}

export default new EmployeeService();