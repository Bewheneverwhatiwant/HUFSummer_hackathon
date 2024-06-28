import { useState } from 'react'
import styled, { keyframes } from 'styled-components';
import { useNavigate } from 'react-router-dom';
import NowContest from '../MainPage/MainComponents/NowContest';
import MissionDiv from '../MainPage/TodayMission/MissionDiv';
import MostKindClub from '../MainPage/MainComponents/MostKindClub';
import MostKindFan from '../MainPage/MainComponents/MostKindFan';
import CustomRow from '../../Components/Container/CustomRow';

import DonateParl from '../MainPage/MainComponents/DonateParl'
import DonateThings from '../MainPage/MainComponents/DonateThings'
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

// Camera와 NowContest에서 버튼 클릭 시 로그인 검사 후 로그인하라고 안내하는 기능 추가하기 !!

export default function App() {

  const navigate = useNavigate();

  const camera = () => {
    navigate('/camera');
  };

  return (

    <ContainerCenter>
      <PageContainer>
        <MissionDiv />
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
