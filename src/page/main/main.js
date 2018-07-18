import React, { Component } from 'react';
import { Layout, Menu, Breadcrumb, Icon, Row, Col } from 'antd';
import './main.css'
import Company from '../../components/company/company'
import Department from '../../components/department/department'
import Duty from '../../components/duty/duty'
import JobLever from '../../components/jobLever/jobLever'
import Dictionaries from '../../components/dictionaries/dictionaries'
const { Header, Content, Footer, Sider } = Layout;
const SubMenu = Menu.SubMenu;


class Main extends Component {

  constructor(props){
    super(props)
    this.state = {
      collapsed: false,
      item:''
    }
  }
  onCollapse = (collapsed) => {
    console.log(collapsed);
    this.setState({ collapsed });
  }

  choiceMain = () =>{
    const { item } = this.state
    console.log(item)
    switch(item) {
      case 'Company':
        return ( <Company /> )
      case 'Department':
        return ( <Department /> )
      case 'duty':
        return ( <Duty /> )
      case 'jobLever':
        return ( <JobLever /> )
      case 'dictionaries':
        return ( <Dictionaries />)
      default:
        return ( <Company /> )
    }

  }

  render() {
    return (
      <Layout style={{ minHeight: '100vh' }}>
        <Sider
          collapsible
          collapsed={this.state.collapsed}
          onCollapse={this.onCollapse}
        >
          <div className="logo" />
          <Menu theme="dark" defaultSelectedKeys={['1']} mode="inline">
            <Menu.Item key="1">
              <Icon type="pie-chart" />
              <span>Option 1</span>
            </Menu.Item>
            <Menu.Item key="2">
              <Icon type="desktop" />
              <span>Option 2</span>
            </Menu.Item>
            <SubMenu
              key="sub1"
              title={<span><Icon type="user" /><span>组织机构管理</span></span>}
            >
              <Menu.Item onClick={() => this.setState({item:'Company'})} key="3">公司管理</Menu.Item>
              <Menu.Item onClick={() => this.setState({item:'Department'})} key="4">部门管理</Menu.Item>
              <Menu.Item onClick={() => this.setState({item:'duty'})} key="5">职务管理</Menu.Item>
              <Menu.Item onClick={() => this.setState({item:'jobLever'})} key="6">职等管理</Menu.Item>
            </SubMenu>
            <SubMenu
              key="sub2"
              title={<span><Icon type="team" /><span>Team</span></span>}
            >
              <Menu.Item key="6">Team 1</Menu.Item>
              <Menu.Item key="8">Team 2</Menu.Item>
            </SubMenu>
            <Menu.Item key="9" onClick={() => this.setState({item:'dictionaries'})}>
              <Icon type="file" />
              <span>数据词典</span>
            </Menu.Item>
          </Menu>
        </Sider>
        <Layout>
          <Header style={{ background: '#fff', padding: 0 }} >
            <Row type="flex" justify="center">
              <Col span="5">
                <h1>人员管理系统</h1>
              </Col>
            </Row>
          </Header>
          <Content style={{ margin: '0 16px' }}>
            <Breadcrumb style={{ margin: '16px 0' }}>
            </Breadcrumb>
            <div style={{ padding: 24, background: '#fff', minHeight: 360 }}>
              {this.choiceMain()}
            </div>
          </Content>
          <Footer style={{ textAlign: 'center' }}>
            周黑鸭HR ©2018 Created by xunxun
          </Footer>
        </Layout>
      </Layout>
    );
  }
}

export default Main;
