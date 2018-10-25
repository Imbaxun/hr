import React, { Component } from 'react';
import {Row, Col,  Button, DatePicker} from 'antd'
import { API } from '../../common/axiosAPI'

const {IP, EmpDaysUrl} = API

class EmpDays extends Component {

  constructor(props) {
    super(props)
    this.state ={
      startDate: '',
      endDate: '',
      name: ''
    }
  }

  choiceStartDate = (date, dateString) =>{
    // console.log(date, dateString);
    this.setState({startDate: dateString})
  }

  choiceEndDate = (date, dateString) =>{
    // console.log(date, dateString);
    this.setState({endDate: dateString})
  }

  choiceType = (val) => this.setState({state:val})

  downLoad = () =>{
    const {startDate,endDate} = this.state
    let  downurl =`${IP}${EmpDaysUrl}?startTime=${startDate}&endTime=${endDate}`
    // console.log(downurl)
    window.open(downurl)
  }


  render() {
    return(
      <div>
        <div className="comMain">
        <h3 className="comtitle">门店人员每日打卡状态报表</h3>
        </div>
        <Row type="flex" justify="space-around" style={{marginTop:30}}>
          <Col span='10'>
            <div style={{display:'flex'}}>
              <Button type='primary' >起始时间</Button>  
              <DatePicker onChange={this.choiceStartDate} />
            </div>
          </Col>
          <Col span='10'>
            <div style={{display:'flex'}}>
              <Button type='primary' >结束时间</Button>  
              <DatePicker onChange={this.choiceEndDate} />
            </div>
          </Col>
        </Row>
        <Row type="flex" justify="space-around" style={{marginTop:30}}>
          <Col span='10'><Button size='large' icon="download" onClick={this.downLoad} >导出</Button></Col>
          <Col span='10'></Col>
        </Row>
      </div>
    )
  }
}

export default EmpDays;
