import React, { useState, useEffect } from 'react';
import styled, { keyframes } from 'styled-components';
import { useNavigate } from 'react-router-dom';
import CustomRow from '../Container/CustomRow';
import StyledImg from '../Container/StyledImg';
import CustomFont from '../Container/CustomFont';
import CustomColumn from '../Container/CustomColumn';
import axios from 'axios';

// 이 파일에서 회원탈퇴 API 연동하기 !!

const FooterContainer = styled.footer`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  width: 100%;
  height: 17vh;
  background: #5D5D5D;
  color: white;
  gap: 10px;
`;

export default function Footer() {
    const navigate = useNavigate();

    const withdraw = async () => {
        try {
            const response = await axios.delete(`${import.meta.env.VITE_REACT_APP_SERVER}/auth/termination`);
            if (response.status === 200) {
                alert('회원 탈퇴가 완료되었습니다.');
            }
        } catch (error) {
            console.error('회원 탈퇴 실패', error);
            alert('회원 탈퇴 중 오류가 발생했습니다.');
        }
    };
    

    return (

        <FooterContainer>
            <CustomRow width='60%' alignItems='center' justifyContent='center'>
                <StyledImg src={'HUFS_logo.png'} width='120px' height='100px' />
                <CustomColumn width='40%' alignItems='flex-start' justifyContent='center' gap='10px'>
                    <CustomFont color='#929292'>
                        HUFSummer-Hackathon
                    </CustomFont>
                    <CustomFont color='#929292'>
                        Team Name: 뭉풀(뭉치면 풀스택)
                    </CustomFont>
                    <CustomFont color='#929292'>
                        Team Member: 이다은, 이나영, 조유리, 김시원
                    </CustomFont>
                    <button onClick={withdraw}>회원탈퇴</button>
                </CustomColumn>
            </CustomRow>
        </FooterContainer>
    );
}