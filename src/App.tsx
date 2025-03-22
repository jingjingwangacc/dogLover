import { useState } from 'react'
import { BrowserRouter as Router, Routes, Route} from "react-router-dom";
import Login from "./pages/login";
import Search from "./pages/search";
import './App.css'

function App() {

  return (
    <>
      <Router>
        <Routes> 
          <Route path='/login' element={<Login />} />
          <Route path='/search' element={<Search />} /> 
        </Routes>

      </Router>
    </>
  );
}

export default App
