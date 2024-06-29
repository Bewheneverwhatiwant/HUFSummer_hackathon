import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import axios from 'axios';
import { useAuth } from '../../pages/SubPage/AuthContext';
import CustomModal from '../Container/CustomModal';
import CustomFont from '../Container/CustomFont';
import CustomColumn from '../Container/CustomColumn';
import CustomRow from '../Container/CustomRow';
import SignupPanel from './SignupPanel';

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

const EmojiContainer = styled.div`
  background-color: white;
  border-radius: 50%;
  width: 150px;
  height: 150px;
  display: flex;
  align-items: center;
  justify-content: center;
  overflow: hidden;
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

const LoginPanel = ({ switchToSignup, onClose }) => {
  const [userId, setUserId] = useState('');
  const [password, setPassword] = useState('');
  const { login } = useAuth();

  const handleLogin = async () => {
    try {
      const response = await axios.post(`${import.meta.env.VITE_REACT_APP_SERVER}/auth/login`, {
        nickname: userId,
        password: password,
      }, {
        headers: {
          'Content-Type': 'application/json',
        },
      });

      console.log('로그인 성공', response.data);
      const { memberId, accessToken, refreshToken } = response.data;

      // 토큰을 localStorage에 저장
      localStorage.setItem('accessToken', accessToken);
      localStorage.setItem('refreshToken', refreshToken);

      // AuthContext 파일에 토큰과 정보 보관 !!
      login(memberId, accessToken, refreshToken);

      alert('로그인되었습니다!');
      onClose();
    } catch (error) {
      console.error('로그인 실패', error.response?.data || error.message);
      alert('로그인에 실패하였습니다.');
    }
  };

  return (
    <CustomColumn width='100%' alignItems='center' justifyContent='center' gap='10px'>
      <CustomFont color='black' font='1.2rem'>로그인</CustomFont>
      <CustomRow width='100%' alignItems='center' justifyContent='flex-start'>
        <CustomFont color='black'>ID</CustomFont>
      </CustomRow>
      <Input type="text" placeholder="아이디를 입력하세요." value={userId} onChange={e => setUserId(e.target.value)} />
      <CustomRow width='100%' alignItems='center' justifyContent='flex-start'>
        <CustomFont color='black'>PW</CustomFont>
      </CustomRow>
      <Input type="password" placeholder="비밀번호를 입력하세요." value={password} onChange={e => setPassword(e.target.value)} />
      <Button onClick={handleLogin}>로그인</Button>
      <CustomRow>
        <CustomFont color='#4A90E2'>배틀 포 어스가 처음이시라면?</CustomFont>
        <Link onClick={switchToSignup}>회원가입</Link>
      </CustomRow>
    </CustomColumn>
  );
};

const LoginModal = ({ isOpen, onClose }) => {
  const [isSignup, setIsSignup] = useState(false);
  const [image, setImage] = useState('https://file.thisisgame.com/upload/tboard/user/2010/03/24/20100324150608_1019.jpg');
  const [headerText, setHeaderText] = useState(['HELLO!', '배틀 포 어스']);

  const switchToSignup = () => {
    setIsSignup(true);
    setHeaderText(['WELCOME!']);
  };

  const switchToLogin = () => {
    setIsSignup(false);
    setHeaderText(['HELLO!', '배틀 포 어스']);
  };

  // isOpen 상태가 변경될 때마다 isSignup 상태를 초기화
  useEffect(() => {
    if (isOpen) {
      setIsSignup(false);
      setHeaderText(['HELLO!', '배틀 포 어스']);
    }
  }, [isOpen]);

  return (
    <CustomModal isOpen={isOpen} onClose={onClose} height="80vh" borderRadius='50px'>
      <ModalContent>
        <LeftPanel>
          <EmojiContainer>
            <img src={image} alt="Custom Emoji" style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
          </EmojiContainer>
          {headerText.map((line, index) => (
            <CustomFont key={index} color='white' font='1.8rem' fontWeight='bold'>
              {line}
            </CustomFont>
          ))}
        </LeftPanel>
        <RightPanel>
          {isSignup ? <SignupPanel switchToLogin={switchToLogin} /> : <LoginPanel switchToSignup={switchToSignup} onClose={onClose} />}
        </RightPanel>
      </ModalContent>
    </CustomModal>
  );
};

export default LoginModal;
