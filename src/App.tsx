import { AppProvider } from './Components/Providers/App.provider';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import { Home } from './Components/Home/Home';
import { SignUp } from './Components/SignUp/SignUp';
import { Login } from './Components/Login/Login';
import './App.css';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css'
import { UserProvider } from './Components/Providers/User.provider';

function App() {
  return (
    <UserProvider>
    <AppProvider>
      <BrowserRouter>
        <Routes>
          <Route index path="/" element={<Home />} />
          <Route path="/home" element={<Home />} />
          <Route path="/signUp" element={<SignUp />} />
          <Route path="/login" element={<Login />} />
        </Routes>
        <ToastContainer position="top-center" autoClose={2200} />
      </BrowserRouter>
    </AppProvider>
    </UserProvider>
  );
}

export default App;
