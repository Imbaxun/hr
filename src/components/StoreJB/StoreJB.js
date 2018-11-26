import React, { Component } from 'react';
import {Row, Col,Input, Button, Table,DatePicker,Modal, Select } from 'antd'
import './StoreJB.css'
import { getfun } from '../../common/axiosFun'
import { API } from '../../common/axiosAPI'
const { IP, Employee ,KQIp, processViewUrl} = API

const Option = Select.Option;
const {RangePicker} = DatePicker

class StoreJB extends Component {
  constructor(props){
    super(props)
    this.state = {
      visible:false,
      code: '',
      aname: '',
      Scode: '',
      Snaem: '',
      data:[],
      columns: [
        {
          title: '姓名',
          dataIndex: 'empName',
        },
        {
          title: '工号',
          dataIndex: 'empCode',
        },
        {
          title: '部门',
          dataIndex: 'deptName',
        },
        {
          title: '公司',
          dataIndex: 'companyName',
        },
      ],
      totalElements: '',
      data1: [],
      columns1: [
        {
          title: '表单名称',
          dataIndex: 'flowName',
        },
        {
          title: '单号',
          dataIndex: 'flowId',
        },
        {
          title: '发起者',
          dataIndex: 'proposer',
        },
        {
          title: '流程状态',
          dataIndex: 'state',
        },
        {
          title: '当前审批节点',
          dataIndex: 'taskName',
        },
        {
          title: '当前审批人',
          dataIndex: 'currentAuditUserName',
        },
        {
          title: '发起日期',
          dataIndex: 'submissionDate',
        },
      ],
      submissionDateStart: '',
      submissionDateEnd: '',
      proposerId: '',
      stateVal: '',
    }
  }

  componentDidMount(){
    this.start()
  }

  start = () =>{
    let url = `${KQIp}${processViewUrl}?flowName=加班申请单`
    // url = `${KQIp}/AppOASystem/appSwingCard/getAppSwingCardByFlowId.do`
    getfun(url).then(res =>{
      this.setState({
        data1: res.content,
        totalElements: res.totalElements
      })
    }).catch(err =>console.log(err))
  }

  searchPeople = () =>{
    const {Scode, Snaem} = this.state
    let url = `${IP}${Employee}?empName=${Snaem}&empCode=${Scode}`
    getfun(url).then(res => this.setState({data:res.content})).catch(err => console.log(err))
  }

 handleChange = (value) =>{
    console.log(`selected ${value}`);
    this.setState({stateVal : value})
  }

  choiceDate = (date, dateString) =>{
    console.log(dateString)
    this.setState({submissionDateStart: dateString[0], submissionDateEnd: dateString[1] })
  }

  serchData = () =>{
    const{code, submissionDateStart, submissionDateEnd, stateVal} = this.state
    let url = `${KQIp}${processViewUrl}?proposerId=${code}&submissionDateStart=${submissionDateStart}&submissionDateEnd=${submissionDateEnd}&state=${stateVal}&flowName=加班申请单`
    getfun(url).then(res => this.setState({data1:res.content, totalElements: res.totalElements})).catch(err => console.log(err))
  }

  changePage = (page, pageSize) =>{
    const {code, submissionDateStart, submissionDateEnd, stateVal} =this.state
    let url =`${KQIp}${processViewUrl}?page=${page}&pageSize=${pageSize}&proposerId=${code}&submissionDateStart=${submissionDateStart}&submissionDateEnd=${submissionDateEnd}&state=${stateVal}&flowName=加班申请单`
    getfun(url).then(res => {
      console.log(666)
      this.setState({data1:res.content, totalElements: res.totalElements})   
    }).catch(err =>console.log(err.message))
  }

  toProcessContent = (url, flowId, flowCode) =>{
    console.log(url)
    window.sessionStorage.setItem('flowUrl',JSON.stringify(url))
    window.sessionStorage.setItem('flowCode',JSON.stringify(flowCode))
    this.props.history.push(flowId);
  }

  toMainProcess = (item) =>{
    console.log(item)
    let url = ''
    switch (item.flowName){
      case '补刷卡申请单':
      url = `${KQIp}/AppOASystem/appSwingCard/getAppSwingCardByFlowId.do?flowId=${item.flowId}`
      this.toProcessContent(url, 'BSKProcess', item.flowId)
      break;
      case '请假申请单':
      url = `${KQIp}/AppOASystem/askingForLeave/getTAskingForLeaveByFlowId.do?flowId=${item.flowId}`
      this.toProcessContent(url, 'QJProcess', item.flowId)
      break;
      case '销假申请单':
      url = `${KQIp}/AppOASystem/appCancelLeave/getAppCancelLeaveByFlowId.do?flowId=${item.flowId}`
      this.toProcessContent(url, 'XJProcess', item.flowId)
      break;
      case '加班申请单':
      url = `${KQIp}/AppOASystem/appOvertimeApply/getAppOvertimeApplyByFlowId.do?flowId=${item.flowId}`
      this.toProcessContent(url, 'JBProcess', item.flowId)
      break;
      default:
      alert('选中表单类型不明确')
    }
  }


  render() {
    return(
      <div>
        <h3 className="comtitle">门店考勤加班</h3>
        <Row type="flex" justify="space-around"  style={{marginTop: 30}}>
        <Col span='8'>
            <div style={{display:'flex'}}>
              <Button type='primary'>人员</Button>
              <Input value={this.state.code} readOnly style={{ width:100}}  />
              <Input value={this.state.aname} readOnly style={{ width:150, marginRight:10}} />
              <Button onClick={() => this.setState({visible:true})}>查询</Button>
            </div>
          </Col>
            <Col span='6'>
              <div style={{display:'flex'}}>
              <Button type='primary'>流程状态</Button>
              <Select  style={{ width: 120 }} onChange={this.handleChange}>
                <Option value="审核中">审核中</Option>
                <Option value="已审核">已审核</Option>
                <Option value="申请被终止" >申请被终止</Option>
              </Select>
              </div>
            </Col>
            <Col span='4'>
            <RangePicker onChange={this.choiceDate} />
            </Col>
            <Col span='4'>
            <Button type='primary' onClick={this.serchData}>查询</Button>
            </Col>
          </Row>
          <hr/>
          <Table
            style={{marginTop:20}}
            columns={this.state.columns1}
            dataSource={this.state.data1}
            bordered
            rowKey='flowId'
            pagination={{  // 分页
              simple: false,
              pageSize: 10 ,
              current: this.state.current,
              total: this.state.totalElements,
              onChange: this.changePage,
            }}
            onRow={(record) => {
              return {
                onClick: () => {
                  this.toMainProcess(record)
                },     
              };
            }}
          />
          <Modal
        title="人员查询"
        visible={this.state.visible}
        onOk={() =>this.setState({visible:false})}
        onCancel={() =>this.setState({visible:false})}
        width={800}
        >
          <div style={{display:'flex'}}>
              <Button type='primary'>工号</Button>
              <Input onChange={(e) => { this.setState({ Scode: e.target.value}) }}  style={{ width:200}}  />
              <Button type='primary'>姓名</Button>
              <Input onChange={(e) => { this.setState({ Snaem: e.target.value}) }}  style={{ width:200, marginRight:10}} />
              <Button onClick={this.searchPeople}>查询</Button>
          </div>
          <hr />
          <Table 
            bordered
            size='small'
            rowKey='empCode'
            pagination={{ pageSize: 5 }}
            columns={this.state.columns}
            dataSource={this.state.data}
            onRow = {(record, index) =>{
              return {
                onClick: () =>{
                  console.log(record)
                  this.setState({code:record.empCode,aname:record.empName})
                  this.setState({visible:false})
                }
              }
            }} 
            />
        </Modal>
      </div>
    )
  }
}

export default StoreJB