import React, { Component } from 'react';
import { Row, Col, Input, Button, Table, Popconfirm, Modal, Cascader ,Select, DatePicker  } from 'antd';
import './person.css'
import {API} from '../../common/axiosAPI'
import {getfun} from '../../common/axiosFun'
const { IP, Employee} = API

const Option = Select.Option;



class Person extends Component {
  constructor(props) {
    super(props)
    this.state = {
      empCode: '',
      empName: '',
      levelName: '',
      addCompanyId: '',
      addDeptId: '',
      addName: '',
      addPhone: '',
      addJob: '',
      addpapers: '',
      addPapersNumber: '',
      addDate: '',
      addvisibl: false,
      delAddIndex: '',
      papersArr: [],
      data:[],
      columns: [
        {
          title: '工号',
          dataIndex: 'empCode',
        },
        {
          title: '姓名',
          dataIndex: 'empName',
        },
        {
          title: '公司',
          dataIndex: 'companyName',
        },
        {
          title: '部门',
          dataIndex: 'deptName',
        },
        {
          title: '职务',
          dataIndex: 'levelName',
        },
        {
          title: '入职时间',
          dataIndex: 'entryDate',
        },
        {
          title: '手机号码',
          dataIndex: 'empPhone',
        },
        {
          title: '证件类型',
          dataIndex: 'idType',
        },
        {
          title: '证件号码',
          dataIndex: 'typeValue',
        },
        {
          title: '启用状态',
          dataIndex: 'state',
          render: (text, record) => {
          return (
            <Popconfirm title="是否修改?" >
          <a>{text}</a>
          </Popconfirm>
          )}
        }
      ],
      options: [],
      jobs: [],
      addData: [],
      addcolumns: [
        {
          title: '姓名',
          dataIndex: 'empName',
        },
        {
          title: '公司',
          dataIndex: 'companyId',
        },
        {
          title: '部门',
          dataIndex: 'deptId',
        },
        {
          title: '职务',
          dataIndex: 'positionId',
        },
        {
          title: '入职时间',
          dataIndex: 'entryDate',
        },
        {
          title: '手机号码',
          dataIndex: 'empPhone',
        },
        {
          title: '证件类型',
          dataIndex: 'idType',
        },
      ]
    }
  }

  componentDidMount() {
    this.startData()
  }

  startData = () =>{
    let url = `${IP}${Employee}`
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
    const {empCode, empName, levelName} = this.state
    const { IP, Employee} = API
    let url = `${IP}${Employee}?empCode=${empCode}&empName=${empName}&levelName=${levelName}`
    getfun(url).then(res => {
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

  addPerson = () =>{
    this.setState({addvisible: true})
    const {IP, Employee} = API
    let url =`${IP}${Employee}/companyInfo`
    getfun(url).then(res => {
      // console.log(res)
      this.setState({options: res})
    }).catch(err => console.log(err))

    let newUrl =`${IP}/position/all`
    console.log(newUrl)
    getfun(newUrl).then(res => {
      // console.log(res)
      this.setState({jobs: res})
      // this.selectData()
    }).catch(err => console.log(err))

    let newUrl1 = `${IP}/sys/dictType/idType`
    getfun(newUrl1).then(res => {
      console.log(res)
      this.setState({papersArr: res})
    }).catch(err => console.log(err))
  }

  onChangeDate = (date, dateString) => {
    console.log(date._d.getTime() );
    let TIME = date._d.getTime()
    this.setState({addDate: TIME})
  }
  addPersonEnd = () =>{
    const {addData} =this.state
    console.log(addData)

  }

  delAddData = (item) =>{
    console.log(item)
    this.setState({delAddIndex: item})
  }

  delPersonData = () =>{
    const {delAddIndex, addData} = this.state
    let newArr = addData
    newArr.splice(delAddIndex,1)
    this.setState({addData: newArr})
  }

  addPersonData = () =>{
    const {addCompanyId, addDeptId, addpapers, addName, addPhone, addPapersNumber, addDate, addJob, addData} = this.state
    // let url = `${IP}${Employee}`
    let sendData = {
      companyId: addCompanyId,
      deptId: addDeptId,
      positionId: addJob,
      empName: addName,
      empPhone: addPhone,
      idType: addpapers,
      typeValue: addPapersNumber,
      entryDate: addDate
    }
    let newArr = addData
    newArr.push(sendData)
    console.log(newArr)
    this.setState({addData: newArr})
    
  }
  onChangeBm = (value) => {
    console.log(value)
    this.setState({
      addCompanyId: value[0],
      addDeptId: value[1]
    })
  }

  onChangeJob = (value) => {
    console.log(value)
    this.setState({addJob:value})
  }

  onChangeType = (value) => {
    console.log(value)
    // this.setState
  }

  choicePapers = (value) => {
    console.log(value)
    this.setState({addpapers: value})
  }


  render() {
    const {jobs, papersArr} = this.state
    const rowSelection = {
      onChange: (selectedRowKeys,selectedRows) => {
        console.log(selectedRows);
        this.setState({choiceData:selectedRows})
      }
    }  
    const cityOptions = jobs.map(city => <Option value={city.id} key={city.id}>{city.positionName}</Option>)
    const papersOptions = papersArr.map(city => <Option value={city.dictValue} key={city.id}>{city.dictKey}</Option>)
    return (
      <div>
        <Row type="flex" justify="space-around">
          <Col span="5" style={{backgroundColor:'#ccc'}}>Three</Col>
          <Col span="18" >
            <Row type="flex" justify="space-around" style={{marginBottom:20}}>
              <Col span="5">
              <div style={{display:'flex'}}>
                  <Button type='primary' >工号</Button>  
                  <Input value={this.state.empCode} onChange={(e) =>{this.setState({empCode:e.target.value})}}  />
                </div>
              </Col>
              <Col span="5">
              <div style={{display:'flex'}}>
                  <Button type='primary' >姓名</Button>  
                  <Input value={this.state.empName} onChange={(e) =>{this.setState({empName:e.target.value})}}  />
                </div>
              </Col>
              <Col span="5">
              <div style={{display:'flex'}}>
                  <Button type='primary' >职务</Button>  
                  <Input value={this.state.levelName} onChange={(e) =>{this.setState({levelName:e.target.value})}}  />
                </div>
              </Col>
            </Row>
            <Row type="flex" justify="center"  style={{marginBottom:10}}>
              <Col span="5"><Button icon="reload" onClick={()=>this.setState({empCode:'',empName:'',levelName: ''})}  type="primary">重置</Button>  <Button  icon="search" onClick={() =>this.searchData()} type="primary">查询</Button></Col>
            </Row>
            <hr />
            <div className="comMain">
              <h3 className="comtitle">人员维护列表</h3>
                <Row type="flex" justify='space-end'>
                  <Col span="3"><Button icon="plus" onClick={() =>this.addPerson()} >新增</Button></Col>
                  <Col span="3"><Button icon="edit">编辑</Button></Col>
                  {/* <Button span="3"><Button icon="warning">启用/禁用</Button></Button> */}
                  <Col span="3"><Button icon="delete">删除</Button></Col>
                </Row>
                <Table
                  style={{marginTop:20}}
                  columns={this.state.columns}
                  dataSource={this.state.data}
                  bordered
                  rowSelection={rowSelection}
                />
            </div>
            <Modal
              title="新增人员"
              visible={this.state.addvisible}
              onOk={() =>this.addPersonEnd()}
              onCancel={() =>this.setState({addvisible:false})}
              width={800}
              >
              <Row type="flex" justify="space-around" style={{marginBottom:20}}>
                <Col span="10">
                  <div style={{display:'flex'}}>
                    <Button type='primary' >选择公司部门</Button>  
                    <Cascader  options={this.state.options} onChange={this.onChangeBm} />
                  </div>
                </Col>
                <Col span="10">
                  <div style={{display:'flex'}}>
                    <Button type='primary' >选择职务</Button>  
                    <Select  style={{ width: 120 }} onChange={this.onChangeJob}>
                     {cityOptions}
                    </Select>
                  </div>
                </Col>
              </Row>
              <Row type="flex" justify="space-around" style={{marginBottom:20}}>
                <Col span='10'>
                  <div style={{display:'flex'}}>
                    <Button type='primary' >姓名</Button>  
                    <Input   onChange={(e) =>{this.setState({addName:e.target.value})}} />
                  </div>
                </Col>
                <Col span='10'>
                  <div style={{display:'flex'}}>
                    <Button type='primary' >手机号码</Button>  
                    <Input  onChange={(e) =>{this.setState({addPhone:e.target.value})}} />
                  </div>
                </Col>
              </Row>
              <Row type="flex" justify="space-around" style={{marginBottom:20}}>
                <Col span='10'>
                  <div style={{display:'flex'}}>
                    <Button type='primary' >证件类型</Button>  
                    <Select  style={{ width: 120 }} onChange={this.choicePapers}>
                      {papersOptions}
                    </Select>
                  </div>
                </Col>
                <Col span='10'>
                  <div style={{display:'flex'}}>
                    <Button type='primary' >证件号码</Button>  
                    <Input  onChange={(e) =>{this.setState({addPapersNumber:e.target.value})}} />
                  </div>
                </Col>
              </Row>
              <Row type="flex" justify="space-around" style={{marginBottom:20}}>
                <Col span='10'>
                  <div style={{display:'flex'}}>
                    <Button type='primary' >入职时间</Button>  
                    <DatePicker  onChange={this.onChangeDate} />
                  </div>
                </Col>
                <Col span='10'>
                  <div style={{display:'flex'}}>
                    <Button type='primary' onClick={this.addPersonData}  style={{marginRight:20}}>添加</Button>  
                    <Button type="default" onClick={this.delPersonData}>删除</Button>
                  </div>
                </Col>
              </Row>
              <Row type="flex" justify="space-around" >
                <Table
                  columns={this.state.addcolumns}
                  dataSource={this.state.addData}
                  bordered
                  size='middle'
                  onRow = {(record, index) =>{
                    return {
                      onClick: () =>{
                        this.delAddData(index)
                      }
                    }
                  }}
                />
              </Row>
            </Modal>
          </Col>
        </Row>  
      </div>
    )
  }
}


export default Person;

