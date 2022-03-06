import { Routes, Route, Navigate } from 'react-router-dom';
import Layout from './components/Layout';
import Index from './pages/products/Index';
import Detail from './pages/products/Detail';
import Form from './pages/products/Form';
import NotFound from './pages/NotFound';

function App () {
  return (
    <Routes>
      <Route path="/" element={<Navigate to="/product"/>}/>
      <Route path="product" element={<Layout title="Product"/>}>
        <Route index element={<Index/>}/>
        <Route path=":id" element={<Detail/>}/>
        <Route path="add" element={<Form/>}/>
        <Route path="edit/:id" element={<Form/>}/>
      </Route>
      <Route path="/404" element={<NotFound/>}/>
      <Route path="*" element={<NotFound/>}/>
    </Routes>
  );
}

export default App;
