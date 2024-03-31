import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import LoginForm from './components/LoginForm';
import RegisterForm from './components/RegisterForm';
import PostPage from './components/PostPage';

function App() {
  return (
    <Router>
      <div className="App">
        <Routes>
          <Route path="/register" element={<RegisterForm />} />
          <Route path="/posts" element={<PostPage/>} />
          <Route path="/" element={<LoginForm/>} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
