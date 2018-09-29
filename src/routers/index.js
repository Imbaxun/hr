import React from 'react';
import { BrowserRouter as Router, Route } from 'react-router-dom'

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

//后台功能需求
import Dictionaries from '../components/dictionaries/dictionaries'
import CheckingData from '../components/CheckingData/CheckingData'
import CheckSolr from '../components/CheckSolr/CheckSolr'
import CheckingStore from '../components/CheckingStore/CheckingStore'


//高级设置
import HolidaySeting from '../components/HolidaySeting/HolidaySeting'
import TimeTacking from '../components/TimeTacking/TimeTacking'
import Version from '../components/Version/Version'

//考勤管理
import Attendance from '../components/attendance/attendance'
import StatisticalForm from '../components/statisticalForm/statisticalForm'
import Batch from '../components/Batch/Batch'

//门店打卡处理
import DailyClock from '../components/DailyClock/DailyClock'
import DayClock from '../components/DayClock/DayClock.js'
import ShopClock from '../components/ShopClock/ShopClock'

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
      <Route path='/main/Travel' component={Travel} />
      <Route path='/main/WorkOverTime' component={WorkOverTime} />
      <Route path='/main/CheckingData' component={CheckingData} />
      <Route path='/main/CheckSolr' component={CheckSolr} />
      <Route path='/main/HolidaySeting' component={HolidaySeting} />
      <Route path='/main/TimeTacking' component={TimeTacking} />
      <Route path='/main/Attendance' component={Attendance} />
      <Route path='/main/StatisticalForm' component={StatisticalForm} />
      <Route path='/main/CheckingStore' component={CheckingStore} />
      <Route path='/main/Batch' component={Batch} />
      <Route path='/main/Version' component={Version} />
      <Route path='/main/DailyClock' component={DailyClock} />
      <Route path='/main/DayClock' component={DayClock} />
      <Route path='/main/ShopClock' component={ShopClock} />
    </div>
  )
}

