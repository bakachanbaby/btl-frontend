import { Table } from 'antd';
import { useEffect, useState } from 'react';
import styled from 'styled-components';
import { getsalary } from '../../apis/salaryApi';

const { Column} = Table;

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

const Salary = () => {
  const [salaries,setSalaries] = useState();

  useEffect(()=>{
    getsalary()
    .then((response) => setSalaries(response.data))
    .catch((error) => console.log(error))
  });



  return (
    <div style={{backgroundColor:"#F3F2F2"}}>
      <Container>
        <TitleAndSearch>
          <div><h1>VIEW SALARY</h1></div>
          <div>
            
          </div>
        </TitleAndSearch>
        <Content>
          <div><h2>SALARY LIST</h2></div>
          
          <CompanyTable>
            <Table //dataIndex se duoc su dung nhu la ten cua 1 thuoc tinh cua doi tuong nam trong 1 ban ghi tren bang
            dataSource={salaries}>
            {/* <Table> */}
              <Column title="Index" dataIndex="id" key="id"  />
              <Column title="Name" dataIndex="name" key="name" />
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

export default Salary;