# validator

This is a functional styled validation engine.

##Welcome to the Validator!
This library is an attempt to create a functional, easy to use, validation library that has a very small implementation footprint.  It is the goal of this library to remove as much ceremony as possible and allow for rich validation operations.

``` javascript
var cust = {
  name: 'john',
  age: 19,
  shirtSize: 'large',
};
var schema = {
  name: all([required(), minLen(4), maxLen(12)]),
  age: all([min(21), max(55)]),
  shirtSize: all([within(['small', 'medium', 'large'])])
};
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

- [API](https://github.com/mattduffield/validator/blob/master/api.md)
  - [one](https://github.com/mattduffield/validator/blob/master/api.md#one)
  - [all](https://github.com/mattduffield/validator/blob/master/api.md#all)
  - [required](https://github.com/mattduffield/validator/blob/master/api.md#required)
  - [eq](https://github.com/mattduffield/validator/blob/master/api.md#eqtarget-fail)
  - [min](https://github.com/mattduffield/validator/blob/master/api.md)
  - [max](https://github.com/mattduffield/validator/blob/master/api.md)
  - [eqLen](https://github.com/mattduffield/validator/blob/master/api.md)
  - [minLen](https://github.com/mattduffield/validator/blob/master/api.md)
  - [maxLen](https://github.com/mattduffield/validator/blob/master/api.md)
  - [within](https://github.com/mattduffield/validator/blob/master/api.md)
  - [regex](https://github.com/mattduffield/validator/blob/master/api.md)
  - [isNotNil](https://github.com/mattduffield/validator/blob/master/api.md)
  - [isNotEmpty](https://github.com/mattduffield/validator/blob/master/api.md)
  - [isNumber](https://github.com/mattduffield/validator/blob/master/api.md)
  - [isString](https://github.com/mattduffield/validator/blob/master/api.md)
  - [isObject](https://github.com/mattduffield/validator/blob/master/api.md)
  - [phone](https://github.com/mattduffield/validator/blob/master/api.md)
  - [email](https://github.com/mattduffield/validator/blob/master/api.md)
  - [url](https://github.com/mattduffield/validator/blob/master/api.md)

##Dependencies
This library has a dependency on the following:

* [RamdaJS](http://ramdajs.com)
* [BabelJS](https://babeljs.io/)

We use RamdaJS as our functional library to help us create our validation engine as well as our validation functions.  We are using BabelJS to allow for transpiling our ES6 code back to ES5 with a special emphasis on fat arrow (=>) syntax.  

##Limitations
This library does not try to support nested-validations.  In fact, it is recommended that you produce a schema for each level you wish to validate.
