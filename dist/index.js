'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});
function reverseString(string) {

    //finds position of . and removes it
    var position = string.indexOf('.');
    string = string.slice(0, position);

    //splits string and reverses it
    string = string.split(' ').reverse();
    return string;
}

function sortAlphaInts(arr) {
    //takes all strings and turns them into numbers
    arr.forEach(function (item, index) {
        arr[index] = Number(item);
    });

    //sorts them based on which is smaller
    arr.sort(function (a, b) {
        return a - b;
    });

    return arr;
}

function arrDiff(arrOne, arrTwo) {
    var tmp = [];
    arrOne = sortAlphaInts(arrOne);
    arrTwo = sortAlphaInts(arrTwo);
    arrOne.forEach(function (i) {
        if (arrTwo.indexOf(i) === -1) {
            tmp.push(i);
        }
    });

    return tmp;
}

/*
implements haversine formula
https://en.wikipedia.org/wiki/Haversine_formula
*/
function diffPoints(pointOne, pointTwo) {
    var R = 6371; // Radius of the earth in km
    var dLat = degTorad(pointTwo.lat - pointOne.lat);
    var dLon = degTorad(pointTwo.lon - pointOne.lon);
    var a = Math.sin(dLat / 2) * Math.sin(dLat / 2) + Math.cos(degTorad(pointOne.lat)) * Math.cos(degTorad(pointTwo.lat)) * Math.sin(dLon / 2) * Math.sin(dLon / 2);
    var c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
    var d = R * c;
    return (d / 1.609).toFixed(2); // Convert to Miles;
}

function degTorad(deg) {
    return deg * (Math.PI / 180);
}

function timeDif(timeOne, timeTwo) {
    var dateOne = new Date(timeOne);
    var dateTwo = new Date(timeTwo);

    var miliDif = dateOne - dateTwo;

    var hourDif = miliDif / (1000 * 60 * 60);
    if (hourDif < 0) {
        var hours = Math.abs(hourDif);
        return hours + ' hour' + (hours > 1 ? 's' : '') + ' ago';
    } else {
        var _hours = Math.abs(hourDif);
        return _hours + ' hour' + (_hours > 1 ? 's' : '') + ' in the future';
    }
    return hourDif;
}

exports.reverseString = reverseString;
exports.sortAlphaInts = sortAlphaInts;
exports.arrDiff = arrDiff;
exports.diffPoints = diffPoints;
exports.timeDif = timeDif;
//# sourceMappingURL=index.js.map