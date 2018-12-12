import React, { Component } from 'react';
import {Row, Col, Button, DatePicker,Input } from 'antd'
import  './BasePunchRecordSolr.css'
const {  RangePicker} = DatePicker;

class BasePunchRecordSolr extends Component {
    
    constructor(props) {
      super(props)
      this.state = {
        cardNo:'',
        userName:'',
        selectUser:false
      }
    }

    selectDate(){

    }

    render() {
        return (
            <div>
                <Row type="flex" justify="space-around" style={{marginBottom:30}}>
                    <Col span='5'>
                        <div style={{display:'flex'}}>
                        <Button type='primary'>人员</Button>
                        <Input value={this.state.cardNo} readOnly style={{ width:60}}  />
                        <Input value={this.state.userName} readOnly style={{ width:60, marginRight:10}} />
                        <Button onClick={() => this.setState({selectUser:true})}>查询</Button>
                        </div>
                    </Col>
                    <Col span='5'>
                        <RangePicker  onChange={this.selectDate} />
                    </Col>
                </Row>



                
            </div>
        )
    }


}

export default BasePunchRecordSolr;