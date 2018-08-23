import React, { Component } from 'react';
import CompanyThree from '../../common/companyThree';
import {Row, Col,  Button, DatePicker,Select} from 'antd'
import moment from 'moment';
import {getfun} from '../../common/axiosFun'
import { API } from '../../common/axiosAPI'
const {MonthPicker} = DatePicker
const Option = Select.Option;
const monthFormat = 'YYYY/MM';
const mydate = new Date()
const {IP} = API

class StatisticalFrom extends Component{

  constructor(props){
    super(props)
    this.state = {
      searchyear: mydate.getFullYear(),
      searchmonth: mydate.getMonth()+1<10 ? `0${ mydate.getMonth()+1}`: mydate.getMonth()+1,
      formUrl:'',
      formTypeArr: [],
      downLoad:'',
      threeData: '',
    }
  }


  componentDidMount() {
    this.start()
  }

  start = () =>{
    let url =`${IP}/sys/dictType/PunchRecordReportType`
    getfun(url).then(res =>this.setState({formTypeArr:res})).catch(err =>console.log(err))
  }

  getThreeData = (item) =>{
    console.log(item)
    this.setState({threeData:item})
  }

  onChangeMonth = (date) =>{
    // console.log(date._d.getFullYear() + date._d.getMonth()) 
    this.setState({searchyear: date._d.getFullYear(),searchmonth:date._d.getMonth()+1})
  }

  choiceType = (item) =>{
    console.log(item)
    this.setState({formUrl:item})
  }

  downLoad = () =>{
    const {formUrl, searchyear, searchmonth,threeData} = this.state
    if(formUrl === ''){
      alert('请选择导出报表类型')
    }else{
      let  downurl =`${IP}${formUrl}/${searchyear}/${searchmonth}?${threeData}`
      console.log(downurl)
      window.open(downurl)
    }
  }


  render() {
    const {formTypeArr} = this.state

    const formOptions = []
    formTypeArr.forEach(item => {
      formOptions.push(<Option key={item.dictValue}>{item.description}</Option>) 
    })
    return(
      <div>
        <Row type="flex" justify="space-around">
          <Col span="5">
            <CompanyThree  getThreeData= {this.getThreeData}/>
          </Col>
          <Col span='18'>
            <div className="comMain">
            <h3 className="comtitle">统计报表面板</h3>
            <Row  type="flex" justify="space-around" style={{marginTop:30}}>
              <Col span='10'>
                <div style={{display:'flex'}}>
                  <Button type='primary' >报表类型</Button>  
                  <Select  style={{ width: 250 }} onChange={this.choiceType}>
                    {formOptions}
                  </Select>
                </div>
              </Col>
              <Col span='10'>
                <div style={{display:'flex'}}>
                  <Button type='primary' >报表日期</Button>  
                  <MonthPicker onChange={this.onChangeMonth} defaultValue={moment(`${this.state.searchyear}/${this.state.searchmonth}`, monthFormat)} format={monthFormat} />
                </div>
              </Col>
            </Row>
            <Row type="flex" justify="space-around" style={{marginTop:30}}>
              <Col span='10'><Button size='large' icon="download" onClick={this.downLoad} >导出</Button></Col>
              <Col span='10'></Col>
            </Row>
          </div>
          </Col>
        </Row>
      </div>
    )
  }
}


export default StatisticalFrom;