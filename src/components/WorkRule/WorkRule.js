import React, { Component } from 'react'
import { Row, Col, Input, Button, Checkbox, notification  } from 'antd';
import './WorkRule.css'
import {API} from '../../common/axiosAPI'
import{ getfun, putfun2} from '../../common/axiosFun'
const {IP, WorkRuleUrl} =API

class workRule extends Component {
  constructor(props){
    super(props)
    this.state ={
      read:true,
      readColr:'#ececec',
      time1: '',
      time2: '',
      time3: '',
      time4: '',
      time5: '',
      time6: '',
      time7: '',
      time8: ''
    }
  }
  
  componentDidMount(){
    this.start()
  }

  start = () =>{
    let url = `${IP}${WorkRuleUrl}/s`
    getfun(url).then(res =>this.setState({
      time1:res[0].time,
      time2:res[1].time,
      time3:res[2].time,
      time4:res[3].time,
      time5:res[4].time,
      time6:res[5].time,
      time7:res[6].time,
      time8:res[7].time
    })).catch(err =>console.log(err))
  }
 
  onChange = (e) =>{
    console.log(e.target.checked)
    this.setState({
      read:!e.target.checked,
      readColr: e.target.checked ? '#000' : '#ececec'
    })
  }

  inputChange(key, val) {
    let tmpObj = {}
    tmpObj[key] = val
    this.setState(tmpObj)
  }

  submit =() =>{
    const{time1,time2,time3,time4,time5,time6,time7,time8,time9,time10,time11} = this.state
    let sendArr = []
    sendArr[0] = time1
    sendArr[1] = time2
    sendArr[2] = time3
    sendArr[3] = time4
    sendArr[4] = time5
    sendArr[5] = time6
    sendArr[6] = time7
    sendArr[7] = time8
    let url = `${IP}${WorkRuleUrl}`
    putfun2(url ,sendArr).then(res =>{
      if(res === 'success'){
         notification['success']({
          message: 'success',
          description: '保存成功',
        });
        this.start()
      }else{
        notification['error']({
          message: 'ERROR',
          description: '保存失败',
        });
      }
    }).catch(err =>console.log(err))
  }

  render() {
    const{time1,time2,time3,time4,time5,time6,time7,time8} = this.state
    return(
      <div>
        <div className="comMain">
        <h3 className="comtitle">考勤规则设置</h3>
        <Row>
          <Col>
            <div style={{display:'flex'}}>
            <h4>上班时间:</h4>
            <Input defaultValue={time1}  onChange={e => this.inputChange('time1', e.target.value)} style={{width:80,marginLeft:10,marginRight:10}}/>&nbsp;&nbsp;&nbsp;
            <h4>下班时间:</h4>
            <Input defaultValue={time2}  onChange={e => this.inputChange('time2', e.target.value)}  style={{width:80,marginLeft:10,marginRight:10}}/>
            <h4></h4>
            </div>       
          </Col>
        </Row>
        <Row>
          <Col>
            <div style={{display:'flex'}}>
            <h4>签到有效时间： 上班时间前:</h4>
            <Input defaultValue={time3}  onChange={e => this.inputChange('time3', e.target.value)} style={{width:80,marginLeft:10,marginRight:10}}/>
            <h4>分钟——上班时间后:</h4>
            <Input defaultValue={time4}  onChange={e => this.inputChange('time4', e.target.value)}  style={{width:80,marginLeft:10,marginRight:10}}/>
            <h4>分钟</h4>
            </div>       
          </Col>
        </Row>
        <Row>
          <Col>
            <div style={{display:'flex',marginTop:10}}>
            <h4>签退有效时间： 下班时间前:</h4>
            <Input defaultValue={time5}  onChange={e => this.inputChange('time5', e.target.value)} style={{width:80,marginLeft:10,marginRight:10}}/>
            <h4>分钟——下班时间后:</h4>
            <Input  defaultValue={time6} onChange={e => this.inputChange('time6', e.target.value)}  style={{width:80,marginLeft:10,marginRight:10}}/>
            <h4>分钟</h4>
            </div>       
          </Col>
        </Row>
        <div style={{display:'flex',marginTop:10}}>
          <p>上班时间后</p>
          <Input  defaultValue={time7} onChange={e => this.inputChange('time7', e.target.value)}  style={{width:80,marginLeft:10,marginRight:10}}/>
          <p>分钟，记迟到</p>
        </div>
        <div style={{display:'flex',marginTop:10}}>
          <p>下班时间前</p>
          <Input  defaultValue={time8}  onChange={e => this.inputChange('time8', e.target.value)} style={{width:80,marginLeft:10,marginRight:10}}/>
          <p>分钟，记早退</p>
        </div>
        {/*<h3 className="comtitle">加班设置（门店无效）</h3>
        <div style={{display:'flex',marginTop:10}}>
          <p>超出下班时间</p>
          <Input defaultValue={time7} onChange={e => this.inputChange('time9', e.target.value)} style={{width:80,marginLeft:10,marginRight:10}}/>
          <p>分钟，记加班</p>
        </div>
        <div style={{display:'flex',marginTop:10}}>
          <p>每日加班最大时长</p>
          <Input defaultValue={time8} onChange={e => this.inputChange('time10', e.target.value)} style={{width:80,marginLeft:10,marginRight:10}}/>
          <p>分钟</p>
        </div>
        <Checkbox onChange={this.onChange}>非工作日记加班</Checkbox>
        <div style={{display:'flex',marginTop:10}}>
          <p style={{color:`${this.state.readColr}`}}>非工作日上班满</p>
          <Input defaultValue={time9} onChange={e => this.inputChange('time11', e.target.value)}   disabled={this.state.read}  style={{width:80,marginLeft:10,marginRight:10}}/>
          <p style={{color:`${this.state.readColr}`}}>分钟,记加班</p>
        </div>*/}

        <Button type='primary' onClick={this.submit}>保存</Button>
        </div>
        
      </div>
    )
  }

}

export default workRule;