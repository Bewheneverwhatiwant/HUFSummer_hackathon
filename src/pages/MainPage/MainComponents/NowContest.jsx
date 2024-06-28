import React, { useState } from 'react';
import styled from 'styled-components';
import CustomFont from '../../../Components/Container/CustomFont';
import CustomRow from '../../../Components/Container/CustomRow';
import CustomColumn from '../../../Components/Container/CustomColumn';

const Container = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 10px;
  width: 100%;
`;

const MatchContainer = styled.div`
  width: 50%;
  min-height: 2rem;
  background-color: #f2f2f2;
  padding: 30px;
  margin: 10px 0;
  border-radius: 10px;
  border: ${(props) => (props.selected ? '2px solid blue' : '1px solid #ccc')};
  display: flex;
  flex-direction: row;
`;

const TeamContainer = styled.div`
  display: flex;
  justify-content: space-around;
  align-items: center;
  padding: 10px;
`;

const RadioButton = styled.input`
  cursor: pointer;
`;

const Checkbox = styled.input`
  cursor: pointer;
`;

const VoteButton = styled.button`
  padding: 10px 20px;
  font-size: 16px;
  cursor: pointer;
  background-color: #54B3FF;
  border-radius: 10px;
  border: none;
`;

const App = () => {
    const [selectedMatch, setSelectedMatch] = useState(null);
    const [selectedTeams, setSelectedTeams] = useState({});

    const matches = [
        { id: 1, team1: '팀 A', team2: '팀 B', votes1: 30, votes2: 15 },
        { id: 2, team1: '팀 C', team2: '팀 D', votes1: 30, votes2: 15 },
        { id: 3, team1: '팀 E', team2: '팀 F', votes1: 30, votes2: 15 },
    ];

    const handleMatchSelect = (matchId) => {
        if (selectedMatch === matchId) {
            setSelectedMatch(null);
            setSelectedTeams({});
        } else {
            setSelectedMatch(matchId);
            setSelectedTeams({});
        }
    };

    const handleTeamSelect = (matchId, team) => {
        setSelectedTeams({ ...selectedTeams, [matchId]: team });
    };

    const handleVote = () => {
        console.log('Selected Match:', selectedMatch);
        console.log('Selected Teams:', selectedTeams);
    };

    return (
        <Container>
            <CustomRow width='50%' alignItems='center' justifyContent='flex-start'>
                <CustomFont color='black' font='1.5rem' fontWeight='bold'>지금 경기는?</CustomFont>
            </CustomRow>
            <CustomRow width='50%' alignItems='center' justifyContent='flex-start'>
                <CustomFont color='black' font='1rem'>경기를 고르고 팀에게 투표하세요.</CustomFont>
            </CustomRow>
            {matches.map((match) => (
                <MatchContainer
                    key={match.id}
                    selected={selectedMatch === match.id}
                >
                    <CustomRow width='100%' alignItems='center' justifyContent='center'>
                        <Checkbox
                            type="checkbox"
                            checked={selectedMatch === match.id}
                            onChange={() => handleMatchSelect(match.id)}
                        />
                        <CustomColumn width='100%' alignItems='center' justifyContent='center'>
                            <CustomRow width='100%' alignItems='center' justifyContent='space-around' gap='1rem'>
                                <div>
                                    <div>{match.team1}</div>
                                    <div>{match.votes1}표</div>
                                </div>
                                <div>VS</div>
                                <div>
                                    <div>{match.team2}</div>
                                    <div>{match.votes2}표</div>
                                </div>
                            </CustomRow>
                            {selectedMatch === match.id && (
                                <TeamContainer>
                                    <CustomRow width='100%' alignItems='center' justifyContent='center' gap='1rem'>
                                        <div>
                                            <RadioButton
                                                type="radio"
                                                name={`team-${match.id}`}
                                                checked={selectedTeams[match.id] === match.team1}
                                                onChange={() => handleTeamSelect(match.id, match.team1)}
                                            />
                                            <label>{match.team1}</label>
                                        </div>
                                        <div>
                                            <RadioButton
                                                type="radio"
                                                name={`team-${match.id}`}
                                                checked={selectedTeams[match.id] === match.team2}
                                                onChange={() => handleTeamSelect(match.id, match.team2)}
                                            />
                                            <label>{match.team2}</label>
                                        </div>
                                    </CustomRow>
                                </TeamContainer>
                            )}
                        </CustomColumn>
                    </CustomRow>
                </MatchContainer>
            ))}
            <CustomRow width='50%' alignItems='center' justifyContent='flex-end'>
                <VoteButton onClick={handleVote}>
                    <CustomFont color='white' fontWeight='bold' font='1rem'>
                        투표하기
                    </CustomFont>
                </VoteButton>
            </CustomRow>
        </Container>
    );
};

export default App;
