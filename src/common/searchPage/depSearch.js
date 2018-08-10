import React, { Component } from 'react'
import {API} from '../../common/axiosAPI'
import {Cascader} from 'antd'
import {getfun,} from '../../common/axiosFun'
const { IP, Employee} = API


class DepSearch extends Component{
  constructor(props){
    super(props)
    this.state={
      options:[]
    }
  }

componentDidMount(){

  let url =`${IP}${Employee}/companyInfo`
  getfun(url).then(res => {
    // console.log(res)
    this.setState({options: res})
  }).catch(err => console.log(err))
}

onChangeBm = (value) => {
  const {options} = this.state
  console.log(options)
  console.log(value)
  let addComname = ''
  let addDepname = ''
  options.forEach(item =>{
    if(item.value === value[0] ){
      addComname = item.label
    }
    item.children.forEach(aa =>{
      if(aa.value === value[1]){
        addDepname = aa.label
      }
    })
  })
  let depData ={
    comId: value[0],
    depId: value[1],
    comName: addComname,
    depName: addDepname
  }
  this.props.choicedDep(depData)
  // this.setState({
  //   addCompanyId: value[0],
  //   addDeptId: value[1],
  //   addCompanyName: addComname,
  //   addDeptName: addDepname
  // })
}

  render() {
    return(
      <div>
      <Cascader  options={this.state.options} onChange={this.onChangeBm} />
      </div>
    )
  }
}

export default DepSearch;