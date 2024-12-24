import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import RootLayout from './layouts/RootLayout';
import Home from './pages/Home';
import Customers from './pages/Customers';
import Users from './pages/Users';
import Products from './pages/Products';

function App() {
  return (
    <Router>
      <Routes>
        <Route
          path='/'
          element={<RootLayout />}
        >
          <Route
            index
            element={<Home />}
          />
          <Route
            path='customers'
            element={<Customers />}
          />
          <Route
            path='users'
            element={<Users />}
          />
          <Route
            path='products'
            element={<Products />}
          />
        </Route>
      </Routes>
    </Router>
  );
}

export default App;
