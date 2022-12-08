import './App.css'

import React, { Component } from 'react';
import { Routes, Route } from 'react-router-dom';
import styled from 'styled-components';
import Nav from './pages/Nav';
import Home from './pages/Home';
import Login from './pages/Login';
import AdminLogin from './pages/AdminLogin';
import Search from './pages/Search';
import MyPage from './pages/MyPage';
import Stockinfo from './pages/Stockinfo';
import AddStock from './pages/AddStock';
import News from './pages/News';
import Dis from './pages/Dis';
import Register from './pages/Register';
import Notice from './pages/Notice';


const Body = styled.div`
  width: 1300px;
  margin-left: auto;
  margin-right: auto;
`;



class App extends Component {
  render() {
    return (
      <Body style={{ marginBottom: '500px' }}>
        <Nav />
        <Routes>
          <Route path='/' element={<Home />} />
          <Route path='/login' element={<Login />} />
          <Route path='/adminlogin' element={<AdminLogin />} />
          <Route path='/mypage' element={<MyPage />} />
          <Route path='/search' element={<Search />} />
          <Route path='/stockinfo' element={<Stockinfo />} />
          <Route path='/addstock' element={<AddStock />} />
          <Route path='/news' element={<News />} />
          <Route path='/dis' element={<Dis />} />
          <Route path='/register' element={<Register />} />
          <Route path='/notice' element={<Notice />} />
        </Routes>
      </Body>
    );
  }
}
export default App;