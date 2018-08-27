import { Component } from 'react';
import *as route from '../routers/index';
import '../App.css'



class App extends Component {
  render() {
    return (
      route.routFirst()
    )
  }
}

export default App;
