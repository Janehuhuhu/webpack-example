import { add } from './share';

/**
 * 动态导入
 */
function getComponent() {
 add(1, 2)
 return import(/* webpackChunkName: "lodash" */'lodash')
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