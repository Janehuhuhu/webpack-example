import '../css/index.css'
// import _ from 'lodash'
import { getComponent } from './test'

const element = document.createElement('div');
element.innerHTML = _.join(['Hello10', 'webpack1'], ' ');
document.body.appendChild(element);
