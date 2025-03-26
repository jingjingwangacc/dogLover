import { BrowserRouter as Router, Routes, Route} from "react-router-dom";
import Login from "./pages/login";
import Search from "./pages/search";
import Match from "./pages/match";
import './App.css'
import theme from './theme/theme';
import { ThemeProvider } from '@mui/material/styles';

function App() {

  return (
    <>
      <ThemeProvider theme={theme}>
      <Router>
        <Routes> 
          <Route path='/' element={<Login />} />
          <Route path='/search' element={<Search />} /> 
          <Route path='/match/:id' element={<Match />} /> 
        </Routes>

      </Router>
      </ThemeProvider>
    </>
  );
}

export default App
