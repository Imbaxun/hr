
import React, { Component } from 'react';
import { Row, Col,  Input, Button,Modal, Table} from 'antd';
import './userRoleManager.css'

import{ getfun, postfun, deletefun} from '../../common/axiosFun'
import {API} from '../../common/axiosAPI'
// import PersonSearch from '../../common/searchPage/personSearch'

const { IP, userRole} = API
class userRoleManager extends Component {

  constructor(props){
    super(props)
    this.state ={
      columns1:[
        {
          title: '角色名称',
          dataIndex: 'roleName',
        },
        {
          title: '角色值',
          dataIndex: 'roleDesc',
        },
      ],
      data1:[],
      columns2:[
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
      data2:[],
      columns3:[
        {
          title: '员工编号',
          dataIndex: 'empCode',
        },
        {
          title: '员工姓名',
          dataIndex: 'empName',
        },
      ],
      data3:[],
      columns4:[
        {
          title: '员工编号',
          dataIndex: 'empCode',
        },
        {
          title: '员工姓名',
          dataIndex: 'empName',
        },
      ],
      data4:[],
      columns5:[
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
      data5:[],
      totalLength1:'',
      visible1: false,
      totalLength2:'',
      visible2: false,
      totalLength3:'',
      visible3: false,
      totalLength4:'',
      totalLength5:'',
      roleDesc: '',
      roleName: '',
      empCode: '',
      roleId: '',
      choiceUserId: '',
      deluserId: '',
      addpermissionName: '',
      addpermissionValue: '',
      addpermissionDesc: '',
      choicepermission: ''
    }
  }

  componentDidMount(){
    this.getstart()
  }

  getstart =() =>{
    let url = `${IP}${userRole}`
    console.log(url)
    getfun(url).then(res =>{
      this.setState({data1:res.content,totalLength1:res.totalElements})
    }).catch(err =>console.log(err))
  }

  changePage1 = (page, pageSize) =>{

    let url =`${IP}${userRole}?page=${page-1}&size=${pageSize}`
    getfun(url).then(res =>{
      this.setState({data1: res.content,totalLength1:res.totalElements})
    }).catch(err =>console.log(err))

  }
  changePage2 = (page, pageSize) =>{

    let url =`${IP}${userRole}/permission?page=${page-1}&size=${pageSize}`
    getfun(url).then(res =>{
      this.setState({data2: res.content,totalLength2:res.totalElements})
    }).catch(err =>console.log(err))

  }

  changePage2 = (page, pageSize) =>{

    let url =`${IP}${userRole}/user?page=${page-1}&size=${pageSize}`
    getfun(url).then(res =>{
      this.setState({data3: res.content,totalLength3:res.totalElements})
    }).catch(err =>console.log(err))

  }
  changePage4 = (page, pageSize) =>{
    const{roleId} = this.state
    let url =`${IP}${userRole}/select/user/${roleId}?page=${page-1}&size=${pageSize}`
    getfun(url).then(res =>{
      this.setState({data4: res.content,totalLength4:res.totalElements})
    }).catch(err =>console.log(err))

  }


  choiceTable1 = (item, index) =>{
    console.log(item)
    this.setState({roleId : item.id})
    let url = `${IP}${userRole}/permission/${item.id}`
    getfun(url).then(res =>{
      this.setState({
        data2: res.content,totalLength2:res.totalElements
      })
    }).catch(err =>console.log(err))

    let url1 = `${IP}${userRole}/user/${item.id}`
    getfun(url1).then(res =>{
      this.setState({
        data3: res.content,totalLength3:res.totalElements
      })
    }).catch(err =>console.log(err))
  }

  choiceTable3 = (item, index) =>{
    console.log(item)
    this.setState({deluserId: item.userRoleId})
  }

  searchTable3 = () =>{
    const{roleId} =this.state
    let url1 = `${IP}${userRole}/user/${roleId}`
    getfun(url1).then(res =>{
      this.setState({
        data3: res.content,totalLength3:res.totalElements
      })
    }).catch(err =>console.log(err))
  }

  inputChange(key, val) {
    let tmpObj = {}
    tmpObj[key] = val
    this.setState(tmpObj)
  }

  handleOk1 =() =>{
    const{roleDesc, roleName}=this.state
    let sendData ={
      roleDesc,
      roleName
    }
    let url = `${IP}${userRole}`
    postfun(url, sendData).then(res =>{
      if(res.code === 200){
        this.setState({visible1:false})
        this.getstart()
      }
    }).catch(err =>console.log(err))
  }



  choicedPerson = (item) =>{
    console.log(item)
  }

  adduser = () =>{
    this.setState({visible3:true})
    const {roleId} = this.state
    let url = `${IP}${userRole}/select/user/${roleId}`
    getfun(url).then(res =>{
      this.setState({
        data4: res.content,totalLength4:res.totalElements
      })
    }).catch(err =>console.log(err))
  }

  deletuser = () =>{
    const {deluserId} = this.state
    let url = `${IP}/sys/userRole/${deluserId}`
    console.log(url)
    deletefun(url).then(res =>{
      if(res.code === 200) {
        this.searchTable3()
      }
    }).catch(err =>console.log(err))
  }

  deletpermission = () =>{
    const {choicepermission, roleId} = this.state
    let url = `${IP}/sys/rolePermission/${choicepermission}`
    console.log(url)
    deletefun(url).then(res =>{
      if(res.code === 200) {
        let url1 = `${IP}${userRole}/permission/${roleId}`
        getfun(url1).then(res =>{
          this.setState({
            data2: res.content,totalLength2:res.totalElements
          })
        }).catch(err =>console.log(err))
      }
    }).catch(err =>console.log(err))
  }

  choiceTable4 = (item, index) =>{
    console.log(item)
    this.setState({choiceUserId:item.id})
  }

  choiceTable2 = (item, index) =>{
    console.log(item)
    this.setState({choicepermission:item.rolePermissionId})
  }


  choiceTable5 = (item, index) =>{
    console.log(item)
    const {roleId} = this.state
    let sendData = {
      roleId,
      permissionId: item.id
    }
    let url = `${IP}/sys/rolePermission`
    postfun(url, sendData).then(res =>{
      if(res.code === 200){
        this.setState({visible2:false})
        let url1 = `${IP}${userRole}/permission/${roleId}`
        getfun(url1).then(res =>{
          this.setState({
            data2: res.content,totalLength2:res.totalElements
          })
        }).catch(err =>console.log(err))

      }
    }).catch(err =>console.log(err))
  }

  handleOk3 = () =>{
    const{roleId,choiceUserId} = this.state
    let sendData = {
      roleId,
      userId:choiceUserId
    }
    let url =`${IP}/sys/userRole`
    postfun(url, sendData).then(res =>{
      if(res.code === 200){
        this.setState({visible3:false})
        this.searchTable3()
      }
    }).catch(err =>console.log(err))
  }

  addpermission = () =>{
    this.setState({visible2:true})
    const {roleId} =this.state
    let url =`${IP}/sys/role/select/permission/${roleId}`
    getfun(url).then(res =>{
      this.setState({
        data5: res.content,totalLength5:res.totalElements
      })
    }).catch(err =>console.log(err))
  }

  render() {
    return(
      <div className="comMain">
          <h3 className="comtitle">人员角色管理</h3>
          <Row type="flex" justify="space-around"  style={{marginTop: 30}}>
            <Col span="6">
              <Row>
                <Col>
                  <h3>角色表</h3>
                </Col>
              </Row>
              <Row >
                <Col>
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
                onRow = {(record, index) =>{
                  return {
                    onClick: () =>{
                      this.choiceTable1(record,index)
                    }
                  }
                }}              
              ></Table>
            </Col>
            <Col span='8'>
            <Row>
                <Col>
                  <h3>权限表</h3>
                </Col>
              </Row>
              <Row >
                <Col span="5">
                  <Button type='primary' onClick={this.addpermission}>新增</Button>
                </Col>
                <Col span="5">
                  <Button type='primary' onClick={this.deletpermission}>删除</Button>
                </Col>
              </Row>
              <Table 
                style={{marginTop:20}}
                columns={this.state.columns2}
                dataSource={this.state.data2}
                bordered
                rowKey="id"
                pagination={{  // 分页
                  simple: false,
                  pageSize: 10 ,
                  total: this.state.totalLength2,
                  onChange: this.changePage2,
                }}
                onRow = {(record, index) =>{
                  return {
                    onClick: () =>{
                      this.choiceTable2(record,index)
                    }
                  }
                }}              
              ></Table>
            </Col>
            <Col span='8'>
            <Row>
                <Col>
                  <h3>人员表</h3>
                </Col>
              </Row>
              <Row >
                <Col span="5">
                  <Button type='primary' onClick={this.adduser}>新增</Button>
                </Col>
                <Col span="5">
                  <Button type='primary' onClick={this.deletuser}>删除</Button>
                </Col>
              </Row>
              <Table 
                style={{marginTop:20}}
                columns={this.state.columns3}
                dataSource={this.state.data3}
                bordered
                rowKey="userRoleId"
                pagination={{  // 分页
                  simple: false,
                  pageSize: 10 ,
                  total: this.state.totalLength3,
                  onChange: this.changePage3,
                }}
                onRow = {(record, index) =>{
                  return {
                    onClick: () =>{
                      this.choiceTable3(record,index)
                    }
                  }
                }}              
              ></Table>
            </Col>
          </Row>
          <Modal
            title="新增角色"
            visible={this.state.visible1}
            onOk={this.handleOk1}
            onCancel={() =>{this.setState({visible1: false})}}
          >
            <Row>
              <Col>
                <div style={{display:'flex'}}>
                  <Button type="primary">roleName</Button>
                  <Input onChange={e => this.inputChange('roleName', e.target.value)} />
                </div>
                <div style={{display:'flex',marginTop:20}}>
                  <Button type="primary">roleDesc</Button>
                  <Input onChange={e => this.inputChange('roleDesc', e.target.value)} />
                </div>
              </Col>
            </Row>
          </Modal>
          <Modal
            title="新增权限"
            visible={this.state.visible2}
            onOk={this.handleOk2}
            onCancel={() =>{this.setState({visible2: false})}}
          >
            
            <Table
              columns={this.state.columns5}
              dataSource={this.state.data5}
              bordered
              rowKey="id"
              pagination={{  // 分页
                simple: false,
                pageSize: 10 ,
                total: this.state.totalLength5,
                onChange: this.changePage5,
              }}
              onRow = {(record, index) =>{
                return {
                  onClick: () =>{
                    this.choiceTable5(record,index)
                  }
                }
              }} 
            >

            </Table>
          </Modal>
          <Modal
            title="新增角色"
            style={{width:400}}
            visible={this.state.visible3}
            onOk={this.handleOk3}
            onCancel={() =>{this.setState({visible3: false})}}
          >
            <Row>
              <Col>
                <div style={{display:'flex', marginBottom:10}}>
                <Button type='primary'>工号</Button>
                <Input  onChange={e => this.inputChange('empCode', e.target.value)}/>
                </div>

              </Col>
            </Row>
            <Table
              columns={this.state.columns4}
              dataSource={this.state.data4}
              bordered
              rowKey="id"
              pagination={{  // 分页
                simple: false,
                pageSize: 10 ,
                total: this.state.totalLength4,
                onChange: this.changePage4,
              }}
              onRow = {(record, index) =>{
                return {
                  onClick: () =>{
                    this.choiceTable4(record,index)
                  }
                }
              }} 
            ></Table>
          </Modal>
      </div>
    )
  }
}


export default userRoleManager;