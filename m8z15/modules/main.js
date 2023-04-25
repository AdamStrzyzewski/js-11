/* eslint-disable import/extensions */
import primitive, { square, diag } from './my-module.js';
import * as module1 from './my-module.js';
import module2 from './my-module-2.js';

console.log({ primitive });
console.log(module1.square(100));
console.log(square(11));
console.log(diag(11, 15));

console.log('module2', module2.diag(10, 100));
