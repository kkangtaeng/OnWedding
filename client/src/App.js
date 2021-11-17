import { BrowserRouter, Routes, Route } from "react-router-dom";
import React, { useEffect, useState } from "react";
import styled from "styled-components";
import { createGlobalStyle } from "styled-components";

import Article from "./Pages/Article";
import ChangePassword from "./Pages/ChangePassword";
import Delete from "./Pages/Delete";
import Main from "./Pages/Main";
import MyPage from "./Pages/MyPage";
import SignUp from "./Pages/SignUp";
import Write from "./Pages/Write";

import Nav from "./Components/Nav";
import Footer from "./Components/Footer";

const GlobalStyle = createGlobalStyle`
  body {
    font-family: "NanumBarunPen";
  }
`;

const StyledBody = styled.div`
  margin: 0;
  padding: 0;
  background-color: #f4eae0;
  box-sizing: border-box;
`;

function App() {
  const [edit, setEdit] = useState("");
  const [isModify, setIsModify] = useState(false);

  useEffect(() => {
    setEdit("");
  }, [edit]);

  const [userInfo, setUserInfo] = useState(
    () =>
      JSON.parse(window.localStorage.getItem("userInfo")) || {
        id: "",
        email: "",
        name: "",
        nickname: "",
        mobile: "",
        image: "",
      }
  );
  useEffect(() => {
    window.localStorage.setItem("userInfo", JSON.stringify(userInfo));
  }, [userInfo]);

  const [isLogin, setIsLogin] = useState(
    () => JSON.parse(window.localStorage.getItem("isLogin")) || false
  );

  useEffect(() => {
    window.localStorage.setItem("isLogin", JSON.stringify(isLogin));
  }, [isLogin]);

  // useEffect(() => {
  //   setIsModify(false);
  // }, []);

  //! 유저인포 변경 핸들러 함수
  const userInfoHandler = (userData) => {
    setUserInfo(userData);
  };

  //! 로그인 상태 확인용 함수
  const check = () => {
    console.log(isLogin);
    console.log(userInfo);
  };

  return (
    <BrowserRouter>
      <GlobalStyle />
      <StyledBody>
        <Nav
          isLogin={isLogin}
          userInfoHandler={userInfoHandler}
          setIsLogin={setIsLogin}
          check={check}
        />
        <Routes>
          <Route exact path="/" element={<Main isLogin={isLogin} />} />
          <Route path="/signup" element={<SignUp />} />
          <Route
            path="/write"
            element={
              <Write isModify={isModify} userInfo={userInfo} edit={edit} />
            }
          />
          <Route
            path="/article/:id"
            element={
              <Article
                userInfo={userInfo}
                isLogin={isLogin}
                setEdit={setEdit}
                setIsModify={setIsModify}
              />
            }
          />
          <Route path="change" element={<ChangePassword />} />
          <Route path="/mypage" element={<MyPage userInfo={userInfo} />} />
          <Route path="/delete" element={<Delete />} />
        </Routes>
        <Footer />
      </StyledBody>
    </BrowserRouter>
  );
}

export default App;
