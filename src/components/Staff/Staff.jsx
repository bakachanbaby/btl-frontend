import { Button, Divider, Dropdown, Input, Menu, notification, Popconfirm, Space, Table } from "antd";
import { DownOutlined } from "@ant-design/icons";
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import styled from "styled-components";
import { deletestaff, getstaff, searchstaff } from "../../apis/staffApi";
import ModalStaff from "./ModalStaff";
import Modalstaffservice from "./ModalStaffService";

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
const Action = styled.div`
  width: 5vw;
`;
const Staff = () => {
  const [staffs, setStaffs] = useState([]);
  const [editModal, setEditModal] = useState();
  const [wantDelete, setWantDelete] = useState();
  const [serviceModal, setServiceModal] = useState(null);
  const [choicestaff, setChoiceStaff] = useState([]);

  useEffect(() => {
    getstaff()
      .then((response) => setStaffs(response.data))
      .catch((error) => console.log(error));
  });

  const searchStaffByName = (name) => {
    searchstaff(name)
      .then((response) => setStaffs(response.data))
      .catch((error) => console.log(error));
  };

  const onConfirmDelete = () => {
    deletestaff(wantDelete)
      .then(() => {
        displayStaff();
      })
      .catch(() => {
        notification["error"]({
          message: "Delete staff fail",
          placement: "topRight",
        });
      });
  };

  const displayStaff = () => {
    getstaff()
      .then((response) => {
        setStaffs(response.data);
        notification["success"]({
          message: "Delete staff success",
          placement: "topRight",
        });
      })
      .catch((error) => console.log(error));
  };

  const actionMenu = (record) => (
    <Menu>
      <Menu.Item key="1">
        <a
          onClick={() => {
            setServiceModal(true);
            setChoiceStaff(record);
          }}
        >
          Add new service
        </a>{" "}
      </Menu.Item>
      <Menu.Item key="2">
        <a onClick={() => setEditModal(record)}>Edit</a>
      </Menu.Item>
      <Menu.Item key="3">
        <Popconfirm
          title="Do you want to  delete this staff?"
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
            <h1>MANAGE STAFF BUILDING</h1>
          </div>
          <div>
            <Search
              placeholder="input search text"
              enterButton="Search"
              size="large"
              onSearch={(value) => searchStaffByName(value)}
              style={{ width: "350px" }}
            />
          </div>
        </TitleAndSearch>
        <Content>
          <div>
            <h2>Staff list</h2>
          </div>
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
              dataSource={staffs}
            >
              {/* <Table> */}
              <Column title="Index" dataIndex="id" key="id" />
              <Column title="Code" dataIndex="code" key="code" />
              <Column title="Name" dataIndex="name" key="name" />
              <Column
                title="Date of birth"
                dataIndex="date_of_birth"
                key="date_of_birth"
              />
              <Column title="Address" dataIndex="address" key="address" />

              <Column
                title="Phone number"
                dataIndex="phone_number"
                key="phone_number"
              />
              {/* <Column title="Wage" dataIndex="wage" key="wage" />
              <Column title="Position" dataIndex="position" key="position" />
              <Column title="Option" dataIndex="option" key="option" /> */}

              <Column
                title="Action"
                key="action"
                render={(text, record) => (
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

export default Staff;
