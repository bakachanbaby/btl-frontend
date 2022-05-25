import { DownOutlined } from "@ant-design/icons";
import {
  Button,
  Dropdown,
  Input,
  Menu,
  notification,
  Popconfirm,
  Space,
  Table,
} from "antd";

import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import styled from "styled-components";
import {
  deleteservice,
  getservice,
  searchservice,
} from "../../apis/serviceApi";
import ModalService from "./ModalService";

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

const ServiceTable = styled.div`
  margin: 10px;
`;

const TableFooter = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin: 10px;
`;
const Action = styled.div`
  width: 1vw;
`;
const Service = ({ match }) => {
  const [services, setServices] = useState([]);
  const [editModal, setEditModal] = useState(null);
  const [wantDelete, setWantDelete] = useState(null);

  useEffect(() => {
    getservice()
      .then((response) => {
        setServices(response.data);
        console.log(response.data);
      })
      .catch((error) => console.log(error));
  }, []);

  const searchServiceByName = (name) => {
    searchservice(name).then((response) => setServices(response.data));
  };

  const onConfirmDelete = () => {
    deleteservice(wantDelete).then(() => displayService());
  };

  const displayService = () => {
    getservice()
      .then((response) => {
        setServices(response.data);
        notification["success"]({
          message: "Delete service successful",
          placement: "topRight",
        });
      })
      .catch((error) => {
        console.log(error);
      });
  };
  const actionMenu = (record) => (
    <Menu>
      <Menu.Item key="2">
        <a onClick={() => setEditModal(record)}>Edit</a>
      </Menu.Item>
      <Menu.Item key="3">
        <Popconfirm
          title="Do you want to delete this service?"
          onConfirm={onConfirmDelete}
          // onCancel={cancel}
          okText="Yes"
          cancelText="No"
        >
          <a onClick={() => setWantDelete(record.id)}>Delete</a>
        </Popconfirm>
      </Menu.Item>

    </Menu>
  );
  return (
    <div style={{ backgroundColor: "#F3F2F2" }}>
      <Container>
        <TitleAndSearch>
          <div>
            <h1>MANAGE SERVICE</h1>
          </div>
          <div>
            <Search
              placeholder="input search text"
              enterButton="Search"
              size="large"
              onSearch={(value) => searchServiceByName(value)}
              style={{ width: "350px" }}
            />
          </div>
        </TitleAndSearch>
        <Content>
          <div>
            <h2>Service list</h2>
          </div>
          <ModalService
            editModal={editModal}
            setEditModal={setEditModal}
            services={services}
            setServices={setServices}
          />
          <ServiceTable>
            <Table //dataIndex se duoc su dung nhu la ten cua 1 thuoc tinh cua doi tuong nam trong 1 ban ghi tren bang
              dataSource={services}
            >
              {/* <Table> */}
              <Column title="Index" dataIndex="id" key="id" />
              <Column title="Code" dataIndex="service_code" key="code" />
              <Column title="Name" dataIndex="name" key="name" />
              <Column title="Type" dataIndex="type" key="type" />
              <Column
                title="Unit price"
                dataIndex="unit_price"
                key="unit_price"
              />
              <Column
                title="Action"
                key="action"
                render={( record) => (
                  <Action>
                    <Dropdown overlay={actionMenu(record)}>
                      <Button>
                        <Space>
                          Action
                          <DownOutlined />
                        </Space>
                      </Button>
                    </Dropdown>
                  </Action>
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
  );
};

export default Service;
