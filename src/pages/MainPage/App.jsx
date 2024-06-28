import { useState } from 'react'
import styled, { keyframes } from 'styled-components';
import { useNavigate } from 'react-router-dom';
import NowContest from '../MainPage/MainComponents/NowContest';
import MissionDiv from '../MainPage/TodayMission/MissionDiv';
import MostKindClub from '../MainPage/MainComponents/MostKindClub';
import MostKindFan from '../MainPage/MainComponents/MostKindFan';
import CustomRow from '../../Components/Container/CustomRow';
import DonateParl from '../MainPage/MainComponents/DonateParl';
import DonateThings from '../MainPage/MainComponents/DonateThings';

// 메인페이지

const ContainerCenter = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 10px;
  width: 100%;
  min-height: 100vh;
`;

const PageContainer = styled(ContainerCenter)`
  width: 100%;
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
  padding-top: 8vh;
  padding-bottom: 5vh;
  gap: 7rem;
  position: relative;
  background-color: white;
  background-image: url('MainImg_2.png');
  background-size: 100% 100%;
`;

const TopImgContainer = styled.div`
  position: relative;
  width: 100%;
  height: 600px;
`;

const TopImg = styled.div`
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-image: url('TopImg.png');
  background-size: 100% 100%;
  z-index: 1;
`;

const MissionDivContainer = styled.div`
  width: 100%;
  position: absolute;
  top: 55%;
  left: 50%;
  transform: translateX(-50%);
  z-index: 2;
`;

const moveBall = keyframes`
  0% {
    top: 10%;
    right: 30%;
  }
  100% {
    top: -90%;
    right: 90%;
  }
`;

const BallIcon = styled.img`
  position: absolute;
  width: 70px;
  height: 70px;
  z-index: 3;
  animation: ${moveBall} 5s linear infinite;
`;

export default function App() {
  const navigate = useNavigate();

  const camera = () => {
    navigate('/camera');
  };

  return (
    <ContainerCenter>
      <PageContainer>
        <TopImgContainer>
          <TopImg />
          <MissionDivContainer>
            <MissionDiv />
            <BallIcon src="icon_ball.png" />
          </MissionDivContainer>
        </TopImgContainer>
        <NowContest />
        <CustomRow width='70%' alignItems='flex-start' justifyContent='center' gap='5px'>
          <MostKindFan />
          <MostKindClub />
        </CustomRow>
        <DonateParl />
        <DonateThings />
      </PageContainer>
    </ContainerCenter>
  )
}
