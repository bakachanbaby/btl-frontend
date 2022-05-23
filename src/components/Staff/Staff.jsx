import React, { useEffect, useState } from 'react';
import styled from 'styled-components';
import ModalStaff from './ModalStaff';
import Modalstaffservice from './ModalStaffService'; 
import { Table, Divider, notification } from 'antd';
import { Input } from 'antd';
import { Pagination, Button, Popconfirm } from 'antd';
import {deletestaff,getstaff,poststaff,putstaff,searchstaff } from "../../apis/staffApi";

const { Search } = Input;
const { Column, ColumnGroup } = Table;

const Container = styled.div`
  margin: 20px;

`

const TitleAndSearch=styled.div`
  display:flex;
  justify-content:space-between;
  width:88.5vw;
`

const Content=styled.div`
  
`



const CompanyTable=styled.div`
  margin:10px;
`

const TableFooter=styled.div`
  display:flex;
  justify-content:space-between;
  align-items:center;
  margin:10px;
`
const data = [
  {
    key: '1',
    id: '1',
    name: 'John',
    taxNumber: '654543',
    authorizedCapital: 32,
    fieldOfOperation: 'New York No. 1 Lake Park',
    addressBuilding: 'New York No. 1 Lake Park',
    phoneNumber:'093243432',
    groundArea:100
  },
  {
    key: '1',
    id: '2',
    name: 'John',
    taxNumber: '654543',
    authorizedCapital: 32,
    fieldOfOperation: 'New York No. 1 Lake Park',
    addressBuilding: 'New York No. 1 Lake Park',
    phoneNumber:'093243432',
    groundArea:100
  },
  {
    key: '1',
    id: '3',
    name: 'John',
    taxNumber: '654543',
    authorizedCapital: 32,
    fieldOfOperation: 'New York No. 1 Lake Park',
    addressBuilding: 'New York No. 1 Lake Park',
    phoneNumber:'093243432',
    groundArea:100
  },
];

const Staff = () => {
  const [staffs,setStaffs] = useState([]);
  const [editModal,setEditModal] = useState();
  const [wantDelete,setWantDelete] = useState();
  const [serviceModal, setServiceModal] = useState(null);
  const [choicestaff, setChoiceStaff] = useState([]);

  useEffect(()=>{
    getstaff()
    .then((response) => setStaffs(response.data))
    .catch(error => console.log(error))
  });

  const searchStaffByName = (name) => {
    searchstaff(name)
    .then(response => setStaffs(response.data))
    .catch(error => console.log(error))
  }

  const onConfirmDelete = () => {
    deletestaff(wantDelete)
    .then(()=>{
      displayStaff()
    })
    .catch(() => {
      notification['error']({
        message:'Delete staff fail',
        placement:'topRight'
      })
    })
  };

  const displayStaff = () => {
    getstaff()
    .then(
      (response) => {
        setStaffs(response.data)
        notification['success'](
          {
            message:'Delete staff success',
            placement:'topRight',
          }
        )
      }
    )
    .catch(error => console.log(error))
  }

  return (
    <div style={{backgroundColor:"#F3F2F2"}}>
      <Container>
        <TitleAndSearch>
          <div><h1>MANAGE STAFF BUILDING</h1></div>
          <div>
            <Search
              placeholder="input search text"
              enterButton="Search"
              size="large"
              onSearch={value => searchStaffByName(value)}
              style={{width:'350px'}}
            />
          </div>
        </TitleAndSearch>
        <Content>
          <div><h2>Staff list</h2></div>
          <ModalStaff
            editModal={editModal}
            setEditModal={setEditModal}
            staffs={staffs}
            setStaffs={setStaffs}
          />

          <Modalstaffservice
            seviceModal={serviceModal}
            setServiceModal={setServiceModal}
            staff={choicestaff}
          ></Modalstaffservice>

          <CompanyTable>
            <Table //dataIndex se duoc su dung nhu la ten cua 1 thuoc tinh cua doi tuong nam trong 1 ban ghi tren bang
            dataSource={data}>
            {/* <Table> */}
              <Column title="Index" dataIndex="id" key="id"  />
              <Column title="Code" dataIndex="code" key="code" />
              <Column title="Name" dataIndex="name" key="name" />
              <Column title="Date of birth" dataIndex="dateOfBirth" key="date_of_birth" />
              <Column title="Address" dataIndex="address" key="address" />
              
              <Column title="Phone number" dataIndex="phoneNumber" key="phone_number" />
              <Column title="Wage" dataIndex="wage" key="wage" />
              <Column title="Position" dataIndex="position" key="position" />
              <Column title="Option" dataIndex="option" key="option" />


              <Column
                title="Action"
                key="action"
                render={(text, record) => (
                  <span>
                    {/* <Link to={`/company/${company.id}/employee`}> */}
                        
                    {/* </Link> */}
                    <a onClick={() => {
                      setServiceModal(true);
                      setChoiceStaff(record);
                    }}>Add new service</a>
                    <Divider type="vertical" />
                    <a onClick= {() => setEditModal(record)}>Edit</a>
                    <Divider type="vertical" />
                    <Popconfirm
                      title="Do you want to  delete this staff?"
                      onConfirm={onConfirmDelete}
                      // onCancel={cancel}
                      okText="Yes"
                      cancelText="No"
                    >
                      <a onClick={()=>setWantDelete(record.id)}>Delete</a>
                    </Popconfirm>
                    
                  </span>
                )}
              />

            </Table>
          </CompanyTable>
          <TableFooter>
            <div>
              {/* Showing 1 to {companies.length} of {companies.length} entries */}
              Showing 1 to 0 of 0 entries
            </div>
          </TableFooter>
        </Content>
      </Container>
    </div>
  )
}

export default Staff