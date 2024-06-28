import React, { useState } from 'react';
import styled from 'styled-components';

const TabContainer = styled.div`
  width: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
`;

const TabHeader = styled.div`
  display: flex;
  justify-content: center;
  margin-bottom: 20px;
  gap: 2rem;
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

const Label = styled.div`
  text-align: center;
  margin-top: 10px;
  font-size: 1rem;
`;

const MyTab = () => {
    const [activeTab, setActiveTab] = useState('tab1');

    return (
        <TabContainer>
            <TabHeader>
                <TabButton
                    active={activeTab === 'tab1'}
                    onClick={() => setActiveTab('tab1')}
                >
                    내용1
                </TabButton>
                <TabButton
                    active={activeTab === 'tab2'}
                    onClick={() => setActiveTab('tab2')}
                >
                    내용2
                </TabButton>
                <TabButton
                    active={activeTab === 'tab3'}
                    onClick={() => setActiveTab('tab3')}
                >
                    내용3
                </TabButton>
            </TabHeader>
            <ContentContainer>
                {activeTab === 'tab1' && <Label>1</Label>}
                {activeTab === 'tab2' && <Label>2</Label>}
                {activeTab === 'tab3' && <Label>3</Label>}
            </ContentContainer>
        </TabContainer>
    );
};

export default MyTab;
