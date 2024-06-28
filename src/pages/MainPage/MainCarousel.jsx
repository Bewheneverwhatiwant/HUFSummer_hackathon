import React, { useState, useEffect } from 'react';
import styled from 'styled-components';

const CarouselContainer = styled.div`
  position: relative;
  width: 100%;
  max-width: 1300px;
  margin: 0 auto;
  overflow: hidden;
`;

const ImageContainer = styled.div`
  display: flex;
  transition: transform 0.5s ease-in-out;
  transform: translateX(${props => props.translate}px);
  width: 100%;
`;

const ImageWrapper = styled.div`
  width: 100%;
  flex-shrink: 0;
`;

const Image = styled.img`
  width: 100%;
  height: 100%;
  object-fit: cover;
`;

const Button = styled.button`
  position: absolute;
  top: 50%;
  transform: translateY(-50%);
  background-color: rgba(255, 255, 255, 0.5);
  border: none;
  cursor: pointer;
  padding: 10px;
  z-index: 10;

  &:hover {
    background-color: rgba(255, 255, 255, 0.8);
  }
`;

const PrevButton = styled(Button)`
  left: 10px;
`;

const NextButton = styled(Button)`
  right: 10px;
`;

const IndicatorContainer = styled.div`
  position: absolute;
  bottom: 10px;
  left: 50%;
  transform: translateX(-50%);
  display: flex;
  gap: 5px;
`;

const Indicator = styled.div`
  width: 10px;
  height: 10px;
  border-radius: 50%;
  background-color: ${props => (props.isActive ? 'black' : '#D9D9D9')};
  cursor: pointer;
`;

const images = [
    'bannerEx1.png',
    'bannerEx2.png',
    'bannerEx3.png',
];

const MainCarousel = () => {
    const [currentIndex, setCurrentIndex] = useState(0);
    const [translate, setTranslate] = useState(0);
    const [containerWidth, setContainerWidth] = useState(0);

    useEffect(() => {
        const interval = setInterval(() => {
            handleNext();
        }, 2000);
        return () => clearInterval(interval);
    }, [currentIndex]);

    useEffect(() => {
        const handleResize = () => {
            const width = document.querySelector('.carousel-container').clientWidth;
            setContainerWidth(width);
            setTranslate(-width * currentIndex);
        };

        handleResize();
        window.addEventListener('resize', handleResize);

        return () => {
            window.removeEventListener('resize', handleResize);
        };
    }, [currentIndex]);

    const handleNext = () => {
        if (currentIndex === images.length - 1) {
            setCurrentIndex(0);
            setTranslate(0);
        } else {
            setCurrentIndex(prevIndex => prevIndex + 1);
            setTranslate(prevTranslate => prevTranslate - containerWidth);
        }
    };

    const handlePrev = () => {
        if (currentIndex === 0) {
            setCurrentIndex(images.length - 1);
            setTranslate(-containerWidth * (images.length - 1));
        } else {
            setCurrentIndex(prevIndex => prevIndex - 1);
            setTranslate(prevTranslate => prevTranslate + containerWidth);
        }
    };

    const handleIndicatorClick = (index) => {
        setCurrentIndex(index);
        setTranslate(-containerWidth * index);
    };

    return (
        <CarouselContainer className="carousel-container">
            <ImageContainer translate={translate}>
                {images.map((image, index) => (
                    <ImageWrapper key={index}>
                        <Image src={image} alt={`Slide ${index + 1}`} />
                    </ImageWrapper>
                ))}
            </ImageContainer>
            <PrevButton onClick={handlePrev}>{'<'}</PrevButton>
            <NextButton onClick={handleNext}>{'>'}</NextButton>
            <IndicatorContainer>
                {images.map((_, index) => (
                    <Indicator
                        key={index}
                        isActive={index === currentIndex}
                        onClick={() => handleIndicatorClick(index)}
                    />
                ))}
            </IndicatorContainer>
        </CarouselContainer>
    );
};

export default MainCarousel;
