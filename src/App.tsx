import './App.css';
import 'react-toastify/dist/ReactToastify.css';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import { Home } from './Components/Home/Home';
import { SignUp } from './Components/SignUp/SignUp';
import { Login } from './Components/Login/Login';
import { ToastContainer } from 'react-toastify';
import { UserProvider } from './Components/Providers/User.provider';
import { CreateProfile } from './Components/CreateProfile/CreateProfile';
import Dashboard from './Components/Dashboards/Dashboard/Dashboard';

function App() {
  return (
    <UserProvider>
      <BrowserRouter>
        <Routes>
          <Route index path="/" element={<Home />} />
          <Route path="/dashboard" element={<Dashboard />} />
          <Route path="/login" element={<Login />} />
          <Route path="/signUp" element={<SignUp />} />
          <Route path="/create_profile" element={<CreateProfile />} />
        </Routes>
        <ToastContainer position="top-center" autoClose={2200} />
      </BrowserRouter>
    </UserProvider>
  );
}

export default App;
