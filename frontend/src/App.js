import './App.css';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom'
import HomePage from './pages/HomePage';
import LoginPage from './pages/LoginPage';
import { extendTheme, ChakraProvider } from '@chakra-ui/react'

import PrivateRoute from './utils/PrivateRoute';
import { AuthProvider } from './context/AuthContext';
import EditTaskPage from './pages/EditTaskPage';
const colors = {
  brand: {
    900: '#1a365d',
    800: '#153e75',
    700: '#2a69ac',
  },
}
const theme = extendTheme({ colors })
function App() {
  return (
    <ChakraProvider theme={theme}>
      <Router>
        <AuthProvider>
          <Routes>


            {/* PRIVATE ROUTES */}
            <Route path='/' element={<PrivateRoute><HomePage /></PrivateRoute>} exact/>
            <Route path='/edit/:id' element={<PrivateRoute><EditTaskPage /></PrivateRoute>} exact/>

            {/* PUBLIC ROUTES */}
            <Route element={<LoginPage />} path="/login" />
          </Routes>
        </AuthProvider>
      </Router>
    </ChakraProvider>
  );
}

export default App;
