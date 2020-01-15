const equals  = require('fast-equals');
 
console.log(equals.deepEqual({ foo: 'bar' }, { foo: 'bar' })); // true
const a =[{foo:"bar",foo1:"bar1",foo2:"bar2"}]
const b =[{foo:"bar",foo1:"bar1",foo2:"bar2"}]
console.log(equals.circularShallowEqual(a,b));