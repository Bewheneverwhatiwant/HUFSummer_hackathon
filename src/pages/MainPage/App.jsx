import { useState } from 'react'
import styled, { keyframes } from 'styled-components';
import MainCarousel from './MainCarousel';
import MainTab from './MainTab';

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
  gap: 20px;
  position: relative;
  background-color: white;
  background-image: url('MainImg_2.png');
  background-size: 100% 100%;
`;

export default function App() {

  return (

    <ContainerCenter>
      <PageContainer>

        HUFSummer
        <MainCarousel />
        <MainTab />
      </PageContainer>
    </ContainerCenter>
  )
}
