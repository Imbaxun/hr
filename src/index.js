import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './page/App';
import registerServiceWorker from './registerServiceWorker';
import { LocaleProvider } from 'antd';
import zh_CN from 'antd/lib/locale-provider/zh_CN';
import 'moment/locale/zh-cn';

ReactDOM.render(<LocaleProvider locale={zh_CN}><App /></LocaleProvider>, document.getElementById('root'));
registerServiceWorker();
