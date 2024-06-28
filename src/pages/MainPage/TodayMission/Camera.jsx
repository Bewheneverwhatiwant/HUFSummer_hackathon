import React, { useState, useEffect, useRef } from 'react';
import styled from 'styled-components';
import Webcam from 'react-webcam';
import SuccessModal from './SuccessModal';
import FailModal from './FailModal';
import LoadingModal from './LoadingModal';
import CustomFont from '../../../Components/Container/CustomFont';

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
  background-image: url('MainImg_2.png');
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
`;

const ModalOverlay = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-color: rgba(0, 0, 0, 0.5);
  display: flex;
  justify-content: center;
  align-items: center;
`;

const CustomModal = styled.div`
width: 50%;
height: 40vh;
display: flex;
alignItems: center;
justify-content: center;
  position: fixed;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  padding: 20px;
  background-color: white;
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

    // 이미지 업로드 함수!
    // 이미지 업로드 성공 시 SuccessModal이 true, 이미지 업로드 실패 시 FailModal이 true가 되도록!
    // gpt api 연동 후 처리하기
    const uploadImage = () => {
        setIsSuccess(true);
    };

    return (
        <ContainerCenter>
            <PageContainer>
                {!capturedImage ? (
                    <>
                        <CustomFont color='black' font='1rem' fontWeight='bold'>미션을 수행한 후 인증샷을 업로드하세요.</CustomFont>
                        <WebcamContainer>
                            <Webcam
                                audio={false}
                                ref={webcamRef}
                                screenshotFormat="image/jpeg"
                                width={640}
                                height={480}
                            />
                            <CaptureButton onClick={captureImage}>사진 촬영</CaptureButton>
                        </WebcamContainer>
                    </>
                ) : (
                    <CapturedImageContainer>
                        <CapturedImage src={capturedImage} alt="Captured" />
                        <ButtonContainer>
                            <ActionButton onClick={uploadImage}>업로드</ActionButton>
                            <ActionButton onClick={retakeImage}>재촬영</ActionButton>
                        </ButtonContainer>
                    </CapturedImageContainer>
                )}
                {isSuccess && (
                    <SuccessModal />
                )}
                {isFail && (
                    <FailModal />
                )}
                {isLoading && (
                    <LoadingModal />
                )}
            </PageContainer>
        </ContainerCenter>
    );
};

export default App;
