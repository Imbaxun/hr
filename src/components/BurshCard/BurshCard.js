import React, { Component } from 'react';
import CompanyThree from '../../common/companyThree';
import {Row, Col, Input, Button, DatePicker, Table, Modal} from 'antd'
import './BurshCard.css'
import {getfun} from '../../common/axiosFun'
import { API } from '../../common/axiosAPI'

const { IP, ClassSearchUrl} = API

const { MonthPicker } = DatePicker;
const mydate = new Date()

class BurshCard extends Component{
constructor(props) {
  super(props);
  this.state={
    name: '',
    code: '',
    searchyear: mydate.getFullYear(),
    searchmonth: mydate.getMonth()+1,
    columns: [
      {
      title: '工号',
      dataIndex: 'empCode'
      },
      {
        title: '姓名',
        dataIndex: 'empName'
      },   
      {
        title: '公司',
        dataIndex: 'companyName'
      },
      {
        title: '部门',
        dataIndex: 'departmentName'
      }, 
      {
        title: '班次名称',
        dataIndex: 'schedulingName'
      }, 
      {
        title: '班次月份',
        dataIndex: 'month'
      }, 
      {
        title: '班次来源',
        dataIndex: 'schedulingSource'
      },  
      {
        title: '排班详情',
        dataIndex: 'description'
      } 
    ],
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
  getfun(url).then(res => this.setState({data:res.content})).catch(err => console.log(err))
}

    //树桩查询的方法
    getThreeData = (item) =>{
      const{searchmonth, searchyear} =this.state
      // console.log(searchmonth.toString())
      let ayear = searchyear.toString()
      let amonth = searchmonth.toString()
      console.log(item)
      this.setState({selectData: item})
      //点击查询的url
      let searchUrl = `${IP}${ClassSearchUrl}?${item}&year=${ayear}&month=${amonth}`
      console.log(searchUrl)
      getfun(searchUrl).then(res => this.setState({data: res.content})).catch(err => console.log)

    }

  onChangeMonth = (date, dateString) =>{
    // console.log(date._d.getFullYear() + date._d.getMonth()) 
    this.setState({searchyear: date._d.getFullYear(),searchmonth:date._d.getMonth()+1})
  }

render() {
  const rowSelection = {
    onChange: (selectedRowKeys, selectedRows) => {
      console.log(`selectedRowKeys: ${selectedRowKeys}`, 'selectedRows: ', selectedRows);
    }
  } 
  return(
    <div>
        <Row type="flex" justify="space-around">
          <Col span="5">
            <CompanyThree   getThreeData= {this.getThreeData}/>
          </Col>
          <Col span="18">
          <Row type="flex" justify="space-around" style={{marginBottom:20}}>
              <Col span="5">
                <div style={{ display: 'flex' }}>
                  <Button type='primary' >工号</Button>
                  <Input value={this.state.name} onChange={(e) => { this.setState({ name: e.target.value }) }} />
                </div>
              </Col>
              <Col span="5">
                <div style={{ display: 'flex' }}>
                  <Button type='primary' >人员姓名</Button>
                  <Input value={this.state.code} onChange={(e) => { this.setState({ code: e.target.value }) }} />
                </div>
              </Col>
              <Col span="8">
                <div style={{ display: 'flex' }}>
                  <Button type='primary' >补刷卡月份</Button>
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
              <h3 className="comtitle">补刷卡管理列表</h3>
                <Row type="flex" justify='space-end'>
                  <Col span="3"><Button  >新增</Button></Col>
                  <Col span="3"><Button  >编辑</Button></Col>
                  {/* <Button span="3"><Button icon="warning">启用/禁用</Button></Button> */}
                  <Col span="3"><Button  >删除</Button></Col>
                </Row>
                <Table
                  style={{marginTop:20}}
                  columns={this.state.columns}
                  dataSource={this.state.data}
                  bordered
                  rowSelection={rowSelection}
                  rowKey="empCode"
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
export default BurshCard;