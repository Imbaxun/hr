import React, { Component } from 'react';
import CompanyThree from '../../common/companyThree';
import {Row, Col, Input, Button, DatePicker, Table, Modal, Select, notification } from 'antd'
import './WorkOverTime.css'
import moment from 'moment';
import {getfun, postfun2,deletefun} from '../../common/axiosFun'
import { API } from '../../common/axiosAPI'
import PersonSearch from '../../common/searchPage/personSearch'
import ChoicePerson from '../../common/searchPage/choicePerson'

const { IP,FactoryBurshCardUrl} = API
const { TextArea } = Input;
const { MonthPicker } = DatePicker;
const Option = Select.Option;
const mydate = new Date()
const monthFormat = 'YYYY/MM';

class WorkOverTimeA extends Component{
constructor(props) {
  super(props);
  this.state={
    name: '',
    code: '',
    empId: '',
    totalLength: '',
    selectTree: '',
    searchyear: mydate.getFullYear(),
    searchmonth: mydate.getMonth()+1<10 ? `${ mydate.getMonth()+1}`: mydate.getMonth()+1,
    stringDate: '',
    tags: ['补刷卡日期:'],
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
        title: '门店',
        dataIndex: 'storeName'
      },
      {
        title: '加班类型',
        dataIndex: 'checkWorkTypeSonName'
      }, 
      {
        title: '开始日期',
        dataIndex: 'startDate'
      },  
      {
        title: '结束日期',
        dataIndex: 'endDate'
      },
      {
        title: '加班天数',
        dataIndex: 'days'
      }, 
      {
        title: '事由',
        dataIndex: 'reason'
      }, 
      {
        title: '来源',
        dataIndex: 'source'
      }
    ],
    data: [],
    visible1: false,
    visible2: false,
    visible3: false,
    visible4: false,
    addDate: '',
    addbqType: '',
    addReason: '',
    typeArr:[],
    addperData: '',
    addDateStart: '',
    addDateEnd: '',
    choiceTable: [],
    charDays: '',
    clearDate: false
  }
}

componentDidMount() {
  this.startData()
  let url = `${IP}/factoryhr/checkWorkType/son/5`
  getfun(url).then(res => this.setState({typeArr: res})).catch(err =>console.log(err))
}

startData = () =>{
  let url = `${IP}${FactoryBurshCardUrl}?checkWorkTypeId=5&page=0&size=10`
  getfun(url).then(res => this.setState({data: res.content,totalLength:res.totalElements})).catch(err =>console.log(err.message))
}

    //树桩查询的方法
    getThreeData = (item) =>{
      const{searchmonth, searchyear} =this.state
      // console.log(searchmonth.toString())
      let amonth =searchmonth<10? `0${searchmonth}` : `${searchmonth}`
      let ayear = searchyear.toString()
      // let amonth = searchmonth.toString()
      console.log(item)
      this.setState({selectTree: item})
      //点击查询的url
      let searchUrl = `${IP}${FactoryBurshCardUrl}?${item}&checkWorkTypeId=5&month=${ayear}/${amonth}`
      console.log(searchUrl)
      getfun(searchUrl).then(res => this.setState({data: res.content})).catch(err => console.log)

    }

  onChangeMonth = (date, dateString) =>{
    // console.log(date._d.getFullYear() + date._d.getMonth()) 
    this.setState({searchyear: date._d.getFullYear(),searchmonth:date._d.getMonth()+1})
  }

  choicedPerson = (item, record) =>{
    console.log(record)
    this.setState({addPerId:item.empId, addPerName:item.name, addperData:record})
  }

  onPanelChange= (value, mode) =>{
    console.log(mode)
    this.setState({year:value._d.getFullYear(),month:value._d.getMonth()+1})
  }

  changePage = (page, pageSize) =>{
    let {empId, searchyear,searchmonth,selectTree} =this.state
    if(this.state.clearDate)
    {
      empId=''
    }
    let amonth =searchmonth<10? `0${searchmonth}` : `${searchmonth}`
    let ayear = searchyear.toString()
    let url =`${IP}${FactoryBurshCardUrl}?${selectTree}&checkWorkTypeId=5&page=${page-1}&size=${pageSize}&empId=${empId}&month=${ayear}/${amonth}`
    getfun(url).then(res => this.setState({data: res.content,totalLength:res.totalElements})).catch(err =>console.log(err.message))
  }

  selectDate = (item) =>{
    const {tags} = this.state
    console.log(tags)
    let selectDate = item._d.getDate().toString()
    let newArr = tags.push(selectDate)
    console.log(newArr)
    this.setState({tags: tags})
  }
  handleClose = (removedTag) => {
    const tags = this.state.tags.filter(tag => tag !== removedTag);
    console.log(tags);
    this.setState({ tags });
  }
  bqtype = (item) =>{
    console.log(item)
    this.setState({addbqType:item})
  }
  // bskType = (item) =>{
  //   console.log(item)
  //   this.setState({addbskType: item})
  // }
  choiceShop = (item) =>{
    console.log(item)
  }

  getpepple = (item) =>{
    this.setState({clearDate:false})
    this.setState({code:item.empCode,name:item.empName, empId:item.empId})
  }
  searchData = () =>{
    let {empId, searchyear,searchmonth, selectTree} = this.state
    if(this.state.clearDate)
    {
      empId=''
    }
    let amonth =searchmonth<10? `0${searchmonth}` : `${searchmonth}`
    let ayear = searchyear.toString()
    let url = `${IP}${FactoryBurshCardUrl}?${selectTree}&checkWorkTypeId=5&empId=${empId}&month=${ayear}/${amonth}`
    console.log(url)
    getfun(url).then(res =>this.setState({data:res.content})).catch(err =>console.log(err))
  }

  addBSdate = (date, dateString) =>{
    // console.log(date._d)
    let year = date._d.getFullYear()
    let month =  date._d.getMonth()+1<10 ? `0${ date._d.getMonth()+1}`: date._d.getMonth()+1
    let day = date._d.getDate()<10 ? `0${ date._d.getDate()}`: date._d.getDate()
    let aa = `${year}/${month}/${day}`
    console.log(aa)
    this.setState({addDate:aa})
  }
  addBS = () =>{
    // this.setState({visible1:true})
    const {addDate,  addbqType ,addReason, addperData}= this.state
    let sendData ={
      reason:addReason,
      empId:addperData.empId,
      companyId: addperData.companyId,
      deptId: addperData.deptId,
      days:'1',
      source:'人资',
      startDate:addDate,
      endDate:addDate,
      month:addDate,
      storeId: addperData.storeId,
      checkWorkTypeId:5,
      checkWorkTypeSonId:addbqType
    }
    let url =`${IP}/factoryhr/checkWorkHandle`

    if(addDate === '' || addperData.empId === '') {
      alert('请填入完整信息')
    }else{
      postfun2(url, sendData).then(res =>{
        if(res ==='success'){
          alert('新增成功')
          this.setState({visible1:false})
          this.startData()
        }
      }).catch(err => console.log(err))
    }
  }

  delTbale = () =>{
    const {choiceTable} =this.state
    if(choiceTable.length === 0) {
      notification['error']({
        message: '请勾选删除信息',
        description: '发生错误',
      });
    }else{
      let newArr = []
      choiceTable.forEach(item =>{
        let id = item.id
        newArr.push(id)
      })
      let idnumber = newArr.toString()
      let url = `${IP}/factoryhr/checkWorkHandle/${idnumber}`
      deletefun(url).then(res =>{
        if(res === 'success'){
          alert('删除成功')
          this.setState({visible2:false, choiceTable: []})
          this.startData()
        }
      }).catch(err =>console.log(err))
    }

  }

render() {
  const {typeArr} =this.state
  const rowSelection = {
    onChange: (selectedRowKeys, selectedRows) => {
      // console.log(`selectedRowKeys: ${selectedRowKeys}`, 'selectedRows: ', selectedRows);
      this.setState({choiceTable:selectedRows})
    }
  } 
  const newTypeArr = []
  typeArr.forEach(item =>{
    newTypeArr.push(
      <Option key={item.id} value={item.id}>{item.name}</Option>
    )
  })
  return(
    <div>
        <Row type="flex" justify="space-around">
          <Col span="5">
            <CompanyThree   getThreeData= {this.getThreeData}/>
          </Col>
          <Col span="18">
          <Row type="flex" justify="space-around" style={{marginBottom:20}}>
              <Col span="5">
              <ChoicePerson getpepple={this.getpepple} clearDate= {this.state.clearDate}/>
              </Col>
              <Col span="8">
                <div style={{ display: 'flex' }}>
                  <Button type='primary' >加班月份</Button>
                  <MonthPicker onChange={this.onChangeMonth} defaultValue={moment(`${this.state.searchyear}/${this.state.searchmonth}`, monthFormat)} format={monthFormat} />
                </div>
              </Col>
          </Row>
            <Row type="flex" justify="center"  style={{marginBottom:10}}>
            <Col span="5">
            <Button>去组织架构</Button>
            </Col>
            <Col span='5'>
            <Button icon="reload" onClick={()=>this.setState({clearDate:true})}  type="primary">重置</Button>  
            </Col>
            <Col span="5">
            <Button  icon="search" onClick={this.searchData} type="primary">查询</Button>
            </Col>
          </Row>
          <hr />
            <div className="comMain">
              <h3 className="comtitle">加班管理列表</h3>
                <Row type="flex" justify='space-end'>
                  <Col span="3"><Button onClick={() => this.setState({visible1:true})} >新增</Button></Col>
                  {/* <Col span="3"><Button  >编辑</Button></Col> */}
                  {/* <Button span="3"><Button icon="warning">启用/禁用</Button></Button> */}
                  <Col span="3"><Button onClick={this.delTbale} >删除</Button></Col>
                </Row>
                <Table
                  style={{marginTop:20}}
                  columns={this.state.columns}
                  dataSource={this.state.data}
                  bordered
                  scroll={{ x: 1300 }}
                  rowSelection={rowSelection}
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
          title="新增加班处理"
          onOk={this.addBS}
          onCancel={() =>this.setState({visible1:false})}
          width={1000}
        >
        <Row>
          <Col span="14">
          <PersonSearch  btnshow='人员姓名' choicedPerson={this.choicedPerson}/>
          <Row type="flex" justify="space-around">
            <Col span='12'>
            <div style={{ display: 'flex' }}>
            <Button type='primary' >请选择</Button>
            <DatePicker onChange={this.addBSdate} />
            {/* <RangePicker onChange={this.addBSdate} /> */}
            </div>
            </Col>
            <Col span='4'></Col>
          </Row>
          </Col>
          <Col span="8">
            <div style={{ display: 'flex',marginBottom:20 }}>
            <Button type='primary' >加班类型</Button>
              <Select  style={{ width: 120 }} onChange={this.bqtype}>
                {newTypeArr}
              </Select>
            </div>
            <div style={{ display: 'flex',marginBottom:20 }}>
            <Button type='primary' >加班事由</Button>
              <TextArea onChange={(e) =>{this.setState({addReason: e.target.value})}} autosize={{ minRows: 4, maxRows: 6 }}/>
            </div>
          </Col>
        </Row>
        </Modal>
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
export default WorkOverTimeA;