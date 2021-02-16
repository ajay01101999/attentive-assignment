import "./styles.css";
import "antd/dist/antd.css";

import { Table, Button } from "antd";
import React, { useState } from "react";
import ModalComp from './Modal';
import Header from './Header';

export const dataContext = React.createContext();
export const modalData = React.createContext();
export const compModalData = React.createContext();

export default function App() {
  const dataSource = [
    { id: 1, name: "Ajay Sharma", age: "20", option: ["delete", "edit"] },
    { id: 2, name: "Shiv", age: "22", option: ["delete", "add"] }
  ];


  const [modal, setModal] = useState(false);
  const [name, setName] = useState("");
  const [age, setAge] = useState("Above 18");
  const [data, setData] = useState(dataSource);
  const [editEnable, setEditEnable] = useState({
    enable:false,
  });
  const [multiDel, setMultiDel] = useState([]);

  const columns = [
    { title: "Name", dataIndex: "name",
      render:(option, record)=>(
        <div>
          <input type='checkbox' onChange={(e)=>addMulti(record.id-1, e.target.checked)} />
          <span>&nbsp;{record.name}</span>
        </div>
      ) 
    },
    { title: "Age", dataIndex: "age" },
    {
      title: "Option",
      dataIndex: "option",
      render: (option, record) => (
        // option.map((btn) => (
        <div>
          <Button
            style={{ marginRight: "20px" }}
            type="link"
            onClick={() => handleDelete(record.id)}
          >
            {"delete".toUpperCase()}
          </Button>
          <Button onClick={(e) => handleEdit(record)}>edit</Button>
        </div>
      )
      // ))
    }
  ];

  const addMulti=(index, selected)=>{
    const newMultiDel = [...multiDel];
    if(selected)
      setMultiDel(prev=>[...prev,index]);
    else if(!selected) {
      for(let i=0;i<multiDel.length;i++){
        if(multiDel[i]===index)
          newMultiDel.splice(i,1);
          setMultiDel(newMultiDel);
      }
    }
  }

  const handleDelete = (id) => {
    var newData = [...data];
    for (var i = 0; i < newData.length; i++) {
      if (newData[i].id === id) {
        newData.splice(i, 1);
      }
    }
    setData(newData);
  };

  const handleEdit = (record) => {
    setModal(true);
    setName(record.name)
    setEditEnable({
      enable:true,
      index:record.id-1
    })
  };

  const addData = () => {
    const obj = {
      id: data.length + 1,
      name,
      age,
      option: ["delete", "edit"]
    };
    if(editEnable.enable){
      var arr = [...data];
      arr[editEnable.index].name=name;
      setData(arr)
      setEditEnable({enable:false})
      setModal(false)
    }else{
      setData((prevState) => [...prevState, { ...obj }]);
      setModal(false)
    }
  };

  // const showModal = () => {
  //   setModal(true);
  // };

  // const handleOk = () => {
  //   setModal(false);
  // };

  const handleCancel = () => {
    setModal(false);
  };

  const handleMultiDelete = ( ) =>{
    console.log(multiDel)
    multiDel.sort((a, b)=> b-a);
    console.log(multiDel)
    const newData = [...data];
    if(multiDel.length)
      for(let i=0;i<multiDel.length;i++){
        newData.splice(multiDel[i],1);
        console.log(newData)
      }
    setData(newData);
  }

  return (
    <div className="App">
      <dataContext.Provider value={data}>
        <modalData.Provider value={{ setModal, modal, handleMultiDelete }}>
          <compModalData.Provider value={{ editEnable, modal, addData, handleCancel, setName, name, setAge }}>
            <Header/>
            <Table style={{ margin: "20px" }} columns={columns} dataSource={data} />
            <ModalComp/>
          </compModalData.Provider>
        </modalData.Provider>
      </dataContext.Provider>
    </div>
  );
}