import R from 'ramda';
import {validate} from '../src/validator';
import {one, all, required, 
  eq, min, max, eqLen, minLen, maxLen,
  within, regex, isNotEmpty, isNotNil, 
  isNumber, isString, 
  phone, email, url} from '../src/validator-helper';

var cust = {
  firstname: 'matthew',
  lastname: 'duffield',
  age: 43,
  gender: 'male',
  size: 'xlarge',
  phone: '503-985-7319x',
  email: 'matt.duffield@gmail.com',
  url: 'http://www.google.com',
  weight: '100',
  title: 'Mr. Duffield',
  prefix: '',
  suffix: null
};
var schema = {
  // firstname: all([one(x => x.length > 4, (value, prop) => 'Name must be longer than 4.')]),
  firstname: all([eqLen(4), minLen(3), maxLen(7)]),
  lastname: all([required()]),
  address: all([required()]),
  // age: all([min(45, (value, prop) => `${prop} has to be above 45.`)]),
  // age: all([min(45, "Age must be higher than 45.")]),
  age: all([min(21), max(55)]),
  gender: all([required(null, 'Pleaase provide a gender!'), within(['male', 'female'])]),
  // gender: all([required(null, 'Pleaase provide a gender!'), one(x => x === 'male' || x === 'female', (value, prop) => 'Must be a valid gender.')]),
  // gender: one(x => x === 'male' || x === 'female', (value, prop) => 'Must be a valid gender.')
  size: all([within(['small', 'medium', 'large'])]),
  // phone: all([regex(/^((([0-9]{3}))|([0-9]{3}))[-\s\.]?[0-9]{3}[-\s\.]?[0-9]{4}$/)])
  phone: all([phone(null, 'Phone did not pass the expression!')]),
  email: all([required(), email(null, 'Invalid email.')]),
  url: all([url()]),
  weight: all([isNumber()]),
  title: all([isString()]),
  prefix: all([isNotEmpty()]),
  suffix: all([required(), isNotNil()])
};
var val = validate(schema);
var result = val(cust);
console.log(result);
