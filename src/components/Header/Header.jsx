import React from 'react'
import 'antd/dist/antd.css';
import styled from 'styled-components'
import { Menu} from 'antd';
import { Avatar } from 'antd';


const Container=styled.div`
  display:flex;
  justify-content:space-between;
  height:45px;
  background-color:#69b7ff;
  color:white;
`

const Logo=styled.div`
  background-color:#1890ff;
  width:142px;
`

const User=styled.div`
  display:flex;
  align-items:center;
  margin-right:20px;
`

const Header = () => {
  return (
    <Container>
      <Logo>
        <h1 style={{color:'white',padding:'0px 28px'}}>BIM Corp</h1>
      </Logo>
      <User>
        <span style={{marginRight:'5px'}}>Hello, AustinDo</span>
        <Avatar src="https://zos.alipayobjects.com/rmsportal/ODTLcjxAfvqbxHnVXCYX.png" />
      </User>
    </Container>
  )
}

export default Header