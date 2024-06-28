import React, { useState } from 'react';
import styled from 'styled-components';
import { useNavigate } from 'react-router-dom';
import CustomColumn from '../../Components/Container/CustomColumn';
import CustomRow from '../../Components/Container/CustomRow';
import CustomFont from '../../Components/Container/CustomFont';

const TabContainer = styled.div`
  width: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
`;

const TabHeader = styled.div`
width: 60%;
  display: flex;
  justify-content: flex-start;
  gap: 10px;
  margin-bottom: 20px;
`;

const TabButton = styled.button`
  background: none;
  border: none;
  padding: 10px 20px;
  font-size: 1.2rem;
  cursor: pointer;
  color: ${props => (props.active ? 'black' : '#B0B0B0')};
  border-bottom: ${props => (props.active ? '2px solid black' : 'none')};
  margin: 0 10px;

  &:focus {
    outline: none;
  }
`;

const ContentContainer = styled.div`
  display: flex;
  justify-content: center;
  gap: 20px;
`;

const Box = styled.button`
  width: 500px;
  height: 200px;
  background: white;
  border: 1px solid #ccc;
  box-shadow: 0px 4px 6px rgba(0, 0, 0, 0.1);
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
  background-image: url(${props => props.backgroundImage});
  background-size: cover;
  background-position: center;

  &:focus {
    outline: none;
  }
`;

const Label = styled.div`
  text-align: center;
  margin-top: 10px;
  font-size: 1rem;
`;

const MainTab = () => {
    const [activeTab, setActiveTab] = useState('category1');

    const navigate = useNavigate();

    // Box마다 페이지 라우팅할 일이 있으면!
    const go = () => {
        navigate('/');
    };

    return (
        <TabContainer>
            <TabHeader>
                <TabButton
                    active={activeTab === 'category1'}
                    onClick={() => setActiveTab('category1')}
                >
                    카테고리 1
                </TabButton>
                <TabButton
                    active={activeTab === 'category2'}
                    onClick={() => setActiveTab('category2')}
                >
                    카테고리 2
                </TabButton>
            </TabHeader>
            <ContentContainer>
                {activeTab === 'category1' ? (
                    <CustomColumn>
                        <CustomRow>
                            <div>
                                <Box backgroundImage='categoryEx1.png' />
                                <Label>1</Label>
                            </div>
                            <div>
                                <Box backgroundImage='categoryEx2.png' />
                                <Label>2</Label>
                            </div>
                        </CustomRow>
                        <CustomRow>
                            <div>
                                <Box backgroundImage='categoryEx1.png' />
                                <Label>3</Label>
                            </div>
                            <div>
                                <Box backgroundImage='categoryEx2.png' />
                                <Label>4</Label>
                            </div>
                        </CustomRow>
                    </CustomColumn>
                ) : (
                    <CustomColumn>
                        <CustomRow>
                            <div>
                                <Box backgroundImage='categoryEx3.png' />
                                <Label>a</Label>
                            </div>
                            <div>
                                <Box backgroundImage='categoryEx4.png' />
                                <Label>b</Label>
                            </div>
                        </CustomRow>
                        <CustomRow>
                            <div>
                                <Box backgroundImage='categoryEx3.png' />
                                <Label>c</Label>
                            </div>
                            <div>
                                <Box backgroundImage='categoryEx4.png' />
                                <Label>d</Label>
                            </div>
                        </CustomRow>
                    </CustomColumn>
                )}
            </ContentContainer>
        </TabContainer>
    );
};

export default MainTab;
