/* eslint-disable react/jsx-no-constructed-context-values */
import { Route, Routes } from 'react-router-dom';
import MyProvider from './context/myProvider';
import Corporate from './pages/Corporate';
import CorporateDetail from './pages/CorporateDetail';
import Family from './pages/Family';
import FamilyDetail from './pages/FamilyDetail';
import FamilyEdit from './pages/FamilyEdit';
import FamilyImage from './pages/FamilyImage';
import HdDetails from './pages/HdDetails';
import Hds from './pages/Hds';
import HdUpdate from './pages/HdUpdate';
import Home from './pages/Home';
import Initial from './pages/Initial';
import Login from './pages/Login';
import NewFamily from './pages/NewFamily';
import NewHd from './pages/NewHd';
import NewWedding from './pages/NewWedding';
import Register from './pages/Register';
import WeddingDetail from './pages/WeddingDetail';
import WeddingEdit from './pages/WeddingEdit';
import WeddingImage from './pages/WeddingImage';
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
          <Route path="/casamentos/imagem/:id" element={ <WeddingImage /> } />
          <Route path="/casamentos" element={ <Weddings /> } />
          <Route path="/hds" element={ <Hds /> } />
          <Route path="/hds/new" element={ <NewHd /> } />
          <Route path="/hds/details/:id" element={ <HdDetails /> } />
          <Route path="/hds/details/:id/update" element={ <HdUpdate /> } />
          <Route path="/familia" element={ <Family /> } />
          <Route path="/familia/detalhe/:id/editar" element={ <FamilyEdit /> } />
          <Route path="/familia/detalhe/:id" element={ <FamilyDetail /> } />
          <Route path="/familia/novo" element={ <NewFamily /> } />
          <Route path="/familia/imagem/:id" element={ <FamilyImage /> } />
          <Route path="/corporativo" element={ <Corporate /> } />
          <Route path="/corporativo/detalhe/:id" element={ <CorporateDetail /> } />
        </Routes>
      </div>
    </MyProvider>
  );
}

export default App;
