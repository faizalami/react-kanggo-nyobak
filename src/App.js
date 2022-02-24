import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import Layout from './components/Layout';
import Index from './pages/products/Index';
import Details from './pages/products/Detail';

function App () {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Navigate to="/product"/>}/>
        <Route path="product" element={<Layout title="Product"/>}>
          <Route index element={<Index/>}/>
          <Route path=":id" element={<Details/>}/>
        </Route>
        <Route
          path="*"
          element={
            <Layout>Not Found.</Layout>
          }
        />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
