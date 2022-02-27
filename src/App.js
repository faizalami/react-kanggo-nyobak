import { Routes, Route, Navigate } from 'react-router-dom';
import Layout from './components/Layout';
import Index from './pages/products/Index';
import Details from './pages/products/Detail';
import Form from './pages/products/Form';

function App () {
  return (
    <Routes>
      <Route path="/" element={<Navigate to="/product"/>}/>
      <Route path="product" element={<Layout title="Product"/>}>
        <Route index element={<Index/>}/>
        <Route path=":id" element={<Details/>}/>
        <Route path="add" element={<Form/>}/>
        <Route path="edit/:id" element={<Form/>}/>
      </Route>
      <Route
        path="*"
        element={
          <Layout>Not Found.</Layout>
        }
      />
    </Routes>
  );
}

export default App;
