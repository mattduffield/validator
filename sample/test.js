import R from 'ramda';
import * as V from '../src/validator';

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
  // firstname: V.all([V.one(x => x.length > 4, (value, prop) => 'Name must be longer than 4.')]),
  firstname: V.all([V.eqLen(4), V.minLen(3), V.maxLen(7)]),
  lastname: V.all([V.required()]),
  address: V.all([V.required()]),
  // age: V.all([V.min(45, (value, prop) => `${prop} has to be above 45.`)]),
  // age: V.all([V.min(45, "Age must be higher than 45.")]),
  age: V.all([V.min(21), V.max(55)]),
  gender: V.all([V.required(null, 'Pleaase provide a gender!'), V.within(['male', 'female'])]),
  // gender: V.all([V.required(null, 'Pleaase provide a gender!'), V.one(x => x === 'male' || x === 'female', (value, prop) => 'Must be a valid gender.')]),
  // gender: V.one(x => x === 'male' || x === 'female', (value, prop) => 'Must be a valid gender.')
  size: V.all([V.within(['small', 'medium', 'large'])]),
  // phone: V.all([regex(/^((([0-9]{3}))|([0-9]{3}))[-\s\.]?[0-9]{3}[-\s\.]?[0-9]{4}$/)])
  phone: V.all([V.phone(null, 'Phone did not pass the expression!')]),
  email: V.all([V.required(), V.email(null, 'Invalid email.')]),
  url: V.all([V.url()]),
  weight: V.all([V.isNumber()]),
  title: V.all([V.isString()]),
  prefix: V.all([V.isNotEmpty()]),
  suffix: V.all([V.required(), V.isNotNil()])
};
var val = V.validate(schema);
var result = val(cust);
console.log(result);

