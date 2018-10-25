import React, { Component } from 'react';
import {Row, Col,Input, Button, Table,DatePicker,Modal, Select } from 'antd'
import './ProcessView.css'
import { getfun } from '../../common/axiosFun'
import { API } from '../../common/axiosAPI'
const { IP, Employee ,userUnbounUrl} = API

const Option = Select.Option;
const {RangePicker} = DatePicker

class ProcessView extends Component {
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
    }
  }

  searchPeople = () =>{
    const {Scode, Snaem} = this.state
    let url = `${IP}${Employee}?empName=${Snaem}&empCode=${Scode}`
    getfun(url).then(res => this.setState({data:res.content})).catch(err => console.log(err))
  }

 handleChange = (value) =>{
    console.log(`selected ${value}`);
  }

  choiceDate = (date, dateString) =>{
    console.log(dateString)
  }


  render() {
    return(
      <div>
        <h3 className="comtitle">门店考勤</h3>
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
              <Button type='primary'>流程分类</Button>
              <Select defaultValue="lucy" style={{ width: 120 }} onChange={this.handleChange}>
                <Option value="jack">补刷卡</Option>
                <Option value="lucy">请假</Option>
                <Option value="disabled" >销假</Option>
                <Option value="Yiminghe">加班</Option>
              </Select>
              </div>
            </Col>
            <Col span='4'>
            <RangePicker onChange={this.choiceDate} />
            </Col>
            <Col span='4'>
            <Button type='primary'>查询</Button>
            </Col>
          </Row>
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

export default ProcessView