import React, { Component } from 'react';
import { Select, Button } from 'antd';
import { API } from '../axiosAPI'
import { getfun } from '../axiosFun'

const { IP, bigArea} = API

const Option = Select.Option;

class BigAreaSearch extends Component{
  constructor(props){
    console.log(props)
    super(props)
    this.state = {
      bigAreaData: [],
      choicedArea: ''
    }
  }

  componentDidMount() {
    let url = `${IP}${bigArea}`
    console.log(url)
    getfun(url).then(res => this.setState({bigAreaData: res})).catch(err =>console.log(err))
  }


  handleChange=(value) => {
      // this.setState({choicedArea: value})
      this.props.choicedArea(value)
    }



  render() {
    const {bigAreaData} = this.state
    const children =[]
    bigAreaData.forEach(item =>{
      children.push(<Option key={item.dictValue}>{item.dictValue}</Option>)
    })

    return (
      <div style={{display:'flex'}}>
        <Button type='primary' >大区</Button>
        <Select defaultValue="" style={{ width: 120 }} onChange={this.handleChange}>
          {children}
        </Select>
      </div>
    )
  }
}

export default BigAreaSearch;