import R from 'ramda';

var one = (pred, fail, required = '') => R.cond([[pred, R.always('')], [R.T, typeof fail === "function" ? (t,f) => fail(t, f) + required : () => fail + required]]);
var all = R.curry((array, value, prop) => R.map((pred) => pred(value, prop), array));

var firstUC = prop => R.concat(R.compose(R.toUpper, R.head)(prop), R.tail(prop));

var required = (target, fail) => one(x => x ? true: false, fail || ((value, prop) => `${firstUC(prop)} is a required field`), '__req__');
var eq = (target, fail) => one(x => x == target, fail || ((value, prop) => `${firstUC(prop)} must equal ${target}`));
var min = (target, fail) => one(x => x > target, fail || ((value, prop) => `${firstUC(prop)} must be greater than ${target}`));
var max = (target, fail) => one(x => x < target, fail || ((value, prop) => `${firstUC(prop)} must be less than ${target}`));
var eqLen = (target, fail) => one(x => x.length == target, fail || ((value, prop) => `${firstUC(prop)} (${value}) length must equal ${target}`));
var minLen = (target, fail) => one(x => x.length > target, fail || ((value, prop) => `${firstUC(prop)} must be longer than ${target}`));
var maxLen = (target, fail) => one(x => x.length < target, fail || ((value, prop) => `${firstUC(prop)} must be shorter than ${target}`));
var within = (target, fail) => one(x => target.find(item => item == x) ? true : false,
	fail || ((value, prop) => `${firstUC(prop)} (${value}) must be within the following values: [${target}]`));
var regex = (target, fail) => one(x => {
	var re = target.exec(x);
	return re ? true : false;
}, fail || ((value, prop) => `${firstUC(prop)} did not pass the expression "${target}"`));
var isNotNil = (target, fail) => one(x => !R.isNil(x), fail || ((value, prop) => `${firstUC(prop)} must not be null or undefined`));
var isNotEmpty = (target, fail) => one(x => !R.isEmpty(x), fail || ((value, prop) => `${firstUC(prop)} must not be empty`));
var isNumber = (target, fail) => one(x => R.is(Number, x), fail || ((value, prop) => `${firstUC(prop)} must be a Number`));
var isString = (target, fail) => one(x => R.is(String, x), fail || ((value, prop) => `${firstUC(prop)} must be a String`));
var isObject = (target, fail) => one(x => R.is(Object, x), fail || ((value, prop) => `${firstUC(prop)} must be an Object`));
var phone = (target, fail) => regex(/^((([0-9]{3}))|([0-9]{3}))[-\s\.]?[0-9]{3}[-\s\.]?[0-9]{4}$/, fail);
var email = (target, fail) => regex(/^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/, fail);
var url = (target, fail) => regex(/(http|ftp|https):\/\/[\w-]+(\.[\w-]+)+([\w.,@?^=%&amp;:\/~+#-]*[\w@?^=%&amp;\/~+#-])?/, fail);

export {
	// Validators
	one,
	all,
	// Conditions
	required,
	eq,
	min,
	max,
	eqLen,
	minLen,
	maxLen,
	within,
	regex,
	isNotEmpty,
	isNotNil,
	isNumber,
	isString,
	isObject,
	phone,
	email,
	url
}