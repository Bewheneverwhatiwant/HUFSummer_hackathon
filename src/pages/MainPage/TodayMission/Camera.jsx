import React, { useState, useRef } from 'react';
import styled from 'styled-components';
import Webcam from 'react-webcam';

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

const CustomModal = styled.div`
  position: fixed;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  padding: 20px;
  background-color: white;
  border: 1px solid #ccc;
  box-shadow: 0 2px 10px rgba(0, 0, 0, 0.1);
`;

const App = () => {
    const webcamRef = useRef(null);
    const [capturedImage, setCapturedImage] = useState(null);
    const [isUploading, setIsUploading] = useState(false);

    const captureImage = () => {
        const imageSrc = webcamRef.current.getScreenshot();
        setCapturedImage(imageSrc);
    };

    const retakeImage = () => {
        setCapturedImage(null);
    };

    const uploadImage = () => {
        setIsUploading(true);
        // 여기에서 업로드 로직을 구현합니다. 예를 들어, 업로드를 시뮬레이션하기 위해 setTimeout을 사용할 수 있습니다.
        setTimeout(() => {
            setIsUploading(false);
            alert('이미지가 업로드되었습니다.');
        }, 2000);
    };

    return (
        <ContainerCenter>
            <PageContainer>
                {!capturedImage ? (
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
                ) : (
                    <CapturedImageContainer>
                        <CapturedImage src={capturedImage} alt="Captured" />
                        <ButtonContainer>
                            <ActionButton onClick={uploadImage}>업로드</ActionButton>
                            <ActionButton onClick={retakeImage}>재촬영</ActionButton>
                        </ButtonContainer>
                    </CapturedImageContainer>
                )}
                {isUploading && (
                    <CustomModal>
                        이미지 업로드 중...
                    </CustomModal>
                )}
            </PageContainer>
        </ContainerCenter>
    );
};

export default App;
