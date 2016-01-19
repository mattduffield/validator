import * as V from '../src/validator';


var cust = {
  name: 'john',
  age: 19,
  shirtSize: 'large',
};
// var schema = {
//   name: all([required(), minLen(3), maxLen(12)]),
//   age: all([min(21), max(55)]),
//   shirtSize: all([within(['small', 'medium', 'large'])])
// };
var schema = {
  name: V.all([V.required(), V.minLen(4), V.maxLen(12)]),
  age: V.all([V.min(21, "Sorry, you are not the legal age!"), V.max(55)]),
  shirtSize: V.all([V.within(['small', 'medium', 'large'])])
};
var val = V.validate(schema);
var result = val(cust);
console.log(result);
