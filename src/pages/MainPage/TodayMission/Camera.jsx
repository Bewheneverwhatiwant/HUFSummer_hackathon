import React, { useState, useRef, useEffect } from 'react';
import styled from 'styled-components';
import Webcam from 'react-webcam';
import SuccessModal from './SuccessModal';
import FailModal from './FailModal';
import LoadingModal from './LoadingModal';
import CustomFont from '../../../Components/Container/CustomFont';
import StyledImg from '../../../Components/Container/StyledImg';

const ContainerCenter = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 10px;
  width: 100%;
  min-height: 100vh;
`;

const PageContainer = styled(ContainerCenter)`
  width: 100%;
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
  padding-top: 8vh;
  padding-bottom: 5vh;
  gap: 2rem;
  position: relative;
  background-color: white;
  background-image: url('cameraBack.png');
  background-size: 100% 100%;
`;

const WebcamContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
`;

const CaptureButton = styled.button`
  margin-top: 10px;
  padding: 10px 20px;
  font-size: 16px;
  cursor: pointer;
  border: none;
  background-color: transparent;
`;

const CapturedImageContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
`;

const CapturedImage = styled.img`
  margin-top: 20px;
  max-width: 100%;
`;

const ButtonContainer = styled.div`
  display: flex;
  gap: 10px;
  margin-top: 20px;
`;

const ActionButton = styled.button`
  padding: 10px 20px;
  font-size: 16px;
  cursor: pointer;
  border: none;
  background-color: #D9D9D9;
`;

const App = () => {
    const webcamRef = useRef(null);
    const [capturedImage, setCapturedImage] = useState(null);
    const [isSuccess, setIsSuccess] = useState(false); // 이미지 업로드 성공 시 Modal
    const [isFail, setIsFail] = useState(false); // 이미지 업로드 실패 시 Modal
    const [isLoading, setIsLoading] = useState(false);

    const captureImage = () => {
        const imageSrc = webcamRef.current.getScreenshot();
        setCapturedImage(imageSrc);
    };

    const retakeImage = () => {
        setCapturedImage(null);
    };

    // 이미지 업로드 함수
    // 이미지 업로드 성공 시 SuccessModal이 true, 이미지 업로드 실패 시 FailModal이 true가 되도록!
    // gpt api 연동 후 처리하기
    const uploadImage = () => {
        setIsLoading(true);
        setTimeout(() => {
            setIsLoading(false);
            setIsSuccess(true);
        }, 3000); // 3초 후에 isLoading을 false로 설정하고 isSuccess를 true로 설정
    };

    return (
        <ContainerCenter>
            <PageContainer>
                {!capturedImage ? (
                    <>
                        <CustomFont color='black' font='1.5rem' fontWeight='bold'>미션을 수행한 후 인증샷을 업로드하세요.</CustomFont>
                        <CustomFont color='black' font='1rem' >미션 목표물이 잘 보이도록 촬영해주세요.</CustomFont>
                        <WebcamContainer>
                            <Webcam
                                audio={false}
                                ref={webcamRef}
                                screenshotFormat="image/jpeg"
                                width={640}
                                height={480}
                            />
                            <CaptureButton onClick={captureImage}>
                                <StyledImg src={'icon_camera.png'} width='100px' height='100px' />
                            </CaptureButton>
                        </WebcamContainer>
                    </>
                ) : (
                    <CapturedImageContainer>
                        <CapturedImage src={capturedImage} alt="Captured" />
                        <ButtonContainer>
                            <ActionButton onClick={uploadImage}>
                                <CustomFont color='black' font='1rem' fontWeight='bold'>업로드</CustomFont>
                            </ActionButton>
                            <ActionButton onClick={retakeImage}>
                                <CustomFont color='black' font='1rem' fontWeight='bold'>재촬영</CustomFont>
                            </ActionButton>
                        </ButtonContainer>
                    </CapturedImageContainer>
                )}
                {isLoading && <LoadingModal />}
                {isSuccess && <SuccessModal />}
                {isFail && <FailModal />}
            </PageContainer>
        </ContainerCenter>
    );
};

export default App;
