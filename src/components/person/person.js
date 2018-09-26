import React, { Component } from 'react';
import { Row, Col, Input, Button, Table, Modal, Cascader ,Select, DatePicker, Tree,   Radio   } from 'antd';
import './person.css'
import {API} from '../../common/axiosAPI'
import {getfun, postfun, putfun,deletefun} from '../../common/axiosFun'
const { IP, Employee, PersonThree} = API

const Option = Select.Option;
const TreeNode = Tree.TreeNode;
const RadioGroup = Radio.Group



class Person extends Component {
  constructor(props) {
    super(props)
    this.state = {
      empCode: '',
      empName: '',
      levelName: '',
      addCompanyId: '',
      addCompanyName: '',
      addDeptId: '',
      addDeptName: '',
      addName: '',
      addPhone: '',
      addmainJob: '',
      showMainJob: '',
      showJob: '',
      addindex: 1,
      addJob: '',
      addpapers: '',
      addPapersNumber: '',
      addDate1: '',
      addDate2: '',
      addvisibl: false,
      addvisibl1: false,
      changeJob:'',
      changePhone: '',
      changeCompanyId: '',
      changeDeptId: '',
      searchUrl: '',
      delAddIndex: '',
      dowloadUrl: '',
      downLoad: '',
      papersArr: [],
      data:[],
      columns: [
        {
          title: '工号',
          dataIndex: 'empCode',
        },
        {
          title: '姓名',
          dataIndex: 'empName',
        },
        {
          title: '公司',
          dataIndex: 'companyName',
        },
        {
          title: '部门',
          dataIndex: 'deptName',
        },
        {
          title: '职务',
          dataIndex: 'positionName',
        },
        {
          title: '是否主职',
          dataIndex: 'positionTypeView'
        },
        {
          title: '入职时间',
          dataIndex: 'entryDateView',
        },
        {
          title: '手机号码',
          dataIndex: 'empPhone',
        },
        {
          title: '证件类型',
          dataIndex: 'idTypeView',
        },
        {
          title: '证件号码',
          dataIndex: 'typeValue',
        }
        // {
        //   title: '启用状态',
        //   dataIndex: 'state',
        //   render: (text, record) => {
        //   return (
        //     <Popconfirm title="是否修改?" >
        //   <a>{text}</a>
        //   </Popconfirm>
        //   )}
        // }
      ],
      options: [],
      jobs: [],
      addData: [],
      addcolumns: [
        {
          title: '序号',
          dataIndex: 'index'
        },
        {
          title: '姓名',
          dataIndex: 'empName',
        },
        {
          title: '公司',
          dataIndex: 'showCom',
        },
        {
          title: '部门',
          dataIndex: 'showDept',
        },
        {
          title: '职务',
          dataIndex: 'showLever',
        },
        {
          title: '入职时间',
          dataIndex: 'showData',
        },
        {
          title: '手机号码',
          dataIndex: 'empPhone',
        },
        {
          title: '证件类型',
          dataIndex: 'idType',
        },
        {
          title: '证件号码',
          dataIndex: 'typeValue',
        },
        {
          title: '是否主职',
          dataIndex: 'showJobtype',
        }
      ],
      threeId: '',
      threeType: '',
      threeData:[],
      threeData1:[],
      totalLength: '',
    }
  }

  componentDidMount() {
    const {IP, Employee} = API
    this.startData()
    let newUrl = `${IP}${PersonThree}`
    console.log(newUrl)
    getfun(newUrl).then(res =>{
      console.log(res)
      this.setState({threeData:res.data})
    }).catch(err => console.log(err))
    let url =`${IP}${Employee}/companyInfo`
    getfun(url).then(res => {
      // console.log(res)
      this.setState({options: res})
    }).catch(err => console.log(err))

    let newUrl2 =`${IP}/position/all`
    console.log(newUrl2)
    getfun(newUrl2).then(res => {
      // console.log(res)
      this.setState({jobs: res})
      // this.selectData()
    }).catch(err => console.log(err))

    let newUrl1 = `${IP}/sys/dictType/idType`
    getfun(newUrl1).then(res => {
      console.log(res)
      this.setState({papersArr: res})
    }).catch(err => console.log(err))
  }

  startData = () =>{
    let url = `${IP}${Employee}?page=0&size=10`
    // console.log(url)
    getfun(url).then(res => {
      console.log(res)
      this.setState({data: res.content,totalLength:res.totalElements})
      // this.setState({data:res.content})
    }).catch(err => {
      console.log(err)
    })
  }

  searchData = () =>{
    const {empCode, empName, levelName} = this.state
    const { IP, Employee} = API
    let url = `${IP}${Employee}?empCode=${empCode}&empName=${empName}&levelName=${levelName}&page=0&size=10`
    getfun(url).then(res => {
      console.log(res)
      let newArr = []
      res.content.forEach(item=> {
        if(item.state === '0') {
          item.state = '未启用'
        }else{
          item.state = '已启用'
        }
        newArr.push(item)
        // console.log(newArr)
        this.setState({data: newArr,totalLength:res.totalElements})
      });
    }).catch(err => {
      console.log(err)
    })  
  }

  changePage = (page, pageSize) =>{
    const {empCode, empName, levelName, searchUrl} =this.state
    console.log(page)
    console.log(pageSize)
    let aa = searchUrl === '' ? `${IP}${Employee}?page=${page-1}&size=${pageSize}&empCode=${empCode}&empName=${empName}&levelName=${levelName}` : `${searchUrl}&page=${page-1}&size=${pageSize}&empCode=${empCode}&empName=${empName}&levelName=${levelName}`
    let url = aa
    getfun(url).then(res => {
      console.log(res.content)
      this.setState({data: res.content,totalLength:res.totalElements})
      console.log('执行到这里')
    }).catch(err => {
      console.log(err)
    })  
  }

  addPerson = () =>{
    this.setState({addvisible: true})

  }

  onChangeDate = (date, dateString) => {
    console.log(dateString )
    let TIME = date._d.getTime()
    this.setState({addDate1: TIME, addDate2:dateString})
  }
  onChangeDate1 = (date, dateString) => {
    console.log(dateString )
    let TIME = date._d.getTime()
    this.setState({changeDate1: TIME, changeDate2:dateString})
  }

  addPersonEnd = () =>{
    const {addData} =this.state
    console.log(addData)
    let arr = []
    addData.forEach(item =>{
      let aa = {
        empName: item.empName,
        empPhone: item.empPhone,
        entryDate: item.entryDate,
        idType: item.idType,
        typeValue: item.typeValue,
        relationshipList:[
          {
            companyId: item.companyId,
            deptId: item.deptId,
            positionId: item.positionId,
            storeId: '1',
            positionType:item.positionType
          }
        ]
      }
      arr.push(aa)
    })
    console.log(arr)
    let url = `${IP}${Employee}`
    postfun(url,arr).then(res =>{
      console.log(res)
      if(res ==='success'){
        alert('新增成功')
        this.setState({visible:false})
        this.startData()
      }else{
        alert('新增失败')
      }
    }).catch(err => console.log(err))
  }

  delAddData = () =>{
    const {choiceData, searchUrl} = this.state
    console.log(choiceData)
    let newArr = []
    choiceData.forEach( item =>{
      let id = item.empRelId
      newArr.push(id)
    })
    console.log(newArr.toString())
    let idnumber = newArr.toString()
    let url = `${IP}${Employee}/${idnumber}`
    console.log(url)
    let changeUrl = ''
    searchUrl === '' ? changeUrl = `${IP}/employee/exportEmployee?bigbigArea=全球` : changeUrl = searchUrl
    deletefun(url).then(res => {
      console.log(res)
      if(res === 'success') {
        console.log(changeUrl)
        this.startData()
      }
    }).catch(err => {
      console.log(err)
    })  
  }

  delPersonData = () =>{
    const {delAddIndex, addData} = this.state
    let newArr = addData
    newArr.splice(delAddIndex,1)
    this.setState({addData: newArr})
  }

  addPersonData = () =>{
    const {addindex,addCompanyId,addDeptName,showJob, addCompanyName, addDeptId, addpapers, addName, addPhone, addPapersNumber, addDate1,addDate2, addJob, addData, addmainJob ,showMainJob} = this.state
    // let url = `${IP}${Employee}`
    let sendData = {
      index: addindex,
      companyId: addCompanyId,
      deptId: addDeptId,
      positionId: addJob,
      empName: addName,
      empPhone: addPhone,
      idType: addpapers,
      typeValue: addPapersNumber,
      entryDate: addDate1,
      showData: addDate2,
      showCom:addCompanyName,
      showDept:addDeptName,
      showLever: showJob,
      positionType: addmainJob,
      showJobtype: showMainJob
    }
    let newArr = addData
    newArr.push(sendData)
    console.log(newArr)
    let aa = []
    newArr.forEach(item =>{
      console.log(item.positionType)
      
      if(item.positionType === 10){
        // console.log(666)
        aa.push(item.empName)
        console.log(aa)
        if(aa.length>1){
          alert('主职只有一个请勿重复勾选')
          let anewArr = []
          this.setState({addData: anewArr})
        }else{
          let aaddindex = addindex +1
          this.setState({addData: newArr, addindex: aaddindex})
        }
      }
    })
    
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
    this.setState({
      addCompanyId: value[0],
      addDeptId: value[1],
      addCompanyName: addComname,
      addDeptName: addDepname
    })
  }
  onChangeBm1 = (value) => {
    console.log(value)
    this.setState({
      changeCompanyId: value[0],
      changeDeptId: value[1]
    })
  }

  onChangeJob = (value) => {
    const {jobs} = this.state
    console.log(value)
    let aa =''
    jobs.forEach(item => {
      if(item.id === value) {
        aa = item.positionName
      }
    })
    this.setState({addJob:value, showJob: aa})
  }

  onChangeJob1 = (value) => {
    console.log(value)
    this.setState({changeJob:value})
  }

  onChangeType = (value) => {
    console.log(value)
    // this.setState
  }

  choicePapers = (value) => {
    console.log(value)
    this.setState({addpapers: value})
  }
  choicePapers1 = (value) => {
    console.log(value)
    this.setState({changepapers: value})
  }

  onSelect = (selectedKeys, info) => {
    // console.log(selectedKeys[0]);
    // console.log(info.node.props.type)
    let title = info.node.props.title
    let url =''
    let newurl= ''
    if(title === '全球') {
      url = `${IP}/employee?bigArea=全球`
      newurl = `${IP}/employee/exportEmployee?bigbigArea=全球`
    }else if(info.node.props.type === undefined){
      let bb = info.node.props.dataRef.type
      switch (bb) {
        case "company":
        url = `${IP}/employee?companyId=${selectedKeys[0]}`
        newurl = `${IP}/employee/exportEmployee?companyId=${selectedKeys[0]}`
        break
        case "department":
        url = `${IP}/employee?deptId=${selectedKeys[0]}`
        newurl = `${IP}/employee/exportEmployee?deptId=${selectedKeys[0]}`
        break
        default:
        url = `${IP}/employee?bigArea=${info.node.props.title}`
        newurl = `${IP}/employee/exportEmployee?bigArea=${info.node.props.title}`
      }
    }else{
      url = `${IP}/employee?storeId=${selectedKeys[0]}`
      newurl = `${IP}/employee/exportEmployee?storeId=${selectedKeys[0]}`
    }
    console.log(url)
    console.log(newurl)
    this.setState({dowloadUrl: newurl, searchUrl:url})
    getfun(url).then(res =>{
      console.log(res)
      this.setState({data: res.content, totalLength:res.totalElements})
    }).catch(err => console.log(err))

  }



  rethree = (item) => {
    if(item instanceof Array) {
      return item.map((aa) =>{
        if (aa.data) {
          return (
            <TreeNode title={aa.title} key={aa.id} dataRef={aa}>
                {this.rethree(aa.data)}
            </TreeNode>
          )
        }
        return  <TreeNode {...aa}   key={aa.id}/>;
      })
    }else{
      console.log('err')
    }

  }

  changePerson = () => {
    const {changeJob, changeCompanyId,changeDeptId, changePhone, choiceData,searchUrl} = this.state
    console.log(choiceData)
    if(choiceData !== undefined){
      this.setState({addvisible1: true})
      let sendData = {
        id: choiceData[0].id,
        empPhone: changePhone,
        empCode: choiceData[0].empCode,
        idType : choiceData[0].idType,
        typeValue : choiceData[0].typeValue,
        relationshipList: [
          {
            companyId: changeCompanyId,
            deptId: changeDeptId,
            id: choiceData[0].empRelId,
            positionId: changeJob,
            positionType: choiceData[0].positionType
          }
        ]
      }
      console.log(sendData)
      let changeUrl = ''
      searchUrl === '' ? changeUrl = `${IP}/employee/exportEmployee?bigbigArea=全球` : changeUrl = searchUrl
      let url =`${IP}${Employee}/${choiceData[0].id}`
      putfun(url,sendData).then(res =>{
        console.log(res)
        if(res === 'success') {
          console.log(changeUrl)
          // this.setState({addvisible1: false})
          this.startData()
        }
      }).catch(err => console.log(err))
    }else{
      alert('请先勾选编辑内容')
    }
  }

  downLoad = () =>{
    const {dowloadUrl,empCode, empName, levelName} = this.state
    console.log(dowloadUrl)
    let url = `${IP}/employee/exportEmployee?${empCode}&empName=${empName}&levelName=${levelName}`
    console.log(url)
    this.setState({downLoad:url})
  }

  mainJob =(e) =>{
    console.log(e.target.value)
    if(e.target.value === 10) {
      this.setState({addmainJob: e.target.value, showMainJob: '是'})
    }else{
      this.setState({addmainJob: e.target.value, showMainJob: '否'})
    }

  }

  render() {
    const {jobs, papersArr, threeData} = this.state
    // const rowSelection = {
    //   onChange: (selectedRowKeys,selectedRows) => {
    //     console.log(selectedRows);
    //     this.setState({choiceData:selectedRows})
    //   }
    // }  
    const cityOptions = jobs.map(city => <Option value={city.id} key={city.id}>{city.positionName}</Option>)
    const papersOptions = papersArr.map(city => <Option value={city.dictValue} key={city.id}>{city.dictKey}</Option>)
    // const up = {
    //   name: 'file',
    //   action: `${IP}/employee/importEmployee`,
    //   headers: {
    //     authorization: 'authorization-text',
    //   },
    //   onChange(info) {
    //     if (info.file.status !== 'uploading') {
    //       console.log(info.file, info.fileList);
    //     }
    //     if (info.file.status === 'done') {
    //       message.success(`${info.file.name} file uploaded successfully`);
    //       message.error(`${info.file.response.msg}`);
    //     } else if (info.file.status === 'error') {
    //       message.error(`${info.file.name} file upload failed.`);
    //     }
    //   },
    // }
    
    return (
      <div>
        <Row type="flex" justify="space-around">
          <Col span="5">
            <Tree
            showLine
            onSelect={this.onSelect}
            >
             <TreeNode title={threeData.title} key={threeData.id} >
               {this.rethree(threeData.data)}
             </TreeNode>
            </Tree>
          </Col>
          <Col span="18" >
            <Row type="flex" justify="space-around" style={{marginBottom:20}}>
              <Col span="5">
              <div style={{display:'flex'}}>
                  <Button type='primary' >工号</Button>  
                  <Input value={this.state.empCode} onChange={(e) =>{this.setState({empCode:e.target.value})}}  />
                </div>
              </Col>
              <Col span="5">
              <div style={{display:'flex'}}>
                  <Button type='primary' >姓名</Button>  
                  <Input value={this.state.empName} onChange={(e) =>{this.setState({empName:e.target.value})}}  />
                </div>
              </Col>
              <Col span="5">
              <div style={{display:'flex'}}>
                  <Button type='primary' >职务</Button>  
                  <Input value={this.state.levelName} onChange={(e) =>{this.setState({levelName:e.target.value})}}  />
                </div>
              </Col>
            </Row>
            <Row type="flex" justify="center"  style={{marginBottom:10}}>
              <Col span="5"><Button icon="reload" onClick={()=>this.setState({empCode:'',empName:'',levelName: ''})}  type="primary">重置</Button>  <Button  icon="search" onClick={() =>this.searchData()} type="primary">查询</Button></Col>
            </Row>
            <hr />
            <div className="comMain">
              <h3 className="comtitle">人员维护列表</h3>
                {/* <Row type="flex" justify='space-end'>
                  <Col span="3"><Button icon="plus" onClick={() =>this.addPerson()} >新增</Button></Col>
                  <Col span="3"><Button icon="edit" onClick={this.changePerson}>编辑</Button></Col>
                  <Col span="3"><Button icon="delete" onClick={this.delAddData}>删除</Button></Col>
                </Row> */}
                <Table
                  style={{marginTop:20}}
                  columns={this.state.columns}
                  dataSource={this.state.data}
                  bordered
                  rowKey="id"
                  // rowSelection={rowSelection}
                  pagination={{  // 分页
                    simple: false,
                    pageSize: 10 ,
                    // current: this.state.current,
                    total: this.state.totalLength,
                    onChange: this.changePage,
                  }}
                />
                <div>
                  <Button onClick={this.downLoad}><a href={this.state.downLoad}>导出</a></Button>
                  {/* <Upload {...up}>
                    <Button>
                      <Icon type="upload" /> Click to Upload
                    </Button>
                  </Upload> */}
                </div>
            </div>
            <Modal
              title="新增人员"
              visible={this.state.addvisible}
              onOk={() =>this.addPersonEnd()}
              onCancel={() =>this.setState({addvisible:false})}
              width={800}
              >
              <Row type="flex" justify="space-around" style={{marginBottom:20}}>
                <Col span="10">
                  <div style={{display:'flex'}}>
                    <Button type='primary' >选择公司部门</Button>  
                    <Cascader  options={this.state.options} onChange={this.onChangeBm} />
                  </div>
                </Col>
                <Col span="10">
                  <div style={{display:'flex'}}>
                    <Button type='primary' >选择职务</Button>  
                    <Select  style={{ width: 120 }} onChange={this.onChangeJob}>
                     {cityOptions}
                    </Select>
                  </div>
                </Col>
              </Row>
              <Row type="flex" justify="space-around" style={{marginBottom:20}}>
                <Col span='10'>
                  <div style={{display:'flex'}}>
                    <Button type='primary' >姓名</Button>  
                    <Input   onChange={(e) =>{this.setState({addName:e.target.value})}} />
                  </div>
                </Col>
                <Col span='10'>
                  <div style={{display:'flex'}}>
                    <Button type='primary' >手机号码</Button>  
                    <Input  onChange={(e) =>{this.setState({addPhone:e.target.value})}} />
                  </div>
                </Col>
              </Row>
              <Row type="flex" justify="space-around" style={{marginBottom:20}}>
                <Col span='10'>
                  <div style={{display:'flex'}}>
                    <Button type='primary' >证件类型</Button>  
                    <Select  style={{ width: 120 }} onChange={this.choicePapers}>
                      {papersOptions}
                    </Select>
                  </div>
                </Col>
                <Col span='10'>
                  <div style={{display:'flex'}}>
                    <Button type='primary' >证件号码</Button>  
                    <Input  onChange={(e) =>{this.setState({addPapersNumber:e.target.value})}} />
                  </div>
                </Col>
              </Row>
              <Row type="flex" justify="space-around" style={{marginBottom:20}}>
                <Col span='10'>
                  <div style={{display:'flex'}}>
                    <Button type='primary' >入职时间</Button>  
                    <DatePicker  onChange={this.onChangeDate} />
                  </div>
                </Col>
                <Col span='10'>
                  <div style={{display:'flex'}}>
                    <Button type='primary'>是否主职</Button>   
                    <RadioGroup onChange={this.mainJob}>
                      <Radio value={10}>是</Radio>
                      <Radio value={20}>否</Radio>
                    </RadioGroup>
                  </div>
                </Col>
              </Row>
              <Row type="flex" justify="space-around" style={{marginBottom:20}}>
                <Col span='10'>
                <Button type='primary' onClick={this.addPersonData} style={{ marginRight: 20 }}>添加</Button>
                <Button type="default" onClick={this.delPersonData}>删除</Button>
                </Col>
                <Col span='10'></Col>
              </Row>
              <Row type="flex" justify="space-around" >
                <Table
                  columns={this.state.addcolumns}
                  dataSource={this.state.addData}
                  bordered
                  rowKey="index"
                  size='small'
                  onRow = {(record, index) =>{
                    return {
                      onClick: () =>{
                        this.setState({delAddIndex: index})
                      }
                    }
                  }}
                />
              </Row>
            </Modal>
            <Modal
              title="编辑人员"
              visible={this.state.addvisible1}
              onOk={() =>this.changePerson()}
              onCancel={() =>this.setState({addvisible1:false})}
              width={800}
            >
              <Row type="flex" justify="space-around" style={{marginBottom:20}}>
                <Col span="10">
                  <div style={{display:'flex'}}>
                    <Button type='primary' >选择公司部门</Button>  
                    <Cascader  options={this.state.options} onChange={this.onChangeBm1} />
                  </div>
                </Col>
                <Col span="10">
                </Col>
              </Row>
              <Row type="flex" justify="space-around" style={{marginBottom:20}}>
                <Col span="10">
                  <div style={{display:'flex'}}>
                    <Button type='primary' >选择职务</Button>  
                    <Select  style={{ width: 120 }} onChange={this.onChangeJob1}>
                     {cityOptions}
                    </Select>
                  </div>
                </Col>
                <Col span='10'>
                  <div style={{display:'flex'}}>
                    <Button type='primary' >手机号码</Button>  
                    <Input  onChange={(e) =>{this.setState({changePhone:e.target.value})}} />
                  </div>
                </Col>
              </Row>
            </Modal>
          </Col>
        </Row>  
      </div>
    )
  }
}


export default Person;

