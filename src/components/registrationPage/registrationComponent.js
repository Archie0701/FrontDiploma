import React, { useState } from "react";
import styled from "styled-components";

const SignUpPage = () => {
  const [formData, setFormData] = useState({
    email: '',
    name: '',
    surname: '',
    password: '',
    confirmPassword: '',
    agreedToTerms: false
  });

  const [passwordMatch, setPasswordMatch] = useState(true);

  const handleChange = (e) => {
    const { name, value, checked, type } = e.target;
    // Check if the target is not a checkbox before updating the state
    if (type !== 'checkbox') {
      setFormData(prevState => ({
        ...prevState,
        [name]: value
      }));
    } else {
      setFormData(prevState => ({
        ...prevState,
        [name]: checked
      }));
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (formData.password !== formData.confirmPassword) {
      alert('Password missmatch');
      setPasswordMatch(false);
      return;
    }
    // Your form submission logic here
    console.log('Form submitted:', formData);
  };

  return (
    <MainContainer>
      <Header>
        <Logo src="https://cdn.builder.io/api/v1/image/assets/TEMP/3905e52e9c6b961ec6717c80409232f3222eab9fc52b8caf2e55d314ff83b93e?apiKey=76bc4e76ba824cf091e9566ff1ae9339&" alt="KaizenCloud Logo" />
        <BrandName>KaizenCloud</BrandName>
      </Header>
      <ContentWrapper>
        <SignInForm>
          <Title>Sign up to your account</Title>
          <SubTitle>Welcome! Enter the data required in the screen:</SubTitle>
          <form onSubmit={handleSubmit}>
            <InputOption>
              <Icon src="https://cdn.builder.io/api/v1/image/assets/TEMP/ee4214162733dba192ba3af17c7d29b632759c9375d65612bdc4c45e5f640e30?apiKey=76bc4e76ba824cf091e9566ff1ae9339&" alt="Email Icon" />
              <OptionText>
                <input 
                  style={{backgroundColor: 'transparent'}}
                  type="email"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  placeholder="Email"
                  required
                />
              </OptionText>
            </InputOption>
            <InputOption>
        <Icon src={`${process.env.PUBLIC_URL}/images/person.png`} alt="Password Icon" />
        <OptionText>
          <input
            style={{backgroundColor: 'transparent'}}
            type="text"
            name="name"
            value={formData.name}
            onChange={handleChange}
            placeholder="Name"
            required
          />
        </OptionText>
        <Divider />
        <OptionText>
          <input
            style={{backgroundColor: 'transparent'}}
            type="text"
            name="surname"
            value={formData.surname}
            onChange={handleChange}
            placeholder="Surname"
            required
          />
        </OptionText>
      </InputOption>
            <InputOption>
              <Icon src="https://cdn.builder.io/api/v1/image/assets/TEMP/dc17cd43c93fe5cd52de4cb4083e202bac1fc58d4dda10fc30e6d313c0287ae3?apiKey=76bc4e76ba824cf091e9566ff1ae9339&" alt="Password Icon" />
              <OptionText>
                <input
                  style={{backgroundColor: 'transparent'}}
                  type="password"
                  name="password"
                  value={formData.password}
                  onChange={handleChange}
                  placeholder="Password"
                  required
                />
              </OptionText>
            </InputOption>
            <InputOption>
              <Icon src="https://cdn.builder.io/api/v1/image/assets/TEMP/dc17cd43c93fe5cd52de4cb4083e202bac1fc58d4dda10fc30e6d313c0287ae3?apiKey=76bc4e76ba824cf091e9566ff1ae9339&" alt="Password Icon" />
              <OptionText>
                <input
                  style={{backgroundColor: 'transparent'}}
                  type="password"
                  name="confirmPassword"
                  value={formData.confirmPassword}
                  onChange={handleChange}
                  placeholder="Confirm password"
                  required
                />
              </OptionText>
            </InputOption>
            <OptionWrapper>
              <CheckboxWrapper>
                <StyledCheckbox
                  id="agree-to-terms"
                  type="checkbox"
                  name="agreedToTerms"
                  checked={formData.agreedToTerms}
                  onChange={handleChange}
                  required
                />
                <label htmlFor="agree-to-terms">
                  I agree to the <a href="#">Terms of Uses, Privacy Policy</a>
                </label>
              </CheckboxWrapper>
            </OptionWrapper>
            <SignInButton type="submit" >Sign up</SignInButton>
          </form>
          <OptionWrapper>
            <CheckboxWrapper>
            </CheckboxWrapper>
          </OptionWrapper>
          <DividerWithText>or</DividerWithText>
          <GoogleSignIn>
            <Icon src="https://cdn.builder.io/api/v1/image/assets/TEMP/03ec27e4270b25fbe6088125b711ec327e5bbe66af2de7472d8a3fa12ded3285?apiKey=76bc4e76ba824cf091e9566ff1ae9339&" style={{ width: '12%' }} alt="Google Icon" />
            <OptionText style={{ marginTop: 6 }}>Sign up with Google</OptionText>
          </GoogleSignIn>
          <AccountActions>
            Already have an account? {" "}
            <CreateAccountLink href="../login">Sign in</CreateAccountLink>
          </AccountActions>
        </SignInForm>
        <PromoSection>
          <PromoImage src="https://cdn.builder.io/api/v1/image/assets/TEMP/ac879f6dbd5e22e7024a03fa83c96b1953fb078244fa54362febd476fbca7799?apiKey=76bc4e76ba824cf091e9566ff1ae9339&" alt="Innovators Image" />
          <PromoTitle>Find like-minded innovators like you</PromoTitle>
          <PromoText>Share your ideas and promote them together with colleagues.</PromoText>
          <SocialIcons>
            <SocialIcon />
            <SocialIcon />
            <SocialIcon />
          </SocialIcons>
        </PromoSection>
      </ContentWrapper>
    </MainContainer>
  );
};

const MainContainer = styled.main`
  background-color: #fff;
  display: flex;
  flex-direction: column;
  padding: 20px 90px 50px;
  @media (max-width: 991px) {
    padding: 0 20px;
  }
`;

const CheckboxWrapper = styled.div`
  display: flex;
  align-items: center;
  gap: 8px;
`;

const StyledCheckbox = styled.input`
  appearance: none;
  border: 3px solid #c6c6c6;
  border-radius: 10%;
  box-shadow: 0 3px 5px 0 rgba(0, 0, 0, 0.05);
  border-color:#2973B9;
  padding: 5px;
  position: relative;
  width: 20px;
  height: 20px;


  &:checked::after {
    content: '✔';
    color: #2973B9;
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    font-weight: bold;
  }
`;


const Header = styled.header`
  align-self: start;
  display: flex;
  margin-left: 10px;
  gap: 16px;
  font-size: 20px;
  color: #696969;
  font-weight: 400;
  white-space: nowrap;
  @media (max-width: 991px) {
    white-space: initial;
  }
`;

const Divider = styled.div`
  width: 2px;
  height: 25px;
  background-color: #ccc;
  margin: 2 10px;
`;

const Logo = styled.img`
  aspect-ratio: 1.12;
  object-fit: contain;
  object-position: center;
  width: 43px;
`;

const BrandName = styled.h3`
  font-family: Roboto, sans-serif;
  align-self: start;
  flex-grow: 1;
`;

const ContentWrapper = styled.section`
  align-self: end;
  display: flex;
  width: 1184px;
  max-width: 100%;
  justify-content: space-between;
  gap: 250px;
  margin: 70px 54px 0 0;
  @media (max-width: 991px) {
    flex-wrap: wrap;
    margin: 40px 10px 0 0;
  }
`;

const SignInForm = styled.form`
form button:last-child {
  width: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
  border-radius: 6px;
  background-color: #2b79c2;
  margin-top: 40px;
  color: #fff;
  cursor: pointer;
  font: 400 16px Roboto, sans-serif;
  @media (max-width: 991px) {
    margin-top: 40px;
  }
  button {
    border: none;
    padding: 10px 20px;
    color:white;
    cursor:pointer;
    background-color:transparent;
    @media (max-width: 991px) {
      padding: 10px 30px;
    }
  }
  &:hover {
    background-color: #1d5a96; /* Изменение цвета при наведении */
  }

  /* Добавьте обработчик событий по вашему выбору */
  &:active {
    background-color: #144276; /* Изменение цвета при активации */
  }
}
`;

const Title = styled.h2`
  color: #4a4a4a;
  text-shadow: 0px 4px 4px rgba(0, 0, 0, 0.25);
  font: 700 25px Roboto, sans-serif;
`;

const SubTitle = styled.p`
  color: #707070;
  margin-top:-10px;
  white-space: nowrap;
  font: 400 19px Roboto, sans-serif;
  @media (max-width: 991px) {
    white-space: initial;
  }
`;

const InputOption = styled.div`
  border-radius: 6px;
  background-color: #f4faff;
  display: flex;
  &:nth-of-type(2) {
    margin-top: 10px;
  }

  &:nth-of-type(3) {
    margin-top: 10px;
  }

  &:nth-of-type(4) {
    margin-top: 10px;
  }

  justify-content: space-between;
  gap: 10px;
  font-size: 15px;
  color: #5d5d5d;
  font-weight: 400;
  padding: 10px 11px;
  @media (max-width: 991px) {
    margin-top: 40px;
    white-space: initial;
  }

  input {
    width: 100%;
    border: none;
    outline: none;
    font-family: Roboto, sans-serif;
    font-size: 15px;
    padding: 5px;
    ::placeholder {
      color: #5d5d5d; /* Цвет placeholder'а */
    }
  }
`;

const Icon = styled.img`
  object-fit: contain;
  width: 16px;
`;

const OptionText = styled.span`
  background-color: transparent;
  flex-grow: 1;
`;

const OptionWrapper = styled.div`
  display: flex;
  margin-top: 20px;
  justify-content: space-between;
  font-size: 14px;
`;


const SignInButton = styled.button`
  width: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
  border-radius: 6px;
  background-color: #2b79c2;
  margin-top: 40px;
  color: #fff;
  cursor: pointer;
  font: 400 16px Roboto, sans-serif;
  @media (max-width: 991px) {
    margin-top: 40px;
  }
  button {
    border: none;
    padding: 10px 20px;
    color:white;
    cursor:pointer;
    background-color:transparent;
    @media (max-width: 991px) {
      padding: 10px 30px;
    }
  }
  &:hover {
    background-color: #1d5a96; /* Изменение цвета при наведении */
  }

  /* Добавьте обработчик событий по вашему выбору */
  &:active {
    background-color: #144276; /* Изменение цвета при активации */
  }
`;


const DividerWithText = styled.div`
 display: flex;
  align-items: center;
  gap: 17px;
  font-size: 16px;
  color: #4f4f4f;
  font-weight: 300;
  text-align: center;
  margin-top: 20px;
  &::before,
  &::after {
    content: '';
    flex-grow: 1;
    border-bottom: 1px solid #989898;
  }

  @media (max-width: 991px) {
    margin-top: 40px;
  }
`;


const GoogleSignIn = styled.div`
  display: flex;
  margin-top: 30px;
  border-radius: 6px;
  border: 1px solid #2b79c2;
  gap: 20px;
  font-size: 19px;
  color: #8b8b8b;
  font-weight: 400;
  padding: 10px 60px;
  cursor: pointer;
  @media (max-width: 991px) {
    padding: 6px 20px;
  }
  &:hover {
    background-color: #FAF9F6; /* Изменение цвета при наведении */
  }
`;

const PromoSection = styled.aside`
  display: flex;
  flex-direction: column;
  margin-top: 40px;
  align-items: center;
  white-space: nowrap;
  @media (max-width: 991px) {
    max-width: 100%;
    white-space: initial;
  }
`;

const PromoImage = styled.img`
  aspect-ratio: 1.2;
  object-fit: contain;
  width: 85%;
  @media (max-width: 991px) {
    max-width: 100%;
  }
`;

const PromoTitle = styled.h3`
  color: #292828;
  text-align: center;
  margin-top: 28px;
  font: 400 20px Roboto, sans-serif;
`;

const PromoText = styled.p`
  color: #4c4c4c;
  margin-top: -5px;
  font: 300 14px Roboto, sans-serif;
  
`;


const AccountActions = styled.div`
  color: #2b79c2;
  flex-grow: 1;
  font: 400 16px Roboto, sans-serif;
  color: #707070;
  margin-top:30px;
  text-align: center;
  white-space: nowrap;
  font: 400 19px Roboto, sans-serif;
  @media (max-width: 991px) {
    white-space: initial;
  }
`;

const CreateAccountLink = styled.a`
  color: #2b79c2;
  text-decoration: none;
  :hover {
    text-decoration: underline;
  }
`;

const SocialIcons = styled.div`
  display: flex;
  justify-content: space-between;
  margin-top:10px;
  gap: 15px;
`;

const SocialIcon = styled.div`
  background-color: #acdbfd;
  border-radius: 50%;
  width: 16px;
  height: 16px;
`;

export default SignUpPage;