import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import RootLayout from './layouts/RootLayout';
import Customers from './pages/Customers';
import Users from './pages/Users';
import Products from './pages/Products';
import SignIn from './pages/auth/SignIn';
import AuthProvider from './contexts/AuthContext';
import RequireAuthContainer from './components/RequireAuthContainer/RequireAuthContainer';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      refetchOnWindowFocus: false,
      retry: 3,
    },
  },
});

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <Router>
        <AuthProvider>
          <Routes>
            <Route
              path='/sign-in'
              element={<SignIn />}
            />
            <Route
              element={
                <RequireAuthContainer
                  navigateTo='/sign-in'
                  redirect={true}
                />
              }
            >
              <Route element={<RootLayout />}>
                <Route
                  // index
                  path='/'
                  element={<Customers />}
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
            </Route>
          </Routes>
        </AuthProvider>
      </Router>
    </QueryClientProvider>
  );
}

export default App;
