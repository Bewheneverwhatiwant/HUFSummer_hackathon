import React, { useState, useEffect } from 'react';
import styled, { keyframes } from 'styled-components';
import { useNavigate } from 'react-router-dom';
import CustomRow from '../Container/CustomRow';
import StyledImg from '../Container/StyledImg';
import CustomFont from '../Container/CustomFont';
import CustomColumn from '../Container/CustomColumn';

const FooterContainer = styled.footer`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  width: 100%;
  height: 13vh;
  background: #5D5D5D;
  color: white;
  gap: 10px;
`;

export default function Footer() {
    const navigate = useNavigate();

    return (

        <FooterContainer>
            <CustomRow width='50%' alignItems='center' justifyContent='center'>
                <StyledImg src={'HUFS_logo.png'} width='120px' height='100px' />
                <CustomColumn width='30%' alignItems='flex-start' justifyContent='center' gap='10px'>
                    <CustomFont color='#929292'>
                        HUFSummer-Hackathon
                    </CustomFont>
                    <CustomFont color='#929292'>
                        Team Name: 뭉풀(뭉치면 풀스택)
                    </CustomFont>
                    <CustomFont color='#929292'>
                        Team Member: 이다은, 이나영, 조유리, 류동현
                    </CustomFont>
                </CustomColumn>
            </CustomRow>
        </FooterContainer>
    );
}