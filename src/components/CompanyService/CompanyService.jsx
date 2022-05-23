import React, { useEffect, useState } from 'react';
import styled from 'styled-components';
import { Table, Divider, notification } from 'antd';
import { Input } from 'antd';
import { Pagination, Button, Popconfirm } from 'antd';
import ModalCompanyService from "./ModalCompanyService";
import {
  getcompanyservice,
  deletecompanyservice,
} from "../../apis/companyServiceApi";

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

const CompanyService = ({ match }) => {
  const [CompanyServices, setCompanyServices] = useState([]);
  const [editModal, setEditModal] = useState(null);
  const [wantDelete, setWantDelete] = useState(null);
  const [idCompany, setIdCompany] = useState(null);
  console.log(match);
  useEffect(() => {
    console.log(match);
    setIdCompany(match.params.id);
    getcompanyservice(match.params.id)
      .then((response) => {
        setCompanyServices(response.data);
      })
      .catch((error) => console.log(error));
  }, []);

  const onConfirmDelete = () => {
    deletecompanyservice(wantDelete)
      .then(() => displayCompanyService())
      .catch(() => {
        notification["error"]({
          message: "Delete CompanyService failed",
          placement: "topRight",
        });
      });
  };

  const displayCompanyService = () => {
    getcompanyservice(idCompany)
      .then((response) => {
        setCompanyServices(response.data);
        notification["success"]({
          message: "Delete CompanyService successful",
          placement: "topRight",
        });
      })
      .catch((error) => console.log(error));
  };


  return (
    <div style={{backgroundColor:"#F3F2F2"}}>
      <Container>
        <TitleAndSearch>
          
        </TitleAndSearch>
        <Content>
          <div><h2>COMPANY's SERVICES list</h2></div>
          {/* <ModalCompanyService
            seviceModal={serviceModal}
            setServiceModal={setServiceModal}
            company={choiceCompany}
          ></ModalCompanyService> */}
          <CompanyTable>
            <Table //dataIndex se duoc su dung nhu la ten cua 1 thuoc tinh cua doi tuong nam trong 1 ban ghi tren bang
            dataSource={CompanyServices}>
            {/* <Table> */}
              <Column title="Index" dataIndex="id" key="id"  />
              <Column title="Service name" dataIndex="serviceName" key="service_name" />
              <Column title="Type" dataIndex="type" key="type" />
              <Column title="Unit price" dataIndex="unitPrice" key="unit_price" />
              <Column title="Month" dataIndex="month" key="month" />
              
              
              
              
              <Column
                title="Action"
                key="action"
                render={(text, record) => (
                  <span>
                    
                    <a onClick= {() => setEditModal(record)}>Edit</a>
                    <Divider type="vertical" />
                    <Popconfirm
                      title="Do you want to  delete this service?"
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

export default CompanyService