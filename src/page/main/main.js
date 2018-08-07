import React, { Component } from 'react';
import { Layout, Menu, Breadcrumb, Icon, Row, Col } from 'antd';
import {Link } from 'react-router-dom'
import './main.css'
import *as route from '../../routers';
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


  render() {
    // console.log(this.props)
    const { match } = this.props
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
              <Menu.Item  key="3"><Link to={`${match.url}/Company`}>公司管理</Link></Menu.Item>
              <Menu.Item  key="4"><Link to={`${match.url}/Department`}>部门管理</Link></Menu.Item>
              <Menu.Item  key="5"><Link to={`${match.url}/Duty`}>职务管理</Link></Menu.Item>
              <Menu.Item  key="6"><Link to={`${match.url}/JobLever`}>职等管理</Link></Menu.Item>
              <Menu.Item  key="7"><Link to={`${match.url}/Person`}>人员管理</Link></Menu.Item>
              <Menu.Item  key="8"><Link to={`${match.url}/Shop`}>门店管理</Link></Menu.Item>
            </SubMenu>
            <SubMenu
              key="sub2"
              title={<span><Icon type="team" /><span>排版管理</span></span>}
            >
              <Menu.Item key="1"><Link to={`${match.url}/ClassManage`}>班次管理</Link></Menu.Item>
              <Menu.Item key="2"><Link to={`${match.url}/ClassSearch`}>班次查询</Link></Menu.Item>
            </SubMenu>
            <Menu.Item key="9" onClick={() => this.setState({item:'dictionaries'})}>
              <Link to={`${match.url}/Dictionaries`}>
              <Icon type="file" />
              <span>数据词典</span>
              </Link>
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
              {route.mainRouters()}
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
