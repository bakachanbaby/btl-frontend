import { Button, Form, Input, Modal, notification } from 'antd';
import { useState } from 'react';
import { getstaff, poststaff, putstaff } from "../../apis/staffApi";

const ModalStaff = (props) => {
  const [addModal,setAddModal] = useState();

  const onFinishModal = (staff) => {
    if(addModal){
      poststaff(staff)
      .then(()=> displayStaff())
      .catch(
        ()=>{
          notification['error'](
            {
              message:"Add staff fail",
              placement:"topRight"
            }
          )
        }
      )
    }
    if(props.editModal){
      putstaff(staff,props.editModal.id)
      .then(()=> displayStaff())
      .catch(
        ()=>{
          notification['error'](
            {
              message:"Edit staff fail",
              placement:"topRight"
            }
          )
        }
      )

    }
  }

  const displayStaff = () =>{
    getstaff()
    .then(()=>{
      notification['success']({
        message: addModal? 'Add staff success' : 'Edit staff success',
        placement: 'topRight'
      })
      addModal? setAddModal(false) : props.setEditModal(null)
    })
    .catch((error)=>console.log(error))
  }

  const onCancelModal = () => {
    setAddModal(false);
    props.setEditModal(null);
  }

  return (
    <div>
        <Button 
          type="primary" 
          style={{margin:'10px'}}
          onClick= {() => setAddModal(true)}
        >Add Staff
        </Button>
        <Modal
          title={addModal? "Add staff" : "Edit staff"}
          visible={addModal || props.editModal}
          onCancel={onCancelModal}// Ham onCancelModal se duoc goi khi nguoi dung bam nut tat hoac cancel
          destroyOnClose={true}
          footer={null}
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
              name="code"
              rules={[
                {
                  required: true,
                  message: "Please input your staff code!",
                },
              ]}
            >
              <Input />
            </Form.Item>
            <Form.Item
              label="Name"
              name="name"
              rules={[{ required: true, message: "Please input staff name!" }]}
            >
              <Input />
            </Form.Item>
            <Form.Item
              label="Date of birth"
              name="date_of_birth"
              rules={[
                { required: true, message: "Please input staff date of birth!" },
              ]}
            >
              <Input />
            </Form.Item>
            <Form.Item
              label="Address"
              name="address"
              rules={[
                {
                  required: true,
                  message: "Please input address!",
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
                  message: "Please input phone number!",
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
  )
}

export default ModalStaff