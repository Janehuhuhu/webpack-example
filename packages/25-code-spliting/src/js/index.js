// import '../css/index.css'
// import _ from 'lodash'
// console.log('test code spliting', _.join(['a', 'b'], '-'))

/**
 * 动态导入
 */
function getComponent() {
  import('./share').then(res => {
    console.log('aaa', res.add(1,2))
  })
 return import('lodash')
   .then(({ default: _ }) => {
     const element = document.createElement('div');
     element.innerHTML = _.join(['Hello1', 'webpack'], ' ');
     return element;
   })
   .catch((error) => 'An error occurred while loading the component');
}
getComponent().then((component) => {
 document.body.appendChild(component);
});