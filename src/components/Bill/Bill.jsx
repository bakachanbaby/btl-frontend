import React, { useEffect, useState } from 'react';
import styled from 'styled-components';
import { Table, Divider, notification } from 'antd';
import {getbill} from '../../apis/billApi';

const { Column,} = Table;

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

const Bill = () => {
  const [bills,setBills] = useState();

  useEffect(()=>{
    getbill()
    .then((response) => setBills(response.data))
    .catch((error) => console.log(error))
  });



  return (
    <div style={{backgroundColor:"#F3F2F2"}}>
      <Container>
        <TitleAndSearch>
          <div><h1>View bills</h1></div>
          <div>
            
          </div>
        </TitleAndSearch>
        <Content>
          <div><h2>Bill List</h2></div>
          
          <CompanyTable>
            <Table //dataIndex se duoc su dung nhu la ten cua 1 thuoc tinh cua doi tuong nam trong 1 ban ghi tren bang
            dataSource={bills}>
            {/* <Table> */}
              <Column title="Index" dataIndex="id" key="id"  />
              <Column title="Company name" dataIndex="companyName" key="company_name" />
              <Column title="Total money" dataIndex="totalMoney" key="total_money" />
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

export default Bill