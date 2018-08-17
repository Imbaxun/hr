import React, { Component } from 'react';
import { Row, Col, Input, Button, Table, Popconfirm ,Modal } from 'antd';
import './shop.css'
import {API} from '../../common/axiosAPI'
import {getfun, postfun2, putfun, deletefun} from '../../common/axiosFun'
import CompanyThree from '../../common/companyThree'
const { IP, Store} = API

class Shop extends Component {

  constructor(props) {
    super(props)
    this.state = {
      code: '',
      name: '',
      // choiceId: '',
      choiceData: {},
      visible: false,
      visible1: false,
      addArea: '',
      addName:'',
      addCoordinate: '',
      changeName:'',
      changeCoordinate: '',
      selectData: '',
      depData: '',
      changeArea: '',
      columns:[
        {
          title: '门店编码',
          dataIndex: 'code',
        },
        {
          title: '门店名称',
          dataIndex: 'name',
        },
        {
          title: '经纬度',
          dataIndex: 'coordinate',
        },
        {
          title: '启用状态',
          dataIndex: 'state',
          render: (text, record) => {
          return (
            <Popconfirm title="是否修改?" onConfirm={() => this.handleDelete(record)}>
          <a>{text}</a>
          </Popconfirm>
          )}
        }
      ],
      data: []
    }
  }


  componentDidMount() {
    this.startData()
  }

  startData = () =>{
    let url = `${IP}${Store}/search`
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

  searchData = () =>{
    const {name, code} = this.state
    const { IP, Store} = API
    let url = `${IP}${Store}/search?code=${code}&name=${name}`
    getfun(url).then(res => {
      // console.log(res)
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
    }).catch(err => console.log(err))

  }

  addShop = () =>{
    const {addCoordinate, addName,addArea, depData} = this.state
    let url = `${IP}${Store}`
    let sendData = {
      coordinate: addCoordinate,
      name: addName,
      departmentId: depData.id,
      area: addArea
    }
    postfun2(url, sendData).then(res =>{
      console.log(res)
      this.startData()
      this.setState({visible: false})
    }).catch(err => console.log(err))
  }

  choiceShop = (item, index) =>{
    console.log(item)
    this.setState({choiceData: item})
    console.log(index)
  }


  changeShop = () =>{
    const {changeCoordinate, changeName, choiceData,depData, changeArea} = this.state
    let choiceId = choiceData.id
    let url =`${IP}${Store}/${choiceId}`
    console.log(choiceData)
    let sendData = {
      coordinate: changeCoordinate,
      name: changeName,
      departmentId: depData.id,
      id:choiceId,
      area: changeArea,
      code: choiceData.code,
      createTime: choiceData.createTime,
      isDeleted: choiceData.isDeleted,
      sort: choiceData.sort,
      state: choiceData.state,
      updateTime: choiceData.updateTime
    }
    console.log(sendData)
    putfun(url, sendData).then(res =>{
      console.log(res)
      if(res === 'success'){
        this.startData()
        this.setState({visible1: false})
      }
    }).catch(err => console.log(err))
  }

  deletChoice = () =>{
    const {choiceData} = this.state
    let choiceId = choiceData.id
    let url = `${IP}${Store}/${choiceId}`
    deletefun(url).then(res =>{
      console.log(res)
      this.startData()
    }).catch(err => console.log(err))
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
    let url = `${IP}/store/${aa.id}/state/${newState}`
    // `${IP}company/${aa.id}/state/${newState}`
    console.log(url)
    putfun(url).then(res =>{
      console.log(res)
      if(res ==='success'){
        this.startData()
      }
    }).catch(err => {
      console.log(err)
    })
  }
  //树桩查询的方法
  getThreeData = (item) =>{
    console.log(item)
    this.setState({selectData: item})
    //点击查询的url
    let searchUrl = `${IP}/employee?${item}`
    getfun(searchUrl).then(res =>{
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
    }).catch(err => console.log(err))
  }
  addShopStart = () =>{
    const{selectData} = this.state
    let aa=selectData.substring(0,1)
    if(aa ==='d'){
      this.setState({visible:true})
      let url= `${IP}/department/${selectData.substr(7)}`
      console.log(url)
      getfun(url).then(res =>this.setState({depData:res})).catch(err =>console.log(err))
    }else{
      alert('请选择正确部门添加')
    }
  }


  render () {
    const rowSelection = {
      onChange: (selectedRowKeys, selectedRows) => {
        console.log(`selectedRowKeys: ${selectedRowKeys}`, 'selectedRows: ', selectedRows);
      }
    }
    return (
      <div>
        <Row type="flex" justify="space-around">
          <Col span="5">
            <CompanyThree getThreeData= {this.getThreeData}/>
          </Col>
          <Col span="18" >
          <Row type="flex" justify="space-around" style={{marginBottom:20}}>
            <Col span="5">
            <div style={{display:'flex'}}>
                <Button type='primary' >门店编码</Button>  
                <Input value={this.state.code} onChange={(e) =>{this.setState({code:e.target.value})}}  />
              </div>
            </Col>
            <Col span="5">
            <div style={{display:'flex'}}>
                <Button type='primary' >门店名称</Button>  
                <Input value={this.state.name} onChange={(e) =>{this.setState({name:e.target.value})}}  />
              </div>
            </Col>
          </Row>
            <Row type="flex" justify="center"  style={{marginBottom:10}}>
            <Col span="5">
            <Button>去组织架构</Button>
            </Col>
            <Col span='5'>
            <Button icon="reload" onClick={()=>this.setState({code:'',name:''})}  type="primary">重置</Button>  
            </Col>
            <Col span="5">
            <Button  icon="search" onClick={() =>this.searchData()} type="primary">查询</Button>
            </Col>
          </Row>
          <hr />
            <div className="comMain">
              <h3 className="comtitle">门店维护列表</h3>
                <Row type="flex" justify='space-end'>
                  <Col span="3"><Button icon="plus" onClick={this.addShopStart} >新增</Button></Col>
                  <Col span="3"><Button icon="edit" onClick={() =>this.setState({visible1: true})}>编辑</Button></Col>
                  {/* <Button span="3"><Button icon="warning">启用/禁用</Button></Button> */}
                  <Col span="3"><Button icon="delete" onClick={this.deletChoice}>删除</Button></Col>
                </Row>
                <Table
                  style={{marginTop:20}}
                  columns={this.state.columns}
                  dataSource={this.state.data}
                  bordered
                  rowSelection={rowSelection}
                  rowKey="id"
                  onRow = {(record, index) =>{
                    return {
                      onClick: () =>{
                        this.choiceShop(record,index)
                      }
                    }
                  }}
                />
            </div>
          </Col>
        </Row>
        <Modal
          title="新增门店"
          visible={this.state.visible}
          onOk={() =>this.addShop()}
          onCancel={() =>this.setState({visible:false})}
          width={800}
          >
          <Row type="flex" justify="space-around" className="marbot">
            <Col span="8">
              <div style={{display:'flex'}}>
                <Button type='primary' >门店名称</Button>
                <Input  onChange={(e) =>{this.setState({addName:e.target.value})}} style={{width:"300px"}} />
              </div>
            </Col>
            <Col span="8">
            <div style={{display:'flex'}}>
                <Button type='primary' >经纬度</Button>
                <Input  onChange={(e) =>{this.setState({addCoordinate:e.target.value})}} style={{width:"300px"}} />
              </div>
            </Col>
          </Row>
          <Row  type="flex" justify="space-around"className="marbot">
          <Col span="8">
          <div style={{display:'flex'}}>
                <Button type='primary' >部门名称</Button>
                <Input value={this.state.depData.name} readOnly style={{width:"300px"}} />
              </div>
          </Col>
          <Col span="8">
          <div style={{display:'flex'}}>
                <Button type='primary' >部门账号</Button>
                <Input value={this.state.depData.code} readOnly style={{width:"300px"}} />
              </div>
          </Col>
          </Row>
          <Row  type="flex" justify="space-around"className="marbot">
            <Col span="8">
            <div style={{display:'flex'}}>
            <Button type='primary' >区域</Button>
            <Input onChange={(e) =>{this.setState({addArea:e.target.value})}} style={{width:"300px"}} />
            </div>
            </Col>
            <Col span='8'></Col>
          </Row>
        
          </Modal>
          <Modal
          title="编辑门店"
          visible={this.state.visible1}
          onOk={() =>this.changeShop()}
          onCancel={() =>this.setState({visible1:false})}
          width={800}
          >
          <Row type="flex" justify="space-around" className="marbot">
            <Col span="8">
              <div style={{display:'flex'}}>
                <Button type='primary' >门店名称</Button>
                <Input  onChange={(e) =>{this.setState({changeName:e.target.value})}} style={{width:"300px"}} />
              </div>
            </Col>
            <Col span="8">
            <div style={{display:'flex'}}>
                <Button type='primary' >经纬度</Button>
                <Input  onChange={(e) =>{this.setState({changeCoordinate:e.target.value})}} style={{width:"300px"}} />
              </div>
            </Col>
          </Row>
          <Row  type="flex" justify="space-around"className="marbot">
          <Col span="8">
          <div style={{display:'flex'}}>
                <Button type='primary' >部门名称</Button>
                <Input value={this.state.depData.name} readOnly style={{width:"300px"}} />
              </div>
          </Col>
          <Col span="8">
          <div style={{display:'flex'}}>
                <Button type='primary' >部门账号</Button>
                <Input value={this.state.depData.code} readOnly style={{width:"300px"}} />
              </div>
          </Col>
          </Row>
          <Row  type="flex" justify="space-around"className="marbot">
            <Col span="8">
            <div style={{display:'flex'}}>
            <Button type='primary' >区域</Button>
            <Input onChange={(e) =>{this.setState({changeArea:e.target.value})}} style={{width:"300px"}} />
            </div>
            </Col>
            <Col span='8'></Col>
          </Row>
          </Modal>
      </div>
    )
  }

}

export default Shop;