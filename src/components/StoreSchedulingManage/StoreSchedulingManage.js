import React, { Component } from 'react'
import { Row, Col, Input, Button, Table,DatePicker, Modal ,Calendar, Tag, Tooltip, TimePicker } from 'antd';
import{getfun, postfun2, deletefun, putfun} from '../../common/axiosFun'
import {API} from '../../common/axiosAPI'
import './StoreSchedulingManage.css'
import moment from 'moment';
const { MonthPicker} = DatePicker;
const { IP, ClassManageUrl} = API

class StoreSchedulingManage extends Component{
  constructor(props){
    super(props)
    this.state = {
      schedulingName : '',
      month: '',
      year: '',
      choiceData: '',
      totalLength: '',  
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
          title: '工作天数',
          dataIndex: 'workingDays',
        },
        {
          title: '工作时长',
          dataIndex: 'workHours',
        },
        {
          title: '班次描述',
          dataIndex: 'description',
        }
      ],
      visible: false,
      addschedulingName: '',
      tags: ['休息日:'],
      addData: [
        {
          workStart:1533086040935,
          workEnd: 1533086050935,
          isDefault: 1,
          workStartDate: '8:30',
          workEndDate: '18:00',
          day: '',
          description: ''
        }
      ],
      columns1: [
        {
          title: '上班时间',
          dataIndex: 'workStartDate',
        },
        {
          title: '下班时间',
          dataIndex: 'workEndDate',
        },
        {
          title: '适用日期',
          dataIndex: 'day',
        },
        {
          title: '备注',
          dataIndex: 'description',
        }
      ],
      addTimeStart:'',
      timeStart: '',
      addTimeEnd: '',
      timeEnd: '',
      addDay: '',
      description: '',
      delIndex: '',
      visible1: false,
      freeClassName: '',
      freeDays: '',
      freeYear: '',
      freeMonth: '',
      freeTimes: '',
      workStart: '',
      workEnd: '',
      choiceTable: '',
      visible2: false,
      changefreeClassName: '',
      changefreeDays: '',
      changefreeYear: '',
      changefreeMonth: '',
      changefreeTimes: '',
      changeworkEnd: '',
      changewofkStart: '',
      changeDescription: '',
    }

  }

  componentDidMount() {
    this.startData()
  }

  startData = () =>{
    let url = `${IP}${ClassManageUrl}?page=0&size=10&schedulingType=store`
    getfun(url).then(res =>{
      console.log(res)
      let arr = res.content
      arr.forEach(item =>{
        item.resDate = `${item.year}/${item.month}`
      })
      console.log(arr)
      this.setState({tableData:arr})
    }).catch(err =>console.log(err))
  }  

  changePage = (page, pageSize) =>{
    const {ClassManageUrl, month, year, schedulingName} =this.state
    console.log(page)
    console.log(pageSize)
    let url =`${IP}${ClassManageUrl}?page=${page-1}&size=${pageSize}&month=${month}&year=${year}&schedulingName=${schedulingName}&schedulingType=store`
    getfun(url).then(res => {
      console.log(res.content)
      this.setState({tableData: res.content,totalLength:res.totalElements})
      console.log('执行到这里')
    }).catch(err => {
      console.log(err)
    })  
  }

  onChangeMonth= (date, dateString) =>{
    // console.log(date._d.getFullYear())
    let year = date._d.getFullYear()
    let month = date._d.getMonth()+1
    console.log(year)
    console.log(month)
    this.setState({month:month,year:year})
  }

  searchData = () =>{
    const {month, year, schedulingName} =this.state
    let url = `${IP}${ClassManageUrl}?schedulingName=${schedulingName}&month=${month}&year=${year}&page=0&size=10&schedulingType=store`
    /*
    getfun(url).then(res => this.setState({tableData:res.content})).catch(err =>console.log(err))
    */
   getfun(url).then(res => {
        for(let i in res.content)
        {
          let item=res.content[i]
          item["resDate"] = item.year+"/"+item.month
        }
        this.setState({tableData:res.content})
      }
    ).catch(err =>console.log(err))

  }

  onPanelChange= (value, mode) =>{
    console.log(value._d.getFullYear())
    this.setState({year:value._d.getFullYear(),month:value._d.getMonth()+1})
  }

  delTable = () =>{
    const {choiceTable} = this.state
    if(choiceTable === ''){
      alert('请选中删除的班次')
    }else{
      let url =`${IP}/scheduling/${choiceTable.id}`
      deletefun(url).then(res =>{
        console.log(res)
        if(res === 'success'){
          alert('删除成功')
          this.startData()
          this.setState({ choiceTable: []})
        }else{
          alert(res)
        }
      }).catch(err => console.log(err))
    }
  
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

  startTime = (time, timeString) =>{
    console.log(timeString)
    let timeStart = time._d.getTime()
    this.setState({timeStart: timeString, addTimeStart: timeStart})
  }

  endTime = (time, timeString) =>{
    console.log(timeString)
    let timeEnd = time._d.getTime()
    this.setState({timeEnd: timeString, addTimeEnd: timeEnd})
  }

  addDate = (date, dateString) =>{
    console.log(date._d.getDate())
    this.setState({addDay:date._d.getDate()})
  }

  addDayType = () =>{
    const {description, addDay, timeEnd, addTimeEnd, addTimeStart, timeStart, addData} = this.state
    let data = {
      description,
      workStart:addTimeStart,
      workEnd: addTimeEnd,
      isDefault: 0,
      workStartDate: timeStart,
      workEndDate: timeEnd,
      day:addDay
    }
    addData.push(data)
    this.setState({addData:addData})
  }

  delAddData = () =>{
    const {addData, delIndex} =this.state
    addData.splice(delIndex,1)
    console.log(addData)
    this.setState({addData:addData})
  }

  addClass = () =>{
    const {addschedulingName,year,month,tags,addData} = this.state
    console.log(tags)
    let newArr1= []
    tags.forEach(item =>{
      let aaa = {
        day:item,
        isWorking:0,
        itemType:0,
      }
      newArr1.push(aaa)
    })
    console.log(newArr1.slice(1))
    let arr2 =[]
    addData.forEach(item =>{
      let bbb = {
        day: item.day,
        isDefault: 0,
        workStart: item.workStart,
        workEnd: item.workEnd,
        description:item.description
      }
      arr2.push(bbb)
    })
    let sendData = {
      schedulingName: addschedulingName,
      schedulingSource: '人资',
      year,
      month,
      schedulingItemList: newArr1.slice(1),
      schedulingRemarkList: arr2,
      schedulingType: 'store'
    }
    console.log(sendData)
    let url = `${IP}${ClassManageUrl}`
    postfun2(url, sendData).then(res => {
      if(res === 'success') {
        alert('新增成功')
        this.setState({visible: false})
        this.startData()
      }else{
        alert(res)
      }
    }).catch(err => console.log(err))
  }

  freeChangeMonth = (date, dateString) =>{
    console.log(date)
    let year = date._d.getFullYear()
    let month = date._d.getMonth() + 1 >9? date._d.getMonth() + 1: `0${date._d.getMonth() + 1}`
    this.setState({freeYear:year, freeMonth:month})
  }
  changefreeChangeMonth = (date) =>{
    let year = date._d.getFullYear()
    let month = date._d.getMonth() + 1 >9? date._d.getMonth() + 1: `0${date._d.getMonth() + 1}`
    this.setState({changefreeYear:year, changefreeMonth:month})
  }
  startFree = (time, timeString) =>{
    console.log(timeString)
    this.setState({workStart:timeString})
  }
  changestartFree = (time, timeString) =>{
    this.setState({changeworkStart:timeString})
  }
  endFree = (time, timeString) =>{
    console.log(timeString)
    this.setState({workEnd:timeString})
  }
  changeendFree = (time, timeString) =>{
    this.setState({changeworkEnd:timeString})
  }
  addFreeClass = () =>{
    const{freeClassName,workStart,workEnd,freeYear,freeDays,freeMonth,description,freeTimes} =this.state
    let sendData= {
      description: description,
      endDate: workEnd,
      isDefault: 0,
      month: freeMonth,
      schedulingName: freeClassName,
      schedulingSource: "人资",
      schedulingType: "store",
      startDate: workStart,
      workingDays: freeDays,
      year: freeYear,
      workHours: freeTimes
    }
    console.log(sendData)
    let url = `${IP}${ClassManageUrl}`
    postfun2(url, sendData).then(res => {
      if(res === 'success') {
        alert("新增自由班次成功")
        this.setState({visible1: false})
        this.startData()
      }
    }).catch(err => console.log(err))

  }
  changeFreeData = () =>{
    const{choiceTable} = this.state
    if(choiceTable === '') {
      alert('请选择需要编辑的班次')
    }else{
      this.setState({visible2:true})
    }
  }

  changeFreeClass = () =>{
    const {choiceTable,changefreeMonth, changefreeYear, changefreeDays, changefreeClassName, changeworkEnd, changewofkStart, changeDescription, changefreeTimes} =this.state
    let sendData = {
      description: changeDescription ===''? choiceTable.description : changeDescription,
      endDate: changeworkEnd ===''? choiceTable.endDate : changeworkEnd,
      month: changefreeMonth ===''? choiceTable.month : changefreeMonth,
      schedulingName: changefreeClassName ===''? choiceTable.schedulingName : changefreeClassName,
      startDate: changewofkStart ===''? choiceTable.startDate : changewofkStart,
      workingDays: changefreeDays ===''? choiceTable.workingDays : changefreeDays,
      year: changefreeYear ===''? choiceTable.year : changefreeYear,
      workHours: changefreeTimes === '' ? choiceTable.workHours : changefreeTimes,
      id:choiceTable.id
    }
    console.log(sendData)
    let url = `${IP}/scheduling/${choiceTable.id}`
    putfun(url, sendData).then(res =>{
      if(res === 'success'){
        alert("编辑成功")
        this.setState({visible1: false})
        this.startData()
      }else{console.log(res)}
    }).catch(err =>console.log(err))
  } 

  render() {


    const {tags} = this.state
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
          <h3 className="comtitle">门店班次维护列表</h3>
          <Row type="flex" justify="end">
            {/* <Col span="2"><Button icon="plus" onClick={() =>this.setState({visible:true})} >新增</Button></Col> */}
            <Col span="4"><Button icon="plus" onClick={() =>this.setState({visible1:true})} >新增自由班次</Button></Col>
            <Col span="2"><Button icon="edit" onClick={this.changeFreeData} >编辑</Button></Col>
            {/* <Button span="3"><Button icon="warning">启用/禁用</Button></Button> */}
            <Col span="2"><Button icon="delete" onClick={this.delTable}>删除</Button></Col>
          </Row>
          <Table
            style={{marginTop:20}}
            columns={this.state.columns}
            dataSource={this.state.tableData}
            bordered
            rowKey='id'
            pagination={{  // 分页
              simple: false,
              pageSize: 10 ,
              // current: this.state.current,
              total: this.state.totalLength,
              onChange: this.changePage,
            }}
            onRow={(record,index) =>{
              return {
                onClick: () =>{
                  console.log(record)
                  this.setState({choiceTable: record})
                }
              }
            }}
          />
          <Modal 
            title="新增班次"
            visible={this.state.visible}
            onOk={() =>this.addClass()}
            onCancel={() =>this.setState({visible:false})}
            width={1200}
          >
          <Row type="flex" justify="space-around">
            <Col span="7">
                <div style={{ display: 'flex',marginBottom:20,width:300 }}>
                  <Button type='primary' >班次名称</Button>
                  <Input  onChange={(e) => { this.setState({ addschedulingName: e.target.value }) }} />
                </div>
              <div style={{ width: 300, border: '1px solid #d9d9d9', borderRadius: 4 }}>
                <p>请选择当月休息日期：</p>
                <hr/>
                <Calendar defaultValue={moment('2018-01-01')} fullscreen={false} onPanelChange={this.onPanelChange} onSelect={this.selectDate}/>
                <hr/>
                <div style={{marginLeft:5,marginBottom:3}}>
                    {tags.map((tag, index) => {
                      const isLongTag = tag.length > 20;
                      const tagElem = (
                        <Tag
                          key={tag}
                          color="#87d068"
                          style={{ marginBottom: 2 }}
                          closable={index !== 0}
                          afterClose={() => this.handleClose(tag)}
                        >
                          {isLongTag ? `${tag.slice(0, 20)}...` : tag}
                        </Tag>
                      );
                      return isLongTag ? (
                        <Tooltip title={tag} key={tag}>
                          {tagElem}
                        </Tooltip>
                      ) : (
                          tagElem
                        );
                    })}
                </div>
              </div>
            </Col>
            <Col span="17">
              <div>
                  <Row type="flex" justify="space-around" style={{marginBottom:10}}>
                    <Col span="14">
                      <Button type='primary' >班次时间段</Button>
                      <TimePicker onChange={this.startTime} defaultOpenValue={moment('08:30:00', 'HH:mm:ss')} />——<TimePicker onChange={this.endTime} defaultOpenValue={moment('18:00:00', 'HH:mm:ss')} />,
                  </Col>
                    <Col span="8">
                      <Button type='primary'>适用日期</Button>
                      <DatePicker onChange={this.addDate} />
                    </Col>
                  </Row>
                  <Row type="flex" justify="space-around">
                    <Col span='14'>
                      <div style={{ display: 'flex' }}>
                        <Button type='primary' >备注</Button>
                        <Input onChange={(e) => { this.setState({ description: e.target.value }) }} />
                      </div>
                    </Col>
                    <Col span="8">
                      <Button type='primary' onClick={this.addDayType}>添加</Button>  <Button type='primary' onClick={this.delAddData}>删除</Button>
                    </Col>
                  </Row>
                  <hr />
                  <Table
                    style={{ marginTop: 20 }}
                    columns={this.state.columns1}
                    dataSource={this.state.addData}
                    bordered
                    rowKey='id'
                    onRow={(record,index) =>{
                      return {
                        onClick: () =>{
                          console.log(index)
                          this.setState({delIndex: index})
                        }
                      }
                    }}
                  />
              </div>
            </Col>
          </Row>
          </Modal>
          <Modal 
            title="新增自由班次"
            visible={this.state.visible1}
            onOk={() =>this.addFreeClass()}
            onCancel={() =>this.setState({visible1:false})}
            width={1200}
          >
          <Row type="flex" justify="space-around">
            <Col span='10'>
              <div style={{ display: 'flex',marginBottom:20,width:300 }}>
                  <Button type='primary' >班次名称</Button>
                  <Input  onChange={(e) => { this.setState({ freeClassName: e.target.value }) }} />
              </div>
              <div style={{ display: 'flex',marginBottom:20,width:300 }}>
                <Button type='primary' >班次月份</Button>
                <MonthPicker onChange={this.freeChangeMonth} placeholder="Select month" />
              </div>
              <div style={{ display: 'flex',marginBottom:20,width:300 }}>
                  <Button type='primary' >天数</Button>
                  <Input  onChange={(e) => { this.setState({ freeDays: e.target.value }) }} />
              </div>
            </Col>
            <Col span='10'>
              <div style={{ display: 'flex',marginBottom:20,width:300 }}>
                <Button type='primary' >上班时间</Button>
                <TimePicker onChange={this.startFree} defaultOpenValue={moment('00:00:00', 'HH:mm:ss')} />
              </div>
              <div style={{ display: 'flex',marginBottom:20,width:300 }}>
                <Button type='primary' >下班时间</Button>
                <TimePicker onChange={this.endFree} defaultOpenValue={moment('00:00:00', 'HH:mm:ss')} />
              </div>
              <div style={{ display: 'flex',marginBottom:20,width:300 }}>
                  <Button type='primary' >工作时长</Button>
                  <Input  onChange={(e) => { this.setState({ freeTimes: e.target.value }) }} />
              </div>
            </Col>
          </Row>
          <Row type="flex" justify="space-around">
            <Col span='10'>
              <div style={{ display: 'flex' }}>
                <Button type='primary' >备注</Button>
                <Input onChange={(e) => { this.setState({ description: e.target.value }) }} />
              </div>
            </Col>
            <Col  span='10'>
            </Col>
          </Row>
          </Modal>
          <Modal 
            title="编辑自由班次"
            visible={this.state.visible2}
            onOk={() =>this.changeFreeClass()}
            onCancel={() =>this.setState({visible2:false})}
            width={1200}
          >
          <Row type="flex" justify="space-around">
            <Col span='10'>
              <div style={{ display: 'flex',marginBottom:20,width:300 }}>
                  <Button type='primary' >班次名称</Button>
                  <Input defaultValue={this.state.choiceTable === '' ? '' : this.state.choiceTable.schedulingName}  onChange={(e) => { this.setState({ changefreeClassName: e.target.value }) }} />
              </div>
              <div style={{ display: 'flex',marginBottom:20,width:300 }}>
                <Button type='primary' >班次月份</Button>
                <MonthPicker onChange={this.changefreeChangeMonth} placeholder={`${this.state.choiceTable.year}-${this.state.choiceTable.month}`} />
              </div>
              <div style={{ display: 'flex',marginBottom:20,width:300 }}>
                  <Button type='primary' >天数</Button>
                  <Input defaultValue={this.state.choiceTable === '' ? '' : this.state.choiceTable.workingDays}  onChange={(e) => { this.setState({ changefreeDays: e.target.value }) }} />
              </div>
            </Col>
            <Col span='10'>
              <div style={{ display: 'flex',marginBottom:20,width:300 }}>
                <Button type='primary' >上班时间</Button>
                <TimePicker onChange={this.changestartFree} placeholder={this.state.choiceTable.startDate} defaultOpenValue={moment('00:00:00', 'HH:mm:ss')} />
              </div>
              <div style={{ display: 'flex',marginBottom:20,width:300 }}>
                <Button type='primary' >下班时间</Button>
                <TimePicker onChange={this.changeendFree} placeholder={this.state.choiceTable.endDate} defaultOpenValue={moment('00:00:00', 'HH:mm:ss')} />
              </div>
            </Col>
          </Row>
          <Row type="flex" justify="space-around">
            <Col span='10'>
              <div style={{ display: 'flex' }}>
                <Button type='primary' >备注</Button>
                <Input defaultValue={this.state.choiceTable === '' ? '' : this.state.choiceTable.description} onChange={(e) => { this.setState({ changeDescription: e.target.value }) }} />
              </div>
            </Col>
            <Col  span='10'>
            </Col>
          </Row>
          </Modal>
        </div>
      </div>
    )
  }

}

export default StoreSchedulingManage;