import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import axios from 'axios';
import CustomFont from '../../../Components/Container/CustomFont';
import CustomRow from '../../../Components/Container/CustomRow';
import CustomColumn from '../../../Components/Container/CustomColumn';
import { useAuth } from '../../SubPage/AuthContext';

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

const TeamLogo = styled.img`
  width: 50px;
  height: 50px;
  margin-right: 10px;
`;

const App = () => {
    const [selectedMatch, setSelectedMatch] = useState(null);
    const [selectedTeams, setSelectedTeams] = useState({});
    const [matches, setMatches] = useState([]);
    const { auth } = useAuth();  // useAuth 훅을 사용해서 auth 객체를 가져옴

    useEffect(() => {
        const fetchMatches = async () => {
            try {
                const today = new Date().toISOString().split('T')[0]; // 오늘 날짜를 'YYYY-MM-DD' 형식으로 얻기
                const response = await axios.get(`${import.meta.env.VITE_REACT_APP_SERVER}/game`, {
                    params: { date: today },
                    headers: {
                        Authorization: `Bearer ${auth.accessToken}`
                    }
                });
                setMatches(response.data.games);
            } catch (error) {
                console.error('경기 정보 가져오기 실패', error);
            }
        };

        fetchMatches();
    }, [auth.accessToken]);

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
            {matches.map((match, matchIndex) => (
                <MatchContainer
                    key={matchIndex}
                    selected={selectedMatch === matchIndex}
                >
                    <CustomRow width='100%' alignItems='center' justifyContent='center'>
                        <Checkbox
                            type="checkbox"
                            checked={selectedMatch === matchIndex}
                            onChange={() => handleMatchSelect(matchIndex)}
                        />
                        <CustomColumn width='100%' alignItems='center' justifyContent='center'>
                            <CustomRow width='100%' alignItems='center' justifyContent='space-around' gap='1rem'>
                                {match.teams.map((team, teamIndex) => (
                                    <div key={teamIndex}>
                                        <CustomRow alignItems='center'>
                                            <TeamLogo src={team.logoUrl} alt={`${team.name} logo`} />
                                            <div>{team.name} ({team.isHome ? 'H' : 'A'})</div>
                                        </CustomRow>
                                        <div>{team.vote}표</div>
                                    </div>
                                ))}
                            </CustomRow>
                            {selectedMatch === matchIndex && (
                                <TeamContainer>
                                    <CustomRow width='100%' alignItems='center' justifyContent='center' gap='1rem'>
                                        {match.teams.map((team, teamIndex) => (
                                            <div key={teamIndex}>
                                                <RadioButton
                                                    type="radio"
                                                    name={`team-${matchIndex}`}
                                                    checked={selectedTeams[matchIndex] === team.name}
                                                    onChange={() => handleTeamSelect(matchIndex, team.name)}
                                                />
                                                <label>{team.name} ({team.isHome ? 'H' : 'A'})</label>
                                            </div>
                                        ))}
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
