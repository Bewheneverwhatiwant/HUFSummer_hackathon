import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import axios from 'axios';
import CustomRow from '../../../Components/Container/CustomRow';
import CustomFont from '../../../Components/Container/CustomFont';
import CustomColumn from '../../../Components/Container/CustomColumn';

const Container = styled.div`
    display: flex;
    flex-direction: column;
    gap: 10px;
    width: 100%;
    align-items: center;
`;

const ItemImage = styled.img`
    width: 60px;
    height: 60px;
    border-radius: 100px;
`;

const ToggleButton = styled.button`
    padding: 10px 20px;
    font-size: 1rem;
    background-color: #54B3FF;
    color: white;
    border: none;
    border-radius: 10px;
    cursor: pointer;
    margin: 10px 0;
    font-weight: bold;
`;

const DonateBox = styled.div`
    width: 55%;
    background-color: #f2f2f2;
    border-radius: 10px;
    border: 1px solid #ccc;
    padding: 50px;
`;

export default function DonateParl() {
    const [donateList, setDonateList] = useState([]);
    const [showAll, setShowAll] = useState(false);

    useEffect(() => {
        const fetchDonateList = async () => {
            try {
                const response = await axios.get(`${import.meta.env.VITE_REACT_APP_SERVER}/rank/team/donation`);
                setDonateList(response.data.teams);
                console.log(response.data);
            } catch (error) {
                console.error('기부 목록 가져오기 실패', error);
            }
        };

        fetchDonateList();
    }, []);

    const handleToggleShow = () => {
        setShowAll(!showAll);
    };

    const DonateFan = ({ rank, logoUrl, point }) => (
        <CustomRow gap='30px'>
            <CustomFont color='red' font='1.5rem' fontWeight='bold'>{rank}</CustomFont>
            <ItemImage src={logoUrl} alt={`Team ${rank}`} />
            <CustomFont color='black' font='1.3rem'>누적 기부 포인트: {point}</CustomFont>
        </CustomRow>
    );

    return (
        <Container>
            <CustomRow width='55%' alignItems='center' justifyContent='flex-start'>
                <CustomFont color='black' font='1.8rem' fontWeight='bold'>패럴림픽을 후원해요!</CustomFont>
            </CustomRow>
            <CustomRow width='55%' alignItems='center' justifyContent='space-between'>
                <CustomFont color='black' font='1.2rem'>가장 기부를 많이 한 야구 팬클럽은?</CustomFont>
                <CustomFont color='black' font='0.8rem'>30분 단위로 갱신됩니다. </CustomFont>
            </CustomRow>

            <DonateBox>
                <CustomColumn>
                    {donateList.slice(0, showAll ? donateList.length : 3).map((item, index) => (
                        <DonateFan
                            key={index}
                            rank={item.rank}
                            logoUrl={item.logoUrl}
                            point={item.point}
                        />
                    ))}
                </CustomColumn>
            </DonateBox>
            <CustomRow width='55%' alignItems='center' justifyContent='flex-end'>
                <ToggleButton onClick={handleToggleShow}>
                    {showAll ? '간략히' : '전체보기'}
                </ToggleButton>
            </CustomRow>
        </Container>
    );
}
