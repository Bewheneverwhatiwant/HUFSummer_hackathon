import React, { keyframes } from 'react';
import styled from 'styled-components';
import CustomFont from '../../../Components/Container/CustomFont';
import CustomColumn from '../../../Components/Container/CustomColumn';

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

const LoadingModal = () => {

    return (
        <>
            <ModalOverlay />
            <CustomModal>
                <CustomColumn width='100%' alignItems='center' justifyContent='center'>
                    <CustomFont color='black' fontWeight='bold' font='1rem'>AI가 이미지를 검사 중입니다.</CustomFont>
                    <CustomFont color='black' fontWeight='bold' font='1rem'>잠시만 기다려주십시오...</CustomFont>

                </CustomColumn>
            </CustomModal>
        </>
    );
};

export default LoadingModal;
