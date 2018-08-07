import React, { Component } from 'react';
import CompanyThree from '../../common/companyThree';
import {Row, Col, Input, Button, DatePicker, Table, Modal} from 'antd'
import './ClassSearch.css'
import {getfun} from '../../common/axiosFun'
import { API } from '../../common/axiosAPI'

const { IP, ClassSearchUrl} = API

const { MonthPicker } = DatePicker;


class ClassSearch extends Component{
  constructor(props) {
    super(props)
    this.state={
      name: '',
      code: '',
      columns: [],
      data: [],
      visible1: false,
      visible2: false,
      visible3: false,
    }
  }

  componentDidMount() {
    this.startData()
  }

  startData = () =>{
    let url = `${IP}${ClassSearchUrl}`
    getfun(url).then(res => console.log(res)).catch(err => console.log(err))
  }

  searchData = () =>{

  }

  onChangeMonth = (date, dateString) =>{
    console.log(dateString)
  }
  render(){
    return(
      <div>
        <Row type="flex" justify="space-around">
          <Col span="5">
            <CompanyThree />
          </Col>
          <Col span="18">
          <Row type="flex" justify="space-around" style={{marginBottom:20}}>
              <Col span="5">
                <div style={{ display: 'flex' }}>
                  <Button type='primary' >人员姓名</Button>
                  <Input value={this.state.name} onChange={(e) => { this.setState({ name: e.target.value }) }} />
                </div>
              </Col>
              <Col span="5">
                <div style={{ display: 'flex' }}>
                  <Button type='primary' >门店编码</Button>
                  <Input value={this.state.code} onChange={(e) => { this.setState({ code: e.target.value }) }} />
                </div>
              </Col>
              <Col span="5">
                <div style={{ display: 'flex' }}>
                  <Button type='primary' >班次名称</Button>
                  <Input value={this.state.code} onChange={(e) => { this.setState({ code: e.target.value }) }} />
                </div>
              </Col>
              <Col span="5">
                <div style={{ display: 'flex' }}>
                  <Button type='primary' >班次月份</Button>
                  <MonthPicker onChange={this.onChangeMonth} placeholder="Select month" />
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
              <h3 className="comtitle">排班查询列表</h3>
                <Row type="flex" justify='space-end'>
                  <Col span="3"><Button  >批量排班</Button></Col>
                  <Col span="3"><Button  >部门排班</Button></Col>
                  {/* <Button span="3"><Button icon="warning">启用/禁用</Button></Button> */}
                  <Col span="3"><Button  >人员排班</Button></Col>
                </Row>
                <Table
                  style={{marginTop:20}}
                  columns={this.state.columns}
                  dataSource={this.state.data}
                  bordered
                  rowKey="code"
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
          visible = {this.state.visible1}
          title="批量排班"
          onOk={() =>this.setState({visible1:false})}
          onCancel={() =>this.setState({visible1:false})}
          width={800}
        ></Modal>
        <Modal
          visible = {this.state.visible2}
          title="部门排班"
          onOk={() =>this.setState({visible2:false})}
          onCancel={() =>this.setState({visible2:false})}
          width={800}
        ></Modal>
        <Modal
          visible = {this.state.visible3}
          title="人员排班"
          onOk={() =>this.setState({visible3:false})}
          onCancel={() =>this.setState({visible3:false})}
          width={800}
        ></Modal>
      </div>
    )
  }
}

export default ClassSearch;