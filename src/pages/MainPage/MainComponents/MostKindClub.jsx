import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import axios from 'axios';
import CustomRow from '../../../Components/Container/CustomRow';

const Container = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  width: 100%;
  padding: 20px;
  box-sizing: border-box;
`;

const Title = styled.h1`
  font-size: 1.5rem;
  font-weight: bold;
  margin-bottom: 10px;
`;

const Subtitle = styled.p`
  font-size: 1rem;
  margin-bottom: 20px;
`;

const AllButton = styled.button`
  background-color: #54B3FF;
  border: none;
  border-radius: 10px;
  cursor: pointer;
  font-size: 0.8rem;
  padding: 10px;
  margin-bottom: 5px;
  color: white;
`;

const ClubContainer = styled.div`
  width: 80%;
  background-color: #f2f2f2;
  padding: 20px;
  border-radius: 10px;
  text-align: center;
  border: 1px solid #ccc;
  margin-bottom: 10px;
`;

const ClubRow = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin: 10px 0;
  padding: 10px 0;
  border-bottom: 1px solid #ccc;

  &:last-child {
    border-bottom: none;
  }
`;

const ClubColumn = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
`;

const ClubNumber = styled.div`
  font-size: 1.5rem;
  font-weight: bold;
  color: red;
`;

const ClubImage = styled.img`
  width: 50px;
  height: 50px;
  border-radius: 50%;
  margin-bottom: 10px;
`;

const ClubText = styled.p`
  font-size: 0.9rem;
  margin: 2px 0;
`;

const App = () => {
    const [clubs, setClubs] = useState([]);

    useEffect(() => {
        const fetchClubs = async () => {
            try {
                const today = new Date().toISOString().split('T')[0]; // 오늘 날짜를 'YYYY-MM-DD' 형식으로 얻기
                const response = await axios.get(`${import.meta.env.VITE_REACT_APP_SERVER}/rank/team/mission`, {
                    params: { date: today },
                    headers: {
                        Authorization: `Bearer ${localStorage.getItem('accessToken')}`
                    }
                });
                const sortedClubs = response.data.teams.sort((a, b) => b.completeMission - a.completeMission);
                setClubs(sortedClubs);
            } catch (error) {
                console.error('클럽 정보 가져오기 실패', error);
            }
        };

        fetchClubs();
    }, []);

    return (
        <Container>
            <Title>오늘, 가장 선행한 야구 팬클럽은?</Title>
            <Subtitle>30분 단위로 갱신됩니다.</Subtitle>
            <ClubContainer>
                {clubs.map((club, index) => (
                    <ClubRow key={index}>
                        <ClubNumber>{club.rank}</ClubNumber>
                        <ClubImage src={club.logoUrl} alt={`club-${club.rank}-logo`} />
                        <ClubText>미션 달성 {club.completeMission}번</ClubText>
                        <ClubText>오늘 투표 {club.todayVote}번</ClubText>
                        <ClubText>누적 투표 {club.totalVote}명</ClubText>
                    </ClubRow>
                ))}
            </ClubContainer>
            <CustomRow width='80%' alignItems='center' justifyContent='flex-end'>
                <AllButton>모두보기</AllButton>
            </CustomRow>
        </Container>
    );
};

export default App;
