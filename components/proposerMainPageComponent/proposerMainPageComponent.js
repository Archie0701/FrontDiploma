import React, { useState, useEffect } from 'react';
import styled from "styled-components";
import { Link } from 'react-router-dom';
import { LineChart } from '@mui/x-charts';
import Spinner from '../Spinner/Spinner'; 
import { getImageById, fetchUserData, fetchProposalCountData, fetchProposalData } from '../../services/apiService';
import Logo from '../../static/User-512.webp';
import dayjs from "dayjs";



function MainPage(props) {


  const [userData, setUserData] = useState(null);
  const [proposalData, setProposalData] = useState(null);
  const [appearances, setAppereances] = useState({});
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [proposalDataByDays, setProposalDataByDays] = useState(null);
  const [imageSrc, setImageSrc] = useState(null);
  const [isHovered, setIsHovered] = useState(false);

  const statusColors = {
    'Created': 'blue',
    'New': 'green',
    'Accepted': 'purple',
    'Declined': 'red',
    'Graded': 'orange',
    'In Progress': 'yellow',
    'Approved': 'cyan',
    'Archived': 'gray'
};

  const handleLogout = () => {
    localStorage.removeItem('accessToken');
    window.location.href = "/login"; 
  };

  const handleMouseEnter = () => {
    setIsHovered(true);
  };

  const handleMouseLeave = () => {
    setIsHovered(false);
  };

  let xAxisData;
  let yAxisData;

  useEffect(() => {
    const fetchData = async () => {
      try {
        const userDataResponse = await fetchUserData();
        const proposalData = await fetchProposalData();
        setProposalData(proposalData);
        const filteredArray = proposalData.filter(item => item.proposer === userDataResponse.proposer.id);
        const statusArray = filteredArray.map(item => item.status);
        const createdAtArray = filteredArray.map(item => item.created_at.split('T')[0]);
        const appearances = {};
        statusArray.forEach(status => {
            if (appearances[status]) {
                appearances[status]++;
            } else {
                appearances[status] = 1;
            }
        });
        appearances["Sum"] = statusArray.length;
        console.log(statusArray);
        setAppereances(appearances);
        const dateCounts = createdAtArray.reduce((counts, date) => {
          counts[date] = (counts[date] || 0) + 1;
          return counts;
        }, {});
        
        const today = new Date();
        const currentDate = new Date(today.getFullYear(), today.getMonth(), today.getDate()+1);
        
        const endDate = new Date(today.getFullYear(), today.getMonth(), today.getDate() - 6);
        
        const result = [];
        while (currentDate >= endDate) {
          const dateString = currentDate.toISOString().slice(0, 10);
          const count = dateCounts[dateString] || 0; 
          result.push({ date: dateString, count });
          currentDate.setDate(currentDate.getDate() - 1);
        }
        
        if (userDataResponse) {
          if(userDataResponse.avatar){
            const imageResponse = await getImageById(userDataResponse.avatar);
            setImageSrc(imageResponse.image);
          }
          setUserData(userDataResponse);
        }
        setProposalDataByDays(result.reverse());
  
  
        setLoading(false);
  
        console.log('User Data:', userDataResponse);
      } catch (error) {
        setError(error.message);
        
        console.error('Error fetching user data:', error);
        handleLogout();
      }
    };
  
    fetchData();
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
                srcSet={imageSrc || Logo}
                alt="Person Image"
                width="65"
                height="65"
              />
              <Div5>
                <Div15>{userData.first_name}
                <Link to='/edit_profile'>
                <EditButton>
                <svg width="15" height="15" viewBox="0 0 15 15" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M10.1692 3.64955L9.81876 3.28664L9.45895 3.64645L1.31311 11.7923L1.16667 11.9387V12.1458V13.3333V13.8333H1.66667H2.85417H3.06127L3.20772 13.6869L11.3536 5.54105L11.7134 5.18124L11.3505 4.83084L10.1692 3.64955ZM13.6869 2.47978L12.5202 1.31311L11.8131 2.02022L12.9798 3.18689L13.6869 2.47978ZM13.0064 0.837862L13.0122 0.84421L13.0183 0.850354L14.1641 2.01702L14.1733 2.02638L14.183 2.03524C14.2919 2.13506 14.3676 2.24865 14.416 2.38046C14.4735 2.53727 14.5 2.68746 14.5 2.83333C14.5 2.99692 14.4721 3.14848 14.4179 3.29142C14.3689 3.42065 14.2887 3.54587 14.1673 3.66728L3.33456 14.5H0.5V11.6657L11.3452 0.841093C11.4683 0.729625 11.6007 0.646008 11.7433 0.587008C11.8828 0.529256 12.0296 0.5 12.1875 0.5C12.3455 0.5 12.4978 0.529294 12.6476 0.589238C12.7858 0.644483 12.9039 0.726073 13.0064 0.837862Z" fill="black" stroke="black"/>
                </svg>
                </EditButton>
                </Link> 
                </Div15>
                <Div6>12345678912345678</Div6>
                <Div7>Proposer</Div7>
              </Div5>
             
            </Div4>
            <Div9>
              <Div10>
                <Column2>
                  <Div11>
                    <Div12>
                        <Link to="/add_proposal" style={{ textDecoration: 'none' }}>
                          <Button
                            loading="lazy"
                            src="https://cdn.builder.io/api/v1/image/assets/TEMP/baf4c644000a2ca7444ec44e15c20fa1c9dd044a60681bc1057ac431dac9c544?apiKey=76bc4e76ba824cf091e9566ff1ae9339&"
                          > <svg width="67" height="55" viewBox="0 0 67 55" fill="none" xmlns="http://www.w3.org/2000/svg">
                            <path d="M51.7727 51.7727V42.6364H42.6364V36.5454H51.7727V27.4091H57.8636V36.5454H67V42.6364H57.8636V51.7727H51.7727ZM6.09091 54.8182C4.41591 54.8182 2.98201 54.2218 1.7892 53.029C0.596402 51.8362 0 50.4023 0 48.7273V6.09091C0 4.41591 0.596402 2.98201 1.7892 1.7892C2.98201 0.596401 4.41591 0 6.09091 0H48.7273C50.4023 0 51.8362 0.596401 53.029 1.7892C54.2218 2.98201 54.8182 4.41591 54.8182 6.09091V21.3182H48.7273V15.2273H6.09091V48.7273H45.6818V54.8182H6.09091ZM6.09091 9.13636H48.7273V6.09091H6.09091V9.13636Z" fill="#7D7D7D"/>
                            </svg>
                          </Button>
                          <Text style={{ textDecoration: 'none', color: 'black' }}>Suggest</Text>
                        </Link>
                      <Link to={`/profile/${userData.proposer.id}`} style={{ textDecoration: 'none', maxWidth: '120px' }}>
                        <Button
                          loading="lazy"
                          src="https://cdn.builder.io/api/v1/image/assets/TEMP/baf4c644000a2ca7444ec44e15c20fa1c9dd044a60681bc1057ac431dac9c544?apiKey=76bc4e76ba824cf091e9566ff1ae9339&"
                        > <svg width="58" height="58" viewBox="0 0 58 58" fill="none" xmlns="http://www.w3.org/2000/svg">
                          <path d="M29 29C25.0812 29 21.7266 27.6047 18.9359 24.8141C16.1453 22.0234 14.75 18.6687 14.75 14.75C14.75 10.8312 16.1453 7.47656 18.9359 4.68594C21.7266 1.89531 25.0812 0.5 29 0.5C32.9187 0.5 36.2734 1.89531 39.0641 4.68594C41.8547 7.47656 43.25 10.8312 43.25 14.75C43.25 18.6687 41.8547 22.0234 39.0641 24.8141C36.2734 27.6047 32.9187 29 29 29ZM0.5 57.5V47.525C0.5 45.5062 1.01953 43.6508 2.05859 41.9586C3.09766 40.2664 4.47812 38.975 6.2 38.0844C9.88125 36.2437 13.6219 34.8633 17.4219 33.943C21.2219 33.0227 25.0812 32.5625 29 32.5625C32.9187 32.5625 36.7781 33.0227 40.5781 33.943C44.3781 34.8633 48.1187 36.2437 51.8 38.0844C53.5219 38.975 54.9023 40.2664 55.9414 41.9586C56.9805 43.6508 57.5 45.5062 57.5 47.525V57.5H0.5ZM7.625 50.375H50.375V47.525C50.375 46.8719 50.2117 46.2781 49.8852 45.7437C49.5586 45.2094 49.1281 44.7937 48.5937 44.4969C45.3875 42.8937 42.1516 41.6914 38.8859 40.8898C35.6203 40.0883 32.325 39.6875 29 39.6875C25.675 39.6875 22.3797 40.0883 19.1141 40.8898C15.8484 41.6914 12.6125 42.8937 9.40625 44.4969C8.87187 44.7937 8.44141 45.2094 8.11484 45.7437C7.78828 46.2781 7.625 46.8719 7.625 47.525V50.375ZM29 21.875C30.9594 21.875 32.6367 21.1773 34.032 19.782C35.4273 18.3867 36.125 16.7094 36.125 14.75C36.125 12.7906 35.4273 11.1133 34.032 9.71797C32.6367 8.32266 30.9594 7.625 29 7.625C27.0406 7.625 25.3633 8.32266 23.968 9.71797C22.5727 11.1133 21.875 12.7906 21.875 14.75C21.875 16.7094 22.5727 18.3867 23.968 19.782C25.3633 21.1773 27.0406 21.875 29 21.875Z" fill="#7D7D7D"/>
                          </svg>
                        </Button>
                        <Text style={{ textDecoration: 'none', color: 'black'}}>Profile</Text>
                      </Link>

                      <Link to="/after_grading" style={{ textDecoration: 'none' }}>
                        <Button
                          loading="lazy"
                          src="https://cdn.builder.io/api/v1/image/assets/TEMP/baf4c644000a2ca7444ec44e15c20fa1c9dd044a60681bc1057ac431dac9c544?apiKey=76bc4e76ba824cf091e9566ff1ae9339&"
                        > <svg width="67" height="67" viewBox="0 0 67 67" fill="none" xmlns="http://www.w3.org/2000/svg">
                          <path fill-rule="evenodd" clip-rule="evenodd" d="M33.9187 19.5416C33.9187 18.2311 34.9811 17.1687 36.2916 17.1687H58.625C59.9355 17.1687 60.9979 18.2311 60.9979 19.5416C60.9979 20.8521 59.9355 21.9145 58.625 21.9145H36.2916C34.9811 21.9145 33.9187 20.8521 33.9187 19.5416Z" fill="#7D7D7D"/>
                          <path fill-rule="evenodd" clip-rule="evenodd" d="M6.00208 44.6666C6.00208 43.3561 7.06447 42.2937 8.37499 42.2937H30.7083C32.0189 42.2937 33.0812 43.3561 33.0812 44.6666C33.0812 45.9771 32.0189 47.0395 30.7083 47.0395H8.37499C7.06447 47.0395 6.00208 45.9771 6.00208 44.6666Z" fill="#7D7D7D"/>
                          <path d="M25.125 19.5416C25.125 24.167 21.3754 27.9166 16.75 27.9166C12.1246 27.9166 8.375 24.167 8.375 19.5416C8.375 14.9162 12.1246 11.1666 16.75 11.1666C21.3754 11.1666 25.125 14.9162 25.125 19.5416Z" fill="#7D7D7D"/>
                          <path d="M58.625 44.6666C58.625 49.292 54.8754 53.0416 50.25 53.0416C45.6246 53.0416 41.875 49.292 41.875 44.6666C41.875 40.0412 45.6246 36.2916 50.25 36.2916C54.8754 36.2916 58.625 40.0412 58.625 44.6666Z" fill="#7D7D7D"/>
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
                        > <svg width="67" height="72" viewBox="0 0 67 72" fill="none" xmlns="http://www.w3.org/2000/svg">
                          <path d="M6.7 64.5636C4.8575 64.5636 3.28021 63.9314 1.96813 62.6671C0.656042 61.4027 0 59.8828 0 58.1073V12.9127C0 11.1372 0.656042 9.61729 1.96813 8.35292C3.28021 7.08855 4.8575 6.45636 6.7 6.45636H20.77C21.4958 4.51945 22.7102 2.95917 24.4131 1.7755C26.116 0.591833 28.0283 0 30.15 0C32.2717 0 34.184 0.591833 35.8869 1.7755C37.5898 2.95917 38.8042 4.51945 39.53 6.45636H53.6C55.4425 6.45636 57.0198 7.08855 58.3319 8.35292C59.644 9.61729 60.3 11.1372 60.3 12.9127V34.5415C59.2392 34.0573 58.1504 33.6403 57.0338 33.2906C55.9171 32.9409 54.7725 32.6853 53.6 32.5239V12.9127H6.7V58.1073H26.9675C27.135 59.2909 27.4002 60.4208 27.7631 61.4969C28.126 62.5729 28.5588 63.5952 29.0613 64.5636H6.7ZM6.7 54.8791V58.1073V12.9127V32.5239V32.2818V54.8791ZM13.4 51.6509H27.0513C27.2188 50.521 27.484 49.4181 27.8469 48.342C28.2098 47.266 28.6146 46.2168 29.0613 45.1945H13.4V51.6509ZM13.4 38.7382H33.835C35.6217 37.1241 37.6177 35.779 39.8231 34.703C42.0285 33.6269 44.3875 32.9006 46.9 32.5239V32.2818H13.4V38.7382ZM13.4 25.8255H46.9V19.3691H13.4V25.8255ZM30.15 10.4916C30.8758 10.4916 31.476 10.2629 31.9506 9.8056C32.4252 9.34828 32.6625 8.76989 32.6625 8.07045C32.6625 7.37101 32.4252 6.79263 31.9506 6.33531C31.476 5.87798 30.8758 5.64932 30.15 5.64932C29.4242 5.64932 28.824 5.87798 28.3494 6.33531C27.8748 6.79263 27.6375 7.37101 27.6375 8.07045C27.6375 8.76989 27.8748 9.34828 28.3494 9.8056C28.824 10.2629 29.4242 10.4916 30.15 10.4916ZM50.25 71.02C45.6158 71.02 41.6656 69.4463 38.3994 66.2988C35.1331 63.1513 33.5 59.3447 33.5 54.8791C33.5 50.4134 35.1331 46.6069 38.3994 43.4594C41.6656 40.3119 45.6158 38.7382 50.25 38.7382C54.8842 38.7382 58.8344 40.3119 62.1006 43.4594C65.3669 46.6069 67 50.4134 67 54.8791C67 59.3447 65.3669 63.1513 62.1006 66.2988C58.8344 69.4463 54.8842 71.02 50.25 71.02ZM48.575 64.5636H51.925V56.4932H60.3V53.265H51.925V45.1945H48.575V53.265H40.2V56.4932H48.575V64.5636Z" fill="#7D7D7D"/>
                          </svg>


                        </Button>
                        <Text style={{ textDecoration: 'none', color: 'black' }}>Proposals</Text>
                      </Link>
                      <Link to="/edit_profile" style={{ textDecoration: 'none' }}>
                        <Button
                          loading="lazy"
                          src="https://cdn.builder.io/api/v1/image/assets/TEMP/baf4c644000a2ca7444ec44e15c20fa1c9dd044a60681bc1057ac431dac9c544?apiKey=76bc4e76ba824cf091e9566ff1ae9339&"
                        > <svg width="67" height="58" viewBox="0 0 67 58" fill="none" xmlns="http://www.w3.org/2000/svg">
                          <path d="M27.0025 26.9526C23.2897 26.9526 20.1113 25.633 17.4673 22.9939C14.8233 20.3548 13.5013 17.1823 13.5013 13.4763C13.5013 9.7703 14.8233 6.59776 17.4673 3.95866C20.1113 1.31955 23.2897 0 27.0025 0C30.7154 0 33.8938 1.31955 36.5378 3.95866C39.1818 6.59776 40.5038 9.7703 40.5038 13.4763C40.5038 17.1823 39.1818 20.3548 36.5378 22.9939C33.8938 25.633 30.7154 26.9526 27.0025 26.9526ZM0 53.9051V44.4717C0 42.6187 0.47817 40.8781 1.43451 39.2497C2.39085 37.6213 3.71285 36.386 5.4005 35.5437C8.26952 34.0838 11.5042 32.8484 15.1045 31.8377C18.7049 30.827 22.6709 30.3216 27.0025 30.3216H28.1839C28.5214 30.3216 28.8589 30.3778 29.1965 30.4901C28.7464 31.5008 28.3667 32.5536 28.0573 33.6486C27.7479 34.7435 27.5088 35.8806 27.34 37.0598H27.0025C23.0084 37.0598 19.4221 37.5651 16.2437 38.5759C13.0653 39.5866 10.4635 40.5973 8.43829 41.608C7.93199 41.8888 7.52414 42.2818 7.21474 42.7872C6.90533 43.2926 6.75063 43.8541 6.75063 44.4717V47.167H28.0151C28.3526 48.3462 28.8027 49.5113 29.3652 50.6624C29.9278 51.8135 30.5466 52.8944 31.2217 53.9051H0ZM47.2544 57.2742L46.2418 52.2206C45.5667 51.9398 44.9339 51.645 44.3432 51.3362C43.7525 51.0274 43.1478 50.6484 42.529 50.1991L37.6348 51.7152L34.2594 45.9878L38.1411 42.6187C38.0285 41.8326 37.9723 41.1027 37.9723 40.4288C37.9723 39.755 38.0285 39.0251 38.1411 38.2389L34.2594 34.8699L37.6348 29.1425L42.529 30.6585C43.1478 30.2093 43.7525 29.8303 44.3432 29.5215C44.9339 29.2126 45.5667 28.9179 46.2418 28.6371L47.2544 23.5835H54.005L55.0176 28.6371C55.6927 28.9179 56.3256 29.2267 56.9162 29.5636C57.5069 29.9005 58.1117 30.3216 58.7305 30.827L63.6247 29.1425L67 35.0383L63.1184 38.4074C63.2309 39.0812 63.2872 39.7831 63.2872 40.5131C63.2872 41.243 63.2309 41.9449 63.1184 42.6187L67 45.9878L63.6247 51.7152L58.7305 50.1991C58.1117 50.6484 57.5069 51.0274 56.9162 51.3362C56.3256 51.645 55.6927 51.9398 55.0176 52.2206L54.005 57.2742H47.2544ZM50.6297 47.167C52.4861 47.167 54.0754 46.5072 55.3974 45.1877C56.7194 43.8681 57.3804 42.2818 57.3804 40.4288C57.3804 38.5759 56.7194 36.9896 55.3974 35.67C54.0754 34.3505 52.4861 33.6907 50.6297 33.6907C48.7733 33.6907 47.1841 34.3505 45.8621 35.67C44.5401 36.9896 43.8791 38.5759 43.8791 40.4288C43.8791 42.2818 44.5401 43.8681 45.8621 45.1877C47.1841 46.5072 48.7733 47.167 50.6297 47.167ZM27.0025 20.2144C28.8589 20.2144 30.4482 19.5546 31.7702 18.2351C33.0921 16.9155 33.7531 15.3293 33.7531 13.4763C33.7531 11.6233 33.0921 10.037 31.7702 8.71747C30.4482 7.39792 28.8589 6.73814 27.0025 6.73814C25.1461 6.73814 23.5569 7.39792 22.2349 8.71747C20.9129 10.037 20.2519 11.6233 20.2519 13.4763C20.2519 15.3293 20.9129 16.9155 22.2349 18.2351C23.5569 19.5546 25.1461 20.2144 27.0025 20.2144Z" fill="#7D7D7D"/>
                          </svg>
                        </Button>
                        <Text style={{ textDecoration: 'none', color: 'black' }}>Edit Profile</Text>
                      </Link>

                      <Link to="/proposers" style={{ textDecoration: 'none' }}>
                        <Button
                          loading="lazy"
                          src="https://cdn.builder.io/api/v1/image/assets/TEMP/baf4c644000a2ca7444ec44e15c20fa1c9dd044a60681bc1057ac431dac9c544?apiKey=76bc4e76ba824cf091e9566ff1ae9339&"
                        > <svg width="67" height="54" viewBox="0 0 67 54" fill="none" xmlns="http://www.w3.org/2000/svg">
                          <path d="M50.25 36.85C47.905 36.85 45.9229 36.0404 44.3038 34.4212C42.6846 32.8021 41.875 30.82 41.875 28.475C41.875 26.13 42.6846 24.1479 44.3038 22.5287C45.9229 20.9096 47.905 20.1 50.25 20.1C52.595 20.1 54.5771 20.9096 56.1963 22.5287C57.8154 24.1479 58.625 26.13 58.625 28.475C58.625 30.82 57.8154 32.8021 56.1963 34.4212C54.5771 36.0404 52.595 36.85 50.25 36.85ZM33.5 53.6V48.91C33.5 47.57 33.849 46.3277 34.5469 45.1831C35.2448 44.0385 36.2358 43.215 37.52 42.7125C39.53 41.875 41.6098 41.2469 43.7594 40.8281C45.909 40.4094 48.0725 40.2 50.25 40.2C52.4275 40.2 54.591 40.4094 56.7406 40.8281C58.8902 41.2469 60.97 41.875 62.98 42.7125C64.2642 43.215 65.2552 44.0385 65.9531 45.1831C66.651 46.3277 67 47.57 67 48.91V53.6H33.5ZM26.8 26.8C23.115 26.8 19.9604 25.4879 17.3363 22.8637C14.7121 20.2396 13.4 17.085 13.4 13.4C13.4 9.715 14.7121 6.56042 17.3363 3.93625C19.9604 1.31208 23.115 0 26.8 0C30.485 0 33.6396 1.31208 36.2638 3.93625C38.8879 6.56042 40.2 9.715 40.2 13.4C40.2 17.085 38.8879 20.2396 36.2638 22.8637C33.6396 25.4879 30.485 26.8 26.8 26.8ZM0 53.6V44.22C0 42.3217 0.474583 40.5769 1.42375 38.9856C2.37292 37.3944 3.685 36.18 5.36 35.3425C8.71 33.6675 12.1856 32.3833 15.7869 31.49C19.3881 30.5967 23.0592 30.15 26.8 30.15C28.7542 30.15 30.7083 30.3175 32.6625 30.6525C34.6167 30.9875 36.5708 31.3783 38.525 31.825L35.6775 34.6725L32.83 37.52C31.825 37.2408 30.82 37.0594 29.815 36.9756C28.81 36.8919 27.805 36.85 26.8 36.85C23.5617 36.85 20.3931 37.2408 17.2944 38.0225C14.1956 38.8042 11.2225 39.9208 8.375 41.3725C7.81667 41.6517 7.39792 42.0425 7.11875 42.545C6.83958 43.0475 6.7 43.6058 6.7 44.22V46.9H26.8V53.6H0ZM26.8 20.1C28.6425 20.1 30.2198 19.444 31.5319 18.1319C32.844 16.8198 33.5 15.2425 33.5 13.4C33.5 11.5575 32.844 9.98021 31.5319 8.66812C30.2198 7.35604 28.6425 6.7 26.8 6.7C24.9575 6.7 23.3802 7.35604 22.0681 8.66812C20.756 9.98021 20.1 11.5575 20.1 13.4C20.1 15.2425 20.756 16.8198 22.0681 18.1319C23.3802 19.444 24.9575 20.1 26.8 20.1Z" fill="#7D7D7D"/>
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
              <DropdownWrapper onMouseEnter={handleMouseEnter}
              onMouseLeave={handleMouseLeave}>
            <Div29>
                <RightMenuBar>
                <ProfileImage
                  loading="lazy"
                  srcSet={imageSrc || Logo}
                  alt="Person Image"
                  width="24"
                  height="24"
                />
                <ProfileName>{userData.first_name}</ProfileName>
              </RightMenuBar>
              </Div29>
            {isHovered && (    
              <DropdownMenu>
                  <Link to={`/profile/${userData.proposer.id}`} style={{ textDecoration: 'none', color: '#333' }}> 
                    <DropdownItem>
                      <TextWrapper>
                        <ProfileText>Profile</ProfileText>
                      </TextWrapper>
                      <svg
                        className="img-icon"
                        width="13"
                        height="13"
                        viewBox="0 0 13 13"
                        fill="none"
                        xmlns="http://www.w3.org/2000/svg"
                      >
                        <path d="M6.5 6.5C5.60625 6.5 4.84115 6.18177 4.20469 5.54531C3.56823 4.90885 3.25 4.14375 3.25 3.25C3.25 2.35625 3.56823 1.59115 4.20469 0.954687C4.84115 0.318229 5.60625 0 6.5 0C7.39375 0 8.15885 0.318229 8.79531 0.954687C9.43177 1.59115 9.75 2.35625 9.75 3.25C9.75 4.14375 9.43177 4.90885 8.79531 5.54531C8.15885 6.18177 7.39375 6.5 6.5 6.5ZM0 13V10.725C0 10.2646 0.11849 9.84141 0.355469 9.45547C0.592448 9.06953 0.907292 8.775 1.3 8.57187C2.13958 8.15208 2.99271 7.83724 3.85937 7.62734C4.72604 7.41745 5.60625 7.3125 6.5 7.3125C7.39375 7.3125 8.27396 7.41745 9.14062 7.62734C10.0073 7.83724 10.8604 8.15208 11.7 8.57187C12.0927 8.775 12.4076 9.06953 12.6445 9.45547C12.8815 9.84141 13 10.2646 13 10.725V13H0ZM1.625 11.375H11.375V10.725C11.375 10.576 11.3378 10.4406 11.2633 10.3187C11.1888 10.1969 11.0906 10.1021 10.9688 10.0344C10.2375 9.66875 9.49948 9.39453 8.75469 9.21172C8.0099 9.02891 7.25833 8.9375 6.5 8.9375C5.74167 8.9375 4.9901 9.02891 4.24531 9.21172C3.50052 9.39453 2.7625 9.66875 2.03125 10.0344C1.90937 10.1021 1.8112 10.1969 1.73672 10.3187C1.66224 10.4406 1.625 10.576 1.625 10.725V11.375ZM6.5 4.875C6.94687 4.875 7.32943 4.71589 7.64766 4.39766C7.96589 4.07943 8.125 3.69687 8.125 3.25C8.125 2.80312 7.96589 2.42057 7.64766 2.10234C7.32943 1.78411 6.94687 1.625 6.5 1.625C6.05312 1.625 5.67057 1.78411 5.35234 2.10234C5.03411 2.42057 4.875 2.80312 4.875 3.25C4.875 3.69687 5.03411 4.07943 5.35234 4.39766C5.67057 4.71589 6.05312 4.875 6.5 4.875Z" fill="#C4C4C4"/>
                      </svg>
                    </DropdownItem>
                  </Link>
                  <DropdownItem onClick={handleLogout}>
                    <TextWrapper>
                      <LogoutText>Logout</LogoutText>
                    </TextWrapper>
                    <svg
                      className="img-icon"
                      width="17"
                      height="15"
                      viewBox="0 0 17 15"
                      fill="none"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <path d="M10.0037 4.25V2.625C10.0037 2.19402 9.83123 1.7807 9.52423 1.47595C9.21722 1.1712 8.80084 1 8.36667 1H2.63704C2.20287 1 1.78648 1.1712 1.47948 1.47595C1.17247 1.7807 1 2.19402 1 2.625V12.375C1 12.806 1.17247 13.2193 1.47948 13.524C1.78648 13.8288 2.20287 14 2.63704 14H8.36667C8.80084 14 9.21722 13.8288 9.52423 13.524C9.83123 13.2193 10.0037 12.806 10.0037 12.375V10.75" stroke="#C4C4C4" strokeLinecap="round" strokeLinejoin="round" />
                      <path d="M4.27408 7.5H15.7333L13.2778 5.0625M13.2778 9.9375L15.7333 7.5" stroke="#C4C4C4" strokeLinecap="round" strokeLinejoin="round" />
                    </svg>
                  </DropdownItem>
                </DropdownMenu> 
                      )}
            </DropdownWrapper>     
              
            </Div26>
            <Div32>
              <Div37>Activity</Div37>
              <Div33>
                <Column5>
                    <Div39 style={{ color: statusColors['Created'] }}>{appearances['Sum'] || 0}</Div39>
                    <Div38>Created</Div38>
                </Column5>
                <Column5>
                    <Div39>{appearances['New'] || 0}</Div39>
                    <Div38>New</Div38>
                </Column5>
                <Column5>
                    <Div39>{appearances['Accepted'] || 0}</Div39>
                    <Div38>Accepted</Div38>
                </Column5>
                <Column5>
                    <Div39>{appearances['Declined'] || 0}</Div39>
                    <Div38>Declined</Div38>
                </Column5>
                <Column5>
                    <Div39>{appearances['Graded'] || 0}</Div39>
                    <Div38>Graded</Div38>
                </Column5>
                <Column5>
                    <Div39>{appearances['In progress'] || 0}</Div39>
                    <Div38>In Progress</Div38>
                </Column5>
                <Column5>
                    <Div39>{appearances['Done'] || 0}</Div39>
                    <Div38>Approved</Div38>
                </Column5>
                <Column5>
                    <Div39>{appearances['Acrhived'] || 0}</Div39>
                    <Div38>Archived</Div38>
                </Column5>
              </Div33>
              <Div43>
              <Div46>Proposals created for last week:</Div46>
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
        style: { marginLeft: '20px' },

      }]}
        series={[
          {label: 'Proposals: ', data: yAxisData },
        ]}
        height={300}
      />
              </Div43>
              <Div45></Div45>
            </Div32>
          </Div25>
        </Column4>
      </Div2>
    </Div>
  );
}

const Div = styled.div`
  background-color: #fff;
  padding: 0 78px 0 50px;
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
  align-items: center;
  border-radius: 8px;
  box-shadow: 0px 0px 10px 0px rgba(0, 0, 0, 0.2);
  background-color: #fff;
  display: flex;
  padding: 18px 5px; 18px 18px;
  @media (max-width: 991px) {
    max-width: 100%;
    flex-wrap: wrap;
    padding-right: 20px;
  }
`;

const Img = styled.img`
  border-radius: 50%;
  aspect-ratio: 1;
  object-fit: auto;
  object-position: center;
  width: 85px;
  height: 85px;
`;

const Div5 = styled.div`
  align-self: start;  
  display: flex;
  margin-top: 9px;
  flex-grow: 1;
  flex-basis: 0%;
  flex-direction: column;
`;

const Div15 = styled.div`
  margin-left: 15px;
  display: flex;
  align-items: center;
  color: #4a4a4a;
  font: 1000 22px Roboto, sans-serif;
`;

const Div6 = styled.div`
  margin-left: 15px;
  color: #4a4a4a;
  font: 1000 22px Roboto, sans-serif;
`;

const Div7 = styled.div`
  margin-left: 15px;
  color: #868686;
  margin-top: 10px;
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
const DropdownWrapper = styled.div`
  width: 160px;
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

const DropdownMenu = styled.div`
  width: 160px;
  position: absolute;
  top: 60px;
  display: flex;
  flex-direction: column;
  background-color: white;
  border: 1px solid #ccc;
  border-radius: 4px;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
`;

const DropdownItem = styled.div`
  border: 1px solid #d7d7d7;
  display: flex;
  justify-content: space-between;
  gap: 20px;
  @media (max-width: 991px) {
    white-space: initial;
  }
  padding: 8px 12px;
  color: #333;
  cursor: pointer;

  &:hover {
    background-color: #f0f0f0;
  }
`;

const TextWrapper = styled.div`
  display: flex;
  justify-content: space-between;
  gap: 10px;
  @media (max-width: 991px) {
    white-space: initial;
  }
`;
const ProfileText = styled.div`
  font-family: Roboto, sans-serif;
  flex-grow: 1;
  margin: auto 0;
  @media (max-width: 991px) {
    white-space: initial;
  }
`;
const LogoutText = styled.div`
  font-family: Roboto, sans-serif;
  flex-grow: 1;
  margin: auto 0;
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

const RightMenuBar = styled.div`
  display: flex;
  justify-content: space-between;
  gap: 10px;
  @media (max-width: 991px) {
    white-space: initial;
  }
`;

const ProfileName = styled.div`
  font-family: Roboto, sans-serif;
  flex-grow: 1;
  margin: auto 0;
  @media (max-width: 991px) {
    white-space: initial;
  }
`;

const ProfileImage = styled.img`
  border-radius: 50%;
  aspect-ratio: 1;
  object-fit: auto;
  object-position: center;
  width: 24px;
`;

const Img9 = styled.img`
  border-radius: 50%;
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
  margin-top: 15px;
  flex-direction: column;
  padding: 30px 53px 20px 18px;
  @media (max-width: 991px) {
    max-width: 100%;
    padding-right: 20px;
  }
`;

const Div33 = styled.div`
  display: flex;
  justify-content: space-between;
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
  display: flex;
  justify-content: center;
  font: 500 32px Roboto, sans-serif;
  white-space: pre;
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

const EditButton = styled.button`
  display: inline-block;
  margin-bottom: 15px;
  background-color: transparent;
  border: none;
  cursor: pointer;
`;





const Div43 = styled.div`
  flex-direction: column;
  @media (max-width: 991px) {
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
  margin-bottom: 20px;
  margin-left: 25px;
  font: 600 16px Roboto, sans-serif;
  @media (max-width: 991px) {
    max-width: 100%;
    margin-top: 40px;
  }
`;

export default MainPage;