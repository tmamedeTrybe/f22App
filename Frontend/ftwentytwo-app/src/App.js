import { Route, Routes } from 'react-router-dom';
import Casamentos from './pages/Casamentos';
import Home from './pages/Home';
import Login from './pages/Login';
import Register from './pages/Register';

function App() {
  return (
    <div className="App">
      <Routes>
        <Route path="/" element={ <p>Pagina inicial</p> } />
        <Route path="/login" element={ <Login /> } />
        <Route path="/register" element={ <Register /> } />
        <Route path="/home" element={ <Home /> } />
        <Route path="casamentos" element={ <Casamentos /> } />
      </Routes>
    </div>
  );
}

export default App;
