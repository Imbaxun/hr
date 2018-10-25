import React, { Component } from 'react';
import {Row, Col,Input, Button, Table,DatePicker,Modal} from 'antd'
import { API } from '../../common/axiosAPI'
import { getfun } from '../../common/axiosFun'

const { IP, Employee ,userUnbounUrl} = API
const { RangePicker } = DatePicker;



class userUnbound extends Component{
  constructor(props) {
    super(props)
    this.state={
      startDate: '',
      endDate: '',
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
      visible:false,
      code: '',
      aname: '',
      Scode: '',
      Sname: '',
      recordTimeStart: '',
      recordTimeEnd: '',
      totalLength: '',
      data1: [],
      columns1: [
        {
          title: '员工编号',
          dataIndex: 'empCode',
        },
        {
          title: '员工姓名',
          dataIndex: 'empName',
        },
        {
          title: '解绑时间',
          dataIndex: 'unboundTimeView',
        }       
      ]
    }
  }

  start = (url) =>{
    // let url = `${IP}/appSignRecord?page=0&size=10`
    getfun(url).then(res => {
      this.setState({data1:res.content,totalLength:res.totalElements })
      console.log(res)}
    ).catch(err =>console.log(err.message))
  }

  componentDidMount() {
    let aa= `${IP}${userUnbounUrl}?page=0&size=10`
    this.start(aa)
    let url = `${IP}${Employee}`
    console.log(url)
    getfun(url).then(res => this.setState({data: res.content})).catch(err =>console.log(err))
  }

  selectDate =(date,dateString) =>{
    console.log(dateString)
    this.setState({startDate:dateString[0],endDate:dateString[1]})
  }
  searchPeople = () =>{
    const {Scode, Snaem} = this.state
    let url = `${IP}${Employee}?empName=${Snaem}&empCode=${Scode}`
    getfun(url).then(res => this.setState({data:res.content})).catch(err => console.log(err))
  }
  searchData = () =>{
    const {code,startDate, endDate} =this.state
    let url = `${IP}${userUnbounUrl}?empCode=${code}&unboundTimeEnd=${endDate}&unboundTimeStart=${startDate}`
    // getfun(url).then(res => this.setState({data1:res.content})).catch(err => console.log(err))
    this.start(url)
  }
  changePage = (page, pageSize) =>{
    const {code,startDate, endDate} =this.state
    console.log(page)
    console.log(pageSize)
    let url =`${IP}${userUnbounUrl}?page=${page-1}&size=${pageSize}&empCode=${code}&unboundTimeEnd=${endDate}&unboundTimeStart=${startDate}`
    // getfun(url).then(res => this.setState({data1: res.content,totalLength:res.totalElements})).catch(err =>console.log(err.message))
    this.start(url)
  }

  render() {
    // const props = {
    //   name: 'file',
    //   action: `${IP}/appSignRecord/importBasePunchRecord`,
    //   headers: {
    //     authorization: 'authorization-text',
    //   },
    //   onChange(info) {
    //     if (info.file.status !== 'uploading') {
    //       console.log(info.file, info.fileList);
    //     }
    //     if (info.file.status === 'done') {
    //       message.success(`${info.file.name} 上传成功`);
    //     } else if (info.file.status === 'error') {
    //       message.error(`${info.file.name} 上传失败`);
    //     }
    //   }
    // }

    return(
      <div>
        <Row type="flex" justify="space-around">
          <Col span='5'></Col>
          <Col span="8">
            <h1>APP账号解绑记录</h1>
          </Col>
          <Col span='5'></Col>
        </Row>
        <hr/>
        <Row type="flex" justify="space-around" style={{marginBottom:30}}>
          <Col span='10'>
            <div style={{display:'flex'}}>
              <Button type='primary'>人员</Button>
              <Input value={this.state.code} readOnly style={{ width:150}}  />
              <Input value={this.state.aname} readOnly style={{ width:150, marginRight:10}} />
              <Button onClick={() => this.setState({visible:true})}>查询</Button>
            </div>
          </Col>
          <Col span='10'>
          <RangePicker onChange={this.selectDate} />
          </Col>
        </Row>
        <Button type='primary' onClick={this.searchData}>查询</Button>
        <Table 
            bordered
            size='small'
            rowKey='id'
            // pagination={{ pageSize: 5 }}
            columns={this.state.columns1}
            dataSource={this.state.data1}
            // scroll={{ x: 1600 }}
            pagination={{  // 分页
              simple: false,
              pageSize: 10 ,
              // current: this.state.current,
              total: this.state.totalLength,
              onChange: this.changePage,
            }}
            />
        {/* <Upload {...props} style={{width:500}}>
          <Button>
            <Icon type="upload" />上传
          </Button>
        </Upload> */}
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


export default userUnbound;