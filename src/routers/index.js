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
import Dictionaries from '../components/dictionaries/dictionaries'
import Shop from '../components/shop/shop'


//班次管理
import ClassManage from '../components/ClassManagement/ClassManagenment';




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
    </div>
  )
}

