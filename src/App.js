import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import SignInComponent from './signInComponents/SignInComponent';
import MainPage from './mainPage/mainPage';

function App() {
  return (
    <Router>
      <div className="App">
        <Routes>
          <Route path="/main" element={<MainPage />} />
          <Route path="/login" element={<SignInComponent />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;