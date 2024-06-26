import './App.css';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import SignIn from './pages/SignIn/SignIn';
import Dashboard from './pages/Dashboard/Dashboard';
import { AuthProvider } from './utils/authentication';
import PrivateRoute from './utils/privateRoute'


function App() {
  return (
    <div className="App">

      
      <AuthProvider>
          <Routes>
            <Route path='/' element={<SignIn />} />
            <Route path='/dashboard' element={<PrivateRoute />}>
              <Route path='' element={<Dashboard/>} />
              </Route>
          </Routes>
      </AuthProvider>
    </div>
  );
}

export default App;
