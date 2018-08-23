import React, { Component } from 'react';
import { Tree ,Icon } from 'antd';
import {API} from './axiosAPI'
import {getfun} from './axiosFun'
const TreeNode = Tree.TreeNode;
const { IP, PersonThree} = API

class CompanyThree extends Component {
  constructor(props) {
    console.log(props)
    super()
    this.state = {
      tofatherData: '',
      threeData:[],
    }
  }

  componentDidMount() {
    let url = `${IP}${PersonThree}`
    getfun(url).then(res => this.setState({threeData: res.data})).catch(err => console.log(err))
    console.log(this.state.threeData)
  }

  onSelect = (selectedKeys, info) => {
    let title = info.node.props.title
    let selectData =''
    if(title === '全球') {
      selectData = 'bigArea=全球'
    }else if(info.node.props.type === undefined){
      let bb = info.node.props.dataRef.type
      switch (bb) {
        case "company":
        selectData = `companyId=${selectedKeys[0]}`
        break
        case "department":
        selectData = `deptId=${selectedKeys[0]}`
        break
        default:
        selectData = `bigArea=${info.node.props.title}`
      }
    }else{
      selectData = `storeId=${selectedKeys[0]}`
    }
    // console.log(selectData)
    this.setState({tofatherData: selectData})
    this.props.getThreeData(selectData)
  }

  rethree = (item) => {
    if(item instanceof Array) {
      return item.map((aa) =>{
        // console.log(aa)
        if (aa.data) {
          return (
            <TreeNode icon={<Icon type={aa.icon} />} title={aa.title} key={aa.id} dataRef={aa}>
                {this.rethree(aa.data)}
            </TreeNode>
          )
        }
        return  <TreeNode {...aa}  icon={<Icon type={aa.icon} />}  key={aa.id}/>;
      })
    }
  }

  render() {
    const {threeData} = this.state
    return(
      <div>
        <Tree
        showLine
        showIcon
        onSelect={this.onSelect}
        >
          <TreeNode icon={<Icon type={threeData.icon} />} title={threeData.title} key={threeData.id} >
            {this.rethree(threeData.data)}
          </TreeNode>
        </Tree>
      </div>
    )
  }
};


export default CompanyThree;