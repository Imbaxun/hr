import React, { Component } from 'react';
import { Layout, Menu, Breadcrumb, Icon, Row, Col ,Button } from 'antd';
import {Link } from 'react-router-dom'
import './main.css'
import *as route from '../../routers';
import {getfun} from '../../common/axiosFun'
import {API} from '../../common/axiosAPI'
const { IP, mainMenuPermission} = API
const { Header, Content, Footer, Sider } = Layout;
const SubMenu = Menu.SubMenu;


class Main extends Component {
  constructor(props){
    super(props)
    this.state = {
      collapsed: false,
      item:'',
      menuArr: []
    }
  }
  onCollapse = (collapsed) => {
    console.log(collapsed);
    this.setState({ collapsed });
  }

  goOut = () =>{
    window.sessionStorage.clear()
    this.props.history.push('/');
  }

  componentDidMount() {
    this.getMenu()
  }

  getMenu = () =>{
    let aa =  window.sessionStorage.getItem('path')
    let bb = JSON.parse(aa)
  
    let url = `${IP}${mainMenuPermission}/${bb.userId}`
    getfun(url).then(res =>{
      if(res.code === 200){
        
        this.setState({menuArr: res.data})
      }
    }).catch(err =>console.log(err))
  }

  showMenu = (data) =>{
    const { match } = this.props
    // console.log(data)
    return data.map((item) =>{
      if(item.children.length >0){
        return(
          <SubMenu key={item.menuKey} title={<span><Icon type={item.icon} /><span>{item.title}</span></span>}>
            {this.showMenu(item.children)}
          </SubMenu>
        )
      }
      return <Menu.Item  key={item.menuKey}><Link to={`${match.url}/${item.router}`}>{item.title}</Link></Menu.Item>
    })
  }

  render() {
    let aa =  window.sessionStorage.getItem('path')
    let bb = JSON.parse(aa)
    // console.log(aa)
    // const { match } = this.props
    const {menuArr} = this.state
    return (
      <Layout style={{ minHeight: '100vh' }}>
        <Sider
          collapsible
          collapsed={this.state.collapsed}
          onCollapse={this.onCollapse}
        >
          <div className="logo" />
          <Menu theme="dark" defaultSelectedKeys={['1']} mode="inline">
            {this.showMenu(menuArr)}
            {/* <SubMenu
              key="sub1"
              title={<span><Icon type="user" /><span>组织机构管理</span></span>}
            >
              <Menu.Item  key="3"><Link to={`${match.url}/Company`}>公司管理</Link></Menu.Item>
              <Menu.Item  key="4"><Link to={`${match.url}/Department`}>部门管理</Link></Menu.Item>
              <Menu.Item  key="8"><Link to={`${match.url}/Shop`}>门店管理</Link></Menu.Item>
              <Menu.Item  key="7"><Link to={`${match.url}/Person`}>人员管理</Link></Menu.Item>
              
            </SubMenu>
            <SubMenu
              key="sub7"
              title={<span><Icon type="team" /><span>门店考勤管理</span></span>}
            >
              <SubMenu
                key="sub3"
                title={<span><Icon type="team" /><span>排班管理</span></span>}
              >
                <Menu.Item key="11"><Link to={`${match.url}/ClassSearch`}>班次查询</Link></Menu.Item>
                <Menu.Item key="10"><Link to={`${match.url}/ClassManage`}>班次管理</Link></Menu.Item>
              </SubMenu>
              <SubMenu
                key="sub2"
                title={<span><Icon type="team" /><span>考勤处理</span></span>}
              >
                <Menu.Item key="12"><Link to={`${match.url}/BurshCard`}>补刷卡管理</Link></Menu.Item>
                <Menu.Item key="13"><Link to={`${match.url}/Leave`}>请假处理</Link></Menu.Item>
                <Menu.Item key="15"><Link to={`${match.url}/WorkOverTime`}>加班处理</Link></Menu.Item>
                <Menu.Item key="28"><Link to={`${match.url}/Batch`}>手动批处理</Link></Menu.Item>
              </SubMenu>
            
              <SubMenu
                key="sub10"
                title={<span><Icon type="team" /><span>数据监控</span></span>}
              >
                <Menu.Item key="31"><Link to={`${match.url}/ProcessView`}>考勤流程监控</Link></Menu.Item>
                <Menu.Item key="22"><Link to={`${match.url}/DailyClock`}>门店每日报表</Link></Menu.Item>
              <Menu.Item key="23"><Link to={`${match.url}/DayClock`}>人员每日报表</Link></Menu.Item>
              <Menu.Item key="26"><Link to={`${match.url}/EmpDays`}>门店人员打卡状态</Link></Menu.Item>
              </SubMenu>

              <Menu.Item key="25"><Link to={`${match.url}/ShopClock`}><Icon type="form" theme="outlined" />门店考勤报表</Link></Menu.Item> 
              <SubMenu
                key="sub6"
                title={<span><Icon type="setting" /><span>高级设置</span></span>}
              >
                
                <Menu.Item key="19"><Link to={`${match.url}/TimeTacking`}>考勤处理类型</Link></Menu.Item>
                <Menu.Item key="27"><Link to={`${match.url}/PhoneId`}>设备解绑</Link></Menu.Item>
              </SubMenu>
             
            </SubMenu>
    
            <SubMenu
              key="sub9"
              title={<span><Icon type="setting" /><span>工业园考勤(待调整)</span></span>}
            >
            <Menu.Item key="18"><Link to={`${match.url}/HolidaySeting`}>假日设置</Link></Menu.Item>
            <SubMenu
                key="sub10"
                title={<span><Icon type="team" /><span>考勤处理</span></span>}
              >
                <Menu.Item key="32"><Link to={`${match.url}/BurshCardA`}>补刷卡处理</Link></Menu.Item>
                <Menu.Item key="33"><Link to={`${match.url}/Leave`}>请假处理</Link></Menu.Item>
                <Menu.Item key="34"><Link to={`${match.url}/WorkOverTime`}>加班处理</Link></Menu.Item>
              </SubMenu>
            <SubMenu
              key="sub5"
              title={<span><Icon type="setting" /><span>考勤管理</span></span>}
            >
              <Menu.Item key="20"><Link to={`${match.url}/Attendance`}>考勤查询</Link></Menu.Item>
              <Menu.Item key="21"><Link to={`${match.url}/StatisticalForm`}>统计报表</Link></Menu.Item>
            </SubMenu>             
            </SubMenu>           
            <SubMenu
              key="sub4"
              title={<span><Icon type="team" /><span>开发人员使用模块</span></span>}
            >
              <Menu.Item key="16"><Link to={`${match.url}/CheckingData`}>考勤数据(工业园)</Link></Menu.Item>
              <Menu.Item key="17"><Link to={`${match.url}/CheckSolr`}>考勤数据(工业园)Solr</Link></Menu.Item>
              <Menu.Item key="29"><Link to={`${match.url}/CheckingStore`}>考勤数据(门店)</Link></Menu.Item>
              <Menu.Item key="30"><Link to={`${match.url}/userUnbound`}>APP账号解绑记录</Link></Menu.Item>
              <Menu.Item key="9" onClick={() => this.setState({item:'dictionaries'})}>
              <Link to={`${match.url}/Dictionaries`}>
              <Icon type="file" />
              <span>数据词典</span>
              </Link>
              </Menu.Item>
              <Menu.Item key="24">
                <Link to={`${match.url}/Version`}>
                <Icon type="file" />
                <span>APP版本</span>
                </Link>
              </Menu.Item>
            </SubMenu> */}
          </Menu>
        </Sider>
        <Layout>
          <Header style={{ background: '#fff', padding: 0 }} >
            <Row>
              <Col span="6" offset="6">
                <h1>人员管理系统</h1>
              </Col>
              <Col span="3" offset="6"><p style={{fontSize:12,fontWeight:'bold'}}>{bb.userName}</p></Col>
              <Col span='3'>
              <Button type="dashed" onClick = {this.goOut}>登出</Button>
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
