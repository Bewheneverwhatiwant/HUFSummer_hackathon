import React, { useState, useEffect } from 'react';
import styled, { keyframes } from 'styled-components';
import CustomFont from '../../../Components/Container/CustomFont';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import { useAuth } from '../../SubPage/AuthContext';

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

const moveUpDown = keyframes`
  0%, 100% {
    transform: translateY(0);
  }
  50% {
    transform: translateY(-10px);
  }
`;

const MissionContainer = styled.div`
  position: relative;
  width: 50%;
  min-height: 2rem;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  padding: 20px;
  margin: 20px 0;
  border-radius: 50px;
  border: 2px solid black;
  cursor: pointer;
  animation: ${moveUpDown} 1s infinite;
`;

const IconImage = styled.img`
  position: absolute;
  bottom: -50px;
  right: -20px;
  width: 100px;
  height: 100px;
`;

const App = () => {
  const navigate = useNavigate();
  const { auth } = useAuth();
  const [mission, setMission] = useState(null);

  useEffect(() => {
    const fetchMission = async () => {
      try {
        const accessToken = localStorage.getItem('accessToken');
        const response = await axios.get(`${import.meta.env.VITE_REACT_APP_SERVER}/missions/today`, {
          headers: {
            Authorization: `Bearer ${accessToken}`,
          },
        });
        if (response.status === 200) {
          setMission(response.data.content);
        }
      } catch (error) {
        if (error.response && error.response.status === 400) {
          alert('미션 로딩 실패');
        } else {
          console.error('미션 로딩 실패', error);
          alert('미션을 가져오지 못했습니다.');
        }
      }
    };

    if (auth.isLoggedIn) {
      fetchMission();
    }
  }, [auth.isLoggedIn]);

  const camera = () => {
    navigate('/camera');
  };

  return (
    <Container>
      <Title>원하는 구단에 투표하세요!</Title>
      <Description>
        오늘의 미션을 수행하면 포인트를 받을 수 있습니다.<br />
        포인트로 응원하는 구단에 투표하고 기부해보세요. <br />
        미션을 수행하며 선행을 실천해보세요!
      </Description>
      {auth.isLoggedIn ? (
        <MissionContainer onClick={camera}>
          <CustomFont color='black' fontWeight='bold' font='2rem'>오늘의 미션</CustomFont>
          <CustomFont color='black' font='1.5rem'>{mission}</CustomFont>
          <IconImage src='icon_click.png' />
        </MissionContainer>
      ) : (

        <MissionContainer>
          <CustomFont color='black' fontWeight='bold' font='2rem'>오늘의 미션</CustomFont>
            <CustomFont color='black' font='1.5rem'>          
              미션 수행을 위해 로그인을 해주세요.
            </CustomFont>
          <IconImage src='icon_click.png' />
        </MissionContainer>
      )}
    </Container>
  );
};

export default App;
