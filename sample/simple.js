import {validate} from '../src/validator';
import {one, all, required, 
  eq, min, max, eqLen, minLen, maxLen,
  within, regex, isNotEmpty, isNotNil, 
  isNumber, isString, 
  phone, email, url} from '../src/validator-helper';


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
  name: all([required(), minLen(4), maxLen(12)]),
  age: all([min(21, "Sorry, you are not the legal age!"), max(55)]),
  shirtSize: all([within(['small', 'medium', 'large'])])
};
var val = validate(schema);
var result = val(cust);
console.log(result);
