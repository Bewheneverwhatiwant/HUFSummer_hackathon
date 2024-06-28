import React, { useState } from 'react';
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

const ItemContainer = styled.div`
border: 1px solid #ddd;
border-radius: 8px;
padding: 16px;
margin: 10px;
max-width: 150px;
text-align: center;
cursor: pointer;
min-height: 230px;
min-width: 170px;
display: flex;
flex-direction: column;
align-items: center;
justify-content: center;
`;

const ItemImage = styled.img`
width: 100px;
height: 100px;
border-radius: 8px;
`;

const ItemText = styled.h3`
font-size: 15px;
margin: 12px 0 8px;
`;

const ItemPoints = styled.p`
font-size: 16px;
color: #555;
`;
const Donatedata = [
    {
        'img': 'https://ae01.alicdn.com/kf/S139a8230386c4dc68e22ac256c42d6bbw/TPU.jpg',
        'text1': '마라톤 선수에게 물병 후원하기',
    },
    {
        'img': 'https://sitem.ssgcdn.com/38/19/62/item/1000524621938_i1_750.jpg',
        'text1': '수영 선수에게 팔꿈치 보호대 후원하기',
    },
    {
        'img': 'https://giftinfo.co.kr/shop/item_images/zoom1/298398.jpg',
        'text1': '높이뛰기 선수에게 쿨토시 후원하기',
    },
    {
        'img': 'https://image.auction.co.kr/itemimage/3f/83/0a/3f830a5b01.jpg',
        'text1': '멀리뛰기 선수에게 운동화 후원하기',
    },
];

const DonationItem = ({ img, text1 }) => (
    <ItemContainer>
        <ItemImage src={img} alt={text1} />
        <ItemText>{text1}</ItemText>
    </ItemContainer>
);

export default function DonateThings() {


    return (
        <Container>
            <CustomRow width='55%' alignItems='center' justifyContent='flex-start'>
                <CustomFont color='black' font='1.8rem' fontWeight='bold'>이런 것들을 기부할 수 있어요!</CustomFont>
            </CustomRow>

            <CustomRow width='55%' alignItems='center' justifyContent='flex-start'>
                {Donatedata.map((item, index) => (
                    <DonationItem
                        key={index}
                        img={item.img}
                        text1={item.text1}
                    />
                ))}
            </CustomRow>

        </Container>
    );
}


