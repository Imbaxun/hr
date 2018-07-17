import React, { Component } from 'react';
import { Button, Row, Col, Input, Icon  } from 'antd'
import {postfun} from '../../common/axiosFun'
import {API} from '../../common/axiosAPI'





class Login extends Component {

  constructor(porps) {
    super(porps)
    this.state ={
      userId: '',
      password: ''
    }
  }

  login() {    
    const {userId,password} = this.state
    const { IP, login} = API
    let url = `${IP}${login}`
    // console.log(this.props)
    this.props.history.push('/main');
    let sendData = {
      userId,
      password
    }
    console.log(sendData)
    postfun(url,sendData).then(res => {
      console.log(res)
      if (res.success) {
        this.props.history.push('/main');
      } else {
        alert(res.errorInfo)
      }
    }).catch(err => {
      console.log(err)
    })
  
  }

  onChangeuserId = (e) =>{
    this.setState({
      userId: e.target.value
    })
    // console.log(this.state.userName)
  }

  onChangePassword = (e) =>{
    this.setState({
      password: e.target.value
    })
  }

  render() {
    return (
      <div>
        <Row style = {{marginTop: '100px'}}>
          <Col span={10}></Col>
          <Col span={4}>
            <h1 style={{textAlign: 'center'}}>人资系统</h1> 
            <Input
            prefix={<Icon type="user" style={{ color: 'rgba(0,0,0,.25)' }} />}
            style={{ marginBottom:'20px'}}
            onChange={this.onChangeuserId}  
            placeholder="请输入账号" /> 
            <Input 
            prefix={<Icon type="key" style={{ color: 'rgba(0,0,0,.25)' }} />}
            style={{ marginBottom:'20px'}} 
            onChange={this.onChangePassword} 
            type="password"
            placeholder="请输入密码" />
            <Button type="primary" onClick={this.login.bind(this)} style={{width: '16.6vw'}}>登录</Button>     
          </Col>
          <Col span={10}></Col>
        </Row>
      </div>
    );
  }
}


export default Login;