import './App.css';
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import { lazy, Suspense } from 'react';

const Chat = lazy(() => import("./pages/Chat"))
const Login = lazy(() => import("./pages/Login"))
const Register = lazy(() => import("./pages/Register"))
const SetAvatar = lazy(() => import("./pages/SetAvatar"))


function App() {
  return (
    <Router>
      <Suspense fallback={<>...</>}>
        <Routes>
          <Route path="/register" element={<Register />} />
          <Route path="/setavatar" element={<SetAvatar />} />
          <Route path="/login" element={<Login />} />
          <Route path="/" element={<Chat />} />
        </Routes>
      </Suspense>
    </Router>
  );
}

export default App;
