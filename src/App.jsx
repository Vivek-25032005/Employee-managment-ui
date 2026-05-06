import { useState } from 'react'

import './App.css'
import {BrowserRouter, Routes, Route} from "react-router-dom";
import Navbar from './components/Navbar';
import EmpolyList from './components/EmpolyList';
import AddEmployee from './components/AddEmployee';
import UpdateEmployee from './components/UpdateEmployee';
function App() {
  const [count, setCount] = useState(0)

  return (
    <>
    <BrowserRouter>
   <Navbar/> 

   <Routes>

      
      <Route path ="/" element={<EmpolyList/>}/>
      <Route path ="/AddEmployee" element={<AddEmployee/>}/>

      <Route path = "/editemployee/:id" element = { <UpdateEmployee/>} />
   </Routes>

   </BrowserRouter>
    </>
      
  );
}

export default App
