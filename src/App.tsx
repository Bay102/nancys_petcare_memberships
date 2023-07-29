import { AppProvider } from './Components/Providers/App.provider';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import { Home } from './Components/Home/Home';
import { SignUp } from './Components/SignUp/SignUp';
import { Login } from './Components/Login/Login';
import './App.css';


function App() {
  return (
    <AppProvider>
      <BrowserRouter>
        <Routes>
          <Route index path="/" element={<Home />} />
          <Route path="/home" element={<Home />} />
          <Route path="/signUp" element={<SignUp />} />
          <Route path="/login" element={<Login />} />
        </Routes>
      </BrowserRouter>
    </AppProvider>
  );

}

export default App;
