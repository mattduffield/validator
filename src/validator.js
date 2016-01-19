import R from 'ramda';

var runPred = (fn, value, prop) => fn(value, prop);
var val = R.curry(function(schema, values) {
  return R.mapObjIndexed(function (pred, prop) {
    var v = values[prop];
    var ignore = !v ? '__ignore__' : '';
  	return {name: prop, value: v, result: runPred(pred, v, prop), ignore};
  }, schema);  
});
var validate = R.curry(function(schema, values) {
  var result = val(schema, values);
  // Empty the 'ignore' field if field is required.
  result = R.map(x => {
    var isR = x.result.filter((item) => item.includes('__req__'));    
    if (isR.length > 0) {
      x.ignore = '';
    }
    return x;
  }, result)
  // Now that we have processed required fields, we can 
  // safely remove the 'ignore' fields.
  var ig = (val, key) => val['ignore'] === '';
  result = R.pickBy(ig, result);
  // Strip off the '__req__' text.
  result = R.map(x => {
    x.result = R.map(y => y.replace(/__req__/g, ''), x.result);
    return x;
  }, result)
  // Finally, remove the 'ignore' field.
  result = R.map(x => {
    return R.dissoc('ignore', x);
  }, result)

  return result;
});

export * from './validator-helper';
export {
  validate
};