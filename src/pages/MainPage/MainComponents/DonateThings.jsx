import React, { useState, useEffect, useRef } from 'react';
import styled from 'styled-components';
import CustomRow from '../../../Components/Container/CustomRow';
import CustomFont from '../../../Components/Container/CustomFont';

const Container = styled.div`
  display: flex;
  flex-direction: column;
  gap: 10px;
  width: 100%;
  align-items: center;
`;

const SliderContainer = styled.div`
  width: 55%;
  overflow: hidden;
  position: relative;
`;

const SliderWrapper = styled.div`
  display: flex;
  width: max-content;
  animation: ${({ isPaused }) => isPaused ? 'none' : 'slide 20s linear infinite'};
  @keyframes slide {
    0% {
      transform: translateX(0);
    }
    100% {
      transform: translateX(-50%);
    }
  }
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
  &:hover {
    transform: translateY(-10px);
    box-shadow: 0px 3px 8px 0px rgba(0, 0, 0, 0.1);
    transition: transform 0.2s ease-in-out;
    cursor: pointer;
    border-radius: 0.625rem;
  }
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
    'img': 'https://recipe1.ezmember.co.kr/cache/recipe/2021/10/18/0abdc24ec77c6c284aac0e2647c5d6b01.jpg',
    'text1': '유소년 축구부에 도시락 후원하기',
  },
  {
    'img': 'https://cdn.hankyung.com/photo/202310/01.34767654.1.jpg',
    'text1': '선수촌 건강 검진비 후원하기',
  },
  {
    'img': 'https://qi-o.qoo10cdn.com/goods_image_big/0/3/0/9/8593340309_l.jpg',
    'text1': '청소년 농구 선수에게 농구화 후원하기',
  },
];

const DonationItem = ({ img, text1, onMouseEnter, onMouseLeave }) => (
  <ItemContainer onMouseEnter={onMouseEnter} onMouseLeave={onMouseLeave}>
    <ItemImage src={img} alt={text1} />
    <ItemText>{text1}</ItemText>
  </ItemContainer>
);

export default function DonateThings() {
  const [isPaused, setIsPaused] = useState(false);
  const sliderRef = useRef();

  const handleMouseEnter = () => setIsPaused(true);
  const handleMouseLeave = () => setIsPaused(false);

  useEffect(() => {
    const slider = sliderRef.current;
    if (isPaused) {
      slider.style.animationPlayState = 'paused';
    } else {
      slider.style.animationPlayState = 'running';
    }
  }, [isPaused]);

  return (
    <Container>
      <CustomRow width='55%' alignItems='center' justifyContent='flex-start'>
        <CustomFont color='black' font='1.8rem' fontWeight='bold'>이런 것들을 기부할 수 있어요!</CustomFont>
      </CustomRow>

      <SliderContainer>
        <SliderWrapper ref={sliderRef}>
          {Donatedata.concat(Donatedata).map((item, index) => (
            <DonationItem
              key={index}
              img={item.img}
              text1={item.text1}
              onMouseEnter={handleMouseEnter}
              onMouseLeave={handleMouseLeave}
            />
          ))}
        </SliderWrapper>
      </SliderContainer>
    </Container>
  );
}
