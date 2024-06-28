import React, { useState } from 'react';
import styled from 'styled-components';
import axios from 'axios';
import { useAuth } from '../../SubPage/AuthContext';
import CustomRow from '../../../Components/Container/CustomRow';
import CustomFont from '../../../Components/Container/CustomFont';
import CustomColumn from '../../../Components/Container/CustomColumn';
import MyTab from './MyTab';

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
  background-image: url('MainImg_2.png');
  background-size: 100% 100%;
`;

const ProfileImage = styled.img`
  width: 150px;
  height: 150px;
  border-radius: 50%;
  object-fit: cover;
`;

const FileInput = styled.input`
  margin-top: 20px;
`;

const Button = styled.button`
  width: 150px;
  padding: 10px;
  margin-top: 20px;
  background-color: #54B3FF;
  border: none;
  border-radius: 4px;
  cursor: pointer;
  color: #FFFFFF;
`;

const Line = styled.div`
height: 1px;
width: 30%;
background-color: #6F6F6F;
`;

export default function App() {
  const { auth } = useAuth();
  const [profileImage, setProfileImage] = useState(null);
  const [preview, setPreview] = useState('icon_normalProfile.png'); // 기본 이미지
  const [isButtonVisible, setIsButtonVisible] = useState(false);

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setProfileImage(file);
      setPreview(URL.createObjectURL(file));
      setIsButtonVisible(true);
    }
  };

  const handleProfileUpdate = async () => {
    if (profileImage) {
      const formData = new FormData();
      formData.append('profileImage', profileImage);

      try {
        const response = await axios.patch(`${import.meta.env.VITE_REACT_APP_SERVER}/my/profileimage`, formData, {
          headers: {
            'Content-Type': 'multipart/form-data'
          }
        });
        console.log('프로필 사진 변경 성공', response.data);
      } catch (error) {
        console.error('프로필 사진 변경 실패', error);
      }
    }
  };

  const handleButtonClick = () => {
    if (window.confirm('프로필 사진을 변경하시겠습니까?')) {
      handleProfileUpdate();
    }
  };

  return (
    <ContainerCenter>
      <PageContainer>
        <CustomRow width='100%' alignItems='center' justifyContent='center'>
          <CustomColumn>
            <ProfileImage src={preview} alt="Profile Preview" />
            <FileInput type="file" accept="image/*" onChange={handleImageChange} />
            {isButtonVisible && <Button onClick={handleButtonClick}>프로필 변경</Button>}
          </CustomColumn>
          {auth.isLoggedIn && (
            <CustomColumn>
              <CustomFont color='black' font='1rem' fontWeight='bold'>닉네임: {auth.nickname}</CustomFont>
              <CustomFont color='black' font='1rem' fontWeight='bold'>이메일: {auth.email}</CustomFont>
            </CustomColumn>
          )}
        </CustomRow>
        <Line />
        <MyTab />
      </PageContainer>
    </ContainerCenter>
  );
}
