import React, { useState } from 'react';
import styled from 'styled-components';
import axios from 'axios';

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
  gap: 20px;
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

export default function App() {
  const [profileImage, setProfileImage] = useState(null);
  const [preview, setPreview] = useState(null);

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setProfileImage(file);
      setPreview(URL.createObjectURL(file));
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

  return (
    <ContainerCenter>
      <PageContainer>
        여기는 마이페이지
        {preview && <ProfileImage src={preview} alt="Profile Preview" />}
        <FileInput type="file" accept="image/*" onChange={handleImageChange} />
        <Button onClick={handleProfileUpdate}>프로필 변경</Button>
      </PageContainer>
    </ContainerCenter>
  );
}
