import React, { useEffect } from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Layout from './Components/Layout';
import App from './pages/MainPage/App';
import MyPage from './pages/SubPage/MyPage/MyPage';
import ScrollToTop from './Components/ScrollToTop';
import { AuthProvider } from './pages/SubPage/AuthContext';
import { isMobile, isTablet } from 'react-device-detect';

// 라우터 파일

const AppRouter = () => {
    useEffect(() => {
        if (isMobile || isTablet) {
            alert('데스크톱으로만 접속이 가능합니다.');
        }
    }, []);

    if (isMobile || isTablet) {
        return null; // 모바일 및 태블릿일 경우 아무것도 렌더링하지 않음
    }

    return (
        <AuthProvider>
            <Router>
                <Layout>
                    <ScrollToTop />
                    <Routes>
                        <Route path="/" element={<App />} />
                        <Route path="/mypage" element={<MyPage />} />
                    </Routes>
                </Layout>
            </Router>
        </AuthProvider>
    );
};

export default AppRouter;
