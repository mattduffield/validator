# validator

This is a functional styled validation engine.

##Welcome to the Validator!
This library is an attempt to create a functional, easy to use, validation library that has a very small implementation footprint.  It is the goal of this library to remove as much ceremony as possible and allow for rich validation operations.

Given the following customer object:

``` javascript
var cust = {
  name: 'john',
  age: 19,
  shirtSize: 'large',
};
```

Next, using the following schema validation:

``` javascript
var schema = {
  name: all([required(), minLen(4), maxLen(12)]),
  age: all([min(21), max(55)]),
  shirtSize: all([within(['small', 'medium', 'large'])])
};
```

Finally, you run the validation engine:

``` javascript
var val = validate(schema);
var result = val(cust);
console.log(result);
```

You would get the following in the result object:

``` javascript
{ name: { 
    name: 'name', 
    value: 'john', 
    result: [ '', '', '' ] 
  },
  age: { 
    name: 'age',
    value: 19,
    result: [ 'Age must be greater than 21', '' ] 
  },
  shirtSize: { 
    name: 'shirtSize', 
    value: 'large', 
    result: [ '' ] 
  } 
}
```
##Documentation
Please refer to the following documentation for more information:

- [API](https://github.com/mattduffield/validator/blob/master/doc/api.md)
  - [one](https://github.com/mattduffield/validator/blob/master/doc/api.md#onetarget-fail)
  - [all](https://github.com/mattduffield/validator/blob/master/doc/api.md#alltarget-fail)
  - [required](https://github.com/mattduffield/validator/blob/master/doc/api.md#requiredtarget-fail)
  - [eq](https://github.com/mattduffield/validator/blob/master/doc/api.md#eqtarget-fail)
  - [min](https://github.com/mattduffield/validator/blob/master/doc/api.md#mintarget-fail)
  - [max](https://github.com/mattduffield/validator/blob/master/doc/api.md#maxtarget-fail)
  - [eqLen](https://github.com/mattduffield/validator/blob/master/doc/api.md#eqlentarget-fail)
  - [minLen](https://github.com/mattduffield/validator/blob/master/doc/api.md#minlentarget-fail)
  - [maxLen](https://github.com/mattduffield/validator/blob/master/doc/api.md#maxlentarget-fail)
  - [within](https://github.com/mattduffield/validator/blob/master/doc/api.md#withintarget-fail)
  - [regex](https://github.com/mattduffield/validator/blob/master/doc/api.md#regextarget-fail)
  - [isNotNil](https://github.com/mattduffield/validator/blob/master/doc/api.md#isnotniltarget-fail)
  - [isNotEmpty](https://github.com/mattduffield/validator/blob/master/doc/api.md#isnotemptytarget-fail)
  - [isNumber](https://github.com/mattduffield/validator/blob/master/doc/api.md#isnumbertarget-fail)
  - [isString](https://github.com/mattduffield/validator/blob/master/doc/api.md#isstringtarget-fail)
  - [isObject](https://github.com/mattduffield/validator/blob/master/doc/api.md#isobjecttarget-fail)
  - [phone](https://github.com/mattduffield/validator/blob/master/doc/api.md#phonetarget-fail)
  - [email](https://github.com/mattduffield/validator/blob/master/doc/api.md#emailtarget-fail)
  - [url](https://github.com/mattduffield/validator/blob/master/doc/api.md#urltarget-fail)

##Dependencies
This library has a dependency on the following:

* [RamdaJS](http://ramdajs.com)
* [BabelJS](https://babeljs.io/)

We use RamdaJS as our functional library to help us create our validation engine as well as our validation functions.  We are using BabelJS to allow for transpiling our ES6 code back to ES5 with a special emphasis on fat arrow (=>) syntax.  

##Limitations
This library does not try to support nested-validations.  In fact, it is recommended that you produce a schema for each level you wish to validate.
