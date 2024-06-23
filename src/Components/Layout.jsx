import React from 'react';
import Header from './header/header';
import Footer from './footer/footer';
import styled from 'styled-components';

// 어떤 페이지를 로드하든 무조건 <Header />, <화면내용 />, <Footer /> 구조로 렌더링되도록 하기 위한 파일

const Container = styled.div`
  display: flex;
  flex-direction: column;
  min-height: 100vh;
`;

const Main = styled.main`
  flex: 1;
`;

const Layout = ({ children }) => {
    return (
        <Container>
            <Header />
            <Main>{children}</Main>
            <Footer />
        </Container>
    );
};

export default Layout;
