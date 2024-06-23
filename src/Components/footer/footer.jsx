import React, { useState, useEffect } from 'react';
import styled, { keyframes } from 'styled-components';
import { useNavigate } from 'react-router-dom';
import CustomRow from '../Container/CustomRow';
import StyledImg from '../Container/StyledImg';
import CustomFont from '../Container/CustomFont';

const FooterContainer = styled.footer`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  width: 100%;
  height: 7vh;
  background: #5D5D5D;
  color: white;
  gap: 10px;
`;

export default function Footer() {
    const navigate = useNavigate();

    return (

        <FooterContainer>
            여기는 footer
        </FooterContainer>
    );
}