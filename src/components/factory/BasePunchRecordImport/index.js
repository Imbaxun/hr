import React from 'react'
import { Row, Col,  Button, Table, Upload,message,Icon } from 'antd';
import { getfun } from '../../../common/axiosFun'
import { API } from '../../../common/axiosAPI'
const { IP } = API

export default class FactoryReport extends React.Component
{

    constructor(props) {
        super(props)
        this.state = {
          uploadDisable:false,
          disabled: '',
          columns:[
            {
              title: '同步类型',
              dataIndex: 'syncType'
            },
            {
              title: '同步状态',
              dataIndex: 'syncState'
            },
            {
              title: '同步开始时间 ',
              dataIndex: 'startTimeView'
            },
            {
              title: '同步结束时间',
              dataIndex: 'endTimeView'
            }
          ],
          data:[],
          up:{
            name: 'file',
            action: `${IP}/basePunchRecord/importBasePunchRecord`,
            headers: {
              authorization: 'authorization-text',
            },
            onChange(info) {
              if (info.file.status !== 'uploading') {
                this.showSyncState()
              }
              if (info.file.status === 'done') {
                message.success(`${info.file.name} 上传成功`);
                message.success(`${info.file.response.msg}`);
                this.showSyncState()
              } else if (info.file.status === 'error') {
                message.error(`${info.file.name} 上传失败.`);
                this.showSyncState()
              }
            },
          }
        }
    }

    componentDidMount() {
        this.showSyncState()
    }

    showSyncState = ()=>{
        let url = `${IP}/syncDataState/all`
        getfun(url).then(res =>{
            if(!res.data||res.data.length === 0)
            {
                this.state.disabled=false
            }
            if(res.data&&res.data.length===1)
            {
                if(res.data[0]["syncState"]==='运行中')
                {
                    this.state.disabled=true
                }
            }
            this.setState({data:res.data})
        })
        .catch(err => console.log(err))
    }

    render(){
        return (<div>
            <h3 className="comtitle">上传考勤数据</h3>
            <Row type="flex" justify="space-around">
            <Col span="5">
              
                <Upload {...this.state.up} disabled={this.state.uploadDisable} >
                    <Button>
                    <Icon type="upload" />上传考勤数据
                    </Button>
                </Upload>
            </Col>
            <Col span="5">
              <Button onClick={this.showSyncState}>查看处理状态</Button>
            </Col>
            </Row>
            <Table
              style={{marginTop:20}}
              columns={this.state.columns}
              dataSource={this.state.data}
              bordered
              align="center"
              rowKey="id"
            />
          </div>
        )
    }

}