const expect = require('chai').expect;

describe('Vault Tests', () => {
    describe('Reverse Array', () => {
        it('should turn the below string into an array and reverse the words', () => {
            let data = "I want this job.";

            data = splitAndReverse(data);

            expect(['job', 'this', 'want', 'I']).to.deep.equal(data);
        });
    });
    describe('Order Array', () => {
        it('should sort the below array', () => {
            let data = ['200', '450', '2.5', '1', '505.5', '2'];

            toNumbers(data);
            quicksort(data);

            expect([1, 2, 2.5, 200, 450, 505.5]).to.deep.equal(data);
        });
    });
    describe('Get Diff Array', () => {
        it('should determine array differences', () => {
            let data1 = [1, 2, 3, 4, 5, 6, 7];
            let data2 = [2, 4, 5, 7, 8, 9, 10];

            let data = getDifferences(data1, data2);

            expect([8, 9, 10]).to.deep.equal(data);

            data = getDifferences(data2, data1);

            expect([1, 3, 6]).to.deep.equal(data);
        });
    });
    describe('Get Distance', () => {
        it('should get the distance between two geo points', () => {
            let place1 = {
                lat: '41.9641684',
                lon: '-87.6859726',
            };
            let place2 = {
                lat: '42.1820210',
                lon: '-88.3429465',
            };

            let distance = getDistance(place1, place2);

            expect(distance).to.equal('36.91');
        });
    });
    describe('Get Human Time Diff', () => {
        it('should generate a human readable time difference', () => {
            let time1 = '2016-06-05T12:00:00';
            let time2 = '2016-06-05T15:00:00';

            let timeDiff = getTimeDiff(time1, time2);

            expect(timeDiff).to.equal('3 hours ago');
        });
    });
});

// This could be improved further by looking for commas or other special
// characters and removing them.
function splitAndReverse(str) {
  // If last character is neither a letter nor a number, remove it.
  if (str[str.length - 1].match(/[^a-z|0-9]/i)) {
    str = str.substring(0, str.length - 1);
  }
  let strArray = str.split(" ");
  return strArray.reverse();
}

function toNumbers(array) {
  for (let i = 0; i < array.length; i++) {
    array[i] = Number(array[i]);
  }
}

function quicksort(array) {
  quicksortHelper(array, 0, array.length - 1);
}

function quicksortHelper(array, low, high) {
  if (low < high) {
    let pivotIdx = partition(array, low, high)
    // Sort the left subarray.
    quicksortHelper(array, low, pivotIdx - 1);
    // Sort the right subarray.
    quicksortHelper(array, pivotIdx + 1, high);
  }
}

function partition(array, low, high) {
  // Pivot selected is always the last element in the current range.
  let pivot = array[high];
  let j = low;
  // Place elements that are smaller than pivot to the left,
  // and elements that are greater than pivot to the right.
  for (let i = low; i < high; i++) {
    if (array[i] < pivot) {
      swap(array, i, j);
      j++;
    }
  }
  swap(array, j, high);
  return j;
}

function swap(array, i, j) {
  let temp = array[i];
  array[i] = array[j];
  array[j] = temp;
}

function getDifferences(array1, array2) {
  let differences = [];
  const numberSet = new Set(array1);
  for (let el of array2) {
    if (!numberSet.has(el)) {
      differences.push(el);
    }
  }
  return differences;
}

function getDistance(place1, place2) {
  const earthRadius = 3959;
  const lat1 = degToRad(place1.lat);
  const lat2 = degToRad(place2.lat);
  const deltaLat = degToRad(place2.lat - place1.lat);
  const deltaLon = degToRad(place2.lon - place1.lon);

  // Application of the Haversine formula.
  let a = Math.sin(deltaLat / 2) * Math.sin(deltaLat / 2);
  a += Math.cos(lat1) * Math.cos(lat2) * Math.sin(deltaLon / 2) * Math.sin(deltaLon / 2);
  let c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
  let distance =  earthRadius * c;

  // Round to the nearest hundredth.
  let roundedDist = Math.round(100 * distance) / 100
  return roundedDist.toString();
}

function degToRad(num) {
  return num * (Math.PI / 180);
}

// I am assuming that time1 is always before time2.
function getTimeDiff(time1, time2) {
  let outputMsg = '';

  time1 = new Date(time1);
  time2 = new Date(time2);

  const yearDiff = time2.getFullYear() - time1.getFullYear();
  const monthDiff = time2.getMonth() - time1.getMonth();
  const dayDiff = time2.getDay() - time2.getDay();
  const hourDiff = time2.getHours() - time1.getHours();
  const minuteDiff = time2.getMinutes() - time1.getMinutes();
  const secondDiff = time2.getSeconds() - time1.getSeconds();

  if (yearDiff > 0) {
    outputMsg += yearDiff === 1 ? `${yearDiff} year ` : `${yearDiff} years ` ;
  }
  if (monthDiff > 0) {
    outputMsg += monthDiff === 1 ? `${monthDiff} month ` : `${monthDiff} months `;
  }
  if (dayDiff > 0) {
    outputMsg += dayDiff === 1 ? `${dayDiff} day ` : `${dayDiff} days `;
  }
  if (hourDiff > 0) {
    outputMsg += outputMsg === 1 ? `${hourDiff} hour ` : `${hourDiff} hours `;
  }
  if (minuteDiff > 0) {
    outputMsg += minuteDiff === 1 ? `${minuteDiff} minute ` : `${minuteDiff} minutes `;
  }
  if (secondDiff > 0) {
    outputMsg += secondDiff === 1 ? `${secondDiff} second ` : `${secondDiff} seconds `;
  }
  return outputMsg + 'ago';
}