// import _ from 'lodash'
// console.log(_.join(['Another10', 'module', 'loaded!'], ' '));
function getComponent() {
  return import(/* webpackChunkName: "lodash" *//* webpackPrefetch: true */ 'lodash')
    .then(({ default: _ }) => {
      const element = document.createElement('div');
      element.innerHTML = _.join(['Hello211', 'webpack'], ' ');
      return element
    })
    .catch((error) => 'An error occurred while loading the component');
 }

const oBtn = document.querySelector('button');
oBtn.onclick = function() {
  getComponent().then((component) => {
    document.body.appendChild(component);
   });
};

export { getComponent }