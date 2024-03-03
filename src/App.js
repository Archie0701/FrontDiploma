import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import SignInComponent from './signInComponents/SignInComponent';
import MainPage from './mainPage/mainPage';
import Slider from './sliderComponent/sliderComponent';

function App() {
  return (
    <Router>
        <Routes>
          <Route path="/main" element={<MainPage />} />
          <Route path="/login" element={<SignInComponent />} />
          <Route path="/slider" element={<Slider />} />
        </Routes>
    </Router>
  );
}

export default App;