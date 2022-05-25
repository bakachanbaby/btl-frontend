import { Button, Form, Input, Modal, notification } from "antd";
import { useState } from "react";
import {
  getcompanyservice,
  postcompanyservice,
  putcompanyservice
} from "../../apis/companyServiceApi";

const ModalCompanyService = (props) => {
  // const {idCompany} = props;
  const company = props.company;
  // const services = props.services;
  const [addModal, setAddModal] = useState(false);

  const onCancelModal = () => {
    setAddModal(false);
    props.setEditModal(null);
  };

  const onFinishModal = (companyServices) => {
    if (addModal) {
      setAddModal(false);
      postcompanyservice(companyServices, company)
        .then(() => displayData())
        .catch(() => {
          notification["error"]({
            message: "Add company services fail",
            placement: "topRight",
          });
        });
    }
    if (props.editModal) {
      props.setEditModal(null);
      putcompanyservice(companyServices, company, props.editModal.id) // employee la thong tin cua cong ty nguoi dung muon sua o form ben duoi, props.editModal.id la id cua cong ty muon edit
        .then(() => displayData())
        .catch(() => {
          notification["error"]({
            message: "Edit company services fail",
            placement: "topRight",
          });
        });
    }
  };

  const displayData = () => {
    getcompanyservice()
      .then((response) => {
        props.setCompanyServices(response.data);
        notification["success"]({
          message: addModal
            ? "Add Company Services successful"
            : "edit Company Services successful",
          placement: "topRight",
        });
        addModal ? setAddModal(false) : props.setEditModal(null);
      })
      .catch((error) => console.log(error));
  };
  // const menu = (
  //   <Menu
  //     {services.map((service) =>(

  //     ))}
      
  // );
  return (
    <div>
      <Button
        type="primary"
        style={{ margin: "10px" }}
        onClick={() => {
          setAddModal(true);
        }}
      >
        Add Company Services
      </Button>
      <Modal
        title={addModal ? "Add Company Services" : "Edit Company Services"}
        visible={addModal || props.editModal}
        onCancel={onCancelModal}
        footer={""}
        destroyOnClose={true}
      >
        <Form
          name="nest-messages"
          labelCol={{ span: 5 }}
          wrapperCol={{ span: 16 }}
          onFinish={onFinishModal}
          initialValues={props.editModal}
        >
          <Form.Item
            label="Code"
            name="service_code"
            rules={[
              {
                required: true,
                message: "Please input your service code!",
              },
            ]}
          >
            <Input />
          </Form.Item>
          <Form.Item
            label="Name"
            name="name"
            rules={[
              { required: true, message: "Please input your service name!" },
            ]}
          >
            <Input />
          </Form.Item>

          <Form.Item
            label="Type"
            name="type"
            rules={[
              {
                required: true,
                message: "Please input type!",
              },
            ]}
          >
            <Input />
          </Form.Item>

          <Form.Item
            label="Unit price"
            name="unit_price"
            rules={[{ required: true, message: "Please input unit_price!" }]}
          >
            <Input />
          </Form.Item>

          <Form.Item
            label="Month"
            name="month"
            rules={[
              {
                required: true,
                message: "Please input month!",
              },
            ]}
          >
            <Input />
          </Form.Item>
          <Form.Item label="Company id" name="company_id">
            <Input defaultValue={company.company_id} disabled />
          </Form.Item>

          <Form.Item wrapperCol={{ offset: 8, span: 16 }} className="form-btn">
            <Button style={{ marginRight: 10 }} onClick={onCancelModal}>
              Close
            </Button>
            <Button type="primary" htmlType="submit" className="btn-submit">
              {addModal ? "Add" : "Save"}
            </Button>
          </Form.Item>
        </Form>
      </Modal>
    </div>
  );
};

export default ModalCompanyService;
