import React, { Component } from 'react';
import { Row, Col, Tree ,Icon, Card, Input, Button, Modal, Table} from 'antd';
import './MenuManager.css'
import{ getfun, postfun} from '../../common/axiosFun'
import {API} from '../../common/axiosAPI'

// import { Tree } from 'antd';

const TreeNode = Tree.TreeNode;
const { IP, mainMenu, MenuId} = API


class MenuManager extends Component {

  constructor(props) {
    super(props)
    this.state = {
      menuArr: [],
      threeId: '',
      cardData: '',
      visible: false,
      permissionValue: '',
      icon: '',
      menuOrder: '',
      title: '',
      columns: [
        {
          title: '权限名称',
          dataIndex: 'permissionName',
        },
        {
          title: '权限描述',
          dataIndex: 'permissionDesc',
        },
        {
          title: '权限值',
          dataIndex: 'permissionValue',
        }
      ],
      data: [],
      totalLengthL: '',     
    }
    this.inputChange = this.inputChange.bind(this)
  }

  componentDidMount() {
    this.getMenu()
  }

  getMenu = () =>{
    let url = `${IP}${mainMenu}`
    getfun(url).then(res =>{
      if(res.code === 200){
        console.log(res.data)
        this.setState({menuArr: res.data})
      }
    }).catch(err =>console.log(err))
  }

  searchMenu = (data) =>{
    let url = `${IP}${MenuId}/${data}`
    getfun(url).then(res =>{
      if(res.code === 200){
        console.log(res)
        this.setState({cardData: res.data, permissionValue:res.data.permissionValue,icon:res.data.icon, menuOrder:res.data.menuOrder, title:res.data.title })
      }
    }).catch(err =>console.log(err))
  }

  onSelect = (selectedKeys, info) => {
    console.log(selectedKeys)
    this.setState({threeId:selectedKeys[0],})
    this.searchMenu(selectedKeys[0])
  }


  menuThree = (data) =>{
    return data.map((item) =>{
      if(item.children.length >0){
        return(
          <TreeNode icon={<Icon type={item.icon} />} title={item.title} key={item.id} dataRef={item}>
                {this.menuThree(item.children)}
            </TreeNode>
        )
      }
      return  <TreeNode title={item.title} key={item.id}></TreeNode>
    })
  }
  handleOk = () =>{
    this.setState({visible: false})
  }


  inputChange(key, val) {
    let tmpObj = {}
    tmpObj[key] = val
    this.setState(tmpObj)
  }

  getpermissionValue = () =>{
    this.setState({visible: true})
    let url = `${IP}/sys/permission`
    getfun(url).then(res =>{
      this.setState({data: res.content,totalLength:res.totalElements})
    }).catch(err =>console.log(err))
  }

  changePage = (page, pageSize) =>{
    let url =`${IP}/sys/permission?page=${page-1}&size=${pageSize}`
    getfun(url).then(res =>{
      this.setState({data: res.content,totalLength:res.totalElements})
    }).catch(err =>console.log(err))
  }

  choiceShop = (item, index) =>{
    console.log(item)
    this.setState({permissionValue: item.permissionValue})
    this.setState({visible: false})
  }
  submit = () =>{
    console.log(555)
    const{menuOrder,threeId, permissionValue, icon, title }= this.state
    let sendData = {
      menuOrder,
      id:threeId,
      permissionValue,
      icon,
      title
    }
    let url = `${IP}/sys/menu/${threeId}`
    postfun(url, sendData).then(res =>{
      if(res.code === 200){
        this.getMenu()
      }
    }).catch(err =>console.log(err))
  }

  render(){
    const {menuArr, cardData} = this.state
    return(
      <div>
        <div className="comMain">
          <h3 className="comtitle">菜单权限设置</h3>
          <Row type="flex" justify="space-around"  style={{marginTop: 30}}>
            <Col span='12'>
            <Tree
            showLine
            showIcon
            onSelect={this.onSelect}
            >
              {this.menuThree(menuArr)}
            </Tree>
            </Col>
            <Col span='12'>
              <div>
              <Card
                title={cardData.title ? cardData.title : '未选择'}
                extra={<Button onClick={this.submit}>提交</Button>}
                style={{ width: 500 }}
              >
                <div style={{display: 'flex', marginBottom:10}}>
                <Button type='primary' >标题</Button>
                <Input style={{marginLeft: 10, width:218}} onChange={e => this.inputChange('title', e.target.value)} value={this.state.title} placeholder={cardData.title ? cardData.title : '未选择'} />  
                </div>
                <div style={{display: 'flex',marginBottom:10}}>
                <Button type='primary' >icon</Button>
                <Input style={{marginLeft: 10, width:225}} onChange={e => this.inputChange('icon', e.target.value)} value={this.state.icon}  placeholder={cardData.icon ? cardData.icon : '未选择'} />  
                </div>
                <div style={{display: 'flex',marginBottom:10}}>
                <Button type='primary' >menuOrder</Button>
                <Input style={{marginLeft: 10, width:180}} onChange={e => this.inputChange('menuOrder', e.target.value)} value={this.state.menuOrder} placeholder={cardData.menuOrder ? cardData.menuOrder : '未选择'} />  
                </div>
                <div style={{display: 'flex',marginBottom:10}}>
                <Button type='primary' >permissionValue</Button>
                <Input style={{marginLeft: 10, width:150}} placeholder={cardData.permissionValue ? cardData.permissionValue : '未选择'} value={this.state.permissionValue}  readOnly/>  
                <Button style={{marginLeft: 10, width:50}} type="primary" icon="search" onClick={this.getpermissionValue}></Button>
                </div>                
              </Card>
              </div>
            </Col>
          </Row>
          <Modal
            title="permissionValue"
            visible={this.state.visible}
            onOk={this.handleOk}
            onCancel={() =>{this.setState({visible: false})}}
          >
          <Table
            columns={this.state.columns}
            dataSource={this.state.data}
            bordered
            rowKey="id"
            pagination={{  // 分页
              simple: false,
              pageSize: 10 ,
              total: this.state.totalLength,
              onChange: this.changePage,
            }}
            onRow = {(record, index) =>{
              return {
                onClick: () =>{
                  this.choiceShop(record,index)
                }
              }
            }}
          />
          </Modal>
        </div>
      </div>
    )
  }

}

export default MenuManager