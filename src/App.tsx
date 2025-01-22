import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import RootLayout from './layouts/RootLayout';
import Customers from './pages/Customers/Customers';
import Users from './pages/Users';
import { ReactQueryDevtools } from '@tanstack/react-query-devtools';
import Products from './pages/Products';
import SignIn from './pages/auth/SignIn';
import AuthProvider from './contexts/AuthContext';
import RequireAuthContainer from './components/RequireAuthContainer/RequireAuthContainer';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import VisitsPage from './pages/Visit/Visit';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

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
      <ToastContainer autoClose={2000} />
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
                  path='visits'
                  element={<VisitsPage />}
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
      <ReactQueryDevtools
        initialIsOpen={false}
        buttonPosition='bottom-right'
      />
    </QueryClientProvider>
  );
}

export default App;
