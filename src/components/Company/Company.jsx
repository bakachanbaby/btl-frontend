import React, { useEffect, useState } from 'react';
import styled from 'styled-components';
import ModalCompany from './ModalCompany';
import { Table, Divider, notification } from 'antd';
import { Input } from 'antd';
import { Pagination, Button, Popconfirm } from 'antd';
import {deletecompany,getcompany,postcompany,putcompany,searchcompany } from "../../apis/companyApi";

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

const Company = () => {
  const [companies,setCompanies]=useState([]);
  const [editModal,setEditModal]=useState(null);
  const [wantDelete,setWantDelete]=useState(null);

  useEffect(() => {
    getcompany()
      .then((response) => {
        setCompanies(response.data);
      })
      .catch((error) => console.log(error));
  }, []);

  const searchCompanyByName = name =>{
    searchcompany(name).then((response) => setCompanies(response.data));
  };

  const onConfirmDelete= () =>{
    deletecompany(wantDelete)
    .then(()=> displayCompany())
    
  };

  const displayCompany=()=>{
    getcompany()
    .then((response)=>{
      setCompanies(response.data)
      notification['success'](
        {
          message:'Delete company successful',
          placement:'topRight'
        }
      )
    })
    .catch((error)=>{console.log(error)});
  };

  return (
    <div style={{backgroundColor:"#F3F2F2"}}>
      <Container>
        <TitleAndSearch>
          <div><h1>MANAGE COMPANIES</h1></div>
          <div>
            <Search
              placeholder="input search text"
              enterButton="Search"
              size="large"
              onSearch={value => searchCompanyByName(value)}
              style={{width:'350px'}}
            />
          </div>
        </TitleAndSearch>
        <Content>
          <div><h2>Company list</h2></div>
          <ModalCompany
            editModal={editModal}
            setEditModal={setEditModal}
            companies={companies}
            setCompanies={setCompanies}
          />
          <CompanyTable>
            <Table //dataIndex se duoc su dung nhu la ten cua 1 thuoc tinh cua doi tuong nam trong 1 ban ghi tren bang
            dataSource={companies}>
            {/* <Table> */}
              <Column title="Index" dataIndex="id" key="id"  />
              <Column title="Name" dataIndex="company_name" key="name" />
              <Column title="Tax number" dataIndex="tax_number" key="tax_number" />
              <Column title="Authorized capital" dataIndex="authorized_capital" key="authorized_capital" />
              <Column title="Field of operation" dataIndex="field_of_operation" key="field_of_operation" />
              
              <Column title="Building's address" dataIndex="address_in_building" key="address_in_building" />
              <Column title="Phone number" dataIndex="phone_number" key="phone_number" />
              <Column title="Ground number" dataIndex="ground_area" key="ground_number" />
              
              <Column
                title="Action"
                key="action"
                render={(text, record) => (
                  <span>
                    {/* <Link to={`/company/${company.id}/employee`}> */}
                        <a>View Employee</a>
                    {/* </Link> */}
                    <Divider type="vertical" />
                    <a onClick= {() => setEditModal(record)}>Edit</a>
                    <Divider type="vertical" />
                    <Popconfirm
                      title="Do you want to delete this company?"
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

export default Company