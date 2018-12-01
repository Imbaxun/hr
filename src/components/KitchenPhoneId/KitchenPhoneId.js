import React, { Component } from 'react';
import { Row, Col, Input, Button, notification } from 'antd';
import './KitchenPhoneId.css'
import{putfun} from '../../common/axiosFun'
import {API} from '../../common/axiosAPI'
const { IP, PhoneIdUrl} = API

// const openNotificationWithIcon = (type) => {
//   notification[type]({
//     message: 'Success',
//     description: '新增成功',
//   });
// };

class KitchenPhoneId extends Component {

  constructor(props) {
    super(props)
    this.state = {
      empCode: ''
    }
  }

  componentDidMount() {

  }
  remake = () =>{
    const{empCode} = this.state
    if(empCode === ''){
      notification['error']({
        message: 'Error',
        description: '请输入正确账号',
      });
    }else{
      let url = `${IP}${PhoneIdUrl}${empCode}/kitchen`
      let sendData = {
        empCode: empCode
      }
      putfun(url, sendData).then( res => {
        if(res.msg === 'success'){
          notification['success']({
            message: 'success',
            description: res.data,
          })
        }else{
          console.log(res)
        }
      }).catch(err =>{
        notification['error']({
          message: 'Error',
          description: err,
        });
      })
    }
  }


  render(){
  
    return(
      <div>
        <div className="comMain">
          <h3 className="comtitle">重置考勤APP设备</h3>
          <Row type="flex" justify="space-around"  style={{marginTop: 30}}>
            <Col span='6'>
              <div style={{display:'flex'}}>
                <Button type='primary' >账号</Button>  
                <Input  onChange={(e) =>{this.setState({empCode:e.target.value})}}  />
              </div>
            </Col>
            <Col span='10'>
            <Button type='primary' onClick={this.remake} >重置设备</Button> 
            </Col>
          </Row>
        </div>
      </div>
    )
  }

}

export default KitchenPhoneId