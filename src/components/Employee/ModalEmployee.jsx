import React, { useEffect, useState } from 'react';
import {Button, Modal, Form, Input, notification} from 'antd';
import {postemployee, putemployee, getemployee} from '../../apis/employeeApi'
import {getcompany} from '../../apis/companyApi'

const ModalEmployee = (props) => {
  const {idCompany,clicked_company} = props;
  const [addModal,setAddModal] = useState(false);
  
  const onCancelModal= ()=>{
    setAddModal(false);
    props.setEditModal(null);
  };

  const onFinishModal=(employee)=>{
    if(addModal){
      setAddModal(false);
      postemployee(employee,clicked_company)
      .then(()=>displayData())
      .catch(()=>{
        notification['error'](
          {
            message:"Add employee fail",
            placement:"topRight"
          }
        )
      })
    }
    if(props.editModal){
      props.setEditModal(null);
      putemployee(employee,clicked_company)// employee la thong tin cua cong ty nguoi dung muon sua o form ben duoi, props.editModal.id la id cua cong ty muon edit
      .then(()=>displayData())
      .catch(()=>{
        notification['error'](
          {
            message:'Edit employee fail',
            placement:'topRight'
          }
        )
      })
    }
  };
 
  const displayData=()=>{
    getemployee()
    .then((response)=>{
      props.setEmployees(response.data);
      notification['success'](
        {
          message:addModal?
          'Add employee successful'
          : 'edit employee successful',
          placement:'topRight'
        }
      )
      addModal? setAddModal(false) : props.setEditModal(null);
    })
    .catch((error)=>console.log(error));
  };

  return (
    <div>
        <Button 
          type="primary" 
          style={{margin:'10px'}}
          onClick= {
            () => {
              setAddModal(true)
              console.log(clicked_company.id)}
          }
        >Add employee
        </Button>
        <Modal
        title={addModal ? "Add employee" : "Edit employee"}
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
            label="Name"
            name="name"
            rules={[
              { required: true, message: "Please input your employee name!" },
            ]}
          >
            <Input />
          </Form.Item>

          <Form.Item
            label="Id card"
            name="id_card"
            rules={[
              {
                required: true,
                message: "Please input id card!",
              },
            ]}
          >
            <Input />
          </Form.Item>

          <Form.Item
            label="Code"
            name="employee_code"
            rules={[
              {
                required: true,
                message: "Please input your employee tax number!",
              },
            ]}
          >
            <Input />
          </Form.Item>
          <Form.Item
            label="Date of birth"
            name="date_of_birth"
            rules={[{ required: true, message: "Please input date_of_birth!" }]}
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
          <Form.Item label="Company id" name="company_id">
            <Input defaultValue={clicked_company.id} disabled />
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

export default ModalEmployee