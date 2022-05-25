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
import { useParams } from "react-router-dom";
import styled from "styled-components";
import { deletestaffservice } from "../../apis/staffServiceApi";
import { getstaffservice } from "../../apis/staffServiceApi";
import ModelStaffService from "./ModalStaffService";

const { Search } = Input;
const { Column, ColumnGroup } = Table;

const Container = styled.div`
  margin: 20px;
`;

const TitleAndSearch = styled.div`
  display: flex;
  justify-content: space-between;
  width: 88.5vw;
`;

const Content = styled.div``;

const StaffServiceTable = styled.div`
  margin: 10px;
`;

const TableFooter = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin: 10px;
`;
const Action = styled.div`
  width: 3vw;
`;
const StaffService = () => {
  const [staffservice, setStaffservice] = useState([]);
  const [idStaff, setIdStaff] = useState();
  const [wantDelete, setWantDelete] = useState();
  const [editModal, setEditModal] = useState();
  const staffParam = useParams();


  useEffect(() => {
    // console.log(staffParam);
    setIdStaff(staffParam.id);
    getstaffservice(idStaff)
      .then((response) => {
        setStaffservice(response.data);
        // staffservice.service_code = staffservice.service.service_code
      })
      .catch((error) => console.log(error));
  });

  //   const searchStaffServiceByName = (name) => {
  //     searchemployee(name).then((response) => setStaffservice(response.data));
  //   };

  const onConfirmDelete = () => {
    deletestaffservice(wantDelete)
      .then(() => displaystaffservice())
      .catch(
        notification["error"]({
          message: "Delete staffservice failed",
          placement: "topRight",
        })
      );
  };

  const displaystaffservice = () => {
    getstaffservice(idStaff)
      .then((response) => {
        setStaffservice(response.data);
        notification["success"]({
          message: "Delete staff service successful",
          placement: "topRight",
        });
      })
      .catch((error) => console.log(error));
  };
  const actionMenu = (record) => (
    <Menu>
      <Menu.Item key="2">
        <a
          onClick={() => {
            setEditModal(record);
          }}
        >
          Edit
        </a>
      </Menu.Item>
      <Menu.Item key="3">
        <Popconfirm
          title="Do you want to delete this staffservice?"
          onConfirm={onConfirmDelete}
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
            <h1>MANAGE STAFF SERVICES</h1>
          </div>
          {/* <div>
            <Search
              placeholder="input search text"
              enterButton="Search"
              size="large"
              onSearch={(value) => searchStaffServiceByName(value)}
              style={{ width: "350px" }}
            />
          </div> */}
        </TitleAndSearch>
        <Content>
          <div>
            <h2>Staff Service List</h2>
          </div>
          <ModelStaffService
            company={staffParam}
            editModal={editModal}
            setEditModal={setEditModal}
            staffservice={staffservice}
            setStaffservice={setStaffservice}

            // idStaff={idStaff}
          />
          <StaffServiceTable>
            <Table //dataIndex se duoc su dung nhu la ten cua 1 thuoc tinh cua doi tuong nam trong 1 ban ghi tren bang
              dataSource={staffservice}
            >
              {/* <Table> */}
              {/* <Table> */}
              <Column title="Index" dataIndex="id" key="id" />
              <Column title="Service Code" dataIndex='service' key="code" />
              <Column title="Service Name" dataIndex="staff.name" key="name" />
              <Column title="Salary" dataIndex="staff_salary" key="staff_salary" />
              <Column title="Position" dataIndex="staff_position" key="staff_position" />
              <Column title="Level" dataIndex="staff_level" key="staff_level" />

              <Column
                title="Action"
                key="action"
                render={(record) => (
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
          </StaffServiceTable>
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

export default StaffService;
