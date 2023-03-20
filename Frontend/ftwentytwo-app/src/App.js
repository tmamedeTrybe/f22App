/* eslint-disable react/jsx-no-constructed-context-values */
import { Route, Routes } from 'react-router-dom';
import MyProvider from './context/myProvider';
import Hds from './pages/Hds';
import Home from './pages/Home';
import Initial from './pages/Initial';
import Login from './pages/Login';
import NewWedding from './pages/NewWedding';
import Register from './pages/Register';
import WeddingDetail from './pages/WeddingDetail';
import WeddingEdit from './pages/WeddingEdit';
import Weddings from './pages/Weddings';

function App() {
  return (
    <MyProvider>
      <div className="App">
        <Routes>
          <Route path="/" element={ <Initial /> } />
          <Route path="/login" element={ <Login /> } />
          <Route path="/register" element={ <Register /> } />
          <Route path="/home" element={ <Home /> } />
          <Route path="/casamentos/detalhe/:id" element={ <WeddingDetail /> } />
          <Route path="casamentos/detalhe/:id/editar" element={ <WeddingEdit /> } />
          <Route path="/casamentos/novo" element={ <NewWedding /> } />
          <Route path="/casamentos" element={ <Weddings /> } />
          <Route path="/hds" element={ <Hds /> } />
        </Routes>
      </div>
    </MyProvider>
  );
}

export default App;
