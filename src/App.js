import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import SignInComponent from './components/signInComponents/SignInComponent';
import Proposers from './components/mainPage/proposers';
import Slider from './components/sliderComponent/sliderComponent';
import Proposals from './components/proposalsComponent/proposalsComponent';
import AfterGrading from './components/afterGradingComponent/afterGradingComponent';
import Grading from './components/graidingComponent/grading';
import Registration from './components/registrationPage/registrationComponent';
import Profile from './components/profile/profile';


function App() {
  return (
    <Router>
        <Routes>
          <Route path="/proposers" element={<Proposers />} />
          <Route path="/login" element={<SignInComponent />} />
          <Route path="/slider" element={<Slider />} />
          <Route path="/grading" element={<Grading />}/>
          <Route path="/profile" element={<Profile />}/>
          <Route path='/registration' element={<Registration/>}/>
          <Route path='/proposals' element={<Proposals/>}/>
          <Route path='/after_grading' element={<AfterGrading/>}/>
        </Routes>
    </Router>
  );
}

export default App;