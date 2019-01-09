import React, { Component } from 'react'
import { Row, Col, Input, Button, Table,DatePicker, Modal  } from 'antd';
import{getfun, postfun2, deletefun, putfun} from '../../common/axiosFun'
import {API} from '../../common/axiosAPI'
import './HolidaySeting.css'
const { TextArea } = Input;
const { MonthPicker, RangePicker } = DatePicker;
const { IP, HolidaySet} = API
const mydate = new Date()


class HolidaySeting extends Component{
  constructor(props){
    super(props)
    this.state = {
      schedulingName : '',
      month: '',
      year: '',
      choiceData: [],
      tableData:[],
      columns: [
        {
          title: '假日名称',
          dataIndex: 'name',
        }, 
        {
          title: '开始日期',
          dataIndex: 'startDate',
        }, 
        {
          title: '结束日期',
          dataIndex: 'endDate',
        }, 
        {
          title: '放假天数',
          dataIndex: 'day',
        },
        {
          title: '备注',
          dataIndex: 'remark',
        }
      ],
      visible: false,
      searchyear: mydate.getFullYear(),
      searchmonth: mydate.getMonth()+1<10 ? `0${ mydate.getMonth()+1}`: mydate.getMonth()+1,
      addDateStart: '',
      addDateEnd: '',
      charDays: '',
      addschedulingName: '',
      addReason: '',
      addmonth: '',
      addyear: '',
      changeName: '',
      changeReason: '',
      changemonth: '',
      changeyear: '',
      changeDateStart: '',
      changeDateEnd: '',
      changeDays: '',
      choiceName: '',
      choiceReson: ''
    }

  }

  componentDidMount() {
    this.startData()
  }

  startData = () =>{
    let url = `${IP}${HolidaySet}/s`
    console.log(url)
    getfun(url).then(res =>{
      console.log(res)
      this.setState({tableData:res})
    }).catch(err =>console.log(err))
  }  

  onChangeMonth= (date, dateString) =>{
    // console.log(date._d.getFullYear())
    let year = date._d.getFullYear()
    let month = date._d.getMonth()+1<10 ? `0${date._d.getMonth()+1}` :`${date._d.getMonth()+1}`
    console.log(year)
    console.log(month)
    this.setState({month:month,year:year})
  }

  searchData = () =>{
    const {month, year, schedulingName} =this.state
    let url = `${IP}${HolidaySet}/search?name=${schedulingName}&month=${month}&year=${year}`
    console.log(url)
    getfun(url).then(res =>{
      if(res.totalElements === 0){
        this.setState({tableData:[]})
      }else{
        this.setState({tableData:res.content})
      }
    } ).catch(err =>console.log(err))
  }

  delData = () =>{
    const {choiceData} =this.state
    let newArr = []
    choiceData.forEach(item =>{
      let id = item.id
      newArr.push(id)
    })
    let idnumber = newArr.toString()
    let url = `${IP}${HolidaySet}/${idnumber}`
    deletefun(url).then(res =>{
      if(res === 'success'){
        alert('删除成功')
        this.startData()
      }
    }).catch(err =>console.log(err))
  }
  

 
  addBSdate = (date, dateString) =>{
    console.log(date)
    console.log(dateString)
    let year = date[0]._d.getFullYear()
    let month =  date[0]._d.getMonth()+1<10 ? `0${ date[0]._d.getMonth()+1}`: date[0]._d.getMonth()+1
    let day = date[0]._d.getDate()<10 ? `0${ date[0]._d.getDate()}`: date[0]._d.getDate()
    let start = `${year}/${month}/${day}`
    let year1 = date[1]._d.getFullYear()
    let month1 =  date[1]._d.getMonth()+1<10 ? `0${ date[1]._d.getMonth()+1}`: date[1]._d.getMonth()+1
    let day1 = date[1]._d.getDate()<10 ? `0${ date[1]._d.getDate()}`: date[1]._d.getDate()
    let end = `${year1}/${month1}/${day1}`
    // console.log(aa)
    let aa = date[1]._d.getTime()-date[0]._d.getTime()
    let bb = parseInt(aa/(1000*60*60*24),10)
    console.log(bb)
    this.setState({addmonth:month,addyear: year,addDateStart:start,addDateEnd:end,charDays:bb})
  }

  changeDate = (date, dateString) =>{
    let year = date[0]._d.getFullYear()
    let month =  date[0]._d.getMonth()+1<10 ? `0${ date[0]._d.getMonth()+1}`: date[0]._d.getMonth()+1
    let day = date[0]._d.getDate()<10 ? `0${ date[0]._d.getDate()}`: date[0]._d.getDate()
    let start = `${year}/${month}/${day}`
    let year1 = date[1]._d.getFullYear()
    let month1 =  date[1]._d.getMonth()+1<10 ? `0${ date[1]._d.getMonth()+1}`: date[1]._d.getMonth()+1
    let day1 = date[1]._d.getDate()<10 ? `0${ date[1]._d.getDate()}`: date[1]._d.getDate()
    let end = `${year1}/${month1}/${day1}`
    // console.log(aa)
    let aa = date[1]._d.getTime()-date[0]._d.getTime()
    let bb = parseInt(aa/(1000*60*60*24),10)
    console.log(start)
    this.setState({changemonth:month,changeyear: year,changeDateStart:start,changeDateEnd:end,changeDays:bb})
  }

  addClass = () =>{
    this.setState({visible:false})
    const{addDateEnd,addDateStart,addschedulingName,charDays, addReason, addyear, addmonth} = this.state
    let sendData = {
      day: charDays,
      startDate: addDateStart,
      endDate: addDateEnd,
      month: addmonth,
      name:addschedulingName,
      remark:addReason,
      year:addyear
    }
    let url = `${IP}${HolidaySet}`
    postfun2(url,sendData).then(res =>{
      if(res === 'success'){
        alert('新增成功')
        this.startData()
      }
    }).catch(err =>console.log(err))
  }
  

  changeData = () =>{
    this.setState({visible1:false})
    const {choiceData,changeName,changeReason,changemonth,changeyear,changeDateStart,changeDateEnd,changeDays} =this.state
    console.log(changeDateStart)
    let sendDate ={
      createTime:choiceData[0].createTime,
      day: changeDays === ''? choiceData[0].day:changeDays,
      endDate: changeDateEnd === ''? choiceData[0].endDate:changeDateEnd,
      id: choiceData[0].id,
      isDeleted: choiceData[0].isDeleted,
      month: changemonth === ''? choiceData[0].month:changemonth,
      name: changeName === '' ? choiceData[0].name:changeName,
      remark: changeReason === '' ? choiceData[0].remark:changeReason,
      sort: choiceData[0].sort,
      startDate: changeDateStart === '' ? choiceData[0].startDate:changeDateStart,
      state: choiceData[0].state,
      updateTime: choiceData[0].updateTime,
      year: changeyear === ''? choiceData[0].year:changeyear
    }
    let  url = `${IP}${HolidaySet}/${choiceData[0].id}`
    putfun(url,sendDate).then(res =>{
      if(res === 'success'){
        alert('编辑成功')
        this.startData()
      }
    }).catch(err =>console.log(err))
  }

  change = () =>{
    const{choiceData} = this.state
    if(choiceData.length === 0){
      alert('请选择编辑内容')
    }else{
      this.setState({visible1:true,choiceName:choiceData[0].name, choiceReson:choiceData[0].remark})
    }
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
                <Button type='primary' >假日名称</Button>
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
          <h3 className="comtitle">假日维护列表</h3>
          <Row type="flex" justify="end">
            <Col span="2"><Button icon="plus" onClick={() =>this.setState({visible:true})} >新增</Button></Col>
            <Col span="2"><Button icon="edit" onClick={this.change}>编辑</Button></Col>
            {/* <Button span="3"><Button icon="warning">启用/禁用</Button></Button> */}
            <Col span="2"><Button icon="delete" onClick={this.delData} >删除</Button></Col>
          </Row>
          <Table
            style={{marginTop:20}}
            columns={this.state.columns}
            dataSource={this.state.tableData}
            bordered
            rowKey="id"
            rowSelection={rowSelection}
          />
          <Modal 
            title="新增假日"
            visible={this.state.visible}
            onOk={() =>this.addClass()}
            onCancel={() =>this.setState({visible:false})}
            width={1200}
          >
          <Row type="flex" justify="space-around">
            <Col span="8">
                <div style={{ display: 'flex',marginBottom:20,width:300 }}>
                  <Button type='primary' >节假日名称</Button>
                  <Input  onChange={(e) => { this.setState({ addschedulingName: e.target.value }) }} />
                </div>
                <div style={{ display: 'flex' }}>
                  <Button type='primary' >节假日日期</Button>
                  <RangePicker onChange={this.addBSdate} />
                </div>
            </Col>
            <Col span='8'>
            <div style={{ display: 'flex',marginBottom:20 }}>
            <Button type='primary' >请假事由</Button>
              <TextArea onChange={(e) =>{this.setState({addReason: e.target.value})}} autosize={{ minRows: 4, maxRows: 6 }}/>
            </div>
            </Col>
          </Row>
          </Modal>

          <Modal 
            title="编辑假日"
            visible={this.state.visible1}
            onOk={() =>this.changeData()}
            onCancel={() =>this.setState({visible1:false})}
            width={1200}
          >
          <Row type="flex" justify="space-around">
            <Col span="8">
                <div style={{ display: 'flex',marginBottom:20,width:300 }}>
                  <Button type='primary' >节假日名称</Button>
                  <Input defaultValue={this.state.choiceName}   onChange={(e) => { this.setState({ changeName: e.target.value }) }} />
                  
                </div>
                <div style={{ display: 'flex' }}>
                  <Button type='primary' >节假日日期</Button>
                  <RangePicker onChange={this.changeDate} />
                </div>
            </Col>
            <Col span='8'>
            <div style={{ display: 'flex',marginBottom:20 }}>
            <Button type='primary' >请假事由</Button>
              <TextArea defaultValue={this.state.choiceReson}  onChange={(e) =>{this.setState({changeReason: e.target.value})}} autosize={{ minRows: 4, maxRows: 6 }}/>
            </div>
            </Col>
          </Row>
          </Modal>
          
        </div>
      </div>
    )
  }

}

export default HolidaySeting;