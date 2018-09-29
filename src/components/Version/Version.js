import React, { Component } from 'react';
import { Row, Col, Input, Button, Table,DatePicker, Modal ,notification   } from 'antd';
import './Version.css'
import{getfun, postfun2, deletefun} from '../../common/axiosFun'
import {API} from '../../common/axiosAPI'
const { IP, VersionUrl} = API

const {  RangePicker } = DatePicker;
const { TextArea } = Input;

// const openNotificationWithIcon = (type) => {
//   notification[type]({
//     message: 'Success',
//     description: '新增成功',
//   });
// };

class Version extends Component {

  constructor(props) {
    super(props)
    this.state = {
      version: '',
      visible: false,
      versionCode: '',
      uptime: '',
      startUptime: '',
      endUpTime: '',
      appDescribe: '',
      totalLength: '',
      choiceData: [],
      data:[],
      columns: [
        {
          title: '版本号',
          dataIndex: 'versionCode',
        },
        {
          title: '更新时间',
          dataIndex: 'uptimeView',
        },
        {
          title: '更新说明',
          dataIndex: 'appDescribe',
        }
      ]
    }
  }

  componentDidMount() {
    this.start()
  }

  start = () =>{
    let url = `${IP}${VersionUrl}?page=0&size=10`
    getfun(url).then(res =>{
      console.log(res)
      this.setState({data: res.content, totalLength:res.totalElements} )
    }).catch(err =>console.log(err))
  }

  searchData =() =>{
    const {version, startUptime, endUpTime} = this.state
    let url =  `${IP}${VersionUrl}?page=0&size=10&versionCode=${version}&startUptime=${startUptime}&endUpTime=${endUpTime}` 
    getfun(url).then(res =>{
      console.log(res)
      this.setState({data: res.content, totalLength:res.totalElements} )
    }).catch(err =>console.log(err))
  }

  onChange = (date, dateString) =>{
    console.log(date, dateString);
    this.setState({startUptime:dateString[0],endUpTime:dateString[1] })
  }

  changePage = (page, pageSize) =>{
    const {version, startUptime, endUpTime} = this.state
    // console.log(page)
    // console.log(pageSize)
    let url =  `${IP}${VersionUrl}?page=${page-1}&size=${pageSize}&version=${version}&startUptime=${startUptime}&endUpTime=${endUpTime}` 
 
    getfun(url).then(res =>{
      console.log(res)
      this.setState({data: res.content, totalLength:res.totalElements} )
    }).catch(err =>console.log(err))
  }

  addTime = (date, dateString) =>{
    console.log(date, dateString);
    this.setState({uptime: dateString})
  }

  addVersion = () =>{
    const {versionCode, appDescribe ,uptime} = this.state
    let sendData = {
      versionCode,
      appDescribe,
      uptime
    }
    let url = `${IP}${VersionUrl}`
    postfun2(url ,sendData).then(res =>{
      console.log(res)
      if(res === 'success'){
        notification['success']({
          message: 'Success',
          description: '新增成功',
        });
        this.start()
        this.setState({visible: false})
      }
    }).catch(err =>console.log(err))
  }

  delData = () =>{
    const {choiceData} = this.state
    console.log(choiceData)
    let arr = []
    choiceData.forEach( item =>{
      arr.push(item.id)
    })
    console.log(arr.toString())
    let idNumber = arr.toString()
    let url = `${IP}${VersionUrl}/${idNumber}`
    deletefun(url).then(res =>{
      console.log(res)
      if(res === 'success'){
        notification['success']({
          message: 'Success',
          description: '删除成功',
        });
        this.start()
      }
    }).catch(err =>console.log(err))
  }


  render(){

    const rowSelection = {
      onChange: (selectedRowKeys,selectedRows) => {
        console.log(selectedRows);
        this.setState({choiceData:selectedRows})
      }
    }  
    return(
      <div>
        <div style={{marginTop:20}}>
          <Row type="flex" justify="space-around" style={{ marginBottom: 20 }}>
            <Col span="5">
              <div style={{ display: 'flex' }}>
                <Button type='primary' >版本号</Button>
                <Input value={this.state.version } onChange={(e) => { this.setState({ version : e.target.value })}} />
              </div>
            </Col>
            <Col span="10">
              <div style={{ display: 'flex' }}>
                <Button type='primary' >上线时间</Button>
                <RangePicker onChange={this.onChange} />
              </div>
            </Col>
          </Row>
          <Row type="flex" justify="center"  style={{marginBottom:10}}>
          <Col span="5"><Button icon="reload" onClick={()=>this.setState({version:''})} type="primary">重置</Button>  <Button onClick={() =>this.searchData()} icon="search" type="primary">查询</Button></Col>
          <Col span="5"><Button  type="primary" onClick={()=>this.setState({visible:true})}>新增</Button>  <Button onClick={this.delData} type="primary">删除</Button></Col>
          </Row>
        </div>
        <hr/>
        <div className="comMain">
          <h3 className="comtitle">考勤APP版本管理</h3>
        </div>
        <Table
          style={{marginTop:20}}
          columns={this.state.columns}
          dataSource={this.state.data}
          bordered
          rowKey="id"
          rowSelection={rowSelection}
          pagination={{  // 分页
            simple: false,
            pageSize: 10 ,
            total: this.state.totalLength,
            onChange: this.changePage,
          }}
        />
        <Modal
          title="新增版本"
          visible={this.state.visible}
          onOk={() =>this.addVersion()}
          onCancel={() =>this.setState({visible:false})}
          width={800}
          >
          <Row type="flex" justify="space-around" className="marbot">
            <Col span="8">
            <div style={{display:'flex'}}>
            <Button type='primary' >版本号</Button>
            <Input onChange={(e) =>{this.setState({versionCode:e.target.value})}}  placeholder="请输入版本名称..." />
            </div>
            </Col>
            <Col span="8">
            <div style={{display:'flex'}}>
            <Button type='primary' >创建时间</Button>
              <DatePicker onChange={this.addTime} />
            </div>
            </Col>
          </Row>
          <Row>
            <Col span='3' offset="2">
            <Button type='primary' >更新说明</Button>
            </Col>
            <Col span="16">
            <TextArea rows={4} onChange={(e) =>{this.setState({appDescribe:e.target.value})}}/>
            </Col>
          </Row>
        </Modal>
      </div>
    )
  }

}

export default Version