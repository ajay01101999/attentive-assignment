import React, { useContext } from 'react';
import { Modal, Input, Select } from 'antd';
import { compModalData } from './App';

const Option = Input;

const ModalComp = () =>{
    
    const data = useContext(compModalData);

    return (
        <div>
            <Modal
                title={data.editEnable.enable?'EDIT DATA':'ADD DATA'}
                visible={data.modal}
                onOk={data.addData}
                onCancel={data.handleCancel}
            >
                <Input
                onChange={(e) => data.setName(e.target.value)}
                value={data.name}
                className="input"
                style={{ width: "460px", marginBottom: "20px" }}
                placeholder="Enter Name"
                />
                <Select
                className="select"
                defaultValue="Above 18"
                onChange={(e) => data.setAge(e)}
                >
                <Option value="Above 18">Above 18</Option>
                <Option value="Below 18">Below 18</Option>
                </Select>
                
            </Modal>
        </div>
    )
}

export default ModalComp;