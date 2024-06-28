import React from 'react';
import styled from 'styled-components';
import CustomColumn from '../../../Components/Container/CustomColumn';
import CustomRow from '../../../Components/Container/CustomRow';
import CustomFont from '../../../Components/Container/CustomFont';
import StyledImg from '../../../Components/Container/StyledImg';
import { useNavigate } from 'react-router-dom';

const CustomModal = styled.div`
  width: 50%;
  height: 40vh;
  display: flex;
  align-items: center;
  justify-content: center;
  position: fixed;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  padding: 20px;
  background-color: white;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.2);
  border-radius: 10px;
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

const FailModal = ({ setCapturedImage, setIsFail }) => {
    const navigate = useNavigate();

    const camera = () => {
        setCapturedImage(null);
        setIsFail(false);
        navigate('/camera');
        console.log('재촬영 버튼 클릭');
    };

    return (
        <>
            <ModalOverlay />
            <CustomModal>
                <CustomColumn width='100%' alignItems='center' justifyContent='center'>
                    <CustomRow width='100%' alignItems='center' justifyContent='center'>
                        <StyledImg src={'missionFail.png'} width='150px' height='150px' />
                        <CustomColumn width='60%' alignItems='center' justifyContent='center'>
                            <CustomFont color='black' fontWeight='bold' font='2rem'>미션 실패...</CustomFont>
                            <CustomFont color='black' fontWeight='bold' font='2rem'>다른 쓰레기를 찾아 다시 촬영해주세요!</CustomFont>
                        </CustomColumn>
                    </CustomRow>
                    <button onClick={camera}>재촬영</button>
                </CustomColumn>
            </CustomModal>
        </>
    );
};

export default FailModal;
