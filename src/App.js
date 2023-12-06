import './App.css';
import StartPage from './components/pages/StartPage';
import { BrowserRouter,Routes, Route} from 'react-router-dom';
import RegistrationForm from './components/RegistrationForm/RegistrationForm';
import LoginForm from './components/LoginForm/LoginForm';
import Home from './components/pages/Home';
import CreateChart from './components/pages/CreateChart/createChart';
import UserProfile from './components/pages/UserProfile/UserProfile';


function App() {
  return (
    
    
      <BrowserRouter>
        <Routes>
      <Route path='/' element={<StartPage/>}></Route>
      <Route path='profile' element={<UserProfile/>}></Route>
      <Route path='home' element={<Home/>}></Route>
      <Route path='register' element={<RegistrationForm/>}></Route>
      <Route path='login' element={<LoginForm/>}></Route>
      <Route path='createchart' element={<CreateChart/>}></Route>
      </Routes>
      </BrowserRouter>
  );
}

export default App;
