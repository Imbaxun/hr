import React, { Component } from 'react';
import { Row, Col, Input, Button, Table, Popconfirm,Modal, Select } from 'antd';
import './duty.css'
import { API } from '../../common/axiosAPI'
import { getfun, postfun2, putfun, deletefun} from '../../common/axiosFun'
const { IP, searchbm} = API
const { TextArea } = Input




class duty extends Component {
  constructor(porps){
    super(porps)
    this.state = {
      positionName: '',
      positionCode: '',
      positionDescription: '',
      addpositionLevelId: '',
      addpositionName: '',
      addpositionDescription: '',
      changepositionName: '',
      changepositionLevelId: '',
      changepositionDescription: '',
      region: '',
      visible: false,
      changeShow: false,
      checkperson: false,
      perId:'',
      perName: '',
      totalLength: '',
      choiceData:[
        {
          key: '',
          cid: '',
          cname: '',
          pid: '',
          pname: '',
          rid: '',
          tcom: '',
          state: ''
        }
      ],
      data: [],
      columns: [
      {
        title: '职务编码',
        dataIndex: 'positionCode',
      }, {
        title: '职务名称',
        dataIndex: 'positionName',
      }, {
        title: '职务描述',
        dataIndex: 'positionDescription',
      }, {
        title: '职等',
        dataIndex: 'positionLevelName',
      }, {
        title: '启用状态',
        dataIndex: 'state',
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
    let url = `${IP}${searchbm}?page=0&size=10`
    // console.log(url)
    getfun(url).then(res => {
      console.log(res)
      let newArr = []
      res.content.forEach(item => {
        if(item.state === '0') {
          item.state = '未启用'
        }else{
          item.state = '已启用'
        }
        newArr.push(item)
        // console.log(newArr)
        this.setState({data: newArr,totalLength:res.totalElements})
      });
      // this.setState({data:res.content})
    }).catch(err => {
      console.log(err)
    })
  }


  handleDelete = (key) => {
    const data = [...this.state.data];
    let aa = data[key-1];
    if(aa.state === '已启用') {
      aa.state = '已禁用'
      data.splice(key-1,1,aa)
      this.setState({data:data})
    }else{
      aa.state = '已启用'
      data.splice(key-1,1,aa)
      this.setState({data:data})
    }
  }

  addCom = () =>{
    this.setState({visible: true})
  }

  addDuty = () =>{
    const {addpositionDescription, addpositionLevelId, addpositionName} = this.state
    let url = `${IP}${searchbm}`
    let sendData = {
      positionDescription: addpositionDescription,
      positionLevelId: addpositionLevelId,
      positionName: addpositionName,
      state: '10'
    }
    console.log(sendData)
    postfun2(url,sendData).then(res => {
      console.log(res)
      if(res ==='success'){
        getfun(url).then(res => {
          console.log(res)
          let newArr = []
          res.content.forEach(item => {
            if(item.state === '0') {
              item.state = '未启用'
            }else{
              item.state = '已启用'
            }
            newArr.push(item)
            // console.log(newArr)
            this.setState({data: newArr})
          });
          // this.setState({data:res.content})
        }).catch(err => {
          console.log(err)
        })
        this.setState({visible:false})
      }
    }).catch(err => {
      console.log(err)
    })

  }

  changeCom = () =>{
    // const {choiceData} = this.state
    this.setState({changeShow: true})
    // console.log(choiceData)
  }

  deletCom = () =>{
    const {choiceData} = this.state
    console.log(choiceData)
    let newArr = []
    choiceData.forEach(item =>{
      let id = item.id
      newArr.push(id)
    })
    console.log(newArr.toString())
    let idnumber = newArr.toString()
    const { IP, searchbm} = API
    let url = `${IP}${searchbm}/${idnumber}`
    console.log(url)
    deletefun(url).then(res => {
      console.log(res)
      if(res === 'success') {
        let newlur = `${IP}${searchbm}`
        getfun(newlur).then(res => {
          console.log(res)
          let newArr = []
          res.content.forEach(item => {
            if(item.state === '0') {
              item.state = '未启用'
            }else{
              item.state = '已启用'
            }
            newArr.push(item)
            // console.log(newArr)
            this.setState({data: newArr,totalLength:res.totalElements})
          });
          // this.setState({data:res.content})
        }).catch(err => {
          console.log(err)
        })
        this.setState({visible:false})
      }
    }).catch(err => {
      console.log(err)
    })  

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

  searchData = () =>{
    const {positionName,positionCode,positionDescription} = this.state
    console.log(this.state)
    const { IP, searchbm} = API
    let url = `${IP}${searchbm}?positionName=${positionName}&positionCode=${positionCode}&positionDescription=${positionDescription}`
    console.log(url)
    getfun(url).then(res => {
      console.log(res)
      let newArr = []
      res.content.forEach(item=> {
        if(item.state === '0') {
          item.state = '未启用'
        }else{
          item.state = '已启用'
        }
        newArr.push(item)
        // console.log(newArr)
        this.setState({data: newArr})
      });
    }).catch(err => {
      console.log(err)
    })  
  }

  changePage = (page, pageSize) =>{
    const {positionName,positionCode,positionDescription} = this.state
    console.log(page)
    console.log(pageSize)
    let url =`${IP}${searchbm}?page=${page-1}&size=${pageSize}&positionName=${positionName}&positionCode=${positionCode}&positionDescription=${positionDescription}`
    getfun(url).then(res => {
      console.log(res)
      let newArr = []
      res.content.forEach(item=> {
        if(item.state === '0') {
          item.state = '未启用'
        }else{
          item.state = '已启用'
        }
        newArr.push(item)
        // console.log(newArr)
        this.setState({data: newArr})
      });
    }).catch(err => {
      console.log(err)
    })
  }


  changeDuty = () =>{
    const {choiceData,changepositionDescription,changepositionName,changepositionLevelId} = this.state
    console.log(choiceData)
    let url = `${IP}${searchbm}/${choiceData[0].id}`
    let sendData = {
      positionDescription: changepositionDescription,
      positionLevelId: changepositionLevelId,
      positionName: changepositionName
    }
    putfun(url,sendData).then(res => {
      console.log(res)
      if(res ==='success'){
        getfun(url).then(res => {
          console.log(res)
          if(res ==='success'){
            getfun(url).then(res => {
              console.log(res)
              let newArr = []
              res.content.forEach(item => {
                if(item.state === '0') {
                  item.state = '未启用'
                }else{
                  item.state = '已启用'
                }
                newArr.push(item)
                // console.log(newArr)
                this.setState({data: newArr})
              });
              // this.setState({data:res.content})
            }).catch(err => {
              console.log(err)
            })
            this.setState({visible:false})
          }
        }).catch(err => {
          console.log(err)
        })
        this.setState({visible:false})
      }
    }).catch(err => {
      console.log(err)
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
          <Col span="4">
            <div style={{display:'flex'}}>
              <Button type='primary' >职务名称</Button>  
              <Input onChange={(e) =>{this.setState({positionName:e.target.value})}} />
            </div>
          </Col>
          <Col span="4">
            <div style={{display:'flex'}}>
              <Button type='primary'>职务编码</Button>  
              <Input  onChange={(e) =>{this.setState({positionCode:e.target.value})}} />
            </div>
          </Col>
          <Col span="4">
            <div style={{display:'flex'}}>
              <Button type='primary'>职务描述</Button>  
              <Input   onChange={(e) =>{this.setState({positionDescription:e.target.value})}} />
            </div>
          </Col>
          <Col span="4"><Button icon="reload" onClick={()=>this.setState({positionName:'',positionCode: '',positionDescription:''})} type="primary">重置</Button>  <Button onClick={() =>this.searchData()} icon="search" type="primary">查询</Button></Col>
        </Row>
        </div>
        <hr/>
        <div className="comMain">
          <h3 className="comtitle">职务维护列表</h3>
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
            pagination={{  // 分页
              simple: false,
              pageSize: 10 ,
              // current: this.state.current,
              total: this.state.totalLength,
              onChange: this.changePage,
            }}
          />
          <Modal
          title="新增公司"
          visible={this.state.visible}
          onOk={() =>this.addDuty()}
          onCancel={() =>this.setState({visible:false})}
          width={800}
          >
          <Row type="flex" justify="space-around" className="marbot">
            <Col span="8">
              <div style={{display:'flex'}}>
                <Button type='primary' >职务名称</Button>
                <Input  onChange={(e) =>{this.setState({addpositionName:e.target.value})}} style={{width:"300px"}} />
              </div>
            </Col>
            <Col span="8">
            </Col>
          </Row>
          <Row type="flex" justify="space-around" className="marbot">
            <Col span="20">
              <div style={{display:'flex'}}>
                <Button type='primary' >职务描述</Button>
                <TextArea onChange={(e) =>{this.setState({addpositionDescription:e.target.value})}} rows={4} />
              </div>
            </Col>
          </Row>
          <Row type="flex" justify="space-around" className="marbot">
            <Col span="8">
              <div style={{display:'flex'}}>
                <Button type='primary' >职务等级</Button>
                <Select defaultValue="职等" onChange={(e) =>{this.setState({addpositionLevelId:`${e}`})}} style={{ width: 180 }}>
                <Option value="1">1</Option>
                <Option value="2">2</Option>
              </Select>
              </div>
            </Col>
            <Col span="8">
              <div style={{display:'flex'}}>
                <Button type='primary' >启用状态</Button>
                <Input defaultValue="已启用"  style={{width:"300px"}} />
              </div>
            </Col>
          </Row>
          {/* <Row>
            <Col span="20">
              {this.choicePerson()}
            </Col>
          </Row> */}
          </Modal>
          <Modal
          title="编辑职务"
          visible={this.state.changeShow}
          onOk={() =>this.changeDuty()}
          onCancel={() =>this.setState({changeShow:false})}
          width={800}
          >
          <Row type="flex" justify="space-around" className="marbot">
            <Col span="8">
              <div style={{display:'flex'}}>
                <Button type='primary' >职务名称</Button>
                <Input  onChange={(e) =>{this.setState({changepositionName:e.target.value})}} style={{width:"300px"}} />
              </div>
            </Col>
            <Col span="8">
            </Col>
          </Row>
          <Row type="flex" justify="space-around" className="marbot">
            <Col span="20">
              <div style={{display:'flex'}}>
                <Button type='primary' >职务描述</Button>
                <TextArea onChange={(e) =>{this.setState({changepositionDescription:e.target.value})}} rows={4} />
              </div>
            </Col>
          </Row>
          <Row type="flex" justify="space-around" className="marbot">
            <Col span="8">
              <div style={{display:'flex'}}>
                <Button type='primary' >职务等级</Button>
                <Select defaultValue="职等" onChange={(e) =>{this.setState({changepositionLevelId:`${e}`})}} style={{ width: 180 }}>
                <Option value="1">1</Option>
                <Option value="2">2</Option>
              </Select>
              </div>
            </Col>
            <Col span="8">
            </Col>
          </Row>
          </Modal>
        </div>
      </div>
    )
  }

}

export default duty;