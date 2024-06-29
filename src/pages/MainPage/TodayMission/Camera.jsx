import React, { useState, useRef, useEffect } from 'react';
import styled from 'styled-components';
import axios from 'axios';
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
  background-image: url('camBack.png');
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
    const [isSuccess, setIsSuccess] = useState(false);
    const [isFail, setIsFail] = useState(false);
    const [isLoading, setIsLoading] = useState(false);
    const [missionId, setMissionId] = useState(null);

    useEffect(() => {
        const fetchMissionId = async () => {
            try {
                const accessToken = localStorage.getItem('accessToken');
                const response = await axios.get(`${import.meta.env.VITE_REACT_APP_SERVER}/missions/today`, {
                    headers: {
                        Authorization: `Bearer ${accessToken}`
                    }
                });
                setMissionId(response.data.memberMissionId);
                console.log('Fetched Mission ID:', response.data.memberMissionId);
            } catch (error) {
                console.error('Failed to fetch mission ID', error);
            }
        };
        fetchMissionId();
    }, []);

    const captureImage = () => {
        const imageSrc = webcamRef.current.getScreenshot();
        console.log('Captured Image Source:', imageSrc);
        setCapturedImage(imageSrc);
    };

    const uploadImage = async () => {
        if (!missionId) {
            console.error('Mission ID is not available');
            console.log('Mission ID:', missionId);
            return;
        }

        setIsLoading(true);
        const formData = new FormData();

        const base64Image = capturedImage.split(',')[1];
        const byteCharacters = atob(base64Image);
        const byteNumbers = new Array(byteCharacters.length);
        for (let i = 0; i < byteCharacters.length; i++) {
            byteNumbers[i] = byteCharacters.charCodeAt(i);
        }
        const byteArray = new Uint8Array(byteNumbers);
        const blob = new Blob([byteArray], { type: 'image/jpeg' });

        formData.append('image', blob, 'capturedImage.jpg');
        console.log('Form Data:', formData.get('image'));

        try {
            const accessToken = localStorage.getItem('accessToken');
            const response = await axios.post(`${import.meta.env.VITE_REACT_APP_SERVER}/missions/${missionId}/completed`, formData, {
                headers: {
                    'Content-Type': 'multipart/form-data',
                    Authorization: `Bearer ${accessToken}`
                }
            });

            setIsLoading(false);
            console.log('Uploaded Image:', capturedImage);
            console.log('API Response:', response.data);

            if (response.data.isCompleted) {
                setIsSuccess(true);
            } else {
                setIsFail(true);
            }
        } catch (error) {
            console.error('이미지 업로드 중 오류 발생', error);
            setIsLoading(false);
            console.log('Failed Image:', capturedImage);
            setIsFail(true);
        }
        console.log('Used Mission ID:', missionId);
    };

    return (
        <ContainerCenter>
            <PageContainer>
                {!capturedImage ? (
                    <>
                        <CustomFont color='black' font='1.5rem' fontWeight='bold'>미션을 수행한 후 인증샷을 업로드하세요.</CustomFont>
                        <CustomFont color='black' font='1rem'>미션 목표물이 잘 보이도록 촬영해주세요.</CustomFont>
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
                            <ActionButton onClick={() => setCapturedImage(null)}>
                                <CustomFont color='black' font='1rem' fontWeight='bold'>재촬영</CustomFont>
                            </ActionButton>
                        </ButtonContainer>
                    </CapturedImageContainer>
                )}
                {isLoading && <LoadingModal />}
                {isSuccess && <SuccessModal />}
                {isFail && <FailModal setCapturedImage={setCapturedImage} setIsFail={setIsFail} />}
            </PageContainer>
        </ContainerCenter>
    );
};

export default App;
