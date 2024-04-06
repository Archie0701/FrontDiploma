import React, { useState, useEffect } from 'react';
import styled from "styled-components";
import { Link } from 'react-router-dom';
import { LineChart } from '@mui/x-charts';
import Spinner from '../Spinner/Spinner'; 
import { fetchUserData, fetchProposalCountData, fetchProposalCountDataByDays } from '../../services/apiService';
import Logo from '../../static/User-512.webp';
import { useNavigate  } from 'react-router-dom';
import dayjs from "dayjs";

export const logOut = (navigate) => {
  // Удаляем токен из localStorage
  localStorage.removeItem('accessToken');
  navigate('/login');
};



function MainPage(props) {


  const [userData, setUserData] = useState(null);
  const [proposalData, setProposalData] = useState(null);
  const [loading, setLoading] = useState(true); // Добавляем состояние для отслеживания загрузки данных
  const [error, setError] = useState(null);
  const navigate = useNavigate();
  const [proposalDataByDays, setProposalDataByDays] = useState(null);
  let xAxisData;
  let yAxisData;

  useEffect(() => {
    const fetchData = async () => {
      try {
        // Вызываем функцию fetchUserData для получения данных пользователя
        const userDataResponse = await fetchUserData();
        const proposalDataResponse = await fetchProposalCountData();
        const proposalDataByDaysResponse = await fetchProposalCountDataByDays();
        setProposalData(proposalDataResponse);
        setUserData(userDataResponse);
        setProposalDataByDays(proposalDataByDaysResponse);
  
  
        // Устанавливаем состояние загрузки в false, так как данные получены
        setLoading(false);
  
        // Выводим данные в консоль для проверки
        console.log('User Data:', userDataResponse);
        console.log('Proposal Data:', proposalDataResponse);
      } catch (error) {
        setError(error.message);
        
        // Выводим ошибку в консоль для проверки
        console.error('Error fetching user data:', error);
        navigate('/login');
      }
    };
  
    fetchData(); // Вызываем функцию при монтировании компонента
  }, []);

  if (proposalDataByDays !== null) {
    xAxisData = proposalDataByDays.map(data => {
      const date = new Date(data.date);
      return date.getTime();
  });
  yAxisData = proposalDataByDays.map(data => {
    const count = data.count;
    return count;
  });
  }

if (loading) {
  return <Spinner/> ; // Показываем сообщение о загрузке, пока данные загружаются
}
  return (
    <Div>
      <Div2>
        <Column>
          <Div3>
            <Div4>
            <Img
  loading="lazy"
  srcSet={userData.avatar || Logo}
  alt="Person Image"
  width="65"
  height="65"
/>
              <Div5>
                <Div6>{userData.last_name} {userData.first_name}</Div6>
                <Div7>Digitalization Supervisor</Div7>
              </Div5>
            </Div4>
            <Div8>Proposal Processing</Div8>
            <Div9>
              <Div10>
                <Column2>
                  <Div11>
                    <Div12>
                        <Link to="/suggest" style={{ textDecoration: 'none' }}>
                          <Button
                            loading="lazy"
                            src="https://cdn.builder.io/api/v1/image/assets/TEMP/baf4c644000a2ca7444ec44e15c20fa1c9dd044a60681bc1057ac431dac9c544?apiKey=76bc4e76ba824cf091e9566ff1ae9339&"
                          > <svg width="68" height="55" viewBox="0 0 68 55" fill="none" xmlns="http://www.w3.org/2000/svg">
                            <path d="M51.9445 51.9444V42.7778H42.7778V36.6667H51.9445V27.5H58.0556V36.6667H67.2222V42.7778H58.0556V51.9444H51.9445ZM6.11111 55C4.43056 55 2.9919 54.4016 1.79514 53.2049C0.59838 52.0081 0 50.5694 0 48.8889V6.11111C0 4.43056 0.59838 2.9919 1.79514 1.79514C2.9919 0.59838 4.43056 0 6.11111 0H48.8889C50.5695 0 52.0081 0.59838 53.2049 1.79514C54.4016 2.9919 55 4.43056 55 6.11111V21.3889H48.8889V15.2778H6.11111V48.8889H45.8333V55H6.11111ZM6.11111 9.16667H48.8889V6.11111H6.11111V9.16667Z" fill="#7D7D7D"/>
                            </svg>
                          </Button>
                          <Text style={{ textDecoration: 'none', color: 'black' }}>Suggest</Text>
                        </Link>
                      <Link to="/add_proposal" style={{ textDecoration: 'none', maxWidth: '120px' }}>
                        <Button
                          loading="lazy"
                          src="https://cdn.builder.io/api/v1/image/assets/TEMP/baf4c644000a2ca7444ec44e15c20fa1c9dd044a60681bc1057ac431dac9c544?apiKey=76bc4e76ba824cf091e9566ff1ae9339&"
                        > <svg width="55" height="55" viewBox="0 0 55 55" fill="none" xmlns="http://www.w3.org/2000/svg">
                          <path d="M27.5 39.6681C28.1895 39.6681 28.7675 39.4349 29.234 38.9685C29.7004 38.502 29.9336 37.924 29.9336 37.2345C29.9336 36.545 29.7004 35.967 29.234 35.5006C28.7675 35.0341 28.1895 34.8009 27.5 34.8009C26.8105 34.8009 26.2325 35.0341 25.766 35.5006C25.2996 35.967 25.0664 36.545 25.0664 37.2345C25.0664 37.924 25.2996 38.502 25.766 38.9685C26.2325 39.4349 26.8105 39.6681 27.5 39.6681ZM25.0664 29.9336H29.9336V15.3319H25.0664V29.9336ZM27.5 55L19.3473 46.969H8.03097V35.6527L0 27.5L8.03097 19.3473V8.03097H19.3473L27.5 0L35.6527 8.03097H46.969V19.3473L55 27.5L46.969 35.6527V46.969H35.6527L27.5 55ZM27.5 48.1858L33.5841 42.1018H42.1018V33.5841L48.1858 27.5L42.1018 21.4159V12.8982H33.5841L27.5 6.81416L21.4159 12.8982H12.8982V21.4159L6.81416 27.5L12.8982 33.5841V42.1018H21.4159L27.5 48.1858Z" fill="#7D7D7D"/>
                          </svg>
                        </Button>
                        <Text style={{ textDecoration: 'none', color: 'black'}}>Identify</Text>
                        <Text style={{ textDecoration: 'none', color: 'black', marginTop: '5px'}}>Problem</Text>
                      </Link>

                      <Link to="/after_grading" style={{ textDecoration: 'none' }}>
                        <Button
                          loading="lazy"
                          src="https://cdn.builder.io/api/v1/image/assets/TEMP/baf4c644000a2ca7444ec44e15c20fa1c9dd044a60681bc1057ac431dac9c544?apiKey=76bc4e76ba824cf091e9566ff1ae9339&"
                        > <svg width="55" height="42" viewBox="0 0 55 42" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <path fill-rule="evenodd" clip-rule="evenodd" d="M27.9062 8.95833C27.9062 7.68693 28.9369 6.65625 30.2083 6.65625H51.875C53.1464 6.65625 54.1771 7.68693 54.1771 8.95833C54.1771 10.2297 53.1464 11.2604 51.875 11.2604H30.2083C28.9369 11.2604 27.9062 10.2297 27.9062 8.95833Z" fill="#7D7D7D" />
                        <path fill-rule="evenodd" clip-rule="evenodd" d="M0.822876 33.3333C0.822876 32.0619 1.85355 31.0312 3.12496 31.0312H24.7916C26.063 31.0312 27.0937 32.0619 27.0937 33.3333C27.0937 34.6047 26.063 35.6354 24.7916 35.6354H3.12496C1.85355 35.6354 0.822876 34.6047 0.822876 33.3333Z" fill="#7D7D7D" />
                        <path d="M19.375 8.95834C19.375 13.4457 15.7373 17.0833 11.25 17.0833C6.76269 17.0833 3.125 13.4457 3.125 8.95834C3.125 4.47103 6.76269 0.833344 11.25 0.833344C15.7373 0.833344 19.375 4.47103 19.375 8.95834Z" fill="#7D7D7D" />
                        <path d="M51.875 33.3333C51.875 37.8207 48.2373 41.4583 43.75 41.4583C39.2627 41.4583 35.625 37.8207 35.625 33.3333C35.625 28.846 39.2627 25.2083 43.75 25.2083C48.2373 25.2083 51.875 28.846 51.875 33.3333Z" fill="#7D7D7D" />
                      </svg>
                        </Button>
                        <Text style={{ textDecoration: 'none', color: 'black' }}>After Grading</Text>
                      </Link>
                    </Div12>
                    <Div17>
                      <Link to="/proposals" style={{ textDecoration: 'none' }}>
                        <Button
                          loading="lazy"
                          src="https://cdn.builder.io/api/v1/image/assets/TEMP/baf4c644000a2ca7444ec44e15c20fa1c9dd044a60681bc1057ac431dac9c544?apiKey=76bc4e76ba824cf091e9566ff1ae9339&"
                        > <svg width="50" height="53" viewBox="0 0 50 53" fill="none" xmlns="http://www.w3.org/2000/svg">
                            <path d="M5 48.1818C3.625 48.1818 2.44792 47.71 1.46875 46.7665C0.489583 45.8229 0 44.6886 0 43.3636V9.63636C0 8.31136 0.489583 7.17708 1.46875 6.23352C2.44792 5.28996 3.625 4.81818 5 4.81818H15.5C16.0417 3.37273 16.9479 2.20833 18.2188 1.325C19.4896 0.441667 20.9167 0 22.5 0C24.0833 0 25.5104 0.441667 26.7812 1.325C28.0521 2.20833 28.9583 3.37273 29.5 4.81818H40C41.375 4.81818 42.5521 5.28996 43.5312 6.23352C44.5104 7.17708 45 8.31136 45 9.63636V25.7773C44.2083 25.4159 43.3958 25.1047 42.5625 24.8438C41.7292 24.5828 40.875 24.392 40 24.2716V9.63636H5V43.3636H20.125C20.25 44.247 20.4479 45.0901 20.7188 45.8932C20.9896 46.6962 21.3125 47.4591 21.6875 48.1818H5ZM5 40.9545V43.3636V9.63636V24.2716V24.0909V40.9545ZM10 38.5455H20.1875C20.3125 37.7023 20.5104 36.8792 20.7812 36.0761C21.0521 35.2731 21.3542 34.4902 21.6875 33.7273H10V38.5455ZM10 28.9091H25.25C26.5833 27.7045 28.0729 26.7008 29.7188 25.8977C31.3646 25.0947 33.125 24.5527 35 24.2716V24.0909H10V28.9091ZM10 19.2727H35V14.4545H10V19.2727ZM22.5 7.82955C23.0417 7.82955 23.4896 7.6589 23.8438 7.31761C24.1979 6.97633 24.375 6.5447 24.375 6.02273C24.375 5.50076 24.1979 5.06913 23.8438 4.72784C23.4896 4.38655 23.0417 4.21591 22.5 4.21591C21.9583 4.21591 21.5104 4.38655 21.1562 4.72784C20.8021 5.06913 20.625 5.50076 20.625 6.02273C20.625 6.5447 20.8021 6.97633 21.1562 7.31761C21.5104 7.6589 21.9583 7.82955 22.5 7.82955ZM37.5 53C34.0417 53 31.0938 51.8256 28.6562 49.4767C26.2188 47.1278 25 44.2871 25 40.9545C25 37.622 26.2188 34.7812 28.6562 32.4324C31.0938 30.0835 34.0417 28.9091 37.5 28.9091C40.9583 28.9091 43.9062 30.0835 46.3438 32.4324C48.7812 34.7812 50 37.622 50 40.9545C50 44.2871 48.7812 47.1278 46.3438 49.4767C43.9062 51.8256 40.9583 53 37.5 53ZM36.25 48.1818H38.75V42.1591H45V39.75H38.75V33.7273H36.25V39.75H30V42.1591H36.25V48.1818Z" fill="#7D7D7D" />
                          </svg>

                        </Button>
                        <Text style={{ textDecoration: 'none', color: 'black' }}>Proposals</Text>
                      </Link>
                      <Link to="/assigned" style={{ textDecoration: 'none' }}>
                        <Button
                          loading="lazy"
                          src="https://cdn.builder.io/api/v1/image/assets/TEMP/baf4c644000a2ca7444ec44e15c20fa1c9dd044a60681bc1057ac431dac9c544?apiKey=76bc4e76ba824cf091e9566ff1ae9339&"
                        > <svg width="48" height="54" viewBox="0 0 48 54" fill="none" xmlns="http://www.w3.org/2000/svg">
                            <path d="M20.2667 40.1333L39.0667 21.3333L35.3333 17.6L20.2667 32.6667L12.6667 25.0667L8.93333 28.8L20.2667 40.1333ZM5.33333 53.3333C3.86667 53.3333 2.61111 52.8111 1.56667 51.7667C0.522222 50.7222 0 49.4667 0 48V10.6667C0 9.2 0.522222 7.94444 1.56667 6.9C2.61111 5.85556 3.86667 5.33333 5.33333 5.33333H16.5333C17.1111 3.73333 18.0778 2.44444 19.4333 1.46667C20.7889 0.488889 22.3111 0 24 0C25.6889 0 27.2111 0.488889 28.5667 1.46667C29.9222 2.44444 30.8889 3.73333 31.4667 5.33333H42.6667C44.1333 5.33333 45.3889 5.85556 46.4333 6.9C47.4778 7.94444 48 9.2 48 10.6667V48C48 49.4667 47.4778 50.7222 46.4333 51.7667C45.3889 52.8111 44.1333 53.3333 42.6667 53.3333H5.33333ZM5.33333 48H42.6667V10.6667H5.33333V48ZM24 8.66667C24.5778 8.66667 25.0556 8.47778 25.4333 8.1C25.8111 7.72222 26 7.24444 26 6.66667C26 6.08889 25.8111 5.61111 25.4333 5.23333C25.0556 4.85556 24.5778 4.66667 24 4.66667C23.4222 4.66667 22.9444 4.85556 22.5667 5.23333C22.1889 5.61111 22 6.08889 22 6.66667C22 7.24444 22.1889 7.72222 22.5667 8.1C22.9444 8.47778 23.4222 8.66667 24 8.66667Z" fill="#7D7D7D" />
                          </svg>

                        </Button>
                        <Text style={{ textDecoration: 'none', color: 'black' }}>Assigned</Text>
                      </Link>

                      <Link to="/proposers" style={{ textDecoration: 'none' }}>
                        <Button
                          loading="lazy"
                          src="https://cdn.builder.io/api/v1/image/assets/TEMP/baf4c644000a2ca7444ec44e15c20fa1c9dd044a60681bc1057ac431dac9c544?apiKey=76bc4e76ba824cf091e9566ff1ae9339&"
                        > <svg width="50" height="40" viewBox="0 0 50 40" fill="none" xmlns="http://www.w3.org/2000/svg">
                            <path d="M37.5 27.5C35.75 27.5 34.2708 26.8958 33.0625 25.6875C31.8542 24.4792 31.25 23 31.25 21.25C31.25 19.5 31.8542 18.0208 33.0625 16.8125C34.2708 15.6042 35.75 15 37.5 15C39.25 15 40.7292 15.6042 41.9375 16.8125C43.1458 18.0208 43.75 19.5 43.75 21.25C43.75 23 43.1458 24.4792 41.9375 25.6875C40.7292 26.8958 39.25 27.5 37.5 27.5ZM25 40V36.5C25 35.5 25.2604 34.5729 25.7812 33.7188C26.3021 32.8646 27.0417 32.25 28 31.875C29.5 31.25 31.0521 30.7812 32.6562 30.4688C34.2604 30.1562 35.875 30 37.5 30C39.125 30 40.7396 30.1562 42.3438 30.4688C43.9479 30.7812 45.5 31.25 47 31.875C47.9583 32.25 48.6979 32.8646 49.2188 33.7188C49.7396 34.5729 50 35.5 50 36.5V40H25ZM20 20C17.25 20 14.8958 19.0208 12.9375 17.0625C10.9792 15.1042 10 12.75 10 10C10 7.25 10.9792 4.89583 12.9375 2.9375C14.8958 0.979167 17.25 0 20 0C22.75 0 25.1042 0.979167 27.0625 2.9375C29.0208 4.89583 30 7.25 30 10C30 12.75 29.0208 15.1042 27.0625 17.0625C25.1042 19.0208 22.75 20 20 20ZM0 40V33C0 31.5833 0.354167 30.2812 1.0625 29.0938C1.77083 27.9062 2.75 27 4 26.375C6.5 25.125 9.09375 24.1667 11.7812 23.5C14.4688 22.8333 17.2083 22.5 20 22.5C21.4583 22.5 22.9167 22.625 24.375 22.875C25.8333 23.125 27.2917 23.4167 28.75 23.75L26.625 25.875L24.5 28C23.75 27.7917 23 27.6562 22.25 27.5938C21.5 27.5312 20.75 27.5 20 27.5C17.5833 27.5 15.2188 27.7917 12.9062 28.375C10.5938 28.9583 8.375 29.7917 6.25 30.875C5.83333 31.0833 5.52083 31.375 5.3125 31.75C5.10417 32.125 5 32.5417 5 33V35H20V40H0ZM20 15C21.375 15 22.5521 14.5104 23.5312 13.5312C24.5104 12.5521 25 11.375 25 10C25 8.625 24.5104 7.44792 23.5312 6.46875C22.5521 5.48958 21.375 5 20 5C18.625 5 17.4479 5.48958 16.4688 6.46875C15.4896 7.44792 15 8.625 15 10C15 11.375 15.4896 12.5521 16.4688 13.5312C17.4479 14.5104 18.625 15 20 15Z" fill="#7D7D7D" />
                          </svg>

                        </Button>
                        <Text style={{ textDecoration: 'none', color: 'black' }}>Proposers</Text>
                      </Link>
                    </Div17>
                  </Div11>
                </Column2>
              </Div10>
            </Div9>
          </Div3>
        </Column>
        <Column4>
          <Div25>
            <Div26>
              <Div27>
                <Img8
                  loading="lazy"
                  src="https://cdn.builder.io/api/v1/image/assets/TEMP/ba2ecc2a8af9615522bd837955f90aa462b022e2f13c46a05493e77f07595398?apiKey=76bc4e76ba824cf091e9566ff1ae9339&"
                />
                <Div28>KaizenCloud</Div28>
              </Div27>
              <Div29>
                <Div30>
                <Img9
  loading="lazy"
  srcSet={userData.avatar || Logo}
  alt="Person Image"
  width="24"
  height="24"
/>
                  <Div31>{userData.last_name} {userData.first_name}</Div31>
                </Div30>
                <Img10
                  loading="lazy"
                  src="https://cdn.builder.io/api/v1/image/assets/TEMP/86686b16897beeac74304533d5bb958a4d1e0106aa55fd71c28f706a5b838225?apiKey=76bc4e76ba824cf091e9566ff1ae9339&"
                onClick={() => {
                    logOut(navigate);
                  }}>
                  <svg width="17" height="15" viewBox="0 0 17 15" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path d="M10.0037 4.25V2.625C10.0037 2.19402 9.83123 1.7807 9.52423 1.47595C9.21722 1.1712 8.80084 1 8.36667 1H2.63704C2.20287 1 1.78648 1.1712 1.47948 1.47595C1.17247 1.7807 1 2.19402 1 2.625V12.375C1 12.806 1.17247 13.2193 1.47948 13.524C1.78648 13.8288 2.20287 14 2.63704 14H8.36667C8.80084 14 9.21722 13.8288 9.52423 13.524C9.83123 13.2193 10.0037 12.806 10.0037 12.375V10.75" stroke="#C4C4C4" stroke-linecap="round" stroke-linejoin="round" />
                    <path d="M4.27408 7.5H15.7333L13.2778 5.0625M13.2778 9.9375L15.7333 7.5" stroke="#C4C4C4" stroke-linecap="round" stroke-linejoin="round" />
                  </svg>
                </Img10>
              </Div29>
            </Div26>
            <Div32>
              <Div33>
                <Div34>
                  <Div35>
                    <Column5>
                      <Div36>
                        <Div37>General information about the activity</Div37>
                        <Div38>Proposals received</Div38>
                        <Div39>{proposalData.proposal_count}</Div39>
                      </Div36>
                    </Column5>
                    <Column6>
                      <Div40>
                        <Div41>Active users</Div41>
                        <Div42>{proposalData.active_user_count}</Div42>
                      </Div40>
                    </Column6>
                  </Div35>
                </Div34>
                <Div43>
                  <Div44>Registered users</Div44>
                  <Div45>{proposalData.user_count}</Div45>
                </Div43>
              </Div33>
              <Div46>Proposals received</Div46>
              <LineChart
        xAxis={[
          {
            label: "Date",
            data: xAxisData,
            tickInterval: xAxisData,
            scaleType: "time",
            valueFormatter: (timestamp) => {
              const date = new Date(timestamp);
              return dayjs(date).format("MMM D");
            },
          },
        ]}
        yAxis={[{ label: "Proposals count",

      }]}
        series={[
          {label: 'Proposals: ', data: yAxisData },
        ]}
        height={300}
      />
            </Div32>
          </Div25>
        </Column4>
      </Div2>
    </Div>
  );
}

const Div = styled.div`
  background-color: #fff;
  padding: 19px 78px 50px;
  @media (max-width: 991px) {
    padding: 0 20px;
  }
`;

const Div2 = styled.div`
  display: flex;
  @media (max-width: 991px) {
    flex-direction: column;
    align-items: stretch;
    gap: 0px;
  }
`;

const Column = styled.div`
  display: flex;
  flex-direction: column;
  line-height: normal;
  margin-top:5%;
  @media (max-width: 991px) {
    width: 100%;
  }
`;

const Div3 = styled.div`
  display: flex;
  flex-direction: column;
  @media (max-width: 991px) {
    max-width: 100%;
    margin-top: 40px;
  }
`;

const Div4 = styled.div`
  border-radius: 8px;
  box-shadow: 0px 0px 10px 0px rgba(0, 0, 0, 0.2);
  background-color: #fff;
  display: flex;
  gap: 17px;
  padding: 18px 80px 18px 18px;
  @media (max-width: 991px) {
    max-width: 100%;
    flex-wrap: wrap;
    padding-right: 20px;
  }
`;

const Img = styled.img`
  aspect-ratio: 1;
  object-fit: auto;
  object-position: center;
  width: 65px;
`;

const Div5 = styled.div`
  align-self: start;  
  display: flex;
  margin-top: 9px;
  flex-grow: 1;
  flex-basis: 0%;
  flex-direction: column;
`;

const Div6 = styled.div`
  color: #4a4a4a;
  font: 1000 22px Roboto, sans-serif;
`;

const Div7 = styled.div`
  color: #868686;
  margin-top: 1px;
  white-space: nowrap;
  font: italic 300 19px Roboto, sans-serif;
  @media (max-width: 991px) {
    white-space: initial;
  }
`;

const Div8 = styled.div`
  color: #5f5e5e;
  text-align: center;
  align-self: center;
  margin-top: 90px;
  font: 400 32px Roboto, sans-serif;
  @media (max-width: 991px) {
    margin-top: 40px;
  }
`;

const Div9 = styled.div`
  margin-top: 56px;
  @media (max-width: 991px) {
    max-width: 100%;
    margin-top: 40px;
  }
`;

const Div10 = styled.div`
  gap: 20px;
  display: flex;
  @media (max-width: 991px) {
    flex-direction: column;
    align-items: stretch;
    gap: 0px;
  }
`;

const Column2 = styled.div`
  display: flex;
  flex-direction: column;
  line-height: normal;
  width: 70%;
  margin-left: 0px;
  @media (max-width: 991px) {
    width: 100%;
  }
`;

const Div11 = styled.div`
  display: flex;
  flex-grow: 1;
  flex-direction: column;
  font-size: 18px;
  color: #000;
  font-weight: 300;
  white-space: nowrap;
  text-align: center;
  @media (max-width: 991px) {
    margin-top: 40px;
    white-space: initial;
  }
`;

const Div12 = styled.div`
  display: flex;
  justify-content: space-between;
  gap: 20px;
  @media (max-width: 991px) {
    white-space: initial;
  }
`;


const Button = styled.button`
  aspect-ratio: 1;
  object-fit: auto;
  border-radius:10%;
  border:none;
  object-position: center;
  width: 120px;
  &:hover {
    transform: translateY(-5px);
    color: #333;
    cursor:pointer;
    box-shadow: .0rem .2rem .4rem #777;
    /* line I added */
    background-color:#ECF3FF;
    pointer-events: visible;
    position: relative;
    z-index: 0;
    visibility: visible;
    float: none;
}
`;

const Text = styled.div`
  font-family: Roboto, sans-serif;
  margin-top: 19px;
`;

// const Div15 = styled.div`
//   display: flex;
//   flex-grow: 1;
//   flex-basis: 0%;
//   flex-direction: column;
//   align-items: center;
//   @media (max-width: 991px) {
//     white-space: initial;
//   }
// `;

// const Img3 = styled.img`
//   aspect-ratio: 1;
//   object-fit: auto;
//   object-position: center;
//   width: 120px;
//   border-radius: 16px;
// `;

// const Div16 = styled.div`
//   font-family: Roboto, sans-serif;
//   margin-top: 19px;
// `;

const Div17 = styled.div`
  display: flex;
  margin-top: 35px;
  justify-content: space-between;
  gap: 20px;
  @media (max-width: 991px) {
    white-space: initial;
  }
`;

// const Div18 = styled.div`
//   display: flex;
//   flex-grow: 1;
//   flex-basis: 0%;
//   flex-direction: column;
//   align-items: center;
//   @media (max-width: 991px) {
//     white-space: initial;
//   }
// `;

// const Img4 = styled.img`
//   aspect-ratio: 1;
//   object-fit: auto;
//   object-position: center;
//   width: 120px;
//   border-radius: 16px;
// `;

// const Div19 = styled.div`
//   font-family: Roboto, sans-serif;
//   margin-top: 19px;
// `;

// const Div20 = styled.div`
//   display: flex;
//   flex-grow: 1;
//   flex-basis: 0%;
//   flex-direction: column;
//   align-items: center;
//   @media (max-width: 991px) {
//     white-space: initial;
//   }
// `;

// const Img5 = styled.img`
//   aspect-ratio: 1;
//   object-fit: auto;
//   object-position: center;
//   width: 120px;
// `;

// const Div21 = styled.div`
//   font-family: Roboto, sans-serif;
//   margin-top: 19px;
// `;

// const Column3 = styled.div`
//   display: flex;
//   flex-direction: column;
//   line-height: normal;
//   width: 30%;
//   @media (max-width: 991px) {
//     width: 100%;
//   }
// `;

const Div22 = styled.div`
  display: flex;
  flex-grow: 1;
  flex-direction: column;
  align-items: center;
  font-size: 18px;
  color: #000;
  font-weight: 300;
  white-space: nowrap;
  text-align: center;
  @media (max-width: 991px) {
    margin-top: 40px;
    white-space: initial;
  }
`;

// const Img6 = styled.img`
//   aspect-ratio: 1;
//   object-fit: auto;
//   object-position: center;
//   width: 120px;
//   border-radius: 16px;
// `;

// const Div23 = styled.div`
//   font-family: Roboto, sans-serif;
//   align-self: stretch;
//   margin-top: 18px;
//   @media (max-width: 991px) {
//     white-space: initial;
//   }
// `;

const Img7 = styled.button`
  aspect-ratio: 1;
  object-fit: auto;
  object-position: center;
  width: 120px;
  margin-top: 35px;
  background-color:#ECF3FF;
  border:none;
  border-radius: 10%;
`;

const Div24 = styled.div`
  font-family: Roboto, sans-serif;
  margin-top: 19px;
`;

const Column4 = styled.div`
  display: flex;
  flex-direction: column;
  line-height: normal;
  width: 73%;
  margin-left: 20px;
  @media (max-width: 991px) {
    width: 100%;
  }
`;

const Div25 = styled.div`
  display: flex;
  flex-direction: column;
  @media (max-width: 991px) {
    max-width: 100%;
    margin-top: 40px;
  }
`;

const Div26 = styled.div`
  align-self: end;
  display: flex;
  width: 833px;
  max-width: 100%;
  justify-content: space-between;
  gap: 20px;
  font-weight: 400;
  white-space: nowrap;
  @media (max-width: 991px) {
    flex-wrap: wrap;
    white-space: initial;
  }
`;

const Div27 = styled.div`
  display: flex;
  justify-content: space-between;
  gap: 16px;
  font-size: 30px;
  color: #696969;
  @media (max-width: 991px) {
    white-space: initial;
  }
`;

const Img8 = styled.img`
  aspect-ratio: 1.12;
  object-fit: auto;
  object-position: center;
  width: 53px;
`;

const Div28 = styled.div`
  font-family: Roboto, sans-serif;
  align-self: start;
  margin-top: 20px;
  flex-grow: 1;
`;

const Div29 = styled.div`
  border-radius: 8px;
  border: 1px solid #d7d7d7;
  background-color: #fff;
  align-self: start;
  display: flex;
  justify-content: space-between;
  gap: 20px;
  font-size: 16px;
  color: #000;
  padding: 8px 13px;
  @media (max-width: 991px) {
    white-space: initial;
  }
`;

const Div30 = styled.div`
  display: flex;
  justify-content: space-between;
  gap: 10px;
  @media (max-width: 991px) {
    white-space: initial;
  }
`;

const Img9 = styled.img`
  aspect-ratio: 1;
  object-fit: auto;
  object-position: center;
  width: 24px;
`;

const Div31 = styled.div`
  font-family: Roboto, sans-serif;
  flex-grow: 1;
  margin: auto 0;
  @media (max-width: 991px) {
    white-space: initial;
  }
`;

const Img10 = styled.button`
  aspect-ratio: 1.15;
  object-fit: auto;
  object-position: center;
  width: 15px;
  
  cursor:pointer;
  background: transparent;
  border: none !important;
  font-size:0;
  margin: auto 0;
`;

const Div32 = styled.div`
  border-radius: 8px;
  box-shadow: 0px 0px 10px 0px rgba(0, 0, 0, 0.2);
  background-color: #fff;
  display: flex;
  margin-top: 28px;
  flex-direction: column;
  padding: 26px 53px 50px 18px;
  @media (max-width: 991px) {
    max-width: 100%;
    padding-right: 20px;
  }
`;

const Div33 = styled.div`
  display: flex;
  width: 80%;
  padding-right: 80px;
  justify-content: space-between;
  gap: 20px;
  @media (max-width: 991px) {
    max-width: 100%;
    flex-wrap: wrap;
    padding-right: 20px;
  }
`;

const Div34 = styled.div`
  @media (max-width: 991px) {
    max-width: 100%;
  }
`;

const Div35 = styled.div`
  gap: 80px;
  display: flex;
  @media (max-width: 991px) {
    flex-direction: column;
    align-items: stretch;
    gap: 0px;
  }
`;

const Column5 = styled.div`
  display: flex;
  flex-direction: column;
  line-height: normal;
  width: 80%;
  margin-left: 0px;
  @media (max-width: 991px) {
    width: 100%;
  }
`;

const Div36 = styled.div`
  display: flex;
  flex-grow: 1;
  flex-direction: column;
  font-size: 16px;
  color: #484848;
  font-weight: 500;
  @media (max-width: 991px) {
    margin-top: 40px;
  }
`;

const Div37 = styled.div`
  font: 600 15px Roboto, sans-serif;
  white-space: nowrap;
  @media (max-width: 991px) {
    white-space: initial;
  }
`;

const Div38 = styled.div`
  display: flex;
  justify-content: center;
  font: 600 16px Roboto, sans-serif;
  font-family: Roboto, sans-serif;
  margin-top: 49px;
  @media (max-width: 991px) {
    margin-top: 40px;
  }
`;

const Div39 = styled.div`
  display: flex;
  justify-content: center;
  margin-top: 21px;
  font: 400 32px Roboto, sans-serif;
`;

const Column6 = styled.div`
  display: flex;
  flex-direction: column;
  line-height: normal;
  width: 20%;
  margin-left: 20px;
  @media (max-width: 991px) {
    width: 100%;
  }
`;

const Div40 = styled.div`
  display: flex;
  margin-top: 65px;
  flex-grow: 1;
  flex-direction: column;
  color: #484848;
  white-space: nowrap;
  @media (max-width: 991px) {
    margin-top: 40px;
    white-space: initial;
  }
`;

const Div41 = styled.div`
  font: 600 16px Roboto, sans-serif;
  @media (max-width: 991px) {
    white-space: initial;
  }
`;

const Div42 = styled.div`
  display: flex;  
  justify-content: center;
  margin-top: 24px;
  font: 400 32px Roboto, sans-serif;
`;

const Div43 = styled.div`
  align-self: end;
  display: flex;
  margin-top: 64px;
  flex-direction: column;
  color: #484848;
  white-space: nowrap;
  @media (max-width: 991px) {
    margin-top: 40px;
    white-space: initial;
  }
`;

const Div44 = styled.div`
  font: 600 16px Roboto, sans-serif;
  @media (max-width: 991px) {
    white-space: initial;
  }
`;

const Div45 = styled.div`
  display: flex;
  justify-content: center;
  margin-top: 21px;
  font: 400 32px Roboto, sans-serif;
`;

const Div46 = styled.div`
  color: #484848;
  margin-top: 93px;
  font: 600 16px Roboto, sans-serif;
  @media (max-width: 991px) {
    max-width: 100%;
    margin-top: 40px;
  }
`;


// const Div47 = styled.div`
//   display: flex;
//   justify-content: space-between;
//   gap: 12px;
//   font-size: 16px;
//   color: #484848;
//   font-weight: 400;
//   white-space: nowrap;
//   margin: 43px 0 0 30px;
//   @media (max-width: 991px) {
//     max-width: 100%;
//     flex-wrap: wrap;
//     margin-top: 40px;
//     white-space: initial;
//   }
// `;

// const Div48 = styled.div`
//   font-family: Roboto, sans-serif;
//   flex-grow: 1;
// `;

// const Div49 = styled.div`
//   background-color: #d9d9d9;
//   width: 1090px;
//   max-width: 100%;
//   height: 3px;
//   margin: auto 0;
// `;

// const Div50 = styled.div`
//   display: flex;
//   justify-content: space-between;
//   gap: 12px;
//   font-size: 16px;
//   color: #484848;
//   font-weight: 400;
//   white-space: nowrap;
//   margin: 50px 0 0 30px;
//   @media (max-width: 991px) {
//     max-width: 100%;
//     flex-wrap: wrap;
//     margin-top: 40px;
//     white-space: initial;
//   }
// `;

// const Div51 = styled.div`
//   font-family: Roboto, sans-serif;
//   flex-grow: 1;
// `;

// const Div52 = styled.div`
//   background-color: #d9d9d9;
//   align-self: start;
//   width: 1090px;
//   max-width: 100%;
//   height: 2px;
// `;

// const Div53 = styled.div`
//   display: flex;
//   justify-content: space-between;
//   gap: 12px;
//   font-size: 16px;
//   color: #484848;
//   font-weight: 400;
//   white-space: nowrap;
//   margin: 50px 0 0 30px;
//   @media (max-width: 991px) {
//     max-width: 100%;
//     flex-wrap: wrap;
//     margin-top: 40px;
//     white-space: initial;
//   }
// `;

// const Div54 = styled.div`
//   font-family: Roboto, sans-serif;
//   flex-grow: 1;
// `;

// const Div55 = styled.div`
//   background-color: #d9d9d9;
//   align-self: start;
//   width: 1090px;
//   max-width: 100%;
//   height: 2px;
// `;

// const Div56 = styled.div`
//   display: flex;
//   justify-content: space-between;
//   gap: 12px;
//   font-size: 16px;
//   color: #484848;
//   font-weight: 400;
//   white-space: nowrap;
//   margin: 50px 0 0 30px;
//   @media (max-width: 991px) {
//     max-width: 100%;
//     flex-wrap: wrap;
//     margin-top: 40px;
//     white-space: initial;
//   }
// `;

// const Div57 = styled.div`
//   font-family: Roboto, sans-serif;
//   flex-grow: 1;
// `;

// const Div58 = styled.div`
//   background-color: #d9d9d9;
//   width: 1090px;
//   max-width: 100%;
//   height: 2px;
//   margin: auto 0;
// `;

// const Div59 = styled.div`
//   display: flex;
//   width: 888px;
//   max-width: 100%;
//   justify-content: space-between;
//   gap: 20px;
//   font-size: 16px;
//   color: #484848;
//   font-weight: 400;
//   margin: 8px 0 15px 59px;
//   @media (max-width: 991px) {
//     flex-wrap: wrap;
//   }
// `;

// const Div60 = styled.div`
//   font-family: Roboto, sans-serif;
// `;

// const Div61 = styled.div`
//   font-family: Roboto, sans-serif;
// `;

// const Div62 = styled.div`
//   font-family: Roboto, sans-serif;
// `;

// const Div63 = styled.div`
//   font-family: Roboto, sans-serif;
// `;

// const Div64 = styled.div`
//   font-family: Roboto, sans-serif;
// `;

// const Div65 = styled.div`
//   font-family: Roboto, sans-serif;
// `;

export default MainPage;