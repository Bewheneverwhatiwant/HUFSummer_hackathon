import React from 'react';
import styled from 'styled-components';
import CustomModal from '../Container/CustomModal';
import CustomFont from '../Container/CustomFont';
import CustomColumn from '../Container/CustomColumn';
import CustomRow from '../Container/CustomRow';

const ModalContent = styled.div`
  display: flex;
  height: 100%;
  width: 100%;
`;

const LeftPanel = styled.div`
  background-color: #4A90E2;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  padding: 20px;
  color: white;
  width: 40%;
  border-top-left-radius: 50px;
  border-bottom-left-radius: 50px;
  gap: 10px;
`;

const RightPanel = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  width: 60%;
  padding: 40px;
`;

const Input = styled.input`
  width: 100%;
  padding: 10px;
  margin: 10px 0;
  border: 1px solid #ccc;
  border-radius: 4px;
`;

const Button = styled.button`
  width: 100%;
  padding: 10px;
  margin-top: 20px;
  background-color: #ccc;
  border: none;
  border-radius: 4px;
  cursor: pointer;
`;

const Link = styled.a`
  color: #4A90E2;
  cursor: pointer;
  text-decoration: underline;
`;

const LoginModal = ({ isOpen, onClose }) => {
    return (
        <CustomModal isOpen={isOpen} onClose={onClose} height="60vh" borderRadius='50px'>
            <ModalContent>
                <LeftPanel>
                    <img src="https://twemoji.maxcdn.com/v/latest/72x72/1f44b.png" alt="Wave Emoji" />
                    <CustomFont color='white' font='2rem' fontWeight='bold'>HELLO!<br />(서비스명)</CustomFont>
                </LeftPanel>
                <RightPanel>
                    <CustomColumn width='100%' alignItems='center' justifyContent='center' gap='10px'>
                        <CustomFont color='black' font='1.2rem'>로그인</CustomFont>
                        <CustomRow width='100%' alignItems='center' justifyContent='flex-start'>
                            <CustomFont color='black'>ID</CustomFont>
                        </CustomRow>
                        <Input type="text" placeholder="아이디를 입력하세요." />
                        <CustomRow width='100%' alignItems='center' justifyContent='flex-start'>
                            <CustomFont color='black'>PW</CustomFont>
                        </CustomRow>
                        <Input type="password" placeholder="비밀번호를 입력하세요." />
                        <Button>로그인</Button>
                        <CustomRow>
                            <CustomFont color='#4A90E2'>(서비스명)이 처음이시라면?</CustomFont>
                            <Link>회원가입</Link>
                        </CustomRow>
                    </CustomColumn>
                </RightPanel>
            </ModalContent>
        </CustomModal>
    );
};

export default LoginModal;
