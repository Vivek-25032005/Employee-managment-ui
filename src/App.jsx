import { useState } from 'react'

import './App.css'
import {BrowserRouter, Routes, Route} from "react-router-dom";
import Navbar from './components/Navbar';
import EmployeeList from './components/EmpolyList';
import AddEmployee from './components/AddEmployee';
import UpdateEmployee from './components/UpdateEmployee';
function App() {
  const [count, setCount] = useState(0)

  return (
    <>
    <BrowserRouter>
   <Navbar/> 

   <Routes>

      
      <Route path ="/" element={<EmployeeList/>}/>
      <Route path ="/AddEmployee" element={<AddEmployee/>}/>

      <Route path = "/editemployee/:id" element = { <UpdateEmployee/>} />
   </Routes>

   </BrowserRouter>
    </>
      
  );
}

export default App
