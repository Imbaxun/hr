import React, { Component } from 'react';
import { Row, Col, Input, Button, Table, Popconfirm,Modal, Select } from 'antd';
import './department.css'
import {API} from '../../common/axiosAPI'
import {getfun} from '../../common/axiosFun'
const { IP, searchbm} = API



class department extends Component {
  constructor(porps){
    super(porps)
    this.state = {
      comName: '',
      comId: '',
      region: '',
      visible: false,
      changeShow: false,
      checkperson: false,
      perId:'',
      perName: '',
      choiceData:[
        {
          key: '',
          cid: '',
          cname: '',
          pid: '',
          pname: '',
          rid: '',
          tcom: '',
          isState: ''
        }
      ],
      data: [],
      columns: [{
        title: '序号',
        dataIndex: 'key'
      },
      {
        title: '部门编号',
        dataIndex: 'cid',
      }, {
        title: '部门名称',
        dataIndex: 'cname',
      }, {
        title: '负责人工号',
        dataIndex: 'pid',
      }, {
        title: '负责人',
        dataIndex: 'pname',
      }, {
        title: '大区',
        dataIndex: 'rid',
      }, {
        title: '上级公司',
        dataIndex: 'tcom',
      }, {
        title: '启用状态',
        dataIndex: 'isState',
        render: (text, record) => {
        return (
          <Popconfirm title="是否修改?" onConfirm={() => this.handleDelete(record.key)}>
        <a>{text}</a>
        </Popconfirm>
        )}
      }]
    }

  }

  componentDidMount() {
    let url = `${IP}${searchbm}`
    console.log(url)
    getfun(url).then(res => {
      console.log(res)
    }).catch(err => {
      console.log(err)
    })
  }


  handleDelete = (key) => {
    const data = [...this.state.data];
    let aa = data[key-1];
    if(aa.isState === '已启用') {
      aa.isState = '已禁用'
      data.splice(key-1,1,aa)
      this.setState({data:data})
    }else{
      aa.isState = '已启用'
      data.splice(key-1,1,aa)
      this.setState({data:data})
    }
  }

  addCom = () =>{
    this.setState({visible: true})
  }

  changeCom = () =>{
    const {choiceData} = this.state
    this.setState({changeShow: true})
    console.log(choiceData)
  }

  deletCom = () =>{
    const {choiceData} = this.state
    console.log(choiceData)
  }

  onChangeperId = (e) =>{
    this.setState({
      perId: e.target.value
    })
  }
  onChangeperName = (e) =>{
    this.setState({
      perName: e.target.value
    })
  }

  choicePerson = () =>{
    const {checkperson} = this.state
    if(checkperson) {
      return (
        <Table
            columns={this.state.columns}
            dataSource={this.state.data}
            bordered
          />
      )
    }
    
  }

  render() {
    const Option = Select.Option;
    const rowSelection = {
      onChange: (selectedRowKeys,selectedRows) => {
        console.log(selectedRows);
        this.setState({choiceData:selectedRows})
      }
    }    
    return (
      <div>
        <div style={{marginBottom:20}}>
        <Row type="flex" justify="space-around">
          <Col span="4"><Input value={this.state.comName} onChange={(e) =>{this.setState({comName:e.target.value})}} placeholder="请输入公司名称..." /></Col>
          <Col span="4"><Input value={this.state.comId} onChange={(e) =>{this.setState({comId:e.target.value})}} placeholder="请输入公司编号..." /></Col>
          <Col span="4"><Input value={this.state.region} onChange={(e) =>{this.setState({region:e.target.value})}}  placeholder="请输入大区名称..." /></Col>
          <Col span="4"><Button icon="reload" onClick={()=>this.setState({comName:'',comId: '',region:''})} type="primary">重置</Button>  <Button onClick={() =>{console.log(this.state)}} icon="search" type="primary">查询</Button></Col>
        </Row>
        </div>
        <hr/>
        <div className="comMain">
          <h3 className="comtitle">部门维护列表</h3>
          <Row type="flex" justify="end">
            <Col span="2"><Button icon="plus" onClick={()=>this.addCom()}>新增</Button></Col>
            <Col span="2"><Button icon="edit" onClick={()=>this.changeCom()}>编辑</Button></Col>
            {/* <Button span="3"><Button icon="warning">启用/禁用</Button></Button> */}
            <Col span="2"><Button icon="delete" onClick={() =>this.deletCom()}>删除</Button></Col>
          </Row>
          <Table
            style={{marginTop:20}}
            columns={this.state.columns}
            dataSource={this.state.data}
            bordered
            rowSelection={rowSelection}
          />
          <Modal
          title="新增公司"
          visible={this.state.visible}
          onOk={() =>this.setState({visible:false})}
          onCancel={() =>this.setState({visible:false})}
          width={800}
          >
          <Row type="flex" justify="space-around" className="marbot">
            <Col span="8"><Input  placeholder="请输入公司名称..." /></Col>
            <Col span="8"><Input placeholder="请输入公司编码..." /></Col>
          </Row>
          <Row type="flex" justify="space-around" className="marbot">
            <Col span="8">
              <div style={{display:'flex'}}>
                <Button type='primary' >负责人</Button>
                <Input onChange={this.onChangeperId}  style={{width:"90px"}} />
                <Input onChange={this.onChangeperName} style={{width:"90px"}} />
              </div>
            </Col>
            <Col span="8"><Button type='primary' onClick={() =>this.setState({checkperson:true})} ghost >查询</Button></Col>
          </Row>
          <Row>
            <Col span="20">
              {this.choicePerson()}
            </Col>
          </Row>
          <Row type="flex" justify="space-around" className="marbot">
            <Col span="8">
              <div style={{display:'flex'}}>
                <Button type='primary' >大区</Button>
                <Select defaultValue="亚太地区" style={{ width: 180 }}>
                <Option value="亚太地区">亚太地区</Option>
                <Option value="欧美地区">欧美地区</Option>
              </Select>
              </div>
            </Col>
            <Col span="8">
              <div style={{display:'flex'}}>
                <Button type='primary' >上级公司</Button>
                <Select defaultValue="周黑鸭企业发展有限公司" style={{ width: 160 }}>
                <Option value="周黑鸭食品工业园有限公司">周黑鸭食品工业园有限公司</Option>
                <Option value="周黑鸭企业发展有限公司">周黑鸭企业发展有限公司</Option>
              </Select>
              </div>
            </Col>
          </Row>
          </Modal>
          <Modal
          title="编辑公司"
          visible={this.state.changeShow}
          onOk={() =>this.setState({changeShow:false})}
          onCancel={() =>this.setState({changeShow:false})}
          width={800}
          >
          <Row type="flex" justify="space-around" className="marbot">
            <Col span="8"><Input placeholder={this.state.choiceData[0].cname}/></Col>
            <Col span="8"><Input readOnly placeholder={this.state.choiceData[0].cid} /></Col>
          </Row>
          <Row type="flex" justify="space-around" className="marbot">
            <Col span="8">
              <div style={{display:'flex'}}>
                <Button type='primary' onClick={() =>this.setState({checkperson:true})} >负责人</Button>
                <Input readOnly placeholder={this.state.choiceData[0].pid} style={{width:"90px"}} />
                <Input readOnly placeholder={this.state.choiceData[0].pname} style={{width:"90px"}} />
              </div>
            </Col>
            <Col span="8"><Button type='primary' onClick={() =>this.setState({checkperson:true})} ghost >查询</Button></Col>
          </Row>
          <Row type="flex" justify="space-around" className="marbot">
            <Col span="8">
              <div style={{display:'flex'}}>
                <Button type='primary' >大区</Button>
                <Select defaultValue={this.state.choiceData[0].rid} style={{ width: 180 }}>
                <Option value="亚太地区">亚太地区</Option>
                <Option value="欧美地区">欧美地区</Option>
              </Select>
              </div>
            </Col>
            <Col span="8">
              <div style={{display:'flex'}}>
                <Button type='primary' >上级公司</Button>
                <Select defaultValue={this.state.choiceData[0].tcom} style={{ width: 160 }}>
                <Option value="周黑鸭食品工业园有限公司">周黑鸭食品工业园有限公司</Option>
                <Option value="周黑鸭企业发展有限公司">周黑鸭企业发展有限公司</Option>
              </Select>
              </div>
            </Col>
          </Row>
          </Modal>
        </div>
      </div>
    )
  }

}

export default department;