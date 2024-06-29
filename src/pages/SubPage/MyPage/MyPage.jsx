import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import axios from 'axios';
import { useAuth } from '../AuthContext';
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

const PointBox = styled.div`
height: 30px
width: 50px;
background-color: #54B3FF;
display: flex;
justify-content: center;
align-items: center;
padding: 15px;
border-radius: 5px;
`;

const ListContainer = styled.div`
display: flex;
flex-direction: column;
align-items: center;
`;

const ItemContainer = styled.div`
border: 1px solid #ddd;
border-radius: 8px;
padding: 16px;
margin: 10px;
max-width: 150px;
text-align: center;
cursor: pointer;
  &:hover {
    transform: translateY(-10px);
    box-shadow: 0px 3px 8px 0px rgba(0, 0, 0, 0.1);
    transition: transform 0.2s ease-in-out;
    cursor: pointer;
    border-radius: 0.625rem;
  }
`;

const ItemImage = styled.img`
width: 120px;
height: 120px;
border-radius: 8px;
`;

const ItemText = styled.h3`
font-size: 15px;
margin: 12px 0 8px;
`;

const ItemPoints = styled.p`
font-size: 16px;
color: #555;
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
  border: none;
  cursor: pointer;
  border-radius: 50px;
  border: 2px solid #54B3FF;
  width: 80px;
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

const items = ["KT", "기아", "롯데", "LG", "NC", "SK", "삼성", "한화", "두산", "키움"];

export default function App() {
  const { auth } = useAuth();
  const [preview, setPreview] = useState('icon_normalProfile.png');

  const [showDropdown, setShowDropdown] = useState(false);
  const [selectedItem, setSelectedItem] = useState("Select Team");
  const [donateData, setDonateData] = useState([]);

  const [userInfo, setUserInfo] = useState({
    nickname: '',
    email: '',
    point: 0
  });
  const [winningRate, setWinningRate] = useState('0%');

  const fetchUserInfo = async () => {
    const accessToken = localStorage.getItem('accessToken');
    try {
      const response = await axios.get(`${import.meta.env.VITE_REACT_APP_SERVER}/my`, {
        headers: {
          Authorization: `Bearer ${accessToken}`
        }
      });
      setUserInfo(response.data);
      console.log('유저 정보 가져오기 성공!');
      console.log('Access Token:', accessToken);

      // 유저 정보 가져온 후 승률 API 호출
      axios.get(`${import.meta.env.VITE_REACT_APP_SERVER}/my/winningrate`, {
        headers: {
          Authorization: `Bearer ${accessToken}`
        }
      })
        .then((response) => {
          setWinningRate(response.data.winningRate);
          console.log('승률 정보 가져오기 성공!');
        })
        .catch((error) => {
          console.error('승률 정보 가져오기 실패', error);
        });

    } catch (error) {
      console.error('유저 정보 가져오기 실패', error);
      console.log('Access Token:', accessToken);
    }
  };


  const fetchDonateData = async () => {
    try {
      const accessToken = localStorage.getItem('accessToken'); // accessToken 가져오기
      const response = await axios.get(`${import.meta.env.VITE_REACT_APP_SERVER}/donate`, {
        headers: {
          Authorization: `Bearer ${accessToken}`
        }
      });
      setDonateData(response.data);
      console.log('기부 목록 가져오기 성공!', response.data);
    } catch (error) {
      console.error('기부 목록 가져오기 실패', error);
    }
  };


  // 유저 정보 요청 시작
  useEffect(() => {
    fetchDonateData();
    fetchUserInfo();
  }, []);

  const toggleDropdown = () => {
    setShowDropdown(!showDropdown);
  };

  const handleItemClick = (item) => {
    setSelectedItem(item);
    setShowDropdown(false);
  };

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setProfileImage(file);
      setPreview(URL.createObjectURL(file));
      setIsButtonVisible(true);
    }
  };

  const Donatedata = [
    {
      'id': 1,
      'img': 'https://ae01.alicdn.com/kf/S139a8230386c4dc68e22ac256c42d6bbw/TPU.jpg',
      'text1': '마라톤 선수에게 물병 후원하기',
      'text2': '10 포인트'
    },
    {
      'id': 2,
      'img': 'https://sitem.ssgcdn.com/38/19/62/item/1000524621938_i1_750.jpg',
      'text1': '수영 선수에게 팔꿈치 보호대 후원하기',
      'text2': '20 포인트'
    },
    {
      'id': 3,
      'img': 'https://giftinfo.co.kr/shop/item_images/zoom1/298398.jpg',
      'text1': '높이뛰기 선수에게 쿨토시 후원하기',
      'text2': '5 포인트'
    },
    {
      'id': 4,
      'img': 'https://image.auction.co.kr/itemimage/3f/83/0a/3f830a5b01.jpg',
      'text1': '멀리뛰기 선수에게 운동화 후원하기',
      'text2': '35 포인트'
    },
  ];

  const DonationItem = ({ id, img, text1, text2, onDonate }) => (
    <ItemContainer onClick={() => onDonate(id)}>
      <ItemImage src={img} alt={text1} />
      <ItemText>{text1}</ItemText>
      <ItemPoints>{text2}</ItemPoints>
    </ItemContainer>
  );

  const handleDonatePoint = async (donationId) => {
    if (window.confirm('구매하시겠습니까?')) {
      const accessToken = localStorage.getItem('accessToken');
      try {
        const response = await axios.patch(`${import.meta.env.VITE_REACT_APP_SERVER}/my/donation/${donationId}`, {}, {
          headers: {
            Authorization: `Bearer ${accessToken}`
          }
        });
        console.log('기부 성공', response.data);
        fetchUserInfo(); // 기부 후 유저 정보 업데이트
      } catch (error) {
        console.error('기부 실패', error);
      }
    }
  };

  return (
    <ContainerCenter width='100%' alignItems='center'>
      <PageContainer>
        {auth.isLoggedIn && (
          <CustomColumn gap='80px'>
            <CustomColumn>
              <CustomFont color='black' font='2rem' fontWeight='bold' alignItems='left'>내 정보</CustomFont>
              <CustomRow justifyContent='center'>
                <CustomRow gap='50px'>
                  <CustomColumn alignItems='center' gap='10px'>
                    <ProfileImage src={preview} alt="Profile Preview" />
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
                            {item}
                          </DropdownItem>
                        ))}
                      </DropdownContent>
                    </DropdownContainer>
                  </CustomColumn>
                  <CustomColumn>
                    <CustomFont color='black' font='1rem' fontWeight='bold'>닉네임: {userInfo.nickname}</CustomFont>
                    <CustomFont color='black' font='1rem' fontWeight='bold'>이메일: {userInfo.email}</CustomFont>
                    <CustomColumn gap='10px'>
                      <PointBox>
                        <CustomColumn gap='10px' alignItems='center'>
                          <CustomFont color='white' font='1.2rem'>나의 누적 포인트</CustomFont>
                          <CustomFont color='white' font='1.5rem' fontWeight='bold'>{userInfo.point}점</CustomFont>
                        </CustomColumn>
                      </PointBox>
                      <CustomFont color='black' font='0.8rem'>* 누적 포인트는 한 달 단위로 초기화됩니다. </CustomFont>
                    </CustomColumn>
                  </CustomColumn>
                </CustomRow>
              </CustomRow>
            </CustomColumn>
            <CustomColumn>
              <CustomRow gap='100px'>
                <CustomFont color='black' font='2rem' fontWeight='bold'>나의 승패 예측은?</CustomFont>
                <CustomFont color='black' font='2rem' fontWeight='bold'>{winningRate}%</CustomFont>
              </CustomRow>
            </CustomColumn>

            <CustomColumn gap='10px'>
              <CustomFont color='black' font='2rem' fontWeight='bold'>
                포인트 기부하기
              </CustomFont>
              <CustomFont color='black' font='1rem' fontWeight='bold'>
                내가 응원하는 팀의 이름으로 패럴림픽을 응원해요.
              </CustomFont>
              <CustomFont color='black' font='1rem' fontWeight='bold'>
                포인트는 현금으로 투명하게 전달됩니다.
              </CustomFont>

              <CustomRow>
                {donateData.map((item) => (
                  <DonationItem
                    key={item.donateId}
                    id={item.donateId}
                    img='https://ae01.alicdn.com/kf/S139a8230386c4dc68e22ac256c42d6bbw/TPU.jpg'
                    text1={item.content}
                    text2={`${item.price} 포인트`}
                    onDonate={handleDonatePoint}
                  />
                ))}
              </CustomRow>
            </CustomColumn>
          </CustomColumn>
        )}
      </PageContainer>
    </ContainerCenter>
  );
}
