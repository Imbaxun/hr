import React, { Component } from 'react';
import { Row, Col, Input, Button, Table  } from 'antd';
// import './Version/css'
import{getfun} from '../../common/axiosFun'
import {Print} from '../../common/print'
import {API} from '../../common/axiosAPI'
// const { TextArea } = Input;
const {KQIp, progresHistory} = API

// const openNotificationWithIcon = (type) => {
//   notification[type]({
//     message: 'Success',
//     description: '新增成功',
//   });
// };

class BSKProcess extends Component {

  constructor(props) {
    super(props)
    console.log(props)
    // let aa =  window.sessionStorage.getItem('path')
    this.state = {
      flowData: '',
      columns1:[
        {
          title: '姓名',
          dataIndex: 'employeeName',
        },
        {
          title: '工号',
          dataIndex: 'employeeCode',
        },
        {
          title: '开始时间',
          dataIndex: 'startDate',
        },
        {
          title: '结束时间',
          dataIndex: 'endDate',
        },
        {
          title: '补签类型',
          dataIndex: 'suppleType',
        },
        {
          title: '补刷卡类型',
          dataIndex: 'type',
        },
        {
          title: '补刷卡事由',
          dataIndex: 'reason',
        },
      ],
      data1: [],
      course: [],
      columns: [
        {
          title: '审批人',
          dataIndex: 'userId',
        },
        {
          title: '审批意见',
          dataIndex: 'options',
        },
        {
          title: '审批时间',
          dataIndex: 'time',
        },
      ]
    }
  }

  componentDidMount() {
    this.start()
    this.getHistory()
  }

  start = () =>{
    let aa = JSON.parse(window.sessionStorage.getItem('flowUrl'))
    getfun(aa).then(res =>{
      console.log(res)
      if(res.success){
        this.setState({
          flowData: res.appSwingCardList,
          data1: res.appSwingCardList.bskListData
        })
      }else{
        alert('表单数据请求错误')
      }
    }).catch(err =>console.log(err))
  }

  getHistory = () =>{
    let bb = JSON.parse(window.sessionStorage.getItem('flowCode'))
    let url = `${KQIp}/${progresHistory}?flowId=${bb}`
    console.log(url)
    getfun(url).then(res =>{
      console.log(res)
      if(res.success){
        this.setState({
          course: res.rows
        })
      }else{
        alert('表单历程请求错误')
      }
    }).catch(err =>console.log(err))
  }

  printView = () =>{
    Print('mainConent')
  }

  hist = () =>{
    const {course} = this.state
    let maintd = []
    course.forEach(item =>{
      maintd.push(
        <tr key = {item.id} align="center">
          <td style={{width: 300}}>{item.userId}</td>
          <td style={{width: 400}}>{item.options}</td>
          <td style={{width: 300}}>{item.time}</td>
        </tr>
      )
    })
    return maintd
  }

  tableDate = () =>{
    const {data1} = this.state
    let maintd = []
    data1.forEach(item =>{
      maintd.push(
        <tr key = {item.id} align="center">
          <td style={{width: 200}}>{item.employeeName}</td>
          <td style={{width: 200}}>{item.employeeCode}</td>
          <td style={{width: 300}}>{item.startDate}</td>
          <td style={{width: 300}}>{item.endDate}</td>
          <td style={{width: 200}}>{item.suppleType}</td>
          <td style={{width: 200}}>{item.type}</td>
          <td style={{width: 400}}>{item.reason}</td>
        </tr>
      )
    })
    return maintd
  }


  render(){
    const {flowData} = this.state 
    return(
      <div>
        <Button onClick={this.printView}>打印</Button>
        <h1 style={{textAlign:"center"}}>补刷卡申请单</h1>
        <Row  type="flex" justify="space-around"  style={{marginTop: 30}}>
          <Col span = '8'>
            <div style={{display:'flex'}}>
              <Button type='primary'>发起人</Button>
              <Input value={flowData.proposer || '未填写'} readOnly style={{ width:100}}  />
              <Input value={flowData.proposerId || '未填写'} readOnly style={{ width:100}} />
            </div>
          </Col>
          <Col span = '8'>
          </Col>
        </Row>
        <Table
            style={{marginTop:20}}
            columns={this.state.columns1}
            dataSource={this.state.data1}
            bordered
            rowKey='employeeCode'
          />
          <div>
        <h2 style={{textAlign:'center'}}>审批历程</h2>
        <Table
            style={{marginTop:20}}
            columns={this.state.columns}
            dataSource={this.state.course}
            bordered
            rowKey='id'
          />
        </div>
        <div  style={{display:'none'}}>
          <div id='mainConent' style={{fontSize:16}}>
            <h1 style={{textAlign:'center', marginBottom:20}}>补刷卡申请单</h1>
            <div style={{display:'flex',marginLeft:200, marginBottom:20}}>
              <Button type='primary'>发起人</Button>
              <Input value={flowData.proposer || '未填写'} readOnly style={{ width:100}}  />
              <Input value={flowData.proposerId || '未填写'} readOnly style={{ width:100}} />
            </div>
            <div style={{marginLeft:20, marginBottom:20}}>
            <table  border="1" cellspacing="0" cellpadding="0" >
              <tr>
                <th style={{width: 200}}>姓名</th>
                <th style={{width: 200}}>工号</th>
                <th style={{width: 300}}>开始时间</th>
                <th style={{width: 300}}>结束时间</th>
                <th style={{width: 200}}>补签类型</th>
                <th style={{width: 200}}>补刷卡类型</th>
                <th style={{width: 400}}>补刷卡事由</th>
              </tr>
                 {this.tableDate()}
            </table>
            </div>
            <div style={{marginLeft:100, marginBottom:20}}>
            <h3 style={{textAlign:'center'}}>审批历程</h3>
            <table  border="1" cellspacing="0" cellpadding="0" >
              <tr>
                <th style={{width: 300}}>审批人</th>
                <th style={{width: 400}}>审批意见</th>
                <th style={{width: 300}}>审批时间</th>
              </tr>
                 {this.hist()}
            </table>
            </div>
          </div>
        </div>
      </div>
    )
  }

}

export default BSKProcess