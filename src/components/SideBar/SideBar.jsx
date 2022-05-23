import React from 'react'
import { Link } from "react-router-dom";
import 'antd/dist/antd.css';
import {Menu} from 'antd';
import { PATH } from "../../constants/path";

const { SubMenu } = Menu;

const SideBar = () => {
  return (
    <div>
          <Menu
            mode="inline"
            defaultSelectedKeys={['1']}
            style={{ height: '700px', borderRight: 0, width:'142px'}}
          >
              {/* <Menu.Item key="1"><a href={PATH.COMPANY}>COMPANY</a></Menu.Item>
              <Menu.Item key="2"><a href={PATH.BILL}>BILL</a></Menu.Item>
              <Menu.Item key="3"><a href={PATH.EMPLOYEE_COMPANY}>EMPLOYEE_COMPANY</a></Menu.Item>
              <Menu.Item key="4"><a href={PATH.SALARY}>SALARY</a></Menu.Item>
              <Menu.Item key="5"><a href={PATH.SERVICE}>SERVICE</a></Menu.Item>
              <Menu.Item key="6"><a href={PATH.STAFF_BUILDING}>STAFF_BUILDING</a></Menu.Item>    */}

              <Menu.Item key="1" ><Link to={PATH.COMPANY}>COMPANY</Link></Menu.Item>
              <Menu.Item key="2"><Link to={PATH.BILL}>BILL</Link></Menu.Item>
              {/* <Menu.Item key="3"><Link to={PATH.EMPLOYEE_COMPANY}>EMPLOYEE_COMPANY</Link></Menu.Item> */}
              <Menu.Item key="4"><Link to={PATH.SALARY}>SALARY</Link></Menu.Item>
              <Menu.Item key="5"><Link to={PATH.SERVICE}>SERVICE</Link></Menu.Item>
              <Menu.Item key="6"><Link to={PATH.STAFF_BUILDING}>STAFF_BUILDING</Link></Menu.Item>  
          </Menu>
    </div>
  )
}

export default SideBar