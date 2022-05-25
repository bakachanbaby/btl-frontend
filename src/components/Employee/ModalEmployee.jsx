import { Button, Form, Input, Modal, notification } from 'antd';
import { useState } from 'react';
import { getemployee, postemployee, putemployee } from '../../apis/employeeApi';

const ModalEmployee = (props) => {
  // const {idCompany} = props;
  const {company} = props;
  const [addModal,setAddModal] = useState(false);
  
  const onCancelModal= ()=>{
    setAddModal(false);
    props.setEditModal(null);
  };

  const onFinishModal=(employee)=>{
    if(addModal){
      // console.log(employee);
      // console.log(company);
      setAddModal(false);
      postemployee(employee,company)
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
      // console.log(employee);
      // console.log(company);
      putemployee(employee,company,props.editModal.id)// employee la thong tin cua cong ty nguoi dung muon sua o form ben duoi, props.editModal.id la id cua cong ty muon edit
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
              setAddModal(true)}
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
          {/* <Form.Item label="Employee id" name="employee_id">
            <Input defaultValue={props.editModal} disabled />
          </Form.Item> */}
          <Form.Item
            label="Name"
            name="employee_name"
            rules={[
              { required: true, message: "Please input your employee name!" },
            ]}
          >
            <Input onClick={() => {console.log(props.editModal.id);}} />
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
            <Input defaultValue={company.company_id} disabled />
          </Form.Item>

          <Form.Item wrapperCol={{ offset: 8, span: 16 }} className="form-btn">
            <Button style={{ marginRight: 10 }} onClick={onCancelModal}>
              Close
            </Button>
            <Button type="primary" htmlType="submit" className="btn-submit" >
              {addModal ? "Add" : "Save"}
            </Button>
          </Form.Item>
        </Form>
      </Modal>
    </div>
  )
}

export default ModalEmployee