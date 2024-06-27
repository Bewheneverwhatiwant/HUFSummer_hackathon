import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Layout from './Components/Layout';
import App from './pages/MainPage/App';
import MyPage from './pages/SubPage/MyPage/MyPage';
import ScrollToTop from './Components/ScrollToTop';
import { AuthProvider } from './pages/SubPage/AuthContext';

// 라우터 파일

const AppRouter = () => {
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
