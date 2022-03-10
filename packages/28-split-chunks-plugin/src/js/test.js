import _ from 'lodash'
import { add } from './share';
console.log(_.join(['Another1', 'module', 'loaded!'], ' '));
add(2, 3)
// import(/* webpackChunkName: "share" */'./share').then(res => {
//   console.log('antho', res.add(1,2))
// })
