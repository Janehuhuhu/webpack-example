// import '../css/detail.css'
// import _ from 'lodash';
// import dayjs from 'dayjs'
// console.log(_.join(['1', '2', '3'], '+'))
// console.log('ss', dayjs().format())

// const test = () => {
//   console.log('test===>')
// }
// console.log('aa', test)

import '../css/detail.css';
import $ from 'jquery';
import _ from 'lodash';
import moment from 'moment';
import 'moment/locale/zh-cn.js';

moment.locale('zh-cn');
const time = moment('20111031', 'YYYYMMDD').fromNow();
console.log(time);

const $div = $('<div></div>');
$div.text(_.join(['1', '2', '3'], '+'));
$('body').append($div);