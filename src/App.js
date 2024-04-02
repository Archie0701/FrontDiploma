import React, { useState } from 'react';
import { BrowserRouter as Router, Route, Routes, Navigate } from 'react-router-dom';
import SignInComponent from './components/signInComponents/SignInComponent';
import MainPage from './components/mainPage/mainPage';
import Slider from './components/sliderComponent/sliderComponent';
import Proposals from './components/proposalsComponent/proposalsComponent';
import AfterGrading from './components/afterGradingComponent/afterGradingComponent';
import Grading from './components/graidingComponent/grading';
import AddProposal from './components/addProposalComponent/addProposalComponent';
import Registration from './components/registrationPage/registrationComponent';
import ProposerMainPage from './components/proposerMainPageComponent/proposerMainPageComponent';
import Proposers from './components/proposersComponent/proposersComponent'
import OpenProposalGraded from './components/openProposalGradedComponent/openProposalGraded'
import Profile from './components/profile/profile';
import './reset.css'

function App() {
  const [userRole, setUserRole] = useState(null);

  return (
    <Router>
      <Routes>
        <Route
          path="*"
          element={<Navigate to="/login" replace />}/>
        <Route path="/login" element={<SignInComponent setUserRole={setUserRole} />} />
        <Route path="/slider" element={<Slider />} />
        <Route path="/grading" element={<Grading />} />
        <Route path="/registration" element={<Registration />} />
        <Route path="/proposals" element={<Proposals />} />
        <Route path="/after_grading" element={<AfterGrading />} />
        <Route path="/add_proposal" element={<AddProposal />} />
        <Route path="/proposers" element={<Proposers />} />
        <Route path="/main" element={userRole === 'proposer' ? <ProposerMainPage /> : <MainPage />} />
        <Route path="/open_proposal_graded" element={<OpenProposalGraded />} />
        <Route path="/profile/:profileId"element={<Profile />}/>
      </Routes>
    </Router>
  );
}

export default App;