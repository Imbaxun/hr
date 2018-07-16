import React from 'react';
import { BrowserRouter, Route } from 'react-router-dom'

import Login from '../page/login/login'
import Main from '../page/main/main'




export const routFirst = () =>{
  return (
    <BrowserRouter>
    <div>
      <Route exact path='/' component={Login}  />
      <Route path='/main' component={Main} />


    </div>
    </BrowserRouter>
  )
}

