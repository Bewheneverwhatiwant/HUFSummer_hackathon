import React from 'react';
import styled from 'styled-components';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../../pages/SubPage/AuthContext';
import CustomRow from '../Container/CustomRow';
import StyledImg from '../Container/StyledImg';
import CustomFont from '../Container/CustomFont';
import CustomColumn from '../Container/CustomColumn';
import axios from 'axios';

// 이 파일에서 회원탈퇴 API 연동하기 !! -> swagger 수정 후 400에러 해결해야함

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

const WithdrawButton = styled.button`
  background-color: transparent;
  color: white;
  border: 1px solid #ccc;
  border-radius: 4px;
  padding: 5px 10px;
  cursor: pointer;
`;

// 백엔드와 협의하여 수정하기
export default function Footer() {
    const { auth, logout } = useAuth();
    const navigate = useNavigate();

    const withdraw = async () => {
        try {
            const response = await axios.delete(`${import.meta.env.VITE_REACT_APP_SERVER}/auth/termination`);
            if (response.status === 200) {
                alert('회원 탈퇴가 완료되었습니다.');
                logout();
                navigate('/');
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
                    {auth.isLoggedIn && (
                        <WithdrawButton onClick={withdraw}>회원탈퇴</WithdrawButton>
                    )}
                </CustomColumn>
            </CustomRow>
        </FooterContainer>
    );
}
