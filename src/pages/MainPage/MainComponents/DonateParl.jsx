import React, { useState } from 'react';
import styled from 'styled-components';
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
    const DanateList = [
        { 'number': '1', 'Teamlogo': 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTgAQohBsdddPU6aJvkMmqVlSl5HMEs4wqpAQrtSGwCvXn4HsJcH7rrawGVpUxNckFj698&usqp=CAU', 'points': '100' },
        { 'number': '2', 'Teamlogo': 'https://i.namu.wiki/i/nhKvnqKXbs7dbPMggKos010RqfYHxUoKgd4GOPjaN8HICce5HXZo6_zAQJPO8SNd-tMEthvTehq7ef-jzuRoww.svg', 'points': '50' },
        { 'number': '3', 'Teamlogo': 'https://heroesbaseball.co.kr/html/front/web_2018/images/heroes/imgEmblem14.jpg', 'points': '100' },
        { 'number': '4', 'Teamlogo': 'https://www.mediapia.co.kr/news/photo/202010/45766_74518_1044.png', 'points': '180' },
        { 'number': '5', 'Teamlogo': 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTgAQohBsdddPU6aJvkMmqVlSl5HMEs4wqpAQrtSGwCvXn4HsJcH7rrawGVpUxNckFj698&usqp=CAU', 'points': '80' },
        { 'number': '6', 'Teamlogo': 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTgAQohBsdddPU6aJvkMmqVlSl5HMEs4wqpAQrtSGwCvXn4HsJcH7rrawGVpUxNckFj698&usqp=CAU', 'points': '10' },
        { 'number': '7', 'Teamlogo': 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTgAQohBsdddPU6aJvkMmqVlSl5HMEs4wqpAQrtSGwCvXn4HsJcH7rrawGVpUxNckFj698&usqp=CAU', 'points': '150' },
        { 'number': '8', 'Teamlogo': 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTgAQohBsdddPU6aJvkMmqVlSl5HMEs4wqpAQrtSGwCvXn4HsJcH7rrawGVpUxNckFj698&usqp=CAU', 'points': '100' },
        { 'number': '9', 'Teamlogo': 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTgAQohBsdddPU6aJvkMmqVlSl5HMEs4wqpAQrtSGwCvXn4HsJcH7rrawGVpUxNckFj698&usqp=CAU', 'points': '100' },
        { 'number': '10', 'Teamlogo': 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTgAQohBsdddPU6aJvkMmqVlSl5HMEs4wqpAQrtSGwCvXn4HsJcH7rrawGVpUxNckFj698&usqp=CAU', 'points': '100' },
    ];

    const [showAll, setShowAll] = useState(false);

    const handleToggleShow = () => {
        setShowAll(!showAll);
    };

    const DonateFan = ({ number, Teamlogo, points }) => (
        <CustomRow gap='30px'>
            <CustomFont color='red' font='1.5rem' fontWeight='bold'>{number}</CustomFont>
            <ItemImage src={Teamlogo} alt={number} />
            <CustomFont color='black' font='1.3rem'>누적 기부 포인트: {points}</CustomFont>
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
                    {DanateList.slice(0, showAll ? DanateList.length : 3).map((item, index) => (
                        <DonateFan
                            key={index}
                            number={item.number}
                            Teamlogo={item.Teamlogo}
                            points={item.points}
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
