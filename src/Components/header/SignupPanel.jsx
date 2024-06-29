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

const DropdownContainer = styled.div`
  position: relative;
  display: inline-block;
`;

const DropdownButton = styled.button`
  background-color: #FFFFFF;
  color: black;
  padding: 10px;
  font-size: 16px;
  border-radius: 10px;  
  cursor: pointer;
  border: 1px solid #D9D9D9;
`;

const DropdownContent = styled.div`
  display: ${props => (props.show ? 'block' : 'none')};
  position: absolute;
  background-color: white;
  min-width: 160px;
  box-shadow: 0px 8px 16px 0px rgba(0,0,0,0.2);
  z-index: 1;
  border-radius: 4px;
`;

const DropdownItem = styled.a`
  color: black;
  padding: 12px 16px;
  text-decoration: none;
  display: block;

  &:hover {
    background-color: #f1f1f1;
  }
`;

const items = [
  { id: 1, team: 'KT' }, { id: 2, team: '기아' }, { id: 3, team: '롯데' },
  { id: 4, team: 'LG' }, { id: 5, team: 'NC' }, { id: 6, team: 'SK' },
  { id: 7, team: '삼성' }, { id: 8, team: '한화' }, { id: 9, team: '두산' },
  { id: 10, team: '키움' }
];

export default function SignupPanel({ switchToLogin }) {
  const [userId, setUserId] = useState('');
  const [isIdChecked, setIsIdChecked] = useState(false); // 아이디 중복검사
  const [isEmailChecked, setIsEmailChecked] = useState(false); // 이메일 중복검사 
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [passwordError, setPasswordError] = useState(false);
  const [profileImage, setProfileImage] = useState(null);
  const [email, setEmail] = useState('');
  const [showDropdown, setShowDropdown] = useState(false);
  const [selectedItem, setSelectedItem] = useState("응원하는 구단을 선택해주세요.");
  const [teamId, setTeamId] = useState(null); // 팀 아이디 저장

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

  const isFormValid = userId && isIdChecked && isEmailChecked && password && confirmPassword && !passwordError && email && teamId !== null;

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

  const handleEmailCheck = async () => {
    if (!email) {
      alert('이메일을 입력하세요.');
      return;
    }
    try {
      const response = await axios.get(`${import.meta.env.VITE_REACT_APP_SERVER}/auth/check-email`, {
        params: { email: email }
      });
      if (response.status === 200) {
        setIsEmailChecked(true);
        alert('사용 가능한 이메일입니다.');
        console.log(email);
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

  const handleSignup = async () => {
    if (isFormValid) {
      const data = {
        email: email,
        nickname: userId,
        password: password,
        teamId: teamId,
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
        if (error.response && error.response.data) {
          alert(`회원가입에 실패했습니다: ${error.response.data.message}`);
        } else {
          alert('회원가입에 실패했습니다.');
        }
        console.log('데이터:', data);
      }
    }
  };

  const toggleDropdown = () => {
    setShowDropdown(!showDropdown);
  };

  const handleItemClick = (item) => {
    setSelectedItem(item.team);
    setTeamId(item.id);
    setShowDropdown(false);
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
      <CustomRow width='100%' alignItems='center' justifyContent='flex-start'>
        <CustomFont color='red'>8~12자 이내, 대문자, 숫자 필수 포함</CustomFont>
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
          <Input type="text" placeholder="이메일을 알려주세요." value={email} onChange={e => setEmail(e.target.value)} />
        </CustomRow>
        <CustomRow width='20%' alignItems='center' justifyContent='flex-start'>
          <IsCheckedButton isChecked={isEmailChecked} onClick={handleEmailCheck}>
            {isEmailChecked ? '사용가능' : '중복확인'}
          </IsCheckedButton>
        </CustomRow>
      </CustomRow>

      <CustomRow width='100%' alignItems='center' justifyContent='flex-start'>
        <CustomFont color='black'>Choose the club you support</CustomFont>
        <CustomFont color='red'>*</CustomFont>
      </CustomRow>
      <CustomRow width='100%' alignItems='center' justifyContent='flex-start'>
        <DropdownContainer>
          <DropdownButton onClick={toggleDropdown}>
            {selectedItem}
          </DropdownButton>
          <DropdownContent show={showDropdown}>
            {items.map((item, index) => (
              <DropdownItem
                key={index}
                href="#"
                onClick={() => handleItemClick(item)}
              >
                {item.team}
              </DropdownItem>
            ))}
          </DropdownContent>
        </DropdownContainer>
      </CustomRow>

      <Button isActive={isFormValid} onClick={handleSignup}>회원가입</Button>
    </CustomColumn>
  );
}
