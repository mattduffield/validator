import * as V from '../src/validator';


var cust = {
  // name: 'john',
  age: 19,
  shirtSize: 'large',
};
var schema = {
  name: V.all([V.required()]),
  age: V.all([V.min(21), V.max(55)]),
  shirtSize: V.all([V.within(['small', 'medium', 'large'])])
};
var val = V.validate(schema);
var result = val(cust);
console.log(result);
