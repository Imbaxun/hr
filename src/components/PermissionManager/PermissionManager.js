import React, { Component } from 'react'
import { Row, Col, Input, Button,Modal, Table} from 'antd';

import{ getfun, postfun} from '../../common/axiosFun'

import {API} from '../../common/axiosAPI'

const { IP, permissionManagerUrl} = API

class  PermissionManager extends Component {
  constructor(props){
    super(props)
    this.state = {
      permissionName: '',
      permissionValue: '',
      permissionDesc: '',
      addpermissionName: '',
      addpermissionValue: '',
      addpermissionDesc: '',
      columns1: [
        {
          title: '权限描述',
          dataIndex: 'permissionDesc',
        },
        {
          title: '权限名称',
          dataIndex: 'permissionName',
        },
        {
          title: '权限值',
          dataIndex: 'permissionValue',
        },
      ],
      data1: [],
      totalLength1: '',
      visible1:false
    }
  }


  componentDidMount() {
    this.start()
  }

  start = () =>{
    let url = `${IP}${permissionManagerUrl}`
    console.log(url)
    getfun(url).then(res =>this.setState({data1:res.content,totalLength1:res.totalElements})).catch(err =>console.log(err))
  }

  inputChange(key, val) {
    let tmpObj = {}
    tmpObj[key] = val
    this.setState(tmpObj)
  }

  changePage1 = (page, pageSize) =>{
    let url =`${IP}${permissionManagerUrl}?page=${page-1}&size=${pageSize}`
    getfun(url).then(res =>{
      this.setState({data1: res.content,totalLength1:res.totalElements})
    }).catch(err =>console.log(err))
  }

  searchData = () =>{
    const{permissionName,permissionValue,permissionDesc } = this.state
    let url = `${IP}${permissionManagerUrl}?permissionName=${permissionName}&permissionValue=${permissionValue}&permissionDesc=${permissionDesc}`
    getfun(url).then(res =>this.setState({data1:res.content,totalLength1:res.totalElements})).catch(err =>console.log(err)) 
  }

  handleOk1 = () =>{
    const{addpermissionName,addpermissionValue,addpermissionDesc } = this.state
    let url = `${IP}${permissionManagerUrl}`
    let sendData = {
      permissionName: addpermissionName,
      permissionValue: addpermissionValue,
      permissionDesc:addpermissionDesc,
    }
    postfun(url,sendData).then(res =>{
      if(res.code === 200){
        this.setState({visible1:false})
        this.start()
      }
    }).catch(err =>console.log(err))
  }

  render() {
    return(
      <div>
        <div className="comMain">
          <h3 className="comtitle">权限管理</h3>
          <Row type="flex" justify="space-around"  style={{marginTop: 30}}>
            <Col span='4'>
              <div style={{display:'flex', marginBottom:10}}>
                <Button type='primary'>权限名称</Button>
                <Input  onChange={e => this.inputChange('permissionName', e.target.value)}/>
              </div>
            </Col>
            <Col span='4'>
              <div style={{display:'flex', marginBottom:10}}>
                <Button type='primary'>权限值</Button>
                <Input  onChange={e => this.inputChange('permissionValue', e.target.value)}/>
              </div>
            </Col>
            <Col span='4'>
              <div style={{display:'flex', marginBottom:10}}>
                <Button type='primary'>权限描述</Button>
                <Input  onChange={e => this.inputChange('permissionDesc', e.target.value)}/>
              </div>
            </Col>
            <Col span='3'>
              <Button type='primary' onClick={this.searchData}>查询</Button>
            </Col>
            <Col span='3'>
              <Button type='primary' onClick={() =>this.setState({visible1:true})}>新增</Button>
            </Col>
          </Row>
          <Table
            style={{marginTop:20}}
            columns={this.state.columns1}
            dataSource={this.state.data1}
            bordered
            rowKey="id"
            pagination={{  // 分页
              simple: false,
              pageSize: 10 ,
              total: this.state.totalLength1,
              onChange: this.changePage1,
            }}
            // onRow = {(record, index) =>{
            //   return {
            //     onClick: () =>{
            //       this.choiceTable1(record,index)
            //     }
            //   }
            // }}  
          ></Table>
        </div>
        <Modal
            title="新增权限"
            visible={this.state.visible1}
            onOk={this.handleOk1}
            onCancel={() =>{this.setState({visible1: false})}}
          >
            
            <div style={{display:'flex'}}>
              <Button type="primary">权限名称</Button>
              <Input onChange={e => this.inputChange('addpermissionName', e.target.value)} />
            </div>
            <div style={{display:'flex',marginTop:20}}>
              <Button type="primary">权限描述</Button>
              <Input onChange={e => this.inputChange('addpermissionDesc', e.target.value)} />
            </div>
            <div style={{display:'flex',marginTop:20}}>
              <Button type="primary">权限值</Button>
              <Input onChange={e => this.inputChange('addpermissionValue', e.target.value)} />
            </div>
          </Modal>
      </div>
    )
  }
}


export default PermissionManager;