import React from 'react';
import styled from 'styled-components';

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

const ClubContainer = styled.div`
  width: 80%;
  background-color: #f2f2f2;
  padding: 20px;
  border-radius: 10px;
  text-align: center;
  border: 1px solid #ccc;
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

const ClubImage = styled.div`
  width: 50px;
  height: 50px;
  background-color: #ccc;
  border-radius: 50%;
  margin-bottom: 10px;
`;

const ClubText = styled.p`
  font-size: 0.9rem;
  margin: 2px 0;
`;

const App = () => {
    const fans = [
        { id: 1, missions: 'nn', totalVotes: 'nn' },
        { id: 2, missions: 'nn', totalVotes: 'nn' },
        { id: 3, missions: 'nn', totalVotes: 'nn' },
    ];

    return (
        <Container>
            <Title>가장 매너있는 야구 팬은?</Title>
            <Subtitle>30분 단위로 갱신됩니다.</Subtitle>
            <ClubContainer>
                {fans.map((fan) => (
                    <ClubRow key={fan.id}>
                        <ClubNumber>{fan.id}</ClubNumber>

                        <ClubImage />
                        <ClubText>미션 달성 {fan.missions}번</ClubText>

                        <ClubText>누적 투표 {fan.totalVotes}번</ClubText>
                    </ClubRow>
                ))}
            </ClubContainer>
        </Container>
    );
};

export default App;
