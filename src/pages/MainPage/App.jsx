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
  height: 100vh;
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

  &::before, &::after {
    content: '';
    position: absolute;
    left: 0;
    width: 100%;
    height: 150px;
    z-index: 2;
  }

  &::before {
    top: 0;
    background: linear-gradient(to bottom, rgba(255, 255, 255, 1), rgba(255, 255, 255, 0));
  }

  &::after {
    bottom: 0;
    background: linear-gradient(to top, rgba(255, 255, 255, 1), rgba(255, 255, 255, 0));
  }
`;

const GrassContainer = styled.div`
  position: relative;
  width: 100%;
  height: 60vh;
`;

const GrassImg = styled.div`
  position: absolute;
  bottom: 0;
  left: 0;
  width: 100%;
  height: 50%;
  background-image: url('grass.png');
  background-size: 100% 100%;
  z-index: 1;

  &::before, &::after {
    content: '';
    position: absolute;
    left: 0;
    width: 100%;
    height: 100px;
    z-index: 2;
  }

  &::before {
    top: 0;
    background: linear-gradient(to bottom, rgba(255, 255, 255, 1), rgba(255, 255, 255, 0));
  }

  &::after {
    bottom: 0;
    background: linear-gradient(to top, rgba(255, 255, 255, 1), rgba(255, 255, 255, 0));
  }
`;

const CustomRowWithPosition = styled(CustomRow)`
  position: absolute;
  bottom: 10px;
  left: 50%;
  transform: translateX(-50%);
  z-index: 2;
`;

const MissionDivContainer = styled.div`
  width: 100%;
  position: absolute;
  top: 10%;
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

const ParlContainer = styled.div`
  position: relative;
  width: 100%;
  height: 60vh;
`;

const ParlImg = styled.div`
  position: absolute;
  bottom: 0;
  left: 0;
  width: 100%;
  height: 70%;
  background-image: url('parl.jpg');
  background-size: 100% 100%;
  z-index: 1;

  &::before, &::after {
    content: '';
    position: absolute;
    left: 0;
    width: 100%;
    height: 100px;
    z-index: 2;
  }

  &::before {
    top: 0;
    background: linear-gradient(to bottom, rgba(255, 255, 255, 1), rgba(255, 255, 255, 0));
  }

  &::after {
    bottom: 0;
    background: linear-gradient(to top, rgba(255, 255, 255, 1), rgba(255, 255, 255, 0));
  }
`;

const ParlDonateContainer = styled.div`
  width: 100%;
  position: absolute;
  left: 50%;
  transform: translateX(-50%);
  z-index: 2;
`;

const moveBall_2 = keyframes`
  0%, 100% {
    left: 10px;
  }
  50% {
    left: 30px;
  }
`;

const BallIcon_2 = styled.img`
  position: absolute;
  bottom: 10px;
  left: 10px;
  width: 70px;
  height: 70px;
  z-index: 3;
  animation: ${moveBall_2} 3s linear infinite;
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

        <GrassContainer>
          <GrassImg />
          <BallIcon_2 src="icon_ball.png" style={{ bottom: '20px' }} />
          <CustomRowWithPosition width='70%' alignItems='flex-start' justifyContent='center' gap='5px'>
            <MostKindFan />
            <MostKindClub />
          </CustomRowWithPosition>
        </GrassContainer>

        <ParlContainer>
          <ParlImg />
          <ParlDonateContainer>
            <DonateParl />
          </ParlDonateContainer>
        </ParlContainer>
        <DonateThings />
      </PageContainer>
    </ContainerCenter>
  )
}
