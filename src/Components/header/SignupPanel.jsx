import React, { useState } from 'react';
import styled from 'styled-components';
import CustomColumn from '../Container/CustomColumn';
import CustomFont from '../Container/CustomFont';
import CustomRow from '../Container/CustomRow';

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

`;

const Input = styled.input`
    width: 100%;
    padding: 10px;
    margin: 10px 0;
    border: 1px solid ${props => props.isError ? 'red' : '#ccc'};
    border-radius: 4px;
`;

export default function SignupPanel() {
    const [userId, setUserId] = useState('');
    const [isIdChecked, setIsIdChecked] = useState(false);
    const [password, setPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    const [passwordError, setPasswordError] = useState(false); 

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

    const isFormValid = userId && isIdChecked && password && confirmPassword && !passwordError;

    const handleIdCheck = async () => {
        if (!userId) {
            alert('아이디를 입력하세요.');
            return;
        }
        try {
            setIsIdChecked(true); 
        } catch (error) {
            setIsIdChecked(false);
        }
    };

    return (
        <CustomColumn width='100%' alignItems='center' justifyContent='center' gap='10px'>
            <CustomFont color='black' font='1.2rem'>회원가입</CustomFont>

            <CustomRow width='100%' alignItems='center' justifyContent='flex-start'>
                <CustomFont color='black'>NAME</CustomFont>
            </CustomRow>
            <Input type="text" placeholder="이름을 알려주세요." />

            <CustomRow width='100%' alignItems='center' justifyContent='flex-start'>
                <CustomFont color='black'>ID</CustomFont>
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
            </CustomRow>
            <Input type="password" placeholder="비밀번호를 입력하세요." value={password} onChange={handlePasswordChange} />
            <Input
                type="password"
                placeholder={passwordError ? '비밀번호가 일치하지 않습니다.' : '비밀번호를 다시 입력하세요.'}
                value={confirmPassword}
                onChange={handleConfirmPasswordChange}
                isError={passwordError}
            />

            <Button isActive={isFormValid}>회원가입</Button>
        </CustomColumn>
    );
}
