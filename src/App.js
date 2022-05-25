import 'antd/dist/antd.css';
import { BrowserRouter, Route, Routes } from "react-router-dom";
import styled from "styled-components";
import Bill from "./components/Bill/Bill";
import Company from "./components/Company/Company";
import CompanyService from './components/CompanyService/CompanyService';
import Employee from "./components/Employee/Employee";
import Header from './components/Header/Header';
import Salary from "./components/Salary/Salary";
import Service from "./components/Service/Service";
import SideBar from './components/SideBar/SideBar';
import Staff from "./components/Staff/Staff";
import StaffService from "./components/StaffService/StaffService";
import { PATH } from "./constants/path";
import './index.css';

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
            <Route path="/company/:company_id/:company_name/:tax_number/:authorized_capital/:field_of_operation/:address_in_building/:phone_number/:ground_area/employee" element={<Employee/>} />
            <Route path="/company/:company_id/:company_name/:tax_number/:authorized_capital/:field_of_operation/:address_in_building/:phone_number/:ground_area/service" element={<CompanyService/>} />
            <Route path="/staff/:id/:name/:address/:code/:date_of_birth/:phone_number/service" element={<StaffService/>} />
            <Route path={PATH.STAFF_BUILDING} element={<Staff/>} />
            <Route path={PATH.SERVICE} element={<Service/>} />
            <Route path={PATH.BILL} element={<Bill/>} />
            <Route path={PATH.SALARY} element={<Salary/>} />
          </Routes>
        </Component>
        
      </BrowserRouter>    
        
      
  )
}

export default App;