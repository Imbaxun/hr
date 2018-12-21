import React, { Component } from 'react';
import {Row, Col,  Button, DatePicker,Select} from 'antd'
import { API } from '../../common/axiosAPI'
import './DayClock.css'

const {IP, DayClockUrl} = API
const Option = Select.Option;

class DayClock extends Component {

  constructor(props) {
    super(props)
    this.state ={
      today: '',
      state: '空',
      name: ''
    }
  }

  choiceStartDate = (date, dateString) =>{
    console.log(date, dateString);
    this.setState({today: dateString})
  }


  choiceType = (val) => this.setState({state:val})

  downLoad = () =>{
    const {today,state} = this.state
    let  downurl =`${IP}${DayClockUrl}?today=${today}&state=${state}`
    console.log(downurl)
    window.open(downurl)
  }


  render() {
    return(
      <div>
        <div className="comMain">
        <h3 className="comtitle">门店人员每日打卡查询</h3>
        </div>
        <Row type="flex" justify="space-around" style={{marginTop:30}}>
          <Col span='10'>
            <div style={{display:'flex'}}>
              <Button type='primary' >打卡时间</Button>  
              <DatePicker onChange={this.choiceStartDate} />
            </div>
          </Col>
          <Col span='10'>
          <div style={{display:'flex'}}>
              <Button type='primary' >打卡状态</Button>  
              <Select  style={{ width: 250 }} onChange={this.choiceType}>
                <Option value='正常打卡' >正常打卡</Option>
                <Option value='非正常打卡' >非正常打卡</Option>
                <Option value='未打卡' >未打卡</Option>
                <Option value='空' >&nbsp;</Option>
              </Select>
            </div>
          </Col>
        </Row>
        <Row type="flex" justify="space-around" style={{marginTop:30}}>       
          <Col span='10'><Button size='large' icon="download" onClick={this.downLoad} >导出</Button></Col>
          <Col span='10'>
          </Col>
        </Row>
      </div>
    )
  }
}

export default DayClock;
