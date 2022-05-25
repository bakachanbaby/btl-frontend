import { Button, Form, Input, Modal, notification } from "antd";
import { useState } from "react";
import { getcompany, postcompany, putcompany } from "../../apis/companyApi";

const ModalCompany = (props) => {
  const [addModal, setAddModal] = useState(false);

  const onCancelModal = () => {
    setAddModal(false);
    props.setEditModal(null);
  };

  const onFinishModal = (company) => {
    if (addModal) {
      setAddModal(false);
      postcompany(company)
        .then(() => displayData())
        .catch(() => {
          notification["error"]({
            message: "Add company fail",
            placement: "topRight",
          });
        });
    }
    if (props.editModal) {
      props.setEditModal(null);
      putcompany(company, props.editModal.id) // company la thong tin cua cong ty nguoi dung muon sua o form ben duoi, props.editModal.id la id cua cong ty muon edit
        .then(() => displayData())
        .catch(() => {
          notification["error"]({
            message: "Edit company fail",
            placement: "topRight",
          });
        });
    }
  };

  const displayData = () => {
    getcompany()
      .then((response) => {
        props.setCompanies(response.data);
        notification["success"]({
          message: addModal
            ? "Add company successful"
            : "edit company successful",
          placement: "topRight",
        });
        addModal ? setAddModal(false) : props.setEditModal(null);
      })
      .catch((error) => console.log(error));
  };

  return (
    <div>
      <Button
        type="primary"
        style={{ margin: "10px" }}
        onClick={() => setAddModal(true)}
      >
        Add company
      </Button>
      <Modal
        title={addModal ? "Add company" : "Edit company"}
        visible={addModal || props.editModal}
        onCancel={onCancelModal} // Ham onCancelModal se duoc goi khi nguoi dung bam nut tat hoac cancel
        destroyOnClose={true}
        footer={null}
      >
        <Form //Khi hoan tat form va submit, tat ca du lieu se duoc goi vao 1 doi tuong va chui vao function onFinishModal(). Moi mot doi tuong se co thuoc tinh duoc dat sau prop 'name' cua form item
          name="nest-messages"
          labelCol={{ span: 5 }}
          wrapperCol={{ span: 16 }}
          onFinish={onFinishModal}
          initialValues={props.editModal}
        >
          <Form.Item
            label="Name"
            name="company_name" // Thuoc tinh cua doi tuong duoc truyen vao. O day la props.editModal
            rules={[
              { required: true, message: "Please input your company name!" },
            ]}
          >
            <Input />
          </Form.Item>

          <Form.Item
            label="Tax number"
            name="tax_number"
            rules={[
              {
                required: true,
                message: "Please input your company tax number!",
              },
            ]}
          >
            <Input />
          </Form.Item>
          <Form.Item
            label="Capital"
            name="authorized_capital"
            rules={[
              { required: true, message: "Please input authorized capital!" },
            ]}
          >
            <Input />
          </Form.Item>
          <Form.Item
            label="Operation"
            name="field_of_operation"
            rules={[
              {
                required: true,
                message: "Please input your field of operation!",
              },
            ]}
          >
            <Input />
          </Form.Item>
          <Form.Item
            label="Address"
            name="address_in_building"
            rules={[
              {
                required: true,
                message: "Please input your address in building!",
              },
            ]}
          >
            <Input />
          </Form.Item>
          <Form.Item
            label="Phone"
            name="phone_number"
            rules={[
              {
                required: true,
                message: "Please input your phone number!",
              },
            ]}
          >
            <Input />
          </Form.Item>
          <Form.Item
            label="Ground area"
            name="ground_area"
            rules={[
              {
                required: true,
                message: "Please input your ground area!",
              },
            ]}
          >
            <Input />
          </Form.Item>

          <Form.Item wrapperCol={{ offset: 8, span: 16 }}>
            <Button style={{ marginRight: 10 }} onClick={onCancelModal}>
              Close
            </Button>
            <Button type="primary" htmlType="submit">
              {addModal ? "Add" : "Save"}
            </Button>
          </Form.Item>
        </Form>
      </Modal>
    </div>
  );
};

export default ModalCompany;
