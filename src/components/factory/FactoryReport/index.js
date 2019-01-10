import React from 'react'
import { Row, Col,  Button,  Modal, Select,DatePicker } from 'antd';
import { API } from '../../../common/axiosAPI'

const {MonthPicker} = DatePicker
const monthFormat = 'YYYY/MM'
const Option = Select.Option;

export default class FactoryReport extends React.Component
{

    constructor(props){
        super(props)
        this.state={
            recordYear:'',
            recordMonth:'',
            reportType:''
        }
    }


    onChangeMonth=(date,a,b)=>
    {
        if(date&&date._d)
        {
            let d=date._d
            this.setState({recordYear:d.getFullYear(),recordMonth:(d.getMonth()+1)})
        }
    }

    downLoad=()=>
    {
        let recordMonth=this.state.recordMonth
        let recordYear=this.state.recordYear
        let reportType=this.state.reportType
        
        if(!recordYear||!recordMonth)
        {
            this.openInfoDialog('消息提醒','请选择报表日期')
            return
        }

        if(!reportType)
        {
            this.openInfoDialog('消息提醒','请选择报表类型')
            return
        }


        if('工业园考勤基础数据'=== reportType)
        {
            window.open(API.IP+API.AdministrativeReportBasePunchRecord+"/"+recordYear+"/"+recordMonth)
            
        }else if ('工业园月度考勤报表'=== reportType)
        {
            window.open(API.IP+API.AdministrativeReportMonthPunchRecord+"/"+recordYear+"/"+recordMonth)
        }else if('工业园年度考勤报表'=== reportType)
        {
            window.open(API.IP+API.AdministrativeReportYearPunchRecord+"/"+recordYear)
        }

    }

    onChangeReport=(value)=>
    {
        if('工业园考勤基础数据'=== value)
        {
            this.setState({reportType:'工业园考勤基础数据'})
        }else if ('工业园月度考勤报表'=== value)
        {
            this.setState({reportType:'工业园月度考勤报表'})
        }else if('工业园年度考勤报表'=== value)
        {
            this.setState({reportType:'工业园年度考勤报表'})
        }
    }

    openInfoDialog=(title,infoContent) => 
    {
        Modal.info({
          title: title,
          content: (
            <div>
              <p>{infoContent}</p>
            </div>
          ),
          onOk() {},
        });
    }


    render(){

        return (
            <div>
                <Row type="flex">
                    <Col span='24'>
                        <h3 className="comtitle">工业园报表</h3>
                    </Col>
                    <Col span="10">
                        <div style={{display:'flex'}}>
                        <Button type='primary' >报表类型</Button>  
                        <Select  style={{ width: 250 }} onChange={this.onChangeReport}>
                            <Option value="工业园考勤基础数据">工业园考勤基础数据</Option>
                            <Option value="工业园月度考勤报表">工业园月度考勤报表</Option>
                            <Option value="工业园年度考勤报表">工业园年度考勤报表</Option>
                        </Select>
                        </div>
                    </Col>

                    <Col span='10'>
                        <div style={{display:'flex'}}>
                        <Button type='primary' >报表日期</Button>  
                        <MonthPicker onChange={this.onChangeMonth} format={monthFormat} />
                        </div>
                    </Col>
                </Row>
                <Row type="flex" justify="space-around" style={{marginTop:30}}>
                    <Col span='10'><Button size='large' icon="download" onClick={this.downLoad} >导出</Button></Col>
                    <Col span='10'></Col>
                </Row>
            </div>
        )

    }


}