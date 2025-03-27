import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Login from "./pages/login";
import Search from "./pages/search";
import './App.css'
import theme from './theme/theme';
import { ThemeProvider } from '@mui/material/styles';

function App() {
  const baseName = '/doglover';

  return (
    <>
      <ThemeProvider theme={theme}>
        <Router basename={baseName}>
          <Routes>
            <Route path='/' element={<Login />} />
            <Route path='/search' element={<Search />} />
          </Routes>

        </Router>
      </ThemeProvider>
    </>
  );
}

export default App
