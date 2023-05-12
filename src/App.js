import logo from './logo.svg';
import './App.css';
// import Login from './pages/LoginForm';
import SigninForm from './pages/Signinform';
import Todo from './pages/Todo'
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import SignForm from './pages/SignForm';
// import Home from './Home';

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<SignForm />}></Route>
        <Route path="/SignForm" element={<SignForm />}></Route>
        <Route path="/SigninForm" element={<SigninForm />}></Route>

        <Route path="/Todo" element={<Todo />}></Route>

      </Routes>
    </BrowserRouter>
  );
}

export default App;
