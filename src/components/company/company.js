import React, { Component } from 'react';
import { Row, Col, Input, Button, Table, Modal, Select } from 'antd';
import './company.css'
import { API } from '../../common/axiosAPI'
import { getfun, postfun2, putfun, deletefun} from '../../common/axiosFun'
import BigAreaSearch from '../../common/searchPage/bigAreaSearch'
import CompanySearch from '../../common/searchPage/companySearch'
import PersonSearch from '../../common/searchPage/personSearch'
const { IP, searchcom, addcom} = API



class Company extends Component {
  constructor(porps){
    super(porps)
    this.state = {
      name: '',
      code: '',
      bigArea: '',
      addname: '',
      addId: '',
      addbigArea: '',
      addchargePersionId: '',
      addchargePersionName: '',
      addparentCompanyName: '',
      addparentCompanyCode: '',
      changename: '',
      changebigArea: '',
      changechargePersionId: '',
      changechargePersionName: '',
      changeparentCompanyName: '',
      visible: false,
      changeShow: false,
      checkperson: false,
      totalLength: '',
      perId:'',
      perName: '',
      choiceData:[],
      data: [],
      columns: [
      {
        title: '公司编号',
        dataIndex: 'code',
      }, {
        title: '公司名称',
        dataIndex: 'name',
      },
      //  {
      //   title: '负责人工号',
      //   dataIndex: 'chargePersionCode',
      // }, 
      // {
      //   title: '负责人',
      //   dataIndex: 'chargePersionName',
      // }, 
      {
        title: '大区',
        dataIndex: 'bigArea',
      }, {
        title: '上级公司',
        dataIndex: 'pName',
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
    let url = `${IP}${searchcom}?page=0&size=10`
    console.log(url)
    getfun(url).then(res => {
      console.log(res)
      let newArr = []
      res.content.forEach((item) => {
        // console.log(index)
        if(item.state === '0') {
          item.state = '未启用'
        }else{
          item.state = '已启用'
        }
        newArr.push(item)
        // console.log(newArr)
        this.setState({data: newArr})
      });
      this.setState({data:res.content,totalLength:res.totalElements})
    }).catch(err => {
      console.log(err)
    })
  }

  getArea = () =>{
    console.log(666)
  }

  handleDelete = (aa) => {
    // const data = [...this.state.data];
    // let aa = data[key-1];
    // console.log(aa)
    let newState = ''
    if(aa.state === '未启用') {
      newState = '1'
    } else {
      newState = '0'
    }
    let url = `${IP}/company/${aa.id}/state/${newState}`
    // `${IP}company/${aa.id}/state/${newState}`
    console.log(url)
    putfun(url).then(res =>{
      // console.log(res)
      if(res ==='success'){
        let newulr = `${IP}${searchcom}`
        getfun(newulr).then(res => {
          // console.log(res)
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
  addCompany = () =>{
    const {addId,addname, addbigArea,addparentCompanyCode, addchargePersionName, addparentCompanyName} = this.state
    let url = `${IP}${addcom}`
    let sendData = {
      name: addname,
      bigArea: addbigArea,
      // chargePersionId: addchargePersionId,
      chargePersionId: addId,
      chargePersion: addchargePersionName,
      parentCompanyName: addparentCompanyName,
      pid: addparentCompanyCode
    }
    console.log(sendData)
    postfun2(url,sendData).then(res => {
      console.log(res)
      if(res ==='success'){
        let newulr = `${IP}${searchcom}`
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


  changeCom = () =>{
    const {choiceData} = this.state
    this.setState({changeShow: true})
    console.log(choiceData)
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
    const { IP, addcom} = API
    let url = `${IP}${addcom}/${idnumber}`
    console.log(url)
    deletefun(url).then(res => {
      console.log(res)
      if(res === 'success') {
        let newlur = `${IP}${searchcom}`
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

  searchData = () =>{
    const {name,code,bigArea} = this.state
    console.log(this.state)
    const { IP, searchcom} = API
    let url = `${IP}${searchcom}?name=${name}&code=${code}&bigArea=${bigArea}`
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

  changeCompany = () =>{
    const {choiceData,changebigArea,changechargePersionId,changeparentCompanyName,changechargePersionName,changename} = this.state
    // console.log(choiceData)
    let url = `${IP}${addcom}/${choiceData[0].id}`
    let sendData = {
      id: choiceData[0].id,
      code: choiceData[0].code,
      createTime: choiceData[0].createTime,
      group: choiceData[0].group,
      isDeleted: choiceData[0].isDeleted,
      layer: choiceData[0].layer,
      name: choiceData[0].name,
      sort: choiceData[0].sort,
      state: choiceData[0].state,
      updateTime: choiceData[0].updateTime,
      bigArea: changebigArea,
      chargePersionId: changechargePersionId,
      parentCompanyName: changeparentCompanyName,
      chargePersion: changechargePersionName,
      changename:changename,
      parentCompanyCode: '0002'
    }
    putfun(url,sendData).then(res => {
      console.log(res)
      if(res ==='success'){
        let newulr = `${IP}${searchcom}`
        getfun(newulr).then(res => {
          console.log(res)
          let newArr = []
          res.content.forEach((item) => {
            // console.log(index)
            if(item.state === '0') {
              item.state = '未启用'
            }else{
              item.state = '已启用'
            }
            newArr.push(item)
            // console.log(newArr)
            this.setState({data: newArr})
          });
          this.setState({data:res.content})
          this.setState({visible:false})
        }).catch(err => {
          console.log(err)
        })
        this.setState({visible:false})
      }
    }).catch(err => {
      console.log(err)
    })
  }

  onChangeperName = (e) =>{
    this.setState({
      addname: e.target.value
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
            rowKey='code'
            size="small"
            onRow={(record) => ({
              onClick: () => {
                console.log(record)
                // let {pid, pname} = record
              },
            })}
          />
      )
    }
    
  }

  choicedArea = (item) =>{
    console.log(item)
    this.setState({addbigArea:item})
  }

  choicedCompany = (item) =>{
    console.log(item)
    this.setState({addparentCompanyName:item.name,addparentCompanyCode:item.id})
  }

  choicedPerson = (item) =>{
    console.log(item)
    this.setState({addchargePersionId:item.code, addchargePersionName:item.name, addId:item.id})
  }

  changePage = (page, pageSize) =>{
    const {code, name,bigArea} =this.state
    console.log(page)
    console.log(pageSize)
    let url =`${IP}${searchcom}?page=${page-1}&size=${pageSize}&name=${name}&code=${code}&bigArea=${bigArea}`
    getfun(url).then(res => this.setState({data: res.content,totalLength:res.totalElements})).catch(err =>console.log(err.message))
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
          <Col span="4"><Input value={this.state.name} onChange={(e) =>{this.setState({name:e.target.value})}} placeholder="请输入公司名称..." /></Col>
          <Col span="4"><Input value={this.state.code} onChange={(e) =>{this.setState({code:e.target.value})}} placeholder="请输入公司编号..." /></Col>
          <Col span="4"><Input value={this.state.bigArea} onChange={(e) =>{this.setState({bigArea:e.target.value})}}  placeholder="请输入大区名称..." /></Col>
          <Col span="4"><Button icon="reload" onClick={()=>this.setState({name:'',code: '',bigArea:''})} type="primary">重置</Button>  <Button onClick={() =>this.searchData()} icon="search" type="primary">查询</Button></Col>
        </Row>
        </div>
        <hr/>
        <div className="comMain">
          <h3 className="comtitle">公司维护列表</h3>
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
            rowKey='code'
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
          onOk={() =>this.addCompany()}
          onCancel={() =>this.setState({visible:false})}
          width={800}
          >
          <Row type="flex" justify="space-around" className="marbot">
            <Col span="8">
            <div style={{display:'flex'}}>
            <Button type='primary' >公司名称</Button>
            <Input onChange={(e) =>{this.setState({addname:e.target.value})}}  placeholder="请输入公司名称..." />
            </div>
            </Col>
            <Col span="8"></Col>
          </Row>
          <PersonSearch  btnshow='负责人' choicedPerson={this.choicedPerson}/>
          <Row type="flex" justify="space-around">
            <Col span="20">
              {/* {this.choicePerson()} */}
            </Col>
          </Row>
          <Row type="flex" justify="space-around" className="marbot">
            <Col span="8">
              <BigAreaSearch  choicedArea={this.choicedArea}/>
            </Col>
            <Col span="8">
              <div style={{display:'flex'}}>
                <Button type='primary' >上级公司</Button>
                <CompanySearch  choicedCompany={this.choicedCompany}/>
              </div>
            </Col>
          </Row>
          </Modal>
          <Modal
          title="编辑公司"
          visible={this.state.changeShow}
          onOk={() =>this.changeCompany()}
          onCancel={() =>this.setState({changeShow:false})}
          width={800}
          >
          <Row type="flex" justify="space-around" className="marbot">
          <Col span="8">
            <div style={{display:'flex'}}>
            <Button type='primary' >公司名称</Button>
            <Input onChange={(e) =>{this.setState({changename:e.target.value})}}  placeholder="请输入公司名称..." />
            </div>
            </Col>
            <Col span="8"></Col>
          </Row>
          <Row type="flex" justify="space-around" className="marbot">
            <Col span="8">
              <div style={{display:'flex'}}>
                <Button type='primary' >负责人</Button>
                <Input onChange={(e) =>{this.setState({changechargePersionId:e.target.value})}}  style={{width:"90px"}} />
                <Input onChange={(e) =>{this.setState({changechargePersionName:e.target.value})}} style={{width:"90px"}} />
              </div>
            </Col>
            <Col span="8"><Button type='primary'  ghost >查询</Button></Col>
          </Row>
          <Row type="flex" justify="space-around" className="marbot">
          <Col span="8">
              <div style={{display:'flex'}}>
                <Button type='primary' >大区</Button>
                <Select defaultValue="亚太地区" onChange={(e) =>{this.setState({changebigArea:`${e}`})}} style={{ width: 180 }}>
                <Option value="亚太地区">亚太地区</Option>
                <Option value="欧美地区">欧美地区</Option>
              </Select>
              </div>
            </Col>
            <Col span="8">
              <div style={{display:'flex'}}>
                <Button type='primary' >上级公司</Button>
                <Select defaultValue="周黑鸭企业发展有限公司" onChange={(e) =>{this.setState({changeparentCompanyName:`${e}`})}} style={{ width: 160 }}>
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

export default Company;