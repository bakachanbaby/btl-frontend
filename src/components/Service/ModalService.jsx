import React, { useEffect, useState } from 'react';
import {Button, Modal, Form, Input, notification} from 'antd';
import {postservice, putservice, getservice} from '../../apis/serviceApi'

const ModalService = (props) => {
    const [addModal,setAddModal] = useState(false);
  
    const onCancelModal= ()=>{
      setAddModal(false);
      props.setEditModal(null);
    };
  
    const onFinishModal=(service)=>{
      if(addModal){
        setAddModal(false);
        postservice(service)
        .then(()=>displayData())
        .catch(()=>{
          notification['error'](
            {
              message:"Add service fail",
              placement:"topRight"
            }
          )
        })
      }
      if(props.editModal){
        props.setEditModal(null);
        putservice(service,props.editModal.id)// company la thong tin cua cong ty nguoi dung muon sua o form ben duoi, props.editModal.id la id cua cong ty muon edit
        .then(()=>displayData())
        .catch(()=>{
          notification['error'](
            {
              message:'Edit service fail',
              placement:'topRight'
            }
          )
        })
      }
    };
   
    const displayData=()=>{
      getservice()
      .then((response)=>{
        props.setServices(response.data);
        notification['success'](
          {
            message:addModal?
            'Add service successful'
            : 'edit service successful',
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
            onClick= {() => setAddModal(true)}
          >Add service
          </Button>
          <Modal
            title={addModal? "Add service" : "Edit service"}
            visible={addModal || props.editModal}
            onCancel={onCancelModal}// Ham onCancelModal se duoc goi khi nguoi dung bam nut tat hoac cancel
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
                label="Code"
                name="code" // Thuoc tinh cua doi tuong duoc truyen vao. O day la props.editModal
                rules={[
                  { required: true, message: "Please input service code!" },
                ]}
              >
                <Input />
              </Form.Item>
  
              <Form.Item
                label="Name"
                name="name"
                rules={[
                  {
                    required: true,
                    message: "Please input service name!",
                  },
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
                    message: "Please input service type!" 
                  },
                ]}
              >
                <Input />
              </Form.Item>
              <Form.Item
                label="Unit price"
                name="unitPrice"
                rules={[
                  {
                    required: true,
                    message: "Please input unit price!",
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
    )
}

export default ModalService