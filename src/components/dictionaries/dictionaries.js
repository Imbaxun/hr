import React, { Component } from 'react';
import { Row, Col, Input, Button, Table, Modal } from 'antd';
import './dictionaries.css'
import { API } from '../../common/axiosAPI'
import { getfun, postfun2, deletefun} from '../../common/axiosFun'
const { IP, dictSerch, dictionaries} = API



class Dictionaries extends Component {
  constructor(props){
    super(props)
    this.state = {
      firstTableId: '',
      visible: false,
      visible1: false,
      tableRightId: '',
      newKey: '',
      newDescription: '',
      newVaule: '',
      description: '',
      dictKey: '',
      dictName: '',
      data1: [],
      // upDate: false,
      columns1: [
        {
          title: 'key',
          dataIndex: 'dictKey',
        },
        {
          title: 'name',
          dataIndex: 'dictName',
        },
        {
          title: '描述',
          dataIndex: 'description',
        },
      ],
      data2:[],
      columns2: [
        {
          title: 'key',
          dataIndex: 'dictKey',
        },
        {
          title: 'ID',
          dataIndex: 'dictTypeId',
        },
        {
          title: '描述',
          dataIndex: 'description',
        },
        {
          title: '值',
          dataIndex: 'dictValue',
        },
      ]
    }
  }

  componentDidMount () {
    let url = `${IP}${dictSerch}`
    getfun(url).then(res =>{
      // console.log(res)
      this.setState({data1:res.content})
    }).catch(err => {
      console.log(err)
    })
    let newUrl = `${IP}${dictionaries}`
    getfun(newUrl).then(res =>{
      console.log(res)
      this.setState({data2:res.content})
    }).catch(err=>{
      console.log(err)
    })
  }

  searchTabe = (item) => {
    // console.log(item)
    let dictTypeId = item.id
    // console.log(dictTypeId)
    let newUrl = `${IP}${dictionaries}/dictTypeId/${dictTypeId}`
    // console.log(newUrl)
    getfun(newUrl).then(res =>{
      // console.log(res)
      this.setState({data2:res,firstTableId:dictTypeId})
    }).catch(err => {
      console.log(err)
    })
  }

  searchTabe2 = (item) => {
    console.log(item)
    // let dictTypeId = item.id
    this.setState({tableRightId: item.id})
  }

  addTable2 = () => {
    const {firstTableId} = this.state
    if(firstTableId !== ''){
      this.setState({visible: true})
    }    
  }
  addTableRight = () => {
    const {firstTableId, newDescription, newKey, newVaule} = this.state
    let url =`${IP}${dictionaries}`
    let sendData = {
      description: newDescription,
      dictKey: newKey,
      dictTypeId: firstTableId,
      dictValue: newVaule
    }
    // console.log(sendData)
    postfun2(url,sendData).then(res =>{
      console.log(res)
      if(res === "success"){

        this.getSuccess()
        // this.upData()
      }
    }).catch(err =>{
      console.log(err)
    })
  }

  delTable2 = () =>{
    const {tableRightId} = this.state
    console.log(tableRightId)
    let url = `${IP}${dictionaries}/${tableRightId}`
    deletefun(url).then(res =>{
      console.log(res)
      this.getSuccess()
    }).catch(err =>{
      alert('删除失败')
      console.log(err)
    })

  }

  addTable1 = () => {
    // const {firstTableId} = this.state
    this.setState({visible1: true})  
  }

  addTableLeft = () =>{
    const {dictKey, dictName, description} = this.state
    let url =`${IP}${dictSerch}`
    let sendData = {
      description,
      dictKey,
      dictName
    }
    console.log(sendData)
    postfun2(url,sendData).then(res =>{
      console.log(res)
      if(res === "success"){
        getfun(url).then(res =>{
          // console.log(res)
          this.setState({data1:res.content, visible1:false})
        }).catch(err => {
          console.log(err)
        })
      }
    }).catch(err =>{
      alert('添加失败')
      console.log(err)
    })
  }

  delTable1 = () =>{
    const {firstTableId} = this.state
    console.log(firstTableId)
    let url = `${IP}${dictSerch}/${firstTableId}`
    console.log(url)
    deletefun(url).then(res =>{
      console.log(res)
      if(res ==="success") {
        // alert('删除成功')
        let newUrl = `${IP}${dictSerch}`
        getfun(newUrl).then(res =>{
          // console.log(res)
          this.setState({data1:res.content, visible1:false})
        }).catch(err => {
          console.log(err)
        })
      }
    }).catch(err =>{
      alert('删除失败')
      console.log(err)
    })

  }

  getSuccess = () =>{
    const{firstTableId} = this.state
    let newUrl = `${IP}${dictionaries}/dictTypeId/${firstTableId}`
    getfun(newUrl).then(res =>{
      console.log(res)
      this.setState({data2:res,visible:false},()=>{console.log(this.state.data2)})
    }).catch(err=>{
      console.log(err)
    })
  }

  render() {
    console.log('+++++')
    return (
      <div>        
      <div style={{marginBottom:20}}>
        <Row type="flex" justify="space-around">
          <Col span="10">
            <h1>数据词典</h1>
          </Col>
        </Row>
      </div>
      <hr/>
      <Row type="flex" justify="space-around">
        <Col  span="10">
        <Row type="flex" justify="space-around">
        <Col span="3">
            <Button type='primary' onClick = {this.addTable1}>新增</Button>    
          </Col>
          <Col span="3">
            <Button type='primary' onClick = {this.delTable1}>删除</Button>    
          </Col>
        </Row>
        <Table
            style={{marginTop:20}}
            columns={this.state.columns1}
            dataSource={this.state.data1}
            bordered
            size="small"
            onRow = {(record, index) =>{
              return {
                onClick: () =>{
                  this.searchTabe(record)
                }
              }
            }}
          />
        </Col>
        <Col  span="10">
        <Row type="flex" justify="space-around">
        <Col span="3">
            <Button type='primary' onClick = {this.addTable2}>新增</Button>    
          </Col>
          <Col span="3">
            <Button type='primary' onClick = {this.delTable2}>删除</Button>    
          </Col>
        </Row>
        <Table
            style={{marginTop:20}}
            columns={this.state.columns2}
            dataSource={this.state.data2}
            bordered
            size="small"
            onRow = {(record, index) =>{
              return {
                onClick: () =>{
                  this.searchTabe2(record)
                }
              }
            }}
          />
        </Col>
      </Row>
      <Modal
      title="新增选项"
      visible={this.state.visible1}
      onOk={this.addTableLeft}
      onCancel={() =>this.setState({visible1:false})}
      width={800}
      >
        <Row type="flex" justify="space-around">
          <Col span="6">
            <div style={{display:'flex'}}>
              <Button type='primary'>kye</Button>
              <Input onChange={(e) =>{this.setState({dictKey:e.target.value})}} style={{width:"300px"}} />
            </div>
          </Col>
          <Col span="6">
            <div style={{display:'flex'}}>
              <Button type='primary'>name</Button>
              <Input onChange={(e) =>{this.setState({dictName:e.target.value})}} style={{width:"300px"}} />
            </div>
          </Col>
        </Row>
        <Row type="flex" justify="space-around" style={{marginTop:20}}>
        <Col span="6">
          <div style={{display:'flex'}}>
            <Button type='primary'>描述</Button>
            <Input onChange={(e) =>{this.setState({description:e.target.value})}} style={{width:"300px"}} />
          </div>
        </Col>
        <Col span="6"></Col>
        </Row>
      </Modal>
      <Modal
      title="新增选项"
      visible={this.state.visible}
      onOk={this.addTableRight}
      onCancel={() =>this.setState({visible:false})}
      width={800}
      >
        <Row type="flex" justify="space-around">
          <Col span="6">
            <div style={{display:'flex'}}>
              <Button type='primary'>kye</Button>
              <Input onChange={(e) =>{this.setState({newKey:e.target.value})}} style={{width:"300px"}} />
            </div>
          </Col>
          <Col span="6">
            <div style={{display:'flex'}}>
              <Button type='primary'>值</Button>
              <Input onChange={(e) =>{this.setState({newVaule:e.target.value})}} style={{width:"300px"}} />
            </div>
          </Col>
        </Row>
        <Row type="flex" justify="space-around" style={{marginTop:20}}>
        <Col span="6">
          <div style={{display:'flex'}}>
            <Button type='primary'>描述</Button>
            <Input onChange={(e) =>{this.setState({newDescription:e.target.value})}} style={{width:"300px"}} />
          </div>
        </Col>
        <Col span="6"></Col>
        </Row>
      </Modal>
      </div>
    )
  }
}

export default Dictionaries;