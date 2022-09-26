import './App.css';
import {BrowserRouter as Router, Route, Routes} from "react-router-dom";
import { Chat, Login, Register, SetAvatar } from './pages';

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/register" element={<Register />} />
        <Route path="/setavatar" element={<SetAvatar />} />
        <Route path="/login" element={<Login />} />
        <Route path="/" element={<Chat />} />
      </Routes>
    </Router>
  );
}

export default App;
