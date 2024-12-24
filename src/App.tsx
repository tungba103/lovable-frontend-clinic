import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { AuthProvider } from './contexts/AuthContext';
import RootLayout from './layouts/RootLayout';
import Home from './pages/Home';
import Customers from './pages/Customers';
import Users from './pages/Users';
import Products from './pages/Products';
import SignIn from './pages/SignIn';

function App() {
  return (
    <AuthProvider>
      <Router>
        <Routes>
          <Route path="/sign-in" element={<SignIn />} />
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
    </AuthProvider>
  );
}

export default App;