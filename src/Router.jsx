import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Layout from './Components/Layout';
import App from './pages/MainPage/App';
import MyPage from './pages/SubPage/MyPage/MyPage';
import LoginPage from './pages/SubPage/LoginPage/LoginPage';
import SignupPage from './pages/SubPage/SignupPage/SignupPage';

// 라우터 파일

const AppRouter = () => {
    return (
        <Router>
            <Layout>
                <Routes>
                    <Route path="/" element={<App />} />
                    <Route path="/mypage" element={<MyPage />} />
                    <Route path="/login" element={<LoginPage />} />
                    <Route path="/signup" element={<SignupPage />} />
                </Routes>
            </Layout>
        </Router>
    );
};

export default AppRouter;
