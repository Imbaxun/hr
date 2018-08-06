import React, { Component } from 'react';
import { Row, Col, Button,Input, Table} from 'antd';
import { API } from '../axiosAPI'
import { getfun } from '../axiosFun'

const { IP, Employee} = API


class PersonSearch extends Component{
  constructor(props){
    // console.log(props)
    super(props)
    this.state = {
      id: '',
      name: '',
      code: '',
      aname: '',
      tableShow: false,
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
      ]
    }
  }

  componentDidMount() {
    let url = `${IP}${Employee}`
    console.log(url)
    getfun(url).then(res => this.setState({data: res.content})).catch(err =>console.log(err))
  }

  tableVisible = () =>{
    // const {code, aname} =this.state
    const {tableShow} = this.state
    if(tableShow){
      return (
      <Table 
        bordered
        size='small'
        rowKey='empCode'
        pagination={{ pageSize: 5 }}
        visible={this.state.tableShow}
        columns={this.state.columns} 
        dataSource={this.state.data}
        onRow = {(record, index) =>{
          return {
            onClick: () =>{
              console.log(record)
              this.setState({code:record.empCode,aname:record.empName})
              let perData ={
                code: record.empCode,
                name: record.empName
              }
              this.props.choicedPerson(perData)
            }
          }
        }} 
        />
      )
    }else{
      return
    }
  }

  searchPerson = () =>{
    this.setState({ tableShow: true })
    const {id, name} = this.state
    let url = `${IP}${Employee}?empName=${name}&empCode=${id}`
    getfun(url).then(res => this.setState({data:res.content})).catch(err => console.log(err))
  }


  render() {
    const {btnshow} =this.props
    return (
      <div>
        <Row type="flex" justify="space-around" className="marbot">
          <Col span="8">
            <div style={{ display: 'flex' }}>
              <Button type='primary' >{btnshow}</Button>
              <Input placeholder='账号' value={this.state.code} onChange={(e) => { this.setState({ id: e.target.value, code: e.target.value}) }} style={{ width: "90px" }} />
              <Input placeholder='姓名' value={this.state.aname} onChange={(e) => { this.setState({ name: e.target.value, aname: e.target.value }) }} style={{ width: "90px" }} />
            </div>
          </Col>
          <Col span="8">
            <Button type='primary' onClick={this.searchPerson} >查询</Button>  <Button type='primary' onClick={()=>this.setState({aname:'',code: '',tableShow:false})}  >重置</Button>
          </Col>
        </Row>
        {this.tableVisible()}
      </div>
    )
  }
}

export default PersonSearch;