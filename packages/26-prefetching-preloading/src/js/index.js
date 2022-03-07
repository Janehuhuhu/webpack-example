
function getComponent() {
 return import(/* webpackChunkName: "lodash" *//* webpackPrefetch: true */ 'lodash')
   .then(({ default: _ }) => {
     const element = document.createElement('div');
     element.innerHTML = _.join(['Hello', 'webpack'], ' ');
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