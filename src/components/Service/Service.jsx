import React, { useEffect, useState } from 'react';
import styled from 'styled-components';
import ModalService from './ModalService';
import { Table, Divider, notification } from 'antd';
import { Input } from 'antd';
import { Pagination, Button, Popconfirm } from 'antd';
import {deleteservice,getservice,postservice,putservice,searchservice } from "../../apis/serviceApi";

const { Search } = Input;
const { Column, ColumnGroup } = Table;

// const data = [
//   {
//     key: '1',
//     id: '1',
//     name: 'John',
//     taxNumber: '654543',
//     authorizedCapital: 32,
//     fieldOfOperation: 'New York No. 1 Lake Park',
//     addressBuilding: 'New York No. 1 Lake Park',
//     phoneNumber:'093243432',
//     groundArea:100
//   },
//   {
//     key: '1',
//     id: '2',
//     name: 'John',
//     taxNumber: '654543',
//     authorizedCapital: 32,
//     fieldOfOperation: 'New York No. 1 Lake Park',
//     addressBuilding: 'New York No. 1 Lake Park',
//     phoneNumber:'093243432',
//     groundArea:100
//   },
//   {
//     key: '1',
//     id: '3',
//     name: 'John',
//     taxNumber: '654543',
//     authorizedCapital: 32,
//     fieldOfOperation: 'New York No. 1 Lake Park',
//     addressBuilding: 'New York No. 1 Lake Park',
//     phoneNumber:'093243432',
//     groundArea:100
//   },
// ];

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



const ServiceTable=styled.div`
  margin:10px;
`

const TableFooter=styled.div`
  display:flex;
  justify-content:space-between;
  align-items:center;
  margin:10px;
`



const Service = ({match}) => {
  const [services,setServices]=useState([]);
  const [editModal,setEditModal]=useState(null);
  const [wantDelete,setWantDelete]=useState(null);

  useEffect(() => {
    console.log(match);
    getservice()
      .then((response) => {
        setServices(response.data);
      })
      .catch((error) => console.log(error));
  }, []);

  const searchServiceByName = name =>{
    searchservice(name).then((response) => setServices(response.data));
  };

  const onConfirmDelete= () =>{
    deleteservice(wantDelete)
    .then(()=> displayService())
    
  };

  const displayService=()=>{
    getservice()
    .then((response)=>{
      setServices(response.data)
      notification['success'](
        {
          message:'Delete service successful',
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
          <div><h1>MANAGE SERVICE</h1></div>
          <div>
            <Search
              placeholder="input search text"
              enterButton="Search"
              size="large"
              onSearch={value => searchServiceByName(value)}
              style={{width:'350px'}}
            />
          </div>
        </TitleAndSearch>
        <Content>
          <div><h2>Service list</h2></div>
          <ModalService
            editModal={editModal}
            setEditModal={setEditModal}
            services={services}
            setServices={setServices}
          />
          <ServiceTable>
            <Table //dataIndex se duoc su dung nhu la ten cua 1 thuoc tinh cua doi tuong nam trong 1 ban ghi tren bang
            dataSource={services}>
            {/* <Table> */}
              <Column title="Index" dataIndex="id" key="id"  />
              <Column title="Code" dataIndex="service_code" key="code" />
              <Column title="Name" dataIndex="name" key="name" />
              <Column title="Type" dataIndex="type" key="type" />
              <Column title="Unit price" dataIndex="unit_price" key="unit_price" />
              
              
              <Column
                title="Action"
                key="action"
                render={(text, record) => (
                  <span>
                    <a onClick= {() => setEditModal(record)}>Edit</a>
                    <Divider type="vertical" />
                    <Popconfirm
                      title="Do you want to delete this service?"
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
          </ServiceTable>
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

export default Service