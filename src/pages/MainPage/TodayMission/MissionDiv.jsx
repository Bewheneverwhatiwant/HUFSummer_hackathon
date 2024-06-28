import React from 'react';
import styled from 'styled-components';
import StyledImg from '../../../Components/Container/StyledImg';
import CustomFont from '../../../Components/Container/CustomFont';
import { useNavigate } from 'react-router-dom';

const Container = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  width: 100%;
  padding: 20px;
  box-sizing: border-box;
`;

const Title = styled.h1`
  font-size: 2rem;
  font-weight: bold;
`;

const Description = styled.p`
  font-size: 1rem;
  text-align: center;
  margin: 10px 0;
`;

const MissionContainer = styled.button`
  width: 50%;
  min-height: 2rem;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  padding: 20px;
  margin: 20px 0;
  border-radius: 20px;
  border: 1px solid black;
  cursor: pointer;
`;

const App = () => {

    const navigate = useNavigate();

    const camera = () => {
        navigate('/camera');
    };

    return (
        <Container>
            <Title>원하는 구단에 투표하세요!</Title>
            <Description>
                오늘의 미션을 수행하면 포인트를 받을 수 있습니다.<br />
                포인트로 투표를 하거나 미션을 변경할 수 있습니다.<br />
                미션을 수행하는 만큼 환경 보호에 동참할 수 있습니다.
            </Description>
            <MissionContainer onClick={camera}>
                <CustomFont color='black' fontWeight='bold' font='2rem'>오늘의 미션</CustomFont>
                <CustomFont color='black' font='1.5rem'>페트병 3개를 주워 버리세요!</CustomFont>
            </MissionContainer>
        </Container>
    );
};

export default App;
