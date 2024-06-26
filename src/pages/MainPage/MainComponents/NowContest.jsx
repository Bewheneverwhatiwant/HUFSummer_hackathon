import React, { useState, useEffect } from 'react';
import styled, { keyframes } from 'styled-components';
import axios from 'axios';
import CustomFont from '../../../Components/Container/CustomFont';
import CustomRow from '../../../Components/Container/CustomRow';
import CustomColumn from '../../../Components/Container/CustomColumn';
import { useAuth } from '../../SubPage/AuthContext';
import StyledImg from '../../../Components/Container/StyledImg';

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

const batMove = keyframes`
  0%, 100% {
    left: 20px;
    transform: rotate(0deg);
  }
  25% {
    transform: rotate(-30deg);
  }
  75% {
    transform: rotate(30deg);
  }
  50% {
    left: 30px;
  }
`;

const Bat = styled.img`
  width: 70px;
  height: 70px;
  animation: ${batMove} 0.5s linear infinite;
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
                const accessToken = localStorage.getItem('accessToken'); // localStorage에서 accessToken 가져오기
                const response = await axios.get(`${import.meta.env.VITE_REACT_APP_SERVER}/game`, {
                    params: { date: today },
                    headers: {
                        Authorization: `Bearer ${accessToken}`
                    }
                });
                setMatches(response.data.games);
            } catch (error) {
                console.error('경기 정보 가져오기 실패', error);
            }
        };

        fetchMatches();
    }, []);

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

    const handleVote = async () => {
        try {
            if (selectedMatch !== null && selectedTeams[selectedMatch]) {
                const match = matches[selectedMatch];
                const selectedTeam = match.teams.find(team => team.name === selectedTeams[selectedMatch]);
                const accessToken = localStorage.getItem('accessToken'); // localStorage에서 accessToken 가져오기

                if (selectedTeam) {
                    const response = await axios.post(`${import.meta.env.VITE_REACT_APP_SERVER}/bet`, null, {
                        params: {
                            baseballGameId: match.gameId,
                            teamId: selectedTeam.teamId
                        },
                        headers: {
                            Authorization: `Bearer ${accessToken}`
                        }
                    });

                    console.log('teamId:', selectedTeam.teamId);
                    console.log('gameId:', match.gameId);

                    if (response.status === 200) {
                        alert('투표가 성공적으로 완료되었습니다.');
                    }
                }
            }
        } catch (error) {
            console.error('투표 중 오류 발생', error);
            if (selectedMatch !== null && selectedTeams[selectedMatch]) {
                const match = matches[selectedMatch];
                const selectedTeam = match.teams.find(team => team.name === selectedTeams[selectedMatch]);
                if (selectedTeam) {
                    console.log('teamId:', selectedTeam.teamId);
                    console.log('gameId:', match.gameId);
                }
            }
        }
    };


    // // 테스트코드
    // const handleVote = async () => {
    //     try {
    //         const teamId = 2;
    //         const gameId = 9;

    //         const accessToken = localStorage.getItem('accessToken'); // localStorage에서 accessToken 가져오기

    //         const response = await axios.post(`${import.meta.env.VITE_REACT_APP_SERVER}/bet`, null, {
    //             params: {
    //                 baseballGameId: gameId,
    //                 teamId: teamId
    //             },
    //             headers: {
    //                 Authorization: `Bearer ${accessToken}`
    //             }
    //         });

    //         console.log('teamId:', teamId);
    //         console.log('gameId:', gameId);

    //         if (response.status === 200) {
    //             alert('투표가 성공적으로 완료되었습니다.');
    //         }
    //     } catch (error) {
    //         console.error('투표 중 오류 발생', error);
    //         console.log('teamId:', 2);
    //         console.log('gameId:', 9);
    //     }
    // };


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
                                        <CustomRow>
                                            <TeamLogo src={team.logoUrl} alt={`${team.name} logo`} />
                                            <CustomColumn alignItems='center'>

                                                <div>{team.name} ({team.isHome ?
                                                    <>
                                                        <CustomFont color='black' font='1rem' fontWeight='bold'>
                                                            H
                                                        </CustomFont>
                                                        <StyledImg src={'icon_fire.png'} width='20px' height='20px' />
                                                    </>
                                                    : 'A'})</div>
                                                <div>{team.vote}표</div>
                                            </CustomColumn>
                                        </CustomRow>
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
                </MatchContainer >
            ))}
            <CustomRow width='50%' alignItems='center' justifyContent='flex-end'>
                <Bat src="icon_bat.png" />
                <VoteButton onClick={handleVote}>
                    <CustomFont color='white' fontWeight='bold' font='1rem'>
                        투표하기
                    </CustomFont>
                </VoteButton>
            </CustomRow>
        </Container >
    );
};

export default App;
