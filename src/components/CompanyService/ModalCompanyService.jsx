import { Button, Form, Input, Modal, notification, Select } from "antd";
import { useEffect, useState } from "react";
import {
  getcompanyservice,
  postcompanyservice,
  putcompanyservice,
} from "../../apis/companyServiceApi";
import { getservice, getservicebyid } from "../../apis/serviceApi";
const { Option } = Select;


const ModalCompanyService = (props) => {
  // const {idCompany} = props;
  const company = props.company;
  const [services, setservices] = useState([]);
  // const services = props.services;
  const [addModal, setAddModal] = useState(false);

  useEffect(() => {
    getservice()
      .then((response) => {
        setservices(response.data);
        console.log(response.data);
      })
      .catch((error) => console.log(error));
  }, []);

  const onCancelModal = () => {
    setAddModal(false);
    props.setEditModal(null);
  };

  const onFinishModal = async (companyServices) => {
    const servicechoice = await getservicebyid(companyServices.service);

    if (addModal) {
      setAddModal(false);
      postcompanyservice(companyServices, company, servicechoice.data)
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
      putcompanyservice(
        companyServices,
        company,
        servicechoice.data,
        props.editModal.id
      ) // employee la thong tin cua cong ty nguoi dung muon sua o form ben duoi, props.editModal.id la id cua cong ty muon edit
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
            label="Service"
            name="service"
            rules={[{ required: true, message: "Please select service!" }]}
          >
            <Select style={{ width: "10vw" }}>
              {services.map((province) => (
                <Option key={province.id}>{province.name}</Option>
              ))}
            </Select>
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
