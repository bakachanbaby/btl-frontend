import { Divider, Input, notification, Popconfirm, Table } from "antd";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import styled from "styled-components";
import {
  deletecompanyservice,
  getcompanyservice,
} from "../../apis/companyServiceApi";
import { searchemployee } from "../../apis/employeeApi";
import { getservice } from "../../apis/serviceApi";
import ModalEmployee from "../Employee/ModalEmployee";
import ModalCompanyService from "./ModalCompanyService";

const { Search } = Input;
const { Column } = Table;

const Container = styled.div`
  margin: 20px;
`;

const TitleAndSearch = styled.div`
  display: flex;
  justify-content: space-between;
  width: 88.5vw;
`;

const Content = styled.div``;

const CompanyTable = styled.div`
  margin: 10px;
`;

const TableFooter = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin: 10px;
`;

const CompanyService = () => {
  const [companyServices, setCompanyServices] = useState([]);
  const [services, setServices] = useState([]);
  const [editModal, setEditModal] = useState(null);
  const [wantDelete, setWantDelete] = useState(null);
  const [idCompany, setIdCompany] = useState(null);
  const companyParam = useParams();

  useEffect(() => {
    setIdCompany(companyParam.company_id);
    // setServices(getservice())
    getcompanyservice(idCompany)
      .then((response) => {
        setCompanyServices(response.data);
      })
      .catch((error) => console.log(error));
  });

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
    <div style={{ backgroundColor: "#F3F2F2" }}>
      <Container>
        <TitleAndSearch>
          <div>
            <h1>MANAGE COMPANY's SERVICES</h1>
          </div>
          {/* <div>
            <Search
              placeholder="input search text"
              enterButton="Search"
              size="large"
              onSearch={(value) => searchemployee(value)}
              style={{ width: "350px" }}
            />
          </div> */}
        </TitleAndSearch>
        <Content>
          <div>
            <h2>Company service list</h2>
          </div>
          <ModalCompanyService
            company={companyParam}
            editModal={editModal}
            setEditModal={setEditModal}
            companyServices={companyServices}
            // setCompanyServices={setCompanyServices}
            
            // idCompany={idCompany}
          />
          <CompanyTable>
            <Table //dataIndex se duoc su dung nhu la ten cua 1 thuoc tinh cua doi tuong nam trong 1 ban ghi tren bang
              dataSource={companyServices}
            >
              {/* <Table> */}
              <Column title="Index" dataIndex="id" key="id" />
              <Column
                title="Service name"
                dataIndex="name"
                key="service_name"
              />
              <Column title="Type" dataIndex="type" key="type" />
              <Column
                title="Unit price"
                dataIndex="unit_price"
                key="unit_price"
              />
              <Column title="Month" dataIndex="month" key="month" />

              <Column
                title="Action"
                key="action"
                render={(record) => (
                  <span>
                    <a onClick={() => setEditModal(record)}>Edit</a>
                    <Divider type="vertical" />
                    <Popconfirm
                      title="Do you want to  delete this service?"
                      onConfirm={onConfirmDelete}
                      // onCancel={cancel}
                      okText="Yes"
                      cancelText="No"
                    >
                      <a onClick={() => setWantDelete(record.id)}>Delete</a>
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
  );
};

export default CompanyService;
