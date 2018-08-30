import React, { Component } from 'react';
import { Row, Col, Input, Button, Table, Modal } from 'antd';
import './jobLever.css'
import { API } from '../../common/axiosAPI'
import { getfun, postfun2, putfun, deletefun} from '../../common/axiosFun'
const { IP, joblever} = API
const { TextArea } = Input



class jobLever extends Component {
  constructor(porps){
    super(porps)
    this.state = {
      levelName: '',
      levelCode: '',
      description: '',
      addpositionLevelId: '',
      addlevelName: '',
      adddescription: '',
      changelevelName: '',
      changepositionLevelId: '',
      changedescription: '',
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
        title: '职等编码',
        dataIndex: 'levelCode',
      }, {
        title: '职等名称',
        dataIndex: 'levelName',
      }, {
        title: '职等描述',
        dataIndex: 'description',
      }
      // ,{
      //   title: '启用状态',
      //   dataIndex: 'state',
      //   render: (text, record) => {
      //   return (
      //     <Popconfirm title="是否修改?" onConfirm={() => this.handleDelete(record)}>
      //   <a>{text}</a>
      //   </Popconfirm>
      //   )}
      // }
    ]
    }

  }

  componentDidMount() {
    let url = `${IP}${joblever}?page=0&size=10`
    console.log(url)
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


  handleDelete = (aa) => {
    // const data = [...this.state.data];
    // let aa = data[key-1];
    console.log(aa)
    let newState = ''
    if(aa.state === '未启用') {
      newState = '1'
    } else {
      newState = '0'
    }
    let url = `${IP}/positionLevel/${aa.id}/state/${newState}`
    // `${IP}company/${aa.id}/state/${newState}`
    console.log(url)
    putfun(url).then(res =>{
      console.log(res)
      if(res ==='success'){
        let newulr = `${IP}${joblever}`
        getfun(newulr).then(res => {
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

  addCom = () =>{
    this.setState({visible: true})
  }

  addDuty = () =>{
    const {adddescription, addlevelName} = this.state
    let url = `${IP}${joblever}`
    let sendData = {
      description: adddescription,
      levelName: addlevelName,
      state: '1'
    }
    console.log(sendData)
    postfun2(url,sendData).then(res => {
      console.log(res)
      if(res ==='success'){
        this.setState({visible:false})
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
    const { IP, joblever} = API
    let url = `${IP}${joblever}/${idnumber}`
    console.log(url)
    deletefun(url).then(res => {
      console.log(res)
      if(res === 'success') {
        let newlur = `${IP}${joblever}`
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
    const {levelName,levelCode,description} = this.state
    console.log(this.state)
    const { IP, joblever} = API
    let url = `${IP}${joblever}?levelName=${levelName}&levelCode=${levelCode}&description=${description}`
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
    const {levelName,levelCode,description} = this.state
    console.log(page)
    console.log(pageSize)
    let url =`${IP}${joblever}?page=${page-1}&size=${pageSize}&levelName=${levelName}&levelCode=${levelCode}&description=${description}`
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
    const {choiceData,changedescription,changelevelName,changepositionLevelId} = this.state
    console.log(choiceData)
    let url = `${IP}${joblever}/${choiceData[0].id}`
    let sendData = {
      description: changedescription,
      positionLevelId: changepositionLevelId,
      levelName: changelevelName
    }
    putfun(url,sendData).then(res => {
      console.log(res)
      if(res ==='success'){
        this.setState({changeShow:false})
        console.log(this.state.visible)
        let newUrl = `${IP}${joblever}`
        getfun(newUrl).then(res => {
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
              <Button type='primary' >职等名称</Button>  
              <Input onChange={(e) =>{this.setState({levelName:e.target.value})}} />
            </div>
          </Col>
          <Col span="4">
            <div style={{display:'flex'}}>
              <Button type='primary'>职等编码</Button>  
              <Input  onChange={(e) =>{this.setState({levelCode:e.target.value})}} />
            </div>
          </Col>
          <Col span="4">
            <div style={{display:'flex'}}>
              <Button type='primary'>职等描述</Button>  
              <Input   onChange={(e) =>{this.setState({description:e.target.value})}} />
            </div>
          </Col>
          <Col span="4"><Button icon="reload" onClick={()=>this.setState({levelName:'',levelCode: '',description:''})} type="primary">重置</Button>  <Button onClick={() =>this.searchData()} icon="search" type="primary">查询</Button></Col>
        </Row>
        </div>
        <hr/>
        <div className="comMain">
          <h3 className="comtitle">职等维护列表</h3>
          {/* <Row type="flex" justify="end">
            <Col span="2"><Button icon="plus" onClick={()=>this.addCom()}>新增</Button></Col>
            <Col span="2"><Button icon="edit" onClick={()=>this.changeCom()}>编辑</Button></Col>
            <Col span="2"><Button icon="delete" onClick={() =>this.deletCom()}>删除</Button></Col>
          </Row> */}
          <Table
            style={{marginTop:20}}
            columns={this.state.columns}
            dataSource={this.state.data}
            bordered
            rowKey = 'id'
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
          title="新增职务"
          visible={this.state.visible}
          onOk={() =>this.addDuty()}
          onCancel={() =>this.setState({visible:false})}
          width={800}
          >
          <Row type="flex" justify="space-around" className="marbot">
            <Col span="8">
              <div style={{display:'flex'}}>
                <Button type='primary' >职等名称</Button>
                <Input  onChange={(e) =>{this.setState({addlevelName:e.target.value})}} style={{width:"300px"}} />
              </div>
            </Col>
            <Col span="8">
            </Col>
          </Row>
          <Row type="flex" justify="space-around" className="marbot">
            <Col span="20">
              <div style={{display:'flex'}}>
                <Button type='primary' >职等描述</Button>
                <TextArea onChange={(e) =>{this.setState({adddescription:e.target.value})}} rows={4} />
              </div>
            </Col>
          </Row>
          <Row type="flex" justify="space-around" className="marbot">
            <Col span="8">
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
                <Button type='primary' >职等名称</Button>
                <Input  onChange={(e) =>{this.setState({changelevelName:e.target.value})}} style={{width:"300px"}} />
              </div>
            </Col>
            <Col span="8">
            </Col>
          </Row>
          <Row type="flex" justify="space-around" className="marbot">
            <Col span="20">
              <div style={{display:'flex'}}>
                <Button type='primary' >职等描述</Button>
                <TextArea onChange={(e) =>{this.setState({changedescription:e.target.value})}} rows={4} />
              </div>
            </Col>
          </Row>
          </Modal>
        </div>
      </div>
    )
  }

}

export default jobLever;