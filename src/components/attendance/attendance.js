import React, { Component } from 'react';
import CompanyThree from '../../common/companyThree';
import ChoicePerson from '../../common/searchPage/choicePerson'
import moment from 'moment';
import './attendance.css'
import {getfun} from '../../common/axiosFun'
import { API } from '../../common/axiosAPI'
import {Row, Col, Button, DatePicker, Table, Select, Upload, message, Icon, } from 'antd'
const { MonthPicker } = DatePicker;
const Option = Select.Option;
const monthFormat = 'YYYY/MM';
const {IP} = API
const mydate = new Date()

class Attendance extends Component{
  constructor(props){
    super(props)
    this.state = {
      searchyear: mydate.getFullYear(),
      searchmonth: mydate.getMonth()+1<10 ? `0${ mydate.getMonth()+1}`: mydate.getMonth()+1,
      selectTree:'',
      showData: '工业园原始考勤数据记录',
      tableType: '工业园原始考勤数据记录',
      columns:[],
      data: [],
      dowloadUrl: '',
      downLoad: '',
      totalLength: '',
      empCode: '',
      totalWidth:'',
      clearDate: false
    }
  }
  componentDidMount(){
    this.start()
  }

  start = () =>{
    const {searchmonth, searchyear} =this.state
    let url =  `${IP}/punchRecord/solr?page=0&size=10&recordYear=${searchyear}&recordMonth=${searchmonth}`
    let hurl = `${IP}/punchRecordCommon/getTableHand?queryType=工业园原始考勤数据记录`
    // getfun(hurl).then(res => {
    //   if(res.msg === "success"){
    //     this.setState({columns:res.data})
    //     this.getTable(url)
    //   }
    // }).catch(err =>console.log(err))
    this.getHead(url,hurl)
  }

  getTable = (url) =>{
    getfun(url).then(res =>{
      this.setState({data:res.content,totalLength:res.totalElements})
    }).catch(err =>console.log(err))
  }

  getHead = (url,hurl) =>{
    getfun(hurl).then(res =>{
      if(res.msg === "success"){
        this.setState({columns:res.data,totalWidth:res.totalWidth})
        this.getTable(url)
      }
    }).catch(err =>console.log(err))
  }

  //树桩查询的方法
  getThreeData = (item) =>{
    // const{searchmonth, searchyear} =this.state
    console.log(item)
    this.setState({selectTree: item})
    const{empCode, searchmonth, searchyear,tableType} = this.state
    let url =''
    let hurl = `${IP}/punchRecordCommon/getTableHand?queryType=${tableType}`
    switch(tableType) {
      case "原始考勤数据记录":
      url =`${IP}/punchRecord/solr?${item}&page=0&size=10&empCode=${empCode}&recordYear=${searchyear}&recordMonth=${searchmonth}&recordType=Administrative`
      // let hurl = `${IP}/punchRecordCommon/getTableHand?queryType=${}`
      break
      case "月度考勤汇总":
      url =`${IP}/monthPunchRecord/solr?${item}&page=0&size=10&empCode=${empCode}&recordYear=${searchyear}&recordMonth=${searchmonth}&recordType=Administrative`
      break
      case "年度考勤汇总":
      url =`${IP}/yearPunchRecord/solr?${item}&page=0&size=10&empCode=${empCode}&recordYear=${searchyear}&recordMonth=${searchmonth}&recordType=Administrative`
      break
      case "工业园原始考勤数据记录":
      url =`${IP}/yearPunchRecord/solr?${item}&page=0&size=10&empCode=${empCode}&recordYear=${searchyear}&recordMonth=${searchmonth}&recordType=Administrative`
      break
      default:
      url =`${IP}/punchRecord/solr?${item}&page=0&size=10&empCode=${empCode}&recordYear=${searchyear}&recordMonth=${searchmonth}&recordType=Administrative`
    }
    this.getHead(url,hurl)
  }

  onChangeMonth = (date, dateString) =>{
    console.log(date)
    if(date === null) {
      this.setState({searchyear: '',searchmonth:''})
    }else{
      this.setState({searchyear: date._d.getFullYear(),searchmonth:date._d.getMonth()+1})
    }
  }

  checkType = (item) =>{
    console.log(item)
    switch(item) {
      case "1":
      this.setState({showData:'原始考勤数据记录',tableType:'原始考勤数据记录'})
      break
      case "2":
      this.setState({showData:'月度考勤汇总',tableType:'月度考勤汇总'})
      break
      case "3" :
      this.setState({showData:'年度考勤汇总',tableType:'年度考勤汇总'})
      break
      default:
      this.setState({showData:'原始考勤数据记录',tableType:'原始考勤数据记录'})
    }
  }
  getpepple = (item) =>{
    console.log(item)
    this.setState({empCode:item.empCode})
  }

  searchData = () =>{
    const{empCode, searchmonth, searchyear,tableType, selectTree} = this.state
    console.log(tableType)
    let hurl = `${IP}/punchRecordCommon/getTableHand?queryType=${tableType}`
    let url =''
    switch(tableType) {
      case "原始考勤数据记录":
      url =`${IP}/punchRecord/solr?${selectTree}&page=0&size=10&empCode=${empCode}&recordYear=${searchyear}&recordMonth=${searchmonth}&recordType=Administrative`
      break
      case "月度考勤汇总":
      url =`${IP}/monthPunchRecord/solr?${selectTree}&page=0&size=10&empCode=${empCode}&recordYear=${searchyear}&recordMonth=${searchmonth}&recordType=Administrative`
      break
      case "年度考勤汇总":
      url =`${IP}/yearPunchRecord/solr?${selectTree}&page=0&size=10&empCode=${empCode}&recordYear=${searchyear}&recordMonth=${searchmonth}&recordType=Administrative`
      break
      default:
      url =`${IP}/punchRecord/solr?${selectTree}&page=0&size=10&empCode=${empCode}&recordYear=${searchyear}&recordMonth=${searchmonth}&recordType=Administrative`
    }
    this.getHead(url,hurl)
  }

  // downLoad = () =>{
  //   // const {dowloadUrl,empCode, empName, levelName} = this.state
  //   // console.log(dowloadUrl)
  //   // let url = `${IP}/employee/exportEmployee?${empCode}&empName=${empName}&levelName=${levelName}`
  //   // console.log(url)
  //   // this.setState({downLoad:url})
  // }

  changePage = (page, pageSize) =>{
    const{empCode, searchmonth, searchyear,tableType} = this.state
    console.log(page)
    console.log(pageSize)
    let url =''
    let hurl = `${IP}/punchRecordCommon/getTableHand?queryType=${tableType}`
    switch(tableType) {
      case "原始考勤数据记录":
      url =`${IP}/punchRecord/solr?page=${page-1}&size=${pageSize}&empCode=${empCode}&recordYear=${searchyear}&recordMonth=${searchmonth}&recordType=Administrative`
      break
      case "月度考勤汇总":
      url =`${IP}/monthPunchRecord/solr?page=${page-1}&size=${pageSize}&empCode=${empCode}&recordYear=${searchyear}&recordMonth=${searchmonth}&recordType=Administrative`
      break
      case "年度考勤汇总":
      url =`${IP}/yearPunchRecord/solr?&page=${page-1}&size=${pageSize}&empCode=${empCode}&recordYear=${searchyear}&recordMonth=${searchmonth}&recordType=Administrative`
      break
      default:
      url =`${IP}/punchRecord/solr?page=${page-1}&size=${pageSize}&empCode=${empCode}&recordYear=${searchyear}&recordMonth=${searchmonth}&recordType=Administrative`
    }
    // let url =`${IP}/basePunchRecord?page=${page-1}&size=${pageSize}&userName=${aname}&cardNo=${code}&recordTimeStart=${recordTimeStart}&recordTimeEnd=${recordTimeEnd}`
    this.getHead(url,hurl)
  }

  render(){
    const up = {
      name: 'file',
      action: `${IP}/basePunchRecord/importBasePunchRecord`,
      headers: {
        authorization: 'authorization-text',
      },
      onChange(info) {
        if (info.file.status !== 'uploading') {
          console.log(info.file, info.fileList);
        }
        if (info.file.status === 'done') {
          message.success(`${info.file.name} 上传成功`);
          message.success(`${info.file.response.msg}`);
        } else if (info.file.status === 'error') {
          message.error(`${info.file.name} 上传失败.`);
        }
      },
    }

    return(
      <div>
        <Row type="flex" justify="space-around">
          <Col span="5">
            <CompanyThree   getThreeData= {this.getThreeData}/>
          </Col>
          <Col span='18'>
            <Row type="flex" justify="space-around" style={{marginBottom:20}}>
            <Col span="10">
              <ChoicePerson getpepple={this.getpepple} clearDate= {this.state.clearDate} />
              </Col>
              <Col span="10">
                <div style={{ display: 'flex' }}>
                  <Button type='primary' >月份</Button>
                  <MonthPicker onChange={this.onChangeMonth} defaultValue={moment(`${this.state.searchyear}/${this.state.searchmonth}`, monthFormat)} format={monthFormat} />
                </div>
              </Col>
            </Row>
            <Row type="flex" justify="space-around">
            <Col span='10'>
              <div style={{ display: 'flex',marginBottom:20 }}>
                <Button type='primary' >考勤类型</Button>
                  <Select  style={{ width: 250}} onChange={this.checkType}>
                    <Option value="1">原始考勤记录</Option>
                    <Option value="2">月度考勤汇总</Option>
                    <Option value="3">年度考勤汇总</Option>
                  </Select>
                </div>
              </Col>
              <Col span= '10'></Col>
            </Row>
            <hr />
            <div className="comMain">
              <h3 className="comtitle">{this.state.showData}</h3>
                <Row type="flex" justify='space-end'>
                  <Col span="3"><Button onClick = {() => this.setState({clearDate:true})}>重置</Button></Col>
                  <Col span="3"><Button onClick = {this.searchData} >查询</Button></Col>
                </Row>
                <Table
                  style={{marginTop:20}}
                  columns={this.state.columns}
                  dataSource={this.state.data}
                  bordered
                  align="center"
                  scroll={{ x: this.state.totalWidth ,y:800}}
                  rowKey="id"
                  pagination={{  // 分页
                    simple: false,
                    pageSize: 10 ,
                    // current: this.state.current,
                    total: this.state.totalLength,
                    onChange: this.changePage,
                  }}
                  // onRow = {(record, index) =>{
                  //   return {
                  //     onClick: () =>{
                  //       this.choiceShop(record,index)
                  //     }
                  //   }
                  // }}
                />
            </div>
            <div>
              {/* <Button onClick={this.downLoad}><a href={this.state.downLoad}>导出</a></Button> */}
              <Upload {...up}>
                <Button>
                  <Icon type="upload" /> 上传
                </Button>
              </Upload>
            </div>
          </Col>
        </Row>
      </div>
    )
  }
}

export default Attendance;