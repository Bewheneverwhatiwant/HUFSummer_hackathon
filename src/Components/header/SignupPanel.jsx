import React, { useState } from 'react';
import styled from 'styled-components';
import axios from 'axios';
import CustomColumn from '../Container/CustomColumn';
import CustomFont from '../Container/CustomFont';
import CustomRow from '../Container/CustomRow';

// 아이디, 이메일 중복검사 API 연동 필요 !!

const Button = styled.button`
  width: 100%;
  padding: 10px;
  margin-top: 20px;
  background-color: ${props => props.isActive ? '#54B3FF' : '#ccc'};
  border: none;
  border-radius: 4px;
  cursor: ${props => props.isActive ? 'pointer' : 'not-allowed'};
  color: ${props => props.isActive ? '#FFFFFF' : '#000000'};
`;

const IsCheckedButton = styled.button`
  width: 100%;
  padding: 10px;
  border: 1px solid #ccc;
  border-radius: 4px;
  background-color: ${props => props.isChecked ? '#54B3FF' : '#FFFFFF'};
  color: ${props => props.isChecked ? '#FFFFFF' : '#000000'};
  cursor: pointer;
`;

const Input = styled.input`
  width: 100%;
  padding: 10px;
  margin: 10px 0;
  border: 1px solid ${props => props.isError ? 'red' : '#ccc'};
  border-radius: 4px;
`;

export default function SignupPanel({ switchToLogin }) {
  const [userId, setUserId] = useState('');
  const [isIdChecked, setIsIdChecked] = useState(false); // 아이디 중복검사
  const [isEmailChecked, setIsEmailChecked] = useState(false); // 이메일 중복검사 
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [passwordError, setPasswordError] = useState(false);
  const [profileImage, setProfileImage] = useState(null);
  const [name, setName] = useState('');

  const handlePasswordChange = (e) => {
    const value = e.target.value;
    setPassword(value);
    if (confirmPassword && value !== confirmPassword) {
      setPasswordError(true);
    } else {
      setPasswordError(false);
    }
  };

  const handleConfirmPasswordChange = (e) => {
    const value = e.target.value;
    setConfirmPassword(value);
    if (password && value !== password) {
      setPasswordError(true);
    } else {
      setPasswordError(false);
    }
  };

  const handleProfileImageChange = (e) => {
    setProfileImage(e.target.files[0]);
  };

  // 프로필 이미지는 필수가 아니도록 수정함 !! 
  const isFormValid = userId && isIdChecked && isEmailChecked && password && confirmPassword && !passwordError && name;


  //아이디 중복 체크 시작
  const handleIdCheck = async () => {
    if (!userId) {
      alert('아이디를 입력하세요.');
      return;
    }
    try {
      const response = await axios.get(`${import.meta.env.VITE_REACT_APP_SERVER}/auth/check-nickname`, {
        params: { nickname: userId }
      });
      
      if (response.status === 200) {
        setIsIdChecked(true);
        alert('사용 가능한 아이디입니다.');
        console.log(userId);
      }
    } catch (error) {
      setIsIdChecked(false);
      if (error.response && error.response.status === 400) {
        alert('이미 사용 중인 아이디입니다.');
      } else {
        console.error('아이디 중복 검사 실패', error);
        alert('아이디 중복 검사에 실패했습니다.');
      }
    }
  };
  //아이디 중복 체크 끝


  //이메일 중복 체크 시작
  const handleEmailCheck = async () => {
    if (!name) {
      alert('이메일을 입력하세요.');
      return;
    }
    try {
      const response = await axios.get(`${import.meta.env.VITE_REACT_APP_SERVER}/auth/check-email`, {
        params: { email: name }
      });
      if (response.status === 200) {
        setIsEmailChecked(true);
        alert('사용 가능한 이메일입니다.');
        console.log(name);

      }
    } catch (error) {
      setIsEmailChecked(false);
      if (error.response && error.response.status === 400) {
        alert('이미 사용 중인 이메일입니다.');
      } else {
        console.error('이메일 중복 검사 실패', error);
        alert('이메일 중복 검사에 실패했습니다.');
      }
    }
  };
  //이메일 중복 체크 끝


  const handleSignup = async () => {
    if (isFormValid) {
      const data = {
        email: name,
        nickname: userId,
        password: password
      };

      try {
        const response = await axios.post(`${import.meta.env.VITE_REACT_APP_SERVER}/auth/signup`, data, {
          headers: {
            'Content-Type': 'application/json'
          }
        });
        console.log('회원가입 성공', response.data);
        alert('회원가입되었습니다!');
        switchToLogin();
      } catch (error) {
        console.error('회원가입 실패', error);
        alert('회원가입에 실패했습니다.');
        console.log('데이터:', data);
      }
    }
  };

  return (
    <CustomColumn width='100%' alignItems='center' justifyContent='center' gap='10px'>
      <CustomFont color='black' font='1.2rem'>회원가입</CustomFont>

      <CustomRow width='100%' alignItems='center' justifyContent='flex-start'>
        <CustomFont color='black'>ID</CustomFont>
        <CustomFont color='red'>*</CustomFont>
      </CustomRow>
      <CustomRow width='100%' alignItems='center' justifyContent='flex-start'>
        <CustomRow width='80%' alignItems='center' justifyContent='flex-start'>
          <Input placeholder='사용하실 아이디를 입력하세요.' value={userId} onChange={e => setUserId(e.target.value)} />
        </CustomRow>

        <CustomRow width='20%' alignItems='center' justifyContent='flex-start'>
          <IsCheckedButton isChecked={isIdChecked} onClick={handleIdCheck}>
            {isIdChecked ? '사용가능' : '중복확인'}
          </IsCheckedButton>
        </CustomRow>
      </CustomRow>

      <CustomRow width='100%' alignItems='center' justifyContent='flex-start'>
        <CustomFont color='black'>PASSWORD</CustomFont>
        <CustomFont color='red'>*</CustomFont>
      </CustomRow>
      <Input type="password" placeholder="비밀번호를 입력하세요." value={password} onChange={handlePasswordChange} />
      <Input
        type="password"
        placeholder={passwordError ? '비밀번호가 일치하지 않습니다.' : '비밀번호를 다시 입력하세요.'}
        value={confirmPassword}
        onChange={handleConfirmPasswordChange}
        isError={passwordError}
      />

      <CustomRow width='100%' alignItems='center' justifyContent='flex-start'>
        <CustomFont color='black'>EMAIL</CustomFont>
        <CustomFont color='red'>*</CustomFont>
      </CustomRow>
      <CustomRow width='100%' alignItems='center' justifyContent='flex-start'>
        <CustomRow width='80%' alignItems='center' justifyContent='flex-start'>
          <Input type="text" placeholder="이메일을 알려주세요." value={name} onChange={e => setName(e.target.value)} />
        </CustomRow>
        <CustomRow width='20%' alignItems='center' justifyContent='flex-start'>
          <IsCheckedButton isChecked={isEmailChecked} onClick={handleEmailCheck}>
            {isEmailChecked ? '사용가능' : '중복확인'}
          </IsCheckedButton>
        </CustomRow>
      </CustomRow>

      <CustomRow width='100%' alignItems='center' justifyContent='flex-start'>
        <CustomFont color='black'>프로필 이미지</CustomFont>
        <CustomFont color='black'>(선택)</CustomFont>
      </CustomRow>
      <Input type="file" accept="image/*" onChange={handleProfileImageChange} />

      <Button isActive={isFormValid} onClick={handleSignup}>회원가입</Button>
    </CustomColumn>
  );
}
