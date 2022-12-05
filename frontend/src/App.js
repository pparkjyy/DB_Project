import React, { Component } from 'react';
import { Routes, Route } from 'react-router-dom';
import styled from 'styled-components';
import Nav from './pages/Nav';
import Home from './pages/Home';
import Login from './pages/Login';
import Search from './pages/Search';
import MyPage from './pages/MyPage';
import Stockinfo from './pages/Stockinfo';
import News from './pages/News';
import Dis from './pages/Dis';

import './App.css';

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
          <Route path='/mypage' element={<MyPage />} />
          <Route path='/search' element={<Search />} />
          <Route path='/stockinfo' element={<Stockinfo />} />
          <Route path='/news' element={<News />} />
          <Route path='/dis' element={<Dis />} />
        </Routes>
      </Body>
    );
  }
}
export default App;