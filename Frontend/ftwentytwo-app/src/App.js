/* eslint-disable react/jsx-no-constructed-context-values */
import { Route, Routes } from 'react-router-dom';
import MyProvider from './context/myProvider';
import Home from './pages/Home';
import Login from './pages/Login';
import Register from './pages/Register';
import WeddingDetail from './pages/WeddingDetail';
import Weddings from './pages/Weddings';

function App() {
  return (
    <MyProvider>
      <div className="App">
        <Routes>
          <Route path="/" element={ <p>Pagina inicial</p> } />
          <Route path="/login" element={ <Login /> } />
          <Route path="/register" element={ <Register /> } />
          <Route path="/home" element={ <Home /> } />
          <Route path="/casamentos/detalhe/:id" element={ <WeddingDetail /> } />
          <Route path="/casamentos" element={ <Weddings /> } />
        </Routes>
      </div>
    </MyProvider>
  );
}

export default App;
