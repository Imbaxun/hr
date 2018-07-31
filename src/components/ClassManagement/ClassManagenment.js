import React, { Component } from 'react'
import { Row, Col, Input, Button, Table,DatePicker } from 'antd';
import{getfun} from '../../common/axiosFun'
import {API} from '../../common/axiosAPI'
import './ClassManage.css'
const { MonthPicker} = DatePicker;
const { IP, ClassManageUrl} = API

class ClassManage extends Component{
  constructor(props){
    super(props)
    this.state = {
      schedulingName : '',
      month: '',
      year: '',
      choiceData: '',
      tableData:[],
      columns: [
        {
          title: '班次名称',
          dataIndex: 'schedulingName',
        }, 
        {
          title: '班次月份',
          dataIndex: 'resDate',
        }, 
        {
          title: '班次来源',
          dataIndex: 'schedulingSource',
        }, 
        {
          title: '班次描述',
          dataIndex: 'description',
        }
      ]
    }

  }

  componentDidMount() {
    this.startData()
  }

  startData = () =>{
    let url = `${IP}${ClassManageUrl}`
    getfun(url).then(res =>{
      // console.log(res.content)
      let arr = res.content
      arr.forEach(item =>{
        item.resDate = `${item.year}/${item.month}`
      })
      console.log(arr)
      this.setState({tableData:arr})
    }).catch(err =>console.log(err))
  }  

  onChangeMonth= (date, dateString) =>{
    // console.log(date._d.getFullYear())
    let year = date._d.getFullYear()
    let month = date._d.getMonth()
    console.log(year)
    console.log(month)
    this.setState({month:month,year:year})
  }

  searchData = () =>{

  }

  render() {
    const rowSelection = {
      onChange: (selectedRowKeys,selectedRows) => {
        console.log(selectedRows);
        this.setState({choiceData:selectedRows})
      }
    }  
    return (
      <div>
        <div style={{marginTop:20}}>
          <Row type="flex" justify="space-around" style={{ marginBottom: 20 }}>
            <Col span="5">
              <div style={{ display: 'flex' }}>
                <Button type='primary' >班次名称</Button>
                <Input value={this.state.schedulingName } onChange={(e) => { this.setState({ schedulingName : e.target.value })}} />
              </div>
            </Col>
            <Col span="5">
              <div style={{ display: 'flex' }}>
                <Button type='primary' >班次月份</Button>
                <MonthPicker onChange={this.onChangeMonth} placeholder="选择月份" />
              </div>
            </Col>
          </Row>
          <Row type="flex" justify="center"  style={{marginBottom:10}}>
          <Col span="5"><Button icon="reload" onClick={()=>this.setState({schedulingName:'',month: '',year:''})} type="primary">重置</Button>  <Button onClick={() =>this.searchData()} icon="search" type="primary">查询</Button></Col>
        </Row>
        </div>
        <hr/>
        <div className="comMain">
          <h3 className="comtitle">部门维护列表</h3>
          <Table
            style={{marginTop:20}}
            columns={this.state.columns}
            dataSource={this.state.tableData}
            bordered
            rowSelection={rowSelection}
          />
        </div>
      </div>
    )
  }

}

export default ClassManage;