import { AppProvider } from './Components/Providers/App.provider';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import { Home } from './Components/Home/Home';
import { SignUp } from './Components/SignUp/SignUp';
import { Login } from './Components/Login/Login';
import './App.css';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { UserProvider } from './Components/Providers/User.provider';
import { CreateProfile } from './Components/CreateProfile/CreateProfile';
import { DogCard } from './Components/UtilityComponents/DogCard/DogCard';
import Dashboard from './Components/Dashboards/Dashboard/Dashboard';

function App() {
  return (
    <UserProvider>
      <AppProvider>
        <BrowserRouter>
          <Routes>
            <Route index path="/" element={<Home />} />
            <Route path="/dashboard" element={<Dashboard />} />
            <Route path="/login" element={<Login />} />
            <Route path="/signUp" element={<SignUp />} />
            <Route path="/create_profile" element={<CreateProfile />} />
            <Route path="/add_dogs" element={<DogCard />} />
          </Routes>
          <ToastContainer position="top-center" autoClose={2200} />
        </BrowserRouter>
      </AppProvider>
    </UserProvider>
  );
}

export default App;
