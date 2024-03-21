import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import SignInComponent from './components/signInComponents/SignInComponent';
import Proposers from './components/mainPage/proposers';
import Slider from './components/sliderComponent/sliderComponent';
import Registration from './components/registrationPage/registrationComponent';

function App() {
  return (
    <Router>
        <Routes>
          <Route path="/proposers" element={<Proposers />} />
          <Route path="/login" element={<SignInComponent />} />
          <Route path="/slider" element={<Slider />} />
          <Route path='/registration' element={<Registration/>}/>
        </Routes>
    </Router>
  );
}

export default App;