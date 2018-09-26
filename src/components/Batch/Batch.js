import React, { Component } from 'react';
import {Row, Col, Button, DatePicker, Table } from 'antd'
import {getfun} from '../../common/axiosFun'
import { API } from '../../common/axiosAPI'
import  './Batch.css'
const { IP,BatchUrl} = API

const { MonthPicker } = DatePicker;
const monthFormat = 'YYYY/MM';

class Batch extends Component {
  constructor(props) {
    super(props)
    this.state = {
      searchyear: '',
      searchmonth: '',
      columns:[
        {
          title: '年',
          dataIndex: 'recordYear'
        },
        {
          title: '月',
          dataIndex: 'recordMonth'
        },
        {
          title: '类型 ',
          dataIndex: 'batchType'
        },
        {
          title: '状态',
          dataIndex: 'batchState'
        },
        {
          title: '开始时间',
          dataIndex: 'startTimeView'
        },
        {
          title: '结束时间',
          dataIndex: 'endTimeView'
        }
      ],
      data:[]
    }
  }

  componentDidMount() {
    // let url = `${IP}${BatchUrl}`
    // // let url = `${IP}/punchRecordBatch/batchRecordByRecordYearAndRecordMonth/2018/9`
    // console.log(url)
    // getfun(url).then(res =>console.log(res)).catch(err =>console.log(err))
    this.start()
  }

  start = () =>{
    let url = `${IP}${BatchUrl}`
    getfun(url).then(res =>{
      if(res.msg === '查询成功'){
        let arr = []
        res.data.forEach(item => {
          if(item.batchType === 'month') {
            item.batchType = '批处理月份'
          }else if(item.batchType === 'year'){
            item.batchType = '批处理年度'
          }else{
            item.batchType = '批处理日'
          }
          arr.push(item)
        })        
        this.setState({data:arr})
      }else{
        console.log(res.msg)
      }
    }).catch(err =>console.log(err))
  }

  onChangeMonth = (date, dateString) =>{
    // console.log(date._d.getFullYear() + date._d.getMonth()) 
    console.log(date)
    if(date === null) {
      console.log('222')
      this.setState({searchyear: '',searchmonth:''})
    }else{
      this.setState({searchyear: date._d.getFullYear(),searchmonth:date._d.getMonth()+1})
    }
  }

  search =() =>{
    const{searchyear,searchmonth } =this.state
    let url = `${IP}/punchRecordBatch/batchRecordByRecordYearAndRecordMonth/${searchyear}/${searchmonth}`
    getfun(url).then(res =>{
      console.log(res)
      if(res.code === 200) {
        alert('批处理正在执行中')
        this.start()
      }else{
        console.log(res.msg)
      }
    }).catch(err =>console.log(err))
  }

  IsSearch = () =>{
    const{data} = this.state
    let i = 0
    data.forEach(item =>{
      if(item.batchState !== 'Completed'){
        alert('请等待全部执行完毕后再执行')
      }else{
        i ++
      }
    })
    console.log(i)
    if(i === 3) {
      this.search()
    }
  }

  Batching = () =>{
    this.start()
  }

  render() {
    return(
      <div>
        <h3 className="comtitle">手动批处理</h3>
        <Row type="flex" justify="space-around">
        <Col span="10">
          <div style={{ display: 'flex' }}>
            <Button type='primary' >月份</Button>
            <MonthPicker onChange={this.onChangeMonth}  format={monthFormat} />
          </div>
        </Col>
        <Col span="5">
          <Button onClick={this.IsSearch}>执行批处理</Button>
        </Col>
        <Col span="5">
          <Button onClick={this.Batching}>查看处理状态</Button>
        </Col>
        </Row>
        <Table
          style={{marginTop:20}}
          columns={this.state.columns}
          dataSource={this.state.data}
          bordered
          align="center"
          rowKey="id"
        />
      </div>
    )
  }
}

export default Batch;