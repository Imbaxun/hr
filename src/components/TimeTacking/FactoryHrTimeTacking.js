import React, { Component } from 'react';
import {Row, Col, Table } from 'antd'
import { API } from '../../common/axiosAPI'
import { getfun} from '../../common/axiosFun'
const { IP, FactoryHrTacking} = API


class TimeTacking extends Component{
  constructor(props){
    super(props)
    this.state = {
      columnLeft:[
        {
          title: '序号',
          dataIndex: 'id',
        },
        {
          title: '类型',
          dataIndex: 'name',
        }
      ],
      dataLeft:[],
      dataRight:[],
      columnRight: [
        {
          title: '序号',
          dataIndex: 'id',
        },
        {
          title: '类型',
          dataIndex: 'name',
        }
      ]
    }
  }

  componentDidMount() {
    let url =`${IP}${FactoryHrTacking}`
    getfun(url).then(res =>this.setState({dataLeft:res})).catch(err => console.log(err))
  }

  choiceleft = (record,index) =>{
    console.log(record)
    let aa = record.id
    let url =`${IP}${FactoryHrTacking}/son/${aa}`
    getfun(url).then(res =>this.setState({dataRight:res})).catch(err =>console.log(err))
  }

  render() {
    return(
      <div>
        <div style={{marginBottom:20}}>
        <Row type="flex" justify="space-around">
          <Col span="10">
            <h1>考勤处理类型</h1>
          </Col>
        </Row>
      </div>
      <hr/>
      <Row type="flex" justify="space-around">
        <Col span='8'>
        <Table 
        columns={this.state.columnLeft} 
        dataSource={this.state.dataLeft}
        rowKey='id'
        pagination={{  // 分页
          simple: false,
          pageSize: 10 ,
        }}
        onRow = {(record, index) =>{
          return {
            onClick: () =>{
              this.choiceleft(record,index)
            }
          }
        }}
        />
        </Col>
        <Col span='10'>
        <Table 
        columns={this.state.columnRight} 
        dataSource={this.state.dataRight}
        rowKey='id'
        pagination={{  // 分页
          simple: false,
          pageSize: 10 ,
        }}
        />
        </Col>
      </Row>
      </div>
    )
  }
}

export default TimeTacking;