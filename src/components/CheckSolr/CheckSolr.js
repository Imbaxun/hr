import React, { Component } from 'react';
import {Row, Col,Input, Button, Table,DatePicker,Modal } from 'antd'
import { API } from '../../common/axiosAPI'
import { getfun } from '../../common/axiosFun'

const { IP, Employee} = API
const {  RangePicker} = DatePicker;

class CheckSolr extends Component{
  constructor(props) {
    super(props)
    this.state={
      data:[],
      totalLength: '',
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
      visible:false,
      code: '',
      aname: '',
      Scode: '',
      Sname: '',
      recordTimeStart: '',
      recordTimeEnd: '',
      data1: [],
      columns1: [
        {
          title: '姓名',
          dataIndex: 'userName',
        },
        {
          title: 'workId',
          dataIndex: 'workId',
        },
        {
          title: 'cardNo',
          dataIndex: 'cardNo',
        },
        {
          title: 'recordDate',
          dataIndex: 'recordDate',
        },
        {
          title: 'Time',
          dataIndex: 'recordTimeView',
        },
        {
          title: 'readerId',
          dataIndex: 'readerId',
        },
        {
          title: 'event',
          dataIndex: 'event',
        }
      ]
    }
  }
    componentDidMount() {
    this.start()
    let url = `${IP}${Employee}`
    getfun(url).then(res => this.setState({data: res.content})).catch(err =>console.log(err))
  }

  changePage = (page, pageSize)=>{
    const {code, aname,recordTimeStart, recordTimeEnd} =this.state
    let url = `${IP}/basePunchRecord/solr?userName=${aname}&cardNo=${code}&recordTimeStart=${recordTimeStart}&recordTimeEnd=${recordTimeEnd}&page=${page-1}&pageSize=${pageSize}`
    getfun(url).then(res =>
      {
        this.setState({data1: res.content,totalLength:res.totalElements})
      }
    ).catch(err =>console.log(err.message))
  }

  start = () =>{
    let url = `${IP}/basePunchRecord/solr`
    getfun(url).then(res => this.setState({data1: res.content,totalLength:res.totalElements})).catch(err =>console.log(err.message))
  }


  selectDate =(date,dateString) =>{
    this.setState({
      recordTimeStart: dateString[0],
      recordTimeEnd: dateString[1]
    })
  }
  searchPeople = () =>{
    const {Scode, Snaem} = this.state
    let url = `${IP}${Employee}?empName=${Snaem}&empCode=${Scode}`
    getfun(url).then(res => {
      this.setState({data:res.content})
    }
    ).catch(err => {console.log(err)})
  }
  searchData = () =>{
    const {code, aname,recordTimeStart, recordTimeEnd} =this.state
    let url = `${IP}/basePunchRecord/solr?userName=${aname}&cardNo=${code}&recordTimeStart=${recordTimeStart}&recordTimeEnd=${recordTimeEnd}`
    getfun(url).then(res => this.setState({data1:res.content,totalLength:res.totalElements}
      )).catch(err => console.log(err))
  }

  render() {

    return(
      <div>
        <Row type="flex" justify="space-around">
          <Col span='5'></Col>
          <Col span="8">
            <h1>考勤数据查询Solr</h1>
          </Col>
          <Col span='5'></Col>
        </Row>
        <hr/>
        <Row type="flex" justify="space-around" style={{marginBottom:30}}>
          <Col span='5'>
            <div style={{display:'flex'}}>
              <Button type='primary'>人员</Button>
              <Input value={this.state.code} readOnly style={{ width:60}}  />
              <Input value={this.state.aname} readOnly style={{ width:60, marginRight:10}} />
              <Button onClick={() => this.setState({visible:true})}>查询</Button>
            </div>
          </Col>
          <Col span='5'>
          <RangePicker  onChange={this.selectDate} />
          </Col>
        </Row>
        <Button type='primary' onClick={this.searchData}>查询</Button>
        <Table 
            bordered
            size='small'
            rowKey='id'
            columns={this.state.columns1}
            dataSource={this.state.data1}
            pagination={{  // 分页
              simple: false,
              pageSize: 20 ,
              total: this.state.totalLength,
              onChange: this.changePage,
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


export default CheckSolr;