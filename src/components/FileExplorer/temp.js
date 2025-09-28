/**
arr.forEach((item, index, array) => { ... })
arr.map((item, index, array) => newValue)
arr.filter((item, index, array) => condition)


First element that matches condition, or undefined.
arr.find((item, index, array) => condition)


Index of first matching element, or -1.
arr.findIndex((item, index, array) => condition)



true if at least one element passes condition, else false.
arr.some((item, index, array) => condition)



true if all elements pass condition, else false
arr.every((item, index, array) => condition)



Single accumulated value.
arr.reduce((acc, item, index, array) => newAcc, initialValue)



true if value is present, else false
arr.includes(value, fromIndex?)


Sorted array (⚠️ mutates original).
arr.sort((a, b) => a - b)




for...in
Iterates over enumerable keys in the object (including inherited ones).

const obj = { a: 1, b: 2, c: 3 };

for (let key in obj) {
  if (obj.hasOwnProperty(key)) { // ✅ safer (ignores prototype keys)
    console.log(key, obj[key]);
  }
}


Object.keys()

Object.keys(obj).forEach(key => {
  console.log(key, obj[key]);
});



Object.values()
Object.values(obj).forEach(value => {
  console.log(value);
});

Object.entries()

Returns an array of [key, value] pairs.

Object.entries(obj).forEach(([key, value]) => {
  console.log(key, value);
});




for (const [key, value] of Object.entries(obj)) {
  console.log(key, value);
}



 */
