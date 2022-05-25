import { Button, Form, Input, Modal, notification, Select } from "antd";
import "antd/dist/antd.css";
import { useEffect, useState } from "react";
import { getservice, getservicebyid } from "../../apis/serviceApi";
import { poststaffservice } from "../../apis/staffServiceApi";
const { Option } = Select;
const Modalstaffservice = (props) => {
  const [addModal, setAddModal] = useState(false);
  const [services, setservices] = useState([]);
  const { staff } = props;

  useEffect(() => {
    getservice()
      .then((response) => {
        setservices(response.data);
        console.log(response.data);
      })
      .catch((error) => console.log(error));
  }, []);

  const onFinishModal = async (staffservice) => {
    console.log(staffservice);

    console.log("staff", staff);
    const servicechoice = await getservicebyid(staffservice.service);
    console.log("service", servicechoice.data);
    poststaffservice(staffservice, staff, servicechoice.data)
      .then(() => {
        notification["success"]({
          message: "Add servive sucess",
          placement: "topRight",
        });
        props.setServiceModal(null);
      })
      .catch(() => {
        notification["error"]({
          message: "Add  servive failed",
          placement: "topRight",
        });
      });
  };

  const onCancelModal = () => {
    props.setServiceModal(null);
  };

  return (
    <>
      <Modal
        title={addModal ? "Add staff service" : "Edit staff service"}
        visible={props.seviceModal}
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
            label="Salary"
            name="staff_salary"
            rules={[
              {
                required: true,
                message: "Please input your staffservice code!",
              },
            ]}
          >
            <Input />
          </Form.Item>
          <Form.Item
            label="Staff position"
            name="staff_position"
            rules={[
              { required: true, message: "Please input staffservice name!" },
            ]}
          >
            <Input />
          </Form.Item>
          <Form.Item
            label="Staff level"
            name="staff_level"
            rules={[
              {
                required: true,
                message: "Please input staffservice staff_level!",
              },
            ]}
          >
            <Input />
          </Form.Item>
          <Form.Item
            label="month"
            name="month"
            rules={[
              {
                required: true,
                message: "Please input staffservice month!",
              },
            ]}
          >
            <Input />
          </Form.Item>

          <Form.Item
            label="Service"
            name="service"
            rules={[{ required: true, message: "Please select gender!" }]}
          >
            <Select style={{ width: 120 }}>
              {services.map((province) => (
                <Option key={province.id}>{province.name}</Option>
              ))}
            </Select>
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
    </>
  );
};

export default Modalstaffservice;
