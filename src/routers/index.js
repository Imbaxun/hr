import React from 'react';
import { HashRouter as Router, Route } from 'react-router-dom'

import Login from '../page/login/login'
import Main from '../page/main/main'

//组织公司，门店人员
import Company from '../components/company/company'
import Department from '../components/department/department'
import Duty from '../components/duty/duty'
import JobLever from '../components/jobLever/jobLever'
import Person from '../components/person/person'
import Shop from '../components/shop/shop'


//班次管理
import ClassManage from '../components/ClassManagement/ClassManagenment';
import ClassSearch from '../components/ClassSearch/ClassSearch'
import BurshCard from '../components/BurshCard/BurshCard'
import Leave from '../components/leave/leave'
import Travel from '../components/Travel/Travel'
import WorkOverTime from '../components/WorkOverTime/WorkOverTime'

import BurshCardA from '../components/BurshCardA/BurshCardA'

//后台功能需求
import Dictionaries from '../components/dictionaries/dictionaries'
import CheckingData from '../components/CheckingData/CheckingData'
import CheckSolr from '../components/CheckSolr/CheckSolr'
import CheckingStore from '../components/CheckingStore/CheckingStore'
import userUnbound from '../components/userUnbound/userUnbound'


//高级设置
import HolidaySeting from '../components/HolidaySeting/HolidaySeting'
import TimeTacking from '../components/TimeTacking/TimeTacking'
import Version from '../components/Version/Version'
import PhoneId from '../components/PhoneId/PhoneId'
import MenuManager from '../components/MenuManager/MenuManager'
import userRoleManager from '../components/userRoleManager/userRoleManager'
import PermissionManager from '../components/PermissionManager/PermissionManager'

//考勤管理
import Attendance from '../components/attendance/attendance'
import StatisticalForm from '../components/statisticalForm/statisticalForm'
import Batch from '../components/Batch/Batch'

//门店打卡处理
import DailyClock from '../components/DailyClock/DailyClock'
import DayClock from '../components/DayClock/DayClock.js'
import ShopClock from '../components/ShopClock/ShopClock'
import EmpDays from '../components/empdays/empdays'
import ProcessView from '../components/ProcessView/ProcessView'
import JBProcess from '../components/JBProcess/JBProcess'
import QJProcess from '../components/QJProcess/QJProcess'
import XJProcess from '../components/XJProcess/XJProcess'
import BSKProcess from '../components/BSKPrpcess/BSKProcess'

//门店流程具体数据
import StoreBSK from '../components/StoreBSK/StoreBSK'
import StoreQJ from '../components/StoreQJ/StoreQJ'
import StoreXJ from '../components/StoreXJ/StoreXJ'
import StoreJB from '../components/StoreJB/StoreJB'


// 门店
import StoreScheduling from '../components/StoreScheduling/StoreScheduling' // 门店排班查询
import StoreSchedulingManage from '../components/StoreSchedulingManage/StoreSchedulingManage' // 门店班次管理

// 卤味厨房
import KitchenScheduling from '../components/KitchenScheduling/KitchenScheduling'  // 卤味厨房班次查询
import KitchenSchedulingManage from '../components/KitchenSchedulingManage/KitchenSchedulingManage' // 卤味厨房班次管理
import KitchenPhoneId from '../components/KitchenPhoneId/KitchenPhoneId'  //设备解绑

// 工业园
import FactoryScheduling from '../components/FactoryScheduling/FactoryScheduling' // 工业园排班查询
import FactorySchedulingManage from '../components/FactorySchedulingManage/FactorySchedulingManage' // 工业园排班管理
import workRule from '../components/WorkRule/WorkRule'  //考勤规则
import CompanyTravel from '../components/CompanyTravel/CompanyTravel'
import BasePunchRecordSolr from '../components/BasePunchRecordSolr/BasePunchRecordSolr'
import FactoryReport from '../components/factory/FactoryReport'
import FactoryHrTimeTacking from '../components/TimeTacking/FactoryHrTimeTacking'//工业园考勤处理类型
import LeaveA from '../components/leave/leaveA';


export const routFirst = () =>{
  return (
    <Router>
    <div>
      <Route exact path='/' component={Login}  />
      <Route path='/main' component={Main} />
    </div>
    </Router>
  )
}

export const mainRouters = () => {
  return (
    <div>
      <Route exact  path={`/main/Company`} component={Company} />
      <Route  path={`/main/Department`} component={Department} />
      <Route  path={`/main/Duty`} component={Duty} />
      <Route  path={`/main/JobLever`} component={JobLever} />
      <Route path={`/main/Person`} component={Person} />
      <Route path='/main/Dictionaries' component={Dictionaries} />
      <Route path='/main/Shop' component={Shop} />
      <Route path='/main/ClassManage' component={ClassManage} />
      <Route path='/main/ClassSearch' component={ClassSearch} />
      <Route path='/main/BurshCard' component={BurshCard} />
      <Route path='/main/Leave' component={Leave} />
      <Route path='/main/LeaveA' component={LeaveA} />
      <Route path='/main/Travel' component={Travel} />
      <Route path='/main/WorkOverTime' component={WorkOverTime} />
      <Route path='/main/CheckingData' component={CheckingData} />
      <Route path='/main/CheckSolr' component={CheckSolr} />
      <Route path='/main/HolidaySeting' component={HolidaySeting} />
      <Route path='/main/TimeTacking' component={TimeTacking} />
      <Route path='/main/FactoryTimeTacking' component={FactoryHrTimeTacking} />
      <Route path='/main/Attendance' component={Attendance} />
      <Route path='/main/StatisticalForm' component={StatisticalForm} />
      <Route path='/main/CheckingStore' component={CheckingStore} />
      <Route path='/main/Batch' component={Batch} />
      <Route path='/main/Version' component={Version} />
      <Route path='/main/DailyClock' component={DailyClock} />
      <Route path='/main/DayClock' component={DayClock} />
      <Route path='/main/ShopClock' component={ShopClock} />
      <Route path='/main/EmpDays' component={EmpDays} />
      <Route path='/main/PhoneId' component={PhoneId} />
      <Route path='/main/userUnbound' component={userUnbound} />
      <Route path='/main/ProcessView' component={ProcessView} />
      <Route path='/main/JBProcess' component={JBProcess} />
      <Route path='/main/QJProcess' component={QJProcess} />
      <Route path='/main/XJProcess' component={XJProcess} />
      <Route path='/main/BSKProcess' component={BSKProcess} />
      <Route path='/main/BurshCardA' component={BurshCardA} />
      <Route path='/main/MenuManager' component={MenuManager} />
      <Route path='/main/userRoleManager' component={userRoleManager} />
      <Route path='/main/PermissionManager' component={PermissionManager} />
      <Route path='/main/StoreBSK' component={StoreBSK} />
      <Route path='/main/StoreXJ' component={StoreXJ} />
      <Route path='/main/StoreJB' component={StoreJB} />
      <Route path='/main/StoreQJ' component={StoreQJ} />
      <Route path="/main/FactoryScheduling" component={FactoryScheduling} />
      <Route path="/main/KitchenScheduling" component={KitchenScheduling} />
      <Route path="/main/StoreScheduling" component={StoreScheduling} />
      <Route path="/main/StoreSchedulingManage" component={StoreSchedulingManage} />
      <Route path="/main/FactorySchedulingManage" component={FactorySchedulingManage} />
      <Route path="/main/KitchenSchedulingManage" component={KitchenSchedulingManage} />
      <Route path="/main/workRule" component={workRule} />
      <Route path="/main/CompanyTravel" component={CompanyTravel} />
      <Route path="/main/KitchenPhoneId" component={KitchenPhoneId} />
      <Route path="/main/BasePunchRecordSolr" component={BasePunchRecordSolr} />
      <Route path="/main/FactoryReport" component={FactoryReport} />
    </div>
  )
}

