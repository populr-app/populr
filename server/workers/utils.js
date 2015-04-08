/**
 * Returns 2-dimensional array where the inner arrays contain num items each.
 *
 * @param {Array} [arr] [the array to separate]
 * @param {Number} [num] [the number to separate at]
 *
 * @return {Array} [A 2-dimensional array of num elements per item]
 */

module.exports.separateArray = function(arr, num) {
  var counter = 0;
  var separated = [];
  while (counter < arr.length) {

    // case 1: has over num elements left
    if ((arr.length - counter) > num) {
      separated.push (arr.slice(counter, (counter + num)));
      counter += 100;
    }

    // case 2: remainder
    else {
      separated.push(arr.slice(counter, arr.length));
      counter += arr.length - counter;
    }
  }

  return separated;
};
