import React, { createContext, useState, useContext } from 'react';

// AuthContext 생성
const AuthContext = createContext();

// AuthProvider 컴포넌트 생성
export const AuthProvider = ({ children }) => {
    const [auth, setAuth] = useState({
        isLoggedIn: false,
        nickname: null,
        email: null
    });

    const login = (nickname, email) => {
        setAuth({
            isLoggedIn: true,
            nickname,
            email
        });
    };

    const logout = () => {
        setAuth({
            isLoggedIn: false,
            nickname: null,
            email: null
        });
    };

    return (
        <AuthContext.Provider value={{ auth, login, logout }}>
            {children}
        </AuthContext.Provider>
    );
};

// AuthContext 사용하기 위한 훅
export const useAuth = () => useContext(AuthContext);
