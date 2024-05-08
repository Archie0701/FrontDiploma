'use client';
import React, { useState, useRef, useEffect } from "react";
import { registration, confirmationEmail } from "../services/apiService";
import styled from "styled-components";
import { redirect } from 'next/navigation';
import toast, { Toaster } from 'react-hot-toast';

const data = [
  {
    id: 1,
    image: "https://cdn.builder.io/api/v1/image/assets/TEMP/3c1769723cfdc274511eaa8a2ead52b995d50d802f54a0129b5b50efad2a7304?apiKey=f933b1b419864e2493a2da58c5eeea0a&",
    title: "KaizenCloud",
  },
];

function ConfirmEmail() {
  const [lastResendTime, setLastResendTime] = useState(null);
  const [resendDisabled, setResendDisabled] = useState(false);

  useEffect(() => {
    const lastResendTimeStr = localStorage.getItem('last_resend_time');
    if (lastResendTimeStr) {
      const lastResendTime = parseInt(lastResendTimeStr, 10);
      setLastResendTime(lastResendTime);
    }
  }, []);
  
  const [registrationData, setRegistrationData] = useState({});
  useEffect(() => {
    const storedData = JSON.parse(localStorage.getItem('registration_data'));
    if(storedData === null) {
      redirect('/login');
    } else {
      setRegistrationData(storedData);
    }
  }, []);

  const handleResend = async (e) => {
    const currentTime = Date.now();
    console.log("Current time:", currentTime);
    console.log("lastResendTime:", lastResendTime);
    console.log("currentTime - lastResendTime", (currentTime - lastResendTime));
    if (lastResendTime && currentTime - lastResendTime < 60000) {
      toast.loading('Please wait before resending the confirmation email...');
      return;
    }
    try{
      let code = '';
      const characters = '0123456789';
      const charactersLength = characters.length;
      for (let i = 0; i < 8; i++) {
        code += characters.charAt(Math.floor(Math.random() * charactersLength));
      }
      localStorage.setItem('last_resend_time', currentTime.toString());
      setLastResendTime(currentTime);
      registrationData.confirmation_code = code;
      await confirmationEmail({confirmationCode: code, email: registrationData.email});
      toast( 'Confirmation code resended' , {
        duration: 2000,
        position: 'top-center',
        style: {},
        className: '',
        icon: 'ℹ️',
        iconTheme: {
          primary: '#000',
          secondary: '#fff',
        },
        ariaProps: {
          role: 'status',
          'aria-live': 'polite',
        },
      });
      } catch (error) {
        console.error('Registration failed:', error);
      }
  }
  const handleSubmit = async (e) => {
    e.preventDefault();
    const confirm_code = values.join('');
    if(confirm_code.length < 8) {
      toast.error('Confirmation code must be 8 digits.');
    } else {
      const correct_code = registrationData.confirmation_code;
      console.log("Correct code: ", correct_code);
      if(correct_code != confirm_code){
        toast.error('Confirmation code is incorrect.');
      } else {
        try {
          const response = await registration({
            email: registrationData.email,
            first_name: registrationData.first_name,
            last_name: registrationData.last_name,
            password: registrationData.password,
            confirm_password: registrationData.confirm_password
          });
          toast.success('Registration was successful.');
          console.log('Registration successful:', response);
          redirect('/login');
    
        } catch (error) {
          console.error('Registration failed:', error);
        }
      }
    }
  };

  const [values, setValues] = useState(['', '', '', '', '', '', '', '']);
  const refs = Array.from({ length: 8 }, () => useRef(null));

  const handleChange = (index, value) => {
    if (!isNaN(value)) {
      const newValues = [...values];
      newValues[index] = value;
      setValues(newValues);
    }
  };

  const handleKeyPress = (index, e) => {
    if (e.key === 'Enter' || e.key === ' ') {
      e.preventDefault();
      if (index < 7) {
        refs[index + 1].current.focus();
      }
    } else if (e.key === 'ArrowRight' && index > 0) {
      e.preventDefault();
      refs[index - 1].current.focus();
    }
  };

  const handleKeyDown = (index, e) => {
    if (e.key === 'Enter' || e.key === 'ArrowRight') {
      e.preventDefault();
      if (index < 7) {
        refs[index + 1].current.focus();
      }
    } else if (e.key === 'ArrowLeft' && index > 0) {
      e.preventDefault();
      refs[index - 1].current.focus();
    }
    if (e.key === 'Backspace' && index > 0 && values[index] === '') {
      refs[index - 1].current.focus();
    }
  };

  const handlePaste = (index, e) => {
    e.preventDefault();
    const pastedData = e.clipboardData.getData('text');
    const pastedValues = pastedData.split('').slice(0, 8);
    const newValues = [...values];
    for (let i = 0; i < pastedValues.length; i++) {
      newValues[i] = pastedValues[i];
    }
    setValues(newValues);
  };

  return (
    <>
    <Container>
      <BackgroundImage src="https://cdn.builder.io/api/v1/image/assets/TEMP/cd940338a233075465142f1de9d72aef4a1f371e4290aa7fe45d7ce818a17a95?apiKey=f933b1b419864e2493a2da58c5eeea0a&" alt="Background" />
      <Content>
        <Header>
          {data.map((item) => (
            <HeaderItem key={item.id}>
              <Logo src={item.image} alt="Logo" />
              <Title>{item.title}</Title>
            </HeaderItem>
          ))}
        </Header>
        <Heading>Confirm your email</Heading>
        <Description>
          We sent the email to <strong>{registrationData.email}</strong>.
          <br />
          Check your inbox to activate the account. If the confirmation email
          is not in your inbox, please check the Spam. Thank you.
        </Description>
        <InputContainer>
          {values.map((value, index) => (
              <InputSection
                type="text"
                value={value}
                onChange={(e) => handleChange(index, e.target.value)}
                onKeyPress={(e) => handleKeyPress(index, e)}
                onKeyDown={(e) => handleKeyDown(index, e)}
                onPaste={(e) => handlePaste(index, e)}
                maxLength={1}
                ref={refs[index]}
              />
          ))}
        </InputContainer>
        <ButtonContainer>
        <SubmitButton onClick={handleSubmit}>
            Submit
        </SubmitButton>
        <ResendButton onClick={handleResend}>
          <ResendButtonContent>
            <ResendIcon src="https://cdn.builder.io/api/v1/image/assets/TEMP/82eef3f2661957d761c0416ea34ace807360698741257101454af2b212683228?apiKey=f933b1b419864e2493a2da58c5eeea0a&" alt="Resend Icon" />
            <ResendText >Resend email</ResendText>
          </ResendButtonContent>
        </ResendButton>
        </ButtonContainer>
      </Content>
      
      <HelpLink href="/help">
        <HelpIcon src="https://cdn.builder.io/api/v1/image/assets/TEMP/803318cb9599efe668a051bc1f2ee10f5fccb96f50e19f82da1ea835f1607536?apiKey=f933b1b419864e2493a2da58c5eeea0a&" alt="Help Icon" />
        <HelpText>Help</HelpText>
      </HelpLink>
    </Container>
    <Toaster 
      toastOptions={{
        loading: {
          duration: 3000,
        },
      }}
    />
    </>
  );
}

const InputContainer = styled.div`
  display: flex;
  justify-content: space-between;
  margin-top: 25px;
`;

const InputSection = styled.input`
  width: 40px;
  height: 40px;
  font-size: 30px;
  text-align: center;
`;

const Container = styled.div`
  height: 100vh;
  width: 100vw;
  max-height: 100vh;
  max-width: 100vw;
  position: relative;
  display: flex;
  flex-direction: column;
  font-weight: 400;
  overflow: hidden;

  @media (max-width: 991px) {
    padding: 0 20px;
  }
`;

const BackgroundImage = styled.img`
  position: absolute;
  inset: 0;
  height: 100%;
  width: 100%;
  object-fit: cover;
  object-position: center;
`;

const Content = styled.div`
  position: relative;
  align-self: center;
  display: flex;
  flex-direction: column;
  width: 500px;
  max-width: 100%;
  margin-top: 100px;
  padding: 50px 17px;
  background-color: #fff;
  border: 1px solid rgba(180, 180, 180, 1);
  box-shadow: 0px 4px 5.7px 0px rgba(0, 0, 0, 0.25);
  font-size: 24px;

  @media (max-width: 991px) {
    margin-top: 40px;
    padding-right: 20px;
  }
`;

const Header = styled.header`
  display: flex;
  justify-content: center;
  gap: 16px;
  padding: 1px 0;
  color: #696969;
  white-space: nowrap;

  @media (max-width: 991px) {
    flex-wrap: wrap;
    white-space: initial;
  }
`;

const HeaderItem = styled.div`
  display: flex;
  gap: 16px;
`;

const Logo = styled.img`
  width: 53px;
  aspect-ratio: 1.12;
  object-fit: contain;
  object-position: center;
`;

const Title = styled.h1`
  margin: auto 0;
  font-family: Roboto, sans-serif;
  flex-grow: 1;
  flex-basis: auto;
`;

const Heading = styled.h2`
  margin-top: 30px;
  color: #4a4a4a;
  font-family: Roboto, sans-serif;
  font-weight: 500;
  text-align: center;

  @media (max-width: 991px) {
    max-width: 100%;
  }
`;

const Description = styled.p`
  margin-top: 25px;
  color: #707070;
  font: 19px Roboto, sans-serif;
  text-align: center;

  @media (max-width: 991px) {
    max-width: 100%;
  }
`;

const ButtonContainer = styled.div`
  width: 100%;
  display: flex;
  justify-content: space-around;
`;

const SubmitButton = styled.button`
  display: flex;
  justify-content: center;
  cursor: pointer;
  align-items: center;
  width: 200px;
  margin-top: 38px;
  padding: 15px 20px;
  background-color: #2b79c2;
  border-radius: 6px;
  font-size: 16px;
  color: #fff;

  @media (max-width: 991px) {
    max-width: 100%;
    padding: 0 20px;
  }
`;

const ResendButton = styled.button`
  display: flex;
  justify-content: center;
  cursor: pointer;
  align-items: center;
  margin-top: 38px;
  width: 200px;
  padding: 15px 20px;
  background-color: #A0A0A0;
  border-radius: 6px;
  font-size: 16px;
  color: #fff;

  @media (max-width: 991px) {
    max-width: 100%;
    padding: 0 20px;
  }
`;
const ResendButtonContent = styled.div`
  display: flex;
  gap: 10px;
`;

const ResendIcon = styled.img`
  width: 20px;
  aspect-ratio: 1;
  object-fit: contain;
  object-position: center;
  fill: #fefefe;
`;

const ResendText = styled.span`
  font-family: Roboto, sans-serif;
`;

const HelpLink = styled.a`
  position: absolute;
  text-decoration: none;
  right: 15px;
  bottom: 2px;
  align-self: flex-end;
  display: flex;
  gap: 8px;
  font-size: 20px;
  color: #fff;
  white-space: nowrap;

  @media (max-width: 991px) {
    margin-top: 40px;
    white-space: initial;
  }
`;

const HelpIcon = styled.img`
  width: 25px;
  aspect-ratio: 1;
  object-fit: contain;
  object-position: center;
  fill: #fff;
`;

const HelpText = styled.span`
  font-family: Roboto, sans-serif;
`;

export default ConfirmEmail;