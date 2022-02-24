import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import Layout from './components/Layout';
import Index from './pages/products/Index';

function App () {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Navigate to="/product"/>}/>
        <Route path="/product" element={<Layout/>}>
          <Route index element={<Index/>}/>
        </Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
