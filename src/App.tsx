import { BrowserRouter as Router, Routes, Route} from "react-router-dom";
import Login from "./pages/login";
import Search from "./pages/search";
import Match from "./pages/match";
import './App.css'

function App() {

  return (
    <>
      <Router>
        <Routes> 
          <Route path='/' element={<Login />} />
          <Route path='/search' element={<Search />} /> 
          <Route path='/match/:id' element={<Match />} /> 
        </Routes>

      </Router>
    </>
  );
}

export default App
