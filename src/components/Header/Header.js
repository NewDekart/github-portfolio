import React from 'react'
import styled from 'styled-components'

const HeaderWrapper = styled.div`
  background-color: #282c34;
  min-height: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  font-size: calc(10px + 2vmin);
  color: white;
`

const Logo =  styled.img`
  height: 64px;
  pointer-events: none;
`

const Header = ({ logo }) => (
  <HeaderWrapper>
    <Logo src={logo} className="App-logo" alt="logo" />
    <h1>My Github Protfolio</h1>
  </HeaderWrapper>
)

export default Header
