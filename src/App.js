import styled from "styled-components";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import React from 'react';
import 'antd/dist/antd.css';
import './index.css';
import { PATH } from "./constants/path";
import Header from './components/Header/Header';
import SideBar from './components/SideBar/SideBar';
import Company from "./components/Company/Company";
import Service from "./components/Service/Service";
import Employee from "./components/Employee/Employee";
import Staff from "./components/Staff/Staff";
import CompanyService from "./components/CompanyService/CompanyService";
import Bill from "./components/Bill/Bill";
import Salary from "./components/Salary/Salary";
import StaffService from "./components/StaffService/StaffService";

const Component = styled.div`
  display: flex;
  
`

const App = () =>{
  return(
      <BrowserRouter>
        <Header/>
        <Component>
          <SideBar width={200} style={{ background: '#fff' }}/>
          <Routes>
            <Route path={PATH.COMPANY} element={<Company/>} />
            <Route path={PATH.SERVICE} element={<Service/>} />
            <Route path="/company/:id/employee" element={Employee} />
            <Route path={PATH.STAFF_BUILDING} element={<Staff/>} />
            {/* <Route path="/company/:id/service" element={CompanyService} /> */}
            {/* <Route path="/company/:id/staffservice" element={StaffService} /> */}
            <Route path={PATH.BILL} element={<Bill/>} />
            <Route path={PATH.SALARY} element={<Salary/>} />
          </Routes>
        </Component>
        
      </BrowserRouter>    
        
      
  )
}

export default App;