import React from 'react';
import styled from 'styled-components';

const ModalOverlay = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-color: rgba(0, 0, 0, 0.5);
  display: flex;
  justify-content: center;
  align-items: center;
  z-index: 1000;
`;

const Modal = styled.div`
  position: fixed;
  top: 50%;
  left: 50%;
  width: 60%;
  height: ${(props) => props.height || '50vh'};
  transform: translate(-50%, -50%);
  background-color: #ECFFE0;
  padding: 20px;
  border-radius: 50px;
  box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  z-index: 1001;
  background-image: url(${(props) => props.backgroundImage || 'none'});
  background-size: 100% 100%;
`;

const CloseButton = styled.button`
  position: absolute;
  top: 10px;
  right: 30px;
  background: none;
  border: none;
  font-size: 1.5rem;
  cursor: pointer;
`;

const CustomModal = ({ isOpen, onClose, children, height, backgroundImage }) => {
    if (!isOpen) return null;

    return (
        <ModalOverlay onClick={onClose}>
            <Modal height={height} backgroundImage={backgroundImage} onClick={(e) => e.stopPropagation()}>
                <CloseButton onClick={onClose}>&times;</CloseButton>
                {children}
            </Modal>
        </ModalOverlay>
    );
};

export default CustomModal;
