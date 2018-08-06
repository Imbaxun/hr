import React, { Component } from 'react';
import { Row, Col, Input, Button, Table, Popconfirm,Modal } from 'antd';
import './department.css'
import {API} from '../../common/axiosAPI'
import {getfun, postfun2, putfun, deletefun} from '../../common/axiosFun'

import CompanySearch from '../../common/searchPage/companySearch'
import PersonSearch from '../../common/searchPage/personSearch'
const { IP, Department} = API



class department extends Component {
  constructor(porps){
    super(porps)
    this.state = {
      code: '',
      name: '',
      chargePersionId: '',
      chargePersion: '',
      companyCode: '',
      companyName: '',
      addComName: '',
      addPerId: '',
      addPerName: '',
      addDepName: '',
      changeComName: '',
      addCompanyCode: '',
      changePerId: '',
      changePerName: '',
      changeDepName: '',
      visible: false,
      visible1: false,
      changeShow: false,
      checkperson: false,
      perId:'',
      perName: '',
      choiceData:[
        {
          companyName: '',
          name: '',
          chargePersionId: '',
          chargePersion: ''
        }
      ],
      data: [],
      columns: [
      {
        title: '部门编号',
        dataIndex: 'code',
      }, {
        title: '部门名称',
        dataIndex: 'name',
      }, {
        title: '负责人工号',
        dataIndex: 'chargePersionId',
      }, {
        title: '负责人',
        dataIndex: 'chargePersion',
      }, {
        title: '公司编码',
        dataIndex: 'companyCode',
      }, {
        title: '所属公司',
        dataIndex: 'companyName',
      }, {
        title: '启用状态',
        dataIndex: 'state',
        render: (text, record) => {
        return (
          <Popconfirm title="是否修改?" onConfirm={() => this.handleDelete(record)}>
        <a>{text}</a>
        </Popconfirm>
        )}
      }]
    }

  }

  componentDidMount() {
    this.startData()
  }

  startData = () =>{
    let url = `${IP}${Department}`
    // console.log(url)
    getfun(url).then(res => {
      // console.log(res)
      let newArr = []
      res.content.forEach(item => {
        if(item.state === '0') {
          item.state = '未启用'
        }else{
          item.state = '已启用'
        }
        newArr.push(item)
        // console.log(newArr)
        this.setState({data: newArr})
      });
      // this.setState({data:res.content})
    }).catch(err => {
      console.log(err)
    })
  }

  upData = () =>{
    let url = `${IP}${Department}`
    // console.log(url)
    getfun(url).then(res => {
      console.log(res)
      let newArr = []
      res.content.forEach(item => {
        if(item.state === '0') {
          item.state = '未启用'
        }else{
          item.state = '已启用'
        }
        newArr.push(item)
        // console.log(newArr)
        this.setState({data: newArr})
      });
      // this.setState({data:res.content})
    }).catch(err => {
      console.log(err)
    })
  }

  searchData = () =>{
    const {code, name, chargePersionId, chargePersion, companyCode, companyName} = this.state
    console.log(this.state)
    const { IP, Department} = API
    let url = `${IP}${Department}?code=${code}&name=${name}&chargePersionId=${chargePersionId}&chargePersion=${chargePersion}&companyCode=${companyCode}&companyName=${companyName}`
    console.log(url)
    getfun(url).then(res => {
      console.log(res)
      let newArr = []
      res.content.forEach(item=> {
        if(item.state === '0') {
          item.state = '未启用'
        }else{
          item.state = '已启用'
        }
        newArr.push(item)
        // console.log(newArr)
        this.setState({data: newArr})
      });
    }).catch(err => {
      console.log(err)
    })  
  }

  handleDelete = (aa) => {
    // const data = [...this.state.data];
    // let aa = data[key-1];
    console.log(aa)
    let newState = ''
    if(aa.state === '未启用') {
      newState = '1'
    } else {
      newState = '0'
    }
    let url = `${IP}/department/${aa.id}/state/${newState}`
    // `${IP}company/${aa.id}/state/${newState}`
    console.log(url)
    putfun(url).then(res =>{
      console.log(res)
      if(res ==='success'){
        let newulr = `${IP}${Department}`
        getfun(newulr).then(res => {
          console.log(res)
          let newArr = []
          res.content.forEach(item => {
            if(item.state === '0') {
              item.state = '未启用'
            }else{
              item.state = '已启用'
            }
            newArr.push(item)
            // console.log(newArr)
            this.setState({data: newArr})
          });
          // this.setState({data:res.content})
        }).catch(err => {
          console.log(err)
        })
        this.setState({visible:false})
      }
    }).catch(err => {
      console.log(err)
    })
  }


  addDepartment = () => {
    const {addComName, addDepName, addPerId, addPerName, addCompanyCode} =this.state
    console.log(addPerName)
    const { IP} = API
    let url = `${IP}/department`
    let sendData = {
      companyName: addComName,
      companyCode: addCompanyCode,
      name: addDepName,
      parentDeptName: addPerName,
      parentDeptCode: addPerId,
      chargePersion: addPerName,   
      chargePersionId: addPerId
    }
    console.log(sendData)
    postfun2(url,sendData).then(res =>{
      console.log(res)
      if(res ==='success') {
        this.startData()
        this.setState({visible: false})
      }
    }).catch(err =>{
      console.log(err)
    })
  }

  changeDepartment = () =>{
    const {changeComName, changeDepName, changePerId, changePerName, choiceData} = this.state
    let url = `${IP}/department/${choiceData[0].id}`
    console.log(choiceData)
    let sendData = {
      companyName: changeComName === ''? choiceData[0].companyName : changeComName,
      name: changeDepName === ''? choiceData[0].name : changeDepName,
      chargePersionId: changePerId === '' ? choiceData[0].chargePersionId : changePerId,
      chargePersion: changePerName ==='' ? choiceData[0].chargePersion : changeComName,
      id: choiceData[0].id,
      isDeleted: '0'
    }
    console.log(sendData)
    putfun(url,sendData).then(res => {
      console.log(res)
      if(res === 'success'){
        this.startData()
        this.setState({visible1: false})
      }
    }).catch( err =>{
      console.log(err)
    })
  }

  deletCom = () =>{
    const {choiceData} = this.state
    console.log(choiceData)
    let newArr = []
    choiceData.forEach(item =>{
      let id = item.id
      newArr.push(id)
    })
    console.log(newArr.toString())
    let idnumber = newArr.toString()
    const { IP} = API
    let url = `${IP}/department/${idnumber}`
    console.log(url)
    deletefun(url).then(res => {
      console.log(res)
      if(res === 'success') {
        this.startData()
        this.setState({visible:false})
      }
    }).catch(err => {
      console.log(err)
    })  

  }

  choicedCompany = (item) =>{
    console.log(item)
    this.setState({addComName:item.name,addCompanyCode:item.code})
  }

  choicedPerson = (item) =>{
    console.log(item)
    this.setState({addPerId:item.code, addPerName:item.name})
  }

  render() {
    const rowSelection = {
      onChange: (selectedRowKeys,selectedRows) => {
        console.log(selectedRows);
        this.setState({choiceData:selectedRows})
      }
    }    
    return (
      <div>
        <div style={{marginBottom:20}}>
        <Row type="flex" justify="space-around" style={{marginBottom:20}}>
          <Col span="5">
          <div style={{display:'flex'}}>
              <Button type='primary' >公司名称</Button>  
              <Input value={this.state.companyName} onChange={(e) =>{this.setState({companyName:e.target.value})}} />
            </div>
          </Col>
          <Col span="5">
          <div style={{display:'flex'}}>
              <Button type='primary' >公司编码</Button>  
              <Input value={this.state.companyCode}  onChange={(e) =>{this.setState({companyCode:e.target.value})}} />
            </div>
          </Col>
          <Col span="5">
          <div style={{display:'flex'}}>
              <Button type='primary' >部门名称</Button>  
              <Input value={this.state.name}  onChange={(e) =>{this.setState({name:e.target.value})}} />
            </div>
          </Col>
        </Row>
        <Row type="flex" justify="space-around"  style={{marginBottom:20}}>
        <Col span="5">
          <div style={{display:'flex'}}>
              <Button type='primary' >部门编码</Button>  
              <Input value={this.state.code} onChange={(e) =>{this.setState({code:e.target.value})}} />
            </div>
          </Col>
          <Col span="5">
          <div style={{display:'flex'}}>
              <Button type='primary' >部门负责人</Button>  
              <Input value={this.state.chargePersionName} onChange={(e) =>{this.setState({chargePersionName:e.target.value})}} />
            </div>
          </Col>
          <Col span="5">
          <div style={{display:'flex'}}>
              <Button type='primary' >部门负责人工号</Button>  
              <Input value={this.state.chargePersionId} onChange={(e) =>{this.setState({chargePersionId:e.target.value})}} />
            </div>
          </Col>          
        </Row>
        <Row type="flex" justify="center"  style={{marginBottom:10}}>
          <Col span="5"><Button icon="reload" onClick={()=>this.setState({chargePersionId:'',chargePersionName: '',code:'', name: '', companyCode: '', companyName: ''})} type="primary">重置</Button>  <Button onClick={() =>this.searchData()} icon="search" type="primary">查询</Button></Col>
        </Row>
        </div>
        <hr/>
        <div className="comMain">
          <h3 className="comtitle">部门维护列表</h3>
          <Row type="flex" justify="end">
            <Col span="2"><Button icon="plus" onClick={()=>this.setState({visible: true})}>新增</Button></Col>
            <Col span="2"><Button icon="edit" onClick={()=>this.setState({visible1: true})}>编辑</Button></Col>
            {/* <Button span="3"><Button icon="warning">启用/禁用</Button></Button> */}
            <Col span="2"><Button icon="delete" onClick={() =>this.deletCom()}>删除</Button></Col>
          </Row>
          <Table
            style={{marginTop:20}}
            columns={this.state.columns}
            dataSource={this.state.data}
            bordered
            rowKey='code'
            rowSelection={rowSelection}
          />
          <Modal
          title="新增部门"
          visible={this.state.visible}
          onOk={() =>this.addDepartment()}
          onCancel={() =>this.setState({visible:false})}
          width={800}
          >
          <Row type="flex" justify="space-around" className="marbot">
            <Col span="8">
            <div style={{display:'flex'}}>
              <Button type='primary' >公司名称</Button>  
              {/* <Input value={this.state.addComName} onChange={(e) =>{this.setState({addComName:e.target.value})}} /> */}
              <CompanySearch  choicedCompany={this.choicedCompany}/>
            </div>
            </Col>
            <Col span="8">
            <div style={{display:'flex'}}>
              <Button type='primary' >部门名称</Button>  
              <Input value={this.state.addDepName} onChange={(e) =>{this.setState({addDepName:e.target.value})}} />
            </div>
            </Col>
          </Row>
          <PersonSearch  btnshow='负责人' choicedPerson={this.choicedPerson}/>
          <Row>
            <Col span="20">
              {/* {this.choicePerson()} */}
            </Col>
          </Row>
          </Modal>
          <Modal
          title="编辑部门"
          visible={this.state.visible1}
          onOk={() =>this.changeDepartment()}
          onCancel={() =>this.setState({visible1:false})}
          width={800}
          >
          <Row type="flex" justify="space-around" className="marbot">
            <Col span="8">
            <div style={{display:'flex'}}>
              <Button type='primary' >公司名称</Button>  
              <Input   onChange={(e) =>{this.setState({changeComName:e.target.value})}} />
            </div>
            </Col>
            <Col span="8">
            <div style={{display:'flex'}}>
              <Button type='primary' >部门名称</Button>  
              <Input  onChange={(e) =>{this.setState({changeDepName:e.target.value})}} />
            </div>
            </Col>
          </Row>
          <Row type="flex" justify="space-around" className="marbot">
            <Col span="8">
              <div style={{display:'flex'}}>
                <Button type='primary' >负责人</Button>
                <Input onChange={(e) =>{this.setState({changePerId:e.target.value})}}  style={{width:"90px"}} />
                <Input onChange={(e) =>{this.setState({changePerName:e.target.value})}} style={{width:"90px"}} />
              </div>
            </Col>
            <Col span="8"><Button type='primary'  ghost >查询</Button></Col>
          </Row>
          </Modal>
        </div>
      </div>
    )
  }

}

export default department;