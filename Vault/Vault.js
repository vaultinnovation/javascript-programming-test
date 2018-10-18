function reverseArray(array){
    let revArray = [];
    array = array.split('.').join('');
    array = array.split(/[ ]+/);

    for(let i = array.length -1; i >=0; i--){
        revArray.push(array[i]);
    }

    return revArray;
}

function orderArray(array){

}

function getDiffArray(array1, array2){

}

function getGeoLocationDistance(location1, location2){

}

function getTimeDifference(timeStamp){

}

module.exports = {
    reverseArray: reverseArray,
    orderArray: orderArray,
    getDiffArray: getDiffArray,
    getGeoLocationDistance: getGeoLocationDistance,
    getTimeDifference: getTimeDifference
}