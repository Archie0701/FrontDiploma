import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import SignInComponent from './components/signInComponents/SignInComponent';
import MainPage from './components/mainPage/mainPage';
import Slider from './components/sliderComponent/sliderComponent';
import Registration from './components/registrationPage/registrationComponent';

function App() {
  return (
    <Router>
        <Routes>
          <Route path="/main" element={<MainPage />} />
          <Route path="/login" element={<SignInComponent />} />
          <Route path="/slider" element={<Slider />} />
          <Route path='/registration' element={<Registration/>}/>
        </Routes>
    </Router>
  );
}

export default App;