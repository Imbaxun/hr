import React, { Component } from 'react';
import CompanyThree from '../../common/companyThree'
import {Row, Col, Input, Button, DatePicker, Table, Modal ,Tag, Select, Radio,Upload, message, Icon,} from 'antd'
import './FactoryScheduling.css'
import {getfun, postfun2} from '../../common/axiosFun'
import { API } from '../../common/axiosAPI'
import DepSearch from '../../common/searchPage/depSearch'

const { IP, ClassSearchUrl} = API
const Option = Select.Option
const RadioGroup = Radio.Group

const { MonthPicker } = DatePicker;
const mydate = new Date()


class FactoryScheduling extends Component{
  constructor(props) {
    super(props)
    this.state={
      name: '',
      code: '',
      totalLength: '',
      schedulingName: '',
      searchUrl: '',
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
          dataIndex: 'deptName'
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
      choiceData: [],
      perClass: [],
      perClassYear: '',
      perClassMonth: '',
      perAdd: '',
      addperData: [],
      overtimeType: '',
      isCover: '',
      perClassName: '',
      depClassName: '',
      depClassYear: '',
      depClassMonth: '',
      depId: '',
      addId: '',
      addPerId: '',
      addPerName: '',
      choiceTable: '',
      showName: '',
      showId: ''
    }
  }

  componentDidMount() {
    this.startData()
    
  }

  startData = () =>{
    const{searchyear,searchmonth}=this.state
    let url = `${IP}${ClassSearchUrl}?page=0&size=10&year=${searchyear}&month=${searchmonth}&recordType=Administrative`
    getfun(url).then(res =>this.setState({data:res.content,totalLength:res.totalElements})).catch(err => console.log(err))
  }

  searchData = () =>{
    const{searchmonth,searchyear,name,code,schedulingName} = this.state
    let url = `${IP}${ClassSearchUrl}?page=0&size=10&empName=${name}&storeCode=${code}&schedulingName=${schedulingName}&year=${searchyear}&month=${searchmonth}&recordType=Administrative`
    getfun(url).then(res =>this.setState({data:res.content, totalLength:res.totalElements})).catch(err =>console.log(err))
  }

  changePage = (page, pageSize) =>{
    const {searchmonth,searchyear,name,code,schedulingName, searchUrl} =this.state
    console.log(page)
    console.log(pageSize)
    let aa = searchUrl === '' ? `${IP}${ClassSearchUrl}?page=${page-1}&size=${pageSize}&month=${searchmonth}&year=${searchyear}&empName=${name}&storeCode=${code}&schedulingName=${schedulingName}&recordType=Administrative` : `${searchUrl}&page=${page-1}&size=${pageSize}&month=${searchmonth}&year=${searchyear}&empName=${name}&storeCode=${code}&schedulingName=${schedulingName}&recordType=Administrative`
    let url = aa
    getfun(url).then(res => {
      console.log(res.content)
      this.setState({data: res.content,totalLength:res.totalElements})
      console.log('执行到这里')
    }).catch(err => {
      console.log(err)
    })  
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
    let searchUrl = `${IP}${ClassSearchUrl}?page=0&size=10&${item}&year=${ayear}&month=${amonth}&recordType=Administrative`
    console.log(searchUrl)
    this.setState({searchUrl:`${IP}${ClassSearchUrl}?${item}`})
    getfun(searchUrl).then(res => this.setState({data: res.content})).catch(err => console.log)

  }

  onChangeMonth = (date, dateString) =>{
    // console.log(date._d.getFullYear() + date._d.getMonth()) 
    this.setState({searchyear: date._d.getFullYear(),searchmonth:date._d.getMonth()+1})
  }

  onChangePerClassMonth = (date, dateString) =>{
    this.setState({perClassYear: date._d.getFullYear(),perClassMonth:date._d.getMonth()+1})
  }
  onChangeDepClassMonth = (date, dateString) =>{
    this.setState({depClassYear: date._d.getFullYear(),depClassMonth:date._d.getMonth()+1})
    let perUrl = `${IP}/employeeScheduling/Administrative/${date._d.getFullYear()}/${date._d.getMonth()+1}`
    // console.log(perUrl)
    getfun(perUrl).then(res => this.setState({perClass:res})).catch(err =>console.log(err))
  }

  personClass = () =>{
    const {showId} = this.state
    if(showId === ''){
      alert('请勾选人员') 
    }else {
      this.setState({visible3: true})
    }
  
    const {searchmonth, searchyear} = this.state
    let perUrl = `${IP}/employeeScheduling/Administrative/${searchyear}/${searchmonth}`
    // console.log(perUrl)
    getfun(perUrl).then(res => this.setState({perClass:res})).catch(err =>console.log(err))
    let addperUrl = `${IP}/sys/dictType/SchedulingOvertimeType`
    console.log(addperUrl)
    getfun(addperUrl).then(res => this.setState({addperData: res})).catch(err =>console.log(err))
    
  }
  //部门排班初始
  depClass = () =>{
    this.setState({visible2: true})
    const {searchmonth, searchyear} = this.state
    let perUrl = `${IP}/employeeScheduling/Administrative/${searchyear}/${searchmonth}`
    // console.log(perUrl)
    getfun(perUrl).then(res => this.setState({perClass:res})).catch(err =>console.log(err))
    let addperUrl = `${IP}/sys/dictType/SchedulingOvertimeType`
    console.log(addperUrl)
    getfun(addperUrl).then(res => this.setState({addperData: res})).catch(err =>console.log(err))
  }

  choicePerClass = (value) =>{
    console.log(value)
    this.setState({perClassName: value})
  }
  choiceDepClass = (value) =>{
    console.log(value)
    this.setState({depClassName:value})
  }
  onChangePerADD = (e) =>{
    console.log(e.target.value)
    this.setState({overtimeType: e.target.value})
  }
  onChangecover = (e) =>{
    console.log(e.target.value)
    this.setState({isCover: e.target.value})
  }
  choicedPerson = (item) =>{
    console.log(item)
    this.setState({addId:item.id,addPerId:item.code, addPerName:item.name})
  }
  perClassPb = () =>{
    const {perClassYear, perClassMonth, choiceTable, perClassName, overtimeType, isCover} =this.state
    let arr = []
    arr.push(choiceTable.empId)
    let sendData ={
      isCover,
      month:perClassMonth,
      year: perClassYear,
      overtimeType,
      schedulingId:perClassName,
      userIds:arr
    }
    let postUrl = `${IP}/employeeScheduling/employee`
    postfun2(postUrl,sendData).then(res => {
      console.log(res)
      if(res ==='success'){
        this.setState({visible3: false})
        this.startData()
      }
    }).catch(err=> console.log(err))

  }
  choicedDep =(item) =>{
    console.log(item)
    this.setState({depId:item.depId})
  }
  depEnd = () =>{
    const {depClassName,depClassYear,depClassMonth, overtimeType,isCover,depId}=this.state
    let sendData ={
      isCover,
      month:depClassMonth,
      year: depClassYear,
      overtimeType,
      schedulingId:depClassName,
      deptId:depId,
      recordType:'Administrative'
    }
    console.log(sendData)
    let postUrl = `${IP}/employeeScheduling/department`
    postfun2(postUrl,sendData).then(res => {
      console.log(res)
      if(res ==='success'){
      
        this.startData()
        this.setState({visible2: false})
      }
    }).catch(err=> console.log(err))
  }

  choiceShop = (record) =>{
    console.log(record)
    this.setState({choiceTable:record,showId:record.empCode, showName:record.empName})
  }

  render(){
    const {choiceData, perClass, addperData} =this.state
    // const rowSelection = {
    //   onChange: (selectedRowKeys, selectedRows) => {
    //     console.log(selectedRows)
    //     this.setState({choiceData: selectedRows})
    //   }
    // } 
    const TagArr = []
    choiceData.forEach(item =>{
      TagArr.push(<Tag key={item.id} color="#2db7f5">{item.empName}</Tag>)
    })
    const perClassArr = []
    // console.log(perClass)
    perClass.forEach(item =>{
      perClassArr.push(<Option key={item.id} value={item.id}>{item.schedulingName}</Option>)
    })
    const addPerData = []
    addperData.forEach(item =>{
      addPerData.push(<Radio key={item.id} value={item.dictValue}>{item.dictKey}</Radio>)
    })

    const up = {
      name: 'file',
      action: `${IP}/employeeScheduling/inputEmployeeScheduling`,
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
            <CompanyThree   getThreeData= {this.getThreeData} />
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
                  <Input value={this.state.schedulingName} onChange={(e) => { this.setState({ schedulingName: e.target.value }) }} />
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
            <Col span='5'>
            <Button icon="reload" onClick={()=>this.setState({code:'',name:'',schedulingName:'',searchyear: mydate.getFullYear(),searchmonth: mydate.getMonth()+1,})}  type="primary">重置</Button>  
            </Col>
            <Col span="5">
            <Button  icon="search" onClick={this.searchData} type="primary">查询</Button>
            </Col>
          </Row>
          <hr />
            <div className="comMain">
              <h3 className="comtitle">工业园排班查询列表</h3>
                <Row type="flex" justify='space-end'>
                  <Col span="3"><Button  onClick={this.depClass}>部门排班</Button></Col>
                  {/* <Button span="3"><Button icon="warning">启用/禁用</Button></Button> */}
                  <Col span="3"><Button onClick={this.personClass} >人员排班</Button></Col>
                  <Col span="5"><a href={`${IP}/批量排班模板.xls`}><Button  >批量排班模板下载</Button></a></Col>
                  <Col span="3">
                    <Upload {...up}>
                      <Button>
                        <Icon type="upload" />批量排班
                      </Button>
                    </Upload>
                  </Col>
                </Row>
                <Table
                  style={{marginTop:20}}
                  columns={this.state.columns}
                  dataSource={this.state.data}
                  bordered
                  rowKey="id"
                  pagination={{  // 分页
                    simple: false,
                    pageSize: 10 ,
                    // current: this.state.current,
                    total: this.state.totalLength,
                    onChange: this.changePage,
                  }}
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
          onOk={this.depEnd}
          onCancel={() =>this.setState({visible2:false})}
          width={800}
        >
          <Row type="flex" justify="space-around" style={{ marginBottom: 10 }}>
            <Col span='5'><Button type='primary'>排班部门</Button></Col>
            <Col span='10'>
              <DepSearch choicedDep={this.choicedDep}/>
            </Col>
          </Row>
          <Row type="flex" justify="space-around" style={{ marginBottom: 10 }}>
            <Col span='5'><Button type='primary'>排班月份</Button></Col>
            <Col span='10'>
              <MonthPicker onChange={this.onChangeDepClassMonth} placeholder="Select month" />
            </Col>
          </Row>
          <Row type="flex" justify="space-around" style={{ marginBottom: 10 }}>
            <Col span='5'><Button type='primary'>班次名称</Button></Col>
            <Col span='10'>
              <Select style={{ width: 300 }} onChange={this.choiceDepClass}>
                {perClassArr}
              </Select>
            </Col>
          </Row>
          <Row type="flex" justify="space-around" style={{marginBottom:10}}>
            <Col span='10'>
              <RadioGroup onChange={this.onChangePerADD}>
                {addPerData}
              </RadioGroup>
            </Col>
            <Col span="5"></Col>
          </Row>
          <Row type="flex" justify="space-around" style={{marginBottom:10}}>
          <Col span='5'><Button type='primary'>是否覆盖本部门排班</Button></Col>
          <Col span='10'>
              <RadioGroup onChange={this.onChangecover}>
              <Radio  value={0}>是</Radio>
              <Radio  value={1}>否</Radio>
              </RadioGroup>
          </Col>
          </Row>
        </Modal>
        <Modal
          visible = {this.state.visible3}
          title="人员排班"
          onOk={this.perClassPb}
          onCancel={() =>this.setState({visible3:false})}
          width={800}
        >

          {/* <PersonSearch  btnshow='人员排班' choicedPerson={this.choicedPerson}/> */}
          <Row type="flex" justify="space-around" style={{marginBottom:10}}>
            <Col span='5'>
            <Button type='primary' >排班人员</Button>
            </Col>
            <Col span='10'>
            <div style={{ display: 'flex' }}>
                <Input readOnly value={this.state.showId} />
                <Input readOnly value={this.state.showName} />
                </div>
            </Col>
          </Row>
          <Row type="flex" justify="space-around" style={{marginBottom:10}}>
            <Col span='5'><Button type='primary'>班次名称</Button></Col>
            <Col span='10'>
            <Select  style={{ width: 300 }} onChange={this.choicePerClass}>
              {perClassArr}
            </Select>
            </Col>
          </Row>
          <Row type="flex" justify="space-around" style={{marginBottom:10}}>
            <Col span='5'><Button type='primary'>排班月份</Button></Col>
            <Col span='10'>
            <MonthPicker onChange={this.onChangePerClassMonth} placeholder="Select month" />
            </Col>
          </Row>
          <Row type="flex" justify="space-around" style={{marginBottom:10}}>
            <Col span='10'>
              <RadioGroup onChange={this.onChangePerADD}>
                {addPerData}
              </RadioGroup>
            </Col>
            <Col span="5"></Col>
          </Row>
          <Row type="flex" justify="space-around" style={{marginBottom:10}}>
          <Col span='5'><Button type='primary'>是否覆盖本部门排班</Button></Col>
          <Col span='10'>
              <RadioGroup onChange={this.onChangecover}>
              <Radio  value={20}>是</Radio>
              <Radio  value={0}>否</Radio>
              </RadioGroup>
          </Col>
          </Row>
        </Modal>
      </div>
    )
  }
}

export default FactoryScheduling;