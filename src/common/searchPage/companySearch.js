import React, { Component } from 'react';
import { Select } from 'antd';
import { API } from '../axiosAPI'
import { getfun } from '../axiosFun'

const { IP, allcompany} = API

const Option = Select.Option;

class CompanySearch extends Component{
  constructor(props){
    console.log(props)
    super(props)
    this.state = {
      bigAreaData: [],
      choicedArea: ''
    }
  }

  componentDidMount() {
    let url = `${IP}${allcompany}`
    console.log(url)
    getfun(url).then(res => this.setState({bigAreaData: res})).catch(err =>console.log(err))
  }


  handleChange=(value) => {
      // this.setState({choicedArea: value})
      const {bigAreaData} = this.state
      let comName = ''
      bigAreaData.forEach(item =>{
        if(item.code === value){
          comName = item.name
        }
      })
      // console.log(comName)
      let comData = {
        code: value,
        name: comName
      }

      this.props.choicedCompany(comData)
    }



  render() {
    const {bigAreaData} = this.state
    const children =[]
    bigAreaData.forEach(item =>{
      children.push(<Option key={item.code}>{item.name}</Option>)
    })

    return (
      // <div style={{display:'flex'}}>
      //   <Button type='primary' >大区</Button>
        <Select defaultValue="" style={{ width: 120 }} onChange={this.handleChange}>
          {children}
        </Select>

      // </div>
    )
  }
}

export default CompanySearch;