import _ from 'lodash'
console.log(_.join(['Another1', 'module', 'loaded!'], ' '));
import('./share').then(res => {
  console.log('antho', res.add(1,2))
})
