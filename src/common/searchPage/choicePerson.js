import React, { Component } from 'react';
import { Button,Input, Table, Modal} from 'antd';
import { API } from '../axiosAPI'
import { getfun } from '../axiosFun'

const { IP, Employee} = API


class ChoicePerson extends Component{
  constructor(prop){
    super(prop)
    this.state={
      code: '',
      aname: '',
      Scode: '',
      Sname: '',
      visible: false,
      totalLength: '',
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
    getfun(url).then(res => this.setState({data: res.content, totalLength:res.totalElements})).catch(err =>console.log(err))
    console.log(this.props.clearDate)
  }

  searchPerson = () =>{
    // this.setState({ tableShow: true })
    const {Scode, Snaem} = this.state
    let url = `${IP}${Employee}?empName=${Snaem}&empCode=${Scode}`
    console.log(url)
    getfun(url).then(res => this.setState({data:res.content, totalLength:res.totalElements})).catch(err => console.log(err))
  }

  changePage = (page, pageSize) =>{
    let url =`${IP}${Employee}?page=${page-1}&size=${pageSize}`
    getfun(url).then(res => this.setState({data: res.content, totalLength:res.totalElements})).catch(err =>console.log(err.message))
  }
  // clearData = (item) =>{
  //   console.log(item)
  //   if(item) {
  //     this.setState({code: '',aname:''})
  //   }
  // }

  render() {
    // console.log(this.props.clearDate)
    // this.clearData(this.props.clearDate)
    return(
      <div>
        <div style={{display:'flex'}}>
            <Button type='primary'>人员</Button>
            <Input value={this.props.clearDate ? '': this.state.code} readOnly style={{ width:100}}  />
            <Input value={this.props.clearDate ? '': this.state.aname} readOnly style={{ width:100, marginRight:10}} />
            <Button onClick={() => this.setState({visible:true})}>查询</Button>
        </div>
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
              <Button onClick={this.searchPerson}>查询</Button>
          </div>
          <hr />
          <Table 
            bordered
            size='small'
            rowKey='id'
            pagination={{ pageSize: 5 }}
            columns={this.state.columns}
            dataSource={this.state.data}
            // 分页
            pagination={{  
              simple: false,
              pageSize: 10 ,
              // current: this.state.current,
              total: this.state.totalLength,
              onChange: this.changePage,
            }}
            onRow = {(record, index) =>{
              return {
                onClick: () =>{
                  console.log(record)
                  this.setState({code:record.empCode,aname:record.empName})
                  this.props.getpepple(record)
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

export default ChoicePerson;