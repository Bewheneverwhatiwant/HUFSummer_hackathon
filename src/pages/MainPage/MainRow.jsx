import React, { useState } from 'react';
import styled from 'styled-components';
import CustomRow from '../../Components/Container/CustomRow';
import CustomColumn from '../../Components/Container/CustomColumn';
import CustomFont from '../../Components/Container/CustomFont';

const Container = styled.div`
  display: flex;
  align-items: center;
`;

const BoxContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  margin: 0 10px;
`;

// 현재 Ex 이미지가 회색 부분이 있음. 스타일 설정의 문제가 아님~
const Box = styled.button`
  width: 200px;
  height: 200px;
  background-size: cover;
  border: none;
  cursor: pointer;
  margin-bottom: 5px;
`;

const Text = styled.div`
  text-align: center;
`;

const ArrowButton = styled.button`
  width: 50px;
  height: 50px;
  border-radius: 50%;
  border: none;
  background-color: #E0E0E0;
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
`;

const MainRow = () => {
    const images1 = [
        { src: 'MainRowEx1.png', text: 'a' },
        { src: 'MainRowEx2.png', text: 'b' },
        { src: 'MainRowEx3.png', text: 'c' },
        { src: 'MainRowEx4.png', text: 'd' }
    ];
    const images2 = [
        { src: 'MainRowEx1.png', text: 'e' },
        { src: 'MainRowEx2.png', text: 'f' },
        { src: 'MainRowEx3.png', text: 'g' },
        { src: 'MainRowEx4.png', text: 'h' }
    ];

    const [visibleImages, setVisibleImages] = useState(images1);

    const handleClick = () => {
        setVisibleImages(visibleImages === images1 ? images2 : images1);
    };

    return (
        <Container>
            <CustomColumn width='100%' alignItems='center' justifyContent='center'>
                <CustomRow width='90%' alignItems='center' justifyContent='flex-start'>
                    <CustomFont color='black' font='1.3rem' fontWeight='bold'>유저님을 위한 추천</CustomFont>
                </CustomRow>
                <CustomRow width='100%' alignItems='center' justifyContent='center'>
                    {visibleImages.map((image, index) => (
                        <BoxContainer key={index}>
                            <Box style={{ backgroundImage: `url(${image.src})` }} />
                            <Text>{image.text}</Text>
                        </BoxContainer>
                    ))}
                    <ArrowButton onClick={handleClick}>
                        <CustomFont color='white' font='1.5rem' fontWeight='bold'>{'>'}</CustomFont>
                    </ArrowButton>
                </CustomRow>
            </CustomColumn>
        </Container>
    );
};

export default MainRow;
